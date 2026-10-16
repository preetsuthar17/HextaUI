import DodoPayments from "dodopayments"
import type { Payment } from "dodopayments/resources/payments"
import { and, desc, eq, inArray } from "drizzle-orm"

import type { AuthEnv } from "@/lib/auth"
import { schema, type Db } from "@/lib/db"
import { sendPurchaseEmail } from "@/lib/email/account"
import {
  isEarlyBird,
  planRank,
  teamPlanIds,
  type ProPlanId,
  type TeamPlanId,
} from "@/lib/pro/pricing"

type PaymentsEnv = AuthEnv & {
  DODO_PAYMENTS_API_KEY: string
  DODO_PAYMENTS_WEBHOOK_KEY: string
  DODO_PAYMENTS_ENVIRONMENT: "live_mode" | "test_mode"
  DODO_SOLO_EARLY_PRODUCT_ID: string
  DODO_SOLO_PRODUCT_ID: string
  DODO_TEAM_EARLY_PRODUCT_ID: string
  DODO_TEAM_PRODUCT_ID: string
  DODO_UNLIMITED_EARLY_PRODUCT_ID?: string
  DODO_UNLIMITED_PRODUCT_ID?: string
}

type Purchase = typeof schema.purchase.$inferSelect

type ProAccess =
  | { via: "owner"; plan: ProPlanId; purchase: Purchase }
  | { via: "member"; plan: TeamPlanId; purchase: Purchase; ownerName: string }

let payments: DodoPayments | undefined

function getPayments(env: PaymentsEnv) {
  payments ??= new DodoPayments({
    bearerToken: env.DODO_PAYMENTS_API_KEY,
    webhookKey: env.DODO_PAYMENTS_WEBHOOK_KEY,
    environment: env.DODO_PAYMENTS_ENVIRONMENT,
  })
  return payments
}

function planProducts(env: PaymentsEnv) {
  return {
    solo: {
      early: env.DODO_SOLO_EARLY_PRODUCT_ID,
      regular: env.DODO_SOLO_PRODUCT_ID,
    },
    team: {
      early: env.DODO_TEAM_EARLY_PRODUCT_ID,
      regular: env.DODO_TEAM_PRODUCT_ID,
    },
    unlimited: {
      early: env.DODO_UNLIMITED_EARLY_PRODUCT_ID,
      regular: env.DODO_UNLIMITED_PRODUCT_ID,
    },
  } satisfies Record<ProPlanId, { early?: string; regular?: string }>
}

function productPlans(env: PaymentsEnv) {
  const plans = new Map<string, ProPlanId>()
  for (const [plan, products] of Object.entries(planProducts(env))) {
    for (const id of [products.early, products.regular]) {
      if (id) plans.set(id, plan as ProPlanId)
    }
  }
  return plans
}

function checkoutProduct(env: PaymentsEnv, plan: ProPlanId, now = new Date()) {
  const products = planProducts(env)[plan]
  return (isEarlyBird(now) ? products.early : products.regular) || null
}

async function findOwnPurchase(db: Db, userId: string) {
  const purchases = await db.query.purchase.findMany({
    where: and(
      eq(schema.purchase.userId, userId),
      eq(schema.purchase.status, "paid")
    ),
    orderBy: desc(schema.purchase.createdAt),
  })
  return purchases
    .slice()
    .sort((a, b) => planRank[b.plan] - planRank[a.plan])
    .at(0)
}

async function findTeamSeat(db: Db, email: string) {
  const [seat] = await db
    .select({ purchase: schema.purchase, ownerName: schema.user.name })
    .from(schema.teamMember)
    .innerJoin(
      schema.purchase,
      eq(schema.teamMember.purchaseId, schema.purchase.id)
    )
    .innerJoin(schema.user, eq(schema.purchase.userId, schema.user.id))
    .where(
      and(
        eq(schema.teamMember.email, email.toLowerCase()),
        eq(schema.purchase.status, "paid"),
        inArray(schema.purchase.plan, teamPlanIds)
      )
    )
    .limit(1)
  return seat
}

async function findProAccess(
  db: Db,
  userId: string
): Promise<ProAccess | null> {
  const own = await findOwnPurchase(db, userId)
  if (own) return { via: "owner", plan: own.plan, purchase: own }

  const user = await db.query.user.findFirst({
    where: eq(schema.user.id, userId),
  })
  if (!user?.emailVerified) return null

  const seat = await findTeamSeat(db, user.email)
  if (!seat) return null
  if (seat.purchase.plan === "solo") return null
  return {
    via: "member",
    plan: seat.purchase.plan,
    purchase: seat.purchase,
    ownerName: seat.ownerName,
  }
}

async function findBuyer(db: Db, payment: Payment) {
  const userId = payment.metadata.user_id
  if (typeof userId === "string") {
    const byId = await db.query.user.findFirst({
      where: eq(schema.user.id, userId),
    })
    if (byId) return byId
  }
  return db.query.user.findFirst({
    where: eq(schema.user.email, payment.customer.email),
  })
}

async function recordPayment(db: Db, payment: Payment, env: PaymentsEnv) {
  const plans = productPlans(env)
  const productId = payment.product_cart
    ?.map((item) => item.product_id)
    .find((id) => plans.has(id))
  const plan = productId ? plans.get(productId) : undefined
  if (!productId || !plan) return "ignored"

  const buyer = await findBuyer(db, payment)
  if (!buyer) return "unmatched"

  const status = payment.refund_status === "full" ? "refunded" : "paid"
  const created = await db
    .insert(schema.purchase)
    .values({
      id: payment.payment_id,
      userId: buyer.id,
      productId,
      plan,
      customerId: payment.customer.customer_id,
      status,
      amount: payment.total_amount,
      currency: payment.currency,
    })
    .onConflictDoNothing()
    .returning({ id: schema.purchase.id })
  if (created.length > 0 && status === "paid") {
    await sendPurchaseEmail(env, buyer, plan)
  }
  return "recorded"
}

async function confirmPayment(
  env: PaymentsEnv,
  db: Db,
  paymentId: string,
  userId: string
) {
  const payment = await getPayments(env)
    .payments.retrieve(paymentId)
    .catch(() => null)
  if (payment?.status !== "succeeded") return "unpaid"
  if (payment.metadata.user_id !== userId) return "unmatched"
  return recordPayment(db, payment, env)
}

async function revokePurchase(
  db: Db,
  paymentId: string,
  status: "refunded" | "disputed"
) {
  await db
    .update(schema.purchase)
    .set({ status })
    .where(eq(schema.purchase.id, paymentId))
}

export {
  checkoutProduct,
  confirmPayment,
  findOwnPurchase,
  findProAccess,
  getPayments,
  recordPayment,
  revokePurchase,
  type PaymentsEnv,
  type ProAccess,
  type Purchase,
}

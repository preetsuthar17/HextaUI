import { and, asc, count, eq } from "drizzle-orm"

import { schema, type Db } from "@/lib/db"
import { findOwnPurchase, type Purchase } from "@/lib/payments"
import { isTeamPlan, proPlans, type TeamPlanId } from "@/lib/pro/pricing"

type Team = Purchase & { plan: TeamPlanId }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function seatCount(plan: TeamPlanId) {
  return proPlans[plan].seats
}

function memberLimit(plan: TeamPlanId) {
  const seats = seatCount(plan)
  return seats === null ? Number.POSITIVE_INFINITY : seats - 1
}

function normalizeEmail(value: unknown) {
  if (typeof value !== "string") return null
  const email = value.trim().toLowerCase()
  return email.length <= 254 && emailPattern.test(email) ? email : null
}

async function findOwnedTeam(db: Db, userId: string): Promise<Team | null> {
  const purchase = await findOwnPurchase(db, userId)
  return purchase && isTeamPlan(purchase.plan)
    ? { ...purchase, plan: purchase.plan }
    : null
}

function listMembers(db: Db, purchaseId: string) {
  return db
    .select({
      id: schema.teamMember.id,
      email: schema.teamMember.email,
      createdAt: schema.teamMember.createdAt,
    })
    .from(schema.teamMember)
    .where(eq(schema.teamMember.purchaseId, purchaseId))
    .orderBy(asc(schema.teamMember.createdAt))
}

async function addMember(db: Db, team: Team, email: string) {
  const [{ total }] = await db
    .select({ total: count() })
    .from(schema.teamMember)
    .where(eq(schema.teamMember.purchaseId, team.id))
  if (total >= memberLimit(team.plan)) return null

  const added = await db
    .insert(schema.teamMember)
    .values({ id: crypto.randomUUID(), purchaseId: team.id, email })
    .onConflictDoNothing()
    .returning({
      id: schema.teamMember.id,
      email: schema.teamMember.email,
      createdAt: schema.teamMember.createdAt,
    })
  return added.length > 0 ? added[0] : "exists"
}

async function removeMember(db: Db, purchaseId: string, id: string) {
  const deleted = await db
    .delete(schema.teamMember)
    .where(
      and(
        eq(schema.teamMember.id, id),
        eq(schema.teamMember.purchaseId, purchaseId)
      )
    )
    .returning({ id: schema.teamMember.id })
  return deleted.length > 0
}

export {
  addMember,
  findOwnedTeam,
  listMembers,
  memberLimit,
  normalizeEmail,
  removeMember,
  seatCount,
  type Team,
}

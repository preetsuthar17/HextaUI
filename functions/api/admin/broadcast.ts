import { and, asc, eq, isNull, ne, notInArray, or } from "drizzle-orm"

import { changelog } from "@/lib/changelog"
import { getDb, schema } from "@/lib/db"
import { emailAdminError, isEmailAdmin } from "@/lib/email/admin"
import { releaseEmail } from "@/lib/email/release"
import { sendEmail, type EmailEnv } from "@/lib/email/send"
import { unsubscribeLinks } from "@/lib/email/unsubscribe"
import { apiError } from "@/lib/api-error"

type Context = {
  request: Request
  env: EmailEnv
}

type BroadcastBody = {
  date?: unknown
  to?: unknown
  dryRun?: unknown
  limit?: unknown
}

const noStore = { "cache-control": "no-store" }
const maxBatch = 40

function findEntry(date: unknown) {
  const entry = changelog.find((item) => item.date === date)
  if (entry) return { entry }
  return {
    error: apiError("not_found", {
      error: "No changelog entry for that date",
      detail: `There is no shipped changelog entry dated ${String(date)}.`,
      resolution: `Use one of: ${changelog.map((item) => item.date).join(", ")}.`,
    }),
  }
}

export async function onRequestPost({ request, env }: Context) {
  if (!(await isEmailAdmin(request, env.EMAIL_ADMIN_TOKEN))) {
    return emailAdminError()
  }
  const body = (await request.json().catch(() => ({}))) as BroadcastBody
  const { entry, error } = findEntry(body.date)
  if (!entry) return error

  const db = getDb(env.DB)
  const campaign = `release-${entry.date}`

  if (typeof body.to === "string") {
    const [owner] = await db
      .select({ id: schema.user.id })
      .from(schema.user)
      .where(eq(schema.user.email, body.to))
    const links = await unsubscribeLinks(
      env.BETTER_AUTH_SECRET,
      owner?.id ?? "preview"
    )
    const result = await sendEmail(env, releaseEmail(entry, body.to, links))
    return Response.json(
      { test: true, to: body.to, ...result },
      { headers: noStore }
    )
  }

  const pending = db
    .select({ id: schema.user.id, email: schema.user.email })
    .from(schema.user)
    .leftJoin(
      schema.emailSend,
      and(
        eq(schema.emailSend.userId, schema.user.id),
        eq(schema.emailSend.campaign, campaign)
      )
    )
    .where(and(isNull(schema.user.unsubscribedAt), isNull(schema.emailSend.id)))
    .orderBy(asc(schema.user.createdAt))

  const notSent = or(
    isNull(schema.subscriber.lastCampaign),
    ne(schema.subscriber.lastCampaign, campaign)
  )
  const pendingSubscribers = db
    .select({
      id: schema.subscriber.id,
      email: schema.subscriber.email,
      lastCampaign: schema.subscriber.lastCampaign,
    })
    .from(schema.subscriber)
    .where(
      and(
        isNull(schema.subscriber.unsubscribedAt),
        notSent,
        notInArray(
          schema.subscriber.email,
          db.select({ email: schema.user.email }).from(schema.user)
        )
      )
    )
    .orderBy(asc(schema.subscriber.createdAt))

  if (body.dryRun === true) {
    const recipients = await pending
    const subscribers = await pendingSubscribers
    return Response.json(
      { campaign, remaining: recipients.length + subscribers.length },
      { headers: noStore }
    )
  }

  const limit =
    typeof body.limit === "number" && body.limit > 0
      ? Math.min(Math.floor(body.limit), maxBatch)
      : maxBatch
  const recipients = await pending.limit(limit)
  const failed: { email: string; error: string }[] = []
  let sent = 0
  let stopped: string | null = null

  for (const recipient of recipients) {
    const id = crypto.randomUUID()
    const claimed = await db
      .insert(schema.emailSend)
      .values({ id, campaign, userId: recipient.id })
      .onConflictDoNothing()
      .returning({ id: schema.emailSend.id })
    if (claimed.length === 0) continue

    const links = await unsubscribeLinks(env.BETTER_AUTH_SECRET, recipient.id)
    const result = await sendEmail(
      env,
      releaseEmail(entry, recipient.email, links)
    )
    if (result.ok) {
      sent += 1
      continue
    }
    failed.push({ email: recipient.email, error: result.error })
    if (result.error !== "Permanent bounce") {
      await db.delete(schema.emailSend).where(eq(schema.emailSend.id, id))
      stopped = result.error
      break
    }
  }

  const subscribers = stopped
    ? []
    : await pendingSubscribers.limit(Math.max(limit - recipients.length, 0))

  for (const recipient of subscribers) {
    const claimed = await db
      .update(schema.subscriber)
      .set({ lastCampaign: campaign })
      .where(and(eq(schema.subscriber.id, recipient.id), notSent))
      .returning({ id: schema.subscriber.id })
    if (claimed.length === 0) continue

    const links = await unsubscribeLinks(env.BETTER_AUTH_SECRET, recipient.id)
    const result = await sendEmail(
      env,
      releaseEmail(entry, recipient.email, links, "subscriber")
    )
    if (result.ok) {
      sent += 1
      continue
    }
    failed.push({ email: recipient.email, error: result.error })
    if (result.error !== "Permanent bounce") {
      await db
        .update(schema.subscriber)
        .set({ lastCampaign: recipient.lastCampaign })
        .where(eq(schema.subscriber.id, recipient.id))
      stopped = result.error
      break
    }
  }

  const remaining = (await pending).length + (await pendingSubscribers).length
  return Response.json(
    { campaign, sent, failed, remaining, stopped },
    { headers: noStore }
  )
}

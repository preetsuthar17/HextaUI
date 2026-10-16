import { getAuth } from "@/lib/auth"
import { getDb } from "@/lib/db"
import { sendTeamInviteEmail } from "@/lib/email/account"
import { isSameOrigin } from "@/lib/origin"
import type { PaymentsEnv } from "@/lib/payments"
import {
  addMember,
  findOwnedTeam,
  listMembers,
  normalizeEmail,
  seatCount,
} from "@/lib/pro/team"
import { apiError, sameOriginError, signInError } from "@/lib/api-error"

type Context = {
  request: Request
  env: PaymentsEnv
}

const noStore = { "cache-control": "no-store" }

function teamRequired() {
  return apiError("team_required", {
    error: "Only a Team or Unlimited owner can manage seats",
    detail: "This account doesn't own a HextaUI Pro Team or Unlimited plan.",
    resolution:
      "Buy Team or Unlimited at https://hextaui.com/account to add teammates.",
  })
}

async function getUser(env: PaymentsEnv, request: Request) {
  const session = await getAuth(env).api.getSession({
    headers: request.headers,
  })
  return session?.user ?? null
}

export async function onRequestGet({ request, env }: Context) {
  const user = await getUser(env, request)
  if (!user) {
    return signInError()
  }
  const db = getDb(env.DB)
  const team = await findOwnedTeam(db, user.id)
  if (!team) {
    return teamRequired()
  }
  const members = await listMembers(db, team.id)
  return Response.json(
    { seats: seatCount(team.plan), members },
    { headers: noStore }
  )
}

export async function onRequestPost({ request, env }: Context) {
  if (!isSameOrigin(request, env.BETTER_AUTH_URL)) {
    return sameOriginError()
  }
  const user = await getUser(env, request)
  if (!user) {
    return signInError()
  }
  const db = getDb(env.DB)
  const team = await findOwnedTeam(db, user.id)
  if (!team) {
    return teamRequired()
  }

  const body = (await request.json().catch(() => ({}))) as { email?: unknown }
  const email = normalizeEmail(body.email)
  if (!email) {
    return apiError("bad_request", {
      error: "Enter a valid email address",
      detail: "The email field is missing or isn't an email address.",
      resolution: 'Send { "email": "teammate@example.com" }.',
    })
  }
  if (email === user.email.toLowerCase()) {
    return apiError("bad_request", {
      error: "You already have a seat",
      detail: "The Team owner always has a seat and doesn't need adding.",
      resolution: "Add a teammate's email instead.",
    })
  }

  const member = await addMember(db, team, email)
  if (!member) {
    return apiError("seat_limit", {
      error: "Every seat is taken",
      detail: `A Team plan has ${seatCount(team.plan)} seats, including the owner's.`,
      resolution:
        "Remove a teammate with DELETE /api/team/{id}, then try again.",
    })
  }
  if (member === "exists") {
    return apiError("bad_request", {
      error: "That teammate already has a seat",
      detail: `${email} is already on this team.`,
      resolution: "Add a different email address.",
    })
  }
  await sendTeamInviteEmail(env, user, email)
  return Response.json(member, { status: 201, headers: noStore })
}

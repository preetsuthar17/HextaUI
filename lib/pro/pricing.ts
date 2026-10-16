const proPlans = {
  solo: {
    id: "solo",
    name: "Solo",
    earlyPrice: 49,
    price: 79,
    seats: 1,
    summary: "One developer, unlimited projects including client work.",
  },
  team: {
    id: "team",
    name: "Team",
    earlyPrice: 149,
    price: 249,
    seats: 10,
    summary:
      "Up to 10 developers on one invoice, with one shared token allowed in CI.",
  },
  unlimited: {
    id: "unlimited",
    name: "Unlimited",
    earlyPrice: 299,
    price: 449,
    seats: null,
    summary:
      "Every developer at one company on one invoice, with no seat limit and one shared token allowed in CI.",
  },
} as const

type ProPlanId = keyof typeof proPlans

const proPlanIds = Object.keys(proPlans) as ProPlanId[]

const teamPlanIds = ["team", "unlimited"] as const satisfies ProPlanId[]

type TeamPlanId = (typeof teamPlanIds)[number]

const planRank: Record<ProPlanId, number> = { solo: 0, team: 1, unlimited: 2 }

const earlyBirdEnd = new Date("2026-12-01T12:00:00Z")
const earlyBirdLastDay = "30 November 2026"
const earlyBirdLastDayIso = "2026-11-30"
const refundDays = 30

function isEarlyBird(now = new Date()) {
  return now < earlyBirdEnd
}

function planPrice(plan: ProPlanId, now = new Date()) {
  return isEarlyBird(now) ? proPlans[plan].earlyPrice : proPlans[plan].price
}

function isProPlanId(value: unknown): value is ProPlanId {
  return typeof value === "string" && Object.hasOwn(proPlans, value)
}

function isTeamPlan(plan: ProPlanId): plan is TeamPlanId {
  return plan !== "solo"
}

const proPrice = proPlans.solo.earlyPrice
const proRegularPrice = proPlans.solo.price

export {
  earlyBirdEnd,
  earlyBirdLastDay,
  earlyBirdLastDayIso,
  isEarlyBird,
  isProPlanId,
  isTeamPlan,
  planPrice,
  planRank,
  proPlanIds,
  proPlans,
  proPrice,
  proRegularPrice,
  refundDays,
  teamPlanIds,
  type ProPlanId,
  type TeamPlanId,
}

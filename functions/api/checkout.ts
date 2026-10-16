import { getAuth } from "@/lib/auth"
import { getDb } from "@/lib/db"
import { isSameOrigin } from "@/lib/origin"
import {
  checkoutProduct,
  findProAccess,
  getPayments,
  type PaymentsEnv,
} from "@/lib/payments"
import { isProPlanId, planRank } from "@/lib/pro/pricing"
import { apiError, sameOriginError, signInError } from "@/lib/api-error"

type Context = {
  request: Request
  env: PaymentsEnv
}

export async function onRequestPost({ request, env }: Context) {
  if (!isSameOrigin(request, env.BETTER_AUTH_URL)) {
    return sameOriginError()
  }

  const session = await getAuth(env).api.getSession({
    headers: request.headers,
  })
  if (!session) {
    return signInError()
  }

  const body = (await request.json().catch(() => ({}))) as { plan?: unknown }
  const plan = body.plan ?? "solo"
  if (!isProPlanId(plan)) {
    return apiError("bad_request", {
      error: "Unknown plan",
      detail: "The plan must be solo, team or unlimited.",
      resolution:
        'Send { "plan": "solo" }, { "plan": "team" } or { "plan": "unlimited" }.',
    })
  }

  const { user } = session
  const access = await findProAccess(getDb(env.DB), user.id)
  if (access && planRank[access.plan] >= planRank[plan]) {
    return Response.json({ url: "/account" })
  }

  const productId = checkoutProduct(env, plan)
  if (!productId) {
    return apiError("not_found", {
      error: "This plan isn't on sale yet",
      detail: `The ${plan} plan has no product configured for checkout.`,
      resolution: "Choose another plan, or email hi@hextaui.com.",
    })
  }

  const checkout = await getPayments(env).checkoutSessions.create({
    product_cart: [{ product_id: productId, quantity: 1 }],
    customer: { email: user.email, name: user.name },
    metadata: { user_id: user.id, plan },
    return_url: new URL("/account?checkout=done", env.BETTER_AUTH_URL).href,
  })

  return Response.json({ url: checkout.checkout_url })
}

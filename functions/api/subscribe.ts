import type { AuthEnv } from "@/lib/auth"
import { getDb, schema } from "@/lib/db"
import { isSameOrigin } from "@/lib/origin"
import { createSubscriberId, parseSubscribeInput } from "@/lib/subscribe"
import { apiError, sameOriginError } from "@/lib/api-error"

type Context = {
  request: Request
  env: AuthEnv
}

export async function onRequestPost({ request, env }: Context) {
  if (!isSameOrigin(request, env.BETTER_AUTH_URL)) {
    return sameOriginError()
  }

  const parsed = parseSubscribeInput(await request.json().catch(() => null))
  if (!parsed.ok) {
    return apiError("bad_request", {
      error: parsed.error,
      detail: parsed.error,
      resolution: "Send a JSON body with a valid email address.",
    })
  }

  await getDb(env.DB)
    .insert(schema.subscriber)
    .values({ id: createSubscriberId(), ...parsed.input })
    .onConflictDoUpdate({
      target: schema.subscriber.email,
      set: { unsubscribedAt: null },
    })

  return Response.json(
    { subscribed: true },
    { headers: { "cache-control": "no-store" } }
  )
}

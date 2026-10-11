const subscriberIdPrefix = "sub_"
const subscribeLimits = { email: 254, source: 80 }

type SubscribeInput = { email: string; source: string | null }

type SubscribeResult =
  { ok: true; input: SubscribeInput } | { ok: false; error: string }

function parseSubscribeInput(body: unknown): SubscribeResult {
  const record = (body && typeof body === "object" ? body : {}) as Record<
    string,
    unknown
  >
  const email =
    typeof record.email === "string" ? record.email.trim().toLowerCase() : ""
  if (
    email.length > subscribeLimits.email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return { ok: false, error: "email must be a valid email address." }
  }
  const source =
    typeof record.source === "string" && record.source.startsWith("/")
      ? record.source.slice(0, subscribeLimits.source)
      : null
  return { ok: true, input: { email, source } }
}

function isSubscriberId(id: string) {
  return id.startsWith(subscriberIdPrefix)
}

function createSubscriberId() {
  return `${subscriberIdPrefix}${crypto.randomUUID()}`
}

export {
  createSubscriberId,
  isSubscriberId,
  parseSubscribeInput,
  subscribeLimits,
  type SubscribeInput,
}

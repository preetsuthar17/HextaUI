import { describe, expect, it } from "vitest"

import {
  createSubscriberId,
  isSubscriberId,
  parseSubscribeInput,
} from "@/lib/subscribe"

describe("parseSubscribeInput", () => {
  it("normalizes the email and keeps a path source", () => {
    expect(
      parseSubscribeInput({
        email: "  Ada@Example.com ",
        source: "/docs/button",
      })
    ).toEqual({
      ok: true,
      input: { email: "ada@example.com", source: "/docs/button" },
    })
  })

  it("drops a source that isn't a path", () => {
    const result = parseSubscribeInput({
      email: "ada@example.com",
      source: "https://evil.example",
    })
    expect(result.ok && result.input.source).toBe(null)
  })

  it("rejects missing, malformed and oversized emails", () => {
    for (const body of [
      null,
      {},
      { email: 3 },
      { email: "ada" },
      { email: "ada@example" },
      { email: `${"a".repeat(250)}@example.com` },
    ]) {
      expect(parseSubscribeInput(body).ok).toBe(false)
    }
  })
})

describe("subscriber ids", () => {
  it("are recognizable so unsubscribe links pick the right table", () => {
    expect(isSubscriberId(createSubscriberId())).toBe(true)
    expect(isSubscriberId("preview")).toBe(false)
  })
})

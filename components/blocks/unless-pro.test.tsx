import { act, cleanup, render } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

async function renderGate() {
  const { UnlessPro } = await import("@/components/blocks/unless-pro")
  const view = render(
    <UnlessPro fallback={<span>unlocked</span>}>
      <span>Get Pro</span>
    </UnlessPro>
  )
  await act(async () => {
    await Promise.resolve()
  })
  return view
}

describe("UnlessPro", () => {
  beforeEach(() => {
    vi.resetModules()
    localStorage.clear()
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it("shows the children to signed-out visitors without calling the API", async () => {
    const fetch = vi.fn()
    vi.stubGlobal("fetch", fetch)
    const view = await renderGate()
    expect(view.container.textContent).toBe("Get Pro")
    expect(fetch).not.toHaveBeenCalled()
  })

  it("hides the children once the account says Pro and caches it", async () => {
    localStorage.setItem("hextaui-signed-in", "1")
    const fetch = vi
      .fn()
      .mockResolvedValue(jsonResponse(200, { pro: true, plan: "solo" }))
    vi.stubGlobal("fetch", fetch)
    const view = await renderGate()
    expect(fetch).toHaveBeenCalledWith("/api/account")
    expect(view.container.textContent).toBe("unlocked")
    expect(localStorage.getItem("hextaui-pro")).toBe("1")
  })

  it("hides the children from the cache before the API answers", async () => {
    localStorage.setItem("hextaui-signed-in", "1")
    localStorage.setItem("hextaui-pro", "1")
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(new Promise(() => {})))
    const view = await renderGate()
    expect(view.container.textContent).toBe("unlocked")
  })

  it("shows the children and clears the cache when the session is gone", async () => {
    localStorage.setItem("hextaui-signed-in", "1")
    localStorage.setItem("hextaui-pro", "1")
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(401, {})))
    const view = await renderGate()
    expect(view.container.textContent).toBe("Get Pro")
    expect(localStorage.getItem("hextaui-pro")).toBeNull()
    expect(localStorage.getItem("hextaui-signed-in")).toBeNull()
  })

  it("shows the children to signed-in accounts without Pro", async () => {
    localStorage.setItem("hextaui-signed-in", "1")
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse(200, { pro: false, plan: null }))
    )
    const view = await renderGate()
    expect(view.container.textContent).toBe("Get Pro")
    expect(localStorage.getItem("hextaui-pro")).toBeNull()
  })
})

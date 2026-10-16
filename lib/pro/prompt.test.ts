import { describe, expect, it } from "vitest"

import { getBlockPrompt, proRegistryConfig } from "@/lib/pro/prompt"

describe("getBlockPrompt", () => {
  it("tells the agent to install a Pro block with the registry and a token", () => {
    const prompt = getBlockPrompt({ name: "tool-calls", title: "Tool Calls" })
    expect(prompt).toContain('HextaUI Pro "Tool Calls" block')
    expect(prompt).toContain("HEXTAUI_PRO_TOKEN")
    expect(prompt).toContain("npx shadcn@latest add @hextaui-pro/tool-calls")
    expect(prompt).toContain("https://hextaui.com/blocks/tool-calls")
    expect(prompt).toContain("https://hextaui.com/mcp")
    for (const line of proRegistryConfig.split("\n")) {
      expect(prompt).toContain(line)
    }
  })

  it("skips the token for a free block", () => {
    const prompt = getBlockPrompt({
      name: "prompt-input",
      title: "Prompt Input",
      free: true,
    })
    expect(prompt).not.toContain("HEXTAUI_PRO_TOKEN")
    expect(prompt).toContain(
      "npx shadcn@latest add https://hextaui.com/r/pro/prompt-input.json"
    )
  })
})

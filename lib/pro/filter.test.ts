import { describe, expect, it } from "vitest"

import { filterBlocks, matchesQuery } from "@/lib/pro/filter"

const blocks = [
  {
    name: "prompt-input",
    title: "Prompt Input",
    description: "A chat composer that grows as you type.",
    category: "ai",
  },
  {
    name: "tool-calls",
    title: "Tool Calls",
    description: "Show what an agent does, one line per step.",
    category: "ai",
  },
  {
    name: "billing",
    title: "Billing",
    description: "Plan & usage for an AI product.",
    category: "settings",
  },
]

describe("matchesQuery", () => {
  it("matches on title, description and name, ignoring case", () => {
    expect(matchesQuery(blocks[0], "PROMPT")).toBe(true)
    expect(matchesQuery(blocks[1], "agent")).toBe(true)
    expect(matchesQuery(blocks[1], "tool calls")).toBe(true)
    expect(matchesQuery(blocks[2], "usage")).toBe(true)
    expect(matchesQuery(blocks[2], "composer")).toBe(false)
  })

  it("needs every word to match and ignores blank queries", () => {
    expect(matchesQuery(blocks[0], "chat composer")).toBe(true)
    expect(matchesQuery(blocks[0], "chat billing")).toBe(false)
    expect(matchesQuery(blocks[0], "   ")).toBe(true)
  })
})

describe("filterBlocks", () => {
  it("returns everything without filters", () => {
    expect(filterBlocks(blocks)).toEqual(blocks)
  })

  it("filters by category, favorites and query together", () => {
    expect(filterBlocks(blocks, { category: "settings" })).toEqual([blocks[2]])
    expect(
      filterBlocks(blocks, { favorites: ["billing", "tool-calls"] }).map(
        (block) => block.name
      )
    ).toEqual(["tool-calls", "billing"])
    expect(filterBlocks(blocks, { favorites: [] })).toEqual([])
    expect(
      filterBlocks(blocks, {
        category: "ai",
        favorites: ["billing", "tool-calls"],
        query: "step",
      })
    ).toEqual([blocks[1]])
  })
})

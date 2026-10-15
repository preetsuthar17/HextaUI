import { describe, expect, it } from "vitest"

import { docsEntries } from "@/lib/docs"
import {
  getBlockComponents,
  getBlockLinks,
  getDocsDependencies,
  getDocsDependents,
  getProBlocksUsing,
  getRelatedDocs,
} from "@/lib/docs-related"
import { proBlocks } from "@/lib/pro/catalog"

describe("related docs", () => {
  it("reads what a component is built from in the registry", () => {
    expect(getDocsDependencies("date-picker")).toEqual(
      expect.arrayContaining(["button", "calendar", "popover", "sheet"])
    )
    expect(getDocsDependencies("date-picker")).not.toContain("theme")
  })

  it("finds the components built on another", () => {
    expect(getDocsDependents("calendar")).toContain("date-picker")
  })

  it("puts the building blocks first", () => {
    const related = getRelatedDocs("date-picker").map((link) => link.href)
    expect(related.slice(0, 4)).toEqual(
      expect.arrayContaining([
        "/docs/button",
        "/docs/calendar",
        "/docs/popover",
        "/docs/sheet",
      ])
    )
  })

  it("links every page to between one and six other pages, never itself", () => {
    for (const entry of docsEntries) {
      const related = getRelatedDocs(entry.slug)
      const hrefs = related.map((link) => link.href)
      expect(hrefs, entry.slug).not.toContain(`/docs/${entry.slug}`)
      expect(new Set(hrefs).size).toBe(hrefs.length)
      expect(related.length).toBeLessThanOrEqual(6)
      if ("category" in entry && entry.category) {
        expect(related.length, entry.slug).toBeGreaterThan(0)
      }
    }
  })

  it("lists paid AI blocks first and the free block last", () => {
    const free = proBlocks.find((block) => block.free)
    if (!free?.components?.length) return
    const slug = free.components[0]
    const using = getProBlocksUsing(slug)
    expect(using.at(-1)?.href).toBe(`/blocks/${free.name}`)
    const first = proBlocks.find(
      (block) => using[0]?.href === `/blocks/${block.name}`
    )
    expect(first?.free).toBeFalsy()
    expect(first?.category).toBe("ai")
  })

  it("resolves next-step block names and skips unknown ones", () => {
    const [block] = proBlocks
    if (!block) return
    expect(getBlockLinks([block.name, "missing-block"])).toEqual([
      expect.objectContaining({ href: `/blocks/${block.name}` }),
    ])
  })

  it("links each block to the documented components it is built from", () => {
    for (const block of proBlocks) {
      for (const link of getBlockComponents(block.name)) {
        expect(
          docsEntries.some((entry) => link.href === `/docs/${entry.slug}`),
          link.href
        ).toBe(true)
      }
    }
  })
})

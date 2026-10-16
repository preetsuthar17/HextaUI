import fs from "node:fs"

import { describe, expect, it } from "vitest"

import snapshot from "@/lib/shadcn-snapshot.json"
import { differenceCount, getShadcnComparisons } from "@/lib/shadcn-compare"

describe("shadcn/ui comparisons", () => {
  const comparisons = getShadcnComparisons()

  it("compares components that exist on both sides", () => {
    expect(comparisons.length).toBeGreaterThan(20)
    for (const comparison of comparisons) {
      expect(snapshot.components, comparison.slug).toHaveProperty(
        comparison.slug
      )
      expect(fs.existsSync(`components/ui/${comparison.slug}.tsx`)).toBe(true)
    }
  })

  it("only publishes a page with at least three concrete differences", () => {
    for (const comparison of comparisons) {
      expect(
        differenceCount(comparison),
        comparison.slug
      ).toBeGreaterThanOrEqual(3)
    }
  })

  it("never claims a prop that the shadcn/ui wrapper or Base UI already handles", () => {
    for (const comparison of comparisons) {
      for (const prop of comparison.addedProps) {
        expect(comparison.shadcn.props[prop.part] ?? []).not.toContain(
          prop.name
        )
        expect([
          "render",
          "className",
          "children",
          "disabled",
          "open",
        ]).not.toContain(prop.name)
        expect(prop.name).not.toMatch(/^on[A-Z]/)
      }
    }
  })

  it("finds the button feedback props", () => {
    const button = comparisons.find(
      (comparison) => comparison.slug === "button"
    )
    expect(button?.addedProps.map((prop) => prop.name)).toEqual(
      expect.arrayContaining(["feedback", "loadingLabel"])
    )
  })

  it("dates the snapshot", () => {
    expect(snapshot.fetched).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})

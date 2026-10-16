import { describe, expect, it } from "vitest"

import {
  componentCategories,
  getCategoryComponents,
} from "@/lib/component-categories"
import { isLocalizedPath } from "@/lib/i18n/config"

describe("component categories", () => {
  it("only publishes hubs with three or more components", () => {
    expect(componentCategories.length).toBeGreaterThanOrEqual(6)
    for (const category of componentCategories) {
      expect(
        getCategoryComponents(category.slug).length
      ).toBeGreaterThanOrEqual(3)
    }
  })

  it("keeps titles and descriptions inside search limits", () => {
    for (const category of componentCategories) {
      expect(category.title.length, category.title).toBeLessThanOrEqual(60)
      expect(category.description.length, category.slug).toBeLessThanOrEqual(
        160
      )
      expect(category.title).toMatch(/React/)
    }
  })

  it("translates the hubs", () => {
    expect(isLocalizedPath("/components/forms")).toBe(true)
  })
})

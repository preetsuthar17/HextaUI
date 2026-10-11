import { existsSync, readdirSync } from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

import {
  getPathLocale,
  isLocalizedPath,
  languageAlternates,
  localizeHref,
  stripLocale,
} from "@/lib/i18n/config"
import { comparePages, localizedDocsSlugs } from "@/lib/i18n/pages"

const docsDir = path.join(process.cwd(), "app/docs")
const docsPages = readdirSync(docsDir).filter((name) =>
  existsSync(path.join(docsDir, name, "page.tsx"))
)

describe("localized docs pages", () => {
  it("has a translated route for every docs page that links localize", () => {
    const expected = docsPages.filter((slug) =>
      isLocalizedPath(`/docs/${slug}`)
    )
    expect([...localizedDocsSlugs].sort()).toEqual(expected.sort())
  })
})

describe("localized compare pages", () => {
  it("has a translated route for every compare page", () => {
    const compareDir = path.join(process.cwd(), "app/compare")
    const pages = readdirSync(compareDir).filter((name) =>
      existsSync(path.join(compareDir, name, "page.tsx"))
    )
    expect([...comparePages].sort()).toEqual(pages.sort())
  })
})

describe("localizeHref", () => {
  it("prefixes translated pages and keeps the hash", () => {
    expect(localizeHref("/docs/button#sizes", "es")).toBe(
      "/es/docs/button#sizes"
    )
    expect(localizeHref("/", "ja")).toBe("/ja")
  })

  it("leaves English, files and untranslated pages alone", () => {
    expect(localizeHref("/docs/button", "en")).toBe("/docs/button")
    expect(localizeHref("/docs/button.md", "es")).toBe("/docs/button.md")
    expect(localizeHref("/pricing", "es")).toBe("/pricing")
    expect(localizeHref("/docs/api", "es")).toBe("/docs/api")
    expect(localizeHref("https://github.com", "es")).toBe("https://github.com")
  })
})

describe("path locale", () => {
  it("reads and strips the locale prefix", () => {
    expect(getPathLocale("/de/docs/button")).toBe("de")
    expect(getPathLocale("/docs/button")).toBe("en")
    expect(stripLocale("/de/docs/button")).toBe("/docs/button")
    expect(stripLocale("/de")).toBe("/")
    expect(stripLocale("/docs/button")).toBe("/docs/button")
  })
})

describe("languageAlternates", () => {
  it("lists every locale plus x-default for translated pages only", () => {
    expect(languageAlternates("/blocks")).toMatchObject({
      en: "/blocks",
      fr: "/fr/blocks",
      "x-default": "/blocks",
    })
    expect(languageAlternates("/pricing")).toBeUndefined()
  })
})

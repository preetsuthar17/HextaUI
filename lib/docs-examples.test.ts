import { describe, expect, it } from "vitest"

import registry from "@/registry.json"
import { docsEntries, getDocsComponent, getDocsTitle } from "@/lib/docs"
import {
  getAllDocsExamples,
  getExampleDescription,
  getExampleTitle,
  jsxAttributes,
} from "@/lib/docs-examples"
import { getDocsExampleName } from "@/lib/docs-markdown"
import { isLocalizedPath, languageAlternates } from "@/lib/i18n/config"

describe("example pages", async () => {
  const examples = await getAllDocsExamples()
  const registryNames = new Set(registry.items.map((item) => item.name))

  it("finds the titled examples of every docs page", () => {
    expect(examples.length).toBeGreaterThan(500)
    expect(
      examples.find((example) => example.file === "button/variants")
    ).toMatchObject({ slug: "button", id: "variants", title: "Variants" })
  })

  it("only lists an example on the page that owns its folder", () => {
    for (const example of examples) {
      expect(example.file.split("/")[0], example.file).toBe(example.slug)
    }
    const keys = examples.map((example) => `${example.slug}/${example.id}`)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it("can install every example from the registry", () => {
    for (const example of examples) {
      expect(
        registryNames.has(getDocsExampleName(example.file)),
        example.file
      ).toBe(true)
    }
  })

  it("gives every example a short title that no other page uses", () => {
    const titles = examples.map((example) =>
      getExampleTitle(getDocsComponent(example.slug).name, example.title)
    )
    for (const title of titles)
      expect(title.length, title).toBeLessThanOrEqual(60)
    const docsTitles = docsEntries.map((entry) => getDocsTitle(entry.slug))
    expect(new Set([...titles, ...docsTitles]).size).toBe(
      titles.length + docsTitles.length
    )
  })

  it("keeps every description within 160 characters", () => {
    for (const example of examples) {
      const description = getExampleDescription(
        getDocsComponent(example.slug).name,
        example
      )
      expect(description.length, example.file).toBeLessThanOrEqual(160)
      expect(description.length, example.file).toBeGreaterThan(50)
    }
  })

  it("stays English only, so links never point at missing translations", () => {
    expect(isLocalizedPath("/docs/button/examples/variants")).toBe(false)
    expect(languageAlternates("/docs/button/examples/variants")).toBeUndefined()
    expect(isLocalizedPath("/docs/button")).toBe(true)
  })
})

describe("jsxAttributes", () => {
  it("reads attributes across lines, braces, strings and arrow functions", () => {
    const tags = jsxAttributes(`
      <Button
        variant="outline"
        onClick={() => save({ a: ">" })}
        disabled
      >
        <Dialog.Content size="lg" />
      </Button>
    `)
    expect([...(tags.get("Button") ?? [])]).toEqual([
      "variant",
      "onClick",
      "disabled",
    ])
    expect([...(tags.get("Dialog.Content") ?? [])]).toEqual(["size"])
  })
})

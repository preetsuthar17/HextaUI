import * as React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"

import {
  hasWords,
  isValidTranslation,
  restore,
  serialize,
} from "@/lib/i18n/rich"

const node = (
  <>
    Return a promise from <code>onCheckedChange</code> and read the{" "}
    <a href="/docs/switch">switch docs</a>, or <code>a`b</code>.
  </>
)

describe("serialize", () => {
  it("keeps code readable and tags other elements by index", () => {
    expect(serialize(node).key).toBe(
      "Return a promise from `onCheckedChange` and read the <0>switch docs</0>, or <l1/>."
    )
  })
})

describe("restore", () => {
  it("rebuilds the original elements around translated text", () => {
    const { slots } = serialize(node)
    const html = renderToStaticMarkup(
      <>
        {restore(
          "Lee la <0>documentación de switch</0> y devuelve una promesa desde `onCheckedChange`, o <l1/>.",
          slots
        )}
      </>
    )
    expect(html).toBe(
      'Lee la <a href="/docs/switch">documentación de switch</a> y devuelve una promesa desde <code>onCheckedChange</code>, o <code>a`b</code>.'
    )
  })
})

describe("isValidTranslation", () => {
  it("requires the same code spans and tags", () => {
    const { key } = serialize(node)
    expect(isValidTranslation(key, key)).toBe(true)
    expect(isValidTranslation(key, "Devuelve una promesa.")).toBe(false)
    expect(
      isValidTranslation(key, key.replace("onCheckedChange", "alCambiar"))
    ).toBe(false)
  })
})

describe("hasWords", () => {
  it("skips strings that are only code, numbers or symbols", () => {
    expect(hasWords("`sm`, `default`")).toBe(false)
    expect(hasWords("–")).toBe(false)
    expect(hasWords("Sizes")).toBe(true)
  })
})

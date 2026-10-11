import { existsSync, readdirSync, readFileSync } from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

import { translatedLocales } from "@/lib/i18n/config"
import { isValidTranslation } from "@/lib/i18n/rich"

const messagesDir = path.join(process.cwd(), "lib/i18n/messages")
const sourceDir = path.join(messagesDir, "en")
const namespaces = existsSync(sourceDir) ? readdirSync(sourceDir) : []

function read<T>(file: string): T {
  return JSON.parse(readFileSync(file, "utf8")) as T
}

describe.each(translatedLocales)("%s messages", (locale) => {
  it("translates every source message with its code and tags intact", () => {
    const problems: string[] = []
    for (const name of namespaces) {
      const keys = read<string[]>(path.join(sourceDir, name))
      const file = path.join(messagesDir, locale, name)
      const messages = existsSync(file)
        ? read<Record<string, string>>(file)
        : {}
      for (const key of keys) {
        const value = messages[key]
        if (!value) problems.push(`${name}: missing "${key}"`)
        else if (!isValidTranslation(key, value)) {
          problems.push(`${name}: code or tags changed in "${key}"`)
        }
      }
    }
    expect(problems.slice(0, 20)).toEqual([])
  })
})

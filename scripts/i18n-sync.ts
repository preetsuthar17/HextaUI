import fs from "node:fs"
import path from "node:path"

import { translatedLocales } from "../lib/i18n/config.ts"

const root = path.resolve(import.meta.dirname, "..")
const messagesDir = path.join(root, "lib/i18n/messages")
const sourceDir = path.join(messagesDir, "en")
const collectFile = process.argv[2]
const sharedThreshold = 3
const fixedNamespaces = new Set(["chrome"])

if (!collectFile || !fs.existsSync(collectFile)) {
  console.error(
    "i18n: pass the file written by a build run with I18N_COLLECT=<file>"
  )
  process.exit(1)
}

function fileFor(dir: string, namespace: string) {
  return path.join(dir, `${namespace.replaceAll("/", ".")}.json`)
}

function writeJson(file: string, value: unknown) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`)
}

const byKey = new Map<string, Set<string>>()

for (const line of fs.readFileSync(collectFile, "utf8").split("\n")) {
  if (!line) continue
  const [namespace, key] = JSON.parse(line) as [string, string]
  const namespaces = byKey.get(key) ?? new Set<string>()
  namespaces.add(namespace)
  byKey.set(key, namespaces)
}

const byNamespace = new Map<string, string[]>()

for (const namespace of fixedNamespaces) {
  const file = fileFor(sourceDir, namespace)
  if (!fs.existsSync(file)) continue
  for (const key of JSON.parse(fs.readFileSync(file, "utf8")) as string[]) {
    const namespaces = byKey.get(key) ?? new Set<string>()
    namespaces.add(namespace)
    byKey.set(key, namespaces)
  }
}

for (const [key, namespaces] of byKey) {
  const fixed = [...namespaces].filter((name) => fixedNamespaces.has(name))
  const pages = [...namespaces].filter((name) => !fixedNamespaces.has(name))
  const targets = [
    ...fixed,
    ...(pages.length >= sharedThreshold || pages.includes("common")
      ? ["common"]
      : pages),
  ]
  for (const namespace of targets) {
    byNamespace.set(namespace, [...(byNamespace.get(namespace) ?? []), key])
  }
}

fs.rmSync(sourceDir, { recursive: true, force: true })
let total = 0
for (const [namespace, keys] of byNamespace) {
  writeJson(fileFor(sourceDir, namespace), keys.sort())
  total += keys.length
}

for (const locale of translatedLocales) {
  const dir = path.join(messagesDir, locale)
  const known: Record<string, string> = {}
  if (fs.existsSync(dir)) {
    for (const name of fs.readdirSync(dir)) {
      Object.assign(
        known,
        JSON.parse(fs.readFileSync(path.join(dir, name), "utf8"))
      )
      fs.rmSync(path.join(dir, name))
    }
  }
  let missing = 0
  for (const [namespace, keys] of byNamespace) {
    const messages: Record<string, string> = {}
    for (const key of keys.sort()) {
      if (known[key]) messages[key] = known[key]
      else missing += 1
    }
    writeJson(fileFor(dir, namespace), messages)
  }
  console.log(`i18n: ${locale} is missing ${missing} of ${total} messages`)
}

console.log(`i18n: ${total} messages in ${byNamespace.size} namespaces`)

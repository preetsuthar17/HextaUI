import { defaultLocale, type Locale } from "@/lib/i18n/config"

type Messages = Record<string, string>

const messagesPath = "lib/i18n/messages"
const fs =
  typeof process !== "undefined" &&
  typeof process.getBuiltinModule === "function"
    ? process.getBuiltinModule("node:fs")
    : undefined
const collectFile =
  typeof process !== "undefined" ? process.env.I18N_COLLECT : undefined
const cached = new Map<string, Messages>()
const collected = new Set<string>()

function namespaceFile(locale: string, namespace: string) {
  return `${messagesPath}/${locale}/${namespace.replaceAll("/", ".")}.json`
}

function readMessages(locale: Locale, namespace: string): Messages {
  const file = namespaceFile(locale, namespace)
  const hit = cached.get(file)
  if (hit) return hit
  let messages: Messages = {}
  try {
    if (fs) messages = JSON.parse(fs.readFileSync(file, "utf8")) as Messages
  } catch {}
  if (process.env.NODE_ENV !== "development") cached.set(file, messages)
  return messages
}

function collect(namespace: string, key: string) {
  if (!collectFile || !fs) return
  const line = JSON.stringify([namespace, key])
  if (collected.has(line)) return
  collected.add(line)
  fs.appendFileSync(collectFile, `${line}\n`)
}

function lookup(locale: Locale, namespace: string, key: string) {
  if (locale === defaultLocale) return undefined
  collect(namespace, key)
  return (
    readMessages(locale, namespace)[key] ?? readMessages(locale, "common")[key]
  )
}

export { collect, lookup, messagesPath, namespaceFile, type Messages }

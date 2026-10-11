import * as React from "react"

import { lookup } from "@/lib/i18n/catalog"
import { defaultLocale } from "@/lib/i18n/config"
import { getRequestLocale } from "@/lib/i18n/request"

type Element = React.ReactElement<Record<string, unknown>>

type Slots = {
  elements: Element[]
  literals: { content: string; element: Element }[]
}

const literalTypes = new Set<unknown>(["code", "kbd", "pre", "samp"])
const tokenPattern = /`([^`]+)`|<l(\d+)\/>|<(\d+)\/>|<(\d+)>|<\/(\d+)>/g

function markLiteral(type: unknown) {
  literalTypes.add(type)
}

function isElement(node: React.ReactNode): node is Element {
  return React.isValidElement(node)
}

function flatten(node: React.ReactNode): React.ReactNode[] {
  if (Array.isArray(node)) return node.flatMap(flatten)
  if (isElement(node) && node.type === React.Fragment) {
    return flatten(node.props.children as React.ReactNode)
  }
  return [node]
}

function textContent(node: React.ReactNode): string {
  return flatten(node)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child)
      }
      return isElement(child)
        ? textContent(child.props.children as React.ReactNode)
        : ""
    })
    .join("")
}

function serializeParts(node: React.ReactNode, slots: Slots): string {
  return flatten(node)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child)
      }
      if (!isElement(child)) return ""
      const children = child.props.children as React.ReactNode
      if (literalTypes.has(child.type)) {
        const content = textContent(children)
        const index = slots.literals.push({ content, element: child }) - 1
        return content && !/[`<>]/.test(content)
          ? `\`${content}\``
          : `<l${index}/>`
      }
      const index = slots.elements.push(child) - 1
      const inner = serializeParts(children, slots)
      return inner ? `<${index}>${inner}</${index}>` : `<${index}/>`
    })
    .join("")
}

function serialize(node: React.ReactNode) {
  const slots: Slots = { elements: [], literals: [] }
  const key = serializeParts(node, slots).replace(/\s+/g, " ").trim()
  return { key, slots }
}

function signature(message: string) {
  return [...message.matchAll(tokenPattern)]
    .map((match) => match[0])
    .sort()
    .join("\n")
}

function isValidTranslation(key: string, value: string) {
  return value.trim().length > 0 && signature(key) === signature(value)
}

function restore(message: string, slots: Slots): React.ReactNode {
  const unused = [...slots.literals]
  const root: React.ReactNode[] = []
  const stack: { index: number; children: React.ReactNode[] }[] = []
  let cursor = 0
  let count = 0

  const push = (node: React.ReactNode) => {
    const target = stack.length ? stack[stack.length - 1].children : root
    target.push(node)
  }
  const withKey = (element: Element, children?: React.ReactNode[]) =>
    children
      ? React.cloneElement(element, { key: `t${count++}` }, ...children)
      : React.cloneElement(element, { key: `t${count++}` })

  for (const match of message.matchAll(tokenPattern)) {
    if (match.index > cursor) push(message.slice(cursor, match.index))
    cursor = match.index + match[0].length
    const [, code, literal, empty, open, close] = match

    if (code !== undefined) {
      const at = unused.findIndex((item) => item.content === code)
      const item =
        at === -1
          ? slots.literals.find((entry) => entry.content === code)
          : unused.splice(at, 1)[0]
      push(item ? withKey(item.element) : code)
    } else if (literal !== undefined) {
      const item = slots.literals[Number(literal)]
      if (item) push(withKey(item.element))
    } else if (empty !== undefined) {
      const element = slots.elements[Number(empty)]
      if (element) push(withKey(element))
    } else if (open !== undefined) {
      stack.push({ index: Number(open), children: [] })
    } else if (close !== undefined) {
      const frame = stack.pop()
      const element = frame ? slots.elements[frame.index] : undefined
      if (frame && element) push(withKey(element, frame.children))
    }
  }
  if (cursor < message.length) push(message.slice(cursor))

  return root
}

function hasWords(key: string) {
  return /\p{L}{2,}/u.test(key.replace(/`[^`]+`/g, ""))
}

function normalize(text: string) {
  return text.replace(/\s+/g, " ").trim()
}

function translateNode(node: React.ReactNode): React.ReactNode {
  const { locale, namespace, translated } = getRequestLocale()
  if (locale === defaultLocale) return node
  const { key, slots } = serialize(node)
  if (!hasWords(key) || translated.has(key)) return node
  const message = lookup(locale, namespace, key)
  if (!message || !isValidTranslation(key, message)) return node
  translated.add(normalize(message))
  return restore(message, slots)
}

function t(text: string, values?: Record<string, string | number>): string {
  const { locale, namespace, translated } = getRequestLocale()
  const fill = (message: string) =>
    values
      ? message.replace(/\{(\w+)\}/g, (match, name: string) =>
          name in values ? String(values[name]) : match
        )
      : message
  const key = normalize(text)
  if (locale === defaultLocale || !hasWords(text) || translated.has(key)) {
    return fill(text)
  }
  const message = lookup(locale, namespace, key)
  if (!message?.trim()) return fill(text)
  const result = fill(message)
  translated.add(normalize(result))
  return result
}

function T({ children }: { children: React.ReactNode }) {
  return <>{translateNode(children)}</>
}

function translateItems(children: React.ReactNode): React.ReactNode {
  if (getRequestLocale().locale === defaultLocale) return children
  return flatten(children).map((child, index) =>
    isElement(child) && child.type === "li"
      ? React.cloneElement(
          child,
          { key: child.key ?? index },
          translateNode(child.props.children as React.ReactNode)
        )
      : child
  )
}

export {
  T,
  hasWords,
  isValidTranslation,
  markLiteral,
  restore,
  serialize,
  t,
  translateItems,
  translateNode,
}

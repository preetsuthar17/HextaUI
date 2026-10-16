import fs from "node:fs"
import path from "node:path"

import { translatedLocales } from "../lib/i18n/config.ts"

type Node = Record<string, unknown>

const root = path.resolve(import.meta.dirname, "..")
const outDir = path.join(root, "out")
const homes = new Set(["/", ...translatedLocales.map((locale) => `/${locale}`)])
const skipped = new Set(["/404", "/_not-found"])

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return entry.name.endsWith(".html") ? [full] : []
  })
}

function routeOf(file: string) {
  const route = `/${path.relative(outDir, file).replace(/\\/g, "/")}`
    .replace(/\.html$/, "")
    .replace(/\/index$/, "")
  return route === "" ? "/" : route
}

function isText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0
}

function isUrl(value: unknown) {
  return typeof value === "string" && /^https:\/\/[^\s]+$/.test(value)
}

function types(node: Node) {
  const type = node["@type"]
  return Array.isArray(type) ? type.map(String) : [String(type)]
}

function nodesOf(data: Node): Node[] {
  const graph = data["@graph"]
  return Array.isArray(graph) ? (graph as Node[]) : [data]
}

function listItems(node: Node, problems: string[], label: string) {
  const items = node.itemListElement
  if (!Array.isArray(items) || items.length === 0) {
    problems.push(`${label}: itemListElement is empty`)
    return []
  }
  items.forEach((item: Node, index) => {
    if (item["@type"] !== "ListItem") {
      problems.push(`${label}: item ${index + 1} is not a ListItem`)
    }
    if (item.position !== index + 1) {
      problems.push(
        `${label}: item ${index + 1} has position ${String(item.position)}`
      )
    }
  })
  return items as Node[]
}

function check(node: Node, problems: string[]) {
  for (const type of types(node)) {
    if (type === "BreadcrumbList") {
      for (const item of listItems(node, problems, type)) {
        if (!isText(item.name)) problems.push(`${type}: an item has no name`)
        if (!isUrl(item.item))
          problems.push(
            `${type}: "${String(item.name)}" has no absolute item URL`
          )
      }
    }
    if (type === "ItemList") {
      for (const item of listItems(node, problems, type)) {
        if (!isUrl(item.url) && !item.item) {
          problems.push(`${type}: "${String(item.name)}" has no url`)
        }
      }
    }
    if (type === "FAQPage") {
      const questions = node.mainEntity
      if (!Array.isArray(questions) || questions.length === 0) {
        problems.push(`${type}: mainEntity is empty`)
      } else {
        for (const question of questions as Node[]) {
          const answer = question.acceptedAnswer as Node | undefined
          if (question["@type"] !== "Question" || !isText(question.name)) {
            problems.push(`${type}: a question has no name`)
          }
          if (answer?.["@type"] !== "Answer" || !isText(answer.text)) {
            problems.push(
              `${type}: "${String(question.name)}" has no answer text`
            )
          }
        }
      }
    }
    if (["TechArticle", "Article", "BlogPosting"].includes(type)) {
      if (!isText(node.headline)) problems.push(`${type}: no headline`)
      if (!isUrl(node.url)) problems.push(`${type}: no absolute url`)
    }
    if (
      ["WebPage", "CollectionPage", "AboutPage", "ContactPage"].includes(type)
    ) {
      if (!isText(node.name)) problems.push(`${type}: no name`)
      if (!isUrl(node.url)) problems.push(`${type}: no absolute url`)
    }
    if (type === "Product") {
      const offers = (
        Array.isArray(node.offers) ? node.offers : [node.offers]
      ) as (Node | undefined)[]
      if (!isText(node.name)) problems.push(`${type}: no name`)
      if (
        !offers.some(
          (offer) =>
            offer &&
            (offer.price !== undefined || offer.lowPrice !== undefined) &&
            isText(offer.priceCurrency)
        ) &&
        !node.review &&
        !node.aggregateRating
      ) {
        problems.push(
          `${type}: needs offers with a price and currency, a review or an aggregateRating`
        )
      }
    }
    if (type === "ImageObject" && !isUrl(node.url)) {
      problems.push(`${type}: no absolute url`)
    }
  }
  for (const value of Object.values(node)) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      "@type" in value
    ) {
      check(value as Node, problems)
    }
  }
}

if (!fs.existsSync(outDir)) process.exit(0)

const failures: string[] = []
let pages = 0
let nodes = 0

for (const file of walk(outDir)) {
  const html = fs.readFileSync(file, "utf8")
  const route = routeOf(file)
  const head = html.slice(0, html.indexOf("</head>"))
  if (
    skipped.has(route) ||
    /<meta name="robots" content="[^"]*noindex/.test(head)
  )
    continue
  pages += 1
  const problems: string[] = []
  const found: Node[] = []
  for (const match of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  )) {
    try {
      found.push(...nodesOf(JSON.parse(match[1]) as Node))
    } catch {
      problems.push("JSON-LD does not parse")
    }
  }
  nodes += found.length
  for (const node of found) check(node, problems)
  if (
    !homes.has(route) &&
    !found.some((node) => types(node).includes("BreadcrumbList"))
  ) {
    problems.push("no BreadcrumbList")
  }
  if (problems.length > 0) {
    failures.push(`  ${route}: ${[...new Set(problems)].join("; ")}`)
  }
}

if (failures.length > 0) {
  console.error(
    `structured data: ${failures.length} of ${pages} pages fail\n${failures.slice(0, 40).join("\n")}`
  )
  process.exit(1)
}

console.log(
  `structured data: ${pages} indexable pages, ${nodes} JSON-LD nodes, all valid`
)

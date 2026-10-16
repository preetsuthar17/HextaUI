type DocsSearchKind =
  | "guide"
  | "component"
  | "hook"
  | "utility"
  | "section"
  | "example"
  | "api"
  | "prop"
  | "attribute"
  | "action"

const recordKinds = ["section", "example", "api", "prop", "attribute"] as const

type DocsSearchRecordKind = (typeof recordKinds)[number]

type DocsSearchRecord = {
  href: string
  page: string
  title: string
  kind: DocsSearchRecordKind
  trail: string[]
  text?: string
  type?: string
  default?: string
}

type DocsSearchIndex = {
  records: DocsSearchRecord[]
  installable: string[]
}

type PackedDocsSearchRecord = [
  kind: number,
  page: number,
  title: string,
  anchor: string,
  trail: number,
  text?: string,
  type?: string,
  fallback?: string,
]

type PackedDocsSearchIndex = {
  pages: string[]
  trails: string[][]
  installable: string[]
  records: PackedDocsSearchRecord[]
}

function docsPageHref(slug: string) {
  return slug === "" ? "/docs" : `/docs/${slug}`
}

function packDocsSearchIndex(index: DocsSearchIndex): PackedDocsSearchIndex {
  const pages: string[] = []
  const trails: string[][] = []
  const trailKeys: string[] = []
  const lookup = (list: string[], value: string) => {
    const found = list.indexOf(value)
    return found === -1 ? list.push(value) - 1 : found
  }

  const records = index.records.map((record) => {
    const packed: PackedDocsSearchRecord = [
      recordKinds.indexOf(record.kind),
      lookup(pages, record.page),
      record.title,
      record.href.startsWith(`${docsPageHref(record.page)}/`)
        ? record.href.slice(docsPageHref(record.page).length)
        : record.href.slice(record.href.indexOf("#") + 1),
      (() => {
        const key = record.trail.join("\u0000")
        const index = lookup(trailKeys, key)
        trails[index] = record.trail
        return index
      })(),
      record.text ?? "",
      record.type ?? "",
      record.default ?? "",
    ]
    while (packed.length > 5 && packed.at(-1) === "") {
      packed.pop()
    }
    return packed
  })

  return { pages, trails, installable: index.installable, records }
}

function unpackDocsSearchIndex(packed: PackedDocsSearchIndex): DocsSearchIndex {
  return {
    installable: packed.installable,
    records: packed.records.map(
      ([kind, page, title, anchor, trail, text, type, fallback]) => {
        const slug = packed.pages[page] ?? ""
        return {
          href: anchor.startsWith("/")
            ? `${docsPageHref(slug)}${anchor}`
            : `${docsPageHref(slug)}#${anchor}`,
          page: slug,
          title,
          kind: recordKinds[kind] ?? "section",
          trail: packed.trails[trail] ?? [],
          ...(text ? { text } : {}),
          ...(type ? { type } : {}),
          ...(fallback ? { default: fallback } : {}),
        }
      }
    ),
  }
}

type DocsSearchDocument = {
  id: string
  title: string
  kind: DocsSearchKind
  page?: string
  trail?: string[]
  keywords?: string[]
  text?: string
  detail?: string
}

type Field = { words: string[]; compact: string }

type PreparedDocument<Document extends DocsSearchDocument> = {
  document: Document
  title: Field
  keywords: Field[]
  page: Field | null
  trail: Field | null
  detail: Field | null
  text: string[]
}

type DocsSearchResult<Document extends DocsSearchDocument> = {
  document: Document
  score: number
}

const kindBoost: Record<DocsSearchKind, number> = {
  component: 0.45,
  hook: 0.45,
  utility: 0.45,
  guide: 0.45,
  action: 0.35,
  section: 0.1,
  example: 0.1,
  api: 0.08,
  prop: 0.05,
  attribute: 0,
}

const weights = {
  title: 1,
  keywords: 0.8,
  page: 0.55,
  trail: 0.45,
  detail: 0.3,
  text: 0.3,
}

function splitWords(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
}

function toField(value: string): Field {
  const words = splitWords(value)
  return { words, compact: words.join("") }
}

function withPairs(words: string[]) {
  return words.concat(
    words.slice(1).map((word, index) => `${words[index]}${word}`)
  )
}

function queryTokens(query: string) {
  return query
    .split(/\s+/)
    .map((part) => splitWords(part).join(""))
    .filter(Boolean)
}

function prepareDocument<Document extends DocsSearchDocument>(
  document: Document
): PreparedDocument<Document> {
  return {
    document,
    title: toField(document.title),
    keywords: (document.keywords ?? []).map(toField),
    page: document.page ? toField(document.page) : null,
    trail: document.trail?.length ? toField(document.trail.join(" ")) : null,
    detail: document.detail ? toField(document.detail) : null,
    text: document.text ? withPairs(splitWords(document.text)) : [],
  }
}

function matchField(token: string, field: Field) {
  if (field.compact === token) {
    return 1
  }
  if (field.compact.startsWith(token)) {
    return 0.9
  }
  if (field.words.includes(token)) {
    return 0.85
  }
  if (field.words.some((word) => word.startsWith(token))) {
    return 0.75
  }
  if (token.length > 1 && field.compact.includes(token)) {
    return 0.55
  }
  return 0
}

function matchWords(token: string, words: string[]) {
  let best = 0
  for (const word of words) {
    if (word === token) {
      return 0.85
    }
    if (best === 0 && token.length > 1 && word.startsWith(token)) {
      best = 0.7
    }
  }
  return best
}

function editDistance(a: string, b: string, limit: number) {
  if (Math.abs(a.length - b.length) > limit) {
    return limit + 1
  }
  let previousPrevious: number[] = []
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index)
  for (let i = 1; i <= a.length; i++) {
    const current = [i]
    let rowMin = i
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      let value = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + cost
      )
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        value = Math.min(value, previousPrevious[j - 2] + 1)
      }
      current[j] = value
      rowMin = Math.min(rowMin, value)
    }
    if (rowMin > limit) {
      return limit + 1
    }
    previousPrevious = previous
    previous = current
  }
  return previous[b.length]
}

function fuzzyField(token: string, field: Field) {
  const limit = token.length >= 7 ? 2 : token.length >= 4 ? 1 : 0
  if (limit === 0) {
    return 0
  }
  let best = limit + 1
  for (const word of [...field.words, field.compact]) {
    for (const length of [token.length - 1, token.length, token.length + 1]) {
      if (length < 1 || length > word.length) {
        continue
      }
      best = Math.min(best, editDistance(token, word.slice(0, length), limit))
    }
  }
  return best > limit ? 0 : 0.45 - best * 0.1
}

function scoreToken<Document extends DocsSearchDocument>(
  token: string,
  prepared: PreparedDocument<Document>,
  fuzzy: boolean
): number {
  if (fuzzy) {
    let best = fuzzyField(token, prepared.title) * weights.title
    for (const keyword of prepared.keywords) {
      best = Math.max(best, fuzzyField(token, keyword) * weights.keywords)
    }
    if (prepared.page) {
      best = Math.max(best, fuzzyField(token, prepared.page) * weights.page)
    }
    return Math.max(best, scoreToken(token, prepared, false))
  }
  let best = matchField(token, prepared.title) * weights.title
  for (const keyword of prepared.keywords) {
    best = Math.max(best, matchField(token, keyword) * weights.keywords)
  }
  if (prepared.page) {
    best = Math.max(best, matchField(token, prepared.page) * weights.page)
  }
  if (prepared.trail) {
    best = Math.max(best, matchField(token, prepared.trail) * weights.trail)
  }
  if (prepared.detail) {
    best = Math.max(best, matchField(token, prepared.detail) * weights.detail)
  }
  if (best < weights.text) {
    best = Math.max(best, matchWords(token, prepared.text) * weights.text)
  }
  return best
}

function scoreDocument<Document extends DocsSearchDocument>(
  tokens: string[],
  compactQuery: string,
  prepared: PreparedDocument<Document>,
  fuzzy: boolean
) {
  let total = 0
  for (const token of tokens) {
    const score = scoreToken(token, prepared, fuzzy)
    if (score === 0) {
      return 0
    }
    total += score
  }
  let bonus = 0
  if (prepared.title.compact === compactQuery) {
    bonus = 0.5
  } else if (prepared.title.compact.startsWith(compactQuery)) {
    bonus = 0.25
  } else if (
    prepared.keywords.some((keyword) => keyword.compact === compactQuery)
  ) {
    bonus = 0.4
  }
  return total / tokens.length + bonus + kindBoost[prepared.document.kind]
}

function createDocsSearch<Document extends DocsSearchDocument>(
  documents: Document[]
) {
  const prepared = documents.map(prepareDocument)

  const run = (tokens: string[], fuzzy: boolean) => {
    const compactQuery = tokens.join("")
    const results: DocsSearchResult<Document>[] = []
    for (const entry of prepared) {
      const score = scoreDocument(tokens, compactQuery, entry, fuzzy)
      if (score > 0) {
        results.push({ document: entry.document, score })
      }
    }
    return results
  }

  return function search(query: string): DocsSearchResult<Document>[] {
    const tokens = queryTokens(query)
    if (tokens.length === 0) {
      return []
    }
    const strict = run(tokens, false)
    const results = strict.length > 0 ? strict : run(tokens, true)
    return results.sort(
      (a, b) =>
        b.score - a.score ||
        a.document.title.length - b.document.title.length ||
        a.document.title.localeCompare(b.document.title)
    )
  }
}

export {
  createDocsSearch,
  docsPageHref,
  packDocsSearchIndex,
  queryTokens,
  splitWords,
  unpackDocsSearchIndex,
}
export type {
  DocsSearchDocument,
  DocsSearchIndex,
  DocsSearchKind,
  DocsSearchRecord,
  DocsSearchRecordKind,
  DocsSearchResult,
  PackedDocsSearchIndex,
}

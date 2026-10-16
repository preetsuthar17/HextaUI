import * as React from "react"

import { DocsSection } from "@/components/docs/docs-content"
import { DocsExample } from "@/components/docs/docs-example"
import {
  DocsPropsTable,
  type DocsProp,
} from "@/components/docs/docs-props-table"
import {
  docsEntries,
  getDocsComponent,
  getDocsExampleHref,
  getDocsSlug,
} from "@/lib/docs"
import {
  docsCell,
  docsCodeCell,
  docsFence,
  docsHeading,
  docsInlineText,
  docsTable,
  getDocsExampleName,
  isElement,
  loadDocsPage,
  toArray,
} from "@/lib/docs-markdown"
import { readDocsSource } from "@/lib/docs-source"
import { clampDescription } from "@/lib/metadata"
import { absoluteUrl } from "@/lib/site"

type DocsExampleEntry = {
  slug: string
  id: string
  file: string
  title: string
  anchor: string
  description?: React.ReactNode
  previewClassName?: string
  demo: React.ReactNode
}

type DocsApiPart = { name: string; props: DocsProp[] }

type DocsPageExamples = {
  examples: DocsExampleEntry[]
  api: DocsApiPart[]
  demo?: { file: string; previewClassName?: string; node: React.ReactNode }
}

type WalkState = { slug: string; api: boolean; part: string | null }

const maxTitleLength = 60

function exampleFileParts(file: string) {
  const [dir = "", id = ""] = file.split("/")
  return { dir, id }
}

function walk(node: React.ReactNode, state: WalkState, out: DocsPageExamples) {
  for (const child of toArray(node)) {
    if (!isElement(child)) continue
    const props = child.props
    const children = props.children as React.ReactNode

    if (child.type === DocsSection) {
      const title = String(props.title)
      if (title === "API reference") {
        walk(children, { ...state, api: true, part: null }, out)
      } else if (state.api) {
        walk(children, { ...state, part: title }, out)
      } else {
        walk(children, state, out)
      }
      continue
    }

    if (child.type === DocsExample) {
      const file = String(props.file)
      const { dir, id } = exampleFileParts(file)
      if (!props.title && !out.demo) {
        out.demo = {
          file,
          previewClassName: props.previewClassName as string | undefined,
          node: children,
        }
      }
      if (props.title && dir === state.slug && id) {
        const title = String(props.title)
        out.examples.push({
          slug: state.slug,
          id,
          file,
          title,
          anchor: getDocsSlug(title),
          description: props.description as React.ReactNode,
          previewClassName: props.previewClassName as string | undefined,
          demo: children,
        })
      }
      continue
    }

    if (child.type === DocsPropsTable && state.api) {
      out.api.push({
        name: state.part ?? getDocsComponent(state.slug).name,
        props: props.props as DocsProp[],
      })
      continue
    }

    walk(children, state, out)
  }
}

const pageCache = new Map<string, Promise<DocsPageExamples>>()

function getDocsPageExamples(slug: string): Promise<DocsPageExamples> {
  const hit = pageCache.get(slug)
  if (hit) return hit
  const result = (async () => {
    const { default: Page } = await loadDocsPage(slug)
    const out: DocsPageExamples = { examples: [], api: [] }
    walk(await Page(), { slug, api: false, part: null }, out)
    return out
  })()
  pageCache.set(slug, result)
  return result
}

async function getDocsExamples(slug: string) {
  return (await getDocsPageExamples(slug)).examples
}

async function getDocsExample(slug: string, id: string) {
  const page = await getDocsPageExamples(slug)
  const example = page.examples.find((item) => item.id === id)
  return example ? { example, api: page.api, siblings: page.examples } : null
}

async function getAllDocsExamples() {
  const pages = await Promise.all(
    docsEntries.map((entry) => getDocsExamples(entry.slug))
  )
  return pages.flat()
}

function skipString(source: string, start: number) {
  const quote = source[start]
  let index = start + 1
  while (index < source.length && source[index] !== quote) {
    if (source[index] === "\\") index += 1
    index += 1
  }
  return index + 1
}

function skipBraces(source: string, start: number) {
  let depth = 0
  let index = start
  while (index < source.length) {
    const char = source[index]
    if (char === '"' || char === "'" || char === "`") {
      index = skipString(source, index)
      continue
    }
    if (char === "{") depth += 1
    if (char === "}") {
      depth -= 1
      if (depth === 0) return index + 1
    }
    index += 1
  }
  return index
}

function jsxAttributes(source: string) {
  const tags = new Map<string, Set<string>>()
  const opening = /<([A-Z][\w.]*)(?=[\s/>])/g
  let match: RegExpExecArray | null
  while ((match = opening.exec(source))) {
    const name = match[1]
    const attributes = tags.get(name) ?? new Set<string>()
    tags.set(name, attributes)
    let index = match.index + match[0].length
    while (index < source.length) {
      const char = source[index]
      if (char === ">" || (char === "/" && source[index + 1] === ">")) break
      if (char === "{") {
        index = skipBraces(source, index)
        continue
      }
      if (char === '"' || char === "'") {
        index = skipString(source, index)
        continue
      }
      const word = /^[A-Za-z_][\w-]*/.exec(source.slice(index, index + 80))
      if (word) {
        attributes.add(word[0])
        index += word[0].length
        continue
      }
      index += 1
    }
    opening.lastIndex = index
  }
  return tags
}

function getExampleProps(api: DocsApiPart[], source: string): DocsApiPart[] {
  const tags = jsxAttributes(source)
  return api.flatMap((part) => {
    const used = tags.get(part.name)
    if (!used) return []
    const props = part.props.filter((prop) => used.has(prop.name))
    return props.length > 0 ? [{ name: part.name, props }] : []
  })
}

function getExampleHeading(name: string, title: string) {
  return title.toLowerCase().startsWith(name.toLowerCase())
    ? title
    : `${name}: ${title}`
}

function getExampleTitle(name: string, title: string) {
  const heading = getExampleHeading(name, title)
  return (
    [
      `${heading} example for React & shadcn/ui`,
      `${heading} example for shadcn/ui`,
      `${heading} example in React`,
      `${heading} example`,
    ].find((candidate) => candidate.length <= maxTitleLength) ?? heading
  )
}

function getExampleText(example: Pick<DocsExampleEntry, "description">) {
  return example.description ? docsInlineText(example.description).trim() : ""
}

function getExampleDescription(
  name: string,
  example: Pick<DocsExampleEntry, "title" | "description">
) {
  const text = getExampleText(example)
  const lead = text
    ? `${text}${/[.!?]$/.test(text) ? "" : "."}`
    : `The ${example.title} example of the ${name} component.`
  return clampDescription(
    `${lead} Live demo and copy-paste source for React, shadcn/ui and Tailwind CSS.`
  )
}

async function getDocsExampleMarkdown(slug: string, id: string) {
  const found = await getDocsExample(slug, id)
  if (!found) return null
  const { example, api, siblings } = found
  const component = getDocsComponent(slug)
  const href = getDocsExampleHref(example.file)
  const file = `components/examples/${example.file}.tsx`
  const source = await readDocsSource(file)
  const text = getExampleText(example)
  const parts = getExampleProps(api, source)
  const others = siblings.filter((item) => item.id !== id)

  return `${[
    docsHeading(1, getExampleHeading(component.name, example.title)),
    ...(text ? [`> ${text}`] : []),
    `Example: ${absoluteUrl(href)}\nComponent docs: ${absoluteUrl(`/docs/${slug}.md`)}`,
    docsHeading(2, "Add this example"),
    docsFence(
      `npx shadcn@latest add ${absoluteUrl(`/r/${getDocsExampleName(example.file)}.json`)}`,
      "bash"
    ),
    `This adds ${"`"}${file}${"`"} with the ${component.name} component and the HextaUI theme tokens.`,
    docsHeading(2, "Source"),
    docsFence(source, "tsx", file),
    ...(parts.length > 0
      ? [
          docsHeading(2, "Props in this example"),
          ...parts.flatMap((part) => [
            docsHeading(3, part.name),
            docsTable(
              ["Prop", "Type", "Default", "Description"],
              part.props.map((prop) => [
                docsCodeCell(prop.name),
                docsCodeCell(prop.type),
                docsCodeCell(prop.default),
                prop.description ? docsCell(prop.description) : "",
              ])
            ),
          ]),
        ]
      : []),
    ...(others.length > 0
      ? [
          docsHeading(2, `More ${component.name} examples`),
          others
            .map(
              (item) =>
                `- [${item.title}](${absoluteUrl(`${getDocsExampleHref(item.file)}.md`)})`
            )
            .join("\n"),
        ]
      : []),
  ].join("\n\n")}\n`
}

export {
  getDocsPageExamples,
  getAllDocsExamples,
  getDocsExampleMarkdown,
  getDocsExample,
  getDocsExampleHref,
  getDocsExamples,
  getExampleDescription,
  getExampleHeading,
  getExampleProps,
  getExampleText,
  getExampleTitle,
  jsxAttributes,
  type DocsApiPart,
  type DocsExampleEntry,
}

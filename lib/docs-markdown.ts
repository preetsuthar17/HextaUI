import * as React from "react"
import Link from "@/components/site/link"

import { DocsCodeBlock } from "@/components/docs/docs-code-block"
import { DocsCommand } from "@/components/docs/docs-command"
import { DocsComponentPage } from "@/components/docs/docs-component-page"
import {
  DocsCode,
  DocsHeading,
  DocsList,
  DocsParagraph,
  DocsSection,
} from "@/components/docs/docs-content"
import { DocsExample } from "@/components/docs/docs-example"
import { DocsInstall } from "@/components/docs/docs-install"
import { DocsPage } from "@/components/docs/docs-page"
import {
  DocsAttributesTable,
  DocsKeyboardTable,
  DocsPropsTable,
  type DocsAttribute,
  type DocsKey,
  type DocsProp,
} from "@/components/docs/docs-props-table"
import {
  docsComponents,
  docsEntries,
  docsGuides,
  docsHooks,
  docsUtilities,
  getDocsComponent,
} from "@/lib/docs"
import { getRegistryKind } from "@/lib/docs-registry"
import { readDocsSource } from "@/lib/docs-source"
import { getAgentGuideMarkdown } from "@/lib/agent-content"
import { agentNotes } from "@/lib/agent-notes"
import { absoluteUrl, siteDescription, siteName, siteUrl } from "@/lib/site"

type Element = React.ReactElement<Record<string, unknown>>

type DocsPageModule = { default: () => React.ReactNode }

type RenderOptions = { source: boolean; slug: string; exampleNames?: boolean }

type DocsMarkdownSection = { title: string; markdown: string }

function isElement(node: React.ReactNode): node is Element {
  return React.isValidElement(node)
}

function toArray(node: React.ReactNode): React.ReactNode[] {
  if (Array.isArray(node)) {
    return node.flatMap(toArray)
  }
  if (isElement(node) && node.type === React.Fragment) {
    return toArray(node.props.children as React.ReactNode)
  }
  return [node]
}

function inlineCode(value: string) {
  const fence = value.includes("`") ? "``" : "`"
  const pad = value.startsWith("`") || value.endsWith("`") ? " " : ""
  return `${fence}${pad}${value}${pad}${fence}`
}

function inline(node: React.ReactNode): string {
  return toArray(node)
    .map((child) => {
      if (child === null || child === undefined || typeof child === "boolean") {
        return ""
      }
      if (typeof child === "string" || typeof child === "number") {
        return String(child)
      }
      if (!isElement(child)) {
        return ""
      }
      const children = child.props.children as React.ReactNode
      if (child.type === DocsCode || child.type === "code") {
        return inlineCode(inline(children))
      }
      if (child.type === "a" || child.type === Link) {
        return `[${inline(children)}](${absoluteUrl(String(child.props.href))})`
      }
      if (child.type === "strong" || child.type === "b") {
        return `**${inline(children)}**`
      }
      if (child.type === "em" || child.type === "i") {
        return `_${inline(children)}_`
      }
      return inline(children)
    })
    .join("")
    .replace(/\s+/g, " ")
}

function cell(node: React.ReactNode) {
  return inline(node).trim().replace(/\|/g, "\\|")
}

function codeCell(value: string | undefined) {
  return value ? inlineCode(value.replace(/\|/g, "\\|")) : "–"
}

function table(head: string[], rows: string[][]) {
  return [
    `| ${head.join(" | ")} |`,
    `| ${head.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n")
}

function fence(code: string, lang = "tsx", title?: string) {
  const source = code.trimEnd()
  const ticks = source.includes("```") ? "````" : "```"
  const meta = title ? ` title="${title}"` : ""
  return `${ticks}${lang}${meta}\n${source}\n${ticks}`
}

function heading(level: number, text: string) {
  return `${"#".repeat(level)} ${text}`
}

async function blocks(
  node: React.ReactNode,
  options: RenderOptions
): Promise<string[]> {
  const output: string[] = []

  for (const child of toArray(node)) {
    if (typeof child === "string" || typeof child === "number") {
      const text = inline(child).trim()
      if (text) {
        output.push(text)
      }
      continue
    }
    if (!isElement(child)) {
      continue
    }
    output.push(...(await element(child, options)))
  }

  return output
}

async function element(
  node: Element,
  options: RenderOptions
): Promise<string[]> {
  const props = node.props
  const children = props.children as React.ReactNode

  if (node.type === DocsComponentPage) {
    const component = getDocsComponent(String(props.slug))
    return [
      ...pageHeader(
        component.name,
        component.description,
        `/docs/${component.slug}`
      ),
      ...(await blocks(children, options)),
    ]
  }

  if (node.type === DocsPage) {
    return [
      ...pageHeader(
        String(props.title),
        props.description ? inline(props.description as React.ReactNode) : "",
        String(props.href)
      ),
      ...(await blocks(children, options)),
    ]
  }

  if (node.type === DocsSection) {
    const description = props.description
      ? inline(props.description as React.ReactNode).trim()
      : ""
    return [
      heading(Number(props.level ?? 2), String(props.title)),
      ...(description ? [description] : []),
      ...(await blocks(children, options)),
    ]
  }

  if (node.type === DocsHeading) {
    return [heading(Number(props.level ?? 2), inline(children).trim())]
  }

  if (node.type === DocsParagraph || node.type === "p") {
    const text = inline(children).trim()
    return text ? [text] : []
  }

  if (node.type === DocsList || node.type === "ul" || node.type === "ol") {
    const ordered = node.type === "ol"
    const items = toArray(children)
      .filter(isElement)
      .map((item, index) => {
        const marker = ordered ? `${index + 1}.` : "-"
        return `${marker} ${inline(item.props.children as React.ReactNode).trim()}`
      })
    return items.length > 0 ? [items.join("\n")] : []
  }

  if (node.type === DocsCodeBlock) {
    return [
      fence(
        String(props.code),
        props.lang ? String(props.lang) : "tsx",
        props.title ? String(props.title) : undefined
      ),
    ]
  }

  if (node.type === DocsExample) {
    const file = `components/examples/${String(props.file)}.tsx`
    const code = options.source
      ? [fence(await readDocsSource(file), "tsx", file)]
      : []
    if (!props.title) {
      return code
    }
    const description = props.description
      ? inline(props.description as React.ReactNode).trim()
      : ""
    return [
      heading(Number(props.level ?? 3), String(props.title)),
      ...(description ? [description] : []),
      ...(options.exampleNames
        ? [`Example: ${inlineCode(getDocsExampleName(String(props.file)))}`]
        : []),
      ...code,
    ]
  }

  if (node.type === DocsInstall) {
    const dependencies = props.dependencies as string[]
    const files = props.files as string[]
    const kind = getRegistryKind(files)
    const install = [
      heading(2, "Installation"),
      heading(3, "CLI"),
      fence(
        `npx shadcn@latest add ${absoluteUrl(`/r/${options.slug}.json`)}`,
        "bash"
      ),
      kind === "component"
        ? "This adds the component, the HextaUI theme tokens and any HextaUI components it depends on."
        : `This adds the ${kind} and anything it depends on.`,
      heading(3, "Manual"),
      ...(kind === "component"
        ? [
            `Add the HextaUI theme tokens (${absoluteUrl("/docs/installation#theme")}) to your global CSS if you haven't yet, then install the dependencies.`,
          ]
        : []),
      ...(dependencies.length > 0
        ? [fence(`pnpm add ${dependencies.join(" ")}`, "bash")]
        : []),
    ]
    if (!options.source) {
      return [
        ...install,
        `Copy ${files.map(inlineCode).join(", ")} into your project. Their source is in this page's Markdown.`,
      ]
    }
    const sources = await Promise.all(
      files.map(async (file) =>
        fence(
          await readDocsSource(file),
          file.endsWith(".tsx") ? "tsx" : "ts",
          file
        )
      )
    )
    return [
      ...install,
      "Copy and paste the following code into your project.",
      ...sources,
      "Update the import paths to match your project setup.",
    ]
  }

  if (node.type === DocsCommand) {
    const packages = (props.packages as string[]).join(" ")
    return [
      fence(
        props.mode === "dlx" ? `npx ${packages}` : `pnpm add ${packages}`,
        "bash"
      ),
    ]
  }

  if (node.type === DocsPropsTable) {
    const rows = (props.props as DocsProp[]).map((prop) => [
      codeCell(prop.name),
      codeCell(prop.type),
      codeCell(prop.default),
      prop.description ? cell(prop.description) : "",
    ])
    return [table(["Prop", "Type", "Default", "Description"], rows)]
  }

  if (node.type === DocsKeyboardTable) {
    const rows = (props.keys as DocsKey[]).map((row) => [
      row.keys.map((key) => codeCell(key)).join(" "),
      cell(row.description),
    ])
    return [table(["Key", "Action"], rows)]
  }

  if (node.type === DocsAttributesTable) {
    const rows = (props.attributes as DocsAttribute[]).map((attribute) => [
      codeCell(attribute.name),
      cell(attribute.description),
    ])
    return [table([String(props.label ?? "Attribute"), "Description"], rows)]
  }

  return blocks(children, options)
}

function getDocsExampleName(file: string) {
  return file.replace("/", "-")
}

function pageHeader(title: string, description: string, href: string) {
  return [
    heading(1, title),
    ...(description ? [`> ${description.trim()}`] : []),
    `Docs: ${absoluteUrl(href)}\nMarkdown: ${absoluteUrl(`${href}.md`)}`,
  ]
}

function loadDocsPage(slug: string): Promise<DocsPageModule> {
  return slug === ""
    ? import("../app/docs/page")
    : import(`../app/docs/${slug}/page`)
}

function findDocsElement(
  node: React.ReactNode,
  type: React.ElementType
): Element | undefined {
  for (const child of toArray(node)) {
    if (!isElement(child)) {
      continue
    }
    if (child.type === type) {
      return child
    }
    const found = findDocsElement(child.props.children as React.ReactNode, type)
    if (found) {
      return found
    }
  }
  return undefined
}

async function renderDocsPage(slug: string, options: RenderOptions) {
  const { default: Page } = await loadDocsPage(slug)
  return blocks(await Page(), options)
}

function sectionTitle(node: React.ReactNode) {
  if (!isElement(node)) {
    return "Overview"
  }
  if (node.type === DocsSection) {
    return String(node.props.title)
  }
  if (node.type === DocsInstall) {
    return "Installation"
  }
  return "Overview"
}

async function getDocsSections(slug: string): Promise<DocsMarkdownSection[]> {
  const { default: Page } = await loadDocsPage(slug)
  const tree = await Page()
  const page =
    findDocsElement(tree, DocsComponentPage) ?? findDocsElement(tree, DocsPage)
  const sections: DocsMarkdownSection[] = []

  for (const child of toArray(page?.props.children as React.ReactNode)) {
    const markdown = (
      await blocks(child, { source: false, slug, exampleNames: true })
    ).join("\n\n")
    if (!markdown) {
      continue
    }
    const title = sectionTitle(child)
    const previous = sections.at(-1)
    if (title === "Overview" && previous?.title === "Overview") {
      previous.markdown = `${previous.markdown}\n\n${markdown}`
    } else {
      sections.push({ title, markdown })
    }
  }

  return sections
}

async function getDocsMarkdown(slug: string) {
  const output = await renderDocsPage(slug, { source: true, slug })

  if (docsEntries.some((item) => item.slug === slug)) {
    output.push(
      heading(2, "Notes for AI assistants"),
      agentNotes.map((note) => `- ${note}`).join("\n"),
      `Every ${siteName} doc: ${absoluteUrl("/llms.txt")}`
    )
  }

  return `${output.join("\n\n")}\n`
}

const docsMarkdownPages = [
  ...docsGuides.map((item) => item.slug),
  ...docsEntries.map((item) => item.slug),
]

function getDocsMarkdownHref(slug: string) {
  return slug === "" ? "/docs.md" : `/docs/${slug}.md`
}

function list(entries: typeof docsEntries) {
  return entries
    .map(
      (entry) =>
        `- [${entry.name}](${absoluteUrl(getDocsMarkdownHref(entry.slug))}): ${entry.description}`
    )
    .join("\n")
}

function guideList() {
  return docsGuides
    .map(
      (guide) =>
        `- [${guide.title}](${absoluteUrl(getDocsMarkdownHref(guide.slug))}): ${guide.description}`
    )
    .join("\n")
}

function getDocsLlms() {
  return `${[
    heading(1, `${siteName} docs`),
    `> Every ${siteName} docs page as Markdown: guides, components, hooks and utilities. Each component page has installation, usage, examples, keyboard support and an API reference.`,
    agentNotes.map((note) => `- ${note}`).join("\n"),
    heading(2, "Guides"),
    guideList(),
    heading(2, "Components"),
    list(docsComponents),
    heading(2, "Hooks"),
    list(docsHooks),
    heading(2, "Utilities"),
    list(docsUtilities),
    heading(2, "Optional"),
    `- [Site index](${absoluteUrl("/llms.txt")}): what ${siteName} is, when to use it, and every developer resource.`,
  ].join("\n\n")}\n`
}

function getLlmsIndex() {
  return `${[
    heading(1, siteName),
    `> ${siteDescription} Accessible React components on Base UI and Tailwind CSS v4 that you copy into your project and own.`,
    `${siteName} keeps the shadcn/ui API and adds the details that make an interface feel finished: interruptible motion, reduced-motion fallbacks, keyboard support, right-to-left layouts and touch-sized targets. Every component is tested against its edge cases before it ships.`,
    [
      ...agentNotes.map((note) => `- ${note}`),
      "- Each component page lists its dependencies, the full source to copy, usage, examples, keyboard support and an API reference.",
      `- The shadcn registry index is ${absoluteUrl("/r/registry.json")}. Register it as a namespace in components.json with \`"registries": { "@hextaui": "${siteUrl}/r/{name}.json" }\` to run \`npx shadcn@latest add @hextaui/<name>\` or browse it through the shadcn MCP server.`,
      `- Without the CLI, add the theme tokens from ${absoluteUrl("/docs/installation#theme")} before copying component files.`,
      `- Append \`.md\` to any docs URL for its Markdown, for example ${absoluteUrl("/docs/button.md")}.`,
    ].join("\n"),
    getAgentGuideMarkdown(2),
    heading(2, "Developer resources"),
    [
      `- [OpenAPI spec](${absoluteUrl("/openapi.json")}): every HTTP endpoint with operation ids, typed parameters and response schemas.`,
      `- [API docs](${absoluteUrl("/docs/api.md")}): public endpoints, authentication with sessions and API tokens, and RFC 9457 error responses.`,
      `- [MCP server](${absoluteUrl("/docs/mcp.md")}): Streamable HTTP at ${absoluteUrl("/mcp")}, server card at ${absoluteUrl("/.well-known/mcp/server-card.json")}.`,
      `- [Agent skill](${absoluteUrl("/.well-known/agent-skills/hextaui/SKILL.md")}): how an agent should find, read and install ${siteName} components.`,
      `- [Authentication](${absoluteUrl("/docs/api.md")}): public endpoints need no key; Pro endpoints take an API token as a bearer token, described by ${absoluteUrl("/.well-known/oauth-protected-resource")}.`,
      `- [Pricing](${absoluteUrl("/pricing.md")}): free MIT components and the one-time ${siteName} Pro price.`,
      `- [API catalog](${absoluteUrl("/.well-known/api-catalog")}) (RFC 9727) and [ARD catalog](${absoluteUrl("/.well-known/ard.json")}).`,
    ].join("\n"),
    heading(2, "Docs"),
    guideList(),
    heading(2, "Components"),
    list(docsComponents),
    heading(2, "Hooks"),
    list(docsHooks),
    heading(2, "Utilities"),
    list(docsUtilities),
    heading(2, "Optional"),
    `- [Docs index](${absoluteUrl("/docs/llms.txt")}): only the docs pages, for agents that need component context and nothing else.`,
    `- [Pro blocks index](${absoluteUrl("/blocks/llms.txt")}): the ${siteName} Pro blocks and how to install them.`,
    `- [Blog index](${absoluteUrl("/blog/llms.txt")}): articles on shadcn/ui, Base UI, AI chat interfaces and agent-ready registries, each with a Markdown twin.`,
    `- [Full documentation](${absoluteUrl("/llms-full.txt")}): Every docs page in one file, with usage, installation, keyboard support and API reference. Component source and example code live in each component's Markdown page.`,
  ].join("\n\n")}\n`
}

async function getLlmsFull() {
  const pages = await Promise.all(
    docsMarkdownPages.map((slug) =>
      renderDocsPage(slug, { source: false, slug })
    )
  )
  return `${[getLlmsIndex(), ...pages.map((page) => `${page.join("\n\n")}\n`)].join("\n---\n\n")}`
}

export {
  codeCell as docsCodeCell,
  docsMarkdownPages,
  fence as docsFence,
  findDocsElement,
  getDocsExampleName,
  getDocsSections,
  inline as docsInlineText,
  isElement,
  toArray,
  getDocsMarkdown,
  getDocsLlms,
  getDocsMarkdownHref,
  getLlmsFull,
  getLlmsIndex,
  heading as docsHeading,
  loadDocsPage,
  table as docsTable,
  cell as docsCell,
}

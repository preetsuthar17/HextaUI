import * as React from "react"
import type { BundledLanguage, SpecialLanguage } from "shiki"

import { DocsCodeBlock } from "@/components/docs/docs-code-block"
import {
  DocsCode,
  DocsHeading,
  DocsList,
  DocsParagraph,
} from "@/components/docs/docs-content"
import { LegalLink, LegalSection } from "@/components/legal/legal-page"
import { CompareTable } from "@/components/site/compare"
import type { BlogBlock, InlineNode } from "@/lib/blog-markdown"
import { getDocsSlug } from "@/lib/docs"
import { translateItems } from "@/lib/i18n/rich"
import { siteUrl } from "@/lib/site"

type Section = { title?: string; blocks: BlogBlock[] }

function localHref(href: string) {
  if (href === siteUrl) return "/"
  return href.startsWith(`${siteUrl}/`) ? href.slice(siteUrl.length) : href
}

function renderInline(nodes: InlineNode[]): React.ReactNode[] {
  return nodes.map((node, index) => {
    switch (node.type) {
      case "text":
        return node.text
      case "code":
        return <DocsCode key={index}>{node.text}</DocsCode>
      case "strong":
        return (
          <strong key={index} className="font-medium text-foreground">
            {renderInline(node.children)}
          </strong>
        )
      case "link":
        return (
          <LegalLink key={index} href={localHref(node.href)}>
            {renderInline(node.children)}
          </LegalLink>
        )
    }
  })
}

function codeLanguage(lang: string): BundledLanguage | SpecialLanguage {
  return (lang || "text") as BundledLanguage | SpecialLanguage
}

function Block({ block, caption }: { block: BlogBlock; caption: string }) {
  switch (block.type) {
    case "heading":
      return (
        <DocsHeading id={getDocsSlug(block.text)} level={3}>
          {block.text}
        </DocsHeading>
      )
    case "paragraph":
      return <DocsParagraph>{renderInline(block.children)}</DocsParagraph>
    case "list": {
      const items = block.items.map((item, index) => (
        <li key={index}>{renderInline(item)}</li>
      ))
      return block.ordered ? (
        <ol className="mt-4 flex list-decimal flex-col gap-2 ps-5 text-base/7 text-muted-foreground marker:text-muted-foreground">
          {translateItems(items)}
        </ol>
      ) : (
        <DocsList>{items}</DocsList>
      )
    }
    case "code":
      return (
        <DocsCodeBlock
          code={block.code}
          lang={codeLanguage(block.lang)}
          className="mt-4"
        />
      )
    case "table":
      return (
        <CompareTable
          caption={caption}
          rowHeader={block.head[0] || undefined}
          columns={block.head.slice(1)}
          rows={block.rows.map(([label = "", ...values]) => ({
            label,
            values,
          }))}
        />
      )
  }
}

function groupSections(blocks: BlogBlock[]) {
  const sections: Section[] = []
  for (const block of blocks) {
    if (block.type === "heading" && block.level === 2) {
      sections.push({ title: block.text, blocks: [] })
      continue
    }
    const current = sections.at(-1)
    if (current) current.blocks.push(block)
    else sections.push({ blocks: [block] })
  }
  return sections
}

function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  return groupSections(blocks).map((section, index) => {
    const content = section.blocks.map((block, position) => (
      <Block key={position} block={block} caption={section.title ?? "Table"} />
    ))
    return section.title ? (
      <LegalSection key={index} title={section.title}>
        {content}
      </LegalSection>
    ) : (
      <React.Fragment key={index}>{content}</React.Fragment>
    )
  })
}

export { BlogBody }

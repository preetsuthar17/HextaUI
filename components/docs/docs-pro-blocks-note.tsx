import * as React from "react"

import { TrackedLink } from "@/components/site/tracked-link"
import type { RelatedLink } from "@/lib/docs-related"
import { t } from "@/lib/i18n/rich"
import { getRequestLocale } from "@/lib/i18n/request"

const maxNamedBlocks = 3

const linkClassName =
  "rounded-sm whitespace-nowrap text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors duration-150 ease-out-cubic outline-none hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:outline-hidden motion-reduce:transition-none"

function DocsProBlocksNote({ links }: { links: RelatedLink[] }) {
  if (links.length === 0) {
    return null
  }

  const named = links.slice(0, maxNamedBlocks)
  const rest = links.length - named.length
  const items = [
    ...named.map((link) => ({ href: link.href, label: link.title })),
    ...(rest > 0
      ? [{ href: "/blocks", label: t("{count} more", { count: rest }) }]
      : []),
  ]
  const parts = new Intl.ListFormat(getRequestLocale().locale, {
    type: "conjunction",
  }).formatToParts(items.map((item) => item.label))
  const [before, after = ""] = t("Used in Pro blocks: {blocks}").split(
    "{blocks}"
  )
  let index = 0

  return (
    <p className="text-sm text-pretty text-muted-foreground">
      {before}
      {parts.map((part, partIndex) => {
        if (part.type === "literal") {
          return <React.Fragment key={partIndex}>{part.value}</React.Fragment>
        }
        const item = items[index++]
        return (
          <TrackedLink
            key={item.href}
            href={item.href}
            event="Pro link clicked"
            eventProps={{ from: "component-note", to: item.href }}
            className={linkClassName}
          >
            {item.label}
          </TrackedLink>
        )
      })}
      {after}
    </p>
  )
}

export { DocsProBlocksNote }

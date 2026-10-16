import type * as React from "react"
import Link from "@/components/site/link"
import { cn } from "cn"

import { DocsSection } from "@/components/docs/docs-content"
import { TrackedLink } from "@/components/site/tracked-link"
import type { RelatedLink } from "@/lib/docs-related"
import { t } from "@/lib/i18n/rich"

const linkClassName =
  "transition-colors duration-150 ease-out-cubic outline-none hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:outline-hidden motion-reduce:transition-none"

type RelatedEvent = { name: string; from: string }

function RelatedLinkItem({
  link,
  event,
  className,
  children,
}: {
  link: RelatedLink
  event?: RelatedEvent
  className: string
  children: React.ReactNode
}) {
  return event ? (
    <TrackedLink
      href={link.href}
      event={event.name}
      eventProps={{ from: event.from, to: link.href }}
      className={className}
    >
      {children}
    </TrackedLink>
  ) : (
    <Link href={link.href} className={className}>
      {children}
    </Link>
  )
}

function DocsRelatedCards({
  links,
  event,
}: {
  links: RelatedLink[]
  event?: RelatedEvent
}) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {links.map((link) => (
        <li key={link.href} className="flex min-w-0">
          <RelatedLinkItem
            link={link}
            event={event}
            className={cn(
              "flex min-w-0 flex-1 flex-col gap-1 rounded-lg border px-4 py-3",
              linkClassName
            )}
          >
            <span className="truncate text-sm font-medium">{link.title}</span>
            <span className="line-clamp-2 text-sm text-pretty text-muted-foreground">
              {t(link.description)}
            </span>
          </RelatedLinkItem>
        </li>
      ))}
    </ul>
  )
}

function DocsRelatedNames({ links }: { links: RelatedLink[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={cn(
              "inline-flex rounded-md border px-2.5 py-1 text-sm",
              linkClassName
            )}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function DocsRelated({
  id,
  title,
  description,
  links,
  variant = "cards",
  event,
  children,
}: {
  id?: string
  title: string
  description?: string
  links: RelatedLink[]
  variant?: "cards" | "names"
  event?: RelatedEvent
  children?: React.ReactNode
}) {
  if (links.length === 0) {
    return null
  }

  return (
    <DocsSection id={id} title={title} description={description}>
      {variant === "names" ? (
        <DocsRelatedNames links={links} />
      ) : (
        <DocsRelatedCards links={links} event={event} />
      )}
      {children}
    </DocsSection>
  )
}

export { DocsRelated }

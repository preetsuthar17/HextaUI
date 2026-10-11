import Link from "@/components/site/link"
import { cn } from "cn"

import { DocsSection } from "@/components/docs/docs-content"
import type { RelatedLink } from "@/lib/docs-related"
import { t } from "@/lib/i18n/rich"

const linkClassName =
  "transition-colors duration-150 ease-out-cubic outline-none hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:outline-hidden motion-reduce:transition-none"

function DocsRelatedCards({ links }: { links: RelatedLink[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {links.map((link) => (
        <li key={link.href} className="flex min-w-0">
          <Link
            href={link.href}
            className={cn(
              "flex min-w-0 flex-1 flex-col gap-1 rounded-lg border px-4 py-3",
              linkClassName
            )}
          >
            <span className="truncate text-sm font-medium">{link.title}</span>
            <span className="line-clamp-2 text-sm text-pretty text-muted-foreground">
              {t(link.description)}
            </span>
          </Link>
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
  title,
  description,
  links,
  variant = "cards",
}: {
  title: string
  description?: string
  links: RelatedLink[]
  variant?: "cards" | "names"
}) {
  if (links.length === 0) {
    return null
  }

  return (
    <DocsSection title={title} description={description}>
      {variant === "names" ? (
        <DocsRelatedNames links={links} />
      ) : (
        <DocsRelatedCards links={links} />
      )}
    </DocsSection>
  )
}

export { DocsRelated }

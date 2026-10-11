import Link from "@/components/site/link"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { cn } from "cn"

import { getDocsPager } from "@/lib/docs"
import type { DocsNavItem } from "@/lib/docs"
import { t } from "@/lib/i18n/rich"

function DocsPagerLink({
  item,
  direction,
}: {
  item: DocsNavItem
  direction: "previous" | "next"
}) {
  const next = direction === "next"

  return (
    <Link
      href={item.href}
      className={cn(
        "group/pager flex min-w-0 flex-1 flex-col gap-1 rounded-lg border px-4 py-3 transition-colors duration-150 ease-out-cubic outline-none hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:outline-hidden motion-reduce:transition-none",
        next && "items-end text-end"
      )}
    >
      <span className="text-xs text-muted-foreground">
        {next ? t("Next") : t("Previous")}
      </span>
      <span className="flex max-w-full items-center gap-1.5 text-sm font-medium">
        {next ? null : (
          <IconArrowLeft
            aria-hidden="true"
            className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ease-out-quint group-hover/pager:-translate-x-0.5 motion-reduce:transition-none rtl:rotate-180 rtl:group-hover/pager:translate-x-0.5"
          />
        )}
        <span className="truncate">{t(item.title)}</span>
        {next ? (
          <IconArrowRight
            aria-hidden="true"
            className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ease-out-quint group-hover/pager:translate-x-0.5 motion-reduce:transition-none rtl:rotate-180 rtl:group-hover/pager:-translate-x-0.5"
          />
        ) : null}
      </span>
    </Link>
  )
}

function DocsPager({
  href,
  items,
  className,
}: {
  href: string
  items?: DocsNavItem[]
  className?: string
}) {
  const { previous, next } = getDocsPager(href, items)

  if (!previous && !next) {
    return null
  }

  return (
    <nav aria-label={t("Pagination")} className={cn("flex gap-3", className)}>
      {previous ? (
        <DocsPagerLink item={previous} direction="previous" />
      ) : (
        <span className="flex-1" />
      )}
      {next ? (
        <DocsPagerLink item={next} direction="next" />
      ) : (
        <span className="flex-1" />
      )}
    </nav>
  )
}

export { DocsPager }

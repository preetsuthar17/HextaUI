import Link from "@/components/site/link"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { getDocsPager } from "@/lib/docs"
import type { DocsNavItem } from "@/lib/docs"

function DocsPageNavButton({
  item,
  direction,
}: {
  item?: DocsNavItem
  direction: "previous" | "next"
}) {
  const label = direction === "next" ? "Next" : "Previous"
  const Icon = direction === "next" ? IconChevronRight : IconChevronLeft
  const icon = <Icon className="rtl:rotate-180" />

  if (!item) {
    return (
      <Button variant="secondary" size="icon-sm" aria-label={label} disabled>
        {icon}
      </Button>
    )
  }

  return (
    <Button
      variant="secondary"
      size="icon-sm"
      aria-label={`${label}: ${item.title}`}
      title={item.title}
      nativeButton={false}
      render={<Link href={item.href} />}
    >
      {icon}
    </Button>
  )
}

function DocsPageNav({
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
    <ButtonGroup aria-label="Page navigation" className={className}>
      <DocsPageNavButton item={previous} direction="previous" />
      <ButtonGroupSeparator />
      <DocsPageNavButton item={next} direction="next" />
    </ButtonGroup>
  )
}

export { DocsPageNav }

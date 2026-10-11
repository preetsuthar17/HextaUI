"use client"

import * as React from "react"
import Link from "@/components/site/link"
import { useRouter } from "next/navigation"
import { IconArrowRight } from "@tabler/icons-react"
import { cn } from "cn"

function CatalogCard({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      className={cn(
        "relative flex min-w-0 flex-col gap-1 rounded-lg bg-muted p-1 [--catalog-inner-radius:calc(var(--catalog-radius)-var(--catalog-inset))] [--catalog-inset:calc(var(--spacing)*1)] [--catalog-radius:var(--radius-lg)] dark:bg-muted/50",
        className
      )}
      {...props}
    />
  )
}

function CatalogCardPreview({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-(--catalog-inner-radius) bg-background after:pointer-events-none after:absolute after:inset-0 after:rounded-(--catalog-inner-radius) after:inset-ring-(length:--hairline) after:inset-ring-border",
        className
      )}
      {...props}
    />
  )
}

function IntentLink({
  href,
  onPointerEnter,
  onFocus,
  ...props
}: React.ComponentProps<typeof Link> & { href: string }) {
  const router = useRouter()

  return (
    <Link
      href={href}
      prefetch={false}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        router.prefetch(href)
      }}
      onFocus={(event) => {
        onFocus?.(event)
        router.prefetch(href)
      }}
      {...props}
    />
  )
}

function CatalogCardLink({
  className,
  children,
  ...props
}: React.ComponentProps<typeof IntentLink>) {
  return (
    <IntentLink
      className={cn(
        "group/link flex items-center justify-between gap-2 rounded-(--catalog-inner-radius) px-2.5 pt-1.5 pb-2 text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:outline-hidden",
        className
      )}
      {...props}
    >
      {children}
      <IconArrowRight
        aria-hidden
        className="size-4 text-muted-foreground transition duration-150 ease-out-cubic group-hover/link:translate-x-0.5 group-hover/link:text-foreground motion-reduce:transition-none rtl:-scale-x-100 rtl:group-hover/link:-translate-x-0.5"
      />
    </IntentLink>
  )
}

function CatalogGrid({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        "grid gap-4 in-data-[catalog-view=list]:hidden sm:grid-cols-2 sm:in-data-[catalog-view=single]:grid-cols-1 lg:grid-cols-3 lg:in-data-[catalog-view=single]:grid-cols-1",
        className
      )}
      {...props}
    />
  )
}

function CatalogList({ items }: { items: { href: string; title: string }[] }) {
  return (
    <ul className="hidden grid-cols-2 gap-2 in-data-[catalog-view=list]:grid sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.href}>
          <IntentLink
            href={item.href}
            className="flex rounded-lg border px-4 py-3 text-sm font-medium transition-colors duration-150 outline-none hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:outline-hidden motion-reduce:transition-none"
          >
            {item.title}
          </IntentLink>
        </li>
      ))}
    </ul>
  )
}

export {
  CatalogCard,
  CatalogCardLink,
  CatalogCardPreview,
  CatalogGrid,
  CatalogList,
}

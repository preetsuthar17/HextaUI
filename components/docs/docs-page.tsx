import * as React from "react"
import { cn } from "cn"

import { DocsPageActions } from "@/components/docs/docs-page-actions"
import { DocsPageNav } from "@/components/docs/docs-page-nav"
import { DocsPager } from "@/components/docs/docs-pager"
import { DocsSponsor } from "@/components/docs/docs-sponsor"
import { DocsToc } from "@/components/docs/docs-toc"
import type { DocsNavItem, DocsTocItem } from "@/lib/docs"
import { t, translateNode } from "@/lib/i18n/rich"

function DocsPage({
  href,
  title,
  description,
  markdownHref,
  registryHref,
  toc,
  navItems,
  note,
  actions,
  eyebrow,
  className,
  children,
}: {
  href: string
  title: string
  description?: React.ReactNode
  markdownHref?: string
  registryHref?: string
  toc?: DocsTocItem[]
  navItems?: DocsNavItem[]
  note?: React.ReactNode
  actions?: React.ReactNode
  eyebrow?: React.ReactNode
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      data-docs-page=""
      className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_13rem] xl:gap-10"
    >
      <article
        className={cn(
          "mx-auto flex w-full max-w-2xl min-w-0 flex-col px-4 pt-8 pb-16 sm:px-6 lg:pt-14",
          className
        )}
      >
        <header className="flex flex-col gap-2">
          {eyebrow}
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
            <h1 className="min-w-0 text-3xl font-semibold tracking-tight text-balance wrap-break-word">
              {t(title)}
            </h1>
            <div className="mt-0.5 flex shrink-0 items-center gap-2">
              {actions}
              {markdownHref ? (
                <DocsPageActions
                  markdownHref={markdownHref}
                  registryHref={registryHref}
                />
              ) : null}
              <DocsPageNav
                href={href}
                items={navItems}
                className="max-sm:hidden"
              />
            </div>
          </div>
          {description ? (
            <p className="text-base/6 text-pretty text-muted-foreground">
              {translateNode(description)}
            </p>
          ) : null}
          {note}
        </header>
        <div data-docs-content="" className="flex flex-col">
          {children}
        </div>
        <DocsPager href={href} items={navItems} className="mt-16" />
      </article>
      <div className="hidden xl:block">
        <div className="sticky top-14 flex flex-col gap-8 pe-4 pt-10 pb-14">
          <DocsToc
            items={toc?.map((item) => ({ ...item, title: t(item.title) }))}
          />
          <DocsSponsor className="[@media(max-height:40rem)]:hidden" />
        </div>
      </div>
    </div>
  )
}

export { DocsPage }

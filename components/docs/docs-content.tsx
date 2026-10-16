import * as React from "react"
import { cn } from "cn"

import { getDocsSlug } from "@/lib/docs"
import { markLiteral, t, translateItems, translateNode } from "@/lib/i18n/rich"

function DocsHeading({
  id,
  level = 2,
  className,
  children,
}: {
  id: string
  level?: 2 | 3
  className?: string
  children: React.ReactNode
}) {
  const Tag = level === 2 ? "h2" : "h3"

  return (
    <Tag
      id={id}
      data-docs-heading=""
      className={cn(
        "group/heading scroll-mt-20 font-semibold tracking-tight text-balance lg:scroll-mt-8",
        level === 2 ? "mt-12 text-xl" : "mt-8 text-lg",
        className
      )}
    >
      <a
        href={`#${id}`}
        className="rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:outline-hidden"
      >
        <span data-docs-heading-text="">{translateNode(children)}</span>
        <span
          aria-hidden="true"
          className="heading-anchor ms-2 text-muted-foreground opacity-0 transition-opacity duration-150 group-hover/heading:opacity-100 group-has-focus-visible/heading:opacity-100 motion-reduce:transition-none"
        />
      </a>
    </Tag>
  )
}

function DocsParagraph({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "mt-4 text-base/7 text-pretty text-muted-foreground",
        className
      )}
      {...props}
    >
      {translateNode(children)}
    </p>
  )
}

function DocsList({
  className,
  children,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        "mt-4 flex list-disc flex-col gap-2 ps-5 text-base/7 text-muted-foreground marker:text-border",
        className
      )}
      {...props}
    >
      {translateItems(children)}
    </ul>
  )
}

function DocsCode({ className, ...props }: React.ComponentProps<"code">) {
  return (
    <code
      className={cn(
        "rounded-sm bg-muted px-1 py-0.5 font-mono text-sm text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DocsSection({
  title,
  description,
  id,
  level = 2,
  action,
  className,
  children,
}: {
  title: string
  description?: React.ReactNode
  id?: string
  level?: 2 | 3
  action?: React.ReactNode
  className?: string
  children?: React.ReactNode
}) {
  return (
    <section
      className={cn(
        "flex flex-col gap-4",
        level === 2 ? "mt-14" : "mt-10",
        className
      )}
    >
      <div className="flex flex-col gap-1.5">
        {action ? (
          <div className="flex items-baseline justify-between gap-4">
            <DocsHeading
              id={id ?? getDocsSlug(title)}
              level={level}
              className={cn("mt-0", level === 2 ? "text-xl" : "text-base")}
            >
              {t(title)}
            </DocsHeading>
            {action}
          </div>
        ) : (
          <DocsHeading
            id={id ?? getDocsSlug(title)}
            level={level}
            className={cn("mt-0", level === 2 ? "text-xl" : "text-base")}
          >
            {t(title)}
          </DocsHeading>
        )}
        {description ? (
          <p className="text-base/7 text-pretty text-muted-foreground">
            {translateNode(description)}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

markLiteral(DocsCode)

export { DocsCode, DocsHeading, DocsList, DocsParagraph, DocsSection }

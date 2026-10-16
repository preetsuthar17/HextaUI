import * as React from "react"

import { JsonLd } from "@/components/site/json-ld"
import { t } from "@/lib/i18n/rich"
import { pageJsonLd, type Crumb } from "@/lib/structured-data"

function InfoPage({
  title,
  lead,
  eyebrow,
  breadcrumbs,
  pageType,
  children,
}: {
  title: string
  lead: string
  eyebrow?: React.ReactNode
  breadcrumbs?: Crumb[]
  pageType?: "WebPage" | "AboutPage" | "ContactPage"
  children: React.ReactNode
}) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pt-16 pb-24">
      {breadcrumbs?.length ? (
        <JsonLd
          data={pageJsonLd({
            path: breadcrumbs[breadcrumbs.length - 1].path,
            name: title,
            description: lead,
            breadcrumbs,
            type: pageType,
          })}
        />
      ) : null}
      <header className="flex flex-col gap-3">
        {eyebrow}
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          {t(title)}
        </h1>
        <p className="text-base/7 text-pretty text-muted-foreground">
          {t(lead)}
        </p>
      </header>
      <div className="flex flex-col">{children}</div>
    </main>
  )
}

export { InfoPage }

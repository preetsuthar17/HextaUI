import * as React from "react"

import { t } from "@/lib/i18n/rich"

function InfoPage({
  title,
  lead,
  children,
}: {
  title: string
  lead: string
  children: React.ReactNode
}) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pt-16 pb-24">
      <header className="flex flex-col gap-3">
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

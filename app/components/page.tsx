import type { Metadata } from "next"

import { CatalogGrid, CatalogList } from "@/components/site/catalog-card"
import { CatalogViewToggle } from "@/components/site/catalog-view"
import { ComponentCard } from "@/components/site/component-card"
import { docsComponents as components } from "@/lib/docs"
import { T, t } from "@/lib/i18n/rich"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: "React UI components for shadcn/ui",
  description: `${components.length} free, open-source React components for shadcn/ui on Base UI and Tailwind CSS, from inputs and dialogs to data tables, date pickers and chat. Live previews of each.`,
  path: "/components",
})

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-16">
      <header className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold tracking-tight">
            {t("Components")}
          </h1>
          <p className="text-sm text-muted-foreground">
            <T>
              {components.length} components. Open one to see every state live.
            </T>
          </p>
        </div>
        <CatalogViewToggle />
      </header>
      <CatalogGrid className="in-data-[catalog-view=single]:mx-auto in-data-[catalog-view=single]:w-full in-data-[catalog-view=single]:max-w-3xl">
        {components.map((component) => (
          <ComponentCard
            key={component.slug}
            slug={component.slug}
            name={component.name}
          />
        ))}
      </CatalogGrid>
      <CatalogList
        items={components.map((component) => ({
          href: `/docs/${component.slug}`,
          title: component.name,
        }))}
      />
    </main>
  )
}

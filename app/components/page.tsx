import type { Metadata } from "next"

import Link from "@/components/site/link"
import { CatalogGrid, CatalogList } from "@/components/site/catalog-card"
import { CatalogViewToggle } from "@/components/site/catalog-view"
import { ComponentCard } from "@/components/site/component-card"
import { JsonLd } from "@/components/site/json-ld"
import {
  componentCategories,
  getComponentCategoryHref,
} from "@/lib/component-categories"
import { docsComponents as components } from "@/lib/docs"
import { T, t } from "@/lib/i18n/rich"
import { clampDescription, pageMetadata } from "@/lib/metadata"
import { pageJsonLd } from "@/lib/structured-data"

const title = "React UI components for shadcn/ui"

const description = `${components.length} free, open-source React components for shadcn/ui on Base UI and Tailwind CSS, from inputs and dialogs to data tables, date pickers and chat. Live previews of each.`

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/components",
})

const categoryLinkClassName =
  "inline-flex rounded-md border px-2.5 py-1 text-sm transition-colors duration-150 ease-out-cubic outline-none hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:outline-hidden motion-reduce:transition-none"

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-16">
      <JsonLd
        data={pageJsonLd({
          path: "/components",
          name: title,
          description: clampDescription(description),
          breadcrumbs: [{ name: "Components", path: "/components" }],
          type: "CollectionPage",
          items: components.map((component) => ({
            name: component.name,
            path: `/docs/${component.slug}`,
          })),
        })}
      />
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
      <nav aria-labelledby="component-categories" className="-mt-4">
        <h2 id="component-categories" className="sr-only">
          {t("Browse by category")}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {componentCategories.map((category) => (
            <li key={category.slug}>
              <Link
                href={getComponentCategoryHref(category.slug)}
                className={categoryLinkClassName}
              >
                {t(category.name)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
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

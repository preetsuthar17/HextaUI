import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { DocsBreadcrumbs } from "@/components/docs/docs-breadcrumbs"
import { DocsRelated } from "@/components/docs/docs-related"
import { CatalogGrid } from "@/components/site/catalog-card"
import { ComponentCard } from "@/components/site/component-card"
import { JsonLd } from "@/components/site/json-ld"
import {
  componentCategories,
  getCategoryComponents,
  getComponentCategory,
  getComponentCategoryHref,
} from "@/lib/component-categories"
import { getProBlocksUsing } from "@/lib/docs-related"
import { t } from "@/lib/i18n/rich"
import { ogImagePath, pageMetadata } from "@/lib/metadata"
import { pageJsonLd } from "@/lib/structured-data"

export const dynamicParams = false

export function generateStaticParams() {
  return componentCategories.map((category) => ({ category: category.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/components/[category]">): Promise<Metadata> {
  const category = getComponentCategory((await params).category)
  if (!category) return {}

  return pageMetadata({
    title: category.title,
    description: category.description,
    path: getComponentCategoryHref(category.slug),
    image: ogImagePath("components", category.slug),
  })
}

export default async function Page({
  params,
}: PageProps<"/components/[category]">) {
  const category = getComponentCategory((await params).category)
  if (!category) notFound()
  const path = getComponentCategoryHref(category.slug)
  const components = getCategoryComponents(category.slug)
  const blocks = [
    ...new Map(
      components
        .flatMap((component) => getProBlocksUsing(component.slug))
        .map((block) => [block.href, block])
    ).values(),
  ].slice(0, 6)
  const crumbs = [
    { name: "Components", path: "/components" },
    { name: category.name, path },
  ]

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16">
      <JsonLd
        data={pageJsonLd({
          path,
          name: category.title,
          description: category.description,
          breadcrumbs: crumbs,
          type: "CollectionPage",
          image: ogImagePath("components", category.slug),
          items: components.map((component) => ({
            name: component.name,
            path: `/docs/${component.slug}`,
          })),
        })}
      />
      <header className="flex flex-col gap-3">
        <DocsBreadcrumbs crumbs={crumbs} />
        <h1 className="text-xl font-semibold tracking-tight">
          {t(category.name)}
        </h1>
        {category.intro.map((paragraph) => (
          <p
            key={paragraph}
            className="max-w-2xl text-sm/6 text-pretty text-muted-foreground"
          >
            {t(paragraph)}
          </p>
        ))}
      </header>
      <CatalogGrid className="mt-10">
        {components.map((component) => (
          <ComponentCard
            key={component.slug}
            slug={component.slug}
            name={component.name}
          />
        ))}
      </CatalogGrid>
      <div className="max-w-3xl">
        <DocsRelated
          title="What each one does"
          links={components.map((component) => ({
            href: `/docs/${component.slug}`,
            title: component.name,
            description: component.description,
          }))}
        />
        <DocsRelated
          title="Built into Pro blocks"
          description="Blocks for AI products that are built from these components."
          links={blocks}
          event={{ name: "Pro link clicked", from: "component-category" }}
        />
        <DocsRelated
          title="Other categories"
          variant="names"
          links={componentCategories
            .filter((item) => item.slug !== category.slug)
            .map((item) => ({
              href: getComponentCategoryHref(item.slug),
              title: t(item.name),
              description: item.description,
            }))}
        />
      </div>
    </main>
  )
}

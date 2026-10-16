import type { Metadata } from "next"
import { notFound } from "next/navigation"

import CategoryPage, {
  generateMetadata as generateSourceMetadata,
} from "@/app/components/[category]/page"
import {
  componentCategories,
  getComponentCategory,
  getComponentCategoryHref,
} from "@/lib/component-categories"
import { isTranslatedLocale } from "@/lib/i18n/config"
import { localizeMetadata } from "@/lib/i18n/metadata"
import { setRequestLocale } from "@/lib/i18n/request"

export const dynamicParams = false

export function generateStaticParams() {
  return componentCategories.map((category) => ({ category: category.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/components/[category]">): Promise<Metadata> {
  const { lang, category } = await params
  if (!isTranslatedLocale(lang) || !getComponentCategory(category)) return {}
  setRequestLocale(lang, "components")
  const source = await generateSourceMetadata({
    params: Promise.resolve({ category }),
    searchParams: Promise.resolve({}),
  })
  return localizeMetadata(source, getComponentCategoryHref(category))
}

export default async function Page({
  params,
}: PageProps<"/[lang]/components/[category]">) {
  const { lang, category } = await params
  if (!isTranslatedLocale(lang) || !getComponentCategory(category)) notFound()
  setRequestLocale(lang, "components")

  return (
    <CategoryPage
      params={Promise.resolve({ category })}
      searchParams={Promise.resolve({})}
    />
  )
}

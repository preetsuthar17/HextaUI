import type { Metadata } from "next"
import { notFound } from "next/navigation"

import ComparePage, {
  generateMetadata as generateSourceMetadata,
} from "@/app/compare/shadcn-ui/[component]/page"
import { isTranslatedLocale } from "@/lib/i18n/config"
import { localizeMetadata } from "@/lib/i18n/metadata"
import { setRequestLocale } from "@/lib/i18n/request"
import {
  getShadcnComparison,
  getShadcnComparisonHref,
  getShadcnComparisons,
} from "@/lib/shadcn-compare"

export const dynamicParams = false

export function generateStaticParams() {
  return getShadcnComparisons().map((comparison) => ({
    slug: "shadcn-ui",
    component: comparison.slug,
  }))
}

function valid(lang: string, slug: string, component: string) {
  return (
    isTranslatedLocale(lang) &&
    slug === "shadcn-ui" &&
    getShadcnComparison(component) !== undefined
  )
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/compare/[slug]/[component]">): Promise<Metadata> {
  const { lang, slug, component } = await params
  if (!valid(lang, slug, component) || !isTranslatedLocale(lang)) return {}
  setRequestLocale(lang, `docs/${component}`)
  const source = await generateSourceMetadata({
    params: Promise.resolve({ component }),
    searchParams: Promise.resolve({}),
  })
  return localizeMetadata(source, getShadcnComparisonHref(component))
}

export default async function Page({
  params,
}: PageProps<"/[lang]/compare/[slug]/[component]">) {
  const { lang, slug, component } = await params
  if (!valid(lang, slug, component) || !isTranslatedLocale(lang)) notFound()
  setRequestLocale(lang, `docs/${component}`)

  return (
    <ComparePage
      params={Promise.resolve({ component })}
      searchParams={Promise.resolve({})}
    />
  )
}

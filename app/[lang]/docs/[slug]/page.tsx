import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { isTranslatedLocale } from "@/lib/i18n/config"
import { localizeMetadata } from "@/lib/i18n/metadata"
import { localizedDocsSlugs } from "@/lib/i18n/pages"
import { setRequestLocale } from "@/lib/i18n/request"

type DocsPageModule = {
  default: () => React.ReactNode
  metadata?: Metadata
}

export const dynamicParams = false

export function generateStaticParams() {
  return localizedDocsSlugs.map((slug) => ({ slug }))
}

function loadPage(slug: string): Promise<DocsPageModule> {
  return import(`../../../docs/${slug}/page`)
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/docs/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isTranslatedLocale(lang) || !localizedDocsSlugs.includes(slug)) return {}
  setRequestLocale(lang, `docs/${slug}`)
  const { metadata } = await loadPage(slug)
  return metadata ? localizeMetadata(metadata, `/docs/${slug}`) : {}
}

export default async function Page({
  params,
}: PageProps<"/[lang]/docs/[slug]">) {
  const { lang, slug } = await params
  if (!isTranslatedLocale(lang) || !localizedDocsSlugs.includes(slug)) {
    notFound()
  }
  setRequestLocale(lang, `docs/${slug}`)
  const { default: DocsPage } = await loadPage(slug)

  return <DocsPage />
}

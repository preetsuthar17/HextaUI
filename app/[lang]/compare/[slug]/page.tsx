import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { isTranslatedLocale } from "@/lib/i18n/config"
import { localizeMetadata } from "@/lib/i18n/metadata"
import { comparePages } from "@/lib/i18n/pages"
import { setRequestLocale } from "@/lib/i18n/request"

type ComparePageModule = {
  default: () => React.ReactNode
  metadata: Metadata
}

export const dynamicParams = false

export function generateStaticParams() {
  return comparePages.map((slug) => ({ slug }))
}

function loadPage(slug: string): Promise<ComparePageModule> {
  return import(`../../../compare/${slug}/page`)
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/compare/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isTranslatedLocale(lang) || !comparePages.includes(slug)) return {}
  setRequestLocale(lang, `compare/${slug}`)
  const { metadata } = await loadPage(slug)
  return localizeMetadata(metadata, `/compare/${slug}`)
}

export default async function Page({
  params,
}: PageProps<"/[lang]/compare/[slug]">) {
  const { lang, slug } = await params
  if (!isTranslatedLocale(lang) || !comparePages.includes(slug)) notFound()
  setRequestLocale(lang, `compare/${slug}`)
  const { default: ComparePage } = await loadPage(slug)

  return <ComparePage />
}

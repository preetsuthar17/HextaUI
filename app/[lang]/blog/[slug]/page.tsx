import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { isTranslatedLocale } from "@/lib/i18n/config"
import { localizeMetadata } from "@/lib/i18n/metadata"
import { blogPages } from "@/lib/i18n/pages"
import { setRequestLocale } from "@/lib/i18n/request"

type BlogPageModule = {
  default: () => React.ReactNode
  metadata: Metadata
}

export const dynamicParams = false

export function generateStaticParams() {
  return blogPages.map((slug) => ({ slug }))
}

function loadPage(slug: string): Promise<BlogPageModule> {
  return import(`../../../blog/${slug}/page`)
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isTranslatedLocale(lang) || !blogPages.includes(slug)) return {}
  setRequestLocale(lang, `blog/${slug}`)
  const { metadata } = await loadPage(slug)
  return localizeMetadata(metadata, `/blog/${slug}`)
}

export default async function Page({
  params,
}: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params
  if (!isTranslatedLocale(lang) || !blogPages.includes(slug)) notFound()
  setRequestLocale(lang, `blog/${slug}`)
  const { default: BlogPage } = await loadPage(slug)

  return <BlogPage />
}

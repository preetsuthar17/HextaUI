import type { Metadata } from "next"
import { notFound } from "next/navigation"

import BlogIndexPage, { metadata as source } from "@/app/blog/page"
import { isTranslatedLocale } from "@/lib/i18n/config"
import { localizeMetadata } from "@/lib/i18n/metadata"
import { setRequestLocale } from "@/lib/i18n/request"

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params
  if (!isTranslatedLocale(lang)) return {}
  setRequestLocale(lang, "blog/index")
  return localizeMetadata(source, "/blog")
}

export default async function Page({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params
  if (!isTranslatedLocale(lang)) notFound()
  setRequestLocale(lang, "blog/index")

  return <BlogIndexPage />
}

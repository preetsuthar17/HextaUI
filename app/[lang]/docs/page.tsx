import type { Metadata } from "next"
import { notFound } from "next/navigation"

import DocsIndex, { metadata as source } from "@/app/docs/page"
import { isTranslatedLocale } from "@/lib/i18n/config"
import { localizeMetadata } from "@/lib/i18n/metadata"
import { setRequestLocale } from "@/lib/i18n/request"

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/docs">): Promise<Metadata> {
  const { lang } = await params
  if (!isTranslatedLocale(lang)) return {}
  setRequestLocale(lang, "docs/index")
  return localizeMetadata(source, "/docs")
}

export default async function Page({ params }: PageProps<"/[lang]/docs">) {
  const { lang } = await params
  if (!isTranslatedLocale(lang)) notFound()
  setRequestLocale(lang, "docs/index")

  return <DocsIndex />
}

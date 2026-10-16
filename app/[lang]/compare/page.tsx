import type { Metadata } from "next"
import { notFound } from "next/navigation"

import ComparePage, { metadata as source } from "@/app/compare/page"
import { isTranslatedLocale } from "@/lib/i18n/config"
import { localizeMetadata } from "@/lib/i18n/metadata"
import { setRequestLocale } from "@/lib/i18n/request"

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/compare">): Promise<Metadata> {
  const { lang } = await params
  if (!isTranslatedLocale(lang)) return {}
  setRequestLocale(lang, "compare")
  return localizeMetadata(source, "/compare")
}

export default async function Page({ params }: PageProps<"/[lang]/compare">) {
  const { lang } = await params
  if (!isTranslatedLocale(lang)) notFound()
  setRequestLocale(lang, "compare")

  return <ComparePage />
}

import type { Metadata } from "next"
import { notFound } from "next/navigation"

import Components, { metadata as source } from "@/app/components/page"
import { isTranslatedLocale } from "@/lib/i18n/config"
import { localizeMetadata } from "@/lib/i18n/metadata"
import { setRequestLocale } from "@/lib/i18n/request"

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/components">): Promise<Metadata> {
  const { lang } = await params
  if (!isTranslatedLocale(lang)) return {}
  setRequestLocale(lang, "components")
  return localizeMetadata(source, "/components")
}

export default async function Page({
  params,
}: PageProps<"/[lang]/components">) {
  const { lang } = await params
  if (!isTranslatedLocale(lang)) notFound()
  setRequestLocale(lang, "components")

  return <Components />
}

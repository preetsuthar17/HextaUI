import type { Metadata } from "next"
import { notFound } from "next/navigation"

import Home, { metadata as source } from "@/app/page"
import { isTranslatedLocale } from "@/lib/i18n/config"
import { localizeMetadata } from "@/lib/i18n/metadata"
import { setRequestLocale } from "@/lib/i18n/request"
import { t } from "@/lib/i18n/rich"
import { siteTitle } from "@/lib/site"

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params
  if (!isTranslatedLocale(lang)) return {}
  setRequestLocale(lang, "home")
  const title = t(siteTitle)
  const metadata = localizeMetadata(source, "/")
  return {
    ...metadata,
    title: { absolute: title },
    openGraph: { ...metadata.openGraph, title },
    twitter: { ...metadata.twitter, title },
  }
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params
  if (!isTranslatedLocale(lang)) notFound()
  setRequestLocale(lang, "home")

  return <Home />
}

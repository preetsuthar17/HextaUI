import type { Metadata } from "next"
import { notFound } from "next/navigation"

import Blocks, { metadata as source } from "@/app/blocks/page"
import { isTranslatedLocale } from "@/lib/i18n/config"
import { localizeMetadata } from "@/lib/i18n/metadata"
import { setRequestLocale } from "@/lib/i18n/request"

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blocks">): Promise<Metadata> {
  const { lang } = await params
  if (!isTranslatedLocale(lang)) return {}
  setRequestLocale(lang, "blocks/index")
  return localizeMetadata(source, "/blocks")
}

export default async function Page({ params }: PageProps<"/[lang]/blocks">) {
  const { lang } = await params
  if (!isTranslatedLocale(lang)) notFound()
  setRequestLocale(lang, "blocks/index")

  return <Blocks />
}

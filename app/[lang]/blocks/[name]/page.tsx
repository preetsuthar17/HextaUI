import type { Metadata } from "next"
import { notFound } from "next/navigation"

import BlockPage, {
  generateMetadata as generateSourceMetadata,
} from "@/app/blocks/[name]/page"
import { isTranslatedLocale } from "@/lib/i18n/config"
import { localizeMetadata } from "@/lib/i18n/metadata"
import { setRequestLocale } from "@/lib/i18n/request"
import { getProBlock, proBlockParams } from "@/lib/pro/catalog"

export const dynamicParams = false

export function generateStaticParams() {
  return proBlockParams()
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blocks/[name]">): Promise<Metadata> {
  const { lang, name } = await params
  if (!isTranslatedLocale(lang) || !getProBlock(name)) return {}
  setRequestLocale(lang, `blocks/${name}`)
  const source = await generateSourceMetadata({
    params: Promise.resolve({ name }),
    searchParams: Promise.resolve({}),
  })
  return localizeMetadata(source, `/blocks/${name}`)
}

export default async function Page({
  params,
}: PageProps<"/[lang]/blocks/[name]">) {
  const { lang, name } = await params
  if (!isTranslatedLocale(lang) || !getProBlock(name)) notFound()
  setRequestLocale(lang, `blocks/${name}`)

  return (
    <BlockPage
      params={Promise.resolve({ name })}
      searchParams={Promise.resolve({})}
    />
  )
}

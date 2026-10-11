import { notFound } from "next/navigation"

import { DocsShell } from "@/components/docs/docs-shell"
import { docsNav } from "@/lib/docs"
import { isTranslatedLocale } from "@/lib/i18n/config"
import { setRequestLocale } from "@/lib/i18n/request"
import { t } from "@/lib/i18n/rich"

export default async function Layout({
  children,
  params,
}: LayoutProps<"/[lang]/docs">) {
  const { lang } = await params
  if (!isTranslatedLocale(lang)) notFound()
  setRequestLocale(lang)

  const sections = docsNav.map((section) => ({
    title: t(section.title),
    items: section.items.map((item) => ({ ...item, title: t(item.title) })),
  }))

  return <DocsShell sections={sections}>{children}</DocsShell>
}

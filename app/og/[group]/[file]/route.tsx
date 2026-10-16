import { notFound } from "next/navigation"

import { renderOgImage } from "@/lib/opengraph-image"
import { getOgPages } from "@/lib/og-pages"

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return getOgPages().map((page) => ({
    group: page.group,
    file: `${page.slug}.png`,
  }))
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/og/[group]/[file]">
) {
  const { group, file } = await params
  const page = getOgPages().find(
    (item) => item.group === group && `${item.slug}.png` === file
  )
  if (!page) notFound()

  return renderOgImage(page.image)
}

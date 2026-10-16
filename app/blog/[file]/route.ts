import { notFound } from "next/navigation"

import { blogSlugs, isBlogSlug } from "@/lib/blog"
import { getBlogPostMarkdown } from "@/lib/blog-content"

export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ file: `${slug}.md` }))
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/blog/[file]">
) {
  const { file } = await params
  const slug = file.replace(/\.md$/, "")

  if (!file.endsWith(".md") || !isBlogSlug(slug)) {
    notFound()
  }

  return new Response(await getBlogPostMarkdown(slug), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}

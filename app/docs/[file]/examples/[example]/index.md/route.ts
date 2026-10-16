import { notFound } from "next/navigation"

import { getAllDocsExamples, getDocsExampleMarkdown } from "@/lib/docs-examples"

export const dynamic = "force-static"
export const dynamicParams = false

export async function generateStaticParams() {
  return (await getAllDocsExamples()).map((example) => ({
    file: example.slug,
    example: example.id,
  }))
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/docs/[file]/examples/[example]/index.md">
) {
  const { file, example } = await params
  const markdown = await getDocsExampleMarkdown(file, example)
  if (!markdown) notFound()

  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}

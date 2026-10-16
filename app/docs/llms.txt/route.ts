import { getDocsLlms } from "@/lib/docs-markdown"
import { getExamplesLlms } from "@/lib/seo-llms"

export const dynamic = "force-static"

export async function GET() {
  return new Response(`${getDocsLlms()}\n${await getExamplesLlms()}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}

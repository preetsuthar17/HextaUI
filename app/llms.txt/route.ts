import { getLlmsIndex } from "@/lib/docs-markdown"
import { getSeoLlms } from "@/lib/seo-llms"

export const dynamic = "force-static"

export function GET() {
  return new Response(`${getLlmsIndex()}\n${getSeoLlms()}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}

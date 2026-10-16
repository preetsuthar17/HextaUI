import { getBlogIndexMarkdown } from "@/lib/blog-content"

export const dynamic = "force-static"

export function GET() {
  return new Response(getBlogIndexMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}

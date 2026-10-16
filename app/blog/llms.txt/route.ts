import { getBlogLlms } from "@/lib/blog-content"

export const dynamic = "force-static"

export function GET() {
  return new Response(getBlogLlms(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}

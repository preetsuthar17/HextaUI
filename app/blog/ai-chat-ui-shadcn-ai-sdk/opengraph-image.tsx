import { blogImageAlt } from "@/lib/blog"
import { blogImageSize, blogPostImage } from "@/lib/blog-opengraph-image"

export const dynamic = "force-static"

const slug = "ai-chat-ui-shadcn-ai-sdk"

export const alt = blogImageAlt(slug)

export const size = blogImageSize

export const contentType = "image/png"

export default function Image() {
  return blogPostImage(slug)
}

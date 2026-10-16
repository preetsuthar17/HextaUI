import { blogImageSize, blogIndexImage } from "@/lib/blog-opengraph-image"
import { siteName } from "@/lib/site"

export const dynamic = "force-static"

export const alt = `${siteName} Blog`

export const size = blogImageSize

export const contentType = "image/png"

export default function Image() {
  return blogIndexImage()
}

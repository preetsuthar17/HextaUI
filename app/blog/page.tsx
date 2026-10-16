import type { Metadata } from "next"

import { BlogIndex } from "@/components/blog/blog-index"
import { blogIndexMetadata } from "@/lib/blog"

export const metadata: Metadata = blogIndexMetadata

export default function Page() {
  return <BlogIndex />
}

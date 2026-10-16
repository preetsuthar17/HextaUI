import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { ImageResponse } from "next/og"

import { blogAuthor, blogTitle, getBlogPost } from "@/lib/blog"
import { siteName } from "@/lib/site"

const blogImageSize = { width: 1200, height: 630 }

async function blogImage(title: string, subtitle: string) {
  const logo = await readFile(join(process.cwd(), "public/hextaui-logo.png"))
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`
  const long = title.length > 70

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#fafafa",
        color: "#0a0a0a",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <img src={logoSrc} width={72} height={72} alt="" />
        <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: -1.5 }}>
          {siteName}
        </div>
        <div style={{ fontSize: 44, color: "#a3a3a3", letterSpacing: -1.5 }}>
          {`/ ${blogTitle}`}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            fontSize: long ? 54 : 62,
            fontWeight: 600,
            letterSpacing: -2.5,
            lineHeight: 1.1,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 28, color: "#737373" }}>{subtitle}</div>
      </div>
    </div>,
    blogImageSize
  )
}

function blogPostImage(slug: string) {
  const post = getBlogPost(slug)
  return blogImage(post.title, `${blogAuthor.name} · ${post.published}`)
}

function blogIndexImage() {
  return blogImage(
    "Notes on shadcn/ui, Base UI and AI product interfaces",
    `${blogAuthor.name} · hextaui.com/blog`
  )
}

export { blogImageSize, blogIndexImage, blogPostImage }

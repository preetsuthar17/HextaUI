import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { ImageResponse } from "next/og"

import { siteName } from "@/lib/site"

const ogSize = { width: 1200, height: 630 }

type OgImage = {
  eyebrow?: string
  title: string
  subtitle: string
}

function shorten(text: string, max: number) {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:.]+$/, "")}…`
}

async function renderOgImage({ eyebrow, title, subtitle }: OgImage) {
  const logo = await readFile(join(process.cwd(), "public/hextaui-logo.png"))
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`
  const heading = shorten(title, 90)

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
        <img src={logoSrc} width={88} height={88} alt="" />
        <div style={{ fontSize: 56, fontWeight: 600, letterSpacing: -2 }}>
          {siteName}
        </div>
        {eyebrow ? (
          <div
            style={{
              marginLeft: "auto",
              fontSize: 28,
              color: "#737373",
              border: "2px solid #e5e5e5",
              borderRadius: 999,
              padding: "8px 24px",
            }}
          >
            {eyebrow}
          </div>
        ) : null}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: heading.length > 48 ? 64 : 80,
            fontWeight: 600,
            letterSpacing: -3,
            lineHeight: 1.05,
            maxWidth: 1040,
          }}
        >
          {heading}
        </div>
        <div style={{ fontSize: 30, color: "#737373", maxWidth: 1040 }}>
          {shorten(subtitle, 130)}
        </div>
      </div>
    </div>,
    ogSize
  )
}

export { ogSize, renderOgImage, type OgImage }

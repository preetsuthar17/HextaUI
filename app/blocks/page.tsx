import type { Metadata } from "next"
import Link from "@/components/site/link"

import { BlocksCatalog } from "@/components/site/blocks-catalog"
import { CatalogViewToggle } from "@/components/site/catalog-view"
import { blockSections, proBlocks } from "@/lib/pro/catalog"
import { T, t } from "@/lib/i18n/rich"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: "React blocks for AI products, built on shadcn/ui",
  description:
    "Practical blocks built for AI products, with the hard states handled: streaming, tool calls, reasoning, voice and the screens around them. Part of HextaUI Pro, with Prompt Input free.",
  path: "/blocks",
})

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-16">
      <header className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold tracking-tight">
            {t("Blocks")}
          </h1>
          <p className="text-sm text-muted-foreground">
            <T>
              {proBlocks.length > 0
                ? `${proBlocks.length} ${proBlocks.length === 1 ? "block" : "blocks"}, with more on the way. `
                : "The first blocks are on the way. "}
              Every block is part of{" "}
              <Link
                href="/pricing"
                className="text-foreground underline underline-offset-4"
              >
                HextaUI Pro
              </Link>
              , and{" "}
              <Link
                href="/blocks/prompt-input"
                className="text-foreground underline underline-offset-4"
              >
                Prompt Input
              </Link>{" "}
              is free.
            </T>
          </p>
        </div>
        {proBlocks.length > 0 ? <CatalogViewToggle /> : null}
      </header>
      {proBlocks.length > 0 ? (
        <BlocksCatalog
          sections={blockSections.map((section) => ({
            category: section.category,
            title: t(section.title),
            blocks: section.blocks.map((block) => ({
              name: block.name,
              title: block.title,
              description: block.description,
              category: block.category,
              free: block.free,
            })),
          }))}
        />
      ) : null}
    </main>
  )
}

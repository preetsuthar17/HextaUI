import type { Metadata } from "next"
import Image from "next/image"

import { HeroActions } from "@/components/site/hero-actions"
import { HomeSections } from "@/components/site/home-sections"
import { HomePreview } from "@/components/site/home-preview"
import { docsComponents } from "@/lib/docs"
import { getGithubStars } from "@/lib/github"
import { T, t } from "@/lib/i18n/rich"
import { pageMetadata } from "@/lib/metadata"
import { getProBlock } from "@/lib/pro/catalog"

export const metadata: Metadata = pageMetadata({
  path: "/",
  markdown: "/index.md",
})

const previewBlocks = ["thinking", "prompt-input", "chat-thread", "voice-mode"]
  .map((name) => getProBlock(name))
  .filter((block) => block !== undefined)
  .map(({ name, title, free }) => ({ name, title, free: Boolean(free) }))

export default async function Page() {
  const stars = await getGithubStars()

  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-screen-2xl flex-col items-center gap-10 px-3 pt-20 pb-16 text-center sm:items-start sm:pt-28 sm:pb-24 sm:text-left">
        <div className="flex flex-col items-center gap-5 sm:items-start">
          <h1 className="text-hero font-medium tracking-tighter">
            <span className="block whitespace-nowrap">
              <T>The hard states, handled.</T>
            </span>{" "}
            <span className="block whitespace-nowrap">
              <T>Practical blocks for</T>{" "}
              <Image
                src="https://github.com/shadcn.png"
                alt=""
                width={64}
                height={64}
                unoptimized
                className="inline-block size-[1em] rounded-full"
              />{" "}
              shadcn/ui
            </span>
          </h1>
          <p className="max-w-xl text-base/7 text-pretty text-muted-foreground">
            <T>
              Production blocks for products built with AI, from the chat that
              streams, retries and asks before a tool runs to the screens around
              it. Built on {docsComponents.length} free, open-source components,
              and ready for your agent to install with the shadcn CLI.
            </T>
          </p>
        </div>
        <HeroActions stars={stars} />
      </section>
      <section
        aria-labelledby="home-preview"
        className="mx-auto w-full max-w-screen-2xl px-3 pb-24 sm:pb-32"
      >
        <h2 id="home-preview" className="sr-only">
          {t("Live previews")}
        </h2>
        <HomePreview blocks={previewBlocks} />
      </section>
      <HomeSections />
    </main>
  )
}

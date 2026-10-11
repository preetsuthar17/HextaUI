"use client"

import * as React from "react"
import Link from "@/components/site/link"
import { IconArrowRight } from "@tabler/icons-react"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"
import { NumberFlow } from "@/components/ui/number-flow"
import { Separator } from "@/components/ui/separator"
import { GithubLogo } from "@/components/site/github-logo"
import { useGithubStars } from "@/components/site/use-github-stars"
import { siteRepository } from "@/lib/site"
import { useChrome } from "@/lib/i18n/chrome"

function GithubStarsButton({ stars: initial }: { stars: number | null }) {
  const c = useChrome()
  const stars = useGithubStars(initial)
  const [shown, setShown] = React.useState(0)

  React.useEffect(() => {
    if (stars === null) {
      return
    }
    const frame = requestAnimationFrame(() => setShown(stars))
    return () => cancelAnimationFrame(frame)
  }, [stars])

  return (
    <a
      href={siteRepository}
      target="_blank"
      rel="noreferrer"
      aria-label={
        stars === null
          ? "Star on GitHub"
          : `Star on GitHub, ${stars.toLocaleString("en")} stars`
      }
      className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-3")}
    >
      <GithubLogo />
      {c("Star on GitHub")}
      {stars === null ? null : (
        <>
          <Separator orientation="vertical" className="mx-1 h-4 self-center" />
          <span aria-hidden="true" className="text-muted-foreground">
            <NumberFlow value={shown} />
          </span>
        </>
      )}
    </a>
  )
}

function HeroActions({ stars }: { stars: number | null }) {
  const c = useChrome()

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href="/blocks"
        className={cn(buttonVariants({ size: "lg" }), "px-4")}
      >
        {c("Browse blocks")}
        <IconArrowRight data-icon="inline-end" aria-hidden="true" />
      </Link>
      <Link
        href="/blocks/prompt-input"
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "px-4"
        )}
      >
        {c("Try Prompt Input free")}
      </Link>
      <GithubStarsButton stars={stars} />
    </div>
  )
}

export { HeroActions }

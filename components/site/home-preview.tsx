"use client"

import * as React from "react"
import Link from "@/components/site/link"
import { cn } from "cn"

import { useLoadSlot } from "@/components/site/block-card"
import { useInViewOnce } from "@/components/site/use-in-view-once"

const tiles = [
  {
    slug: "questionnaire",
    name: "Questionnaire",
    Demo: React.lazy(() =>
      import("@/components/examples/questionnaire/demo").then((mod) => ({
        default: mod.QuestionnaireDemo,
      }))
    ),
    className: "lg:row-span-2",
    size: "h-124 lg:h-auto lg:flex-1",
  },
  {
    slug: "number-flow",
    name: "Number flow",
    Demo: React.lazy(() =>
      import("@/components/examples/number-flow/demo").then((mod) => ({
        default: mod.NumberFlowDemo,
      }))
    ),
    className: "",
    size: "h-56",
  },
  {
    slug: "switch",
    name: "Switch",
    Demo: React.lazy(() =>
      import("@/components/examples/switch/async").then((mod) => ({
        default: mod.SwitchAsync,
      }))
    ),
    className: "lg:col-span-1",
    size: "h-56",
  },
  {
    slug: "toast",
    name: "Toast",
    Demo: React.lazy(() =>
      import("@/components/examples/toast/demo").then((mod) => ({
        default: mod.ToastDemo,
      }))
    ),
    className: "lg:col-span-1",
    size: "h-56",
  },
  {
    slug: "input-otp",
    name: "Input OTP",
    Demo: React.lazy(() =>
      import("@/components/examples/input-otp/demo").then((mod) => ({
        default: mod.InputOTPDemo,
      }))
    ),
    className: "",
    size: "h-56",
  },
  {
    slug: "button",
    name: "Button",
    Demo: React.lazy(() =>
      import("@/components/examples/button/demo").then((mod) => ({
        default: mod.ButtonDemo,
      }))
    ),
    className: "",
    size: "h-56",
  },
]

function BlockTile({
  name,
  title,
  free,
}: {
  name: string
  title: string
  free: boolean
}) {
  const [ref, inView] = useInViewOnce<HTMLLIElement>()
  const [granted, done] = useLoadSlot(inView)
  const [loaded, setLoaded] = React.useState(false)

  return (
    <li ref={ref} className="preview-tile col-span-2">
      <div inert className="preview-panel aspect-square">
        {granted ? (
          <iframe
            src={`/preview/blocks/${name}`}
            title={`${title} preview`}
            tabIndex={-1}
            aria-hidden
            onLoad={() => {
              setLoaded(true)
              done()
            }}
            data-loaded={loaded ? "" : undefined}
            className="pointer-events-none absolute top-0 left-0 size-[125%] origin-top-left scale-80 opacity-0 transition-opacity duration-300 ease-out-cubic data-loaded:opacity-100 motion-reduce:transition-none"
          />
        ) : null}
      </div>
      <Link
        href={`/blocks/${name}`}
        className="preview-caption after:absolute after:inset-0 after:rounded-(--tile-radius)"
      >
        {title}
        <span className="text-xs font-normal">{free ? "Free" : "Pro"}</span>
      </Link>
    </li>
  )
}

function DemoTile({
  slug,
  name,
  Demo,
  className,
  size,
}: (typeof tiles)[number]) {
  const [ref, inView] = useInViewOnce<HTMLLIElement>()

  return (
    <li ref={ref} className={cn("preview-tile col-span-2", className)}>
      <div className={cn("preview-panel grid place-items-center p-6", size)}>
        {inView ? (
          <React.Suspense fallback={null}>
            <div className="flex w-full items-center justify-center motion-safe:animate-in motion-safe:animation-duration-300 motion-safe:fade-in-0">
              <Demo />
            </div>
          </React.Suspense>
        ) : null}
      </div>
      <Link href={`/docs/${slug}`} className="preview-caption">
        {name}
      </Link>
    </li>
  )
}

function HomePreview({
  blocks,
}: {
  blocks: { name: string; title: string; free: boolean }[]
}) {
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {blocks.map((block) => (
        <BlockTile
          key={block.name}
          name={block.name}
          title={block.title}
          free={block.free}
        />
      ))}
      {tiles.map((tile) => (
        <DemoTile key={tile.slug} {...tile} />
      ))}
    </ul>
  )
}

export { HomePreview }

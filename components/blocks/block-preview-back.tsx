"use client"

import * as React from "react"
import Link from "@/components/site/link"
import { IconArrowLeft } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

const noop = () => () => {}

function useStandalone() {
  return React.useSyncExternalStore(
    noop,
    () => window.self === window.top,
    () => false
  )
}

function BlockPreviewBack({
  name,
  title,
  docked = false,
}: {
  name: string
  title: string
  docked?: boolean
}) {
  const standalone = useStandalone()

  if (!standalone) return null

  return (
    <div
      className={
        docked
          ? "flex h-12 shrink-0 items-center border-b px-3"
          : "fixed start-3 top-3 z-50 motion-safe:animate-in motion-safe:animation-duration-300 motion-safe:fade-in-0"
      }
    >
      <Button
        variant="ghost"
        size="sm"
        shape="pill"
        aria-label={`Back to ${title}`}
        render={<Link href={`/blocks/${name}`} />}
        nativeButton={false}
      >
        <IconArrowLeft data-icon="inline-start" className="rtl:-scale-x-100" />
        <span className="max-sm:sr-only">{title}</span>
      </Button>
    </div>
  )
}

export { BlockPreviewBack }

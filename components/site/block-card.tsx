"use client"

import * as React from "react"
import { IconHeart, IconHeartFilled } from "@tabler/icons-react"

import {
  CatalogCard,
  CatalogCardLink,
  CatalogCardPreview,
} from "@/components/site/catalog-card"
import { useInViewOnce } from "@/components/site/use-in-view-once"
import { useChrome } from "@/lib/i18n/chrome"

const maxLoading = 2
const waiting: (() => void)[] = []
let loading = 0

function release() {
  loading -= 1
  const next = waiting.shift()
  if (next) {
    loading += 1
    next()
  }
}

function useLoadSlot(requested: boolean) {
  const [granted, setGranted] = React.useState(false)
  const held = React.useRef(false)

  React.useEffect(() => {
    if (!requested) return
    const start = () => {
      held.current = true
      setGranted(true)
    }
    if (loading < maxLoading) {
      loading += 1
      start()
    } else {
      waiting.push(start)
    }
    return () => {
      const index = waiting.indexOf(start)
      if (index !== -1) waiting.splice(index, 1)
      if (held.current) {
        held.current = false
        release()
      }
    }
  }, [requested])

  const done = React.useCallback(() => {
    if (!held.current) return
    held.current = false
    release()
  }, [])

  return [granted, done] as const
}

function FavoriteToggle({
  pressed,
  onPressedChange,
}: {
  pressed: boolean
  onPressedChange: (pressed: boolean) => void
}) {
  const c = useChrome()

  return (
    <button
      type="button"
      aria-label={c("Favorite")}
      aria-pressed={pressed}
      onClick={() => onPressedChange(!pressed)}
      className="absolute end-2.5 top-2.5 z-10 inline-flex size-8 cursor-pointer items-center justify-center rounded-full bg-background/90 text-muted-foreground inset-ring-(length:--hairline) inset-ring-border backdrop-blur-sm transition-colors duration-200 ease-out-quint outline-none select-none hover:bg-background hover:text-foreground focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:inset-ring-ring focus-visible:outline-hidden aria-pressed:text-foreground motion-reduce:transition-none dark:bg-background/80 dark:hover:bg-background forced-colors:border pointer-coarse:after:absolute pointer-coarse:after:-inset-1.5 [&_svg]:size-4 [&_svg]:shrink-0"
    >
      {pressed ? (
        <IconHeartFilled className="motion-safe:animate-in motion-safe:duration-200 motion-safe:ease-out-quint motion-safe:zoom-in-75" />
      ) : (
        <IconHeart />
      )}
    </button>
  )
}

function BlockCard({
  name,
  title,
  favorite,
  onFavoriteChange,
}: {
  name: string
  title: string
  favorite?: boolean
  onFavoriteChange?: (favorite: boolean) => void
}) {
  const [ref, inView] = useInViewOnce<HTMLLIElement>()
  const [granted, done] = useLoadSlot(inView)
  const [loaded, setLoaded] = React.useState(false)

  return (
    <CatalogCard ref={ref}>
      {onFavoriteChange ? (
        <FavoriteToggle
          pressed={Boolean(favorite)}
          onPressedChange={onFavoriteChange}
        />
      ) : null}
      <CatalogCardPreview
        inert
        className="aspect-4/3 in-data-[catalog-view=single]:aspect-16/10"
      >
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
            className="pointer-events-none absolute top-0 left-0 size-[300%] origin-top-left scale-[calc(1/3)] opacity-0 transition-opacity duration-300 ease-out-cubic in-data-[catalog-view=single]:size-full in-data-[catalog-view=single]:scale-100 data-loaded:opacity-100 motion-reduce:transition-none"
          />
        ) : null}
      </CatalogCardPreview>
      <CatalogCardLink
        href={`/blocks/${name}`}
        className="after:absolute after:inset-0 after:rounded-(--catalog-radius)"
      >
        {title}
      </CatalogCardLink>
    </CatalogCard>
  )
}

export { BlockCard, useLoadSlot }

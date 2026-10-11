"use client"

import * as React from "react"
import { IconAlignLeft } from "@tabler/icons-react"
import { cn } from "cn"

import { ScrollArea } from "@/components/ui/scroll-area"
import type { DocsTocItem } from "@/lib/docs"
import { useChrome } from "@/lib/i18n/chrome"

const activationOffset = 112
const trackOffsets = { 2: 2.5, 3: 10.5 } as const
const bendLength = 6
const dotRadius = 2.5

type TrackPoint = { x: number; lineStart: number; lineEnd: number }

type Track = { path: string; height: number; points: Map<number, TrackPoint> }

function useActiveIndex(items: DocsTocItem[]) {
  const [activeIndex, setActiveIndex] = React.useState(0)

  React.useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => heading !== null)

    if (headings.length === 0) {
      return
    }

    let frame = 0

    const update = () => {
      frame = 0
      const root = document.documentElement
      const atBottom =
        window.innerHeight + window.scrollY >= root.scrollHeight - 2

      if (atBottom) {
        setActiveIndex(headings.length - 1)
        return
      }

      let current = 0
      headings.forEach((heading, index) => {
        if (heading.getBoundingClientRect().top <= activationOffset) {
          current = index
        }
      })
      setActiveIndex(current)
    }

    const schedule = () => {
      if (frame === 0) {
        frame = requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [items])

  return activeIndex
}

function buildTrack(list: HTMLElement, items: DocsTocItem[]): Track {
  const origin = list.getBoundingClientRect().top
  const rows = Array.from(list.querySelectorAll<HTMLElement>("[data-toc-row]"))
  const boxes = rows.flatMap((row) => {
    const index = Number(row.dataset.index)
    const rect = row.getBoundingClientRect()
    const top = rect.top - origin
    const bottom = rect.bottom - origin
    return [{ index, x: trackOffsets[items[index]?.depth ?? 2], top, bottom }]
  })

  let path = ""
  const points = new Map<number, TrackPoint>()
  boxes.forEach((box, position) => {
    const previous = boxes[position - 1]
    const next = boxes[position + 1]
    const bendsIn = previous !== undefined && previous.x !== box.x
    const bendsOut = next !== undefined && next.x !== box.x
    const bend = Math.min(bendLength, (box.bottom - box.top) / 2)
    const lineStart = bendsIn ? box.top + bend : box.top
    const lineEnd = bendsOut ? box.bottom - bend : box.bottom

    if (position === 0) {
      path += `M${box.x} ${lineStart}`
    }
    path += `L${box.x} ${lineEnd}`
    if (bendsOut) {
      const nextBend = Math.min(bendLength, (next.bottom - next.top) / 2)
      path += `C${box.x} ${box.bottom} ${next.x} ${box.bottom} ${next.x} ${box.bottom + nextBend}`
    }

    points.set(box.index, { x: box.x, lineStart, lineEnd })
  })

  return { path, height: list.offsetHeight, points }
}

function useTrack(
  listRef: React.RefObject<HTMLUListElement | null>,
  items: DocsTocItem[]
) {
  const [track, setTrack] = React.useState<Track | null>(null)

  React.useLayoutEffect(() => {
    const list = listRef.current
    if (!list || items.length === 0) {
      return
    }

    const measure = () => {
      const next = buildTrack(list, items)
      setTrack((previous) =>
        previous?.path === next.path && previous.height === next.height
          ? previous
          : next
      )
    }

    const observer =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure)
    observer?.observe(list)
    measure()

    return () => {
      observer?.disconnect()
    }
  }, [listRef, items])

  return track
}

function readTocItems(content: Element) {
  const headings = content.querySelectorAll<HTMLElement>("[data-docs-heading]")

  return Array.from(headings, (heading) => ({
    id: heading.id,
    title:
      heading.querySelector("[data-docs-heading-text]")?.textContent ??
      heading.textContent ??
      "",
    depth: heading.tagName === "H3" ? (3 as const) : (2 as const),
  }))
}

function getTocKey(items: DocsTocItem[]) {
  return items
    .map((item) => `${item.depth ?? 2}:${item.id}:${item.title}`)
    .join("|")
}

function useTocItems(
  items: DocsTocItem[] | undefined,
  rootRef: React.RefObject<HTMLElement | null>
) {
  const [collected, setCollected] = React.useState<DocsTocItem[]>([])

  React.useLayoutEffect(() => {
    const content = rootRef.current
      ?.closest("[data-docs-page]")
      ?.querySelector("[data-docs-content]")
    if (items || !content) {
      return
    }

    let key = ""
    const sync = () => {
      const next = readTocItems(content)
      const nextKey = getTocKey(next)
      if (nextKey !== key) {
        key = nextKey
        setCollected(next)
      }
    }

    const observer = new MutationObserver(sync)
    observer.observe(content, { childList: true, subtree: true })
    sync()

    return () => {
      observer.disconnect()
    }
  }, [items, rootRef])

  return items ?? collected
}

function breakIdentifier(title: string) {
  if (/\s/.test(title) || !/^[A-Z][A-Za-z0-9]+$/.test(title)) {
    return title
  }
  return title.split(/(?=[A-Z])/).map((part, index) => (
    <React.Fragment key={index}>
      {index > 0 ? <wbr /> : null}
      {part}
    </React.Fragment>
  ))
}

function DocsToc({
  items: providedItems,
  className,
}: {
  items?: DocsTocItem[]
  className?: string
}) {
  const c = useChrome()
  const rootRef = React.useRef<HTMLElement>(null)
  const listRef = React.useRef<HTMLUListElement>(null)
  const highlightRef = React.useRef<SVGSVGElement>(null)
  const dotRef = React.useRef<HTMLSpanElement>(null)
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const items = useTocItems(providedItems, rootRef)
  const activeTarget = useActiveIndex(items)

  const parents = React.useMemo(() => {
    let parent = -1
    return items.map((item, index) => {
      if ((item.depth ?? 2) === 2) {
        parent = index
        return -1
      }
      return parent
    })
  }, [items])

  const track = useTrack(listRef, items)

  React.useLayoutEffect(() => {
    const highlight = highlightRef.current
    const dot = dotRef.current
    const parent = parents[activeTarget] ?? -1
    const point =
      track?.points.get(activeTarget) ??
      (parent === -1 ? undefined : track?.points.get(parent))
    if (!highlight || !dot || !track || !point) {
      return
    }

    highlight.style.clipPath = `inset(0 0 ${track.height - point.lineEnd}px 0)`
    dot.style.translate = `${point.x - dotRadius}px ${point.lineEnd - dotRadius}px`

    if (highlight.dataset.ready === undefined) {
      highlight.getBoundingClientRect()
      highlight.dataset.ready = ""
      dot.dataset.ready = ""
    }
  }, [activeTarget, parents, track])

  React.useEffect(() => {
    const viewport = viewportRef.current
    const row = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeTarget}"]`
    )
    if (!viewport || !row || viewport.scrollHeight <= viewport.clientHeight) {
      return
    }

    const margin = 72
    const top = row.offsetTop
    const bottom = top + row.offsetHeight
    if (top - margin < viewport.scrollTop) {
      viewport.scrollTo({ top: top - margin })
    } else if (bottom + margin > viewport.scrollTop + viewport.clientHeight) {
      viewport.scrollTo({ top: bottom + margin - viewport.clientHeight })
    }
  }, [activeTarget, track])

  const renderRow = (item: DocsTocItem, itemIndex: number) => {
    const active = itemIndex === activeTarget

    return (
      <li
        key={item.id}
        data-toc-row=""
        data-index={itemIndex}
        className="flex min-w-0 items-start"
      >
        <a
          href={`#${item.id}`}
          data-active={active ? "" : undefined}
          data-passed={itemIndex <= activeTarget ? "" : undefined}
          aria-current={active ? "location" : undefined}
          className={cn(
            "group/toc-link flex min-h-7 min-w-0 flex-1 items-center rounded-sm text-sm text-muted-foreground transition-colors duration-300 ease-out-quint outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-hidden focus-visible:ring-inset data-passed:text-foreground motion-reduce:transition-none",
            item.depth === 3 ? "ps-7" : "ps-5"
          )}
        >
          <span className="min-w-0 py-1 wrap-break-word decoration-foreground/40 decoration-1 underline-offset-4 group-hover/toc-link:underline">
            {breakIdentifier(item.title)}
          </span>
        </a>
      </li>
    )
  }

  if (providedItems?.length === 0) {
    return null
  }

  return (
    <nav
      ref={rootRef}
      aria-label={c("On this page")}
      className={cn("flex min-w-0 flex-col gap-2", className)}
    >
      <p className="flex min-h-7 items-center gap-2 text-sm text-muted-foreground">
        <IconAlignLeft aria-hidden="true" className="size-4" />
        {c("On this page")}
      </p>
      <div
        className={cn(
          "-me-4",
          !providedItems &&
            "duration-200 motion-safe:animate-in motion-safe:fade-in"
        )}
      >
        <ScrollArea
          viewportRef={viewportRef}
          className="[&>[data-slot=scroll-area-scrollbar]]:hidden [&>[data-slot=scroll-area-viewport]]:max-h-[min(28rem,calc(100svh-25rem))] [@media(max-height:40rem)]:[&>[data-slot=scroll-area-viewport]]:max-h-[calc(100svh-10rem)]"
        >
          <div className="relative py-1 pe-4">
            {track ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 start-0 w-3.5 rtl:-scale-x-100"
              >
                <svg
                  width="14"
                  height={track.height}
                  className="absolute inset-0 overflow-visible text-border"
                >
                  <path d={track.path} fill="none" stroke="currentColor" />
                </svg>
                <svg
                  ref={highlightRef}
                  width="14"
                  height={track.height}
                  className="absolute inset-0 overflow-visible text-foreground opacity-0 transition-all duration-300 ease-out-quint data-ready:opacity-100 motion-reduce:transition-none"
                >
                  <path d={track.path} fill="none" stroke="currentColor" />
                </svg>
                <span
                  ref={dotRef}
                  className="absolute start-0 top-0 size-1.25 rounded-full bg-foreground opacity-0 transition-all duration-300 ease-out-quint data-ready:opacity-100 motion-reduce:transition-none"
                />
              </div>
            ) : null}
            <ul ref={listRef} className="flex flex-col">
              {items.map(renderRow)}
            </ul>
          </div>
        </ScrollArea>
      </div>
    </nav>
  )
}

export { DocsToc }

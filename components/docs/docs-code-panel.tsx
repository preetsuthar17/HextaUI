"use client"

import * as React from "react"
import { cn } from "cn"

import { DocsCopyButton } from "@/components/docs/docs-copy-button"
import { DocsFileIcon } from "@/components/docs/docs-file-icon"
import { Button } from "@/components/ui/button"
import { useChrome } from "@/lib/i18n/chrome"

type DocsCodeSource = {
  url: string
  path: string
  href: string
}

type SourceFile = { path: string; html: string }

const sourceRequests = new Map<string, Promise<SourceFile[]>>()

function loadSourceFiles(url: string) {
  const cached = sourceRequests.get(url)
  if (cached) {
    return cached
  }

  const request = fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${url}`)
      }
      return response.json() as Promise<{ files: SourceFile[] }>
    })
    .then((data) => data.files)

  request.catch(() => sourceRequests.delete(url))
  sourceRequests.set(url, request)

  return request
}

function htmlToText(html: string) {
  const template = document.createElement("template")
  template.innerHTML = html
  return template.content.textContent ?? ""
}

function DocsCodePanel({
  html,
  collapsible = false,
  copyable = true,
  title,
  lang,
  source,
  className,
}: {
  html: string
  collapsible?: boolean
  copyable?: boolean
  title?: string
  lang?: string
  source?: DocsCodeSource
  className?: string
}) {
  const c = useChrome()
  const [expanded, setExpanded] = React.useState(false)
  const [fullHtml, setFullHtml] = React.useState<string | null>(null)
  const [failed, setFailed] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const currentHtml = fullHtml ?? html
  const pending = source !== undefined && fullHtml === null

  const loadFull = React.useCallback(async () => {
    if (!source) {
      return html
    }
    const files = await loadSourceFiles(source.url)
    const file = files.find((item) => item.path === source.path)
    if (!file) {
      throw new Error(`Missing ${source.path}`)
    }
    setFullHtml(file.html)
    return file.html
  }, [html, source])

  React.useEffect(() => {
    const root = rootRef.current
    if (!root || !pending || typeof IntersectionObserver !== "function") {
      return
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect()
        loadFull().catch(() => {})
      }
    })
    observer.observe(root)

    return () => {
      observer.disconnect()
    }
  }, [loadFull, pending])

  React.useLayoutEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || !collapsible) {
      return
    }

    viewport.style.height = expanded ? `${viewport.scrollHeight}px` : ""
  }, [collapsible, currentHtml, expanded])

  const readCode = () => {
    if (pending) {
      return loadFull().then(htmlToText)
    }
    return viewportRef.current?.textContent ?? ""
  }

  const toggle = () => {
    if (expanded || !pending) {
      setExpanded((value) => !value)
      return
    }
    loadFull()
      .then(() => setExpanded(true))
      .catch(() => setFailed(true))
  }

  const panel = (
    <div
      ref={rootRef}
      data-collapsible={collapsible ? "" : undefined}
      data-expanded={expanded ? "" : undefined}
      className={cn("group/code relative min-w-0", !title && className)}
    >
      <div
        ref={viewportRef}
        inert={collapsible && !expanded}
        className="overflow-hidden transition-all duration-300 ease-out-quint group-data-collapsible/code:h-44 group-data-expanded/code:pb-12 motion-reduce:transition-none"
        dangerouslySetInnerHTML={{ __html: currentHtml }}
      />
      {collapsible ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-linear-to-t from-muted via-muted/80 to-transparent pb-3 transition-opacity duration-300 group-data-expanded/code:bg-none">
          {failed && source ? (
            <Button
              variant="outline"
              size="sm"
              className="pointer-events-auto"
              render={<a href={source.href} />}
              nativeButton={false}
            >
              {c("View on GitHub")}
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              aria-expanded={expanded}
              className="pointer-events-auto"
              onClick={toggle}
            >
              {expanded ? c("Collapse") : c("View code")}
            </Button>
          )}
          {source ? (
            <noscript>
              <a
                href={source.href}
                className="pointer-events-auto text-sm underline underline-offset-4"
              >
                View the full source on GitHub
              </a>
            </noscript>
          ) : null}
        </div>
      ) : null}
      {copyable && !title ? (
        <span className="absolute end-2 top-2 rounded-md bg-muted">
          <DocsCopyButton value={readCode} />
        </span>
      ) : null}
    </div>
  )

  if (!title) {
    return panel
  }

  return (
    <figure
      className={cn(
        "min-w-0 overflow-hidden rounded-xl border bg-muted",
        className
      )}
    >
      <figcaption className="flex h-10 items-center justify-between gap-2 border-b ps-4 pe-1 font-mono text-xs text-muted-foreground">
        <span className="flex min-w-0 items-center gap-2">
          <DocsFileIcon title={title} lang={lang} />
          <span className="truncate">{title}</span>
        </span>
        {copyable ? <DocsCopyButton value={readCode} /> : null}
      </figcaption>
      {panel}
    </figure>
  )
}

export { DocsCodePanel }
export type { DocsCodeSource }

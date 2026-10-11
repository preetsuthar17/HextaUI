"use client"

import * as React from "react"
import Link from "@/components/site/link"
import { useSitePathname } from "@/lib/i18n/client"
import {
  IconAccessible,
  IconBook2,
  IconBraces,
  IconBracketsAngle,
  IconBrandGithub,
  IconCheck,
  IconCode,
  IconComponents,
  IconDeviceDesktop,
  IconDots,
  IconDownload,
  IconEye,
  IconFileText,
  IconFishHook,
  IconHash,
  IconKeyboard,
  IconLayoutGrid,
  IconLink,
  IconMarkdown,
  IconMoon,
  IconSearch,
  IconSun,
  IconTerminal2,
  IconTool,
  IconVariable,
  type Icon,
} from "@tabler/icons-react"
import { cn } from "cn"
import { useTheme } from "next-themes"

import { getPackageCommand } from "@/components/docs/docs-command"
import { copyMarkdown } from "@/components/docs/docs-page-actions"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandPage,
  useCommandPages,
  useCommandState,
} from "@/components/ui/command"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { toast } from "@/components/ui/toast"
import {
  docsComponents,
  docsGuides,
  docsHooks,
  docsKeywords,
  docsUtilities,
} from "@/lib/docs"
import {
  createDocsSearch,
  docsPageHref,
  queryTokens,
  unpackDocsSearchIndex,
  type DocsSearchDocument,
  type DocsSearchKind,
  type DocsSearchRecord,
  type DocsSearchRecordKind,
  type DocsSearchResult,
  type PackedDocsSearchIndex,
} from "@/lib/docs-search-query"
import { matchesHotkey } from "@/lib/hotkey"
import { absoluteUrl, siteRepository } from "@/lib/site"
import { useChrome } from "@/lib/i18n/chrome"

type PageKind = Extract<
  DocsSearchKind,
  "guide" | "component" | "hook" | "utility"
>

type PageEntry = DocsSearchDocument & {
  kind: PageKind
  slug: string
  href: string
  description: string
}

type RecordEntry = DocsSearchDocument & {
  kind: DocsSearchRecordKind
  href: string
  page: string
  record: DocsSearchRecord
}

type ActionEntry = DocsSearchDocument & {
  kind: "action"
  icon: Icon
  description: string
  href?: string
  external?: boolean
  checked?: boolean
  copy?: boolean
  run?: () => unknown
}

type Entry = PageEntry | RecordEntry | ActionEntry

type RecentEntry = {
  id: string
  kind: DocsSearchKind
  title: string
  href: string
  page?: string
  trail?: string[]
}

type LoadedIndex = {
  records: RecordEntry[]
  bySlug: Map<string, RecordEntry[]>
  installable: Set<string>
}

type ResultGroup = {
  key: "pages" | "sections" | "api" | "actions"
  heading: string
  results: DocsSearchResult<Entry>[]
  limit: number
}

const kindIcons: Record<DocsSearchKind, Icon> = {
  guide: IconBook2,
  component: IconComponents,
  hook: IconFishHook,
  utility: IconTool,
  section: IconHash,
  example: IconEye,
  api: IconBraces,
  prop: IconVariable,
  attribute: IconBracketsAngle,
  action: IconTerminal2,
}

const sectionIcons: Record<string, Icon> = {
  Installation: IconDownload,
  Usage: IconCode,
  Examples: IconLayoutGrid,
  Keyboard: IconKeyboard,
  Accessibility: IconAccessible,
  "API reference": IconBraces,
}

const groupLimits: Record<ResultGroup["key"], number> = {
  pages: 6,
  sections: 8,
  api: 6,
  actions: 4,
}

const pageGroups: { heading: string; kind: PageKind }[] = [
  { heading: "Getting started", kind: "guide" },
  { heading: "Components", kind: "component" },
  { heading: "Hooks", kind: "hook" },
  { heading: "Utilities", kind: "utility" },
]

function toPageEntry(
  slug: string,
  title: string,
  description: string,
  kind: PageKind
): PageEntry {
  return {
    id: `page:${slug}`,
    slug,
    title,
    kind,
    href: docsPageHref(slug),
    description,
    text: description,
    keywords: docsKeywords[slug],
  }
}

const pageEntries: PageEntry[] = [
  ...docsGuides.map((guide) =>
    toPageEntry(guide.slug, guide.title, guide.description, "guide")
  ),
  ...docsComponents.map((entry) =>
    toPageEntry(entry.slug, entry.name, entry.description, "component")
  ),
  ...docsHooks.map((entry) =>
    toPageEntry(entry.slug, entry.name, entry.description, "hook")
  ),
  ...docsUtilities.map((entry) =>
    toPageEntry(entry.slug, entry.name, entry.description, "utility")
  ),
]

const pageBySlug = new Map(pageEntries.map((entry) => [entry.slug, entry]))
const pageById = new Map(pageEntries.map((entry) => [entry.id, entry]))
const pageByHref = new Map(pageEntries.map((entry) => [entry.href, entry]))

function isPage(entry: Entry | undefined): entry is PageEntry {
  return entry !== undefined && entry.id.startsWith("page:")
}

function isAction(
  entry: Entry | RecentEntry | undefined
): entry is ActionEntry {
  return entry !== undefined && "icon" in entry
}

function isRecord(entry: Entry | undefined): entry is RecordEntry {
  return entry !== undefined && "record" in entry
}

function markdownHref(slug: string) {
  return slug === "" ? "/docs.md" : `/docs/${slug}.md`
}

function installCommand(slug: string) {
  return getPackageCommand(
    ["shadcn@latest", "add", absoluteUrl(`/r/${slug}.json`)],
    "dlx"
  )
}

let indexRequest: Promise<LoadedIndex> | null = null

function buildIndex(packed: PackedDocsSearchIndex): LoadedIndex {
  const index = unpackDocsSearchIndex(packed)
  const seen = new Set<string>()
  const records: RecordEntry[] = []
  const bySlug = new Map<string, RecordEntry[]>()

  for (const record of index.records) {
    const id = `${record.kind}:${record.href}:${record.title}`
    if (seen.has(id)) {
      continue
    }
    seen.add(id)
    const entry: RecordEntry = {
      id,
      title: record.title,
      kind: record.kind,
      page: pageBySlug.get(record.page)?.title ?? record.page,
      trail: record.trail,
      text: record.text,
      detail: record.type,
      href: record.href,
      record,
    }
    records.push(entry)
    const list = bySlug.get(record.page)
    if (list) {
      list.push(entry)
    } else {
      bySlug.set(record.page, [entry])
    }
  }

  return { records, bySlug, installable: new Set(index.installable) }
}

function loadIndex() {
  if (!indexRequest) {
    const request = fetch("/docs/search.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Couldn’t load the search index")
        }
        return response.json() as Promise<PackedDocsSearchIndex>
      })
      .then(buildIndex)
    request.catch(() => {
      if (indexRequest === request) {
        indexRequest = null
      }
    })
    indexRequest = request
  }
  return indexRequest
}

function prefetchIndex() {
  loadIndex().catch(() => {})
}

function useSearchIndex(open: boolean) {
  const [index, setIndex] = React.useState<LoadedIndex | null>(null)
  const [failed, setFailed] = React.useState(false)

  React.useEffect(() => {
    if (!open || index) {
      return
    }
    let live = true
    loadIndex().then(
      (loaded) => {
        if (live) {
          setIndex(loaded)
          setFailed(false)
        }
      },
      () => {
        if (live) {
          setFailed(true)
        }
      }
    )
    return () => {
      live = false
    }
  }, [index, open])

  return { index, failed }
}

const recentKey = "hextaui-search-recent"
const recentLimit = 5
const recentListeners = new Set<() => void>()
let recentCache: { raw: string | null; value: RecentEntry[] } = {
  raw: null,
  value: [],
}
const noRecent: RecentEntry[] = []

function isRecentEntry(value: unknown): value is RecentEntry {
  if (typeof value !== "object" || value === null) {
    return false
  }
  const entry = value as Record<string, unknown>
  return (
    typeof entry.id === "string" &&
    typeof entry.title === "string" &&
    typeof entry.href === "string" &&
    typeof entry.kind === "string" &&
    entry.kind in kindIcons &&
    entry.href.startsWith("/")
  )
}

function readRecent() {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(recentKey)
  } catch {
    return noRecent
  }
  if (raw === recentCache.raw) {
    return recentCache.value
  }
  let value: RecentEntry[] = []
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : []
    value = Array.isArray(parsed) ? parsed.filter(isRecentEntry) : []
  } catch {}
  recentCache = { raw, value }
  return value
}

function subscribeRecent(listener: () => void) {
  recentListeners.add(listener)
  return () => {
    recentListeners.delete(listener)
  }
}

function toRecent(entry: PageEntry | RecordEntry | RecentEntry): RecentEntry {
  return {
    id: entry.id,
    kind: entry.kind,
    title: entry.title,
    href: entry.href,
    ...(entry.page ? { page: entry.page, trail: entry.trail ?? [] } : {}),
  }
}

function rememberRecent(entry: PageEntry | RecordEntry | RecentEntry) {
  const item = toRecent(entry)
  const next = [
    item,
    ...readRecent().filter((recent) => recent.id !== item.id),
  ].slice(0, recentLimit)
  try {
    localStorage.setItem(recentKey, JSON.stringify(next))
  } catch {}
  for (const listener of recentListeners) {
    listener()
  }
}

function useRecent() {
  return React.useSyncExternalStore(subscribeRecent, readRecent, () => noRecent)
}

async function notify(work: () => unknown, message: string) {
  try {
    await work()
    toast.success(message)
  } catch {
    toast.error("Couldn’t copy to the clipboard")
  }
}

function copyText(value: string) {
  return navigator.clipboard.writeText(value)
}

function openExternal(href: string) {
  window.open(href, "_blank", "noopener,noreferrer")
}

function usePageActions(
  page: PageEntry | undefined,
  installable: boolean
): ActionEntry[] {
  return React.useMemo(() => {
    if (!page) {
      return []
    }
    return [
      {
        id: `page-action:open:${page.slug}`,
        title: `Open ${page.title}`,
        kind: "action",
        icon: kindIcons[page.kind],
        description: page.description,
        href: page.href,
        keywords: ["go", "visit", "page"],
      },
      ...(installable
        ? [
            {
              id: `page-action:install:${page.slug}`,
              title: "Copy install command",
              kind: "action" as const,
              icon: IconTerminal2,
              description: installCommand(page.slug),
              keywords: ["cli", "shadcn", "add", "npx", "pnpm"],
              copy: true,
              run: () =>
                notify(
                  () => copyText(installCommand(page.slug)),
                  "Copied install command"
                ),
            },
          ]
        : []),
      {
        id: `page-action:copy-markdown:${page.slug}`,
        title: "Copy page as Markdown",
        kind: "action",
        icon: IconMarkdown,
        description: `The whole ${page.title} page, ready to paste into an AI assistant.`,
        keywords: ["md", "llm", "ai", "copy"],
        copy: true,
        run: () =>
          notify(
            () => copyMarkdown(markdownHref(page.slug)),
            "Copied page as Markdown"
          ),
      },
      {
        id: `page-action:view-markdown:${page.slug}`,
        title: "View as Markdown",
        kind: "action",
        icon: IconFileText,
        description: markdownHref(page.slug),
        keywords: ["md", "raw", "source"],
        href: markdownHref(page.slug),
        external: true,
      },
      {
        id: `page-action:copy-link:${page.slug}`,
        title: "Copy link",
        kind: "action",
        icon: IconLink,
        description: absoluteUrl(page.href),
        keywords: ["url", "share"],
        copy: true,
        run: () =>
          notify(() => copyText(absoluteUrl(page.href)), "Copied link"),
      },
    ]
  }, [installable, page])
}

function useGlobalActions(): ActionEntry[] {
  const pathname = useSitePathname()
  const { theme, setTheme } = useTheme()
  const current = pageByHref.get(pathname)

  return React.useMemo(() => {
    const themes: ActionEntry[] = [
      {
        id: "action:theme-light",
        title: "Light theme",
        kind: "action",
        icon: IconSun,
        description: "Switch the site to the light theme.",
        keywords: ["appearance", "mode", "theme", "color scheme", "day"],
        checked: theme === "light",
        run: () => setTheme("light"),
      },
      {
        id: "action:theme-dark",
        title: "Dark theme",
        kind: "action",
        icon: IconMoon,
        description:
          "Switch the site to the dark theme. Press D anywhere to flip between light and dark.",
        keywords: ["appearance", "mode", "theme", "color scheme", "night"],
        checked: theme === "dark",
        run: () => setTheme("dark"),
      },
      {
        id: "action:theme-system",
        title: "System theme",
        kind: "action",
        icon: IconDeviceDesktop,
        description: "Follow your operating system’s appearance setting.",
        keywords: ["appearance", "mode", "theme", "auto", "os"],
        checked: theme === "system",
        run: () => setTheme("system"),
      },
    ]

    return [
      ...(current
        ? [
            {
              id: "action:copy-markdown",
              title: "Copy this page as Markdown",
              kind: "action" as const,
              icon: IconMarkdown,
              description: `The whole ${current.title} page, ready to paste into an AI assistant.`,
              keywords: ["md", "llm", "ai", "copy", "current"],
              copy: true,
              run: () =>
                notify(
                  () => copyMarkdown(markdownHref(current.slug)),
                  "Copied page as Markdown"
                ),
            },
            {
              id: "action:copy-link",
              title: "Copy link to this page",
              kind: "action" as const,
              icon: IconLink,
              description: absoluteUrl(current.href),
              keywords: ["url", "share", "current"],
              copy: true,
              run: () =>
                notify(
                  () => copyText(absoluteUrl(current.href)),
                  "Copied link"
                ),
            },
          ]
        : []),
      ...themes,
      {
        id: "action:components",
        title: "Browse all components",
        kind: "action",
        icon: IconLayoutGrid,
        description: "Every component on one page.",
        keywords: ["index", "list", "gallery", "overview"],
        href: "/components",
      },
      {
        id: "action:llms",
        title: "Open llms.txt",
        kind: "action",
        icon: IconFileText,
        description:
          "An index of every page as Markdown, for AI assistants and agents.",
        keywords: ["ai", "llm", "agents", "markdown", "mcp"],
        href: "/llms.txt",
        external: true,
      },
      {
        id: "action:github",
        title: "View source on GitHub",
        kind: "action",
        icon: IconBrandGithub,
        description: siteRepository.replace("https://", ""),
        keywords: ["repository", "repo", "code", "issues", "star"],
        href: siteRepository,
        external: true,
      },
    ]
  }, [current, setTheme, theme])
}

function matchRanges(text: string, tokens: string[]) {
  const lower = text.toLowerCase()
  const ranges: [number, number][] = []
  for (const token of tokens) {
    let found = -1
    for (
      let at = lower.indexOf(token);
      at !== -1;
      at = lower.indexOf(token, at + 1)
    ) {
      const before = text[at - 1]
      const boundary =
        at === 0 ||
        !/[a-z0-9]/i.test(before) ||
        (/[a-z]/.test(before) && /[A-Z]/.test(text[at]))
      if (boundary) {
        found = at
        break
      }
      if (found === -1) {
        found = at
      }
    }
    if (found !== -1) {
      ranges.push([found, found + token.length])
    }
  }
  ranges.sort((a, b) => a[0] - b[0])
  const merged: [number, number][] = []
  for (const range of ranges) {
    const last = merged.at(-1)
    if (last && range[0] <= last[1]) {
      last[1] = Math.max(last[1], range[1])
    } else {
      merged.push([...range])
    }
  }
  return merged
}

function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  const ranges = tokens.length > 0 ? matchRanges(text, tokens) : []
  if (ranges.length === 0) {
    return text
  }
  const parts: React.ReactNode[] = []
  let cursor = 0
  for (const [start, end] of ranges) {
    if (start > cursor) {
      parts.push(text.slice(cursor, start))
    }
    parts.push(
      <span key={start} className="text-foreground">
        {text.slice(start, end)}
      </span>
    )
    cursor = end
  }
  if (cursor < text.length) {
    parts.push(text.slice(cursor))
  }
  return <span className="text-muted-foreground">{parts}</span>
}

function entryIcon(entry: Entry | RecentEntry): Icon {
  if (isAction(entry)) {
    return entry.icon
  }
  if (entry.kind === "section" || entry.kind === "api") {
    return sectionIcons[entry.title] ?? kindIcons[entry.kind]
  }
  return kindIcons[entry.kind]
}

function EntryIcon({ entry }: { entry: Entry | RecentEntry }) {
  const Glyph = entryIcon(entry)
  return (
    <Glyph
      aria-hidden="true"
      className="size-4 shrink-0 text-muted-foreground"
    />
  )
}

function crumbOf(entry: Entry | RecentEntry) {
  if (!entry.page) {
    return ""
  }
  return [
    entry.page,
    ...(entry.kind === "api" ? ["API reference"] : []),
    ...(entry.trail ?? []),
  ].join(" › ")
}

function EntryRow({
  entry,
  tokens,
}: {
  entry: Entry | RecentEntry
  tokens: string[]
}) {
  const crumb = crumbOf(entry)
  const code = entry.kind === "prop" || entry.kind === "attribute"
  const checked = isAction(entry) && entry.checked

  return (
    <>
      <EntryIcon entry={entry} />
      <span className={cn("min-w-0 flex-1 truncate", code && "font-mono")}>
        <Highlight text={entry.title} tokens={tokens} />
      </span>
      {crumb ? (
        <span className="max-w-1/2 min-w-0 shrink truncate text-xs text-muted-foreground">
          <Highlight text={crumb} tokens={tokens} />
        </span>
      ) : null}
      {checked ? (
        <>
          <IconCheck aria-hidden="true" className="ms-auto size-4" />
          <span className="sr-only">(current)</span>
        </>
      ) : null}
    </>
  )
}

function EntryItem({
  entry,
  value = entry.id,
  tokens,
  onChoose,
}: {
  entry: Entry | RecentEntry
  value?: string
  tokens: string[]
  onChoose: (entry: Entry | RecentEntry) => void
}) {
  const action = isAction(entry)
  const href = action ? (entry.external ? undefined : entry.href) : entry.href

  return (
    <CommandItem
      value={value}
      confirm={!(action && entry.copy)}
      render={href ? <Link href={href} prefetch={false} /> : undefined}
      onSelect={() => onChoose(entry)}
    >
      <EntryRow entry={entry} tokens={tokens} />
    </CommandItem>
  )
}

function ShowMoreItem({
  group,
  onShowMore,
}: {
  group: ResultGroup
  onShowMore: (group: ResultGroup) => void
}) {
  const hidden = group.results.length - group.limit
  if (hidden <= 0) {
    return null
  }
  return (
    <CommandItem
      value={`more:${group.key}`}
      confirm={false}
      onSelect={() => onShowMore(group)}
    >
      <span
        aria-hidden="true"
        className="flex size-6 shrink-0 items-center justify-center text-muted-foreground"
      >
        <IconDots className="size-4" />
      </span>
      <span className="text-muted-foreground in-data-[selected=true]:text-foreground">
        Show {hidden} more
      </span>
    </CommandItem>
  )
}

function hintFor(entry: Entry | undefined) {
  if (!entry) {
    return null
  }
  if (isAction(entry)) {
    if (entry.copy) {
      return "Copy"
    }
    if (entry.href) {
      return entry.external ? "Open in new tab" : "Go to page"
    }
    return "Run"
  }
  return isPage(entry) ? "Go to page" : "Go to section"
}

function DocsSearchFooter({
  selected,
  nested,
}: {
  selected: Entry | undefined
  nested: boolean
}) {
  const hint = hintFor(selected)

  return (
    <CommandFooter>
      {hint ? (
        <span className="inline-flex items-center gap-1.5">
          <Kbd variant="flat">↵</Kbd>
          {hint}
        </span>
      ) : null}
      {!nested && isPage(selected) ? (
        <span className="ms-auto inline-flex items-center gap-1.5">
          <Kbd variant="flat">⇥</Kbd>
          Actions
        </span>
      ) : null}
      {nested ? (
        <span className="ms-auto inline-flex items-center gap-1.5">
          <Kbd variant="flat">esc</Kbd>
          Back
        </span>
      ) : null}
    </CommandFooter>
  )
}

function DocsSearchBody({
  open,
  value,
  onValueChange,
  onClose,
}: {
  open: boolean
  value: string
  onValueChange: (value: string) => void
  onClose: () => void
}) {
  const search = useCommandState((state) => state.search)
  const pages = useCommandPages()
  const { index, failed } = useSearchIndex(open)
  const recent = useRecent()
  const globalActions = useGlobalActions()
  const subpage = pages.page ? pageById.get(pages.page) : undefined
  const pageActions = usePageActions(
    subpage,
    subpage ? (index?.installable.has(subpage.slug) ?? false) : false
  )
  const [expanded, setExpanded] = React.useState<{
    query: string
    limits: Partial<Record<ResultGroup["key"], number>>
  }>({ query: "", limits: {} })

  const query = search.trim()
  const tokens = React.useMemo(() => queryTokens(query), [query])

  const searchDocs = React.useMemo(
    () => createDocsSearch<Entry>([...pageEntries, ...(index?.records ?? [])]),
    [index]
  )
  const searchActions = React.useMemo(
    () => createDocsSearch<Entry>(globalActions),
    [globalActions]
  )
  const searchPage = React.useMemo(
    () =>
      createDocsSearch<Entry>([
        ...pageActions,
        ...(subpage ? (index?.bySlug.get(subpage.slug) ?? []) : []),
      ]),
    [index, pageActions, subpage]
  )

  const lookup = React.useMemo(() => {
    const map = new Map<string, Entry>()
    for (const entry of [
      ...pageEntries,
      ...(index?.records ?? []),
      ...globalActions,
      ...pageActions,
    ]) {
      map.set(entry.id, entry)
    }
    return map
  }, [globalActions, index, pageActions])

  const resolve = (id: string) =>
    lookup.get(id.startsWith("recent:") ? id.slice(7) : id)

  const selected = resolve(value)

  React.useEffect(() => {
    if (!open && pages.pages.length > 0) {
      pages.reset()
    }
  }, [open, pages])

  const choose = (entry: Entry | RecentEntry) => {
    if (isAction(entry)) {
      if (entry.run) {
        entry.run()
      } else if (entry.href && entry.external) {
        openExternal(entry.href)
      }
    } else {
      rememberRecent(entry)
    }
    onClose()
  }

  const limitFor = (key: ResultGroup["key"]) =>
    (expanded.query === query ? expanded.limits[key] : undefined) ??
    groupLimits[key]

  const showMore = (group: ResultGroup) => {
    const next = group.results[group.limit]
    setExpanded({
      query,
      limits: {
        ...(expanded.query === query ? expanded.limits : {}),
        [group.key]: group.limit + 20,
      },
    })
    if (next) {
      onValueChange(next.document.id)
    }
  }

  const renderGroup = (group: ResultGroup) => (
    <CommandGroup key={group.key} heading={group.heading}>
      {group.results.slice(0, group.limit).map((result) => (
        <EntryItem
          key={result.document.id}
          entry={result.document}
          tokens={tokens}
          onChoose={choose}
        />
      ))}
      <ShowMoreItem group={group} onShowMore={showMore} />
    </CommandGroup>
  )

  let content: React.ReactNode

  if (subpage) {
    const results = query ? searchPage(query) : []
    const actions = query
      ? results.filter((result) => result.document.kind === "action")
      : pageActions.map((document) => ({ document, score: 0 }))
    const records = query
      ? results.filter((result) => result.document.kind !== "action")
      : (index?.bySlug.get(subpage.slug) ?? [])
          .filter(
            (record) => record.kind !== "prop" && record.kind !== "attribute"
          )
          .map((document) => ({ document, score: 0 }))

    content = (
      <CommandPage id={subpage.id}>
        {actions.length > 0 ? (
          <CommandGroup heading={subpage.title}>
            {actions.map((result) => (
              <EntryItem
                key={result.document.id}
                entry={result.document}
                tokens={tokens}
                onChoose={choose}
              />
            ))}
          </CommandGroup>
        ) : null}
        {records.length > 0 ? (
          <CommandGroup
            heading={query ? "Matches on this page" : "On this page"}
          >
            {records.map((result) => (
              <CommandItem
                key={result.document.id}
                value={result.document.id}
                render={
                  <Link href={result.document.href ?? ""} prefetch={false} />
                }
                onSelect={() => choose(result.document)}
              >
                <EntryIcon entry={result.document} />
                <span
                  className={cn(
                    "min-w-0 flex-1 truncate",
                    (result.document.kind === "prop" ||
                      result.document.kind === "attribute") &&
                      "font-mono"
                  )}
                >
                  <Highlight text={result.document.title} tokens={tokens} />
                </span>
                {query && result.document.trail?.length ? (
                  <span className="max-w-1/2 min-w-0 shrink truncate text-xs text-muted-foreground">
                    {result.document.trail.join(" › ")}
                  </span>
                ) : null}
              </CommandItem>
            ))}
          </CommandGroup>
        ) : null}
        {!index && !failed ? (
          <CommandLoading>Loading sections…</CommandLoading>
        ) : null}
      </CommandPage>
    )
  } else if (query) {
    const results = searchDocs(query)
    const groups: ResultGroup[] = [
      {
        key: "pages" as const,
        heading: "Pages",
        results: results.filter((result) => isPage(result.document)),
      },
      {
        key: "sections" as const,
        heading: "Sections",
        results: results.filter(
          (result) =>
            result.document.kind === "section" ||
            result.document.kind === "example" ||
            result.document.kind === "api"
        ),
      },
      {
        key: "api" as const,
        heading: "Props and attributes",
        results: results.filter(
          (result) =>
            result.document.kind === "prop" ||
            result.document.kind === "attribute"
        ),
      },
      {
        key: "actions" as const,
        heading: "Actions",
        results: searchActions(query),
      },
    ]
      .filter((group) => group.results.length > 0)
      .map((group) => ({ ...group, limit: limitFor(group.key) }))
      .sort((a, b) => b.results[0].score - a.results[0].score)

    content = (
      <>
        {groups.map(renderGroup)}
        {!index && !failed ? (
          <CommandLoading>Searching sections and props…</CommandLoading>
        ) : null}
      </>
    )
  } else {
    content = (
      <>
        {recent.length > 0 ? (
          <CommandGroup heading="Recent">
            {recent.map((entry) => (
              <EntryItem
                key={entry.id}
                value={`recent:${entry.id}`}
                entry={lookup.get(entry.id) ?? entry}
                tokens={tokens}
                onChoose={choose}
              />
            ))}
          </CommandGroup>
        ) : null}
        {pageGroups.map((group) => (
          <CommandGroup key={group.kind} heading={group.heading}>
            {pageEntries
              .filter((entry) => entry.kind === group.kind)
              .map((entry) => (
                <EntryItem
                  key={entry.id}
                  entry={entry}
                  tokens={tokens}
                  onChoose={choose}
                />
              ))}
          </CommandGroup>
        ))}
        <CommandGroup heading="Actions">
          {globalActions.map((entry) => (
            <EntryItem
              key={entry.id}
              entry={entry}
              tokens={tokens}
              onChoose={choose}
            />
          ))}
        </CommandGroup>
      </>
    )
  }

  return (
    <>
      <div className="p-1.5 pb-0">
        <div className="rounded-lg bg-muted [&_[data-slot=command-input]]:h-9 pointer-coarse:[&_[data-slot=command-input]]:h-11 [&>[data-slot=command-input-wrapper]]:border-0 [&>[data-slot=command-input-wrapper]]:ps-3">
          <CommandInput
            placeholder={
              subpage
                ? `Search ${subpage.title}…`
                : "Search components, hooks, props…"
            }
            onKeyDown={(event) => {
              if (event.key !== "Tab" || event.nativeEvent.isComposing) {
                return
              }
              if (event.shiftKey && subpage) {
                event.preventDefault()
                pages.pop()
              } else if (!event.shiftKey && !subpage && isPage(selected)) {
                event.preventDefault()
                pages.push(selected.id, selected.title)
              }
            }}
          />
        </div>
      </div>
      <CommandList>
        <CommandEmpty>
          {(term) => (
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-foreground">No results for “{term.trim()}”</p>
              <p className="max-w-xs">
                {failed
                  ? "Only page names were searched. The full index couldn’t load."
                  : "Try a component like dialog, a prop like onValueChange, or a section like keyboard."}
              </p>
            </div>
          )}
        </CommandEmpty>
        {content}
      </CommandList>
      <DocsSearchFooter selected={selected} nested={Boolean(subpage)} />
    </>
  )
}

type DocsSearchContextValue = {
  open: () => void
}

const DocsSearchContext = React.createContext<DocsSearchContextValue | null>(
  null
)

function isEditable(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      target.closest("input, textarea, select, [contenteditable='true']") !==
        null)
  )
}

function DocsSearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.isComposing ||
        document.querySelector("[data-block-preview]")
      ) {
        return
      }
      if (matchesHotkey(event, "mod+k")) {
        event.preventDefault()
        setOpen((current) => !current)
      } else if (matchesHotkey(event, "/") && !isEditable(event.target)) {
        event.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const context = React.useMemo(() => ({ open: () => setOpen(true) }), [])

  return (
    <DocsSearchContext.Provider value={context}>
      {children}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search documentation"
        description="Search components, hooks, utilities, sections and props."
        preserveSearch
      >
        <Command
          label="Search documentation"
          shouldFilter={false}
          loop
          value={value}
          onValueChange={setValue}
          formatResults={(count) =>
            count === 0
              ? "No results"
              : count === 1
                ? "1 result"
                : `${count} results`
          }
        >
          <DocsSearchBody
            open={open}
            value={value}
            onValueChange={setValue}
            onClose={() => setOpen(false)}
          />
        </Command>
      </CommandDialog>
    </DocsSearchContext.Provider>
  )
}

function useDocsSearch() {
  const context = React.useContext(DocsSearchContext)
  if (!context) {
    throw new Error("useDocsSearch must be used within <DocsSearchProvider>.")
  }
  return context
}

function DocsSearchTrigger({ className }: { className?: string }) {
  const { open } = useDocsSearch()
  const c = useChrome()

  return (
    <button
      type="button"
      onClick={open}
      onPointerEnter={prefetchIndex}
      onFocus={prefetchIndex}
      aria-keyshortcuts="Meta+K Control+K /"
      className={cn(
        "flex h-8 w-full items-center gap-2 rounded-md bg-muted/60 ps-2 pe-1.5 text-sm text-muted-foreground transition-colors duration-150 outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:outline-hidden motion-reduce:transition-none",
        className
      )}
    >
      <IconSearch aria-hidden="true" className="size-4 shrink-0" />
      <span className="flex-1 truncate text-start">{c("Search docs")}</span>
      <KbdGroup aria-hidden="true" variant="keycap" size="sm" keys="mod+k" />
    </button>
  )
}

function DocsSearchButton({ className }: { className?: string }) {
  const { open } = useDocsSearch()

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Search docs"
      aria-keyshortcuts="Meta+K Control+K /"
      onClick={open}
      onPointerEnter={prefetchIndex}
      onFocus={prefetchIndex}
      className={className}
    >
      <IconSearch />
    </Button>
  )
}

export { DocsSearchButton, DocsSearchProvider, DocsSearchTrigger }

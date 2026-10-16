import { execFileSync } from "node:child_process"
import { existsSync, readdirSync } from "node:fs"
import path from "node:path"

import type { MetadataRoute } from "next"

import {
  isLocalizedPath,
  languageAlternates,
  localizeHref,
  translatedLocales,
} from "@/lib/i18n/config"
import { blogContentFile } from "@/lib/blog-content"
import { isBlogSlug } from "@/lib/blog"
import { proBlocks } from "@/lib/pro/catalog"
import { absoluteUrl, isNoindexPath } from "@/lib/site"

export const dynamic = "force-static"

const appDir = path.join(process.cwd(), "app")

const dynamicRoutes: Record<string, string[]> = {
  "/blocks/[name]": proBlocks.map((block) => block.name),
}

function languages(route: string) {
  const alternates = languageAlternates(route)
  if (!alternates) return undefined
  return Object.fromEntries(
    Object.entries(alternates).map(([locale, href]) => [
      locale,
      absoluteUrl(href),
    ])
  )
}

const priorities: [string, number][] = [
  ["/components", 0.8],
  ["/docs", 0.7],
  ["/blog", 0.7],
  ["/blocks", 0.6],
  ["/legal", 0.2],
]

type Page = { route: string; file: string }

function findPages(dir: string, segments: string[] = []): Page[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isFile() && /^page\.(tsx|ts|jsx|js|mdx)$/.test(entry.name)) {
      return [
        { route: `/${segments.join("/")}`, file: path.join(dir, entry.name) },
      ]
    }

    if (
      !entry.isDirectory() ||
      entry.name.startsWith("_") ||
      entry.name.startsWith("@")
    ) {
      return []
    }

    const segment = /^\(.+\)$/.test(entry.name) ? [] : [entry.name]
    return findPages(path.join(dir, entry.name), [...segments, ...segment])
  })
}

function git(args: string[], input?: string) {
  try {
    return execFileSync("git", args, {
      cwd: process.cwd(),
      encoding: "utf8",
      input,
      stdio: ["pipe", "pipe", "ignore"],
    }).trim()
  } catch (error) {
    const stdout = (error as { stdout?: string }).stdout
    return typeof stdout === "string" ? stdout.trim() : null
  }
}

function ignoredFiles(files: string[]) {
  const output = git(["check-ignore", "--stdin"], files.join("\n"))
  return new Set(output ? output.split("\n") : [])
}

function hasHistory() {
  const shallow = () => git(["rev-parse", "--is-shallow-repository"])
  if (shallow() === "true") {
    try {
      execFileSync(
        "git",
        ["fetch", "--quiet", "--unshallow", "--filter=blob:none"],
        {
          cwd: process.cwd(),
          env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
          stdio: "ignore",
          timeout: 60_000,
        }
      )
    } catch {}
  }
  return shallow() === "false"
}

const proDir = path.join(process.cwd(), "pro")

function sourcesFor(route: string, file: string) {
  const post = /^\/blog\/([^/]+)$/.exec(route)?.[1]
  if (post && isBlogSlug(post)) return [file, blogContentFile(post)]

  const slug = /^\/docs\/([^/]+)$/.exec(route)?.[1]
  if (!slug) return [file]

  return [
    file,
    `components/examples/${slug}`,
    `components/ui/${slug}.tsx`,
    `hooks/${slug}.ts`,
    `lib/${slug}.ts`,
  ].filter((source) => existsSync(path.resolve(process.cwd(), source)))
}

function commitDate(args: string[], cwd = process.cwd()) {
  try {
    const date = execFileSync("git", ["log", "-1", "--format=%cI", ...args], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim()
    return date ? new Date(date) : undefined
  } catch {
    return undefined
  }
}

function lastModified(route: string, file: string, history: boolean) {
  if (!history) {
    return undefined
  }

  const block = /^\/blocks\/([^/]+)$/.exec(route)?.[1]
  if (block && existsSync(path.join(proDir, ".git"))) {
    const date = commitDate(["--", `blocks/${block}`], proDir)
    if (date) return date
  }

  return commitDate(["--", ...sourcesFor(route, file)])
}

function expand(route: string) {
  if (!route.includes("[")) {
    return [route]
  }

  const values = dynamicRoutes[route]
  if (!values) {
    throw new Error(
      `sitemap: add ${route} to dynamicRoutes in app/sitemap.ts or disallow it in lib/site.ts`
    )
  }

  return values.map((value) => route.replace(/\[[^\]]+\]/, value))
}

function priority(route: string) {
  if (route === "/") {
    return 1
  }

  const match = priorities.find(
    ([prefix]) => route === prefix || route.startsWith(`${prefix}/`)
  )
  return match?.[1] ?? 0.5
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = findPages(appDir).filter(
    (page) => !isNoindexPath(page.route) && !page.route.startsWith("/[lang]")
  )
  const ignored = ignoredFiles(pages.map((page) => page.file))
  const history = hasHistory()

  return pages
    .filter((page) => !ignored.has(page.file))
    .flatMap((page) =>
      expand(page.route).flatMap((route) => {
        const entry = {
          lastModified: lastModified(route, page.file, history),
          priority: priority(route),
          alternates: { languages: languages(route) },
        }
        const locales = isLocalizedPath(route) ? translatedLocales : []
        return [
          { url: absoluteUrl(route), ...entry },
          ...locales.map((locale) => ({
            url: absoluteUrl(localizeHref(route, locale)),
            ...entry,
            priority: Math.round(entry.priority * 80) / 100,
          })),
        ]
      })
    )
    .sort((a, b) => b.priority - a.priority || a.url.localeCompare(b.url))
}

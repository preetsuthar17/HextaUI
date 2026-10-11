import { describe, expect, it } from "vitest"

import { getPagesRoutes, getRedirectSources } from "@/lib/pages-routes"

const entries = [
  { name: "_next", directory: true },
  { name: "_headers", directory: false },
  { name: "_not-found.html", directory: false },
  { name: ".gitkeep", directory: false },
  { name: ".well-known", directory: true },
  { name: "index.html", directory: false },
  { name: "index.md", directory: false },
  { name: "docs", directory: true },
  { name: "docs.html", directory: false },
  {
    name: "mcp",
    directory: true,
    children: [
      { name: "index.json", directory: false },
      { name: "docs", directory: true },
    ],
  },
  { name: "r", directory: true },
  { name: "llms.txt", directory: false },
]

describe("getPagesRoutes", () => {
  const functions = { files: ["/mcp"], directories: ["/api", "/r"] }
  const routes = getPagesRoutes(entries, functions)

  it("routes everything else through Functions", () => {
    expect(routes.include).toEqual(["/*"])
  })

  it("skips Functions for static pages and assets", () => {
    expect(routes.exclude).toEqual(
      expect.arrayContaining([
        "/_next/*",
        "/.well-known/*",
        "/docs.html",
        "/docs/*",
        "/index.md",
        "/llms.txt",
        "/mcp/docs/*",
        "/mcp/index.json",
        "/_not-found",
      ])
    )
  })

  it("lets a folder wildcard cover the page with the same name", () => {
    expect(routes.exclude).not.toContain("/docs")
  })

  it("keeps the homepage, MCP endpoint and Pro registry on Functions", () => {
    expect(routes.exclude).not.toContain("/")
    expect(routes.exclude).not.toContain("/index.html")
    expect(routes.exclude).not.toContain("/mcp")
    expect(routes.exclude).not.toContain("/mcp/*")
    expect(routes.exclude.some((rule) => rule.startsWith("/r"))).toBe(false)
    expect(routes.exclude).not.toContain("/_headers")
    expect(routes.exclude).not.toContain("/.gitkeep")
  })

  it("refuses more rules than Cloudflare allows", () => {
    const many = Array.from({ length: 120 }, (_, index) => ({
      name: `page-${index}.html`,
      directory: false,
    }))
    expect(() => getPagesRoutes(many, functions)).toThrow(/100/)
  })

  it("skips Functions for redirect sources that no static rule covers", () => {
    const sources = getRedirectSources(
      [
        "/preview/:slug /docs/:slug 301",
        "/docs/ui/components/button /docs/button 301",
        "/sponsors /sponsor 301",
        "/api/old /api/new 301",
        "/mcp /docs/mcp 301",
        "",
        "# comment",
      ].join("\n")
    )
    expect(sources).toEqual([
      "/docs/ui/components/button",
      "/sponsors",
      "/api/old",
      "/mcp",
    ])

    const withRedirects = getPagesRoutes(entries, functions, sources)
    expect(withRedirects.exclude).toContain("/sponsors")
    expect(withRedirects.exclude).not.toContain("/docs/ui/components/button")
    expect(withRedirects.exclude).not.toContain("/api/old")
    expect(withRedirects.exclude).not.toContain("/mcp")
  })
})

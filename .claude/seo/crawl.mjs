import fs from "node:fs"
import path from "node:path"

const root = process.argv[2]
const outFile = process.argv[3]
const siteUrl = "https://hextaui.com"

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return entry.name.endsWith(".html") ? [full] : []
  })
}

function routeOf(file) {
  let rel = "/" + path.relative(root, file).replace(/\\/g, "/")
  rel = rel.replace(/\.html$/, "")
  if (rel.endsWith("/index")) rel = rel.slice(0, -"/index".length) || "/"
  return rel === "" ? "/" : rel
}

function attr(tag, name) {
  const m = new RegExp(`\\b${name}=["']([^"']*)["']`, "i").exec(tag)
  return m ? m[1] : undefined
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
}

const pages = []
for (const file of walk(root)) {
  const html = fs.readFileSync(file, "utf8")
  const route = routeOf(file)
  const head = html.slice(0, html.indexOf("</head>"))
  const title = decode((/<title>([^<]*)<\/title>/.exec(head) || [])[1] || "")
  const metas = [...head.matchAll(/<meta\b[^>]*>/g)].map((m) => m[0])
  const links = [...head.matchAll(/<link\b[^>]*>/g)].map((m) => m[0])
  const meta = (name) => {
    const tag = metas.find(
      (t) => attr(t, "name") === name || attr(t, "property") === name
    )
    return tag ? decode(attr(tag, "content") || "") : undefined
  }
  const canonical = attr(links.find((l) => attr(l, "rel") === "canonical") || "", "href")
  const hreflangs = links
    .filter((l) => attr(l, "rel") === "alternate" && attr(l, "hreflang"))
    .map((l) => attr(l, "hreflang"))
  const markdown = attr(
    links.find((l) => attr(l, "rel") === "alternate" && attr(l, "type") === "text/markdown") || "",
    "href"
  )
  const robots = meta("robots")
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => {
    try {
      return JSON.parse(m[1])
    } catch {
      return { "@type": "INVALID" }
    }
  })
  const ldTypes = ld.flatMap((s) => (s["@graph"] || [s]).map((n) => n["@type"]))
  const body = html.slice(html.indexOf("<body"))
  const text = body
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<svg[\s\S]*?<\/svg>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  const h1s = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((m) =>
    decode(m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim())
  )
  const hrefs = [...body.matchAll(/<a\b[^>]*href="([^"#?]*)[^"]*"/g)]
    .map((m) => m[1])
    .filter((h) => h.startsWith("/") && !h.startsWith("//"))
    .map((h) => (h.length > 1 && h.endsWith("/") ? h.slice(0, -1) : h))
  const inlineScript = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].reduce(
    (a, m) => a + m[1].length,
    0
  )
  const imgs = [...body.matchAll(/<img\b[^>]*>/g)].map((m) => m[0])
  const imgsNoDims = imgs.filter((t) => !attr(t, "width") || !attr(t, "height")).length
  const iframes = (body.match(/<iframe\b/g) || []).length
  const fontPreloads = links.filter((l) => attr(l, "as") === "font").length
  const scripts = (html.match(/<script\b[^>]*\bsrc=/g) || []).length
  const headings = [...body.matchAll(/<h([1-6])\b[^>]*>/g)].map((m) => Number(m[1]))
  pages.push({
    route,
    file: path.relative(root, file),
    bytes: html.length,
    textChars: text.length,
    title,
    description: meta("description"),
    canonical,
    hreflangs,
    markdown,
    robots,
    ogImage: meta("og:image"),
    ogTitle: meta("og:title"),
    ogLocale: meta("og:locale"),
    ldTypes,
    h1s,
    hrefs: [...new Set(hrefs)],
    inlineScript,
    imgs: imgs.length,
    imgsNoDims,
    iframes,
    fontPreloads,
    scripts,
    headings,
    lang: (/<html[^>]*\blang="([^"]*)"/.exec(html) || [])[1],
  })
}

const byRoute = new Map(pages.map((p) => [p.route, p]))
const depth = new Map([["/", 0]])
const queue = ["/"]
while (queue.length) {
  const route = queue.shift()
  const page = byRoute.get(route)
  if (!page) continue
  for (const href of page.hrefs) {
    if (!byRoute.has(href) || depth.has(href)) continue
    depth.set(href, depth.get(route) + 1)
    queue.push(href)
  }
}
for (const p of pages) p.depth = depth.has(p.route) ? depth.get(p.route) : null

fs.writeFileSync(outFile, JSON.stringify(pages, null, 1))
console.log(`crawled ${pages.length} pages`)

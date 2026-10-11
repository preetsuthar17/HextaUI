type OutEntry = { name: string; directory: boolean; children?: OutEntry[] }

type FunctionRoutes = { files: string[]; directories: string[] }

const pagesConfigFiles = new Set([
  "_headers",
  "_redirects",
  "_routes.json",
  "_worker.js",
])
const maxRules = 100

function excludeEntries(
  entries: OutEntry[],
  prefix: string,
  functions: FunctionRoutes,
  exclude: Set<string>
) {
  for (const { name, directory, children } of entries) {
    if (name.startsWith(".") && name !== ".well-known") continue
    if (pagesConfigFiles.has(name)) continue
    const route = `${prefix}/${name}`

    if (directory) {
      if (functions.directories.includes(route)) continue
      if (functions.files.includes(route)) {
        excludeEntries(children ?? [], route, functions, exclude)
        continue
      }
      exclude.add(`${route}/*`)
      continue
    }
    if (route === "/index.html") continue
    exclude.add(route)
    if (name.endsWith(".html")) exclude.add(route.slice(0, -5))
  }
}

function isExcluded(route: string, exclude: Set<string>) {
  if (exclude.has(route)) return true
  return [...exclude].some(
    (rule) =>
      rule.endsWith("/*") &&
      (route === rule.slice(0, -2) || route.startsWith(rule.slice(0, -1)))
  )
}

function servedByFunctions(route: string, functions: FunctionRoutes) {
  return (
    functions.files.includes(route) ||
    functions.directories.some(
      (directory) => route === directory || route.startsWith(`${directory}/`)
    )
  )
}

function getRedirectSources(redirects: string) {
  return redirects
    .split("\n")
    .map((line) => line.trim().split(/\s+/)[0])
    .filter(
      (source): source is string =>
        Boolean(source) &&
        source.startsWith("/") &&
        !source.includes(":") &&
        !source.includes("*")
    )
}

function getPagesRoutes(
  entries: OutEntry[],
  functions: FunctionRoutes,
  redirectSources: string[] = []
) {
  const exclude = new Set<string>()
  excludeEntries(entries, "", functions, exclude)
  for (const file of functions.files) exclude.delete(file)
  for (const source of redirectSources) {
    if (source === "/" || servedByFunctions(source, functions)) continue
    if (!isExcluded(source, exclude)) exclude.add(source)
  }

  for (const rule of [...exclude]) {
    if (rule.endsWith("/*")) exclude.delete(rule.slice(0, -2))
  }

  const routes = {
    version: 1,
    description:
      "Functions run for /, /api/*, /mcp, /r/* and unknown paths. Static pages, assets and redirects never invoke them.",
    include: ["/*"],
    exclude: [...exclude].sort(),
  }

  const rules = routes.include.length + routes.exclude.length
  if (rules > maxRules) {
    throw new Error(
      `_routes.json has ${rules} rules; Cloudflare Pages allows ${maxRules}.`
    )
  }
  const long = routes.exclude.find((rule) => rule.length > 100)
  if (long) {
    throw new Error(`_routes.json rule is over 100 characters: ${long}`)
  }

  return routes
}

export {
  getPagesRoutes,
  getRedirectSources,
  type FunctionRoutes,
  type OutEntry,
}

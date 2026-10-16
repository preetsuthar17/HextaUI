import fs from "node:fs"
import path from "node:path"

import { getComponentFacts } from "../lib/component-facts.ts"

const root = path.resolve(import.meta.dirname, "..")
const style = "base-vega"
const base = `https://ui.shadcn.com/r/styles/${style}`
const output = path.join(root, "lib/shadcn-snapshot.json")

type RegistryItem = {
  name: string
  type: string
  dependencies?: string[]
  registryDependencies?: string[]
  files?: { content?: string }[]
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${url}: ${response.status}`)
  return (await response.json()) as T
}

const local = JSON.parse(
  fs.readFileSync(path.join(root, "registry.json"), "utf8")
) as { items: RegistryItem[] }
const localUi = new Set(
  local.items
    .filter((item) => item.type === "registry:ui")
    .map((item) => item.name)
)

const index = await fetchJson<RegistryItem[]>(
  "https://ui.shadcn.com/r/index.json"
)
const shared = index
  .filter((item) => item.type === "registry:ui" && localUi.has(item.name))
  .map((item) => item.name)
  .sort()

const components: Record<string, ReturnType<typeof getComponentFacts>> = {}
for (const name of shared) {
  const item = await fetchJson<RegistryItem>(`${base}/${name}.json`)
  const source = (item.files ?? []).map((file) => file.content ?? "").join("\n")
  components[name] = getComponentFacts(source, item)
}

fs.writeFileSync(
  output,
  `${JSON.stringify(
    {
      source: base,
      style,
      fetched: new Date().toISOString().slice(0, 10),
      components,
    },
    null,
    2
  )}\n`
)

console.log(
  `shadcn: ${shared.length} shared components written to ${path.relative(root, output)}`
)

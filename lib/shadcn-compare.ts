import fs from "node:fs"
import path from "node:path"

import registry from "@/registry.json"
import snapshot from "@/lib/shadcn-snapshot.json"
import { getComponentFacts, type ComponentFacts } from "@/lib/component-facts"
import { docsComponents, getDocsComponent } from "@/lib/docs"

type ShadcnComparison = {
  slug: string
  name: string
  hexta: ComponentFacts
  shadcn: ComponentFacts
  sharedParts: string[]
  hextaParts: string[]
  shadcnParts: string[]
  variants: {
    part: string
    group: string
    shared: string[]
    hexta: string[]
    shadcn: string[]
  }[]
  addedProps: { part: string; name: string }[]
}

type RegistryItem = {
  name: string
  type: string
  dependencies?: string[]
  registryDependencies?: string[]
}

const domProps = new Set([
  "id",
  "title",
  "type",
  "role",
  "name",
  "form",
  "lang",
  "hidden",
  "href",
  "target",
  "rel",
  "src",
  "alt",
  "width",
  "height",
  "min",
  "max",
  "step",
  "value",
  "defaultValue",
  "checked",
  "defaultChecked",
  "disabled",
  "required",
  "readOnly",
  "placeholder",
  "autoFocus",
  "autoComplete",
  "maxLength",
  "minLength",
  "pattern",
  "multiple",
  "accept",
  "rows",
  "cols",
  "tabIndex",
  "htmlFor",
  "dir",
  "key",
  "open",
  "defaultOpen",
])

const minimumDifferences = 3

const snapshotComponents = snapshot.components as Record<string, ComponentFacts>

const registryItems = (registry.items as RegistryItem[]).filter(
  (item) => item.type === "registry:ui"
)

function packageName(dependency: string) {
  const at = dependency.lastIndexOf("@")
  return at > 0 ? dependency.slice(0, at) : dependency
}

function declarationFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.name === "node_modules") return []
    if (entry.isDirectory()) return declarationFiles(full)
    return entry.name.endsWith(".d.ts") ? [full] : []
  })
}

const packageNames = new Map<string, Set<string>>()

function namesFromPackage(name: string) {
  const hit = packageNames.get(name)
  if (hit) return hit
  const names = new Set<string>()
  const dir = path.join(process.cwd(), "node_modules", name)
  const resolved = fs.existsSync(dir) ? fs.realpathSync(dir) : dir
  for (const file of declarationFiles(resolved)) {
    const source = fs.readFileSync(file, "utf8")
    for (const match of source.matchAll(/(?:^|[\s;{,(])(\w+)\??\s*:/g)) {
      names.add(match[1])
    }
  }
  packageNames.set(name, names)
  return names
}

function isPassThrough(prop: string, dependencies: string[]) {
  if (domProps.has(prop) || /^on[A-Z]/.test(prop)) return true
  if (prop === "render" || prop === "asChild") return true
  return dependencies.some((dependency) =>
    namesFromPackage(packageName(dependency)).has(prop)
  )
}

function difference(a: string[], b: string[]) {
  return a.filter((item) => !b.includes(item))
}

function readHextaFacts(slug: string) {
  const item = registryItems.find((entry) => entry.name === slug)
  const file = path.join(process.cwd(), "components/ui", `${slug}.tsx`)
  if (!item || !fs.existsSync(file)) return null
  return getComponentFacts(fs.readFileSync(file, "utf8"), item)
}

function compare(slug: string): ShadcnComparison | null {
  const shadcn = snapshotComponents[slug]
  const hexta = readHextaFacts(slug)
  if (!shadcn || !hexta) return null

  const variantParts = [
    ...new Set([
      ...Object.keys(hexta.variants),
      ...Object.keys(shadcn.variants),
    ]),
  ]
  const variants = variantParts.flatMap((part) => {
    const ours = hexta.variants[part] ?? {}
    const theirs = shadcn.variants[part] ?? {}
    return [...new Set([...Object.keys(ours), ...Object.keys(theirs)])]
      .filter(
        (group) =>
          !(
            group in theirs &&
            !(group in ours) &&
            hexta.props[part]?.includes(group)
          ) &&
          !(
            group in ours &&
            !(group in theirs) &&
            shadcn.props[part]?.includes(group)
          ) &&
          ![...(ours[group] ?? []), ...(theirs[group] ?? [])].every((value) =>
            ["true", "false"].includes(value)
          )
      )
      .map((group) => {
        const a = ours[group] ?? []
        const b = theirs[group] ?? []
        return {
          part,
          group,
          shared: a.filter((value) => b.includes(value)),
          hexta: difference(a, b),
          shadcn: difference(b, a),
        }
      })
  })

  const addedProps = hexta.parts.flatMap((part) =>
    difference(hexta.props[part] ?? [], shadcn.props[part] ?? [])
      .filter(
        (prop) =>
          !isPassThrough(prop, hexta.dependencies) &&
          !Object.keys(hexta.variants[part] ?? {}).includes(prop)
      )
      .map((name) => ({ part, name }))
  )

  return {
    slug,
    name: getDocsComponent(slug).name,
    hexta,
    shadcn,
    sharedParts: hexta.parts.filter((part) => shadcn.parts.includes(part)),
    hextaParts: difference(hexta.parts, shadcn.parts),
    shadcnParts: difference(shadcn.parts, hexta.parts),
    variants,
    addedProps,
  }
}

function differenceCount(comparison: ShadcnComparison) {
  return (
    comparison.hextaParts.length +
    comparison.addedProps.length +
    comparison.variants.reduce((sum, group) => sum + group.hexta.length, 0)
  )
}

let cached: ShadcnComparison[] | null = null

function getShadcnComparisons() {
  cached ??= docsComponents
    .map((component) => compare(component.slug))
    .filter(
      (comparison): comparison is ShadcnComparison =>
        comparison !== null && differenceCount(comparison) >= minimumDifferences
    )
  return cached
}

function getShadcnComparison(slug: string) {
  return getShadcnComparisons().find((comparison) => comparison.slug === slug)
}

function getShadcnComparisonHref(slug: string) {
  return `/compare/shadcn-ui/${slug}`
}

const shadcnSnapshot = {
  source: snapshot.source,
  style: snapshot.style,
  fetched: snapshot.fetched,
}

export {
  differenceCount,
  getShadcnComparison,
  getShadcnComparisonHref,
  getShadcnComparisons,
  shadcnSnapshot,
  type ShadcnComparison,
}

type ComponentFacts = {
  parts: string[]
  variants: Record<string, Record<string, string[]>>
  props: Record<string, string[]>
  dependencies: string[]
  registryDependencies: string[]
  lines: number
}

const passThrough = new Set(["className", "children", "style", "ref"])

function skipQuoted(source: string, start: number) {
  const quote = source[start]
  let index = start + 1
  while (index < source.length && source[index] !== quote) {
    if (source[index] === "\\") index += 1
    index += 1
  }
  return index + 1
}

function matching(source: string, start: number) {
  const open = source[start]
  const close = open === "(" ? ")" : open === "[" ? "]" : "}"
  let depth = 0
  let index = start
  while (index < source.length) {
    const char = source[index]
    if (char === '"' || char === "'" || char === "`") {
      index = skipQuoted(source, index)
      continue
    }
    if (char === "/" && source[index + 1] === "/") {
      index = source.indexOf("\n", index)
      if (index === -1) return source.length
      continue
    }
    if (char === open) depth += 1
    if (char === close) {
      depth -= 1
      if (depth === 0) return index
    }
    index += 1
  }
  return source.length
}

function splitTopLevel(source: string) {
  const items: string[] = []
  let depth = 0
  let current = ""
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index]
    if (char === '"' || char === "'" || char === "`") {
      const end = skipQuoted(source, index)
      current += source.slice(index, end)
      index = end - 1
      continue
    }
    if (char === ">" && source[index - 1] === "=") {
      current += char
      continue
    }
    if ("([{<".includes(char)) depth += 1
    if (")]}>".includes(char)) depth -= 1
    if (char === "," && depth === 0) {
      items.push(current.trim())
      current = ""
      continue
    }
    current += char
  }
  if (current.trim()) items.push(current.trim())
  return items
}

function exportedNames(source: string) {
  const names = new Set<string>()
  for (const match of source.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const item of match[1].split(",")) {
      const name = item
        .trim()
        .replace(/^type\s+/, "")
        .split(/\s+as\s+/)
        .pop()
      if (name && !item.trim().startsWith("type ")) names.add(name.trim())
    }
  }
  for (const match of source.matchAll(
    /export\s+(?:async\s+)?function\s+(\w+)/g
  )) {
    names.add(match[1])
  }
  return names
}

function functionProps(source: string) {
  const props: Record<string, string[]> = {}
  for (const match of source.matchAll(
    /(?:^|\n)(?:export\s+)?function\s+([A-Z]\w*)\s*(?:<[^(]*>)?\s*\(/g
  )) {
    const name = match[1]
    const start = (match.index ?? 0) + match[0].length - 1
    const params = source.slice(start + 1, matching(source, start)).trim()
    if (!params.startsWith("{")) {
      props[name] = []
      continue
    }
    const inner = params.slice(1, matching(params, 0))
    props[name] = splitTopLevel(inner)
      .filter((item) => item && !item.startsWith("..."))
      .map((item) => item.split(/[:=]/)[0].trim())
      .filter((item) => /^\w+$/.test(item) && !passThrough.has(item))
  }
  return props
}

function objectKeys(body: string) {
  return splitTopLevel(body)
    .map((item) => /^["']?([\w-]+)["']?\s*:/.exec(item)?.[1])
    .filter((key): key is string => Boolean(key))
}

function cvaVariants(source: string) {
  const variants: Record<string, Record<string, string[]>> = {}
  for (const match of source.matchAll(/const\s+(\w+)Variants\s*=\s*cva\(/g)) {
    const base = match[1]
    const part = `${base.charAt(0).toUpperCase()}${base.slice(1)}`
    const start = (match.index ?? 0) + match[0].length - 1
    const call = source.slice(start, matching(source, start) + 1)
    const at = call.search(/\bvariants\s*:\s*\{/)
    if (at === -1) continue
    const open = call.indexOf("{", at)
    const body = call.slice(open + 1, matching(call, open))
    const groups: Record<string, string[]> = {}
    for (const item of splitTopLevel(body)) {
      const key = /^["']?([\w-]+)["']?\s*:\s*\{/.exec(item)?.[1]
      if (!key) continue
      const inner = item.slice(item.indexOf("{"))
      groups[key] = objectKeys(inner.slice(1, matching(inner, 0)))
    }
    variants[part] = groups
  }
  return variants
}

function getComponentFacts(
  source: string,
  registry: { dependencies?: string[]; registryDependencies?: string[] }
): ComponentFacts {
  const exported = exportedNames(source)
  const props = functionProps(source)
  const parts = Object.keys(props).filter((name) => exported.has(name))

  return {
    parts,
    variants: cvaVariants(source),
    props: Object.fromEntries(parts.map((part) => [part, props[part] ?? []])),
    dependencies: [...(registry.dependencies ?? [])].sort(),
    registryDependencies: (registry.registryDependencies ?? [])
      .map((item) => /([a-z0-9-]+)(?:\.json)?$/.exec(item)?.[1] ?? item)
      .sort(),
    lines: source.trimEnd().split("\n").length,
  }
}

export { getComponentFacts, type ComponentFacts }

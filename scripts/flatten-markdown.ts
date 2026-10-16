import fs from "node:fs"
import path from "node:path"

const root = path.resolve(import.meta.dirname, "..")
const outDir = path.join(root, "out")

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return entry.name === "index.md" ? [full] : []
  })
}

let count = 0

for (const file of walk(path.join(outDir, "docs"))) {
  const target = `${path.dirname(file)}.md`
  fs.renameSync(file, target)
  count += 1
}

console.log(`markdown: moved ${count} index.md files next to their pages`)

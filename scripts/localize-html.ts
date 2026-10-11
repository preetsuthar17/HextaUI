import fs from "node:fs"
import path from "node:path"

import { translatedLocales } from "../lib/i18n/config.ts"

const root = path.resolve(import.meta.dirname, "..")
const outDir = path.join(root, "out")

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return entry.name.endsWith(".html") ? [full] : []
  })
}

let count = 0

for (const locale of translatedLocales) {
  const files = [
    path.join(outDir, `${locale}.html`),
    ...walk(path.join(outDir, locale)),
  ].filter((file) => fs.existsSync(file))

  for (const file of files) {
    const html = fs.readFileSync(file, "utf8")
    const localized = html.replace(/<html lang="en"/, `<html lang="${locale}"`)
    if (localized === html) {
      console.error(`lang: no <html lang="en"> in ${path.relative(root, file)}`)
      process.exit(1)
    }
    fs.writeFileSync(file, localized)
    count += 1
  }
}

console.log(`lang: set the html lang on ${count} translated pages`)

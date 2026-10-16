import { componentCategories } from "@/lib/component-categories"
import { docsComponents, docsEntries, docsHooks, titleCase } from "@/lib/docs"
import type { OgImage } from "@/lib/opengraph-image"
import { getShadcnComparisons } from "@/lib/shadcn-compare"

type OgPage = { group: string; slug: string; image: OgImage }

function plural(count: number, word: string) {
  return `${count} ${word}${count === 1 ? "" : "s"}`
}

function getOgPages(): OgPage[] {
  const docs = docsEntries.map((entry) => ({
    group: "docs",
    slug: entry.slug,
    image: {
      eyebrow: docsComponents.includes(entry)
        ? "Component"
        : docsHooks.includes(entry)
          ? "Hook"
          : "Utility",
      title: docsComponents.includes(entry)
        ? titleCase(entry.name)
        : entry.name,
      subtitle: entry.description,
    },
  }))

  const compare = getShadcnComparisons().map((comparison) => {
    const values = comparison.variants.reduce(
      (sum, row) => sum + row.hexta.length,
      0
    )
    const facts = [
      comparison.hextaParts.length > 0
        ? plural(comparison.hextaParts.length, "extra part")
        : null,
      comparison.addedProps.length > 0
        ? plural(comparison.addedProps.length, "extra prop")
        : null,
      values > 0 ? plural(values, "extra variant value") : null,
    ].filter(Boolean)
    return {
      group: "compare",
      slug: comparison.slug,
      image: {
        eyebrow: "HextaUI vs shadcn/ui",
        title: titleCase(comparison.name),
        subtitle: `${facts.join(", ")} in the HextaUI version, read from both sources.`,
      },
    }
  })

  const categories = componentCategories.map((category) => ({
    group: "components",
    slug: category.slug,
    image: {
      eyebrow: "Components",
      title: category.name,
      subtitle: category.description,
    },
  }))

  return [...docs, ...compare, ...categories]
}

export { getOgPages, type OgPage }

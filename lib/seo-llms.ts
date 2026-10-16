import {
  componentCategories,
  getComponentCategoryHref,
} from "@/lib/component-categories"
import { docsEntries, getDocsExampleHref } from "@/lib/docs"
import { getAllDocsExamples } from "@/lib/docs-examples"
import {
  getShadcnComparisonHref,
  getShadcnComparisons,
} from "@/lib/shadcn-compare"
import { absoluteUrl } from "@/lib/site"

async function getExamplesLlms() {
  const examples = await getAllDocsExamples()
  const lines = docsEntries.flatMap((entry) => {
    const items = examples.filter((example) => example.slug === entry.slug)
    if (items.length === 0) return []
    const links = items
      .map(
        (example) =>
          `[${example.title}](${absoluteUrl(`${getDocsExampleHref(example.file)}.md`)})`
      )
      .join(", ")
    return [`- ${entry.name}: ${links}`]
  })

  return [
    "## Examples",
    "Every titled example has its own page with the live demo, its source, the props it sets and an install command for the example itself. Append `.md` for Markdown.",
    lines.join("\n"),
  ].join("\n\n")
}

function getSeoLlms() {
  return [
    "## Browse and compare",
    [
      ...componentCategories.map(
        (category) =>
          `- [${category.name}](${absoluteUrl(getComponentCategoryHref(category.slug))}): ${category.description}`
      ),
      `- [Comparisons](${absoluteUrl("/compare")}): HextaUI next to shadcn/ui, AI Elements, assistant-ui and prompt-kit.`,
      `- Component by component against shadcn/ui: ${getShadcnComparisons()
        .map(
          (comparison) =>
            `[${comparison.name}](${absoluteUrl(getShadcnComparisonHref(comparison.slug))})`
        )
        .join(", ")}`,
      `- Example pages for every component are listed under Examples in ${absoluteUrl("/docs/llms.txt")}.`,
    ].join("\n"),
  ].join("\n\n")
}

export { getExamplesLlms, getSeoLlms }

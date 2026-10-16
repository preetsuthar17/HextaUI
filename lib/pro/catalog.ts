import type { DocsNavSection } from "@/lib/docs"
import catalog from "@/lib/pro/generated/catalog.json"

type ProBlock = {
  name: string
  title: string
  description: string
  category: string
  layout?: "app"
  free?: boolean
  files: string[]
  components?: string[]
  usage: { title: string; description: string; code: string }[]
  docs: ProBlockDocs
}

type ProBlockDocs = {
  overview?: string[]
  anatomy?: { name: string; description: string }[]
  api?: {
    component: string
    description?: string
    props: {
      name: string
      type: string
      default?: string
      description?: string
    }[]
  }[]
  keyboard?: { keys: string[]; description: string }[]
  accessibility?: string[]
}

const categoryTitles: Record<string, string> = {
  ai: "AI",
  authentication: "Authentication",
  marketing: "Marketing",
  application: "Application",
  settings: "Settings",
}

const proBlocks = catalog as ProBlock[]

function getProBlock(name: string) {
  return proBlocks.find((block) => block.name === name)
}

function proBlockParams() {
  return proBlocks.length > 0
    ? proBlocks.map((block) => ({ name: block.name }))
    : [{ name: "none" }]
}

function categoryTitle(category: string) {
  return (
    categoryTitles[category] ??
    category.charAt(0).toUpperCase() + category.slice(1)
  )
}

const blockSections = Object.entries(
  Object.groupBy(proBlocks, (block) => block.category)
).map(([category, blocks]) => ({
  category,
  title: categoryTitle(category),
  blocks: blocks ?? [],
}))

const blocksNav: DocsNavSection[] = blockSections.map((section) => ({
  title: section.title,
  items: section.blocks.map((block) => ({
    title: block.title,
    href: `/blocks/${block.name}`,
  })),
}))

const blocksNavItems = blocksNav.flatMap((section) => section.items)

export {
  blockSections,
  blocksNav,
  blocksNavItems,
  getProBlock,
  proBlockParams,
  proBlocks,
  type ProBlock,
}

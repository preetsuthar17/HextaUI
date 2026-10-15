import { docsNav } from "@/lib/docs"
import { isLocalizedPath } from "@/lib/i18n/config"

const localizedDocsSlugs = docsNav
  .flatMap((section) => section.items)
  .map((item) => item.href)
  .filter((href) => href.startsWith("/docs/") && isLocalizedPath(href))
  .map((href) => href.slice("/docs/".length))

const comparePages = [
  "ai-elements",
  "assistant-ui",
  "prompt-kit",
  "shadcn-ai-chat-templates",
  "shadcn-ui",
]

export { comparePages, localizedDocsSlugs }

import type { Metadata } from "next"

import { JsonLd } from "@/components/site/json-ld"
import Link from "@/components/site/link"

import { DocsCodeBlock } from "@/components/docs/docs-code-block"
import { DocsCommand } from "@/components/docs/docs-command"
import {
  DocsCode,
  DocsHeading,
  DocsList,
  DocsParagraph,
} from "@/components/docs/docs-content"
import { DocsPage } from "@/components/docs/docs-page"
import {
  docsComponents,
  docsHooks,
  docsUtilities,
  type DocsTocItem,
} from "@/lib/docs"
import { getRegistryItemUrl } from "@/lib/docs-registry"
import { pageMetadata } from "@/lib/metadata"
import { pageJsonLd } from "@/lib/structured-data"
import { siteDescription, siteRepository } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "React components for shadcn/ui, built on Base UI",
  description: `${docsComponents.length} components, ${docsHooks.length} hooks and ${docsUtilities.length} utilities for shadcn/ui, built on Base UI and Tailwind CSS v4. Add them with the shadcn CLI and own the code.`,
  path: "/docs",
  markdown: "/docs.md",
})

const toc: DocsTocItem[] = [
  { id: "what-is-hextaui", title: "What is HextaUI" },
  { id: "quick-start", title: "Quick start" },
  { id: "what-you-get", title: "What you get" },
  { id: "motion", title: "Motion", depth: 3 },
  {
    id: "keyboard-and-screen-readers",
    title: "Keyboard and screen readers",
    depth: 3,
  },
  { id: "touch-and-small-screens", title: "Touch and small screens", depth: 3 },
  { id: "high-contrast", title: "High contrast", depth: 3 },
  { id: "built-on", title: "Built on" },
  { id: "ai-assistants", title: "AI assistants" },
  { id: "license", title: "License" },
]

const usageCode = `import { Button } from "@/components/ui/button"

export function SaveButton() {
  return (
    <Button feedback onClick={() => saveSettings()}>
      Save changes
    </Button>
  )
}`

const linkClassName =
  "text-foreground underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground"

export default function Page() {
  return (
    <DocsPage
      href="/docs"
      title="Introduction"
      description={siteDescription}
      markdownHref="/docs.md"
      toc={toc}
    >
      <JsonLd
        data={pageJsonLd({
          path: "/docs",
          name: String(metadata.title),
          description: String(metadata.description),
          breadcrumbs: [{ name: "Docs", path: "/docs" }],
        })}
      />
      <DocsHeading id="what-is-hextaui">What is HextaUI</DocsHeading>
      <DocsParagraph>
        HextaUI is a collection of {docsComponents.length} components,{" "}
        {docsHooks.length} hooks and {docsUtilities.length} utilities for React.
        You add them with the shadcn CLI, the source lands in your project, and
        from then on it&apos;s your code to read and change.
      </DocsParagraph>
      <DocsParagraph>
        Every component keeps the shadcn/ui API you already know. What&apos;s
        different is the work you would otherwise do yourself: the states, the
        edge cases and the small details that make an interface feel finished.
      </DocsParagraph>

      <DocsHeading id="quick-start">Quick start</DocsHeading>
      <DocsParagraph>
        In a project set up with shadcn/ui, add a component:
      </DocsParagraph>
      <DocsCommand
        className="mt-4"
        mode="dlx"
        packages={["shadcn@latest", "add", getRegistryItemUrl("button")]}
      />
      <DocsParagraph>
        Then import it from <DocsCode>@/components/ui</DocsCode>.
      </DocsParagraph>
      <DocsCodeBlock className="mt-4" code={usageCode} lang="tsx" />
      <DocsParagraph>
        Requirements, adding everything at once and the{" "}
        <DocsCode>@hextaui</DocsCode> namespace are covered in{" "}
        <Link href="/docs/installation" className={linkClassName}>
          Installation
        </Link>
        .
      </DocsParagraph>

      <DocsHeading id="what-you-get">What you get</DocsHeading>
      <DocsParagraph>
        These hold for every component, so you don&apos;t have to check each
        one.
      </DocsParagraph>

      <DocsHeading id="motion" level={3}>
        Motion
      </DocsHeading>
      <DocsParagraph>
        Animations use the theme&apos;s easing curves and can be interrupted and
        reversed mid-way. When reduced motion is on, movement turns into a
        simple fade.
      </DocsParagraph>

      <DocsHeading id="keyboard-and-screen-readers" level={3}>
        Keyboard and screen readers
      </DocsHeading>
      <DocsParagraph>
        Everything works with the keyboard alone, and focus goes where you
        expect when popups open and close. Changes are announced too: toasts,
        loading and saved states, selections and slide changes.
      </DocsParagraph>

      <DocsHeading id="touch-and-small-screens" level={3}>
        Touch and small screens
      </DocsHeading>
      <DocsParagraph>
        Tap targets grow on touch screens, text inputs stay at 16px so iOS
        doesn&apos;t zoom in, and popups stay on screen down to 320px wide.
        Layouts mirror for right-to-left languages.
      </DocsParagraph>

      <DocsHeading id="high-contrast" level={3}>
        High contrast
      </DocsHeading>
      <DocsParagraph>
        Focus rings, control edges and selected states stay visible in Windows
        high contrast mode, and the default theme meets WCAG AA contrast in
        light and dark.
      </DocsParagraph>

      <DocsHeading id="built-on">Built on</DocsHeading>
      <DocsList>
        <li>
          shadcn/ui with the <DocsCode>base-vega</DocsCode> style
        </li>
        <li>Base UI primitives for behavior and accessibility</li>
        <li>Tailwind CSS v4, with theme tokens for color, radius and easing</li>
        <li>Tabler icons</li>
      </DocsList>

      <DocsHeading id="ai-assistants">AI assistants</DocsHeading>
      <DocsParagraph>
        Every page has a Markdown version, and <DocsCode>/llms.txt</DocsCode>{" "}
        lists them all. Assistants that support MCP can connect to the{" "}
        <Link href="/docs/mcp" className={linkClassName}>
          HextaUI MCP server
        </Link>{" "}
        to search the docs, read component APIs and get install commands.
      </DocsParagraph>

      <DocsHeading id="license">License</DocsHeading>
      <DocsParagraph>
        HextaUI is open source under the{" "}
        <a
          href={`${siteRepository}/blob/main/LICENSE`}
          className={linkClassName}
        >
          MIT license
        </a>
        , free for personal and commercial projects.
      </DocsParagraph>
    </DocsPage>
  )
}

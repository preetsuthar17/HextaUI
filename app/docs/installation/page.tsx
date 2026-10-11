import type { Metadata } from "next"
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
import type { DocsTocItem } from "@/lib/docs"
import { pageMetadata } from "@/lib/metadata"
import { getRegistryItemUrl, getThemeCss } from "@/lib/docs-registry"
import { absoluteUrl, siteUrl } from "@/lib/site"

const description =
  "Add HextaUI to a React project with the shadcn CLI, or copy the files in by hand."

export const metadata: Metadata = pageMetadata({
  title: "Install HextaUI with the shadcn CLI",
  description,
  path: "/docs/installation",
  markdown: "/docs/installation.md",
})

const toc: DocsTocItem[] = [
  { id: "requirements", title: "Requirements" },
  { id: "add-components", title: "Add components" },
  { id: "namespace", title: "Namespace" },
  { id: "theme", title: "Theme" },
  { id: "ai-assistants", title: "AI assistants" },
]

const registryTemplate = `${siteUrl}/r/{name}.json`

const namespaceCode = `{
  "registries": {
    "@hextaui": "${registryTemplate}"
  }
}`

export default async function Page() {
  const themeCss = await getThemeCss()

  return (
    <DocsPage
      href="/docs/installation"
      title="Installation"
      description={description}
      markdownHref="/docs/installation.md"
      toc={toc}
    >
      <DocsHeading id="requirements">Requirements</DocsHeading>
      <DocsParagraph>
        A React 19 project with Tailwind CSS v4 and a{" "}
        <DocsCode>components.json</DocsCode>. If you don&apos;t have one yet,
        set it up with the shadcn CLI.
      </DocsParagraph>
      <DocsCommand
        className="mt-4"
        mode="dlx"
        packages={["shadcn@latest", "init"]}
      />

      <DocsHeading id="add-components">Add components</DocsHeading>
      <DocsParagraph>
        Pass a component&apos;s registry URL to the CLI. It copies the source
        into your project, installs its dependencies, adds the theme tokens and
        pulls in any HextaUI components it builds on.
      </DocsParagraph>
      <DocsCommand
        className="mt-4"
        mode="dlx"
        packages={["shadcn@latest", "add", getRegistryItemUrl("button")]}
      />
      <DocsParagraph>Add every component at once with:</DocsParagraph>
      <DocsCommand
        className="mt-4"
        mode="dlx"
        packages={["shadcn@latest", "add", getRegistryItemUrl("all")]}
      />
      <DocsParagraph>
        The files are yours from then on. Import them from{" "}
        <DocsCode>@/components/ui</DocsCode> and edit them like any other code.
      </DocsParagraph>

      <DocsHeading id="namespace">Namespace</DocsHeading>
      <DocsParagraph>
        Register HextaUI in <DocsCode>components.json</DocsCode> to add
        components by name.
      </DocsParagraph>
      <DocsCodeBlock
        className="mt-4"
        code={namespaceCode}
        lang="json"
        title="components.json"
      />
      <DocsCommand
        className="mt-4"
        mode="dlx"
        packages={["shadcn@latest", "add", "@hextaui/button"]}
      />

      <DocsHeading id="theme">Theme</DocsHeading>
      <DocsParagraph>
        Components use a few tokens on top of shadcn/ui: status colors, easing
        curves, a hairline border width and the keyframes they animate with. The
        CLI adds them for you. When copying files by hand, add this to your
        global CSS once.
      </DocsParagraph>
      <DocsCodeBlock
        className="mt-4"
        code={themeCss}
        lang="css"
        title="app/globals.css"
      />

      <DocsHeading id="ai-assistants">AI assistants</DocsHeading>
      <DocsParagraph>
        Every page is available as Markdown, so assistants get the full source,
        examples and API without scraping. Use the Copy page menu at the top of
        any page, or point your assistant at these files.
      </DocsParagraph>
      <DocsList>
        <li>
          <DocsCode>{absoluteUrl("/llms.txt")}</DocsCode> lists every page with
          a short description.
        </li>
        <li>
          <DocsCode>{absoluteUrl("/llms-full.txt")}</DocsCode> has every page in
          one file.
        </li>
        <li>
          Add <DocsCode>.md</DocsCode> to any docs URL for that page, like{" "}
          <DocsCode>{absoluteUrl("/docs/button.md")}</DocsCode>.
        </li>
      </DocsList>
      <DocsParagraph>
        For the best results, connect the{" "}
        <Link href="/docs/mcp">HextaUI MCP server</Link>. Assistants search the
        docs, read each API and get install commands without leaving your
        editor.
      </DocsParagraph>
      <DocsParagraph>
        With the namespace above, the shadcn MCP server lets assistants like
        Claude Code, Cursor and Codex browse and install HextaUI components
        directly.
      </DocsParagraph>
      <DocsCommand
        className="mt-4"
        mode="dlx"
        packages={["shadcn@latest", "mcp", "init", "--client", "claude"]}
      />
    </DocsPage>
  )
}

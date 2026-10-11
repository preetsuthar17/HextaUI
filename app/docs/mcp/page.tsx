import type { Metadata } from "next"
import Link from "@/components/site/link"

import { DocsCodeBlock } from "@/components/docs/docs-code-block"
import {
  DocsCode,
  DocsHeading,
  DocsList,
  DocsParagraph,
} from "@/components/docs/docs-content"
import { DocsPage } from "@/components/docs/docs-page"
import type { DocsTocItem } from "@/lib/docs"
import { pageMetadata } from "@/lib/metadata"
import { absoluteUrl } from "@/lib/site"

const description =
  "Connect Claude Code, Cursor, VS Code and other AI assistants to HextaUI, so they search the docs, read each API and install components for you."

export const metadata: Metadata = pageMetadata({
  title: "MCP server for Claude Code, Cursor and VS Code",
  description,
  path: "/docs/mcp",
  markdown: "/docs/mcp.md",
})

const toc: DocsTocItem[] = [
  { id: "setup", title: "Setup" },
  { id: "claude-code", title: "Claude Code", depth: 3 },
  { id: "cursor", title: "Cursor", depth: 3 },
  { id: "vs-code", title: "VS Code", depth: 3 },
  { id: "codex", title: "Codex", depth: 3 },
  { id: "windsurf", title: "Windsurf", depth: 3 },
  { id: "other-clients", title: "Other clients", depth: 3 },
  { id: "tools", title: "Tools" },
  { id: "try-it", title: "Try it" },
]

const serverUrl = absoluteUrl("/mcp")

const claudeCode = `claude mcp add --transport http hextaui ${serverUrl}`

const cursor = `{
  "mcpServers": {
    "hextaui": {
      "url": "${serverUrl}"
    }
  }
}`

const vsCode = `{
  "servers": {
    "hextaui": {
      "type": "http",
      "url": "${serverUrl}"
    }
  }
}`

const codex = `[mcp_servers.hextaui]
url = "${serverUrl}"`

const windsurf = `{
  "mcpServers": {
    "hextaui": {
      "serverUrl": "${serverUrl}"
    }
  }
}`

const stdio = `{
  "mcpServers": {
    "hextaui": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "${serverUrl}"]
    }
  }
}`

export default function Page() {
  return (
    <DocsPage
      href="/docs/mcp"
      title="MCP server"
      description={description}
      markdownHref="/docs/mcp.md"
      toc={toc}
    >
      <DocsParagraph>
        The HextaUI MCP server gives assistants the same docs you read here:
        what each component is for, its props and data attributes, keyboard
        support, working examples and the command that installs it. Assistants
        stop guessing at shadcn/ui props and use what HextaUI actually ships.
      </DocsParagraph>
      <DocsParagraph>
        It is a hosted, read-only server at <DocsCode>{serverUrl}</DocsCode>.
        There is nothing to install and no API key. It reads the docs of the
        version on this site, so it is always current.
      </DocsParagraph>

      <DocsHeading id="setup">Setup</DocsHeading>
      <DocsParagraph>
        Add the server to your assistant, then ask it to build something with
        HextaUI.
      </DocsParagraph>

      <DocsHeading id="claude-code" level={3}>
        Claude Code
      </DocsHeading>
      <DocsCodeBlock className="mt-4" code={claudeCode} lang="bash" />

      <DocsHeading id="cursor" level={3}>
        Cursor
      </DocsHeading>
      <DocsCodeBlock
        className="mt-4"
        code={cursor}
        lang="json"
        title=".cursor/mcp.json"
      />

      <DocsHeading id="vs-code" level={3}>
        VS Code
      </DocsHeading>
      <DocsCodeBlock
        className="mt-4"
        code={vsCode}
        lang="json"
        title=".vscode/mcp.json"
      />

      <DocsHeading id="codex" level={3}>
        Codex
      </DocsHeading>
      <DocsCodeBlock
        className="mt-4"
        code={codex}
        lang="toml"
        title="~/.codex/config.toml"
      />

      <DocsHeading id="windsurf" level={3}>
        Windsurf
      </DocsHeading>
      <DocsCodeBlock
        className="mt-4"
        code={windsurf}
        lang="json"
        title="~/.codeium/windsurf/mcp_config.json"
      />

      <DocsHeading id="other-clients" level={3}>
        Other clients
      </DocsHeading>
      <DocsParagraph>
        Any client that supports remote servers over Streamable HTTP can use the
        URL directly. For a client that only runs local servers, bridge it with{" "}
        <DocsCode>mcp-remote</DocsCode>.
      </DocsParagraph>
      <DocsCodeBlock className="mt-4" code={stdio} lang="json" />

      <DocsHeading id="tools">Tools</DocsHeading>
      <DocsParagraph>
        Every tool is read-only. Installing is left to your assistant, which
        runs the shadcn CLI command in your project like you would.
      </DocsParagraph>
      <DocsList>
        <li>
          <DocsCode>search_docs</DocsCode> finds components, examples, props and
          data attributes from plain language, like &ldquo;confirm before
          delete&rdquo; or a prop name.
        </li>
        <li>
          <DocsCode>list_components</DocsCode> lists every component, hook and
          utility by category.
        </li>
        <li>
          <DocsCode>get_component</DocsCode> returns a page&apos;s full docs:
          install command, usage, examples, keyboard, accessibility and API
          reference.
        </li>
        <li>
          <DocsCode>get_component_api</DocsCode> returns only the API reference
          and keyboard support.
        </li>
        <li>
          <DocsCode>get_examples</DocsCode> returns the code of any example on a
          page.
        </li>
        <li>
          <DocsCode>get_component_source</DocsCode> returns the source files the
          CLI would install.
        </li>
        <li>
          <DocsCode>get_install_command</DocsCode> builds one shadcn command for
          several components, for npm, pnpm, yarn or bun.
        </li>
        <li>
          <DocsCode>get_setup</DocsCode> returns the{" "}
          <Link href="/docs/installation">installation</Link> guide and the
          conventions generated code should follow.
        </li>
      </DocsList>
      <DocsParagraph>
        The server also exposes each page as a{" "}
        <DocsCode>hextaui://docs/&#123;slug&#125;</DocsCode> resource, and a{" "}
        <DocsCode>build-ui</DocsCode> prompt that walks an assistant from
        picking components to installing them.
      </DocsParagraph>

      <DocsHeading id="try-it">Try it</DocsHeading>
      <DocsList>
        <li>
          Build a settings page with HextaUI: profile form, notification
          switches and a danger zone.
        </li>
        <li>
          Which HextaUI component should I use for a list of files with
          checkboxes?
        </li>
        <li>
          Replace this modal with the HextaUI dialog and keep the form working.
        </li>
        <li>
          Add a chat view with HextaUI message bubbles that scrolls to new
          messages.
        </li>
      </DocsList>
      <DocsParagraph>
        Prefer the shadcn MCP server? Register the{" "}
        <Link href="/docs/installation#namespace">@hextaui namespace</Link> and
        it can browse and install HextaUI components and examples too.
      </DocsParagraph>
    </DocsPage>
  )
}

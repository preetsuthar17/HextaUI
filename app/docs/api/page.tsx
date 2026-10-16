import type { Metadata } from "next"

import { JsonLd } from "@/components/site/json-ld"
import Link from "@/components/site/link"

import { DocsCodeBlock } from "@/components/docs/docs-code-block"
import {
  DocsCode,
  DocsHeading,
  DocsList,
  DocsParagraph,
} from "@/components/docs/docs-content"
import { DocsPage } from "@/components/docs/docs-page"
import { apiErrors } from "@/lib/api-error"
import type { DocsTocItem } from "@/lib/docs"
import { pageMetadata } from "@/lib/metadata"
import { pageJsonLd } from "@/lib/structured-data"
import { absoluteUrl } from "@/lib/site"

const description =
  "The HextaUI HTTP API and OpenAPI spec: registry and docs endpoints, authentication with sessions and API tokens, Pro blocks and error responses."

export const metadata: Metadata = pageMetadata({
  title: "API",
  description,
  path: "/docs/api",
  markdown: "/docs/api.md",
})

const toc: DocsTocItem[] = [
  { id: "openapi", title: "OpenAPI spec" },
  { id: "public-endpoints", title: "Public endpoints" },
  { id: "authentication", title: "Authentication" },
  { id: "account-endpoints", title: "Account endpoints" },
  { id: "pro-endpoints", title: "Pro endpoints" },
  { id: "errors", title: "Errors" },
  { id: "sdk", title: "SDK and tools" },
]

const openApiUrl = absoluteUrl("/openapi.json")

const registryRequest = `curl ${absoluteUrl("/r/button.json")}`

const proComponentsJson = `{
  "registries": {
    "@hextaui-pro": {
      "url": "${absoluteUrl("/r/pro")}/{name}.json",
      "headers": {
        "Authorization": "Bearer \${HEXTAUI_PRO_TOKEN}"
      }
    }
  }
}`

const problemExample = `HTTP/2 401
Content-Type: application/problem+json

{
  "type": "${absoluteUrl("/docs/api")}#errors-unauthorized",
  "title": "Unauthorized",
  "status": 401,
  "code": "unauthorized",
  "detail": "HextaUI Pro items need a signed-in session or an API token.",
  "resolution": "Send Authorization: Bearer <token> with a token from ${absoluteUrl("/account")}, or sign in there.",
  "docs": "${absoluteUrl("/docs/api")}#errors",
  "error": "Unauthorized"
}`

export default function Page() {
  return (
    <DocsPage
      href="/docs/api"
      title="API"
      description={description}
      markdownHref="/docs/api.md"
      toc={toc}
    >
      <JsonLd
        data={pageJsonLd({
          path: "/docs/api",
          name: String(metadata.title),
          description: String(metadata.description),
          breadcrumbs: [
            { name: "Docs", path: "/docs" },
            { name: "API", path: "/docs/api" },
          ],
        })}
      />
      <DocsParagraph>
        Everything on HextaUI is also available over HTTP. The registry and docs
        are static JSON and Markdown files that need no key. Account and Pro
        endpoints use your sign-in session or an API token.
      </DocsParagraph>
      <DocsParagraph>
        Assistants that speak MCP can use the same data as tools through the{" "}
        <Link href="/docs/mcp">HextaUI MCP server</Link> instead.
      </DocsParagraph>

      <DocsHeading id="openapi">OpenAPI spec</DocsHeading>
      <DocsParagraph>
        The HextaUI API is described by an OpenAPI 3.1 document at{" "}
        <DocsCode>{openApiUrl}</DocsCode>. Every operation has an{" "}
        <DocsCode>operationId</DocsCode>, typed parameters and response schemas,
        so you can generate a client or hand it to an agent as function-calling
        tools.
      </DocsParagraph>

      <DocsHeading id="public-endpoints">Public endpoints</DocsHeading>
      <DocsList>
        <li>
          <DocsCode>GET /r/registry.json</DocsCode> lists every registry item.
        </li>
        <li>
          <DocsCode>GET /r/&#123;name&#125;.json</DocsCode> returns one item
          with the full source of each file.
        </li>
        <li>
          <DocsCode>GET /mcp/index.json</DocsCode> lists every component, hook,
          utility and guide with its category, description and examples.
        </li>
        <li>
          <DocsCode>GET /docs/&#123;slug&#125;.md</DocsCode> returns a docs page
          as Markdown. <DocsCode>/llms.txt</DocsCode> links to all of them.
        </li>
        <li>
          <DocsCode>POST /mcp</DocsCode> is the Streamable HTTP endpoint of the
          MCP server.
        </li>
      </DocsList>
      <DocsCodeBlock className="mt-4" code={registryRequest} lang="bash" />

      <DocsHeading id="authentication">Authentication</DocsHeading>
      <DocsParagraph>
        Sign in with GitHub or Google on the{" "}
        <Link href="/account">account page</Link>. The browser then holds a
        session cookie that the account endpoints read. Only pages on
        hextaui.com can call the endpoints that change something.
      </DocsParagraph>
      <DocsParagraph>
        Pro accounts can create API tokens on the same page. Send one as{" "}
        <DocsCode>Authorization: Bearer hxt_…</DocsCode> to install Pro blocks
        from the shadcn CLI or a script.
      </DocsParagraph>
      <DocsParagraph>
        The token rules are published as protected-resource metadata at{" "}
        <DocsCode>
          {absoluteUrl("/.well-known/oauth-protected-resource")}
        </DocsCode>
        . A 401 from a Pro endpoint links to it in its{" "}
        <DocsCode>WWW-Authenticate</DocsCode> header.
      </DocsParagraph>

      <DocsHeading id="account-endpoints">Account endpoints</DocsHeading>
      <DocsList>
        <li>
          <DocsCode>GET /api/account</DocsCode> returns whether the account has
          Pro, on which plan, and which providers are linked.
        </li>
        <li>
          <DocsCode>POST /api/checkout</DocsCode> starts a Solo, Team or
          Unlimited checkout and returns its URL.
        </li>
        <li>
          <DocsCode>GET /api/tokens</DocsCode> and{" "}
          <DocsCode>POST /api/tokens</DocsCode> list and create API tokens.
        </li>
        <li>
          <DocsCode>DELETE /api/tokens/&#123;id&#125;</DocsCode> deletes one.
        </li>
        <li>
          <DocsCode>GET /api/team</DocsCode> and{" "}
          <DocsCode>POST /api/team</DocsCode> list and add teammates on a Team
          plan, and <DocsCode>DELETE /api/team/&#123;id&#125;</DocsCode> removes
          one.
        </li>
        <li>
          <DocsCode>GET /api/auth/get-session</DocsCode> returns the current
          session, or <DocsCode>null</DocsCode>.
        </li>
      </DocsList>

      <DocsHeading id="pro-endpoints">Pro endpoints</DocsHeading>
      <DocsList>
        <li>
          <DocsCode>GET /r/pro/&#123;name&#125;.json</DocsCode> returns a Pro
          block as a shadcn registry item. Free blocks, like Prompt Input, need
          no token.
        </li>
        <li>
          <DocsCode>GET /api/pro/blocks/&#123;name&#125;</DocsCode> returns the
          source files of a Pro block.
        </li>
      </DocsList>
      <DocsCodeBlock
        className="mt-4"
        code={proComponentsJson}
        lang="json"
        title="components.json"
      />

      <DocsHeading id="errors">Errors</DocsHeading>
      <DocsParagraph>
        Errors use RFC 9457 problem details with the{" "}
        <DocsCode>application/problem+json</DocsCode> type. Each one has a
        stable <DocsCode>code</DocsCode>, a <DocsCode>detail</DocsCode> that
        says what went wrong and a <DocsCode>resolution</DocsCode> that says how
        to fix it.
      </DocsParagraph>
      <DocsList>
        {Object.entries(apiErrors).map(([code, error]) => (
          <li key={code} id={`errors-${code.replaceAll("_", "-")}`}>
            <DocsCode>{code}</DocsCode> ({error.status}): {error.title}.
          </li>
        ))}
      </DocsList>
      <DocsCodeBlock className="mt-4" code={problemExample} lang="http" />

      <DocsHeading id="sdk">SDK and tools</DocsHeading>
      <DocsParagraph>
        There is no separate SDK package. The shadcn CLI is the client for the
        registry, the MCP server is the client for assistants, and the OpenAPI
        spec generates a typed client in any language.
      </DocsParagraph>
    </DocsPage>
  )
}

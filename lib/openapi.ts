import { apiErrorDocs, apiErrors } from "@/lib/api-error"
import {
  siteAuthor,
  siteContactEmail,
  siteName,
  siteRepository,
  siteSummary,
  siteUrl,
} from "@/lib/site"
import { sponsorLimits } from "@/lib/sponsor"
import { subscribeLimits } from "@/lib/subscribe"

const json = "application/json"
const problem = "application/problem+json"
const markdown = "text/markdown"

const ref = (name: string) => ({ $ref: `#/components/schemas/${name}` })

const errorResponse = (description: string) => ({
  description,
  content: { [problem]: { schema: ref("Problem") } },
})

const errors = {
  "400": { $ref: "#/components/responses/BadRequest" },
  "401": { $ref: "#/components/responses/Unauthorized" },
  "403": { $ref: "#/components/responses/Forbidden" },
  "404": { $ref: "#/components/responses/NotFound" },
}

const pick = (...codes: (keyof typeof errors)[]) =>
  Object.fromEntries(codes.map((code) => [code, errors[code]]))

const nameParameter = (description: string, example: string) => ({
  name: "name",
  in: "path",
  required: true,
  description,
  schema: { type: "string", pattern: "^[a-z0-9-]+$", example },
})

const signedIn = [{ sessionCookie: [] }]
const proAccess = [{ bearerToken: [] }, { sessionCookie: [] }]

const functionPath = /^\/(api|r\/pro)(\/|$)/

function withDefaultErrors<T extends { paths: Record<string, object> }>(
  document: T
) {
  for (const [route, item] of Object.entries(document.paths)) {
    if (!functionPath.test(route)) continue
    for (const operation of Object.values(item) as {
      responses?: Record<string, unknown>
    }[]) {
      if (operation.responses) {
        operation.responses.default = { $ref: "#/components/responses/Error" }
      }
    }
  }
  return document
}

function getOpenApiDocument() {
  return withDefaultErrors({
    openapi: "3.1.0",
    info: {
      title: `${siteName} API`,
      version: "1.0.0",
      summary:
        "Registry, docs and Pro access for the HextaUI React component library.",
      description: `${siteSummary}\n\nThe public endpoints need no key: the shadcn registry, the docs catalog and the Markdown docs are static files you can fetch from anywhere. Account endpoints use the session cookie from signing in at ${siteUrl}/account. HextaUI Pro items accept either that cookie or an API token sent as \`Authorization: Bearer hxt_…\`.\n\nAgents that speak MCP can call the same data as tools through the hosted server at ${siteUrl}/mcp. Errors use RFC 9457 problem details with a stable \`code\`, a \`detail\` and a \`resolution\` hint.`,
      contact: {
        name: siteAuthor,
        url: `${siteUrl}/contact`,
        email: siteContactEmail,
      },
      license: { name: "MIT", identifier: "MIT" },
      termsOfService: `${siteUrl}/legal/terms`,
    },
    externalDocs: {
      description: "HextaUI API docs",
      url: `${siteUrl}/docs/api`,
    },
    servers: [{ url: siteUrl, description: "Production" }],
    tags: [
      {
        name: "Registry",
        description:
          "shadcn registry items for every component, hook, utility and example.",
      },
      {
        name: "Docs",
        description: "Machine-readable docs and the component catalog.",
      },
      { name: "MCP", description: "The hosted Model Context Protocol server." },
      {
        name: "Account",
        description: "The signed-in user, checkout and API tokens.",
      },
      {
        name: "Email",
        description: "Release emails for people without an account.",
      },
      {
        name: "Pro",
        description: "HextaUI Pro blocks, for accounts that bought Pro.",
      },
      {
        name: "Sponsor",
        description: "The sponsor card on every docs and blocks page.",
      },
      {
        name: "Auth",
        description: "Sign-in sessions, powered by Better Auth.",
      },
    ],
    paths: {
      "/r/registry.json": {
        get: {
          operationId: "getRegistryIndex",
          tags: ["Registry"],
          summary: "List every registry item",
          description:
            "Returns the shadcn registry index: every installable HextaUI component, hook, utility, theme and example with its name, type, description and dependencies.",
          security: [],
          responses: {
            "200": {
              description: "The registry index.",
              content: { [json]: { schema: ref("Registry") } },
            },
            "404": errors["404"],
          },
        },
      },
      "/r/{name}.json": {
        get: {
          operationId: "getRegistryItem",
          tags: ["Registry"],
          summary: "Get one registry item with its source",
          description:
            "Returns one shadcn registry item, including the full source of each file. Pass the URL to `npx shadcn@latest add` to install it, or read `files[].content` directly. Use `all` for every component.",
          security: [],
          parameters: [
            nameParameter(
              "Registry item name, such as `button`, `use-pagination` or the example `button-variants`.",
              "button"
            ),
          ],
          responses: {
            "200": {
              description: "The registry item.",
              content: { [json]: { schema: ref("RegistryItem") } },
            },
            "404": errors["404"],
          },
        },
      },
      "/mcp/index.json": {
        get: {
          operationId: "getCatalog",
          tags: ["Docs"],
          summary: "List components, hooks, utilities and guides",
          description:
            "Returns the docs catalog the MCP server uses: categories, guides, and every entry with its kind, category, description, search keywords and example names.",
          security: [],
          responses: {
            "200": {
              description: "The catalog.",
              content: { [json]: { schema: ref("Catalog") } },
            },
            "404": errors["404"],
          },
        },
      },
      "/docs/{slug}.md": {
        get: {
          operationId: "getDocsMarkdown",
          tags: ["Docs"],
          summary: "Get a docs page as Markdown",
          description:
            "Returns one docs page as Markdown: overview, installation, usage, examples, keyboard support and API reference. Slugs match `entries[].slug` and `guides[].slug` from getCatalog.",
          security: [],
          parameters: [
            {
              name: "slug",
              in: "path",
              required: true,
              description:
                "Docs page slug, such as `button`, `installation` or `mcp`.",
              schema: {
                type: "string",
                pattern: "^[a-z0-9-]+$",
                example: "button",
              },
            },
          ],
          responses: {
            "200": {
              description: "The page as Markdown.",
              content: { [markdown]: { schema: { type: "string" } } },
            },
            "404": {
              description: "No docs page has that slug.",
              content: { [markdown]: { schema: { type: "string" } } },
            },
          },
        },
      },
      "/llms.txt": {
        get: {
          operationId: "getLlmsIndex",
          tags: ["Docs"],
          summary: "Get the llms.txt index",
          description:
            "Returns the llms.txt index: what HextaUI is, when to use it, and a link to the Markdown of every docs page.",
          security: [],
          responses: {
            "200": {
              description: "The llms.txt file.",
              content: { "text/plain": { schema: { type: "string" } } },
            },
            "404": errors["404"],
          },
        },
      },
      "/mcp": {
        post: {
          operationId: "callMcpServer",
          tags: ["MCP"],
          summary: "Send a JSON-RPC message to the MCP server",
          description:
            "Streamable HTTP endpoint of the read-only HextaUI MCP server. Send MCP JSON-RPC messages such as `initialize`, `tools/list` and `tools/call`. Tools: search_docs, list_components, get_component, get_component_api, get_component_source, get_examples, get_install_command and get_setup. No key is needed.",
          security: [],
          parameters: [
            {
              name: "MCP-Protocol-Version",
              in: "header",
              required: false,
              description: "Negotiated MCP protocol version.",
              schema: { type: "string", example: "2025-11-25" },
            },
          ],
          requestBody: {
            required: true,
            content: { [json]: { schema: ref("JsonRpcMessage") } },
          },
          responses: {
            "200": {
              description:
                "A JSON-RPC response, as JSON or a server-sent event stream.",
              content: {
                [json]: { schema: ref("JsonRpcMessage") },
                "text/event-stream": { schema: { type: "string" } },
              },
            },
            "202": { description: "A notification or response was accepted." },
            "400": {
              description: "The request was not a valid MCP message.",
              content: { [json]: { schema: ref("JsonRpcMessage") } },
            },
          },
        },
      },
      "/api/account": {
        get: {
          operationId: "getAccount",
          tags: ["Account"],
          summary: "Get the signed-in account's Pro status",
          description:
            "Returns whether the signed-in user has HextaUI Pro, on which plan, whether they bought it or hold a seat on someone's Team plan, and which sign-in providers are linked. Pass `payment_id` after checkout to confirm a payment that has not arrived by webhook yet.",
          security: signedIn,
          parameters: [
            {
              name: "payment_id",
              in: "query",
              required: false,
              description:
                "Dodo Payments payment id returned from checkout, starting with `pay_`.",
              schema: { type: "string", pattern: "^pay_" },
            },
          ],
          responses: {
            "200": {
              description: "The account.",
              content: { [json]: { schema: ref("Account") } },
            },
            ...pick("401"),
          },
        },
        patch: {
          operationId: "updateAccount",
          tags: ["Account"],
          summary: "Turn release emails on or off",
          description:
            "Sets whether the signed-in user gets an email when new HextaUI components and blocks ship. Every account starts subscribed. Only accepted from pages on hextaui.com.",
          security: signedIn,
          requestBody: {
            required: true,
            content: {
              [json]: {
                schema: {
                  type: "object",
                  required: ["emailUpdates"],
                  properties: {
                    emailUpdates: {
                      type: "boolean",
                      description: "`false` stops release emails.",
                      example: false,
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "The saved choice.",
              content: {
                [json]: {
                  schema: {
                    type: "object",
                    required: ["emailUpdates"],
                    properties: { emailUpdates: { type: "boolean" } },
                  },
                },
              },
            },
            ...pick("400", "401", "403"),
          },
        },
      },
      "/api/checkout": {
        post: {
          operationId: "createCheckout",
          tags: ["Account"],
          summary: "Start a HextaUI Pro checkout",
          description:
            "Creates a Dodo Payments checkout for the Solo or Team plan and returns its URL. If the account already has that plan or a bigger one, returns `/account` instead. Only accepted from pages on hextaui.com.",
          security: signedIn,
          requestBody: {
            required: false,
            content: {
              [json]: {
                schema: {
                  type: "object",
                  properties: {
                    plan: {
                      type: "string",
                      enum: ["solo", "team", "unlimited"],
                      default: "solo",
                      description: "Which plan to buy.",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Where to send the user next.",
              content: { [json]: { schema: ref("CheckoutUrl") } },
            },
            ...pick("400", "401", "403"),
          },
        },
      },
      "/api/subscribe": {
        post: {
          operationId: "subscribeToReleases",
          tags: ["Email"],
          summary: "Subscribe an email address to release emails",
          description:
            "Adds an email address to the release list without creating an account. Subscribing an address again turns its emails back on. Every release email carries an unsubscribe link. Only accepted from pages on hextaui.com.",
          security: [],
          requestBody: {
            required: true,
            content: {
              [json]: {
                schema: {
                  type: "object",
                  required: ["email"],
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                      maxLength: subscribeLimits.email,
                      description: "Where release emails go.",
                    },
                    source: {
                      type: "string",
                      maxLength: subscribeLimits.source,
                      description: "Path of the page the form was on.",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "The address is subscribed.",
              content: { [json]: { schema: ref("Subscription") } },
            },
            ...pick("400", "403"),
          },
        },
      },
      "/api/sponsor": {
        post: {
          operationId: "createSponsorCheckout",
          tags: ["Sponsor"],
          summary: "Start a sponsor checkout",
          description:
            "Saves the sponsor card copy and creates a monthly Dodo Payments subscription checkout for the sponsor slot, returning its URL. No account is needed. The card goes live after a manual review. Only accepted from pages on hextaui.com.",
          security: [],
          requestBody: {
            required: true,
            content: {
              [json]: {
                schema: {
                  type: "object",
                  required: [
                    "name",
                    "headline",
                    "description",
                    "cta",
                    "url",
                    "email",
                  ],
                  properties: {
                    name: {
                      type: "string",
                      maxLength: sponsorLimits.name,
                      description: "Brand or product name.",
                    },
                    headline: {
                      type: "string",
                      maxLength: sponsorLimits.headline,
                      description: "Bold first line of the card.",
                    },
                    description: {
                      type: "string",
                      maxLength: sponsorLimits.description,
                      description: "Muted body text under the headline.",
                    },
                    cta: {
                      type: "string",
                      maxLength: sponsorLimits.cta,
                      description: "Button label.",
                    },
                    url: {
                      type: "string",
                      format: "uri",
                      pattern: "^https://",
                      maxLength: sponsorLimits.url,
                      description: "Where the button goes.",
                    },
                    email: {
                      type: "string",
                      format: "email",
                      maxLength: sponsorLimits.email,
                      description: "Billing and contact email.",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "The checkout to send the sponsor to.",
              content: { [json]: { schema: ref("CheckoutUrl") } },
            },
            "409": errorResponse("The sponsor slot is booked."),
            ...pick("400", "403"),
          },
        },
      },
      "/api/tokens": {
        get: {
          operationId: "listApiTokens",
          tags: ["Account"],
          summary: "List the account's API tokens",
          description:
            "Lists the API tokens of the signed-in account, newest first. Only a short hint of each token is returned.",
          security: signedIn,
          responses: {
            "200": {
              description: "The tokens.",
              content: { [json]: { schema: ref("TokenList") } },
            },
            ...pick("401"),
          },
        },
        post: {
          operationId: "createApiToken",
          tags: ["Account"],
          summary: "Create an API token",
          description:
            "Creates an API token for installing HextaUI Pro blocks from the shadcn CLI. The full token is returned once. Needs Pro, allows at most 10 tokens and is only accepted from pages on hextaui.com.",
          security: signedIn,
          requestBody: {
            required: false,
            content: {
              [json]: {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      maxLength: 60,
                      description: "Label for the token. Defaults to `CLI`.",
                      example: "Laptop",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "The new token, shown only this once.",
              content: { [json]: { schema: ref("NewToken") } },
            },
            ...pick("400", "401", "403"),
          },
        },
      },
      "/api/tokens/{id}": {
        delete: {
          operationId: "deleteApiToken",
          tags: ["Account"],
          summary: "Delete an API token",
          description:
            "Deletes one of the signed-in account's API tokens. Only accepted from pages on hextaui.com.",
          security: signedIn,
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Token id from listApiTokens.",
              schema: { type: "string" },
            },
          ],
          responses: {
            "204": { description: "The token was deleted." },
            ...pick("401", "403", "404"),
          },
        },
      },
      "/api/team": {
        get: {
          operationId: "listTeamMembers",
          tags: ["Account"],
          summary: "List the teammates on a Team plan",
          description:
            "Lists the teammates the signed-in Team owner has given a seat, oldest first, with the number of seats on the plan. The owner's own seat isn't listed.",
          security: signedIn,
          responses: {
            "200": {
              description: "The seats and teammates.",
              content: { [json]: { schema: ref("TeamMemberList") } },
            },
            ...pick("401", "403"),
          },
        },
        post: {
          operationId: "addTeamMember",
          tags: ["Account"],
          summary: "Give a teammate a seat",
          description:
            "Adds a teammate by email to the signed-in owner's Team plan. They get Pro as soon as they sign in with that verified email. A Team plan has 10 seats including the owner's; Unlimited has no seat limit. Only accepted from pages on hextaui.com.",
          security: signedIn,
          requestBody: {
            required: true,
            content: {
              [json]: {
                schema: {
                  type: "object",
                  required: ["email"],
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                      example: "teammate@example.com",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "The teammate's seat.",
              content: { [json]: { schema: ref("TeamMember") } },
            },
            ...pick("400", "401", "403"),
          },
        },
      },
      "/api/team/{id}": {
        delete: {
          operationId: "removeTeamMember",
          tags: ["Account"],
          summary: "Remove a teammate",
          description:
            "Takes a seat back from a teammate on the signed-in owner's Team plan. Their Pro access ends right away. Only accepted from pages on hextaui.com.",
          security: signedIn,
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Teammate id from listTeamMembers.",
              schema: { type: "string" },
            },
          ],
          responses: {
            "204": { description: "The teammate was removed." },
            ...pick("401", "403", "404"),
          },
        },
      },
      "/r/pro/{name}.json": {
        get: {
          operationId: "getProRegistryItem",
          tags: ["Pro"],
          summary: "Get a HextaUI Pro block as a registry item",
          description:
            'Returns a HextaUI Pro block as a shadcn registry item. Register `"@hextaui-pro": { "url": "https://hextaui.com/r/pro/{name}.json", "headers": { "Authorization": "Bearer ${HEXTAUI_PRO_TOKEN}" } }` in components.json to install it with the shadcn CLI.',
          security: proAccess,
          parameters: [
            nameParameter(
              "Pro block name, as listed on https://hextaui.com/blocks.",
              "prompt-input"
            ),
          ],
          responses: {
            "200": {
              description: "The registry item.",
              content: { [json]: { schema: ref("RegistryItem") } },
            },
            ...pick("401", "403", "404"),
          },
        },
      },
      "/api/pro/blocks/{name}": {
        get: {
          operationId: "getProBlockFiles",
          tags: ["Pro"],
          summary: "Get the source files of a HextaUI Pro block",
          description:
            "Returns every file of a HextaUI Pro block with its path, source code and highlighted HTML.",
          security: proAccess,
          parameters: [
            nameParameter(
              "Pro block name, as listed on https://hextaui.com/blocks.",
              "prompt-input"
            ),
          ],
          responses: {
            "200": {
              description: "The block's files.",
              content: { [json]: { schema: ref("ProBlockFiles") } },
            },
            ...pick("401", "403", "404"),
          },
        },
      },
      "/api/auth/get-session": {
        get: {
          operationId: "getSession",
          tags: ["Auth"],
          summary: "Get the current session",
          description:
            "Returns the signed-in user and session, or `null` when the request has no valid session cookie.",
          security: [{ sessionCookie: [] }, {}],
          responses: {
            "200": {
              description: "The session, or null.",
              content: {
                [json]: {
                  schema: { oneOf: [ref("Session"), { type: "null" }] },
                },
              },
            },
          },
        },
      },
      "/api/auth/sign-in/social": {
        post: {
          operationId: "signInSocial",
          tags: ["Auth"],
          summary: "Start signing in with GitHub or Google",
          description:
            "Starts an OAuth sign-in and returns the provider URL to open. The session cookie is set when the provider redirects back.",
          security: [],
          requestBody: {
            required: true,
            content: {
              [json]: {
                schema: {
                  type: "object",
                  required: ["provider"],
                  properties: {
                    provider: { type: "string", enum: ["github", "google"] },
                    callbackURL: {
                      type: "string",
                      description: "Path to return to after sign-in.",
                      example: "/account",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Where to send the user.",
              content: {
                [json]: {
                  schema: {
                    type: "object",
                    properties: {
                      url: { type: "string", format: "uri" },
                      redirect: { type: "boolean" },
                    },
                  },
                },
              },
            },
            ...pick("400"),
          },
        },
      },
      "/api/auth/sign-out": {
        post: {
          operationId: "signOut",
          tags: ["Auth"],
          summary: "Sign out",
          description:
            "Ends the current session and clears the session cookie.",
          security: signedIn,
          responses: {
            "200": {
              description: "Signed out.",
              content: {
                [json]: {
                  schema: {
                    type: "object",
                    properties: { success: { type: "boolean" } },
                  },
                },
              },
            },
            ...pick("401"),
          },
        },
      },
    },
    components: {
      securitySchemes: {
        sessionCookie: {
          type: "apiKey",
          in: "cookie",
          name: "__Secure-better-auth.session_token",
          description: `Session cookie set by signing in at ${siteUrl}/account.`,
        },
        bearerToken: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "hxt_…",
          description: `API token created on ${siteUrl}/account. Needs HextaUI Pro.`,
        },
      },
      responses: {
        BadRequest: errorResponse("The request was invalid."),
        Unauthorized: {
          ...errorResponse("No valid session or token was sent."),
          headers: {
            "WWW-Authenticate": {
              description:
                'On Pro endpoints: `Bearer resource_metadata="https://hextaui.com/.well-known/oauth-protected-resource"`.',
              schema: { type: "string" },
            },
          },
        },
        Error: errorResponse(
          "Any other error, as RFC 9457 problem details with a stable code and a resolution hint."
        ),
        Forbidden: errorResponse(
          "The request is not allowed: wrong origin, or the account does not own HextaUI Pro."
        ),
        NotFound: errorResponse("Nothing exists at this path."),
      },
      schemas: {
        Problem: {
          type: "object",
          description: `RFC 9457 problem details. See ${apiErrorDocs}.`,
          required: ["type", "title", "status", "code", "detail", "resolution"],
          properties: {
            type: { type: "string", format: "uri" },
            title: { type: "string" },
            status: { type: "integer" },
            code: { type: "string", enum: Object.keys(apiErrors) },
            detail: { type: "string", description: "What went wrong." },
            resolution: { type: "string", description: "How to fix it." },
            docs: { type: "string", format: "uri" },
            error: { type: "string", description: "Short message for people." },
            message: { type: "string" },
          },
        },
        RegistryItem: {
          type: "object",
          description:
            "A shadcn registry item. Full schema: https://ui.shadcn.com/schema/registry-item.json",
          required: ["name", "type"],
          properties: {
            name: { type: "string" },
            type: { type: "string", example: "registry:ui" },
            title: { type: "string" },
            description: { type: "string" },
            dependencies: { type: "array", items: { type: "string" } },
            registryDependencies: { type: "array", items: { type: "string" } },
            files: {
              type: "array",
              items: {
                type: "object",
                required: ["path", "type"],
                properties: {
                  path: { type: "string" },
                  type: { type: "string" },
                  target: { type: "string" },
                  content: { type: "string" },
                },
              },
            },
          },
          additionalProperties: true,
        },
        Registry: {
          type: "object",
          required: ["name", "items"],
          properties: {
            name: { type: "string", example: "hextaui" },
            homepage: { type: "string", format: "uri" },
            items: { type: "array", items: ref("RegistryItem") },
          },
        },
        CatalogEntry: {
          type: "object",
          required: ["slug", "title", "kind", "description"],
          properties: {
            slug: { type: "string" },
            title: { type: "string" },
            kind: { type: "string", enum: ["component", "hook", "utility"] },
            category: { type: "string" },
            description: { type: "string" },
            keywords: { type: "array", items: { type: "string" } },
            installable: { type: "boolean" },
            examples: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  title: { type: "string" },
                },
              },
            },
          },
        },
        Catalog: {
          type: "object",
          required: ["categories", "guides", "entries"],
          properties: {
            categories: { type: "array", items: { type: "string" } },
            guides: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  slug: { type: "string" },
                  title: { type: "string" },
                  description: { type: "string" },
                },
              },
            },
            entries: { type: "array", items: ref("CatalogEntry") },
          },
        },
        JsonRpcMessage: {
          type: "object",
          required: ["jsonrpc"],
          properties: {
            jsonrpc: { const: "2.0" },
            id: { type: ["string", "integer"] },
            method: { type: "string", example: "tools/list" },
            params: { type: "object", additionalProperties: true },
            result: { type: "object", additionalProperties: true },
            error: { type: "object", additionalProperties: true },
          },
        },
        Account: {
          type: "object",
          required: [
            "pro",
            "plan",
            "via",
            "teamOwner",
            "purchasedAt",
            "providers",
            "emailUpdates",
          ],
          properties: {
            pro: { type: "boolean" },
            plan: { type: ["string", "null"], enum: ["solo", "team", "unlimited", null] },
            via: {
              type: ["string", "null"],
              enum: ["owner", "member", null],
              description:
                "`owner` if this account bought the plan, `member` if it holds a seat on someone's Team plan.",
            },
            teamOwner: {
              type: ["string", "null"],
              description: "Name of the Team owner when `via` is `member`.",
            },
            purchasedAt: { type: ["string", "null"], format: "date-time" },
            providers: {
              type: "array",
              items: { type: "string", enum: ["github", "google"] },
            },
            emailUpdates: {
              type: "boolean",
              description: "Whether the account gets release emails.",
            },
          },
        },
        CheckoutUrl: {
          type: "object",
          required: ["url"],
          properties: { url: { type: "string" } },
        },
        Subscription: {
          type: "object",
          required: ["subscribed"],
          properties: { subscribed: { type: "boolean" } },
        },
        Token: {
          type: "object",
          required: ["id", "name", "hint"],
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            hint: {
              type: "string",
              description: "Last characters of the token.",
            },
            createdAt: { type: "string", format: "date-time" },
            lastUsedAt: { type: ["string", "null"], format: "date-time" },
          },
        },
        TeamMember: {
          type: "object",
          required: ["id", "email", "createdAt"],
          properties: {
            id: { type: "string" },
            email: { type: "string", format: "email" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        TeamMemberList: {
          type: "object",
          required: ["seats", "members"],
          properties: {
            seats: {
              type: ["integer", "null"],
              example: 10,
              description: "Seats on the plan, including the owner's. Null on Unlimited.",
            },
            members: { type: "array", items: ref("TeamMember") },
          },
        },
        TokenList: {
          type: "object",
          required: ["tokens"],
          properties: { tokens: { type: "array", items: ref("Token") } },
        },
        NewToken: {
          type: "object",
          required: ["token", "id", "name", "hint"],
          properties: {
            token: {
              type: "string",
              description:
                "The full token. Store it now; it is not shown again.",
            },
            id: { type: "string" },
            name: { type: "string" },
            hint: { type: "string" },
          },
        },
        ProBlockFiles: {
          type: "object",
          required: ["files"],
          properties: {
            files: {
              type: "array",
              items: {
                type: "object",
                required: ["path", "code", "html"],
                properties: {
                  path: { type: "string" },
                  code: { type: "string" },
                  html: {
                    type: "string",
                    description: "Syntax-highlighted HTML of the code.",
                  },
                },
              },
            },
          },
        },
        Session: {
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                email: { type: "string", format: "email" },
                image: { type: ["string", "null"] },
              },
            },
            session: {
              type: "object",
              properties: {
                id: { type: "string" },
                expiresAt: { type: "string", format: "date-time" },
              },
            },
          },
        },
      },
    },
    "x-repository": siteRepository,
  })
}

export { getOpenApiDocument }

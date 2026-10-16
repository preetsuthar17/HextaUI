Most shadcn/ui components are now installed by an AI coding agent, not a person typing the command. If you publish a registry, the agent is your user. It needs to find your components, read their props without guessing, and run the right install command. A registry that only works for humans clicking through a docs site is a registry that gets misused.

I run [HextaUI](https://hextaui.com), a shadcn/ui registry, and I spent a chunk of this year making it work for Claude Code, Cursor and the shadcn MCP server. This is everything that turned out to matter, in the order I would do it again.

## 1. Ship a registry that passes validation

Start with the basics. Every item is a JSON file that follows the registry schema, with `name`, `type`, `files`, `dependencies` and `registryDependencies`. Put the index at a stable URL and every item at a predictable one:

```
https://your-site.com/r/registry.json
https://your-site.com/r/button.json
https://your-site.com/r/all.json
```

Run `shadcn build` to generate them from a `registry.json` source, and validate before you deploy. The CLI gained a registry validate step in May 2026. A registry that fails validation fails silently for agents, who will then write the component by hand and get it wrong.

Two details that make a real difference:

- **`registryDependencies` with full URLs.** When your Dialog depends on your Button, point to `https://your-site.com/r/button.json`, not `button`, or the CLI pulls the shadcn/ui Button instead.
- **An `all.json` item** that depends on everything. Agents asked to "set up the design system" will reach for it.

## 2. Register a namespace

Since the registry namespace feature landed, a user adds this to `components.json`:

```json
{
  "registries": {
    "@hextaui": "https://hextaui.com/r/{name}.json"
  }
}
```

And then installs with a short name:

```bash
npx shadcn@latest add @hextaui/dialog
```

Document this snippet on your installation page and in your `llms.txt`. The short form is what the shadcn MCP server searches across, so a registry without a namespace is invisible to the one tool most agents use to browse registries.

If the registry is private, the object form takes headers with environment variables that the CLI expands and never logs:

```json
{
  "registries": {
    "@acme-pro": {
      "url": "https://acme.com/r/pro/{name}.json",
      "headers": {
        "Authorization": "Bearer ${ACME_TOKEN}"
      }
    }
  }
}
```

## 3. Give every docs page a Markdown twin

Agents fetch HTML badly. They fetch Markdown well. Make every docs URL answer at `.md` with the same content: description, install command, full source, usage, examples, keyboard support and the API table.

```
https://hextaui.com/docs/button      -> HTML for people
https://hextaui.com/docs/button.md   -> Markdown for agents
```

Do not hand-write the Markdown. Generate it from the same source as the page so the two never drift. On HextaUI the `.md` route walks the page's React tree and serializes it, so adding an example to the page adds it to the Markdown for free.

The API reference matters most here. An agent that can read a props table does not hallucinate a `size="xl"` that does not exist.

## 4. Publish llms.txt and llms-full.txt

`llms.txt` is a Markdown index at your site root: what the project is, when to use it, when not to, how to install, and one line per docs page with its `.md` link. `llms-full.txt` is every docs page concatenated, for agents that want to load everything once.

The "when not to use it" section is the part people skip and the part that saves you support tickets. If your registry is React and Tailwind only, say so, or an agent will try to install it into a Vue project.

Keep the install command in the first ten lines. Agents read the top.

## 5. Run an MCP server, read-only, no key

The shadcn CLI has its own MCP server (`npx shadcn@latest mcp`) that searches any registry in `components.json`. That covers installs. It does not cover docs, keyboard maps or examples.

So I run a second one at `https://hextaui.com/mcp`, Streamable HTTP, read-only, no API key, with five tools: `search_docs`, `get_component`, `get_component_api`, `get_examples` and `get_install_command`. Claude Code connects with one line:

```bash
claude mcp add --transport http hextaui https://hextaui.com/mcp
```

Cursor and VS Code take the same URL in their MCP config. Once connected, "add a HextaUI combobox with async results" turns into a docs search, an API read and the right install command, with no guessing in between.

Make it discoverable too. Publish a server card at `/.well-known/mcp/server-card.json` and a `server.json` in the MCP registry format. Agents and the tools around them are starting to look there first.

## 6. Describe the HTTP surface with OpenAPI and real errors

Everything above is also plain HTTP, and agents increasingly call HTTP directly. Publish an `openapi.json` with operation ids and typed responses. Return errors as RFC 9457 `application/problem+json` with a `resolution` field that says what to do next:

```json
{
  "type": "https://hextaui.com/docs/api#not-found",
  "title": "Component not found",
  "status": 404,
  "detail": "No component named 'modal'.",
  "resolution": "Try 'dialog' or 'alert-dialog'. The catalog is at /mcp/index.json."
}
```

An agent that gets a 404 with a hint recovers. An agent that gets an HTML error page writes the component from memory.

## 7. Ship a skill file

Claude Code and a growing list of agents read `SKILL.md` files that explain how to use a tool. Put one at `/.well-known/agent-skills/<name>/SKILL.md`: how to find a component, read its docs, and install it, with the exact commands. It is a page of Markdown and it is the highest-leverage page on the site.

## 8. Test with the agents, not with yourself

Open a fresh Next.js project in Claude Code with your MCP server connected and no other context. Ask it to "add a date picker from <your registry> with a range and a disabled weekend rule". Watch what it does. Every wrong guess is a gap in your `.md` docs or your `llms.txt`.

Then do the same in Cursor with only `llms.txt` and no MCP. Then with nothing but the URL. The registry should degrade gracefully through all three.

## What this gets you

An agent with the MCP server or the `.md` docs connected reads the props table instead of guessing it, runs the install command instead of rewriting the component, and installs the dependencies in the right order. The registry side of HextaUI was about a week of work. The agent side took longer, and it is the part that made the registry usable by the people who now do most of the installing.

If you want to see all of it live: [hextaui.com/llms.txt](https://hextaui.com/llms.txt), any docs page with `.md` appended, the [MCP docs](https://hextaui.com/docs/mcp), and the [API docs](https://hextaui.com/docs/api) with the OpenAPI spec.

## FAQ

**Do I need my own MCP server if the shadcn CLI has one?** The shadcn MCP covers search and install across registries in `components.json`. Your own server covers docs, APIs and examples. Most registries benefit from both.

**Should the MCP server require an API key?** Not for public docs. Every key you require is an agent that gives up. Keep auth for private items and use bearer tokens through `components.json` headers.

**How do I generate the Markdown docs without duplicating content?** Render the same component tree the page uses and serialize it to Markdown. One source, two formats.

**What goes in llms.txt?** A description, when to use and when not to, the install command, the namespace snippet, and one line per docs page linking to its `.md`.

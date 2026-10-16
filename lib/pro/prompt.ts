import { absoluteUrl } from "@/lib/site"

const proRegistryConfig = `{
  "registries": {
    "@hextaui-pro": {
      "url": "https://hextaui.com/r/pro/{name}.json",
      "headers": {
        "Authorization": "Bearer \${HEXTAUI_PRO_TOKEN}"
      }
    }
  }
}`

type PromptBlock = { name: string; title: string; free?: boolean }

function indent(code: string) {
  return code
    .split("\n")
    .map((line) => `   ${line}`)
    .join("\n")
}

function getBlockPrompt({ name, title, free }: PromptBlock) {
  const page = absoluteUrl(`/blocks/${name}`)
  const target = `components/blocks/${name}`
  const closing = [
    `Wire the block into the app where it belongs and connect it to real data. Keep the part names and props from its docs: ${page}.`,
    `For the props and examples of the free HextaUI components it is built from, use the HextaUI MCP server at ${absoluteUrl("/mcp")} (setup: ${absoluteUrl("/docs/mcp")}) instead of guessing.`,
  ]

  if (free) {
    return [
      `Add the HextaUI "${title}" block to this project.`,
      "",
      `1. If components.json is missing, run \`npx shadcn@latest init\` first.`,
      `2. Run \`npx shadcn@latest add ${absoluteUrl(`/r/pro/${name}.json`)}\`. The block is free, so it needs no account or token. It adds the files to ${target} and installs the HextaUI components it depends on.`,
      `3. ${closing[0]}`,
      "",
      closing[1],
    ].join("\n")
  }

  return [
    `Add the HextaUI Pro "${title}" block to this project.`,
    "",
    `1. If components.json is missing, run \`npx shadcn@latest init\` first.`,
    `2. Add the HextaUI Pro registry to components.json:`,
    indent(proRegistryConfig),
    `3. Put my HextaUI Pro token in .env.local as HEXTAUI_PRO_TOKEN. If it is not there, stop and ask me for it. Tokens come from ${absoluteUrl("/account")}; HextaUI Pro is at ${absoluteUrl("/pricing")}.`,
    `4. Run \`npx shadcn@latest add @hextaui-pro/${name}\`. It adds the files to ${target} and installs the free HextaUI components it depends on.`,
    `5. ${closing[0]}`,
    "",
    closing[1],
  ].join("\n")
}

export { getBlockPrompt, proRegistryConfig, type PromptBlock }

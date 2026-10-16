type InlineNode =
  | { type: "text"; text: string }
  | { type: "code"; text: string }
  | { type: "strong"; children: InlineNode[] }
  | { type: "link"; href: string; children: InlineNode[] }

type BlogBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; children: InlineNode[] }
  | { type: "list"; ordered: boolean; items: InlineNode[][] }
  | { type: "code"; lang: string; code: string }
  | { type: "table"; head: string[]; rows: string[][] }

const inlinePattern = /(`[^`]+`)|\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g

function parseInline(text: string): InlineNode[] {
  const nodes: InlineNode[] = []
  let cursor = 0

  for (const match of text.matchAll(inlinePattern)) {
    if (match.index > cursor) {
      nodes.push({ type: "text", text: text.slice(cursor, match.index) })
    }
    cursor = match.index + match[0].length
    const [, code, strong, label, href] = match
    if (code !== undefined) {
      nodes.push({ type: "code", text: code.slice(1, -1) })
    } else if (strong !== undefined) {
      nodes.push({ type: "strong", children: parseInline(strong) })
    } else {
      nodes.push({ type: "link", href, children: parseInline(label) })
    }
  }
  if (cursor < text.length) {
    nodes.push({ type: "text", text: text.slice(cursor) })
  }

  return nodes
}

function tableCells(line: string) {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim())
}

function parseBlogMarkdown(markdown: string): BlogBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n")
  const blocks: BlogBlock[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]

    if (!line.trim()) {
      index += 1
      continue
    }

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim()
      const code: string[] = []
      index += 1
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index])
        index += 1
      }
      index += 1
      blocks.push({ type: "code", lang, code: code.join("\n") })
      continue
    }

    const heading = /^(#{2,3}) (.+)$/.exec(line)
    if (heading) {
      blocks.push({
        type: "heading",
        level: heading[1].length === 2 ? 2 : 3,
        text: heading[2].trim(),
      })
      index += 1
      continue
    }

    if (line.trim().startsWith("|")) {
      const rows: string[][] = []
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        const cells = tableCells(lines[index])
        if (!cells.every((cell) => /^:?-+:?$/.test(cell))) rows.push(cells)
        index += 1
      }
      const [head = [], ...body] = rows
      blocks.push({ type: "table", head, rows: body })
      continue
    }

    const listMatch = /^(?:- |\d+\. )/.exec(line)
    if (listMatch) {
      const ordered = /^\d/.test(line)
      const pattern = ordered ? /^\d+\. / : /^- /
      const items: InlineNode[][] = []
      while (index < lines.length && pattern.test(lines[index])) {
        items.push(parseInline(lines[index].replace(pattern, "").trim()))
        index += 1
      }
      blocks.push({ type: "list", ordered, items })
      continue
    }

    const paragraph: string[] = []
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(```|#{2,3} |- |\d+\. |\|)/.test(lines[index])
    ) {
      paragraph.push(lines[index].trim())
      index += 1
    }
    blocks.push({
      type: "paragraph",
      children: parseInline(paragraph.join(" ")),
    })
  }

  return blocks
}

function inlineText(nodes: InlineNode[]): string {
  return nodes
    .map((node) =>
      node.type === "text" || node.type === "code"
        ? node.text
        : inlineText(node.children)
    )
    .join("")
}

function blogPlainText(blocks: BlogBlock[]) {
  return blocks
    .flatMap((block) => {
      switch (block.type) {
        case "heading":
          return [block.text]
        case "paragraph":
          return [inlineText(block.children)]
        case "list":
          return block.items.map(inlineText)
        case "table":
          return [
            block.head.join(" "),
            ...block.rows.map((row) => row.join(" ")),
          ]
        default:
          return []
      }
    })
    .join("\n")
}

function countWords(text: string) {
  return text.split(/\s+/).filter(Boolean).length
}

export {
  blogPlainText,
  countWords,
  inlineText,
  parseBlogMarkdown,
  parseInline,
  type BlogBlock,
  type InlineNode,
}

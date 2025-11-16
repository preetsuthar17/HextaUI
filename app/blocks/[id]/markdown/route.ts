import type { NextRequest } from "next/server";
import { categoryLabels, getBlockMetaById } from "@/lib/blocks-registry";

const BASE_URL = "https://www.hextaui.com";

function generateBlockMarkdown(meta: {
  id: string;
  title: string;
  description?: string;
  category: string;
  usageImports?: string;
  usageCode?: string;
}) {
  let markdown = `# ${meta.title}\n\n`;

  if (meta.description) {
    markdown += `${meta.description}\n\n`;
  }

  markdown += `**Block ID:** \`${meta.id}\`\n\n`;
  markdown += `**Category:** ${categoryLabels[meta.category as keyof typeof categoryLabels] || meta.category}\n\n`;
  markdown += `**URL:** [${BASE_URL}/blocks/${meta.id}](${BASE_URL}/blocks/${meta.id})\n\n`;

  markdown += "## Installation\n\n";
  markdown += `\`\`\`bash\nnpx shadcn@latest add ${meta.id}\n\`\`\`\n\n`;

  if (meta.usageImports || meta.usageCode) {
    markdown += "## Usage\n\n";
    if (meta.usageImports) {
      markdown += "### Imports\n\n";
      markdown += `\`\`\`tsx\n${meta.usageImports}\n\`\`\`\n\n`;
    }
    if (meta.usageCode) {
      markdown += "### Example\n\n";
      markdown += `\`\`\`tsx\n${meta.usageCode}\n\`\`\`\n\n`;
    }
  }

  markdown += "---\n\n";
  markdown += `*Generated from [HextaUI](${BASE_URL})*\n`;

  return markdown;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id?: string }> }
) {
  try {
    const resolved = await params;
    const id = (resolved.id ?? "").trim();

    if (!id) {
      return new Response("Block ID is required", { status: 400 });
    }

    const meta = getBlockMetaById(id);

    if (!meta) {
      return new Response(`Block "${id}" not found`, { status: 404 });
    }

    const markdown = generateBlockMarkdown(meta);

    return new Response(markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating block markdown:", error);
    return new Response("Error generating markdown", { status: 500 });
  }
}

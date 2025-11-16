import type { NextRequest } from "next/server";
import { getComponentMetaById } from "@/lib/components-registry";

const BASE_URL = "https://www.hextaui.com";

function generateComponentMarkdown(meta: {
  id: string;
  title: string;
  description?: string;
  installCode?: string;
  usageImports?: string;
  usageCode?: string;
  api_ref?: string;
  docs_ref?: string;
}) {
  let markdown = `# ${meta.title}\n\n`;

  if (meta.description) {
    markdown += `${meta.description}\n\n`;
  }

  markdown += `**Component ID:** \`${meta.id}\`\n\n`;
  markdown += `**URL:** [${BASE_URL}/components/${meta.id}](${BASE_URL}/components/${meta.id})\n\n`;

  if (meta.docs_ref || meta.api_ref) {
    markdown += "## Links\n\n";
    if (meta.docs_ref) {
      markdown += `- [Documentation](${meta.docs_ref})\n`;
    }
    if (meta.api_ref) {
      markdown += `- [API Reference](${meta.api_ref})\n`;
    }
    markdown += "\n";
  }

  if (meta.installCode) {
    markdown += "## Installation\n\n";
    markdown += `\`\`\`bash\n${meta.installCode}\n\`\`\`\n\n`;
  }

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
      return new Response("Component ID is required", { status: 400 });
    }

    const meta = getComponentMetaById(id);

    if (!meta) {
      return new Response(`Component "${id}" not found`, { status: 404 });
    }

    const markdown = generateComponentMarkdown(meta);

    return new Response(markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating component markdown:", error);
    return new Response("Error generating markdown", { status: 500 });
  }
}

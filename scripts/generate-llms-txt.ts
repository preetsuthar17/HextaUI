import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const BASE_URL = "https://www.hextaui.com";

function extractPrefix(name: string): string | null {
  const match = name.match(/^([a-z]+)-/);
  return match ? match[1] : null;
}

function getCategoryLabel(category: string): string {
  if (category.length <= 3) {
    return category.toUpperCase();
  }
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function discoverBlockPrefixes(items: any[]): Set<string> {
  const prefixCounts = new Map<string, number>();
  items.forEach((item) => {
    if (item.type === "registry:ui") {
      const prefix = extractPrefix(item.name);
      if (prefix) {
        prefixCounts.set(prefix, (prefixCounts.get(prefix) || 0) + 1);
      }
    }
  });
  const blockPrefixes = new Set<string>();
  prefixCounts.forEach((count, prefix) => {
    if (count > 1) {
      blockPrefixes.add(prefix);
    }
  });
  return blockPrefixes;
}

function extractCategory(
  blockName: string,
  blockPrefixes: Set<string>
): string | null {
  const prefix = extractPrefix(blockName);
  return prefix && blockPrefixes.has(prefix) ? prefix : null;
}

function isBlock(item: any, blockPrefixes: Set<string>): boolean {
  return (
    item.type === "registry:ui" &&
    extractCategory(item.name, blockPrefixes) !== null
  );
}

function generateLlmsTxt() {
  try {
    const registryPath = join(process.cwd(), "registry.json");
    const registry = JSON.parse(readFileSync(registryPath, "utf-8"));
    const blockPrefixes = discoverBlockPrefixes(registry.items);
    const components = registry.items.filter(
      (item: any) =>
        item.type === "registry:ui" && !isBlock(item, blockPrefixes)
    );
    const blocks = registry.items.filter((item: any) =>
      isBlock(item, blockPrefixes)
    );
    const blocksByCategory: Record<string, any[]> = {};
    blocks.forEach((block: any) => {
      const category = extractCategory(block.name, blockPrefixes);
      if (category) {
        if (!blocksByCategory[category]) {
          blocksByCategory[category] = [];
        }
        blocksByCategory[category].push(block);
      }
    });
    components.sort((a: any, b: any) => {
      const titleA = a.title || a.name;
      const titleB = b.title || b.name;
      return titleA.localeCompare(titleB);
    });
    const sortedCategories = Object.keys(blocksByCategory).sort();
    sortedCategories.forEach((category) => {
      blocksByCategory[category].sort((a: any, b: any) => {
        const titleA = a.title || a.name;
        const titleB = b.title || b.name;
        return titleA.localeCompare(titleB);
      });
    });
    let content = "# HextaUI\n\n";
    content +=
      "> Ready-to-use foundation components/blocks built on top of shadcn/ui.\n\n";
    content += "## Table of Contents\n\n";
    if (components.length > 0) {
      content += "### Components\n\n";
      components.forEach((component: any) => {
        const title = component.title || component.name;
        const description = component.description || "";
        const url = `${BASE_URL}/components/${component.name}`;
        content += `- [${title}](${url}): ${description}\n`;
      });
      content += "\n";
    }
    if (blocks.length > 0) {
      content += "### Blocks\n\n";
      sortedCategories.forEach((category) => {
        const categoryBlocks = blocksByCategory[category];
        if (categoryBlocks.length > 0) {
          content += `#### ${getCategoryLabel(category)}\n\n`;
          categoryBlocks.forEach((block: any) => {
            const title = block.title || block.name;
            const description = block.description || "";
            const url = `${BASE_URL}/blocks/${block.name}`;
            content += `- [${title}](${url}): ${description}\n`;
          });
          content += "\n";
        }
      });
    }
    const outputPath = join(process.cwd(), "public", "llms.txt");
    writeFileSync(outputPath, content, "utf-8");
    console.log(`✅ Generated llms.txt at ${outputPath}`);
  } catch (error) {
    console.error("Error generating llms.txt:", error);
    process.exit(1);
  }
}

generateLlmsTxt();

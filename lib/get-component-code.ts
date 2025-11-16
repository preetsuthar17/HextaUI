import { readFileSync } from "fs";
import { join } from "path";

let registryCache: any = null;

function getRegistry() {
  if (!registryCache) {
    const registryPath = join(process.cwd(), "registry.json");
    registryCache = JSON.parse(readFileSync(registryPath, "utf-8"));
  }
  return registryCache;
}

export function getComponentCode(componentName: string): string | null {
  try {
    const registry = getRegistry();
    const item = registry.items.find(
      (item: any) => item.name === componentName
    );

    if (!(item && item.files) || item.files.length === 0) {
      return null;
    }

    // Get the first file path (usually the main component file)
    const filePath = item.files[0].path;
    const fullPath = join(process.cwd(), filePath);

    // Read the file content
    const content = readFileSync(fullPath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Error reading component code for ${componentName}:`, error);
    return null;
  }
}

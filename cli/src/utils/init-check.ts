import fs from "fs-extra";
import { join } from "path";

/**
 * Check if HextaUI has been initialized in the project
 */
export async function isHextaUIInitialized(
  projectRoot: string,
): Promise<boolean> {
  const componentsDir = join(projectRoot, "src", "components", "ui");
  const utilsFile = join(projectRoot, "src", "lib", "utils.ts");
  const colorUtilsFile = join(projectRoot, "src", "lib", "color-utils.ts");

  // Check if all required files/directories exist
  const hasComponentsDir = await fs.pathExists(componentsDir);
  const hasUtilsFile = await fs.pathExists(utilsFile);
  const hasColorUtilsFile = await fs.pathExists(colorUtilsFile);

  return hasComponentsDir && hasUtilsFile && hasColorUtilsFile;
}

/**
 * Create a marker file to indicate HextaUI initialization
 */
export async function createInitMarker(projectRoot: string): Promise<void> {
  const markerFile = join(projectRoot, ".hextaui");
  const markerContent = {
    initialized: true,
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  };

  await fs.writeFile(markerFile, JSON.stringify(markerContent, null, 2));
}

/**
 * Check if the marker file exists
 */
export async function hasInitMarker(projectRoot: string): Promise<boolean> {
  const markerFile = join(projectRoot, ".hextaui");
  return await fs.pathExists(markerFile);
}

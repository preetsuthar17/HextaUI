import { existsSync } from "fs";
import { join } from "path";

export async function findProjectRoot(): Promise<string | null> {
  let currentDir = process.cwd();

  while (currentDir !== "/") {
    // Check for Next.js indicators
    const packageJsonPath = join(currentDir, "package.json");
    const nextConfigPath = join(currentDir, "next.config.js");
    const nextConfigMjsPath = join(currentDir, "next.config.mjs");
    const nextConfigTsPath = join(currentDir, "next.config.ts");

    if (existsSync(packageJsonPath)) {
      try {
        const packageJson = require(packageJsonPath);

        // Check if it's a Next.js project
        if (
          packageJson.dependencies?.next ||
          packageJson.devDependencies?.next
        ) {
          return currentDir;
        }
      } catch (error) {
        // Continue searching if package.json is malformed
      }
    }

    // Check for Next.js config files
    if (
      existsSync(nextConfigPath) ||
      existsSync(nextConfigMjsPath) ||
      existsSync(nextConfigTsPath)
    ) {
      return currentDir;
    }

    // Check for src/app directory (Next.js 13+ app router)
    if (
      existsSync(join(currentDir, "src", "app")) ||
      existsSync(join(currentDir, "app"))
    ) {
      return currentDir;
    }

    // Move up one directory
    const parentDir = join(currentDir, "..");
    if (parentDir === currentDir) break; // Reached root
    currentDir = parentDir;
  }

  return null;
}

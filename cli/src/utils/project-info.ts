import { join } from "path";
import fs from "fs-extra";

export async function getTailwindConfig(projectRoot: string): Promise<boolean> {
  const tailwindPaths = [
    "tailwind.config.js",
    "tailwind.config.ts",
    "tailwind.config.mjs",
  ];

  for (const configPath of tailwindPaths) {
    try {
      const fullPath = join(projectRoot, configPath);
      await fs.readFile(fullPath);
      return true;
    } catch {
      continue;
    }
  }

  return false;
}

export async function getPackageJsonDependencies(
  projectRoot: string,
): Promise<Set<string>> {
  try {
    const packageJsonPath = join(projectRoot, "package.json");
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf-8"));

    const allDeps = new Set<string>();

    if (packageJson.dependencies) {
      Object.keys(packageJson.dependencies).forEach((dep) => allDeps.add(dep));
    }

    if (packageJson.devDependencies) {
      Object.keys(packageJson.devDependencies).forEach((dep) =>
        allDeps.add(dep),
      );
    }

    return allDeps;
  } catch {
    return new Set();
  }
}

export async function checkMissingDependencies(
  requiredDeps: string[],
  projectRoot: string,
): Promise<{ missing: string[]; existing: string[] }> {
  const installedDeps = await getPackageJsonDependencies(projectRoot);

  const missing: string[] = [];
  const existing: string[] = [];

  requiredDeps.forEach((dep) => {
    if (installedDeps.has(dep)) {
      existing.push(dep);
    } else {
      missing.push(dep);
    }
  });

  return { missing, existing };
}

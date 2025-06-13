import { exec } from "child_process";
import { promisify } from "util";
import { existsSync } from "fs";
import { join } from "path";

const execAsync = promisify(exec);

export async function checkDependencyManager(
  projectRoot: string,
): Promise<"pnpm" | "yarn" | "npm"> {
  // Check for lock files to determine package manager
  if (existsSync(join(projectRoot, "pnpm-lock.yaml"))) {
    return "pnpm";
  }

  if (existsSync(join(projectRoot, "yarn.lock"))) {
    return "yarn";
  }

  return "npm";
}

export async function installDependencies(
  dependencies: string[],
  projectRoot: string,
): Promise<void> {
  if (dependencies.length === 0) return;

  const packageManager = await checkDependencyManager(projectRoot);

  let command: string;

  switch (packageManager) {
    case "pnpm":
      command = `pnpm add ${dependencies.join(" ")}`;
      break;
    case "yarn":
      command = `yarn add ${dependencies.join(" ")}`;
      break;
    default:
      command = `npm install ${dependencies.join(" ")}`;
      break;
  }

  try {
    await execAsync(command, { cwd: projectRoot });
  } catch (error) {
    // If preferred package manager fails, try npm as fallback
    if (packageManager !== "npm") {
      const npmCommand = `npm install ${dependencies.join(" ")}`;
      await execAsync(npmCommand, { cwd: projectRoot });
    } else {
      throw error;
    }
  }
}

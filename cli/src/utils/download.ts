import fetch from "node-fetch";
import fs from "fs-extra";
import { join, dirname } from "path";
import type { Component, ComponentFile } from "../config/components.js";

export async function downloadComponent(
  component: Component,
  componentsDir: string,
): Promise<void> {
  for (const file of component.files) {
    if (file.type === "file") {
      await downloadFile(file, componentsDir);
    } else if (file.type === "folder") {
      await downloadFolder(file, componentsDir);
    }
  }
}

async function downloadFile(
  file: ComponentFile,
  componentsDir: string,
): Promise<void> {
  try {
    const response = await fetch(file.url);
    if (!response.ok) {
      throw new Error(
        `Failed to download ${file.path}: ${response.statusText}`,
      );
    }

    const content = await response.text();
    const filePath = join(componentsDir, file.path);

    // Ensure directory exists
    await fs.ensureDir(dirname(filePath));

    // Write file
    await fs.writeFile(filePath, content);
  } catch (error) {
    throw new Error(`Failed to download ${file.path}: ${error}`);
  }
}

async function downloadFolder(
  file: ComponentFile,
  componentsDir: string,
): Promise<void> {
  try {
    const response = await fetch(file.url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch folder contents: ${response.statusText}`,
      );
    }

    const contents = (await response.json()) as any[];

    for (const item of contents) {
      if (item.type === "file") {
        // Download the file
        const fileResponse = await fetch(item.download_url);
        if (!fileResponse.ok) {
          throw new Error(
            `Failed to download ${item.name}: ${fileResponse.statusText}`,
          );
        }

        const content = await fileResponse.text();
        const filePath = join(componentsDir, file.path, item.name);

        // Ensure directory exists
        await fs.ensureDir(dirname(filePath));

        // Write file
        await fs.writeFile(filePath, content);
      }
    }
  } catch (error) {
    throw new Error(`Failed to download folder ${file.path}: ${error}`);
  }
}

"use client";

import { FileText, Folder, FolderOpen, Image } from "lucide-react";
import { Tree, TreeItem, TreeProvider } from "@/registry/new-york/ui/tree";

export function TreeBasicDemo() {
  return (
    <TreeProvider className="w-full max-w-sm">
      <Tree>
        <TreeItem
          hasChildren
          icon={<Folder />}
          label="Documents"
          nodeId="documents"
        >
          <TreeItem
            hasChildren
            icon={<Folder />}
            label="Projects"
            level={1}
            nodeId="projects"
          >
            <TreeItem
              hasChildren
              icon={<FolderOpen />}
              label="Project 1"
              level={2}
              nodeId="project1"
            >
              <TreeItem
                icon={<FileText />}
                label="README.md"
                level={3}
                nodeId="readme"
              />
              <TreeItem
                icon={<FileText />}
                label="index.tsx"
                level={3}
                nodeId="index"
              />
            </TreeItem>
          </TreeItem>
          <TreeItem
            hasChildren
            icon={<Folder />}
            label="Images"
            level={1}
            nodeId="images"
          >
            <TreeItem
              icon={<Image aria-label="Logo image" />}
              label="logo.png"
              level={2}
              nodeId="logo"
            />
            <TreeItem
              icon={<Image aria-label="Banner image" />}
              label="banner.jpg"
              level={2}
              nodeId="banner"
            />
          </TreeItem>
        </TreeItem>
      </Tree>
    </TreeProvider>
  );
}

export default TreeBasicDemo;

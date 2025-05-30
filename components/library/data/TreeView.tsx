"use client";

import React, { useState, useCallback } from "react";
import { ChevronRight, Folder, File, FolderOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Types
export type TreeNode = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  data?: any;
};

export type TreeViewProps = {
  data: TreeNode[];
  className?: string;
  onNodeClick?: (node: TreeNode) => void;
  onNodeExpand?: (nodeId: string, expanded: boolean) => void;
  defaultExpandedIds?: string[];
  showLines?: boolean;
  showIcons?: boolean;
  selectable?: boolean;
  multiSelect?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  indent?: number;
  animateExpand?: boolean;
};

// Main TreeView component
export function TreeView({
  data,
  className,
  onNodeClick,
  onNodeExpand,
  defaultExpandedIds = [],
  showLines = true,
  showIcons = true,
  selectable = true,
  multiSelect = false,
  selectedIds = [],
  onSelectionChange,
  indent = 20,
  animateExpand = true,
}: TreeViewProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(defaultExpandedIds)
  );
  const [internalSelectedIds, setInternalSelectedIds] =
    useState<string[]>(selectedIds);

  const isControlled =
    selectedIds !== undefined && onSelectionChange !== undefined;
  const currentSelectedIds = isControlled ? selectedIds : internalSelectedIds;

  const toggleExpanded = useCallback(
    (nodeId: string) => {
      setExpandedIds((prev) => {
        const newSet = new Set(prev);
        const isExpanded = newSet.has(nodeId);
        isExpanded ? newSet.delete(nodeId) : newSet.add(nodeId);
        onNodeExpand?.(nodeId, !isExpanded);
        return newSet;
      });
    },
    [onNodeExpand]
  );

  const handleSelection = useCallback(
    (nodeId: string, ctrlKey = false) => {
      if (!selectable) return;

      let newSelection: string[];

      if (multiSelect && ctrlKey) {
        newSelection = currentSelectedIds.includes(nodeId)
          ? currentSelectedIds.filter((id) => id !== nodeId)
          : [...currentSelectedIds, nodeId];
      } else {
        newSelection = currentSelectedIds.includes(nodeId) ? [] : [nodeId];
      }

      isControlled
        ? onSelectionChange?.(newSelection)
        : setInternalSelectedIds(newSelection);
    },
    [
      selectable,
      multiSelect,
      currentSelectedIds,
      isControlled,
      onSelectionChange,
    ]
  );

  const renderNode = (
    node: TreeNode,
    level = 0,
    isLast = false,
    parentPath: boolean[] = []
  ) => {
    const hasChildren = (node.children?.length ?? 0) > 0;
    const isExpanded = expandedIds.has(node.id);
    const isSelected = currentSelectedIds.includes(node.id);
    const currentPath = [...parentPath, isLast];

    const getDefaultIcon = () =>
      hasChildren ? (
        isExpanded ? (
          <FolderOpen className="h-4 w-4" />
        ) : (
          <Folder className="h-4 w-4" />
        )
      ) : (
        <File className="h-4 w-4" />
      );

    return (
      <div key={node.id} className="select-none">
        <motion.div
          className={cn(
            "flex items-center py-2 px-3 cursor-pointer transition-all duration-200 relative group rounded-md mx-1",
            "hover:bg-accent/50",
            isSelected && "bg-accent/80",
            selectable && "hover:border-accent-foreground/10"
          )}
          style={{ paddingLeft: level * indent + 8 }}
          onClick={(e) => {
            if (hasChildren) toggleExpanded(node.id);
            handleSelection(node.id, e.ctrlKey || e.metaKey);
            onNodeClick?.(node);
          }}
          whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
        >
          {/* Tree Lines */}
          {showLines && level > 0 && (
            <div className="absolute left-0 top-0 bottom-0 pointer-events-none">
              {currentPath.map((isLastInPath, pathIndex) => (
                <div
                  key={pathIndex}
                  className="absolute top-0 bottom-0 border-l border-border/40"
                  style={{
                    left: pathIndex * indent + 12,
                    display:
                      pathIndex === currentPath.length - 1 && isLastInPath
                        ? "none"
                        : "block",
                  }}
                />
              ))}
              <div
                className="absolute top-1/2 border-t border-border/40"
                style={{
                  left: (level - 1) * indent + 12,
                  width: indent - 4,
                  transform: "translateY(-1px)",
                }}
              />
              {isLast && (
                <div
                  className="absolute top-0 border-l border-border/40"
                  style={{
                    left: (level - 1) * indent + 12,
                    height: "50%",
                  }}
                />
              )}
            </div>
          )}

          {/* Expand Icon */}
          <motion.div
            className="flex items-center justify-center w-4 h-4 mr-1"
            animate={{ rotate: hasChildren && isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {hasChildren && (
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            )}
          </motion.div>

          {/* Node Icon */}
          {showIcons && (
            <motion.div
              className="flex items-center justify-center w-4 h-4 mr-2 text-muted-foreground"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.15 }}
            >
              {node.icon || getDefaultIcon()}
            </motion.div>
          )}

          {/* Label */}
          <span className="text-sm font-medium truncate flex-1">
            {node.label}
          </span>
        </motion.div>

        {/* Children */}
        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: animateExpand ? 0.3 : 0,
                ease: "easeInOut",
              }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
                transition={{
                  duration: animateExpand ? 0.2 : 0,
                  delay: animateExpand ? 0.1 : 0,
                }}
              >
                {node.children!.map((child, index) =>
                  renderNode(
                    child,
                    level + 1,
                    index === node.children!.length - 1,
                    currentPath
                  )
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.div
      className={cn(
        "w-full bg-background border border-border rounded-lg",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="p-2">
        {data.map((node, index) =>
          renderNode(node, 0, index === data.length - 1)
        )}
      </div>
    </motion.div>
  );
}

// Example components for documentation
export const BasicTreeViewDemo = () => {
  const treeData: TreeNode[] = [
    {
      id: "1",
      label: "Documents",
      children: [
        {
          id: "1-1",
          label: "Projects",
          children: [
            { id: "1-1-1", label: "Project A.pdf" },
            { id: "1-1-2", label: "Project B.docx" },
            {
              id: "1-1-3",
              label: "Archive",
              children: [
                { id: "1-1-3-1", label: "Old Project.zip" },
                { id: "1-1-3-2", label: "Backup.tar" },
              ],
            },
          ],
        },
        {
          id: "1-2",
          label: "Reports",
          children: [
            { id: "1-2-1", label: "Monthly Report.xlsx" },
            { id: "1-2-2", label: "Annual Report.pdf" },
          ],
        },
      ],
    },
    {
      id: "2",
      label: "Downloads",
      children: [
        { id: "2-1", label: "setup.exe" },
        { id: "2-2", label: "image.jpg" },
        { id: "2-3", label: "video.mp4" },
      ],
    },
    {
      id: "3",
      label: "Desktop",
      children: [{ id: "3-1", label: "shortcut.lnk" }],
    },
  ];

  const handleNodeClick = (node: TreeNode) => {
    console.log("Clicked:", node.label);
  };

  return (
    <TreeView
      data={treeData}
      onNodeClick={handleNodeClick}
      defaultExpandedIds={["1", "1-1"]}
      className="max-w-md"
    />
  );
};

export const CustomIconTreeViewDemo = () => {
  const treeData: TreeNode[] = [
    {
      id: "src",
      label: "src",
      icon: <Folder className="h-4 w-4 text-blue-500" />,
      children: [
        {
          id: "components",
          label: "components",
          icon: <Folder className="h-4 w-4 text-blue-500" />,
          children: [
            {
              id: "Button.tsx",
              label: "Button.tsx",
              icon: (
                <div className="w-4 h-4 bg-blue-500 text-white text-xs flex items-center justify-center rounded">
                  T
                </div>
              ),
            },
            {
              id: "Input.tsx",
              label: "Input.tsx",
              icon: (
                <div className="w-4 h-4 bg-blue-500 text-white text-xs flex items-center justify-center rounded">
                  T
                </div>
              ),
            },
          ],
        },
        {
          id: "utils",
          label: "utils",
          icon: <Folder className="h-4 w-4 text-yellow-500" />,
          children: [
            {
              id: "helpers.ts",
              label: "helpers.ts",
              icon: (
                <div className="w-4 h-4 bg-yellow-500 text-white text-xs flex items-center justify-center rounded">
                  J
                </div>
              ),
            },
          ],
        },
      ],
    },
    {
      id: "package.json",
      label: "package.json",
      icon: (
        <div className="w-4 h-4 bg-green-500 text-white text-xs flex items-center justify-center rounded">
          J
        </div>
      ),
    },
    {
      id: "README.md",
      label: "README.md",
      icon: (
        <div className="w-4 h-4 bg-gray-500 text-white text-xs flex items-center justify-center rounded">
          M
        </div>
      ),
    },
  ];

  return (
    <TreeView
      data={treeData}
      defaultExpandedIds={["src", "components"]}
      className="max-w-sm"
      showLines={true}
    />
  );
};

export const SelectableTreeViewDemo = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const treeData: TreeNode[] = [
    {
      id: "team",
      label: "Development Team",
      children: [
        {
          id: "frontend",
          label: "Frontend",
          children: [
            { id: "john", label: "John Doe - React Developer" },
            { id: "jane", label: "Jane Smith - UI/UX Designer" },
          ],
        },
        {
          id: "backend",
          label: "Backend",
          children: [
            { id: "bob", label: "Bob Johnson - Node.js Developer" },
            { id: "alice", label: "Alice Brown - Database Admin" },
          ],
        },
      ],
    },
    {
      id: "management",
      label: "Management",
      children: [
        { id: "mike", label: "Mike Wilson - Project Manager" },
        { id: "sarah", label: "Sarah Davis - Product Owner" },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <TreeView
        data={treeData}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        multiSelect={true}
        defaultExpandedIds={["team", "frontend", "backend"]}
        className="max-w-md"
      />
      {selectedIds.length > 0 && (
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">
            Selected: {selectedIds.length} item(s)
          </p>
          <div className="flex flex-wrap gap-1">
            {selectedIds.map((id) => (
              <span
                key={id}
                className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded"
              >
                {id}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

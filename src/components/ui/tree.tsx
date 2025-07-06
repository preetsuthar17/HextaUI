"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRight, Folder, File, FolderOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

// Tree Context
interface TreeContextType {
  expandedIds: Set<string>;
  selectedIds: string[];
  toggleExpanded: (nodeId: string) => void;
  handleSelection: (nodeId: string, ctrlKey?: boolean) => void;
  showLines: boolean;
  showIcons: boolean;
  selectable: boolean;
  multiSelect: boolean;
  animateExpand: boolean;
  indent: number;
  onNodeClick?: (nodeId: string, data?: any) => void;
  onNodeExpand?: (nodeId: string, expanded: boolean) => void;
}

const TreeContext = React.createContext<TreeContextType | null>(null);

const useTree = () => {
  const context = React.useContext(TreeContext);
  if (!context) {
    throw new Error("Tree components must be used within a TreeProvider");
  }
  return context;
};

// Tree variants
const treeVariants = cva(
  "w-full bg-background border border-border rounded-ele shadow-sm/2",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-2",
        ghost: "border-transparent bg-transparent",
      },
      size: {
        sm: "text-sm",
        default: "",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const treeItemVariants = cva(
  "flex items-center py-2 px-3 cursor-pointer transition-all duration-200 relative group rounded-[calc(var(--card-radius)-8px)]",
  {
    variants: {
      variant: {
        default:
          "hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        ghost: "hover:bg-accent/50",
        subtle: "hover:bg-muted/50",
      },
      selected: {
        true: "bg-accent text-accent-foreground",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      selected: false,
    },
  },
);

// Provider Props
export interface TreeProviderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof treeVariants> {
  defaultExpandedIds?: string[];
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  onNodeClick?: (nodeId: string, data?: any) => void;
  onNodeExpand?: (nodeId: string, expanded: boolean) => void;
  showLines?: boolean;
  showIcons?: boolean;
  selectable?: boolean;
  multiSelect?: boolean;
  animateExpand?: boolean;
  indent?: number;
}

// Tree Provider
const TreeProvider = React.forwardRef<HTMLDivElement, TreeProviderProps>(
  (
    {
      className,
      variant,
      size,
      children,
      defaultExpandedIds = [],
      selectedIds = [],
      onSelectionChange,
      onNodeClick,
      onNodeExpand,
      showLines = true,
      showIcons = true,
      selectable = true,
      multiSelect = false,
      animateExpand = true,
      indent = 20,
      ...props
    },
    ref,
  ) => {
    const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
      new Set(defaultExpandedIds),
    );
    const [internalSelectedIds, setInternalSelectedIds] =
      React.useState<string[]>(selectedIds);

    const isControlled = onSelectionChange !== undefined;
    const currentSelectedIds = isControlled ? selectedIds : internalSelectedIds;

    const toggleExpanded = React.useCallback(
      (nodeId: string) => {
        setExpandedIds((prev) => {
          const newSet = new Set(prev);
          const isExpanded = newSet.has(nodeId);
          isExpanded ? newSet.delete(nodeId) : newSet.add(nodeId);
          onNodeExpand?.(nodeId, !isExpanded);
          return newSet;
        });
      },
      [onNodeExpand],
    );

    const handleSelection = React.useCallback(
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
      ],
    );

    const contextValue: TreeContextType = {
      expandedIds,
      selectedIds: currentSelectedIds,
      toggleExpanded,
      handleSelection,
      showLines,
      showIcons,
      selectable,
      multiSelect,
      animateExpand,
      indent,
      onNodeClick,
      onNodeExpand,
    };
    return (
      <TreeContext.Provider value={contextValue}>
        <motion.div
          className={cn(treeVariants({ variant, size, className }))}
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="p-2" {...props}>
            {children}
          </div>
        </motion.div>
      </TreeContext.Provider>
    );
  },
);

TreeProvider.displayName = "TreeProvider";

// Tree Props
export interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

// Tree
const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp className={cn("space-y-1", className)} ref={ref} {...props}>
        {children}
      </Comp>
    );
  },
);

Tree.displayName = "Tree";

// Tree Item Props
export interface TreeItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof treeItemVariants> {
  nodeId: string;
  label: string;
  icon?: React.ReactNode;
  data?: any;
  level?: number;
  isLast?: boolean;
  parentPath?: boolean[];
  hasChildren?: boolean;
  asChild?: boolean;
}

// Tree Item
const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps>(
  (
    {
      className,
      variant,
      nodeId,
      label,
      icon,
      data,
      level = 0,
      isLast = false,
      parentPath = [],
      hasChildren = false,
      asChild = false,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const {
      expandedIds,
      selectedIds,
      toggleExpanded,
      handleSelection,
      showLines,
      showIcons,
      animateExpand,
      indent,
      onNodeClick,
    } = useTree();

    const isExpanded = expandedIds.has(nodeId);
    const isSelected = selectedIds.includes(nodeId);
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

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (hasChildren) toggleExpanded(nodeId);
      handleSelection(nodeId, e.ctrlKey || e.metaKey);
      onNodeClick?.(nodeId, data);
      onClick?.(e);
    };

    const Comp = asChild ? Slot : "div";
    return (
      <div className="select-none">
        <motion.div
          className={cn(
            treeItemVariants({ variant, selected: isSelected, className }),
          )}
          style={{ paddingInlineStart: level * indent + 8 }}
          onClick={handleClick}
          whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
        >
          {/* Tree Lines */}
          {showLines && level > 0 && (
            <div className="absolute start-0 top-0 bottom-0 pointer-events-none">
              {currentPath.map((isLastInPath, pathIndex) => (
                <div
                  key={pathIndex}
                  className="absolute top-0 bottom-0 border-s border-border/40"
                  style={{
                    insetInlineStart: pathIndex * indent + 12,
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
                  insetInlineStart: (level - 1) * indent + 12,
                  width: indent - 4,
                  transform: "translateY(-1px)",
                }}
              />
              {isLast && (
                <div
                  className="absolute top-0 border-s border-border/40"
                  style={{
                    insetInlineStart: (level - 1) * indent + 12,
                    height: "50%",
                  }}
                />
              )}
            </div>
          )}

          {/* Expand Icon */}
          <motion.div
            className="flex items-center justify-center w-4 h-4 me-1"
            animate={{ rotate: hasChildren && isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {hasChildren && (
              <ChevronRight className="h-3 w-3 text-muted-foreground rtl:rotate-180" />
            )}
          </motion.div>

          {/* Node Icon */}
          {showIcons && (
            <motion.div
              className="flex items-center justify-center w-4 h-4 me-2 text-muted-foreground"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.15 }}
            >
              {icon || getDefaultIcon()}
            </motion.div>
          )}

          {/* Label */}
          <span className="text-sm truncate flex-1 text-foreground">
            {label}
          </span>
        </motion.div>

        {/* Children */}
        <AnimatePresence>
          {hasChildren && isExpanded && children && (
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
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

TreeItem.displayName = "TreeItem";

export { TreeProvider, Tree, TreeItem, treeVariants, treeItemVariants };

// ============================================================================
// BLOCK EXAMPLE PROPS
// ============================================================================
// This function provides example props for each block for demo purposes
export function getBlockExampleProps(blockId: string): Record<string, any> {
  return {};
}

// ============================================================================
// Code snippets showing how to use each block
// ============================================================================
const blockSnippets = {} as const;

export type BlockSnippets = typeof blockSnippets;

export type BlockCategory =
  | "ai"
  | "auth"
  | "billing"
  | "settings"
  | "team"
  | "tasks";

export type BlockMeta = {
  id: string;
  title: string;
  description?: string;
  category: BlockCategory;
  Component: React.ComponentType<any>;
  getExampleProps?: () => Record<string, any>;
  usageImports?: string;
  usageCode?: string;
};

const blocksList: Omit<BlockMeta, "Component">[] = [];

const blockComponents: Record<string, React.ComponentType<any>> = {};

const snippets = blockSnippets as Record<
  string,
  Partial<Pick<BlockMeta, "usageImports" | "usageCode">>
>;

export const blocksRegistry: BlockMeta[] = blocksList.map((block) => ({
  ...block,
  Component: blockComponents[block.id],
  getExampleProps: () => getBlockExampleProps(block.id),
  ...(snippets[block.id] ?? {}),
}));

export function getBlockMetaById(id: string): BlockMeta | undefined {
  return blocksRegistry.find((b) => b.id === id);
}

export function getBlocksByCategory(category: BlockCategory): BlockMeta[] {
  return blocksRegistry.filter((b) => b.category === category);
}

export const blockCategories: BlockCategory[] = [
  "ai",
  "auth",
  "billing",
  "settings",
  "team",
  "tasks",
];

export const categoryLabels: Record<BlockCategory, string> = {
  ai: "AI",
  auth: "Authentication",
  billing: "Billing",
  settings: "Settings",
  team: "Team",
  tasks: "Tasks",
};

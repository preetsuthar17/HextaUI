import type { React.ComponentType } from "react";

// Import all block components
import AIChatHistory from "@/components/blocks/ai/ai-chat-history";
import AICitations from "@/components/blocks/ai/ai-citations";
// ... more imports will be added

import ProjectList from "@/components/blocks/tasks/project-list";
import TaskBoard from "@/components/blocks/tasks/task-board";
import TaskCreate from "@/components/blocks/tasks/task-create";
import TaskDetail from "@/components/blocks/tasks/task-detail";
import TaskFilters from "@/components/blocks/tasks/task-filters";
import TaskList from "@/components/blocks/tasks/task-list";
import TaskProgress from "@/components/blocks/tasks/task-progress";

export type BlockCategory =
  | "ai"
  | "auth"
  | "billing"
  | "settings"
  | "team"
  | "tasks";

export type BlockDefinition = {
  id: string;
  title: string;
  description: string;
  category: BlockCategory;
  Component: React.ComponentType<any>;
  usageImports: string;
  usageCode: string;
  exampleProps: () => Record<string, any>;
};

// Unified blocks data - all metadata, snippets, and examples in one place
export const blocksData: BlockDefinition[] = [
  // AI Blocks - dummy data
  {
    id: "ai-chat-history",
    title: "Chat History",
    description:
      "Display and manage conversation history with search and filtering.",
    category: "ai",
    Component: AIChatHistory,
    usageImports: `import AIChatHistory from "@/components/blocks/ai/ai-chat-history";`,
    usageCode: "<AIChatHistory ... />",
    exampleProps: () => ({
      // Dummy example props
      conversations: [],
      activeConversationId: "conv-1",
    }),
  },
  {
    id: "ai-citations",
    title: "Citations",
    description: "Show source citations and references for AI responses.",
    category: "ai",
    Component: AICitations,
    usageImports: `import AICitations from "@/components/blocks/ai/ai-citations";`,
    usageCode: "<AICitations ... />",
    exampleProps: () => ({
      citations: [],
    }),
  },
  // ... more AI blocks will be added

  // Task Blocks - dummy data
  {
    id: "task-board",
    title: "Task Board",
    description:
      "Kanban-style board for managing tasks with drag-and-drop functionality.",
    category: "tasks",
    Component: TaskBoard,
    usageImports: `import TaskBoard from "@/components/blocks/tasks/task-board";`,
    usageCode: `<TaskBoard
  tasks={[...]}
  onTaskSelect={(taskId) => {
    // Open task detail view or navigate to task page
    setSelectedTaskId(taskId);
    router.push(\`/tasks/\${taskId}\`);
  }}
  onTaskMove={async (taskId, fromStatus, toStatus) => {
    // Update task status in your database/state
    await updateTaskStatus(taskId, toStatus);
  }}
  onTaskUpdate={async (taskId, updates) => {
    // Update task fields
    await updateTask(taskId, updates);
  }}
  onTaskDelete={async (taskId) => {
    // Confirm deletion, then remove from database
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteTask(taskId);
    }
  }}
/>`,
    exampleProps: () => ({
      tasks: [],
      onTaskSelect: () => {},
      onTaskMove: async () => {},
      onTaskUpdate: async () => {},
      onTaskDelete: async () => {},
    }),
  },
  {
    id: "task-create",
    title: "Task Create",
    description:
      "Form to create new tasks with all necessary fields including assignees, projects, and due dates.",
    category: "tasks",
    Component: TaskCreate,
    usageImports: `import TaskCreate from "@/components/blocks/tasks/task-create";`,
    usageCode: `<TaskCreate
  availableAssignees={[...]}
  availableProjects={[...]}
  onCreate={async (data) => {
    // Create task in your database
    const newTask = await createTask(data);
    return newTask;
  }}
  onCancel={() => {
    // Close modal or navigate back
    setIsCreateModalOpen(false);
  }}
/>`,
    exampleProps: () => ({
      availableAssignees: [],
      availableProjects: [],
      onCreate: async () => ({}),
      onCancel: () => {},
    }),
  },
  {
    id: "task-detail",
    title: "Task Detail",
    description:
      "Detailed view of a task with subtasks, comments, attachments, and activity log. Includes URL-synced tabs.",
    category: "tasks",
    Component: TaskDetail,
    usageImports: `import TaskDetail from "@/components/blocks/tasks/task-detail";`,
    usageCode: `<TaskDetail
  task={{...}}
  subtasks={[...]}
  comments={[...]}
  attachments={[...]}
  activities={[...]}
  onUpdate={async (updates) => {
    // Update task in your database
    await updateTask(task.id, updates);
  }}
  onDelete={async () => {
    // Confirm deletion
    if (confirm("Are you sure?")) {
      await deleteTask(task.id);
      router.push("/tasks");
    }
  }}
/>`,
    exampleProps: () => ({
      task: null,
      subtasks: [],
      comments: [],
      attachments: [],
      activities: [],
      onUpdate: async () => {},
      onDelete: async () => {},
    }),
  },
  {
    id: "task-filters",
    title: "Task Filters",
    description:
      "Filter and search tasks by status, priority, assignees, projects, and tags with active filter badges.",
    category: "tasks",
    Component: TaskFilters,
    usageImports: `import TaskFilters from "@/components/blocks/tasks/task-filters";`,
    usageCode: `<TaskFilters
  availableAssignees={[...]}
  availableProjects={[...]}
  availableTags={[...]}
  onFiltersChange={(filters) => {
    // Update URL query params for shareable filters
    const params = new URLSearchParams();
    router.push(\`/tasks?\${params.toString()}\`);
  }}
/>`,
    exampleProps: () => ({
      availableAssignees: [],
      availableProjects: [],
      availableTags: [],
      onFiltersChange: () => {},
    }),
  },
  {
    id: "task-list",
    title: "Task List",
    description:
      "List view of tasks with sorting, filtering, bulk selection, and inline status updates.",
    category: "tasks",
    Component: TaskList,
    usageImports: `import TaskList from "@/components/blocks/tasks/task-list";`,
    usageCode: `<TaskList
  tasks={[...]}
  onTaskSelect={(taskId) => {
    // Open task detail view
    setSelectedTaskId(taskId);
  }}
  onTaskUpdate={async (taskId, updates) => {
    // Update task in database
    await updateTask(taskId, updates);
  }}
  onTaskDelete={async (taskId) => {
    // Delete task after confirmation
    if (confirm("Are you sure?")) {
      await deleteTask(taskId);
    }
  }}
/>`,
    exampleProps: () => ({
      tasks: [],
      onTaskSelect: () => {},
      onTaskUpdate: async () => {},
      onTaskDelete: async () => {},
    }),
  },
  {
    id: "task-progress",
    title: "Task Progress",
    description:
      "Visual progress indicator for task completion goals with percentage and count display.",
    category: "tasks",
    Component: TaskProgress,
    usageImports: `import TaskProgress from "@/components/blocks/tasks/task-progress";`,
    usageCode: `<TaskProgress
  goal={12}
  tasks={[...]}
/>`,
    exampleProps: () => ({
      goal: 10,
      tasks: [],
    }),
  },
  {
    id: "project-list",
    title: "Project List",
    description:
      "Display and manage projects with progress tracking, member avatars, and task counts.",
    category: "tasks",
    Component: ProjectList,
    usageImports: `import ProjectList from "@/components/blocks/tasks/project-list";`,
    usageCode: `<ProjectList
  projects={[...]}
  onProjectSelect={(projectId) => {
    // Navigate to project detail page
    router.push(\`/projects/\${projectId}\`);
  }}
/>`,
    exampleProps: () => ({
      projects: [],
      onProjectSelect: () => {},
    }),
  },
  // ... more blocks will be added (AI, Auth, Billing, Settings, Team)
];

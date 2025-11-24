"use client";

import { useState } from "react";
import type { Project } from "@/registry/new-york/blocks/tasks/project-list";
import ProjectList from "@/registry/new-york/blocks/tasks/project-list";
import TaskBoard from "@/registry/new-york/blocks/tasks/task-board";
import TaskDetail, {
  type Subtask,
  type TaskActivity,
  type TaskAttachment,
  type TaskComment,
} from "@/registry/new-york/blocks/tasks/task-detail";
import TaskFilters from "@/registry/new-york/blocks/tasks/task-filters";
import type {
  Task,
  TaskAssignee,
  TaskPriority,
  TaskStatus,
} from "@/registry/new-york/blocks/tasks/task-list";
import TaskList from "@/registry/new-york/blocks/tasks/task-list";
import TaskProgress from "@/registry/new-york/blocks/tasks/task-progress";

// Fixed base date to prevent hydration mismatches
const BASE_DATE = new Date("2025-11-18T09:00:00Z");

const mockAssignees: TaskAssignee[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
  },
  {
    id: "3",
    name: "Emily Watson",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=EmilyWatson2024",
  },
  {
    id: "4",
    name: "David Kim",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=DavidKim2024",
  },
  {
    id: "5",
    name: "Priya Patel",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=PriyaPatel2024",
  },
];

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Redesign homepage hero section",
    description:
      "Update the hero section with new messaging, improved CTA placement, and better visual hierarchy. Need to align with brand guidelines and ensure accessibility standards. Include A/B testing setup for conversion optimization.",
    status: "in_progress",
    priority: "high",
    assignees: [mockAssignees[0], mockAssignees[1]],
    dueDate: new Date(BASE_DATE.getTime() + 5 * 24 * 60 * 60 * 1000),
    tags: ["design", "frontend", "ui"],
    createdAt: new Date(BASE_DATE.getTime() - 12 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(BASE_DATE.getTime() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "Implement OAuth 2.0 authentication flow",
    description:
      "Add Google and GitHub OAuth providers. Need to handle token refresh, session management, and secure storage. Include rate limiting and CSRF protection. Must pass security audit before production deployment.",
    status: "todo",
    priority: "urgent",
    assignees: [mockAssignees[2]],
    dueDate: new Date(BASE_DATE.getTime() + 10 * 24 * 60 * 60 * 1000),
    tags: ["backend", "security", "auth"],
    createdAt: new Date(BASE_DATE.getTime() - 8 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(BASE_DATE.getTime() - 8 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "Complete API documentation for v2.0",
    description:
      "Document all REST endpoints with request/response examples, error codes, rate limits, and authentication requirements. Include Postman collection and OpenAPI spec. Update developer portal with interactive docs.",
    status: "done",
    priority: "medium",
    assignees: [mockAssignees[3]],
    tags: ["documentation", "api"],
    createdAt: new Date(BASE_DATE.getTime() - 25 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(BASE_DATE.getTime() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    title: "Fix iOS Safari layout bugs",
    description:
      "Address viewport issues on iPhone 12-15, fix sticky header behavior, and resolve form input zoom problems. Test on iOS 15-17. Ensure touch targets meet accessibility guidelines (44x44pt minimum).",
    status: "todo",
    priority: "high",
    assignees: [mockAssignees[0], mockAssignees[4]],
    dueDate: new Date(BASE_DATE.getTime() + 2 * 24 * 60 * 60 * 1000),
    tags: ["frontend", "mobile", "bug"],
    createdAt: new Date(BASE_DATE.getTime() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(BASE_DATE.getTime() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "5",
    title: "Configure GitHub Actions for automated deployments",
    description:
      "Set up CI/CD pipeline with automated tests, linting, and deployment to staging/production. Include rollback mechanism and deployment notifications. Configure secrets management and environment variables.",
    status: "in_progress",
    priority: "medium",
    assignees: [mockAssignees[1], mockAssignees[2]],
    tags: ["devops", "ci-cd"],
    createdAt: new Date(BASE_DATE.getTime() - 15 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(BASE_DATE.getTime() - 6 * 24 * 60 * 60 * 1000),
  },
  {
    id: "6",
    title: "Code review: Payment integration PR #342",
    description:
      "Review payment gateway integration changes. Focus on error handling, transaction logging, and PCI compliance. Check test coverage and edge cases. Need approval from security team before merge.",
    status: "done",
    priority: "high",
    assignees: [mockAssignees[3], mockAssignees[4]],
    tags: ["review", "security", "payments"],
    createdAt: new Date(BASE_DATE.getTime() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(BASE_DATE.getTime() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "7",
    title: "Optimize database query performance",
    description:
      "Identify and fix N+1 queries in user dashboard. Add database indexes for frequently queried fields. Implement query result caching where appropriate. Target: reduce page load time by 40%.",
    status: "in_progress",
    priority: "medium",
    assignees: [mockAssignees[2]],
    dueDate: new Date(BASE_DATE.getTime() + 7 * 24 * 60 * 60 * 1000),
    tags: ["backend", "performance", "database"],
    createdAt: new Date(BASE_DATE.getTime() - 6 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(BASE_DATE.getTime() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "8",
    title: "Design email notification templates",
    description:
      "Create responsive email templates for welcome, password reset, order confirmation, and weekly digest. Ensure compatibility across major email clients (Gmail, Outlook, Apple Mail). Include dark mode support.",
    status: "todo",
    priority: "low",
    assignees: [mockAssignees[0]],
    dueDate: new Date(BASE_DATE.getTime() + 14 * 24 * 60 * 60 * 1000),
    tags: ["design", "email"],
    createdAt: new Date(BASE_DATE.getTime() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(BASE_DATE.getTime() - 2 * 24 * 60 * 60 * 1000),
  },
];

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Q4 Website Redesign",
    description:
      "Complete redesign of company website with focus on conversion optimization, improved accessibility, and modern design patterns. Includes new CMS integration and performance improvements.",
    status: "active",
    progress: 68,
    color: "#3b82f6",
    members: [mockAssignees[0], mockAssignees[1], mockAssignees[4]],
    taskCount: 24,
    completedTaskCount: 16,
    createdAt: new Date(BASE_DATE.getTime() - 45 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(BASE_DATE.getTime() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    name: "Mobile App v2.0",
    description:
      "Major update to mobile application with new features: offline mode, push notifications, and improved performance. Targeting iOS 15+ and Android 12+. Includes App Store optimization.",
    status: "active",
    progress: 42,
    color: "#10b981",
    members: [mockAssignees[0], mockAssignees[2], mockAssignees[4]],
    taskCount: 18,
    completedTaskCount: 8,
    createdAt: new Date(BASE_DATE.getTime() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(BASE_DATE.getTime() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    name: "Payment System Integration",
    description:
      "Integrate Stripe and PayPal payment gateways with subscription management, invoicing, and refund handling. Includes PCI compliance audit and security testing. Production launch scheduled for December.",
    status: "completed",
    progress: 100,
    color: "#8b5cf6",
    members: [mockAssignees[2], mockAssignees[3], mockAssignees[4]],
    taskCount: 14,
    completedTaskCount: 14,
    createdAt: new Date(BASE_DATE.getTime() - 60 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(BASE_DATE.getTime() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    name: "Performance Optimization",
    description:
      "Improve application performance across all platforms. Focus on database optimization, API response times, and frontend bundle size reduction. Target: 50% improvement in Core Web Vitals.",
    status: "active",
    progress: 35,
    color: "#f59e0b",
    members: [mockAssignees[1], mockAssignees[2]],
    taskCount: 12,
    completedTaskCount: 4,
    createdAt: new Date(BASE_DATE.getTime() - 20 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(BASE_DATE.getTime() - 1 * 24 * 60 * 60 * 1000),
  },
];

const mockComments: TaskComment[] = [
  {
    id: "1",
    content:
      "I've reviewed the design mockups and they look good! One suggestion: we should increase the CTA button size on mobile by 10% for better touch targets. Also, can we add a subtle animation on hover?",
    author: mockAssignees[1],
    createdAt: new Date(BASE_DATE.getTime() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    content:
      "Thanks for the feedback! I've updated the mobile CTA size and added a smooth scale animation. The changes are in the latest commit. Can you take another look?",
    author: mockAssignees[0],
    createdAt: new Date(BASE_DATE.getTime() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    content:
      "Perfect! The animation looks great. I've approved the design. Ready to move forward with implementation. @Marcus, can you start on the frontend integration?",
    author: mockAssignees[1],
    createdAt: new Date(BASE_DATE.getTime() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    content:
      "Started working on it. I'll have a PR ready by end of day tomorrow. Quick question: should we use CSS transitions or Framer Motion for the animations?",
    author: mockAssignees[1],
    createdAt: new Date(BASE_DATE.getTime() - 18 * 60 * 60 * 1000),
  },
];

const mockAttachments: TaskAttachment[] = [
  {
    id: "1",
    name: "hero-section-mockup-v3.fig",
    url: "#",
    size: 3_456_000,
    type: "application/octet-stream",
    uploadedBy: mockAssignees[0],
    uploadedAt: new Date(BASE_DATE.getTime() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    name: "brand-guidelines-2025.pdf",
    url: "#",
    size: 2_147_000,
    type: "application/pdf",
    uploadedBy: mockAssignees[1],
    uploadedAt: new Date(BASE_DATE.getTime() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    name: "accessibility-checklist.xlsx",
    url: "#",
    size: 128_000,
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    uploadedBy: mockAssignees[4],
    uploadedAt: new Date(BASE_DATE.getTime() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    name: "ab-test-results-q3.png",
    url: "#",
    size: 892_000,
    type: "image/png",
    uploadedBy: mockAssignees[3],
    uploadedAt: new Date(BASE_DATE.getTime() - 2 * 24 * 60 * 60 * 1000),
  },
];

const mockActivities: TaskActivity[] = [
  {
    id: "1",
    type: "created",
    user: mockAssignees[1],
    description: "created this task",
    timestamp: new Date(BASE_DATE.getTime() - 12 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    type: "assigned",
    user: mockAssignees[1],
    description: "assigned to Sarah Chen and Marcus Rodriguez",
    timestamp: new Date(BASE_DATE.getTime() - 11 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    type: "updated",
    user: mockAssignees[0],
    description: "updated the priority to High",
    timestamp: new Date(BASE_DATE.getTime() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    type: "updated",
    user: mockAssignees[0],
    description: "added tags: design, frontend, ui",
    timestamp: new Date(BASE_DATE.getTime() - 9 * 24 * 60 * 60 * 1000),
  },
  {
    id: "5",
    type: "updated",
    user: mockAssignees[1],
    description: "updated the status to In Progress",
    timestamp: new Date(BASE_DATE.getTime() - 8 * 24 * 60 * 60 * 1000),
  },
  {
    id: "6",
    type: "updated",
    user: mockAssignees[0],
    description: "updated the due date to Nov 23, 2025",
    timestamp: new Date(BASE_DATE.getTime() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "7",
    type: "commented",
    user: mockAssignees[1],
    description: "added a comment",
    timestamp: new Date(BASE_DATE.getTime() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "8",
    type: "updated",
    user: mockAssignees[0],
    description: "attached hero-section-mockup-v3.fig",
    timestamp: new Date(BASE_DATE.getTime() - 2 * 24 * 60 * 60 * 1000),
  },
];

const mockSubtasks: Subtask[] = [
  {
    id: "1",
    title: "Create low-fidelity wireframes for desktop and mobile",
    completed: true,
  },
  { id: "2", title: "Design high-fidelity mockups in Figma", completed: true },
  {
    id: "3",
    title: "Get stakeholder approval on design direction",
    completed: true,
  },
  {
    id: "4",
    title: "Implement responsive HTML/CSS structure",
    completed: false,
  },
  { id: "5", title: "Add animations and micro-interactions", completed: false },
  {
    id: "6",
    title: "Conduct accessibility audit and fix issues",
    completed: false,
  },
  { id: "7", title: "Set up A/B testing framework", completed: false },
  { id: "8", title: "Deploy to staging and gather feedback", completed: false },
];

export default function TasksPreview() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(mockTasks[0]);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const handleTaskCreate = async (data: {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: Date;
    assigneeIds?: string[];
    tags?: string[];
    projectId?: string;
  }) => {
    const newTask: Task = {
      id: String(tasks.length + 1),
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      assignees: data.assigneeIds
        ? mockAssignees.filter((a) => data.assigneeIds?.includes(a.id))
        : undefined,
      dueDate: data.dueDate,
      tags: data.tags,
      createdAt: BASE_DATE,
      updatedAt: BASE_DATE,
    };
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdate = async (taskId: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: BASE_DATE }
          : task
      )
    );
    if (selectedTask?.id === taskId) {
      setSelectedTask({ ...selectedTask, ...updates, updatedAt: BASE_DATE });
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  };

  const handleTaskMove = async (
    taskId: string,
    fromStatus: TaskStatus,
    toStatus: TaskStatus
  ) => {
    await handleTaskUpdate(taskId, { status: toStatus });
  };

  return (
    <div className="flex w-full flex-col gap-8">
      {/* TaskProgress Block */}
      <div>
        <TaskProgress goal={12} tasks={tasks} />
      </div>

      {/* Main Grid */}
      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        {/* First Column */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <TaskList
              onTaskDelete={handleTaskDelete}
              onTaskSelect={(taskId) => {
                const task = tasks.find((t) => t.id === taskId);
                setSelectedTask(task || null);
              }}
              onTaskUpdate={handleTaskUpdate}
              tasks={tasks}
            />
          </div>
          <div className="flex flex-col gap-4">
            <ProjectList
              onProjectSelect={(projectId) => {
                console.log("Selected project:", projectId);
              }}
              projects={projects}
            />
          </div>
        </div>
        {/* Second Column */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <TaskBoard
              onTaskDelete={handleTaskDelete}
              onTaskMove={handleTaskMove}
              onTaskSelect={(taskId) => {
                const task = tasks.find((t) => t.id === taskId);
                setSelectedTask(task || null);
              }}
              onTaskUpdate={handleTaskUpdate}
              tasks={tasks}
            />
          </div>
          <div className="flex flex-col gap-4">
            <TaskFilters
              availableAssignees={mockAssignees.map((a) => ({
                id: a.id,
                name: a.name,
              }))}
              availableProjects={projects.map((p) => ({
                id: p.id,
                name: p.name,
              }))}
              availableTags={[
                "design",
                "frontend",
                "backend",
                "security",
                "documentation",
                "mobile",
                "devops",
                "review",
                "ui",
                "auth",
                "api",
                "bug",
                "ci-cd",
                "performance",
                "database",
                "email",
                "payments",
              ]}
            />
          </div>
          <div className="flex flex-col gap-4">
            <TaskDetail
              activities={mockActivities}
              attachments={mockAttachments}
              comments={mockComments}
              onDelete={async () => {
                if (selectedTask) {
                  await handleTaskDelete(selectedTask.id);
                }
              }}
              onUpdate={async (updates) => {
                if (selectedTask) {
                  await handleTaskUpdate(selectedTask.id, updates);
                }
              }}
              subtasks={mockSubtasks}
              task={selectedTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

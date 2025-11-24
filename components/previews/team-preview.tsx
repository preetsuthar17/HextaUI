"use client";

import type { ActivityEntry } from "@/registry/new-york/blocks/team/team-activity-feed";
import TeamActivityFeed from "@/registry/new-york/blocks/team/team-activity-feed";
import type { AIMessage } from "@/registry/new-york/blocks/team/team-ai-room";
import TeamAIRoom from "@/registry/new-york/blocks/team/team-ai-room";
import TeamAnalytics from "@/registry/new-york/blocks/team/team-analytics";
import type { ChatMessage } from "@/registry/new-york/blocks/team/team-chat";
import TeamChat from "@/registry/new-york/blocks/team/team-chat";
import TeamDashboard from "@/registry/new-york/blocks/team/team-dashboard";
import type { TeamFile } from "@/registry/new-york/blocks/team/team-files";
import TeamFiles from "@/registry/new-york/blocks/team/team-files";
import type { TeamInvitation } from "@/registry/new-york/blocks/team/team-invitations";
import TeamInvitations from "@/registry/new-york/blocks/team/team-invitations";
import type { TeamMember as TeamMemberType } from "@/registry/new-york/blocks/team/team-member-list";
import TeamMemberList from "@/registry/new-york/blocks/team/team-member-list";
import type { TeamNote } from "@/registry/new-york/blocks/team/team-notes";
import TeamNotes from "@/registry/new-york/blocks/team/team-notes";
import type { TeamNotification } from "@/registry/new-york/blocks/team/team-notifications";
import TeamNotifications from "@/registry/new-york/blocks/team/team-notifications";
import TeamPermissionsMatrix from "@/registry/new-york/blocks/team/team-permissions-matrix";
import type { TeamProject } from "@/registry/new-york/blocks/team/team-projects";
import TeamProjects from "@/registry/new-york/blocks/team/team-projects";
import type { TeamPrompt } from "@/registry/new-york/blocks/team/team-prompt-library";
import TeamPromptLibrary from "@/registry/new-york/blocks/team/team-prompt-library";
import TeamSettings from "@/registry/new-york/blocks/team/team-settings";
import type { Team } from "@/registry/new-york/blocks/team/team-switcher";
import TeamSwitcher from "@/registry/new-york/blocks/team/team-switcher";

const initialTimestamp = Date.now();

const getAvatarUrl = (seed: string) =>
  `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(seed)}`;

const exampleTeams: Team[] = [
  {
    id: "team-1",
    name: "Acme Inc.",
    avatar: getAvatarUrl("Acme Inc."),
    plan: "pro",
    memberCount: 12,
  },
  {
    id: "team-2",
    name: "Design Team",
    avatar: getAvatarUrl("Design Team"),
    plan: "free",
    memberCount: 5,
  },
  {
    id: "team-3",
    name: "Engineering",
    avatar: getAvatarUrl("Engineering"),
    plan: "enterprise",
    memberCount: 24,
  },
];

const exampleMembers: TeamMemberType[] = [
  {
    id: "member-1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: getAvatarUrl("Sarah Johnson"),
    role: "owner",
    status: "active",
    lastActive: new Date(initialTimestamp - 5 * 60 * 1000),
    joinedAt: new Date(initialTimestamp - 30 * 24 * 60 * 60 * 1000),
    aiUsage: {
      tokens: 125_000,
      sessions: 45,
    },
  },
  {
    id: "member-2",
    name: "Mike Chen",
    email: "mike@example.com",
    avatar: getAvatarUrl("Mike Chen"),
    role: "admin",
    status: "active",
    lastActive: new Date(initialTimestamp - 15 * 60 * 1000),
    joinedAt: new Date(initialTimestamp - 20 * 24 * 60 * 60 * 1000),
    aiUsage: {
      tokens: 89_000,
      sessions: 32,
    },
  },
  {
    id: "member-3",
    name: "Emily Davis",
    email: "emily@example.com",
    avatar: getAvatarUrl("Emily Davis"),
    role: "member",
    status: "active",
    lastActive: new Date(initialTimestamp - 2 * 60 * 60 * 1000),
    joinedAt: new Date(initialTimestamp - 10 * 24 * 60 * 60 * 1000),
    aiUsage: {
      tokens: 45_000,
      sessions: 18,
    },
  },
  {
    id: "member-4",
    name: "Alex Rodriguez",
    email: "alex@example.com",
    avatar: getAvatarUrl("Alex Rodriguez"),
    role: "viewer",
    status: "active",
    lastActive: new Date(initialTimestamp - 1 * 24 * 60 * 60 * 1000),
    joinedAt: new Date(initialTimestamp - 5 * 24 * 60 * 60 * 1000),
  },
];

const exampleInvitations: TeamInvitation[] = [
  {
    id: "inv-1",
    email: "new@example.com",
    role: "member",
    status: "pending",
    invitedBy: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
    },
    expiresAt: new Date(initialTimestamp + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(initialTimestamp - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "inv-2",
    link: "https://app.example.com/join/abc123xyz",
    role: "admin",
    status: "pending",
    invitedBy: {
      name: "Mike Chen",
      email: "mike@example.com",
    },
    expiresAt: new Date(initialTimestamp + 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(initialTimestamp - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "inv-3",
    email: "accepted@example.com",
    role: "member",
    status: "accepted",
    invitedBy: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
    },
    createdAt: new Date(initialTimestamp - 5 * 24 * 60 * 60 * 1000),
    acceptedAt: new Date(initialTimestamp - 4 * 24 * 60 * 60 * 1000),
  },
];

const exampleActivities: ActivityEntry[] = [
  {
    id: "activity-1",
    type: "member_joined",
    user: {
      id: "user-1",
      name: "Sarah Johnson",
      avatar: getAvatarUrl("Sarah Johnson"),
    },
    description: "joined the team",
    timestamp: new Date(initialTimestamp - 2 * 60 * 60 * 1000),
  },
  {
    id: "activity-2",
    type: "ai_session_created",
    user: {
      id: "user-2",
      name: "Mike Chen",
      avatar: getAvatarUrl("Mike Chen"),
    },
    description: "created a new AI session",
    timestamp: new Date(initialTimestamp - 3 * 60 * 60 * 1000),
    projectId: "project-1",
    projectName: "Website Redesign",
  },
  {
    id: "activity-3",
    type: "file_uploaded",
    user: {
      id: "user-3",
      name: "Emily Davis",
      avatar: getAvatarUrl("Emily Davis"),
    },
    description: "uploaded project-plan.pdf",
    timestamp: new Date(initialTimestamp - 5 * 60 * 60 * 1000),
    projectId: "project-1",
    projectName: "Website Redesign",
  },
  {
    id: "activity-4",
    type: "note_created",
    user: {
      id: "user-1",
      name: "Sarah Johnson",
      avatar: getAvatarUrl("Sarah Johnson"),
    },
    description: "created a new note: Sprint Planning Notes",
    timestamp: new Date(initialTimestamp - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "activity-5",
    type: "project_created",
    user: {
      id: "user-2",
      name: "Mike Chen",
      avatar: getAvatarUrl("Mike Chen"),
    },
    description: "created project: Website Redesign",
    timestamp: new Date(initialTimestamp - 30 * 24 * 60 * 60 * 1000),
    projectId: "project-1",
    projectName: "Website Redesign",
  },
  {
    id: "activity-6",
    type: "chat_message",
    user: {
      id: "user-3",
      name: "Emily Davis",
      avatar: getAvatarUrl("Emily Davis"),
    },
    description: "sent a message in team chat",
    timestamp: new Date(initialTimestamp - 30 * 60 * 1000),
  },
];

const exampleChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    content: "Hey team! Let's discuss the new feature",
    author: {
      id: "user-1",
      name: "Sarah Johnson",
      avatar: getAvatarUrl("Sarah Johnson"),
    },
    timestamp: new Date(initialTimestamp - 30 * 60 * 1000),
  },
  {
    id: "msg-2",
    content: "I think we should use @ai to help us brainstorm",
    author: {
      id: "user-2",
      name: "Mike Chen",
      avatar: getAvatarUrl("Mike Chen"),
    },
    timestamp: new Date(initialTimestamp - 25 * 60 * 1000),
    isAIMention: true,
  },
];

const exampleAIMessages: AIMessage[] = [
  {
    id: "ai-msg-1",
    role: "user",
    content: "What are the best practices for React components?",
    author: {
      id: "user-1",
      name: "Sarah Johnson",
      avatar: getAvatarUrl("Sarah Johnson"),
    },
    timestamp: new Date(initialTimestamp - 10 * 60 * 1000),
  },
  {
    id: "ai-msg-2",
    role: "assistant",
    content:
      "Here are some best practices for React components:\n\n1. **Single Responsibility**: Each component should have one clear purpose\n2. **Composition over Inheritance**: Build complex UIs from simple components\n3. **Props Validation**: Use TypeScript or PropTypes\n4. **Avoid Prop Drilling**: Use Context API for deeply nested data\n5. **Memoization**: Use React.memo() and useMemo() wisely",
    timestamp: new Date(initialTimestamp - 9 * 60 * 1000),
  },
];

const exampleFiles: TeamFile[] = [
  {
    id: "file-1",
    name: "project-plan.pdf",
    type: "application/pdf",
    size: 2.5 * 1024 * 1024,
    uploadedBy: {
      id: "user-1",
      name: "Sarah Johnson",
      avatar: getAvatarUrl("Sarah Johnson"),
    },
    uploadedAt: new Date(initialTimestamp - 2 * 24 * 60 * 60 * 1000),
    aiAccessible: true,
    tags: ["planning", "project"],
  },
  {
    id: "file-2",
    name: "design-mockups.png",
    type: "image/png",
    size: 1.2 * 1024 * 1024,
    uploadedBy: {
      id: "user-2",
      name: "Mike Chen",
      avatar: getAvatarUrl("Mike Chen"),
    },
    uploadedAt: new Date(initialTimestamp - 1 * 24 * 60 * 60 * 1000),
    tags: ["design"],
  },
  {
    id: "file-3",
    name: "requirements.txt",
    type: "text/plain",
    size: 45 * 1024,
    uploadedBy: {
      id: "user-3",
      name: "Emily Davis",
      avatar: getAvatarUrl("Emily Davis"),
    },
    uploadedAt: new Date(initialTimestamp - 12 * 60 * 60 * 1000),
    aiAccessible: true,
    tags: ["code", "requirements"],
  },
  {
    id: "file-4",
    name: "presentation.pptx",
    type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    size: 5.8 * 1024 * 1024,
    uploadedBy: {
      id: "user-1",
      name: "Sarah Johnson",
      avatar: getAvatarUrl("Sarah Johnson"),
    },
    uploadedAt: new Date(initialTimestamp - 3 * 24 * 60 * 60 * 1000),
    tags: ["presentation"],
  },
];

const exampleNotes: TeamNote[] = [
  {
    id: "note-1",
    title: "Sprint Planning Notes",
    content:
      "Key decisions from today's sprint planning meeting:\n\n1. Focus on user authentication flow\n2. Complete API integration by Friday\n3. Design review scheduled for next week",
    author: {
      id: "user-1",
      name: "Sarah Johnson",
      avatar: getAvatarUrl("Sarah Johnson"),
    },
    tags: ["sprint", "planning"],
    aiSummary:
      "Meeting notes covering sprint priorities including authentication work, API integration deadline, and upcoming design review.",
    createdAt: new Date(initialTimestamp - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(initialTimestamp - 1 * 24 * 60 * 60 * 1000),
    participants: [
      {
        id: "user-1",
        name: "Sarah Johnson",
        avatar: getAvatarUrl("Sarah Johnson"),
      },
      { id: "user-2", name: "Mike Chen", avatar: getAvatarUrl("Mike Chen") },
      {
        id: "user-3",
        name: "Emily Davis",
        avatar: getAvatarUrl("Emily Davis"),
      },
    ],
  },
  {
    id: "note-2",
    title: "API Documentation",
    content: "Updated API endpoints and authentication methods...",
    author: {
      id: "user-2",
      name: "Mike Chen",
      avatar: getAvatarUrl("Mike Chen"),
    },
    tags: ["api", "documentation"],
    createdAt: new Date(initialTimestamp - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(initialTimestamp - 1 * 24 * 60 * 60 * 1000),
    lastEditedBy: {
      id: "user-1",
      name: "Sarah Johnson",
    },
  },
];

const exampleProjects: TeamProject[] = [
  {
    id: "project-1",
    name: "Website Redesign",
    description: "Complete redesign of company website",
    color: "#3b82f6",
    members: exampleMembers.slice(0, 3),
    defaultModel: "gpt-4",
    aiUsage: {
      tokens: 250_000,
      sessions: 89,
    },
    createdAt: new Date(initialTimestamp - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(initialTimestamp - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "project-2",
    name: "Mobile App",
    description: "New mobile application development",
    color: "#10b981",
    members: exampleMembers.slice(1, 4),
    defaultModel: "claude-3-opus",
    aiUsage: {
      tokens: 180_000,
      sessions: 65,
    },
    createdAt: new Date(initialTimestamp - 20 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(initialTimestamp - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "project-3",
    name: "API Integration",
    description: "Third-party API integrations",
    color: "#f59e0b",
    members: exampleMembers.slice(0, 2),
    defaultModel: "gpt-3.5-turbo",
    aiUsage: {
      tokens: 95_000,
      sessions: 42,
    },
    createdAt: new Date(initialTimestamp - 15 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(initialTimestamp - 3 * 24 * 60 * 60 * 1000),
  },
];

const examplePrompts: TeamPrompt[] = [
  {
    id: "prompt-1",
    title: "Code Review Assistant",
    prompt:
      "Review this code and provide suggestions for improvement. Focus on performance, readability, and best practices.",
    description: "Helps with code reviews and improvements",
    category: "Code",
    author: {
      id: "user-1",
      name: "Sarah Johnson",
      avatar: getAvatarUrl("Sarah Johnson"),
    },
    rating: 4.5,
    usageCount: 45,
    bestModel: "gpt-4",
    tags: ["code", "review", "best-practices"],
    createdAt: new Date(initialTimestamp - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(initialTimestamp - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: "prompt-2",
    title: "Blog Post Writer",
    prompt:
      "Write a comprehensive blog post about {topic}. Include an introduction, main points, and conclusion.",
    description: "Generate well-structured blog posts",
    category: "Writing",
    author: {
      id: "user-2",
      name: "Mike Chen",
      avatar: getAvatarUrl("Mike Chen"),
    },
    rating: 4.8,
    usageCount: 32,
    bestModel: "claude-3-opus",
    tags: ["writing", "blog", "content"],
    tone: "professional",
    createdAt: new Date(initialTimestamp - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(initialTimestamp - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "prompt-3",
    title: "Data Analysis",
    prompt: "Analyze the following data and provide key insights: {data}",
    description: "Deep dive into data analysis",
    category: "Analysis",
    author: {
      id: "user-3",
      name: "Emily Davis",
      avatar: getAvatarUrl("Emily Davis"),
    },
    rating: 4.2,
    usageCount: 28,
    bestModel: "gpt-4",
    tags: ["analysis", "data", "insights"],
    createdAt: new Date(initialTimestamp - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(initialTimestamp - 3 * 24 * 60 * 60 * 1000),
  },
];

const exampleNotifications: TeamNotification[] = [
  {
    id: "notif-1",
    type: "mention",
    title: "You were mentioned",
    message: "Mike Chen mentioned you in a chat message",
    user: {
      id: "user-2",
      name: "Mike Chen",
      avatar: getAvatarUrl("Mike Chen"),
    },
    read: false,
    timestamp: new Date(initialTimestamp - 10 * 60 * 1000),
    link: "#chat",
  },
  {
    id: "notif-2",
    type: "ai_event",
    title: "AI Session Completed",
    message:
      "Your AI session in Website Redesign project has finished processing",
    read: false,
    timestamp: new Date(initialTimestamp - 30 * 60 * 1000),
    link: "#ai-room",
  },
  {
    id: "notif-3",
    type: "file_shared",
    title: "File Shared",
    message: "Sarah Johnson shared project-plan.pdf with you",
    user: {
      id: "user-1",
      name: "Sarah Johnson",
      avatar: getAvatarUrl("Sarah Johnson"),
    },
    read: true,
    timestamp: new Date(initialTimestamp - 2 * 60 * 60 * 1000),
    link: "#files",
  },
  {
    id: "notif-4",
    type: "member_joined",
    title: "New Team Member",
    message: "Alex Rodriguez joined the team",
    user: {
      id: "user-4",
      name: "Alex Rodriguez",
      avatar: getAvatarUrl("Alex Rodriguez"),
    },
    read: true,
    timestamp: new Date(initialTimestamp - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "notif-5",
    type: "note_updated",
    title: "Note Updated",
    message: "Sprint Planning Notes was updated by Sarah Johnson",
    user: {
      id: "user-1",
      name: "Sarah Johnson",
      avatar: getAvatarUrl("Sarah Johnson"),
    },
    read: false,
    timestamp: new Date(initialTimestamp - 3 * 60 * 60 * 1000),
    link: "#notes",
  },
];

export default function TeamPreview() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <TeamDashboard
          members={exampleMembers.slice(0, 4).map((m) => ({
            id: m.id,
            name: m.name,
            avatar: m.avatar,
            role: m.role,
            status:
              m.status === "active"
                ? "active"
                : ("offline" as "active" | "away" | "offline"),
          }))}
          plan="pro"
          recentActivities={exampleActivities
            .filter(
              (a) =>
                a.type === "member_joined" ||
                a.type === "ai_session_created" ||
                a.type === "file_uploaded" ||
                a.type === "note_created"
            )
            .map((a) => ({
              id: a.id,
              type:
                a.type === "ai_session_created"
                  ? "ai_session"
                  : a.type === "member_joined"
                    ? "member_joined"
                    : a.type === "file_uploaded"
                      ? "file_uploaded"
                      : ("note_created" as
                          | "member_joined"
                          | "ai_session"
                          | "file_uploaded"
                          | "note_created"),
              user: {
                name: a.user.name,
                avatar: a.user.avatar,
              },
              description: a.description,
              timestamp: a.timestamp,
            }))}
          teamName="Acme Inc."
          usage={{
            aiTokens: { used: 250_000, limit: 1_000_000 },
            storage: {
              used: 15 * 1024 * 1024 * 1024,
              limit: 100 * 1024 * 1024 * 1024,
            },
            members: { current: 12, limit: 50 },
          }}
        />
        <TeamMemberList
          currentUserId="member-1"
          members={exampleMembers}
          onDemote={async (memberId) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Demote member:", memberId);
          }}
          onPromote={async (memberId) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Promote member:", memberId);
          }}
          onRemove={async (memberId) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Remove member:", memberId);
          }}
          onResendInvite={async (memberId) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Resend invite:", memberId);
          }}
          showUsage
        />
        <TeamInvitations
          invitations={exampleInvitations}
          onCopyLink={async (link) => {
            await new Promise((resolve) => setTimeout(resolve, 200));
            console.log("Copy link:", link);
          }}
          onCreate={async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Create invitation:", data);
            return {
              id: `inv-${Date.now()}`,
              email: data.email,
              role: data.role,
              status: "pending" as const,
              invitedBy: {
                name: "Sarah Johnson",
                email: "sarah@example.com",
              },
              expiresAt: data.expiresInDays
                ? new Date(
                    Date.now() + data.expiresInDays * 24 * 60 * 60 * 1000
                  )
                : undefined,
              createdAt: new Date(),
            };
          }}
          onResend={async (invitationId) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Resend invitation:", invitationId);
          }}
          onRevoke={async (invitationId) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Revoke invitation:", invitationId);
          }}
        />
        <TeamPermissionsMatrix />
        <TeamSettings
          plan="pro"
          settings={{
            name: "Acme Inc.",
            description: "A modern software company",
            slug: "acme-inc",
            color: "#3b82f6",
            defaultModel: "gpt-4",
          }}
        />
        <TeamPromptLibrary
          currentUserId="user-1"
          onCreate={async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Create prompt:", data);
            return {
              id: `prompt-${Date.now()}`,
              title: data.title,
              prompt: data.prompt,
              description: data.description,
              category: data.category,
              tags: data.tags,
              author: {
                id: "user-1",
                name: "Sarah Johnson",
              },
              bestModel: data.bestModel,
              tone: data.tone,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
          }}
          onDelete={async (promptId) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Delete prompt:", promptId);
          }}
          onFavorite={async (promptId, isFavorite) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Toggle favorite:", promptId, isFavorite);
          }}
          onUpdate={async (promptId, data) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Update prompt:", promptId, data || {});
          }}
          onUse={(prompt) => {
            console.log("Use prompt:", prompt);
          }}
          prompts={examplePrompts}
        />
      </div>
      <div className="flex flex-col gap-8">
        <TeamSwitcher currentTeamId="team-1" teams={exampleTeams} />
        <TeamChat currentUserId="user-1" messages={exampleChatMessages} />
        <TeamAIRoom
          currentUserId="user-1"
          messages={exampleAIMessages}
          participants={exampleMembers.slice(0, 3).map((m) => ({
            id: m.id,
            name: m.name,
            avatar: m.avatar,
          }))}
          roomName="Shared AI Workspace"
        />
        <TeamFiles
          files={exampleFiles}
          onDelete={async (fileId) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Delete file:", fileId);
          }}
          onDownload={async (fileId) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Download file:", fileId);
          }}
          onToggleAIAccess={async (fileId, enabled) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Toggle AI access:", fileId, enabled);
          }}
          onUpload={async (files) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Upload files:", files);
          }}
        />
        <TeamNotes
          currentUserId="user-1"
          notes={exampleNotes}
          onCreate={async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Create note:", data);
            return {
              id: `note-${Date.now()}`,
              title: data.title,
              content: data.content,
              author: {
                id: "user-1",
                name: "Sarah Johnson",
              },
              tags: data.tags,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
          }}
          onDelete={async (noteId) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Delete note:", noteId);
          }}
          onSummarize={async (noteId) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Summarize note:", noteId);
            return "This is an AI-generated summary of the note content.";
          }}
          onUpdate={async (noteId, data) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Update note:", noteId, data);
          }}
        />
        <TeamActivityFeed activities={exampleActivities} />
        <TeamAnalytics
          memberUsage={exampleMembers.map((m) => ({
            id: m.id,
            name: m.name,
            avatar: m.avatar,
            tokens: m.aiUsage?.tokens || 0,
            sessions: m.aiUsage?.sessions || 0,
            files: 0,
          }))}
          sessionCount={{
            current: 145,
            previous: 120,
          }}
          tokenUsage={{
            current: 250_000,
            previous: 200_000,
          }}
          topProjects={exampleProjects.map((p) => ({
            id: p.id,
            name: p.name,
            usage: p.aiUsage?.tokens || 0,
          }))}
        />
        <TeamNotifications
          notifications={exampleNotifications}
          unreadCount={3}
        />
        <TeamProjects
          currentUserId="user-1"
          onCreate={async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Create project:", data);
            return {
              id: `project-${Date.now()}`,
              name: data.name,
              description: data.description,
              color: data.color || "#3b82f6",
              members: [],
              defaultModel: data.defaultModel,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
          }}
          onDelete={async (projectId) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Delete project:", projectId);
          }}
          onSelect={(projectId) => {
            console.log("Select project:", projectId);
          }}
          onUpdate={async (projectId, data) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Update project:", projectId, data || {});
          }}
          projects={exampleProjects}
        />
      </div>
    </div>
  );
}

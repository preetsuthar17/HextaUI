import type { ProBlock } from "@/lib/pro/catalog"

const proBlockTitles: Record<string, string> = {
  "agent-todos": "AI Agent Plan & Todo List block for React & shadcn/ui",
  "api-keys": "API Keys Settings Page block for React & shadcn/ui",
  appearance: "Appearance Settings block for React & shadcn/ui",
  artifact: "AI Artifact Preview Panel for React & shadcn/ui",
  billing: "Billing & Usage Page block for React & shadcn/ui",
  "chat-sidebar": "AI Chat Sidebar block for React & shadcn/ui",
  "chat-thread": "AI Chat Thread block for React & shadcn/ui",
  "code-block": "AI Code Block with streaming highlighting for React",
  "diff-review": "AI Code Diff Review block for React & shadcn/ui",
  "hexta-ai": "HextaAI: complete AI chat app template for React",
  markdown: "Streaming Markdown for AI chat in React & shadcn/ui",
  models: "AI Model Settings block for React & shadcn/ui",
  notifications: "Notification Settings block for React & shadcn/ui",
  profile: "Profile Settings block for React & shadcn/ui",
  "prompt-input": "Prompt Input: AI chat input for React & shadcn/ui",
  security: "Security & Sessions Settings for React & shadcn/ui",
  settings: "AI Product Settings Page block for React & shadcn/ui",
  "stack-trace": "AI Stack Trace and error view for React & shadcn/ui",
  streaming: "Streaming Text for AI responses in React & shadcn/ui",
  subagents: "AI Subagents UI block for React & shadcn/ui",
  team: "Team Members & Invites block for React & shadcn/ui",
  "test-results": "AI Test Results UI block for React & shadcn/ui",
  thinking: "AI Thinking & Reasoning block for React & shadcn/ui",
  "tool-calls": "AI Tool Calls UI block for React & shadcn/ui",
  "voice-mode": "AI Voice Mode UI block for React & shadcn/ui",
}

function getProBlockTitle(block: Pick<ProBlock, "name" | "title">) {
  return (
    proBlockTitles[block.name] ?? `${block.title} block for React & shadcn/ui`
  )
}

export { getProBlockTitle, proBlockTitles }

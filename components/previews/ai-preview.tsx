"use client";

import { useMemo, useState } from "react";
import AIChatHistory, {
  type Conversation,
} from "@/components/blocks/ai/ai-chat-history";
import AICitations, {
  type Citation,
} from "@/components/blocks/ai/ai-citations";
import AIConversation, {
  type Message,
} from "@/components/blocks/ai/ai-conversation";
import AIErrorHandler, {
  type AIError,
} from "@/components/blocks/ai/ai-error-handler";
import AIFileUpload, {
  type UploadedFile,
} from "@/components/blocks/ai/ai-file-upload";
import AIMessage from "@/components/blocks/ai/ai-message";
import AIModelSelector from "@/components/blocks/ai/ai-model-selector";
import AIPromptInput from "@/components/blocks/ai/ai-prompt-input";
import AIPromptTemplates, {
  type PromptTemplate,
} from "@/components/blocks/ai/ai-prompt-templates";
import AISettingsPanel, {
  type AISettings,
  type AISettingsPreset,
} from "@/components/blocks/ai/ai-settings-panel";
import AIStreamingResponse from "@/components/blocks/ai/ai-streaming-response";
import AISuggestedPrompts, {
  type SuggestedPrompt,
} from "@/components/blocks/ai/ai-suggested-prompts";
import AIThinking from "@/components/blocks/ai/ai-thinking";
import AIUsageQuota, {
  type Quota,
  type RateLimit,
  type TokenUsage,
} from "@/components/blocks/ai/ai-usage-quota";

const exampleMessage = `
# Welcome to HextaUI

HextaUI is a modern UI component library for Next.js applications. Here's what makes it great:

## Features

- **Copy & Paste Components**: Just copy the code and use it directly
- **Fully Customizable**: Built with Tailwind CSS for easy customization
- **Type-Safe**: Full TypeScript support
- **Accessible**: Built with accessibility in mind

## Code Example

Here's a simple example using React:

\`\`\`tsx
import { Button } from "@/components/ui/button";

export function MyComponent() {
  return (
    <Button onClick={() => alert("Hello!")}>
      Click me
    </Button>
  );
}
\`\`\`

## Lists

1. First item
2. Second item
3. Third item

- Unordered item
- Another item

## Links

Check out the [documentation](https://hexta-ui.com) for more examples.

> This is a blockquote showing important information.

\`\`\`bash
npm install hexta-ui
\`\`\`

That's it! You're ready to build amazing UIs.`;

const conversationMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "What is HextaUI?",
    timestamp: new Date(),
  },
  {
    id: "2",
    role: "assistant",
    content:
      "HextaUI is a modern UI component library for Next.js applications. It provides a collection of **copy-paste components** that you can use directly in your projects.",
    timestamp: new Date(),
  },
  {
    id: "3",
    role: "user",
    content: "How do I install it?",
    timestamp: new Date(),
  },
  {
    id: "4",
    role: "assistant",
    content: `You can install HextaUI components by copying the code directly from the website. There's also a CLI tool available:

\`\`\`bash
npm install -g hexta-ui
hexta-ui add button
\`\`\`

The components are built with **Tailwind CSS** and **TypeScript**, so they're fully customizable and type-safe.`,
    timestamp: new Date(),
  },
  {
    id: "5",
    role: "user",
    content: "Can I customize the components?",
    timestamp: new Date(),
  },
  {
    id: "6",
    role: "assistant",
    content: `Absolutely! Since the components are just React code that you copy into your project, you have full control to customize them however you want.

You can:
- Modify the Tailwind classes
- Change the component structure
- Add new features
- Adjust styling to match your design system

The components are designed to be a starting point that you can adapt to your needs.`,
    timestamp: new Date(),
  },
];

const streamingContent = `
# Streaming Response

This is a demonstration of real-time token-by-token streaming. The component processes content and displays it word by word for a natural reading experience.

## Features

- **Typewriter Effect**: Words appear one at a time for a smooth reading experience
- **Smart Delays**: Longer pauses after punctuation and paragraph breaks for natural pacing
- **Automatic Streaming**: Content streams automatically with natural timing

## Code Example

Here's how to use the component:

\`\`\`tsx
import AIStreamingResponse from "@/components/blocks/ai/ai-streaming-response";

const content = "This is a full paragraph that will be streamed token by token.";

<AIStreamingResponse
  content={content}
  onComplete={() => console.log("Streaming complete")}
  autoStart={true}
/>
\`\`\`

## How It Works

The component takes full text content and automatically splits it into tokens (words and punctuation). It then streams each token with appropriate delays based on punctuation and paragraph breaks. This creates a natural, readable streaming experience.

The component handles all the streaming logic automatically, respecting user preferences for reduced motion.`;

// Example usage data
const exampleTokenUsage: TokenUsage = {
  input: 125_000,
  output: 89_000,
  total: 214_000,
};

const exampleRateLimit: RateLimit = {
  remaining: 42,
  limit: 100,
  resetAt: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
  window: "hour",
};

const exampleQuota: Quota = {
  used: 8_500_000,
  limit: 10_000_000,
  resetAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  period: "month",
};

// Example citations data
const exampleCitations: Citation[] = [
  {
    id: "citation-1",
    number: 1,
    text: "React component patterns",
    sources: [
      {
        id: "source-1",
        title: "React Component Patterns - Best Practices",
        url: "https://react.dev/learn/thinking-in-react",
        domain: "react.dev",
        snippet:
          "Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.",
        author: "React Team",
        publishedAt: new Date("2024-01-15"),
        type: "web",
      },
    ],
  },
  {
    id: "citation-2",
    number: 2,
    text: "Accessibility guidelines",
    sources: [
      {
        id: "source-2",
        title: "Web Content Accessibility Guidelines (WCAG) 2.2",
        url: "https://www.w3.org/WAI/WCAG22/quickref/",
        domain: "w3.org",
        snippet:
          "WCAG 2.2 provides a wide range of recommendations for making Web content more accessible.",
        author: "W3C",
        publishedAt: new Date("2023-10-05"),
        type: "document",
      },
      {
        id: "source-3",
        title: "ARIA Authoring Practices Guide",
        url: "https://www.w3.org/WAI/ARIA/apg/",
        domain: "w3.org",
        snippet:
          "The ARIA Authoring Practices Guide (APG) provides patterns, examples, and guidance for creating accessible web experiences.",
        author: "W3C",
        publishedAt: new Date("2024-02-20"),
        type: "document",
      },
    ],
  },
  {
    id: "citation-3",
    number: 3,
    text: "Tailwind CSS utility-first approach",
    sources: [
      {
        id: "source-4",
        title: "Tailwind CSS Documentation - Utility-First Fundamentals",
        url: "https://tailwindcss.com/docs/utility-first",
        domain: "tailwindcss.com",
        snippet:
          "Tailwind CSS is a utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
        author: "Tailwind Labs",
        publishedAt: new Date("2024-03-10"),
        type: "web",
      },
    ],
  },
  {
    id: "citation-4",
    number: 4,
    sources: [
      {
        id: "source-5",
        title: "TypeScript Handbook - Advanced Types",
        url: "https://www.typescriptlang.org/docs/handbook/2/types-from-types.html",
        domain: "typescriptlang.org",
        snippet:
          "TypeScript's type system is very powerful because it allows you to express types in terms of other types.",
        author: "TypeScript Team",
        publishedAt: new Date("2024-01-08"),
        type: "web",
      },
      {
        id: "source-6",
        title: "Next.js Documentation - TypeScript",
        url: "https://nextjs.org/docs/app/building-your-application/configuring/typescript",
        domain: "nextjs.org",
        snippet:
          "Next.js provides an integrated TypeScript experience out of the box, similar to an IDE.",
        author: "Vercel",
        publishedAt: new Date("2024-02-15"),
        type: "web",
      },
    ],
  },
];

export default function AIPreview() {
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4o");
  const [activeConversationId, setActiveConversationId] =
    useState<string>("conv-1");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [aiSettings, setAiSettings] = useState<AISettings>({
    temperature: 0.7,
    maxTokens: 2000,
    topP: 1.0,
    topK: 40,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
    systemPrompt: "",
    model: "gpt-4",
  });

  const [initialTimestamp] = useState(() => Date.now());

  const exampleConversations: Conversation[] = useMemo(() => {
    const now = initialTimestamp;
    return [
      {
        id: "conv-1",
        title: "React Component Patterns",
        lastMessage: "How do I create reusable components?",
        lastMessageAt: new Date(now),
        messageCount: 12,
        isActive: true,
      },
      {
        id: "conv-2",
        title: "TypeScript Best Practices",
        lastMessage: "What are the benefits of using TypeScript?",
        lastMessageAt: new Date(now - 2 * 60 * 60 * 1000),
        messageCount: 8,
      },
      {
        id: "conv-3",
        title: "Tailwind CSS Tips",
        lastMessage: "How to create custom utilities?",
        lastMessageAt: new Date(now - 24 * 60 * 60 * 1000),
        messageCount: 15,
      },
      {
        id: "conv-4",
        title: "Next.js App Router",
        lastMessage: "Server components vs client components",
        lastMessageAt: new Date(now - 3 * 24 * 60 * 60 * 1000),
        messageCount: 6,
      },
    ];
  }, [initialTimestamp]);

  const exampleSuggestedPrompts: SuggestedPrompt[] = [
    {
      id: "prompt-1",
      title: "Write a blog post",
      prompt: "Write a comprehensive blog post about [topic]",
      category: "Writing",
      description: "Generate a well-structured blog post",
      isPopular: true,
      usageCount: 245,
    },
    {
      id: "prompt-2",
      title: "Explain code",
      prompt: "Explain this code snippet: [code]",
      category: "Code",
      description: "Get detailed explanations of code",
      isPopular: true,
      usageCount: 189,
    },
    {
      id: "prompt-3",
      title: "Analyze data",
      prompt: "Analyze this data and provide insights: [data]",
      category: "Analysis",
      description: "Deep dive into data analysis",
      usageCount: 92,
    },
    {
      id: "prompt-4",
      title: "Creative story",
      prompt: "Write a creative short story about [theme]",
      category: "Creative",
      description: "Generate creative narratives",
      isRecent: true,
      usageCount: 67,
    },
    {
      id: "prompt-5",
      title: "Research summary",
      prompt: "Summarize the key findings from this research: [content]",
      category: "Research",
      description: "Create research summaries",
      usageCount: 134,
    },
    {
      id: "prompt-6",
      title: "Code review",
      prompt: "Review this code and suggest improvements: [code]",
      category: "Code",
      description: "Get code review feedback",
      usageCount: 156,
    },
  ];

  const examplePresets: AISettingsPreset[] = [
    {
      id: "preset-1",
      name: "Creative Writing",
      description: "Optimized for creative content",
      settings: {
        temperature: 0.9,
        maxTokens: 3000,
        topP: 0.95,
      },
    },
    {
      id: "preset-2",
      name: "Code Generation",
      description: "Focused and deterministic",
      settings: {
        temperature: 0.2,
        maxTokens: 2000,
        topP: 0.8,
      },
    },
    {
      id: "preset-3",
      name: "Analysis",
      description: "Balanced for analysis tasks",
      settings: {
        temperature: 0.5,
        maxTokens: 2500,
        topP: 0.9,
      },
    },
  ];

  const handleFileSelect = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file, idx) => ({
      id: `file-${Date.now()}-${idx}`,
      file,
      status: "uploading",
      progress: 0,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((uploadedFile) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === uploadedFile.id
              ? {
                  ...f,
                  progress,
                  status: progress >= 100 ? "completed" : "uploading",
                }
              : f
          )
        );
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 200);
    });
  };

  const handleFileRemove = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const exampleError: AIError | null = null; // Set to null to hide by default, can be set to show error

  const examplePromptTemplates: PromptTemplate[] = [
    {
      id: "template-1",
      name: "Blog Post Writer",
      description: "Generate a comprehensive blog post on any topic",
      category: "Writing",
      prompt:
        "Write a detailed blog post about {topic}. Include an introduction, main points, and conclusion.",
      variables: [
        {
          name: "topic",
          label: "Topic",
          placeholder: "e.g., React best practices",
          required: true,
        },
      ],
      isPopular: true,
      usageCount: 342,
      tags: ["blog", "writing", "content"],
    },
    {
      id: "template-2",
      name: "Code Explainer",
      description: "Explain code snippets in detail",
      category: "Code",
      prompt:
        "Explain this code snippet:\n\n{code}\n\nProvide a detailed explanation of what it does, how it works, and any potential improvements.",
      variables: [
        {
          name: "code",
          label: "Code",
          placeholder: "Paste your code here",
          required: true,
        },
      ],
      isPopular: true,
      isFavorite: true,
      usageCount: 289,
      tags: ["code", "explanation", "learning"],
    },
    {
      id: "template-3",
      name: "Data Analysis",
      description: "Analyze data and provide insights",
      category: "Analysis",
      prompt:
        "Analyze the following data and provide key insights:\n\n{data}\n\nFocus on trends, patterns, and actionable recommendations.",
      variables: [
        {
          name: "data",
          label: "Data",
          placeholder: "Paste your data here",
          required: true,
        },
      ],
      usageCount: 156,
      tags: ["analysis", "data", "insights"],
    },
    {
      id: "template-4",
      name: "Creative Story",
      description: "Generate creative short stories",
      category: "Creative",
      prompt:
        "Write a creative short story about {theme}. Make it engaging and original.",
      variables: [
        {
          name: "theme",
          label: "Theme",
          placeholder: "e.g., time travel, friendship",
          required: true,
        },
      ],
      isFavorite: true,
      usageCount: 198,
      tags: ["creative", "story", "fiction"],
    },
    {
      id: "template-5",
      name: "Research Summary",
      description: "Summarize research findings",
      category: "Research",
      prompt:
        "Summarize the key findings from this research:\n\n{content}\n\nHighlight the main points and conclusions.",
      variables: [
        {
          name: "content",
          label: "Research Content",
          placeholder: "Paste research content here",
          required: true,
        },
      ],
      usageCount: 124,
      tags: ["research", "summary", "academic"],
    },
    {
      id: "template-6",
      name: "Email Draft",
      description: "Draft professional emails",
      category: "Business",
      prompt:
        "Draft a professional email about {subject} to {recipient}. Keep it concise and clear.",
      variables: [
        {
          name: "subject",
          label: "Subject",
          placeholder: "e.g., Project update",
          required: true,
        },
        {
          name: "recipient",
          label: "Recipient",
          placeholder: "e.g., team members",
          required: true,
        },
      ],
      usageCount: 267,
      tags: ["email", "business", "communication"],
    },
  ];

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col gap-8 rounded-xl">
        <AIPromptInput />
        <AIChatHistory
          activeConversationId={activeConversationId}
          conversations={exampleConversations}
          onArchive={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Archive conversation:", id);
          }}
          onDelete={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Delete conversation:", id);
          }}
          onNewConversation={() => console.log("New conversation")}
          onRename={async (id, newTitle) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Rename conversation:", id, newTitle);
          }}
          onSelect={(id) => {
            setActiveConversationId(id);
            console.log("Select conversation:", id);
          }}
          onUnarchive={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Unarchive conversation:", id);
          }}
        />
        <AIModelSelector
          onModelSelect={(model) => {
            setSelectedModel(model.id);
            console.log("Selected model:", model);
          }}
          selectedModelId={selectedModel}
        />
        <AIStreamingResponse
          autoStart={true}
          className="rounded-xl border p-4 shadow-xs md:p-6"
          content={streamingContent}
          onComplete={() => console.log("Streaming complete")}
        />
        <AIFileUpload
          acceptedTypes={["image/*", "application/pdf", "text/*"]}
          maxFiles={5}
          maxSize={10 * 1024 * 1024}
          onFileRemove={handleFileRemove}
          onFilesSelected={handleFileSelect}
          processingStatus={{}}
          showPreview={true}
          uploadedFiles={uploadedFiles}
        />
        <AIThinking className="max-w-max" />
      </div>
      {/* Second column: AIConversation */}
      <div className="flex flex-col gap-8">
        <AISuggestedPrompts
          onSelect={(prompt) => console.log("Select prompt:", prompt)}
          prompts={exampleSuggestedPrompts}
          showCategories={true}
          showSearch={true}
        />
        <AIPromptTemplates
          categories={[
            "All",
            "Writing",
            "Code",
            "Analysis",
            "Creative",
            "Research",
            "Business",
          ]}
          onCreate={() => console.log("Create template")}
          onFavorite={async (id, isFavorite) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Favorite template:", id, isFavorite);
          }}
          onSelect={(template, variables) => {
            console.log("Select template:", template, variables);
          }}
          showCategories={true}
          showFavorites={true}
          showSearch={true}
          templates={examplePromptTemplates}
        />

        <AIErrorHandler
          error={exampleError}
          onContactSupport={() => console.log("Contact support")}
          onDismiss={() => console.log("Dismiss error")}
          onRetry={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Retry request");
          }}
          showDetails={true}
        />

        <AIUsageQuota
          onUpgrade={() => console.log("Upgrade clicked")}
          quota={exampleQuota}
          rateLimit={exampleRateLimit}
          showUpgradePrompt={true}
          tokenUsage={exampleTokenUsage}
          upgradeThreshold={80}
        />
      </div>
      <div className="flex flex-col gap-8">
        <AISettingsPanel
          availableModels={[
            "gpt-4",
            "gpt-3.5-turbo",
            "claude-3-opus",
            "claude-3-sonnet",
          ]}
          onDeletePreset={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Delete preset:", id);
          }}
          onLoadPreset={(id) => {
            const preset = examplePresets.find((p) => p.id === id);
            if (preset) {
              setAiSettings(preset.settings);
              console.log("Load preset:", preset.name);
            }
          }}
          onReset={() => {
            setAiSettings({
              temperature: 0.7,
              maxTokens: 2000,
              topP: 1.0,
              topK: 40,
              frequencyPenalty: 0.0,
              presencePenalty: 0.0,
              systemPrompt: "",
              model: "gpt-4",
            });
            console.log("Reset settings");
          }}
          onSave={async (settings) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setAiSettings(settings);
            console.log("Save settings:", settings);
          }}
          onSavePreset={async (name, settings) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log("Save preset:", name, settings);
          }}
          onSettingsChange={(settings) => {
            setAiSettings(settings);
            console.log("Settings changed:", settings);
          }}
          presets={examplePresets}
          settings={aiSettings}
          showAdvanced={false}
        />
        <AIMessage
          className="rounded-xl border p-4 shadow-xs md:p-6"
          content={exampleMessage}
          isStreaming={false}
          onEdit={() => console.log("Edit clicked")}
          onRegenerate={() => console.log("Regenerate clicked")}
        />
        <AICitations
          citations={exampleCitations}
          className="rounded-xl border p-4 shadow-xs md:p-6"
          defaultExpanded={false}
          onSourceClick={(source) => console.log("Source clicked:", source)}
        />
        <AIConversation
          className="shadow-xs"
          isStreaming={false}
          isThinking={false}
          messages={conversationMessages}
          onEdit={(messageId) => console.log("Edit message:", messageId)}
          onRegenerate={(messageId) =>
            console.log("Regenerate message:", messageId)
          }
        />
      </div>
    </div>
  );
}

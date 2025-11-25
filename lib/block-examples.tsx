import { Database, FileText, Image, Video } from "lucide-react";
import type { Conversation } from "@/registry/new-york/blocks/ai/ai-chat-history";
import type { Citation } from "@/registry/new-york/blocks/ai/ai-citations";
import type { Message } from "@/registry/new-york/blocks/ai/ai-conversation";
import type { PromptTemplate } from "@/registry/new-york/blocks/ai/ai-prompt-templates";
import type { AISettings } from "@/registry/new-york/blocks/ai/ai-settings-panel";
import type { SuggestedPrompt } from "@/registry/new-york/blocks/ai/ai-suggested-prompts";
import type {
  Quota,
  RateLimit,
  TokenUsage,
} from "@/registry/new-york/blocks/ai/ai-usage-quota";
import type { Session } from "@/registry/new-york/blocks/auth/auth-session-manager";
import type { InvoiceDetails } from "@/registry/new-york/blocks/billing/billing-invoice-details";
import type { Invoice } from "@/registry/new-york/blocks/billing/billing-invoice-list";
import type { PaymentMethod } from "@/registry/new-york/blocks/billing/billing-payment-method";
import type { SelectablePlan } from "@/registry/new-york/blocks/billing/billing-plan-selector";
import type { PricingPlan } from "@/registry/new-york/blocks/billing/billing-pricing-table";
import type { ProfileData } from "@/registry/new-york/blocks/settings/settings-profile";

export function getBlockExampleProps(blockId: string): Record<string, any> {
  const now = Date.now();

  switch (blockId) {
    // AI Blocks
    case "ai-chat-history": {
      return {
        conversations: [
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
            title: "Deploying to Vercel",
            lastMessage: "How to set up automatic deployments?",
            lastMessageAt: new Date(now - 6 * 60 * 60 * 1000),
            messageCount: 5,
            isArchived: true,
          },
        ] as Conversation[],
        activeConversationId: "conv-1",
        onSelect: (id: string) => {
          /* example: select conversation logic */
        },
        onNewConversation: () => {
          /* create new conversation */
        },
        onRename: async (id: string, newName: string) => {
          /* rename logic */
        },
        onArchive: async (id: string) => {
          /* archive logic */
        },
        onUnarchive: async (id: string) => {
          /* unarchive logic */
        },
        onDelete: async (id: string) => {
          /* delete logic */
        },
      };
    }
    case "ai-citations": {
      return {
        citations: [
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
                title:
                  "Tailwind CSS Documentation - Utility-First Fundamentals",
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
        ] as Citation[],
        onSourceClick: (sourceId: string) => {
          /* open citation source */
        },
      };
    }
    case "ai-conversation": {
      return {
        messages: [
          {
            id: "1",
            role: "user" as const,
            content: "What is HextaUI?",
            timestamp: new Date(now - 120_000),
          },
          {
            id: "2",
            role: "assistant" as const,
            content:
              "HextaUI is a modern UI component library for Next.js applications.",
            timestamp: new Date(now - 110_000),
          },
          {
            id: "3",
            role: "user" as const,
            content: "Can you show an example usage?",
            timestamp: new Date(now - 100_000),
          },
          {
            id: "4",
            role: "assistant" as const,
            content:
              "Certainly! Here is a simple Card component:\n\n```jsx\n<Card title='Hello'>Example content</Card>\n```\n",
            timestamp: new Date(now - 95_000),
          },
          {
            id: "5",
            role: "user" as const,
            content: "Does it support dark mode?",
            timestamp: new Date(now - 93_000),
          },
          {
            id: "6",
            role: "assistant" as const,
            content:
              "Yes! HextaUI comes with built-in dark mode support out of the box.",
            timestamp: new Date(now - 92_500),
          },
          {
            id: "7",
            role: "user" as const,
            content: "How can I install it?",
            timestamp: new Date(now - 90_000),
          },
          {
            id: "8",
            role: "assistant" as const,
            content:
              "You can install HextaUI using npm:\n\n```sh\nnpm install hextaui\n```\n",
            timestamp: new Date(now - 88_000),
          },
          {
            id: "9",
            role: "user" as const,
            content: "Is it compatible with TypeScript?",
            timestamp: new Date(now - 87_000),
          },
          {
            id: "10",
            role: "assistant" as const,
            content:
              "Absolutely! HextaUI is fully typed and works seamlessly with TypeScript.",
            timestamp: new Date(now - 86_000),
          },
        ] as Message[],
        isStreaming: false,
        isThinking: false,
        onEdit: (id: string) => {
          /* edit message by id */
        },
        onRegenerate: (id: string) => {
          /* regenerate reply for a given id */
        },
      };
    }
    case "ai-error-handler": {
      return {
        error: "Network unreachable. Please check your connection and retry.",
        title: "Network Error",
        onRetry: async () => {
          /* retry logic example */
        },
        onDismiss: () => {
          /* dismiss error panel */
        },
      };
    }
    case "ai-message": {
      return {
        content: `# Welcome to HextaUI

HextaUI is a modern UI component library for Next.js applications. Here's what makes it great:

## Features

- **Copy & Paste Components**: Just copy and use instantly!
- **Fully Customizable**: Tailwind CSS + extensive props
- **Type-Safe**: Full TypeScript support and IDE autocompletion
- **Accessible**: ARIA and keyboard navigation out of the box

## Example Usage

\`\`\`tsx
import { Card } from "hextaui";
<Card title="Demo">Hello World</Card>
\`\`\`
`,
        isStreaming: false,
        onEdit: () => {
          /* edit message */
        },
        onRegenerate: () => {
          /* regenerate message */
        },
      };
    }
    case "ai-model-selector": {
      return {
        models: [
          {
            id: "gpt-4o",
            name: "GPT-4o",
            provider: "openai",
            description: "Most capable model",
            features: ["fast", "multimodal", "long-context"],
          },
          {
            id: "gpt-4o-mini",
            name: "GPT-4o Mini",
            provider: "openai",
            description: "Fast and affordable",
            features: ["fast"],
          },
          {
            id: "gpt-4o-2024-11-20",
            name: "GPT-4o (2024-11-20)",
            provider: "openai",
            description: "Latest GPT-4o snapshot",
            features: ["fast", "multimodal", "long-context"],
          },
          {
            id: "o1",
            name: "o1",
            provider: "openai",
            description: "Advanced reasoning",
            features: ["reasoning"],
          },
          {
            id: "o1-preview",
            name: "o1 Preview",
            provider: "openai",
            description: "Advanced reasoning preview",
            features: ["reasoning"],
            isPreview: true,
          },
          {
            id: "o1-mini",
            name: "o1 Mini",
            provider: "openai",
            description: "Fast reasoning",
            features: ["fast", "reasoning"],
          },
          {
            id: "o1-mini-preview",
            name: "o1 Mini Preview",
            provider: "openai",
            description: "Fast reasoning preview",
            features: ["fast", "reasoning"],
            isPreview: true,
          },
          {
            id: "gpt-4-turbo",
            name: "GPT-4 Turbo",
            provider: "openai",
            description: "High performance model",
            features: ["turbo", "multimodal", "long-context"],
          },
          {
            id: "gpt-4-turbo-preview",
            name: "GPT-4 Turbo Preview",
            provider: "openai",
            description: "Latest GPT-4 Turbo",
            features: ["turbo", "multimodal", "long-context"],
            isPreview: true,
          },
          {
            id: "gpt-4",
            name: "GPT-4",
            provider: "openai",
            description: "Original GPT-4 model",
            features: ["multimodal", "long-context"],
          },
          {
            id: "gpt-4-32k",
            name: "GPT-4 32K",
            provider: "openai",
            description: "GPT-4 with extended context",
            features: ["long-context"],
          },
          {
            id: "gpt-3.5-turbo",
            name: "GPT-3.5 Turbo",
            provider: "openai",
            description: "Fast and efficient",
            features: ["turbo"],
          },
          {
            id: "gpt-3.5-turbo-16k",
            name: "GPT-3.5 Turbo 16K",
            provider: "openai",
            description: "GPT-3.5 with extended context",
            features: ["turbo", "long-context"],
          },
          {
            id: "claude-4-opus",
            name: "Claude 4 Opus",
            provider: "anthropic",
            description: "Most capable model",
            features: ["reasoning", "multimodal", "long-context"],
            isPreview: true,
          },
          {
            id: "claude-4-sonnet",
            name: "Claude 4 Sonnet",
            provider: "anthropic",
            description: "Balanced performance",
            features: ["fast", "multimodal", "long-context"],
            isPreview: true,
          },
          {
            id: "claude-3.5-sonnet",
            name: "Claude 3.5 Sonnet",
            provider: "anthropic",
            description: "Fast and intelligent",
            features: ["fast", "multimodal"],
          },
          {
            id: "claude-3.5-sonnet-20241022",
            name: "Claude 3.5 Sonnet (2024-10-22)",
            provider: "anthropic",
            description: "Latest Claude 3.5 Sonnet",
            features: ["fast", "multimodal"],
          },
          {
            id: "claude-3.5-haiku",
            name: "Claude 3.5 Haiku",
            provider: "anthropic",
            description: "Fastest Claude model",
            features: ["fast", "multimodal"],
          },
          {
            id: "claude-3-opus",
            name: "Claude 3 Opus",
            provider: "anthropic",
            description: "Most powerful model",
            features: ["reasoning", "multimodal", "long-context"],
          },
          {
            id: "claude-3-sonnet",
            name: "Claude 3 Sonnet",
            provider: "anthropic",
            description: "Balanced Claude 3",
            features: ["multimodal", "long-context"],
          },
          {
            id: "claude-3-haiku",
            name: "Claude 3 Haiku",
            provider: "anthropic",
            description: "Fast and cost-effective",
            features: ["fast", "multimodal"],
          },
          {
            id: "claude-3-5-sonnet-20240620",
            name: "Claude 3.5 Sonnet (2024-06-20)",
            provider: "anthropic",
            description: "Claude 3.5 Sonnet snapshot",
            features: ["fast", "multimodal"],
          },
          {
            id: "gemini-2.0-pro",
            name: "Gemini 2.0 Pro",
            provider: "google",
            description: "Advanced capabilities",
            features: ["multimodal", "long-context"],
            isPreview: true,
          },
          {
            id: "gemini-2.0-flash",
            name: "Gemini 2.0 Flash",
            provider: "google",
            description: "Fast Gemini 2.0",
            features: ["fast", "multimodal", "long-context"],
            isPreview: true,
          },
          {
            id: "gemini-1.5-pro",
            name: "Gemini 1.5 Pro",
            provider: "google",
            description: "Multimodal model",
            features: ["multimodal", "long-context"],
          },
          {
            id: "gemini-1.5-pro-latest",
            name: "Gemini 1.5 Pro Latest",
            provider: "google",
            description: "Latest Gemini 1.5 Pro",
            features: ["multimodal", "long-context"],
          },
          {
            id: "gemini-1.5-flash",
            name: "Gemini 1.5 Flash",
            provider: "google",
            description: "Fast and efficient",
            features: ["fast", "multimodal", "long-context"],
          },
          {
            id: "gemini-1.5-flash-8b",
            name: "Gemini 1.5 Flash 8B",
            provider: "google",
            description: "Lightweight Flash model",
            features: ["fast", "multimodal"],
          },
          {
            id: "gemini-1.0-pro",
            name: "Gemini 1.0 Pro",
            provider: "google",
            description: "Original Gemini Pro",
            features: ["multimodal"],
          },
          {
            id: "gemini-ultra",
            name: "Gemini Ultra",
            provider: "google",
            description: "Most capable model",
            features: ["reasoning", "multimodal", "long-context"],
            isPreview: true,
          },
          {
            id: "llama-3.1-405b",
            name: "Llama 3.1 405B",
            provider: "meta",
            description: "Open source model",
            features: ["long-context"],
          },
          {
            id: "llama-3.1-70b",
            name: "Llama 3.1 70B",
            provider: "meta",
            description: "Balanced performance",
            features: ["fast", "long-context"],
          },
          {
            id: "llama-3.1-8b",
            name: "Llama 3.1 8B",
            provider: "meta",
            description: "Lightweight model",
            features: ["fast"],
          },
          {
            id: "llama-3.2",
            name: "Llama 3.2",
            provider: "meta",
            description: "Latest open source",
            features: ["fast"],
            isNew: true,
          },
          {
            id: "llama-3.2-3b",
            name: "Llama 3.2 3B",
            provider: "meta",
            description: "Ultra-lightweight",
            features: ["fast"],
            isNew: true,
          },
          {
            id: "llama-3.2-1b",
            name: "Llama 3.2 1B",
            provider: "meta",
            description: "Smallest Llama model",
            features: ["fast"],
            isNew: true,
          },
          {
            id: "llama-3-70b",
            name: "Llama 3 70B",
            provider: "meta",
            description: "Llama 3 base model",
            features: ["fast"],
          },
          {
            id: "llama-3-8b",
            name: "Llama 3 8B",
            provider: "meta",
            description: "Llama 3 lightweight",
            features: ["fast"],
          },
          {
            id: "mistral-large",
            name: "Mistral Large",
            provider: "mistral",
            description: "High performance",
            features: ["fast", "long-context"],
          },
          {
            id: "mistral-large-2407",
            name: "Mistral Large 2407",
            provider: "mistral",
            description: "Mistral Large snapshot",
            features: ["fast", "long-context"],
          },
          {
            id: "mistral-large-2402",
            name: "Mistral Large 2402",
            provider: "mistral",
            description: "Mistral Large snapshot",
            features: ["fast", "long-context"],
          },
          {
            id: "mistral-medium",
            name: "Mistral Medium",
            provider: "mistral",
            description: "Balanced capabilities",
            features: ["fast"],
          },
          {
            id: "mistral-small",
            name: "Mistral Small",
            provider: "mistral",
            description: "Fast and efficient",
            features: ["fast"],
          },
          {
            id: "mistral-small-2402",
            name: "Mistral Small 2402",
            provider: "mistral",
            description: "Mistral Small snapshot",
            features: ["fast"],
          },
          {
            id: "mistral-tiny",
            name: "Mistral Tiny",
            provider: "mistral",
            description: "Ultra-fast model",
            features: ["fast"],
          },
          {
            id: "pixtral-large",
            name: "Pixtral Large",
            provider: "mistral",
            description: "Multimodal vision model",
            features: ["multimodal", "long-context"],
            isNew: true,
          },
          {
            id: "pixtral-12b",
            name: "Pixtral 12B",
            provider: "mistral",
            description: "Efficient vision model",
            features: ["fast", "multimodal"],
            isNew: true,
          },
        ],
        selectedModelId: "gpt-4o",
        onModelSelect: (model: any) => {
          /* select model - receives full model object */
        },
        isLoading: false,
      };
    }

    case "ai-prompt-input": {
      return {
        onSend: (text: string) => {
          /* send prompt logic with value: text */
        },
        placeholder: "Type your prompt here (e.g. Summarize this article)...",
        disabled: false,
        autoFocus: true,
      };
    }
    case "ai-prompt-templates": {
      return {
        templates: [
          {
            id: "template-1",
            name: "Meeting Notes Summarizer",
            description:
              "Summarize meeting notes into key points and action items.",
            category: "Business",
            prompt:
              "Summarize the following meeting notes into concise bullet points and list the action items at the end:\n\n{meetingNotes}\n\nUse clear, professional language.",
            variables: [
              {
                name: "meetingNotes",
                label: "Meeting Notes",
                placeholder: "Paste raw meeting notes here…",
                required: true,
              },
            ],
            usageCount: 217,
            tags: ["summary", "meeting", "action items"],
          },
          {
            id: "template-2",
            name: "Customer Support Reply",
            description:
              "Generate a helpful response to a customer support ticket.",
            category: "Business",
            prompt:
              "Draft a professional and empathetic response to the following customer inquiry:\n\n{customerMessage}\n\nAddress the concerns politely and suggest next steps.",
            variables: [
              {
                name: "customerMessage",
                label: "Customer Message",
                placeholder: "Paste customer inquiry here…",
                required: true,
              },
            ],
            usageCount: 181,
            isFavorite: true,
            tags: ["support", "reply", "email"],
          },
          {
            id: "template-3",
            name: "Bug Report Formatter",
            description: "Format raw bug details into a structured bug report.",
            category: "Code",
            prompt:
              "Format the following bug details into a structured software bug report with steps to reproduce, expected behavior, and actual behavior:\n\n{rawBugDetails}\n\nKeep it clear and concise.",
            variables: [
              {
                name: "rawBugDetails",
                label: "Raw Bug Details",
                placeholder: "Paste or describe the bug here…",
                required: true,
              },
            ],
            usageCount: 95,
            tags: ["bug", "report", "QA"],
          },
          {
            id: "template-4",
            name: "Sales Email Generator",
            description: "Create a persuasive sales outreach email.",
            category: "Business",
            prompt:
              "Write a concise and persuasive sales email to {recipientType} about {productOrService}. Mention key benefits and include a clear call to action.",
            variables: [
              {
                name: "recipientType",
                label: "Recipient Type",
                placeholder: "e.g., decision maker at Acme Corp…",
                required: true,
              },
              {
                name: "productOrService",
                label: "Product/Service",
                placeholder: "e.g., new project management SaaS…",
                required: true,
              },
            ],
            usageCount: 133,
            tags: ["email", "sales", "communication"],
          },
          {
            id: "template-5",
            name: "Git Commit Message Generator",
            description: "Suggest a clear, conventional Git commit message.",
            category: "Code",
            prompt:
              "Given the following code changes summary, suggest a clear and conventional Git commit message following present tense and imperative mood:\n\n{changeSummary}",
            variables: [
              {
                name: "changeSummary",
                label: "Code Change Summary",
                placeholder: "Describe your code change…",
                required: true,
              },
            ],
            usageCount: 154,
            tags: ["git", "commit", "code"],
          },
          {
            id: "template-6",
            name: "Resume Achievement Bullet Generator",
            description:
              "Turn work activity descriptions into measurable resume bullets.",
            category: "Writing",
            prompt:
              "Rewrite the following work activities as impactful resume achievement bullets. Focus on accomplishments and quantify results when possible:\n\n{workDetails}",
            variables: [
              {
                name: "workDetails",
                label: "Work Activities",
                placeholder: "E.g., Managed a project that launched on time…",
                required: true,
              },
            ],
            usageCount: 142,
            tags: ["resume", "career", "writing"],
          },
        ] as PromptTemplate[],
        categories: ["All", "Writing", "Code", "Analysis", "Summarization"],
        onSelect: (templateId: string) => {
          /* select template by id */
        },
        onFavorite: async (id: string, fav: boolean) => {
          /* set/unset favorite */
        },
        onCreate: (tpl: PromptTemplate) => {
          /* create new template */
        },
        showSearch: true,
        showCategories: true,
        showFavorites: true,
      };
    }
    case "ai-settings-panel": {
      return {
        settings: {
          temperature: 0.6,
          maxTokens: 1500,
          topP: 0.9,
          topK: 40,
          frequencyPenalty: 0.1,
          presencePenalty: 0.0,
          systemPrompt:
            "You are an AI assistant that helps answer user questions clearly and helpfully.",
          model: "gpt-3.5-turbo",
        } as AISettings,
        onSettingsChange: (settings: Partial<AISettings>) => {
          console.log("Settings changed:", settings);
        },
        onSave: async (settings: Partial<AISettings>) => {
          console.log("Settings saved:", settings);
        },
        onReset: () => {
          console.log("Settings reset to defaults");
        },
        availableModels: [
          "gpt-3.5-turbo",
          "gpt-4",
          "gpt-4o",
          "claude-3-opus",
          "llama-3-70b",
        ],
        presets: [
          {
            name: "Quick Q&A",
            settings: {
              temperature: 0.3,
              maxTokens: 800,
              model: "gpt-3.5-turbo",
              systemPrompt: "Answer questions briefly and factually.",
            },
          },
          {
            name: "Long-form Assist",
            settings: {
              temperature: 0.8,
              maxTokens: 2500,
              model: "gpt-4",
              systemPrompt: "Provide detailed explanations and full sentences.",
            },
          },
        ],
        onLoadPreset: (presetName: string) => {
          console.log(`Loaded preset: ${presetName}`);
        },
        onSavePreset: async (preset: any) => {
          console.log("Preset saved:", preset);
        },
        onDeletePreset: async (presetName: string) => {
          console.log(`Deleted preset: ${presetName}`);
        },
        showAdvanced: true,
      };
    }
    case "ai-streaming-response": {
      return {
        content: `# Streaming Response

This is a demonstration of real-time token-by-token streaming. The component processes content and displays it word by word for a natural reading experience.

## Features

- **Typewriter Effect**: Words appear one at a time
- **Smart Delays**: Longer pauses after punctuation
- **Automatic Streaming**: Content streams automatically

## Live Example

\`\`\`tsx
<StreamingResponse content="The quick brown fox jumps over the lazy dog." autoStart />
\`\`\`
`,
        autoStart: true,
        onComplete: () => {
          /* streaming completed */
        },
      };
    }
    case "ai-suggested-prompts": {
      return {
        prompts: [
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
            title: "Summarize this article",
            prompt:
              "Summarize the following article in simple terms:\n[ARTICLE TEXT]",
            category: "Summarization",
            description: "Easily shorten academic or technical content.",
            isPopular: false,
            usageCount: 99,
          },
          {
            id: "prompt-3",
            title: "Explain code",
            prompt: "Explain what this code does:\n[CODE]",
            category: "Code",
            description: "Step-by-step explanation for a code block.",
            usageCount: 50,
          },
        ] as SuggestedPrompt[],
        onSelect: (promptId: string) => {
          /* choose prompt */
        },
        showSearch: true,
        showCategories: true,
      };
    }
    case "ai-thinking": {
      return {
        spinner: true,
        message: "Let me think of the best answer...",
      };
    }
    case "ai-usage-quota": {
      return {
        tokenUsage: {
          input: 2150,
          output: 1340,
          total: 3490,
        } as TokenUsage,
        rateLimit: {
          remaining: 12,
          limit: 50,
          resetAt: new Date(Date.now() + 22 * 60 * 1000), // resets in 22 minutes
          window: "hour" as const,
        } as RateLimit,
        quota: {
          used: 45_650,
          limit: 50_000,
          resetAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // resets in 3 days
          period: "month" as const,
        } as Quota,
        showUpgradePrompt: true,
        upgradeThreshold: 75,
        onUpgrade: () => {
          // Redirect to upgrades page or open upgrade modal here
          alert("Upgrade your plan to increase your AI usage quota!");
        },
      };
    }

    // Auth Blocks
    case "auth-login-form": {
      return {
        onSubmit: ({
          email,
          password,
          remember,
        }: {
          email: string;
          password: string;
          remember: boolean;
        }) => {
          /* demo login */
        },
        onSocialLogin: (provider: string) => {
          /* social login */
        },
        showRememberMe: true,
        showSocialLogin: true,
        emailPlaceholder: "your@email.com",
      };
    }
    case "auth-signup-form": {
      return {
        onSubmit: ({
          email,
          password,
          confirm,
        }: {
          email: string;
          password: string;
          confirm: string;
        }) => {
          /* signup logic */
        },
        onSocialLogin: (provider: string) => {
          /* signup with provider */
        },
        showSocialLogin: true,
      };
    }
    case "auth-forgot-password": {
      return {
        onSubmit: ({ email }: { email: string }) => {
          /* send reset link */
        },
        onBackToLogin: () => {
          /* nav back to login */
        },
        emailPlaceholder: "Enter your email address",
      };
    }
    case "auth-reset-password": {
      return {
        onSubmit: ({
          password,
          confirm,
        }: {
          password: string;
          confirm: string;
        }) => {
          /* reset password logic */
        },
        token: "example-token-sent-via-email",
        showPasswordStrength: true,
      };
    }
    case "auth-magic-link": {
      return {
        onSubmit: ({ email }: { email: string }) => {
          /* send magic link */
        },
        onResend: () => {
          /* resend magic link */
        },
        status: "pending" as const,
        infoText: "Check your inbox for a sign-in link.",
      };
    }
    case "auth-otp-verify": {
      return {
        deliveryMethod: "email" as const,
        deliveryAddress: "user@example.com",
        onSubmit: ({ code }: { code: string }) => {
          /* verify otp */
        },
        onResend: () => {
          /* resend code */
        },
      };
    }
    case "auth-phone-verify": {
      return {
        phoneNumber: "+1234567890",
        onSubmit: ({ code }: { code: string }) => {
          /* verify sms */
        },
        onResend: () => {
          /* resend sms */
        },
        status: "pending" as const,
      };
    }
    case "auth-verify-email": {
      return {
        email: "user@example.com",
        status: "pending" as const,
        onResend: () => {
          /* resend email */
        },
        onVerify: () => {
          /* verify email link */
        },
        infoText: "Verification link sent to your email.",
      };
    }
    case "auth-change-password": {
      return {
        onSubmit: ({
          current,
          next,
          confirm,
        }: {
          current: string;
          next: string;
          confirm: string;
        }) => {
          /* change password */
        },
      };
    }
    case "auth-email-change": {
      return {
        currentEmail: "user@example.com",
        onSubmit: ({ newEmail }: { newEmail: string }) => {
          /* change email */
        },
      };
    }
    case "auth-two-factor-setup": {
      return {
        qrUrl: "/static/2fa-qr.png",
        secret: "JFVHK324HKJS",
        onComplete: ({ code }: { code: string }) => {
          /* complete 2fa setup */
        },
      };
    }
    case "auth-two-factor-verify": {
      return {
        onSubmit: ({ code }: { code: string }) => {
          /* verify two-factor code */
        },
      };
    }
    case "auth-recovery-codes": {
      return {
        codes: [
          "173839",
          "572048",
          "208453",
          "983242",
          "567890",
          "450281",
          "143892",
        ],
        onRegenerate: async () => {
          /* regenerate demo codes */
        },
        onDownload: () => {
          /* download demo codes */
        },
        showWarning: true,
      };
    }
    case "auth-session-manager": {
      return {
        sessions: [
          {
            id: "session-1",
            deviceType: "desktop" as const,
            deviceName: "MacBook Pro",
            browser: "Chrome",
            location: "San Francisco, CA",
            lastActive: new Date(now),
            isCurrent: true,
          },
          {
            id: "session-2",
            deviceType: "mobile" as const,
            deviceName: "iPhone 15",
            browser: "Safari",
            location: "New York, NY",
            lastActive: new Date(now - 2 * 60 * 60 * 1000),
            isCurrent: false,
          },
        ] as Session[],
        onRevoke: (id: string) => {
          /* revoke single session */
        },
        onRevokeAll: () => {
          /* revoke all sessions */
        },
      };
    }
    case "auth-social-accounts": {
      return {
        connectedAccounts: [
          {
            id: "acct-google",
            provider: "google",
            email: "john.doe@gmail.com",
          },
        ],
        availableProviders: ["google", "github", "twitter"],
        onConnect: async (prov: string) => {
          /* connect social provider */
        },
        onDisconnect: async (prov: string) => {
          /* disconnect provider */
        },
      };
    }
    case "auth-account-delete": {
      return {
        onDelete: async () => {
          /* delete user account */
        },
        confirmText: "DELETE",
        info: "This action cannot be undone. All your data will be erased.",
      };
    }

    // Billing Blocks
    case "billing-pricing-table": {
      return {
        plans: [
          {
            id: "free",
            name: "Free",
            description: "Perfect for getting started",
            price: { monthly: 0, annual: 0 },
            currency: "USD",
            features: [
              {
                name: "Community support",
                values: { free: true, pro: true, enterprise: true },
              },
              {
                name: "Essential features",
                values: { free: true, pro: true, enterprise: true },
              },
            ],
            isPopular: false,
          },
          {
            id: "pro",
            name: "Pro",
            description: "Advanced usage & features",
            price: { monthly: 29, annual: 290 },
            currency: "USD",
            features: [
              {
                name: "Everything in Free",
                values: { free: false, pro: true, enterprise: true },
              },
              {
                name: "Priority support",
                values: { free: false, pro: true, enterprise: true },
              },
              {
                name: "Advanced analytics",
                values: { free: false, pro: true, enterprise: true },
              },
              {
                name: "API access",
                values: { free: false, pro: true, enterprise: true },
              },
            ],
            isPopular: true,
          },
          {
            id: "enterprise",
            name: "Enterprise",
            description: "Custom solutions and SLAs",
            price: { monthly: 99, annual: 990 },
            currency: "USD",
            features: [
              {
                name: "All Pro features",
                values: { free: false, pro: false, enterprise: true },
              },
              {
                name: "Custom integrations",
                values: { free: false, pro: false, enterprise: true },
              },
              {
                name: "Dedicated manager",
                values: { free: false, pro: false, enterprise: true },
              },
            ],
            isPopular: false,
          },
        ] as PricingPlan[],
        billingPeriod: "monthly" as const,
        onBillingPeriodChange: (period: "monthly" | "annual") => {
          /* change billing period */
        },
        onSelectPlan: (planId: string) => {
          /* select plan */
        },
      };
    }
    case "billing-plan-selector": {
      return {
        plans: [
          {
            id: "free",
            name: "Free",
            description: "Perfect for getting started",
            price: { monthly: 0, annual: 0 },
            currency: "USD",
            features: [
              { name: "1,000 API requests/month", included: true },
              { name: "5 GB storage", included: true },
              { name: "1 team member", included: true },
              { name: "Community support", included: true },
            ],
            isCurrent: true,
            ctaLabel: "Current plan",
          },
          {
            id: "pro",
            name: "Pro",
            description: "For growing teams",
            price: { monthly: 29, annual: 290 },
            currency: "USD",
            isPopular: true,
            isCurrent: false,
            features: [
              { name: "100,000 API requests/month", included: true },
              { name: "100 GB storage", included: true },
              { name: "10 team members", included: true },
              { name: "Email support", included: true },
              { name: "Custom domains", included: true },
              { name: "Advanced analytics", included: true },
            ],
            ctaLabel: "Upgrade",
          },
          {
            id: "enterprise",
            name: "Enterprise",
            description: "For large organizations",
            price: { monthly: 99, annual: 990 },
            currency: "USD",
            isCurrent: false,
            features: [
              { name: "Unlimited API requests", included: true },
              { name: "1 TB storage", included: true },
              { name: "Unlimited team members", included: true },
              { name: "Priority support", included: true },
              { name: "SSO integration", included: true },
              { name: "Dedicated account manager", included: true },
            ],
            ctaLabel: "Contact sales",
          },
        ] as SelectablePlan[],
        selectedPlanId: "free",
        billingPeriod: "monthly" as const,
        onBillingPeriodChange: (period: "monthly" | "annual") => {
          /* change billing period */
        },
        onPlanSelect: (planId: string) => {
          /* select plan by id */
        },
        showAnnualSavings: true,
        currency: "USD",
      };
    }
    case "billing-subscription-card": {
      return {
        plan: {
          id: "pro",
          name: "Pro",
          price: 29,
          currency: "USD",
          billingPeriod: "monthly" as const,
        },
        usage: [
          {
            label: "API Requests",
            used: 85_000,
            limit: 100_000,
            unit: "requests",
            warningThreshold: 80,
          },
          {
            label: "Storage",
            used: 75_000_000_000,
            limit: 100_000_000_000,
            unit: "bytes",
            warningThreshold: 80,
          },
        ],
        nextBillingDate: new Date(now + 15 * 24 * 60 * 60 * 1000),
        autoRenew: true,
        status: "active" as const,
        onUpgrade: () => {
          /* upgrade plan */
        },
        onDowngrade: () => {
          /* downgrade plan */
        },
        onCancel: () => {
          /* cancel subscription */
        },
        onManage: () => {
          /* manage subscription */
        },
        showUsageDetails: true,
      };
    }
    case "billing-payment-method": {
      return {
        paymentMethods: [
          {
            id: "pm-1",
            type: "card" as const,
            brand: "visa" as const,
            last4: "4242",
            expiryMonth: 12,
            expiryYear: 2025,
            isDefault: true,
          },
          {
            id: "pm-2",
            type: "card" as const,
            brand: "amex" as const,
            last4: "3005",
            expiryMonth: 6,
            expiryYear: 2026,
            isDefault: false,
          },
        ] as PaymentMethod[],
        onAdd: () => {
          /* add payment method */
        },
        onSetDefault: (pmId: string) => {
          /* set default method */
        },
        onRemove: (pmId: string) => {
          /* remove method */
        },
      };
    }
    case "billing-payment-form": {
      return {
        onSubmit: ({
          cardNumber,
          exp,
          cvc,
        }: {
          cardNumber: string;
          exp: string;
          cvc: string;
        }) => {
          /* submit payment */
        },
        onCancel: () => {
          /* cancel payment form */
        },
        supportedBrands: ["visa", "mastercard", "amex"],
      };
    }
    case "billing-invoice-list": {
      return {
        invoices: [
          {
            id: "inv-1",
            invoiceNumber: "INV-2024-001",
            date: new Date(now - 5 * 24 * 60 * 60 * 1000),
            amount: 29,
            currency: "USD",
            status: "paid" as const,
          },
          {
            id: "inv-2",
            invoiceNumber: "INV-2024-002",
            date: new Date(now - 30 * 24 * 60 * 60 * 1000),
            amount: 29,
            currency: "USD",
            status: "due" as const,
          },
        ] as Invoice[],
        onViewInvoice: (id: string) => {
          /* view invoice details */
        },
        onDownloadInvoice: (id: string) => {
          /* download invoice */
        },
      };
    }
    case "billing-invoice-details": {
      return {
        invoice: {
          id: "inv-1",
          invoiceNumber: "INV-2024-001",
          date: new Date(now - 5 * 24 * 60 * 60 * 1000),
          dueDate: new Date(now),
          amount: 29,
          currency: "USD",
          status: "paid" as const,
          description: "Pro Plan - January 2024",
          lineItems: [
            {
              description: "Pro Plan Subscription",
              quantity: 1,
              unitPrice: 29,
              subtotal: 29,
            },
          ],
          subtotal: 29,
          tax: {
            amount: 0,
            rate: 0,
            label: "No tax",
          },
          total: 29,
          paymentMethod: {
            type: "card",
            last4: "4242",
            brand: "visa",
          },
          billingAddress: {
            name: "John Doe",
            line1: "123 Main Street",
            city: "San Francisco",
            state: "CA",
            zip: "94102",
            country: "United States",
          },
        } as InvoiceDetails,
        open: true,
        onOpenChange: () => {
          /* handle open/close */
        },
        onDownload: () => {
          /* download invoice */
        },
        onPrint: () => {
          /* print invoice */
        },
        currency: "USD",
      };
    }
    case "billing-billing-history": {
      return {
        transactions: [
          {
            id: "txn-1",
            date: new Date(now - 10 * 24 * 60 * 60 * 1000),
            amount: 29,
            type: "payment",
            status: "success",
            description: "Subscription - Pro Plan",
          },
          {
            id: "txn-2",
            date: new Date(now - 31 * 24 * 60 * 60 * 1000),
            amount: 29,
            type: "payment",
            status: "success",
            description: "Subscription - Pro Plan",
          },
        ],
        onViewDetails: (txnId: string) => {
          /* view transaction */
        },
      };
    }
    case "billing-coupon-code": {
      return {
        onApply: async (code: string) => {
          /* apply coupon code */
        },
        placeholder: "Enter coupon code...",
        discountInfo: "Save 20% with WELCOME20",
      };
    }
    case "billing-payment-failed": {
      return {
        failure: {
          invoiceId: "inv-1",
          invoiceNumber: "INV-2024-001",
          amount: 29,
          currency: "USD",
          failedAt: new Date(now - 2 * 60 * 60 * 1000),
          reason: "insufficient_funds" as const,
          reasonMessage:
            "Your payment method was declined due to insufficient funds.",
          paymentMethod: {
            type: "card",
            last4: "4242",
            brand: "visa",
          },
          retryAttempts: 1,
          maxRetryAttempts: 3,
        },
        onRetry: async () => {
          /* retry payment */
        },
        onUpdatePaymentMethod: () => {
          /* update method */
        },
        onContactSupport: () => {
          /* contact support */
        },
        currency: "USD",
      };
    }
    case "billing-payment-schedule": {
      return {
        payments: [
          {
            id: "sch-1",
            date: new Date(now + 15 * 24 * 60 * 60 * 1000),
            amount: 29,
            currency: "USD",
            status: "upcoming" as const,
            description: "Pro Plan - February 2024",
            paymentMethod: {
              type: "card",
              last4: "4242",
              brand: "visa",
            },
            invoiceId: "inv-2",
            invoiceNumber: "INV-2024-002",
          },
          {
            id: "sch-2",
            date: new Date(now + 45 * 24 * 60 * 60 * 1000),
            amount: 29,
            currency: "USD",
            status: "upcoming" as const,
            description: "Pro Plan - March 2024",
            paymentMethod: {
              type: "card",
              last4: "4242",
              brand: "visa",
            },
          },
        ],
        onViewInvoice: (invoiceId: string) => {
          /* view invoice */
        },
        onRetry: async (paymentId: string) => {
          /* retry payment */
        },
        onCancel: async (paymentId: string) => {
          /* cancel scheduled payment */
        },
        currency: "USD",
        showUpcomingOnly: false,
      };
    }
    case "billing-subscription-settings": {
      return {
        subscription: {
          id: "sub-1",
          planName: "Pro Plan",
          status: "active" as const,
          billingPeriod: "monthly" as const,
          currentBillingDate: new Date(now - 15 * 24 * 60 * 60 * 1000),
          nextBillingDate: new Date(now + 15 * 24 * 60 * 60 * 1000),
          autoRenew: true,
          prorationPreview: {
            newAmount: 99,
            creditAmount: 14.5,
            nextBillingDate: new Date(now + 15 * 24 * 60 * 60 * 1000),
          },
        },
        onPause: async (resumeDate?: Date) => {
          /* pause subscription */
        },
        onResume: async () => {
          /* resume subscription */
        },
        onChangeBillingPeriod: async (period: "monthly" | "annual") => {
          /* change billing period */
        },
        onUpdateBillingDate: async (date: Date) => {
          /* update billing date */
        },
        onCancel: async (feedback?: string) => {
          /* cancel subscription */
        },
        onReactivate: async () => {
          /* reactivate subscription */
        },
        onToggleAutoRenew: async (enabled: boolean) => {
          /* toggle auto-renew */
        },
        currency: "USD",
      };
    }
    case "billing-upgrade-prompt": {
      return {
        currentPlan: {
          id: "free",
          name: "Free",
        },
        recommendedPlan: {
          id: "pro",
          name: "Pro",
          price: 29,
          currency: "USD",
          billingPeriod: "monthly" as const,
        },
        features: [
          { name: "Unlimited API requests" },
          { name: "1 TB storage" },
          { name: "Priority support" },
          { name: "SSO integration" },
        ],
        reason: "recommended" as const,
        onUpgrade: () => {
          /* upgrade to recommended plan */
        },
        onDismiss: () => {
          /* dismiss upgrade prompt */
        },
        onLearnMore: () => {
          /* learn more about plan */
        },
        variant: "card" as const,
        showSavings: true,
        savingsAmount: 58,
      };
    }
    case "billing-usage-alerts": {
      return {
        alerts: [
          {
            id: "alert-1",
            name: "API Usage Alert",
            category: "API Requests",
            threshold: 80,
            thresholdType: "percentage" as const,
            enabled: true,
            channels: ["email", "in_app"] as const,
            lastTriggered: new Date(now - 2 * 24 * 60 * 60 * 1000),
            triggerCount: 3,
          },
          {
            id: "alert-2",
            name: "Storage Limit Alert",
            category: "Storage",
            threshold: 5_000_000_000,
            thresholdType: "absolute" as const,
            enabled: true,
            channels: ["email", "sms", "in_app"] as const,
            triggerCount: 1,
          },
        ],
        onToggle: async (alertId: string, enabled: boolean) => {
          /* toggle alert */
        },
        onEdit: (alertId: string) => {
          /* edit alert */
        },
        onDelete: async (alertId: string) => {
          /* delete alert */
        },
        onCreate: () => {
          /* create new alert */
        },
      };
    }
    case "billing-usage-billing": {
      return {
        currentPeriod: {
          start: new Date(now - 30 * 24 * 60 * 60 * 1000),
          end: new Date(now),
          usage: 8_500_000,
          limit: 10_000_000,
        },
        previousPeriod: {
          usage: 7_200_000,
          limit: 10_000_000,
        },
        dataPoints: [
          {
            date: new Date(now - 29 * 24 * 60 * 60 * 1000),
            value: 250_000,
            category: "API Requests",
          },
          {
            date: new Date(now - 25 * 24 * 60 * 60 * 1000),
            value: 320_000,
            category: "API Requests",
          },
          {
            date: new Date(now - 20 * 24 * 60 * 60 * 1000),
            value: 410_000,
            category: "API Requests",
          },
          {
            date: new Date(now - 15 * 24 * 60 * 60 * 1000),
            value: 380_000,
            category: "API Requests",
          },
          {
            date: new Date(now - 10 * 24 * 60 * 60 * 1000),
            value: 450_000,
            category: "API Requests",
          },
          {
            date: new Date(now - 5 * 24 * 60 * 60 * 1000),
            value: 520_000,
            category: "API Requests",
          },
          { date: new Date(now), value: 580_000, category: "API Requests" },
        ],
        categories: [
          {
            name: "API Requests",
            value: 5_800_000,
            limit: 8_000_000,
            color: "#3b82f6",
          },
          {
            name: "Storage",
            value: 2_700_000,
            limit: 5_000_000,
            color: "#10b981",
          },
        ],
        unit: "requests",
        onDateRangeChange: (start: Date, end: Date) => {
          /* change date range */
        },
        onExport: () => {
          /* export usage data */
        },
        showChart: true,
        showBreakdown: true,
        warningThreshold: 80,
      };
    }

    // Settings Blocks
    case "settings-profile": {
      return {
        profile: {
          name: "John Doe",
          email: "john.doe@example.com",
          bio: "Design Engineer. Open Source Advocate. Loves UI/UX.",
          location: "San Francisco, CA",
          website: "https://example.com",
          avatarUrl: "https://api.dicebear.com/9.x/glass/svg?seed=john-doe",
          social: {
            twitter: "johndoe",
            github: "johnnydoe",
          },
        } as ProfileData,
        onSave: async (data: any) => {
          /* save profile */
        },
      };
    }
    case "settings-account": {
      return {
        account: {
          type: "pro" as const,
          status: "active" as const,
          memberCount: 8,
          memberLimit: 10,
          storageUsed: 15 * 1024 * 1024 * 1024, // 15 GB
          storageLimit: 100 * 1024 * 1024 * 1024, // 100 GB
        },
        onUpgrade: async () => {
          /* upgrade account */
        },
        onDelete: async () => {
          /* delete account */
        },
        onTransfer: async () => {
          /* transfer account */
        },
      };
    }
    case "settings-security": {
      return {
        sessions: [
          {
            id: "sec-session-1",
            ip: "192.168.1.1",
            device: "MacBook Pro",
            browser: "Chrome",
            active: true,
            lastActive: new Date(now),
          },
        ],
        events: [
          {
            id: "event-1",
            type: "login",
            timestamp: new Date(now - 7_200_000),
            ip: "192.168.1.1",
          },
        ],
        onRevokeSession: (id: string) => {
          /* revoke session */
        },
        onRevokeAllSessions: () => {
          /* revoke all */
        },
      };
    }
    case "settings-notifications": {
      return {
        preferences: {
          categories: [
            {
              id: "mentions",
              name: "Mentions",
              description: "When someone mentions you",
              channels: { email: true, push: true, inApp: true, sms: false },
              frequency: "realtime" as const,
            },
            {
              id: "replies",
              name: "Replies",
              description: "When someone replies to your messages",
              channels: { email: true, push: true, inApp: true, sms: false },
              frequency: "realtime" as const,
            },
            {
              id: "system",
              name: "System Alerts",
              description: "Important system notifications",
              channels: { email: true, push: true, inApp: true, sms: true },
              frequency: "realtime" as const,
            },
            {
              id: "marketing",
              name: "Marketing",
              description: "Promotional emails and updates",
              channels: { email: true, push: false, inApp: false, sms: false },
              frequency: "digest-weekly" as const,
            },
            {
              id: "security",
              name: "Security",
              description: "Security alerts and login notifications",
              channels: { email: true, push: true, inApp: true, sms: true },
              frequency: "realtime" as const,
            },
            {
              id: "product-updates",
              name: "Product Updates",
              description: "New features and product announcements",
              channels: { email: true, push: false, inApp: true, sms: false },
              frequency: "digest-daily" as const,
            },
          ],
          quietHoursEnabled: true,
          quietHoursStart: "22:00",
          quietHoursEnd: "08:00",
        },
        onSave: async (data: {
          categories: Array<{
            id: string;
            name: string;
            description: string;
            channels: {
              email: boolean;
              push: boolean;
              inApp: boolean;
              sms: boolean;
            };
            frequency?: "realtime" | "digest-daily" | "digest-weekly" | "off";
          }>;
          quietHoursEnabled: boolean;
          quietHoursStart?: string;
          quietHoursEnd?: string;
        }) => {
          /* save notification preferences */
        },
      };
    }
    case "settings-preferences": {
      return {
        preferences: {
          theme: "dark" as const,
          language: "en",
          timezone: "America/Los_Angeles",
          codeFontSize: 16,
        },
        onSave: async (prefs: any) => {
          /* save preferences */
        },
      };
    }
    case "settings-privacy": {
      return {
        privacySettings: {
          profileVisibility: "private" as const,
          dataSharing: false,
          require2FA: true,
        },
        onSave: async (settings: any) => {
          /* save privacy */
        },
      };
    }
    case "settings-api-keys": {
      return {
        apiKeys: [
          {
            id: "key-1",
            name: "Production API Key",
            key: "sk_live_1234567890abcdef",
            createdAt: new Date(now - 30 * 24 * 60 * 60 * 1000),
            lastUsed: new Date(now - 2 * 60 * 60 * 1000),
            scopes: ["read", "write"],
            usageCount: 15_420,
            rateLimit: {
              limit: 10_000,
              remaining: 8560,
              resetAt: new Date(now + 24 * 60 * 60 * 1000),
            },
          },
          {
            id: "key-2",
            name: "Development Key",
            key: "sk_test_abcdef1234567890",
            createdAt: new Date(now - 7 * 24 * 60 * 60 * 1000),
            scopes: ["read"],
            usageCount: 234,
          },
          {
            id: "key-3",
            name: "Read-only Key",
            key: "sk_readonly_xyz789abc123",
            createdAt: new Date(now - 3 * 24 * 60 * 60 * 1000),
            lastUsed: new Date(now - 5 * 60 * 60 * 1000),
            scopes: ["read"],
            expiresAt: new Date(now + 90 * 24 * 60 * 60 * 1000),
            usageCount: 1250,
          },
        ],
        onCreate: async (data: {
          name: string;
          expiresAt?: Date;
          scopes: string[];
        }) => {
          /* create new key */
          return {
            id: `key-${Date.now()}`,
            name: data.name,
            key: `sk_${Math.random().toString(36).substring(7)}`,
            createdAt: new Date(),
            scopes: data.scopes,
          };
        },
        onRevoke: async (keyId: string) => {
          /* revoke key */
        },
        onRegenerate: async (keyId: string) => {
          /* regenerate key */
          return {
            id: keyId,
            name: "Regenerated Key",
            key: `sk_${Math.random().toString(36).substring(7)}`,
            createdAt: new Date(),
            scopes: ["read", "write"],
          };
        },
      };
    }
    case "settings-integrations": {
      return {
        integrations: [
          {
            id: "github",
            name: "GitHub",
            description: "Connect your GitHub account to sync repositories",
            status: "connected" as const,
            lastSynced: new Date(now - 2 * 60 * 60 * 1000), // 2 hours ago
            scopes: ["repo", "read:user"],
          },
          {
            id: "slack",
            name: "Slack",
            description: "Send notifications to your Slack workspace",
            status: "disconnected" as const,
            scopes: ["chat:write", "channels:read"],
          },
          {
            id: "google",
            name: "Google Drive",
            description: "Access and sync files from Google Drive",
            status: "expired" as const,
            lastSynced: new Date(now - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            needsReconnection: true,
            scopes: ["drive.readonly"],
          },
          {
            id: "stripe",
            name: "Stripe",
            description: "Manage payments and subscriptions",
            status: "error" as const,
            lastSynced: new Date(now - 5 * 60 * 60 * 1000), // 5 hours ago
            scopes: ["read"],
          },
        ],
        onConnect: async (integrationId: string) => {
          /* connect integration */
        },
        onDisconnect: async (integrationId: string) => {
          /* disconnect integration */
        },
        onReauthorize: async (integrationId: string) => {
          /* reauthorize integration */
        },
      };
    }
    case "settings-webhooks": {
      return {
        webhooks: [
          {
            id: "webhook-1",
            name: "Payment Notifications",
            url: "https://api.example.com/webhooks/payment",
            secret: "whsec_1234567890abcdef",
            events: ["payment.succeeded", "payment.failed"],
            status: "active" as const,
            createdAt: new Date(now - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            lastTriggered: new Date(now - 2 * 60 * 60 * 1000), // 2 hours ago
            successCount: 245,
            failureCount: 3,
          },
          {
            id: "webhook-2",
            name: "User Events",
            url: "https://api.example.com/webhooks/users",
            secret: "whsec_abcdef1234567890",
            events: ["user.created", "user.updated", "user.deleted"],
            status: "paused" as const,
            createdAt: new Date(now - 14 * 24 * 60 * 60 * 1000), // 14 days ago
            lastTriggered: new Date(now - 5 * 24 * 60 * 60 * 1000), // 5 days ago
            successCount: 120,
            failureCount: 0,
          },
          {
            id: "webhook-3",
            name: "Subscription Updates",
            url: "https://api.example.com/webhooks/subscriptions",
            secret: "whsec_xyz789abc123def",
            events: [
              "subscription.created",
              "subscription.updated",
              "subscription.cancelled",
            ],
            status: "active" as const,
            createdAt: new Date(now - 7 * 24 * 60 * 60 * 1000), // 7 days ago
            lastTriggered: new Date(now - 1 * 60 * 60 * 1000), // 1 hour ago
            successCount: 89,
            failureCount: 2,
          },
          {
            id: "webhook-4",
            name: "Failed Webhook",
            url: "https://api.example.com/webhooks/failed",
            secret: "whsec_failed123456",
            events: ["payment.failed"],
            status: "failed" as const,
            createdAt: new Date(now - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            lastTriggered: new Date(now - 12 * 60 * 60 * 1000), // 12 hours ago
            successCount: 15,
            failureCount: 8,
          },
        ],
        deliveries: {
          "webhook-1": [
            {
              id: "delivery-1",
              webhookId: "webhook-1",
              status: "success" as const,
              responseCode: 200,
              timestamp: new Date(now - 2 * 60 * 60 * 1000), // 2 hours ago
              payload:
                '{"event": "payment.succeeded", "amount": 29.99, "currency": "USD"}',
              response: "OK",
            },
            {
              id: "delivery-2",
              webhookId: "webhook-1",
              status: "success" as const,
              responseCode: 200,
              timestamp: new Date(now - 4 * 60 * 60 * 1000), // 4 hours ago
              payload:
                '{"event": "payment.failed", "reason": "insufficient_funds"}',
              response: "OK",
            },
            {
              id: "delivery-3",
              webhookId: "webhook-1",
              status: "failed" as const,
              responseCode: 500,
              timestamp: new Date(now - 6 * 60 * 60 * 1000), // 6 hours ago
              payload: '{"event": "payment.succeeded", "amount": 49.99}',
              response: "Internal Server Error",
            },
          ],
          "webhook-3": [
            {
              id: "delivery-4",
              webhookId: "webhook-3",
              status: "success" as const,
              responseCode: 200,
              timestamp: new Date(now - 1 * 60 * 60 * 1000), // 1 hour ago
              payload:
                '{"event": "subscription.created", "plan": "pro", "userId": "user-123"}',
              response: "OK",
            },
          ],
        },
        onCreate: async (data: {
          name: string;
          url: string;
          events: string[];
        }) => {
          /* create webhook */
          return {
            id: `webhook-${Date.now()}`,
            name: data.name,
            url: data.url,
            events: data.events,
            status: "active" as const,
            createdAt: new Date(),
            successCount: 0,
            failureCount: 0,
          };
        },
        onUpdate: async (
          id: string,
          data: Partial<{
            name: string;
            url: string;
            events: string[];
            status: "active" | "paused" | "failed";
          }>
        ) => {
          /* update webhook */
        },
        onDelete: async (id: string) => {
          /* delete webhook */
        },
        onTest: async (id: string) => {
          /* test webhook */
        },
        onToggleStatus: async (id: string) => {
          /* toggle webhook status */
        },
      };
    }
    case "settings-team-members": {
      return {
        members: [
          {
            id: "user-1",
            name: "Alice Admin",
            email: "alice@company.com",
            role: "admin",
          },
          {
            id: "user-2",
            name: "Bob Writer",
            email: "bob@company.com",
            role: "editor",
          },
        ],
        onInvite: async (email: string, role: string) => {
          /* invite member */
        },
        onRemove: async (id: string) => {
          /* remove member */
        },
        onUpdateRole: async (id: string, newRole: string) => {
          /* update role */
        },
      };
    }
    case "settings-storage": {
      return {
        totalUsed: 7 * 1024 * 1024 * 1024, // 7 GB
        totalLimit: 100 * 1024 * 1024 * 1024, // 100 GB
        categories: [
          {
            id: "files",
            name: "Files",
            icon: FileText,
            used: 5 * 1024 * 1024 * 1024, // 5 GB
            total: 10 * 1024 * 1024 * 1024, // 10 GB
            color: "bg-blue-500/10",
          },
          {
            id: "images",
            name: "Images",
            icon: Image,
            used: 2 * 1024 * 1024 * 1024, // 2 GB
            total: 5 * 1024 * 1024 * 1024, // 5 GB
            color: "bg-green-500/10",
          },
          {
            id: "backups",
            name: "Backups",
            icon: Database,
            used: 2_500_000_000, // 2.5 GB
            total: 20 * 1024 * 1024 * 1024, // 20 GB
            color: "bg-purple-500/10",
          },
          {
            id: "videos",
            name: "Videos",
            icon: Video,
            used: 1_500_000_000, // 1.5 GB
            total: 10 * 1024 * 1024 * 1024, // 10 GB
            color: "bg-red-500/10",
          },
        ],
        onCleanup: async (categoryId?: string) => {
          /* start cleanup */
        },
      };
    }
    case "settings-backup": {
      return {
        backups: [
          {
            id: "backup-1",
            name: "Automatic Backup - Daily",
            type: "automatic" as const,
            status: "completed" as const,
            size: 500 * 1024 * 1024, // 500 MB
            createdAt: new Date(now - 24 * 60 * 60 * 1000), // 1 day ago
            completedAt: new Date(now - 24 * 60 * 60 * 1000 + 30_000),
            location: "cloud",
            retentionDays: 30,
          },
          {
            id: "backup-2",
            name: "Manual Backup",
            type: "manual" as const,
            status: "completed" as const,
            size: 450 * 1024 * 1024, // 450 MB
            createdAt: new Date(now - 7 * 24 * 60 * 60 * 1000), // 7 days ago
            completedAt: new Date(now - 7 * 24 * 60 * 60 * 1000 + 25_000),
            location: "cloud",
          },
          {
            id: "backup-3",
            name: "Automatic Backup - Daily",
            type: "automatic" as const,
            status: "in_progress" as const,
            size: 0,
            createdAt: new Date(now - 5 * 60 * 1000), // 5 minutes ago
            location: "cloud",
          },
          {
            id: "backup-4",
            name: "Weekly Backup",
            type: "automatic" as const,
            status: "completed" as const,
            size: 520 * 1024 * 1024, // 520 MB
            createdAt: new Date(now - 14 * 24 * 60 * 60 * 1000), // 14 days ago
            completedAt: new Date(now - 14 * 24 * 60 * 60 * 1000 + 35_000),
            location: "cloud",
            retentionDays: 30,
          },
          {
            id: "backup-5",
            name: "Failed Backup",
            type: "automatic" as const,
            status: "failed" as const,
            size: 0,
            createdAt: new Date(now - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            location: "cloud",
          },
        ],
        autoBackupEnabled: true,
        autoBackupSchedule: "daily" as const,
        retentionDays: 30,
        storageLocation: "cloud",
        onCreateBackup: async () => {
          /* create backup */
          return {
            id: `backup-${Date.now()}`,
            name: "Manual Backup",
            type: "manual" as const,
            status: "completed" as const,
            size: 500 * 1024 * 1024,
            createdAt: new Date(),
            completedAt: new Date(),
            location: "cloud",
          };
        },
        onRestore: async (backupId: string) => {
          /* restore backup */
        },
        onDelete: async (backupId: string) => {
          /* delete backup */
        },
        onUpdateSettings: async (settings: {
          enabled: boolean;
          schedule?: "daily" | "weekly" | "monthly";
          retentionDays?: number;
          storageLocation?: string;
        }) => {
          /* update backup settings */
        },
      };
    }
    case "settings-export-data": {
      return {
        exportHistory: [
          {
            id: "export-1",
            format: "json" as const,
            scope: ["profile", "activity"],
            status: "completed" as const,
            createdAt: new Date(now - 7 * 24 * 60 * 60 * 1000), // 7 days ago
            completedAt: new Date(now - 7 * 24 * 60 * 60 * 1000 + 30_000),
            downloadUrl: "#",
            expiresAt: new Date(now + 23 * 24 * 60 * 60 * 1000), // 23 days from now
          },
          {
            id: "export-2",
            format: "csv" as const,
            scope: ["messages"],
            status: "processing" as const,
            progress: 65,
            createdAt: new Date(now - 5 * 60 * 1000), // 5 minutes ago
          },
          {
            id: "export-3",
            format: "zip" as const,
            scope: ["profile", "activity", "messages", "files", "settings"],
            status: "completed" as const,
            createdAt: new Date(now - 14 * 24 * 60 * 60 * 1000), // 14 days ago
            completedAt: new Date(now - 14 * 24 * 60 * 60 * 1000 + 45_000),
            downloadUrl: "#",
            expiresAt: new Date(now + 16 * 24 * 60 * 60 * 1000), // 16 days from now
          },
          {
            id: "export-4",
            format: "pdf" as const,
            scope: ["billing"],
            status: "failed" as const,
            createdAt: new Date(now - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            error: "Export timeout - please try again",
          },
        ],
        onExport: async (data: {
          format: "json" | "csv" | "pdf" | "zip";
          scope: string[];
          dateRange?: { start: Date; end: Date };
        }) => {
          /* start export */
          return {
            id: `export-${Date.now()}`,
            format: data.format,
            scope: data.scope,
            status: "processing" as const,
            createdAt: new Date(),
          };
        },
        onDownload: async (jobId: string) => {
          /* download export */
        },
      };
    }
    case "settings-import-data": {
      return {
        importHistory: [
          {
            id: "import-1",
            filename: "user-data-backup.json",
            format: "json" as const,
            status: "completed" as const,
            createdAt: new Date(now - 14 * 24 * 60 * 60 * 1000), // 14 days ago
            completedAt: new Date(now - 14 * 24 * 60 * 60 * 1000 + 45_000),
            recordsImported: 1250,
            recordsSkipped: 12,
            recordsFailed: 3,
            conflictResolution: "merge" as const,
          },
          {
            id: "import-2",
            filename: "activity-logs.csv",
            format: "csv" as const,
            status: "completed" as const,
            createdAt: new Date(now - 7 * 24 * 60 * 60 * 1000), // 7 days ago
            completedAt: new Date(now - 7 * 24 * 60 * 60 * 1000 + 30_000),
            recordsImported: 5420,
            recordsSkipped: 0,
            recordsFailed: 0,
            conflictResolution: "overwrite" as const,
          },
          {
            id: "import-3",
            filename: "messages-export.json",
            format: "json" as const,
            status: "importing" as const,
            progress: 65,
            createdAt: new Date(now - 2 * 60 * 1000), // 2 minutes ago
            conflictResolution: "skip" as const,
          },
          {
            id: "import-4",
            filename: "settings-backup.json",
            format: "json" as const,
            status: "failed" as const,
            createdAt: new Date(now - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            error: "Invalid file format: missing required fields",
            conflictResolution: "skip" as const,
          },
          {
            id: "import-5",
            filename: "contacts.csv",
            format: "csv" as const,
            status: "completed" as const,
            createdAt: new Date(now - 1 * 24 * 60 * 60 * 1000), // 1 day ago
            completedAt: new Date(now - 1 * 24 * 60 * 60 * 1000 + 20_000),
            recordsImported: 234,
            recordsSkipped: 5,
            recordsFailed: 1,
            conflictResolution: "merge" as const,
          },
        ],
        onUpload: async (file: File) => {
          /* upload and preview file */
          return {
            totalRecords: 150,
            categories: {
              profile: 1,
              activity: 50,
              messages: 99,
            },
            conflicts: 5,
            fields: ["id", "name", "email", "createdAt"],
          };
        },
        onImport: async (data: {
          file: File;
          conflictResolution: "skip" | "overwrite" | "merge";
          dryRun?: boolean;
        }) => {
          /* import data */
          return {
            id: `import-${Date.now()}`,
            filename: data.file.name,
            format: data.file.name.endsWith(".json")
              ? ("json" as const)
              : ("csv" as const),
            status: data.dryRun ? ("dry-run" as const) : ("importing" as const),
            createdAt: new Date(),
            conflictResolution: data.conflictResolution,
          };
        },
      };
    }
    case "settings-activity-log": {
      return {
        entries: [
          {
            id: "log-1",
            action: "login",
            type: "login" as const,
            description: "User logged in",
            ipAddress: "192.168.1.1",
            location: "San Francisco, CA",
            device: "MacBook Pro",
            timestamp: new Date(now - 5 * 60 * 1000), // 5 minutes ago
            status: "success" as const,
          },
          {
            id: "log-2",
            action: "profile_update",
            type: "profile_update" as const,
            description: "Profile information updated",
            ipAddress: "192.168.1.1",
            location: "San Francisco, CA",
            device: "MacBook Pro",
            timestamp: new Date(now - 2 * 60 * 60 * 1000), // 2 hours ago
            status: "success" as const,
          },
          {
            id: "log-3",
            action: "password_change",
            type: "password_change" as const,
            description: "Password changed",
            ipAddress: "192.168.1.1",
            location: "San Francisco, CA",
            device: "MacBook Pro",
            timestamp: new Date(now - 6 * 60 * 60 * 1000), // 6 hours ago
            status: "success" as const,
          },
          {
            id: "log-4",
            action: "settings_change",
            type: "settings_change" as const,
            description: "Notification preferences updated",
            ipAddress: "192.168.1.1",
            location: "San Francisco, CA",
            device: "MacBook Pro",
            timestamp: new Date(now - 12 * 60 * 60 * 1000), // 12 hours ago
            status: "success" as const,
          },
          {
            id: "log-5",
            action: "export",
            type: "export" as const,
            description: "Data exported",
            ipAddress: "192.168.1.1",
            location: "San Francisco, CA",
            device: "MacBook Pro",
            timestamp: new Date(now - 1 * 24 * 60 * 60 * 1000), // 1 day ago
            status: "success" as const,
          },
          {
            id: "log-6",
            action: "create",
            type: "create" as const,
            description: "API key created",
            ipAddress: "192.168.1.1",
            location: "San Francisco, CA",
            device: "MacBook Pro",
            timestamp: new Date(now - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            status: "success" as const,
          },
          {
            id: "log-7",
            action: "login",
            type: "login" as const,
            description: "Failed login attempt",
            ipAddress: "203.0.113.45",
            location: "New York, NY",
            device: "iPhone 15",
            timestamp: new Date(now - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            status: "failed" as const,
          },
          {
            id: "log-8",
            action: "logout",
            type: "logout" as const,
            description: "User logged out",
            ipAddress: "192.168.1.1",
            location: "San Francisco, CA",
            device: "MacBook Pro",
            timestamp: new Date(now - 4 * 24 * 60 * 60 * 1000), // 4 days ago
            status: "success" as const,
          },
          {
            id: "log-9",
            action: "update",
            type: "update" as const,
            description: "Billing information updated",
            ipAddress: "192.168.1.1",
            location: "San Francisco, CA",
            device: "MacBook Pro",
            timestamp: new Date(now - 5 * 24 * 60 * 60 * 1000), // 5 days ago
            status: "success" as const,
          },
          {
            id: "log-10",
            action: "delete",
            type: "delete" as const,
            description: "API key deleted",
            ipAddress: "192.168.1.1",
            location: "San Francisco, CA",
            device: "MacBook Pro",
            timestamp: new Date(now - 7 * 24 * 60 * 60 * 1000), // 7 days ago
            status: "success" as const,
          },
        ],
        onExport: async (filters: {
          dateRange?: { start: Date; end: Date };
          type?: string;
          search?: string;
        }) => {
          /* export activity log */
        },
      };
    }
    case "settings-domains": {
      return {
        domains: [
          {
            id: "domain-1",
            domain: "example.com",
            status: "verified" as const,
            sslEnabled: true,
            verifiedAt: new Date(now - 30 * 24 * 60 * 60 * 1000), // 30 days ago
          },
          {
            id: "domain-2",
            domain: "app.example.com",
            status: "pending" as const,
            sslEnabled: false,
            dnsRecords: [
              {
                type: "CNAME",
                name: "app",
                value: "example.vercel.app",
              },
            ],
          },
          {
            id: "domain-3",
            domain: "api.example.com",
            status: "verified" as const,
            sslEnabled: true,
            verifiedAt: new Date(now - 15 * 24 * 60 * 60 * 1000), // 15 days ago
          },
          {
            id: "domain-4",
            domain: "staging.example.com",
            status: "failed" as const,
            sslEnabled: false,
            dnsRecords: [
              {
                type: "CNAME",
                name: "staging",
                value: "staging.vercel.app",
              },
            ],
          },
          {
            id: "domain-5",
            domain: "www.example.com",
            status: "pending" as const,
            sslEnabled: false,
            dnsRecords: [
              {
                type: "CNAME",
                name: "www",
                value: "example.vercel.app",
              },
              {
                type: "A",
                name: "@",
                value: "192.0.2.1",
              },
            ],
          },
        ],
        onCreate: async (domain: string) => {
          /* create domain */
          return {
            id: `domain-${Date.now()}`,
            domain,
            status: "pending" as const,
            sslEnabled: false,
            dnsRecords: [
              {
                type: "CNAME",
                name: domain.split(".")[0] || "@",
                value: "example.vercel.app",
              },
            ],
          };
        },
        onDelete: async (id: string) => {
          /* delete domain */
        },
        onVerify: async (id: string) => {
          /* verify domain */
        },
        onToggleSSL: async (id: string) => {
          /* toggle SSL */
        },
      };
    }
    case "settings-sso": {
      return {
        enabled: true,
        providers: [
          {
            id: "sso-1",
            name: "Okta",
            type: "saml" as const,
            enabled: true,
            status: "active" as const,
            metadataUrl: "https://example.okta.com/saml/metadata",
            entityId: "https://example.okta.com/app/example",
            ssoUrl: "https://example.okta.com/app/example/sso/saml",
            lastTested: new Date(now - 7 * 24 * 60 * 60 * 1000), // 7 days ago
            userCount: 45,
          },
          {
            id: "sso-2",
            name: "Azure AD",
            type: "oidc" as const,
            enabled: false,
            status: "pending" as const,
            metadataUrl:
              "https://login.microsoftonline.com/tenant-id/v2.0/.well-known/openid-configuration",
            lastTested: new Date(now - 14 * 24 * 60 * 60 * 1000), // 14 days ago
          },
          {
            id: "sso-3",
            name: "Google Workspace",
            type: "saml" as const,
            enabled: true,
            status: "active" as const,
            metadataUrl:
              "https://accounts.google.com/.well-known/saml-metadata",
            entityId: "https://accounts.google.com/o/saml2?idpid=example",
            ssoUrl: "https://accounts.google.com/o/saml2/idp?idpid=example",
            lastTested: new Date(now - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            userCount: 128,
          },
          {
            id: "sso-4",
            name: "Auth0",
            type: "oidc" as const,
            enabled: true,
            status: "error" as const,
            metadataUrl:
              "https://example.auth0.com/.well-known/openid-configuration",
            lastTested: new Date(now - 1 * 24 * 60 * 60 * 1000), // 1 day ago
            userCount: 23,
          },
          {
            id: "sso-5",
            name: "OneLogin",
            type: "saml" as const,
            enabled: false,
            status: "pending" as const,
            metadataUrl: "https://app.onelogin.com/saml/metadata/example",
            entityId: "https://app.onelogin.com/saml/metadata/example",
            ssoUrl:
              "https://app.onelogin.com/trust/saml2/http-post/sso/example",
          },
        ],
        onCreate: async (data: {
          name: string;
          type: "saml" | "oauth" | "oidc";
          metadataUrl?: string;
          entityId?: string;
          ssoUrl?: string;
          certificate?: string;
        }) => {
          /* create SSO provider */
          return {
            id: `sso-${Date.now()}`,
            name: data.name,
            type: data.type,
            enabled: false,
            status: "pending" as const,
            metadataUrl: data.metadataUrl,
            entityId: data.entityId,
            ssoUrl: data.ssoUrl,
            certificate: data.certificate,
          };
        },
        onUpdate: async (
          id: string,
          data: Partial<{
            name: string;
            type: "saml" | "oauth" | "oidc";
            enabled: boolean;
            status: "active" | "error" | "pending";
            metadataUrl?: string;
            entityId?: string;
            ssoUrl?: string;
            certificate?: string;
          }>
        ) => {
          /* update SSO provider */
        },
        onDelete: async (id: string) => {
          /* delete SSO provider */
        },
        onTest: async (id: string) => {
          /* test SSO connection */
        },
        onToggle: async (enabled: boolean) => {
          /* toggle SSO globally */
        },
      };
    }
    case "settings-advanced": {
      return {
        featureFlags: [
          { id: "ff-1", name: "Experimental UI", enabled: true },
          { id: "ff-2", name: "Debug Logging", enabled: false },
        ],
        onToggleFlag: (flagId: string, enabled: boolean) => {
          /* enable flag */
        },
      };
    }
    // Team Blocks
    case "team-switcher": {
      return {
        teams: [
          {
            id: "team-1",
            name: "Acme Inc.",
            plan: "pro" as const,
            memberCount: 12,
          },
          {
            id: "team-2",
            name: "Design Team",
            plan: "free" as const,
            memberCount: 5,
          },
        ],
        currentTeamId: "team-1",
        onTeamSelect: (teamId: string) => {
          /* select team */
        },
        onCreateTeam: () => {
          /* create new team */
        },
        showPlan: true,
      };
    }
    case "team-dashboard": {
      return {
        teamName: "Acme Inc.",
        plan: "pro" as const,
        members: [
          {
            id: "user-1",
            name: "Sarah Johnson",
            avatar: "https://api.dicebear.com/9.x/glass/svg?seed=sarah-johnson",
            role: "owner" as const,
            status: "active" as const,
          },
          {
            id: "user-2",
            name: "Mike Chen",
            avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
            role: "admin" as const,
            status: "active" as const,
          },
          {
            id: "user-3",
            name: "Emily Davis",
            avatar: "https://api.dicebear.com/9.x/glass/svg?seed=emily-davis",
            role: "member" as const,
            status: "active" as const,
          },
        ],
        recentActivities: [
          {
            id: "activity-1",
            type: "member_joined" as const,
            user: {
              name: "Alex Rodriguez",
              avatar:
                "https://api.dicebear.com/9.x/glass/svg?seed=alex-rodriguez",
            },
            description: "joined the team",
            timestamp: new Date(now - 2 * 60 * 60 * 1000),
          },
          {
            id: "activity-2",
            type: "ai_session" as const,
            user: {
              name: "Mike Chen",
              avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
            },
            description: "created a new AI session",
            timestamp: new Date(now - 3 * 60 * 60 * 1000),
          },
        ],
        usage: {
          aiTokens: { used: 250_000, limit: 1_000_000 },
          storage: {
            used: 15 * 1024 * 1024 * 1024,
            limit: 100 * 1024 * 1024 * 1024,
          },
          members: { current: 12, limit: 50 },
        },
        onInviteMember: () => {
          /* invite member */
        },
        onManageSettings: () => {
          /* manage settings */
        },
      };
    }
    case "team-member-list": {
      return {
        members: [
          {
            id: "member-1",
            name: "Sarah Johnson",
            email: "sarah@example.com",
            avatar: "https://api.dicebear.com/9.x/glass/svg?seed=sarah-johnson",
            role: "owner" as const,
            status: "active" as const,
            lastActive: new Date(now - 5 * 60 * 1000),
            joinedAt: new Date(now - 30 * 24 * 60 * 60 * 1000),
            aiUsage: {
              tokens: 125_000,
              sessions: 45,
            },
          },
          {
            id: "member-2",
            name: "Mike Chen",
            email: "mike@example.com",
            avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
            role: "admin" as const,
            status: "active" as const,
            lastActive: new Date(now - 15 * 60 * 1000),
            joinedAt: new Date(now - 20 * 24 * 60 * 60 * 1000),
            aiUsage: {
              tokens: 89_000,
              sessions: 32,
            },
          },
          {
            id: "member-3",
            name: "Emily Davis",
            email: "emily@example.com",
            avatar: "https://api.dicebear.com/9.x/glass/svg?seed=emily-davis",
            role: "member" as const,
            status: "active" as const,
            lastActive: new Date(now - 2 * 60 * 60 * 1000),
            joinedAt: new Date(now - 10 * 24 * 60 * 60 * 1000),
            aiUsage: {
              tokens: 45_000,
              sessions: 18,
            },
          },
        ],
        currentUserId: "member-1",
        onPromote: async (memberId: string) => {
          /* promote member */
        },
        onDemote: async (memberId: string) => {
          /* demote member */
        },
        onRemove: async (memberId: string) => {
          /* remove member */
        },
        onResendInvite: async (memberId: string) => {
          /* resend invite */
        },
        showUsage: true,
      };
    }
    case "team-invitations": {
      return {
        invitations: [
          {
            id: "inv-1",
            email: "new@example.com",
            role: "member" as const,
            status: "pending" as const,
            invitedBy: { name: "Sarah Johnson", email: "sarah@example.com" },
            createdAt: new Date(now - 1 * 24 * 60 * 60 * 1000),
            expiresAt: new Date(now + 7 * 24 * 60 * 60 * 1000),
          },
          {
            id: "inv-2",
            link: "https://app.example.com/join/abc123xyz",
            role: "admin" as const,
            status: "pending" as const,
            invitedBy: { name: "Mike Chen", email: "mike@example.com" },
            createdAt: new Date(now - 2 * 24 * 60 * 60 * 1000),
            expiresAt: new Date(now + 3 * 24 * 60 * 60 * 1000),
          },
        ],
        onCreate: async (data: {
          email?: string;
          role: "admin" | "member" | "viewer";
          expiresInDays?: number;
          message?: string;
        }) => {
          /* create invitation */
          return {
            id: `inv-${Date.now()}`,
            email: data.email,
            role: data.role,
            status: "pending" as const,
            invitedBy: { name: "Sarah Johnson", email: "sarah@example.com" },
            createdAt: new Date(),
            expiresAt: data.expiresInDays
              ? new Date(Date.now() + data.expiresInDays * 24 * 60 * 60 * 1000)
              : undefined,
          };
        },
        onRevoke: async (invitationId: string) => {
          /* revoke invitation */
        },
        onResend: async (invitationId: string) => {
          /* resend invitation */
        },
        onCopyLink: async (link: string) => {
          /* copy invitation link */
        },
      };
    }
    case "team-activity-feed": {
      return {
        activities: [
          {
            id: "activity-1",
            type: "member_joined" as const,
            user: {
              id: "user-1",
              name: "Alex Rodriguez",
              avatar:
                "https://api.dicebear.com/9.x/glass/svg?seed=alex-rodriguez",
            },
            description: "joined the team",
            timestamp: new Date(now - 2 * 60 * 60 * 1000),
          },
          {
            id: "activity-2",
            type: "ai_session_created" as const,
            user: {
              id: "user-2",
              name: "Mike Chen",
              avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
            },
            description: "created a new AI session",
            projectId: "project-1",
            projectName: "Website Redesign",
            timestamp: new Date(now - 3 * 60 * 60 * 1000),
          },
          {
            id: "activity-3",
            type: "file_uploaded" as const,
            user: {
              id: "user-3",
              name: "Emily Davis",
              avatar: "https://api.dicebear.com/9.x/glass/svg?seed=emily-davis",
            },
            description: "uploaded project-plan.pdf",
            projectId: "project-1",
            projectName: "Website Redesign",
            timestamp: new Date(now - 5 * 60 * 60 * 1000),
          },
        ],
        onFilterChange: (filters: any) => {
          /* filter activities */
        },
        showFilters: true,
      };
    }
    case "team-chat": {
      return {
        messages: [
          {
            id: "msg-1",
            content: "Hey team! Let's discuss the new feature",
            author: {
              id: "user-1",
              name: "Sarah Johnson",
              avatar:
                "https://api.dicebear.com/9.x/glass/svg?seed=sarah-johnson",
            },
            timestamp: new Date(now - 30 * 60 * 1000),
          },
          {
            id: "msg-2",
            content: "I think we should use @ai to help us brainstorm",
            author: {
              id: "user-2",
              name: "Mike Chen",
              avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
            },
            timestamp: new Date(now - 25 * 60 * 1000),
            isAIMention: true,
          },
        ],
        currentUserId: "user-1",
        onSendMessage: async (content: string) => {
          /* send message */
        },
      };
    }
    case "team-files": {
      return {
        files: [
          {
            id: "file-1",
            name: "project-plan.pdf",
            type: "application/pdf",
            size: 2.5 * 1024 * 1024,
            uploadedBy: {
              id: "user-1",
              name: "Sarah Johnson",
              avatar:
                "https://api.dicebear.com/9.x/glass/svg?seed=sarah-johnson",
            },
            uploadedAt: new Date(now - 2 * 24 * 60 * 60 * 1000),
            tags: ["planning", "project"],
            aiAccessible: true,
          },
          {
            id: "file-2",
            name: "design-mockups.png",
            type: "image/png",
            size: 1.2 * 1024 * 1024,
            uploadedBy: {
              id: "user-2",
              name: "Mike Chen",
              avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
            },
            uploadedAt: new Date(now - 1 * 24 * 60 * 60 * 1000),
            tags: ["design"],
          },
        ],
        onUpload: async (files: File[]) => {
          /* upload files */
        },
        onDelete: async (fileId: string) => {
          /* delete file */
        },
        onDownload: async (fileId: string) => {
          /* download file */
        },
        onToggleAIAccess: async (fileId: string, enabled: boolean) => {
          /* toggle AI access */
        },
      };
    }
    case "team-projects": {
      return {
        projects: [
          {
            id: "project-1",
            name: "Website Redesign",
            description: "Complete redesign of company website",
            color: "#3b82f6",
            members: [
              {
                id: "user-1",
                name: "Sarah Johnson",
                avatar:
                  "https://api.dicebear.com/9.x/glass/svg?seed=sarah-johnson",
              },
              {
                id: "user-2",
                name: "Mike Chen",
                avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
              },
              {
                id: "user-3",
                name: "Emily Davis",
                avatar:
                  "https://api.dicebear.com/9.x/glass/svg?seed=emily-davis",
              },
            ],
            defaultModel: "gpt-4",
            aiUsage: {
              tokens: 250_000,
              sessions: 89,
            },
            createdAt: new Date(now - 30 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(now - 1 * 24 * 60 * 60 * 1000),
          },
          {
            id: "project-2",
            name: "Mobile App",
            description: "New mobile application development",
            color: "#10b981",
            members: [
              {
                id: "user-2",
                name: "Mike Chen",
                avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
              },
              {
                id: "user-3",
                name: "Emily Davis",
                avatar:
                  "https://api.dicebear.com/9.x/glass/svg?seed=emily-davis",
              },
            ],
            defaultModel: "claude-3-opus",
            aiUsage: {
              tokens: 180_000,
              sessions: 65,
            },
            createdAt: new Date(now - 20 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(now - 2 * 24 * 60 * 60 * 1000),
          },
        ],
        currentUserId: "user-1",
        onCreate: async (data: {
          name: string;
          description?: string;
          color?: string;
          defaultModel?: string;
        }) => {
          /* create project */
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
        },
        onUpdate: async (projectId: string, data: any) => {
          /* update project */
        },
        onDelete: async (projectId: string) => {
          /* delete project */
        },
        onSelect: (projectId: string) => {
          /* select project */
        },
      };
    }
    case "team-notes": {
      return {
        notes: [
          {
            id: "note-1",
            title: "Sprint Planning Notes",
            content:
              "Key decisions from today's sprint planning meeting:\n\n1. Focus on user authentication flow\n2. Complete API integration by Friday\n3. Design review scheduled for next week",
            author: {
              id: "user-1",
              name: "Sarah Johnson",
              avatar:
                "https://api.dicebear.com/9.x/glass/svg?seed=sarah-johnson",
            },
            tags: ["sprint", "planning"],
            aiSummary:
              "Meeting notes covering sprint priorities including authentication work, API integration deadline, and upcoming design review.",
            createdAt: new Date(now - 1 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(now - 1 * 24 * 60 * 60 * 1000),
            participants: [
              {
                id: "user-1",
                name: "Sarah Johnson",
                avatar:
                  "https://api.dicebear.com/9.x/glass/svg?seed=sarah-johnson",
              },
              {
                id: "user-2",
                name: "Mike Chen",
                avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
              },
              {
                id: "user-3",
                name: "Emily Davis",
                avatar:
                  "https://api.dicebear.com/9.x/glass/svg?seed=emily-davis",
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
              avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
            },
            tags: ["api", "documentation"],
            createdAt: new Date(now - 2 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(now - 1 * 24 * 60 * 60 * 1000),
            lastEditedBy: {
              id: "user-1",
              name: "Sarah Johnson",
            },
          },
        ],
        currentUserId: "user-1",
        onCreate: async (data: {
          title: string;
          content: string;
          tags?: string[];
        }) => {
          /* create note */
          return {
            id: `note-${Date.now()}`,
            title: data.title,
            content: data.content,
            author: { id: "user-1", name: "Sarah Johnson" },
            tags: data.tags,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        },
        onUpdate: async (
          noteId: string,
          data: { title?: string; content?: string; tags?: string[] }
        ) => {
          /* update note */
        },
        onDelete: async (noteId: string) => {
          /* delete note */
        },
        onSummarize: async (noteId: string) => {
          /* generate AI summary */
          return "AI-generated summary of the note content.";
        },
      };
    }
    case "team-analytics": {
      return {
        tokenUsage: {
          current: 250_000,
          previous: 200_000,
        },
        sessionCount: {
          current: 145,
          previous: 120,
        },
        memberUsage: [
          {
            id: "user-1",
            name: "Sarah Johnson",
            avatar: "https://api.dicebear.com/9.x/glass/svg?seed=sarah-johnson",
            tokens: 125_000,
            sessions: 45,
            files: 12,
          },
          {
            id: "user-2",
            name: "Mike Chen",
            avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
            tokens: 89_000,
            sessions: 32,
            files: 8,
          },
          {
            id: "user-3",
            name: "Emily Davis",
            avatar: "https://api.dicebear.com/9.x/glass/svg?seed=emily-davis",
            tokens: 45_000,
            sessions: 18,
            files: 5,
          },
        ],
        topProjects: [
          {
            id: "project-1",
            name: "Website Redesign",
            usage: 250_000,
          },
          {
            id: "project-2",
            name: "Mobile App",
            usage: 180_000,
          },
        ],
      };
    }
    case "team-ai-room": {
      return {
        roomName: "Shared AI Workspace",
        participants: [
          {
            id: "user-1",
            name: "Sarah Johnson",
            avatar: "https://api.dicebear.com/9.x/glass/svg?seed=sarah-johnson",
          },
          {
            id: "user-2",
            name: "Mike Chen",
            avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
          },
          {
            id: "user-3",
            name: "Emily Davis",
            avatar: "https://api.dicebear.com/9.x/glass/svg?seed=emily-davis",
          },
        ],
        messages: [
          {
            id: "ai-msg-1",
            role: "user" as const,
            content: "What are the best practices for React components?",
            author: {
              id: "user-1",
              name: "Sarah Johnson",
              avatar:
                "https://api.dicebear.com/9.x/glass/svg?seed=sarah-johnson",
            },
            timestamp: new Date(now - 10 * 60 * 1000),
          },
          {
            id: "ai-msg-2",
            role: "assistant" as const,
            content:
              "Here are some best practices for React components:\n\n1. **Single Responsibility**: Each component should have one clear purpose\n2. **Composition over Inheritance**: Build complex UIs from simple components\n3. **Props Validation**: Use TypeScript or PropTypes\n4. **Avoid Prop Drilling**: Use Context API for deeply nested data\n5. **Memoization**: Use React.memo() and useMemo() wisely",
            timestamp: new Date(now - 9 * 60 * 1000),
          },
        ],
        currentUserId: "user-1",
        onSendMessage: async (content: string) => {
          /* send message */
        },
      };
    }
    case "team-notifications": {
      return {
        notifications: [
          {
            id: "notif-1",
            type: "mention" as const,
            title: "You were mentioned",
            message: "Mike Chen mentioned you in a chat message",
            user: {
              id: "user-2",
              name: "Mike Chen",
              avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
            },
            read: false,
            timestamp: new Date(now - 10 * 60 * 1000),
            link: "#chat",
          },
          {
            id: "notif-2",
            type: "ai_event" as const,
            title: "AI Session Completed",
            message:
              "Your AI session in Website Redesign project has finished processing",
            read: false,
            timestamp: new Date(now - 30 * 60 * 1000),
            link: "#ai-room",
          },
          {
            id: "notif-3",
            type: "file_shared" as const,
            title: "File Shared",
            message: "Sarah Johnson shared project-plan.pdf with you",
            user: {
              id: "user-1",
              name: "Sarah Johnson",
              avatar:
                "https://api.dicebear.com/9.x/glass/svg?seed=sarah-johnson",
            },
            read: true,
            timestamp: new Date(now - 2 * 60 * 60 * 1000),
            link: "#files",
          },
        ],
        unreadCount: 3,
        onMarkAsRead: async (notificationId: string) => {
          /* mark as read */
        },
        onMarkAllAsRead: async () => {
          /* mark all as read */
        },
        onDelete: async (notificationId: string) => {
          /* delete notification */
        },
      };
    }
    case "team-prompt-library": {
      return {
        prompts: [
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
              avatar:
                "https://api.dicebear.com/9.x/glass/svg?seed=sarah-johnson",
            },
            rating: 4.5,
            usageCount: 45,
            bestModel: "gpt-4",
            tags: ["code", "review", "best-practices"],
            createdAt: new Date(now - 7 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(now - 7 * 24 * 60 * 60 * 1000),
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
              avatar: "https://api.dicebear.com/9.x/glass/svg?seed=mike-chen",
            },
            rating: 4.8,
            usageCount: 32,
            bestModel: "claude-3-opus",
            tags: ["writing", "blog", "content"],
            tone: "professional",
            createdAt: new Date(now - 5 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(now - 5 * 24 * 60 * 60 * 1000),
          },
        ],
        currentUserId: "user-1",
        onCreate: async (data: {
          title: string;
          prompt: string;
          description?: string;
          category?: string;
          tags?: string[];
          bestModel?: string;
          tone?: string;
        }) => {
          /* create prompt */
          return {
            id: `prompt-${Date.now()}`,
            title: data.title,
            prompt: data.prompt,
            description: data.description,
            category: data.category,
            tags: data.tags,
            author: { id: "user-1", name: "Sarah Johnson" },
            bestModel: data.bestModel,
            tone: data.tone,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        },
        onUpdate: async (promptId: string, data: any) => {
          /* update prompt */
        },
        onDelete: async (promptId: string) => {
          /* delete prompt */
        },
        onFavorite: async (promptId: string, isFavorite: boolean) => {
          /* toggle favorite */
        },
        onUse: (prompt: any) => {
          /* use prompt */
        },
      };
    }
    case "team-permissions-matrix": {
      return {};
    }
    case "team-settings": {
      return {
        plan: "pro" as const,
        settings: {
          name: "Acme Inc.",
          description: "A modern software company",
          slug: "acme-inc",
          color: "#3b82f6",
          defaultModel: "gpt-4",
        },
        onSave: async (settings: {
          name: string;
          description?: string;
          avatar?: string;
          slug?: string;
          color?: string;
          defaultModel?: string;
          defaultAccessScope?: string[];
          metadata?: Record<string, string>;
        }) => {
          /* save team settings */
        },
        onAvatarUpload: async (file: File) => {
          /* upload avatar */
          return "https://api.dicebear.com/9.x/glass/svg?seed=team-avatar";
        },
        onAvatarRemove: async () => {
          /* remove avatar */
        },
      };
    }
    // Task Blocks
    case "task-board": {
      const baseDate = new Date("2025-11-18T09:00:00Z");
      return {
        tasks: [
          {
            id: "task-1",
            title: "Redesign homepage hero section",
            description:
              "Update the hero section with new messaging, improved CTA placement, and better visual hierarchy. Need to align with brand guidelines and ensure accessibility standards. Include A/B testing setup for conversion optimization.",
            status: "in_progress" as const,
            priority: "high" as const,
            assignees: [
              {
                id: "user-1",
                name: "Sarah Chen",
                avatar:
                  "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
              },
              {
                id: "user-2",
                name: "Marcus Rodriguez",
                avatar:
                  "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
              },
            ],
            tags: ["design", "frontend", "ui"],
            dueDate: new Date(baseDate.getTime() + 5 * 24 * 60 * 60 * 1000),
            createdAt: new Date(baseDate.getTime() - 12 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000),
          },
          {
            id: "task-2",
            title: "Implement OAuth 2.0 authentication flow",
            description:
              "Add Google and GitHub OAuth providers. Need to handle token refresh, session management, and secure storage. Include rate limiting and CSRF protection. Must pass security audit before production deployment.",
            status: "todo" as const,
            priority: "urgent" as const,
            assignees: [
              {
                id: "user-3",
                name: "Emily Watson",
                avatar:
                  "https://api.dicebear.com/9.x/glass/svg?seed=EmilyWatson2024",
              },
            ],
            tags: ["backend", "security", "auth"],
            dueDate: new Date(baseDate.getTime() + 10 * 24 * 60 * 60 * 1000),
            createdAt: new Date(baseDate.getTime() - 8 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(baseDate.getTime() - 8 * 24 * 60 * 60 * 1000),
          },
          {
            id: "task-3",
            title: "Complete API documentation for v2.0",
            description:
              "Document all REST endpoints with request/response examples, error codes, rate limits, and authentication requirements. Include Postman collection and OpenAPI spec. Update developer portal with interactive docs.",
            status: "done" as const,
            priority: "medium" as const,
            assignees: [
              {
                id: "user-4",
                name: "David Kim",
                avatar:
                  "https://api.dicebear.com/9.x/glass/svg?seed=DavidKim2024",
              },
            ],
            tags: ["documentation", "api"],
            createdAt: new Date(baseDate.getTime() - 25 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000),
          },
          {
            id: "task-4",
            title: "Fix iOS Safari layout bugs",
            description:
              "Address viewport issues on iPhone 12-15, fix sticky header behavior, and resolve form input zoom problems. Test on iOS 15-17. Ensure touch targets meet accessibility guidelines (44x44pt minimum).",
            status: "todo" as const,
            priority: "high" as const,
            assignees: [
              {
                id: "user-1",
                name: "Sarah Chen",
                avatar:
                  "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
              },
              {
                id: "user-5",
                name: "Priya Patel",
                avatar:
                  "https://api.dicebear.com/9.x/glass/svg?seed=PriyaPatel2024",
              },
            ],
            tags: ["frontend", "mobile", "bug"],
            dueDate: new Date(baseDate.getTime() + 2 * 24 * 60 * 60 * 1000),
            createdAt: new Date(baseDate.getTime() - 4 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000),
          },
        ],
        onTaskSelect: (taskId: string) => {
          /* select task - open detail view */
        },
        onTaskMove: async (
          taskId: string,
          fromStatus: string,
          toStatus: string
        ) => {
          /* move task between columns - update status in database */
        },
        onTaskUpdate: async (taskId: string, updates: any) => {
          /* update task fields */
        },
        onTaskDelete: async (taskId: string) => {
          /* delete task after confirmation */
        },
      };
    }
    case "task-create": {
      return {
        availableAssignees: [
          { id: "user-1", name: "Sarah Chen" },
          { id: "user-2", name: "Marcus Rodriguez" },
          { id: "user-3", name: "Emily Watson" },
          { id: "user-4", name: "David Kim" },
          { id: "user-5", name: "Priya Patel" },
        ],
        availableProjects: [
          { id: "project-1", name: "Q4 Website Redesign" },
          { id: "project-2", name: "Mobile App v2.0" },
          { id: "project-3", name: "Payment System Integration" },
          { id: "project-4", name: "Performance Optimization" },
        ],
        onCreate: async (data: any) => {
          /* create task in database and return with generated ID */
          return {
            id: `task-${Date.now()}`,
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            assignees: data.assigneeIds
              ? data.assigneeIds.map((id: string) => ({
                  id,
                  name: "Assignee",
                  avatar: `https://api.dicebear.com/9.x/glass/svg?seed=${id}`,
                }))
              : [],
            tags: data.tags || [],
            dueDate: data.dueDate,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        },
        onCancel: () => {
          /* cancel creation - close modal or navigate back */
        },
      };
    }
    case "task-detail": {
      const baseDate = new Date("2025-11-18T09:00:00Z");
      return {
        task: {
          id: "1",
          title: "Redesign homepage hero section",
          description:
            "Update the hero section with new messaging, improved CTA placement, and better visual hierarchy. Need to align with brand guidelines.",
          status: "in_progress" as const,
          priority: "high" as const,
          assignees: [
            {
              id: "1",
              name: "Sarah Chen",
              avatar:
                "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
            },
            {
              id: "2",
              name: "Marcus Rodriguez",
              avatar:
                "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
            },
          ],
          tags: ["design", "frontend", "ui"],
          dueDate: new Date(baseDate.getTime() + 5 * 24 * 60 * 60 * 1000),
          createdAt: new Date(baseDate.getTime() - 12 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000),
        },
        subtasks: [
          { id: "1", title: "Create wireframes", completed: true },
          { id: "2", title: "Design mockups", completed: true },
          { id: "3", title: "Get stakeholder approval", completed: false },
          { id: "4", title: "Implement design", completed: false },
        ],
        comments: [
          {
            id: "1",
            content:
              "I've reviewed the design mockups and they look good! One suggestion: we should increase the CTA button size on mobile.",
            author: {
              id: "2",
              name: "Marcus Rodriguez",
              avatar:
                "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
            },
            createdAt: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000),
          },
        ],
        attachments: [
          {
            id: "1",
            name: "hero-section-mockup-v3.fig",
            url: "#",
            size: 3_456_000,
            type: "application/octet-stream",
            uploadedBy: {
              id: "1",
              name: "Sarah Chen",
              avatar:
                "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
            },
            uploadedAt: new Date(baseDate.getTime() - 5 * 24 * 60 * 60 * 1000),
          },
        ],
        activities: [
          {
            id: "1",
            type: "created" as const,
            user: {
              id: "2",
              name: "Marcus Rodriguez",
              avatar:
                "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
            },
            description: "created this task",
            timestamp: new Date(baseDate.getTime() - 12 * 24 * 60 * 60 * 1000),
          },
          {
            id: "2",
            type: "assigned" as const,
            user: {
              id: "2",
              name: "Marcus Rodriguez",
              avatar:
                "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
            },
            description: "assigned to Sarah Chen and Marcus Rodriguez",
            timestamp: new Date(baseDate.getTime() - 11 * 24 * 60 * 60 * 1000),
          },
        ],
        onUpdate: async (updates: any) => {
          /* update task */
        },
        onDelete: async () => {
          /* delete task */
        },
      };
    }
    case "task-filters": {
      return {
        availableAssignees: [
          { id: "user-1", name: "Sarah Chen" },
          { id: "user-2", name: "Marcus Rodriguez" },
          { id: "user-3", name: "Emily Watson" },
          { id: "user-4", name: "David Kim" },
          { id: "user-5", name: "Priya Patel" },
        ],
        availableProjects: [
          { id: "project-1", name: "Q4 Website Redesign" },
          { id: "project-2", name: "Mobile App v2.0" },
          { id: "project-3", name: "Payment System Integration" },
          { id: "project-4", name: "Performance Optimization" },
        ],
        availableTags: [
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
        ],
        onFiltersChange: (filters: any) => {
          /* handle filter changes - update URL params, refetch tasks, etc. */
        },
      };
    }
    case "task-list": {
      const baseDate = new Date("2025-11-18T09:00:00Z");
      return {
        tasks: [
          {
            id: "task-1",
            title: "Redesign homepage hero section",
            description:
              "Update the hero section with new messaging, improved CTA placement, and better visual hierarchy. Need to align with brand guidelines and ensure accessibility standards.",
            status: "in_progress" as const,
            priority: "high" as const,
            assignees: [
              {
                id: "user-1",
                name: "Sarah Chen",
                avatar:
                  "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
              },
              {
                id: "user-2",
                name: "Marcus Rodriguez",
                avatar:
                  "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
              },
            ],
            tags: ["design", "frontend", "ui"],
            dueDate: new Date(baseDate.getTime() + 5 * 24 * 60 * 60 * 1000),
            createdAt: new Date(baseDate.getTime() - 12 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000),
          },
          {
            id: "task-2",
            title: "Implement OAuth 2.0 authentication flow",
            description:
              "Add Google and GitHub OAuth providers. Need to handle token refresh, session management, and secure storage. Include rate limiting and CSRF protection. Must pass security audit before production deployment.",
            status: "todo" as const,
            priority: "urgent" as const,
            assignees: [
              {
                id: "user-3",
                name: "Emily Watson",
                avatar:
                  "https://api.dicebear.com/9.x/glass/svg?seed=EmilyWatson2024",
              },
            ],
            tags: ["backend", "security", "auth"],
            dueDate: new Date(baseDate.getTime() + 10 * 24 * 60 * 60 * 1000),
            createdAt: new Date(baseDate.getTime() - 8 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(baseDate.getTime() - 8 * 24 * 60 * 60 * 1000),
          },
          {
            id: "task-3",
            title: "Complete API documentation for v2.0",
            description:
              "Document all REST endpoints with request/response examples, error codes, rate limits, and authentication requirements. Include Postman collection and OpenAPI spec. Update developer portal with interactive docs.",
            status: "done" as const,
            priority: "medium" as const,
            assignees: [
              {
                id: "user-4",
                name: "David Kim",
                avatar:
                  "https://api.dicebear.com/9.x/glass/svg?seed=DavidKim2024",
              },
            ],
            tags: ["documentation", "api"],
            createdAt: new Date(baseDate.getTime() - 25 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000),
          },
        ],
        onTaskSelect: (taskId: string) => {
          /* select task - open detail view or navigate */
        },
        onTaskUpdate: async (taskId: string, updates: any) => {
          /* update task in database */
        },
        onTaskDelete: async (taskId: string) => {
          /* delete task after confirmation */
        },
      };
    }
    case "task-progress": {
      const baseDate = new Date("2025-11-18T09:00:00Z");
      return {
        goal: 12,
        tasks: [
          {
            id: "task-1",
            title: "Redesign homepage hero section",
            status: "done" as const,
            priority: "high" as const,
            assignees: [],
            tags: [],
            createdAt: new Date(baseDate.getTime() - 12 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000),
          },
          {
            id: "task-2",
            title: "Implement OAuth 2.0 authentication flow",
            status: "done" as const,
            priority: "urgent" as const,
            assignees: [],
            tags: [],
            createdAt: new Date(baseDate.getTime() - 8 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000),
          },
          {
            id: "task-3",
            title: "Complete API documentation for v2.0",
            status: "done" as const,
            priority: "medium" as const,
            assignees: [],
            tags: [],
            createdAt: new Date(baseDate.getTime() - 25 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000),
          },
          {
            id: "task-4",
            title: "Fix iOS Safari layout bugs",
            status: "in_progress" as const,
            priority: "high" as const,
            assignees: [],
            tags: [],
            createdAt: new Date(baseDate.getTime() - 4 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000),
          },
          {
            id: "task-5",
            title: "Configure GitHub Actions for automated deployments",
            status: "in_progress" as const,
            priority: "medium" as const,
            assignees: [],
            tags: [],
            createdAt: new Date(baseDate.getTime() - 15 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(baseDate.getTime() - 6 * 24 * 60 * 60 * 1000),
          },
        ],
      };
    }
    case "project-list": {
      const baseDate = new Date("2025-11-18T09:00:00Z");
      return {
        projects: [
          {
            id: "1",
            name: "Q4 Website Redesign",
            description:
              "Complete redesign of company website with focus on conversion optimization.",
            status: "active" as const,
            progress: 68,
            color: "#3b82f6",
            members: [
              {
                id: "1",
                name: "Sarah Chen",
                avatar:
                  "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
              },
              {
                id: "2",
                name: "Marcus Rodriguez",
                avatar:
                  "https://api.dicebear.com/9.x/glass/svg?seed=MarcusRodriguez2024",
              },
            ],
            taskCount: 24,
            completedTaskCount: 16,
            createdAt: new Date(baseDate.getTime() - 45 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000),
          },
          {
            id: "2",
            name: "Mobile App v2.0",
            description:
              "Major update to mobile application with new features.",
            status: "active" as const,
            progress: 42,
            color: "#10b981",
            members: [
              {
                id: "1",
                name: "Sarah Chen",
                avatar:
                  "https://api.dicebear.com/9.x/glass/svg?seed=SarahChen2024",
              },
            ],
            taskCount: 18,
            completedTaskCount: 8,
            createdAt: new Date(baseDate.getTime() - 30 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000),
          },
        ],
        onProjectSelect: (projectId: string) => {
          /* select project */
        },
      };
    }

    default:
      return {};
  }
}

"use client";

import { useState } from "react";
import AICitations, {
  type Citation,
} from "@/components/blocks/ai/ai-citations";
import AIConversation, {
  type Message,
} from "@/components/blocks/ai/ai-conversation";
import AIMessage from "@/components/blocks/ai/ai-message";
import AIModelSelector from "@/components/blocks/ai/ai-model-selector";
import AIPromptInput from "@/components/blocks/ai/ai-prompt-input";
import AIStreamingResponse from "@/components/blocks/ai/ai-streaming-response";
import AIThinking from "@/components/blocks/ai/ai-thinking";
import AIUsageQuota, {
  type Quota,
  type RateLimit,
  type TokenUsage,
} from "@/components/blocks/ai/ai-usage-quota";

import { Hero } from "@/components/hero";

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

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4o");

  return (
    <div className="mx-auto flex w-[95%] flex-col gap-16 px-4 py-12">
      <div>
        <Hero />
      </div>
      <p className="text-center text-muted-foreground">
        We&apos;re working on new components and blocks. stay tuned!
      </p>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-8 rounded-xl">
          <AIModelSelector
            onModelSelect={(model) => {
              setSelectedModel(model.id);
              console.log("Selected model:", model);
            }}
            selectedModelId={selectedModel}
          />
          <AIPromptInput />
          <AIStreamingResponse
            autoStart={true}
            className="rounded-xl border p-4 shadow-xs md:p-6"
            content={streamingContent}
            onComplete={() => console.log("Streaming complete")}
          />
        </div>
        {/* Second column: AIConversation */}
        <div className="flex flex-col gap-8">
          <AIThinking className="max-w-max" />
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
        </div>
      </div>
    </div>
  );
}

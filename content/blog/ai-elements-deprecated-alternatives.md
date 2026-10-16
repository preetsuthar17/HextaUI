If you built an AI chat with Vercel's AI Elements this year, the repository now carries a notice: the library will be deprecated at the end of November 2026, replaced by AI Elements from shadcn/ui.

This post covers what that means for your code, what the replacement is, and the other options if you are starting an AI chat UI with shadcn/ui in late 2026. I maintain one of those options, [HextaUI](https://hextaui.com), so I will say where it fits and where it does not.

## First: your code keeps working

AI Elements was a shadcn-style registry. The components were copied into your project. There is no package to stop receiving updates, so nothing breaks on 1 December. The deprecation means no new components and no fixes from Vercel, and the docs will eventually point elsewhere.

You have time. Do not rush a migration this week.

## What replaces it

In October 2026 shadcn/ui published its own [AI Elements](https://ui.shadcn.com/docs/ai-elements): 21 patterns for agentic interfaces built from shadcn/ui components. Chat, Prompt Input, Reasoning, Tool, Plan, Subagent and more. Each pattern page shows how to render it from AI SDK message parts. There is no package. You copy each pattern in.

They ship alongside two new components, Trace and Code Block, that work across Base UI, React Aria and Radix.

Migration from the Vercel library is meant to be low-friction. Export names and props are kept where the pattern was rebuilt, and each pattern page includes a migration prompt you can hand to an AI coding agent. Elements that were not rebuilt are not covered, so check the list against what you use.

## The honest difference between pieces and screens

Every option below falls into one of two camps, and knowing which you want saves a week.

**Pieces** give you a Message, a Prompt Input, a Tool component. You design the screen and decide what happens when a reply fails, when a stream is stopped, when a tool needs approval, when an upload dies. Both versions of AI Elements, and prompt-kit, are pieces.

**Screens** give you the chat thread, composer, tool call list and settings pages with those decisions already made. You wire data in and restyle with your theme tokens. HextaUI's blocks and complete apps like Vercel's AI Chatbot template are screens.

Pieces are free and flexible. Screens are faster and opinionated. Neither is wrong.

## Five options compared

### 1. AI Elements from shadcn/ui

Free, MIT, maintained by the shadcn team, built for Base UI, React Aria and Radix. Pieces, not screens. The natural default if you want to compose your own and stay on the most-used registry. New as of October 2026, so expect the pattern list to grow and the rough edges to be sanded over the next few months.

### 2. prompt-kit

Free, MIT, installs with the shadcn CLI. Prompt Input, Message, Reasoning, Chain of Thought, Tool, File Upload and example blocks including a chat app with a history sidebar. Pieces, with good examples. Built on Radix, so a Base UI project carries both primitive layers while you use it.

### 3. assistant-ui

Free, MIT, with an optional paid cloud for saved threads. This one is different in kind: it is a chat framework with its own runtime that manages the conversation, plus headless primitives and styled components that read from it. Adapters for the AI SDK, LangGraph, LangChain, AG-UI and others. Pick it if you want the runtime to own the chat state. Skip it if your state already lives in `useChat` or your own store and you do not want anything wrapping your app.

### 4. shadcn-chatbot-kit and the AI Chatbot template

Blazity's shadcn-chatbot-kit is a smaller set of chatbot components. Vercel's AI Chatbot is a complete Next.js app with sign-in and a database, which is the canonical reference if you want to see every piece wired. Both are useful to read even if you do not adopt them.

### 5. HextaUI blocks

Screens. A Chat Thread where failed replies offer Try again, stopped replies say so, and edits and retries become versions you can switch between. Tool Calls with every AI SDK tool state including approvals with a "do this instead" reason. Streaming and Markdown that never show half-typed syntax. A Prompt Input that is safe with Japanese and Chinese input, shows upload progress and retry, queues messages typed during a reply and keeps drafts across reloads. Plus the screens around a chat product: settings, models, API keys, billing, team, security.

The components underneath are free and MIT. The AI blocks are HextaUI Pro, a one-time payment with every later block included, and Prompt Input is free. Built on Base UI, reads AI SDK message parts without importing the SDK. Not for you if you want everything free, or if you want Radix.

## At a glance

| | Camp | Price | Primitives | AI SDK |
|---|---|---|---|---|
| AI Elements (shadcn/ui) | Pieces | Free | Base UI, React Aria, Radix | Used in examples |
| AI Elements (Vercel) | Pieces | Free | Radix | Required by setup |
| prompt-kit | Pieces | Free | Radix | Optional |
| assistant-ui | Runtime | Free, paid cloud | Own | Adapter |
| HextaUI | Screens | Components free, blocks paid once | Base UI | Optional, same parts shape |

## How to decide

- You are starting fresh and want to compose your own: **AI Elements from shadcn/ui**.
- You already have Vercel's AI Elements in your tree: keep it until you need something new, then move pattern by pattern using the migration prompts.
- You want a runtime to manage threads, branching and persistence for you: **assistant-ui**.
- You want the chat and the product screens around it done, with the failure states handled, and you are fine paying once: **HextaUI**.

All of these copy source into your project and use the shadcn/ui theme tokens, so you can mix them one screen at a time. The one caution is primitives: mixing a Radix-based kit into a Base UI project works, but you ship both.

I keep a more detailed comparison with the full piece-by-piece mapping at [hextaui.com/compare/ai-elements](https://hextaui.com/compare/ai-elements), and a seven-way look at [shadcn AI chat templates](https://hextaui.com/compare/shadcn-ai-chat-templates).

## FAQ

**When exactly is Vercel's AI Elements deprecated?** The repository says the end of November 2026.

**Will my existing AI Elements components break?** No. They live in your repository. They stop receiving updates.

**Is the new AI Elements a package?** No. It is a set of patterns you copy in with the shadcn CLI, the same model as shadcn/ui itself.

**Can I use HextaUI blocks without the Vercel AI SDK?** Yes. They take messages as props in the AI SDK's parts shape, and do not import the SDK.

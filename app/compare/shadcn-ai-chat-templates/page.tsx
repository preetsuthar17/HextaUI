import type { Metadata } from "next"

import { DocsCommand } from "@/components/docs/docs-command"
import {
  DocsCode,
  DocsList,
  DocsParagraph,
} from "@/components/docs/docs-content"
import { LegalLink, LegalSection } from "@/components/legal/legal-page"
import { CompareTable, MoreComparisons } from "@/components/site/compare"
import { InfoPage } from "@/components/site/info-page"
import { pageMetadata } from "@/lib/metadata"

const path = "/compare/shadcn-ai-chat-templates"

export const metadata: Metadata = pageMetadata({
  title: "shadcn AI chat templates: 7 options compared",
  description:
    "Seven shadcn/ui AI chat templates and kits compared, from component kits to complete apps, with the states a chat has to handle before it ships.",
  path,
})

export default function Page() {
  return (
    <InfoPage
      title="shadcn/ui AI chat templates"
      lead="A shadcn/ui AI chat template is chat UI built from shadcn/ui components that you copy into your own project. Some give you pieces, some give you a whole app. This page compares seven options as of October 2026, and lists what a chat has to handle before you ship it."
    >
      <LegalSection title="What a chat template has to handle">
        <DocsParagraph>
          The message list and the composer take an afternoon. The states around
          them take weeks. Check a template against this list before you choose
          it:
        </DocsParagraph>
        <DocsList>
          <li>
            Streaming that reads smoothly, without half-typed Markdown, broken
            tables or unclosed code fences on screen.
          </li>
          <li>
            Stop, retry and a reply that fails halfway, each with its own
            message and next step.
          </li>
          <li>
            Editing an earlier message or regenerating a reply, without losing
            the version that was there before.
          </li>
          <li>
            Scrolling that follows new text until the reader scrolls up, and a
            way back down.
          </li>
          <li>
            Tool calls that show what the model did, and approvals that can
            pause a reply until someone answers.
          </li>
          <li>
            Attachments with upload progress, failures and retry, plus pasted
            text and dropped files.
          </li>
          <li>
            A composer that doesn’t send halfway through Japanese, Chinese or
            Korean input, and keeps the draft if the page reloads.
          </li>
          <li>
            An empty state, a chat history, and a layout that still works on a
            phone with the keyboard open.
          </li>
        </DocsList>
      </LegalSection>

      <LegalSection title="The options at a glance">
        <CompareTable
          caption="shadcn/ui AI chat templates and kits"
          columns={["What you get", "License", "Backend"]}
          rows={[
            {
              label: "HextaUI",
              values: [
                "Finished chat screens and a complete chat app",
                "MIT components, paid Pro blocks, free Prompt Input",
                "Any, using AI SDK message parts",
              ],
            },
            {
              label: "Vercel Chatbot",
              values: [
                "A full Next.js app with sign-in and a database",
                "Apache 2.0",
                "AI SDK",
              ],
            },
            {
              label: "AI Elements (shadcn/ui)",
              values: ["Patterns you compose", "MIT", "AI SDK in the examples"],
            },
            {
              label: "AI Elements (Vercel)",
              values: [
                "Components, deprecated at the end of November 2026",
                "Apache 2.0",
                "AI SDK",
              ],
            },
            {
              label: "assistant-ui",
              values: [
                "Chat primitives with state management",
                "MIT",
                "AI SDK, LangGraph or your own",
              ],
            },
            {
              label: "prompt-kit",
              values: ["Components for AI apps", "MIT", "Any"],
            },
            {
              label: "shadcn-chatbot-kit",
              values: ["Chat components", "MIT", "AI SDK"],
            },
          ]}
        />
      </LegalSection>

      <LegalSection title="HextaUI">
        <DocsParagraph>
          HextaUI is a component library for shadcn/ui with Pro blocks for AI
          products. <LegalLink href="/blocks/hexta-ai">HextaAI</LegalLink> is
          the complete chat app built from them: a chat sidebar, a thread with
          versions and checkpoints, thinking with sources, tool calls with
          approvals, artifacts beside the chat, streamed Markdown and voice
          mode. The blocks handle the states on the list above, and each one
          also works on its own. Choose it when you want the screens finished
          and would rather spend your time on the product.
        </DocsParagraph>
        <DocsParagraph>
          The composer,{" "}
          <LegalLink href="/blocks/prompt-input">Prompt Input</LegalLink>, is
          free. Install it without an account:
        </DocsParagraph>
        <DocsCommand
          className="mt-4"
          mode="dlx"
          packages={[
            "shadcn@latest",
            "add",
            "https://hextaui.com/r/pro/prompt-input.json",
          ]}
        />
      </LegalSection>

      <LegalSection title="Vercel Chatbot">
        <DocsParagraph>
          <LegalLink href="https://github.com/vercel/chatbot">
            Vercel Chatbot
          </LegalLink>
          , formerly called AI Chatbot, is a complete Next.js app with sign-in,
          a Postgres database, saved chats and the AI SDK. Choose it when you
          want a working product to deploy today and are happy with its design
          and its stack.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="AI Elements">
        <DocsParagraph>
          <LegalLink href="https://ui.shadcn.com/docs/ai-elements">
            AI Elements from shadcn/ui
          </LegalLink>{" "}
          is a set of patterns, such as Chat, Message, Tool and Prompt Input,
          that you copy into your project. It replaces{" "}
          <LegalLink href="https://elements.ai-sdk.dev">
            Vercel’s AI Elements
          </LegalLink>
          , which will be deprecated at the end of November 2026. Choose it when
          you want free, well-made pieces and plan to build the screens
          yourself. See{" "}
          <LegalLink href="/compare/ai-elements">
            HextaUI vs AI Elements
          </LegalLink>{" "}
          for a piece-by-piece comparison.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="assistant-ui">
        <DocsParagraph>
          <LegalLink href="https://github.com/assistant-ui/assistant-ui">
            assistant-ui
          </LegalLink>{" "}
          is a React library of chat primitives, such as a thread and a
          composer, with runtimes that manage chat state for the AI SDK,
          LangGraph or your own backend. Choose it when the hard part is state
          rather than the interface, for example an agent on LangGraph.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="prompt-kit and shadcn-chatbot-kit">
        <DocsParagraph>
          <LegalLink href="https://github.com/ibelick/prompt-kit">
            prompt-kit
          </LegalLink>{" "}
          and{" "}
          <LegalLink href="https://github.com/Blazity/shadcn-chatbot-kit">
            shadcn-chatbot-kit
          </LegalLink>{" "}
          are free component kits that install with the shadcn CLI. They are a
          good fit for a small chat inside a larger app, where you need a
          message list, a prompt box and Markdown, and little else.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="How to choose">
        <DocsList>
          <li>
            You want a deployable app this week and its stack suits you: Vercel
            Chatbot.
          </li>
          <li>
            You want free pieces and full control of the design: AI Elements
            from shadcn/ui, or prompt-kit.
          </li>
          <li>
            Your backend has complex chat state, such as LangGraph:
            assistant-ui.
          </li>
          <li>
            You want finished screens with the hard states handled, plus
            settings pages for your AI product: HextaUI.
          </li>
        </DocsList>
        <DocsParagraph>
          They mix well. Most of them copy shadcn/ui source into your project
          and share the same theme tokens, so you can keep one and replace a
          single piece with another. For example, keep the Vercel Chatbot
          backend and swap its composer for Prompt Input, which reads the same{" "}
          <DocsCode>useChat</DocsCode> status.
        </DocsParagraph>
      </LegalSection>

      <MoreComparisons current={path} />
    </InfoPage>
  )
}

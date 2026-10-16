import type { Metadata } from "next"

import {
  DocsCode,
  DocsList,
  DocsParagraph,
} from "@/components/docs/docs-content"
import { LegalLink, LegalSection } from "@/components/legal/legal-page"
import { CompareTable, MoreComparisons } from "@/components/site/compare"
import { InfoPage } from "@/components/site/info-page"
import { JsonLd } from "@/components/site/json-ld"
import { t } from "@/lib/i18n/rich"
import { pageMetadata } from "@/lib/metadata"
import { faqPageJsonLd } from "@/lib/structured-data"

const path = "/compare/assistant-ui"

export const metadata: Metadata = pageMetadata({
  title: "HextaUI vs assistant-ui: chat runtime or screens",
  description:
    "assistant-ui is a free chat framework with its own runtime. HextaUI gives you finished AI screens that read AI SDK message parts and leave the state to you.",
  path,
})

const questions = [
  {
    question: "Is assistant-ui free?",
    answer:
      "Yes. assistant-ui is open source under the MIT license. Assistant Cloud, its hosted service for saved threads and analytics, is optional and has a free plan alongside paid ones.",
  },
  {
    question: "Does HextaUI have a runtime like assistant-ui?",
    answer:
      "No. HextaUI blocks are React components that take messages as props, in the same shape the AI SDK’s useChat returns. Your chat state stays in useChat, your own store or your server, and nothing wraps your app.",
  },
  {
    question: "Is HextaUI free?",
    answer:
      "The components are free and MIT licensed. The AI blocks and full screens are HextaUI Pro, a single payment with every later block included. Prompt Input is free.",
  },
  {
    question: "Can I use HextaUI and assistant-ui in the same project?",
    answer:
      "Yes, but let one of them own the chat. Both put their source in your project and use the shadcn/ui theme tokens, so HextaUI settings pages or components sit next to an assistant-ui thread without restyling.",
  },
]

export default function Page() {
  return (
    <InfoPage
      breadcrumbs={[
        { name: "Compare", path: "/compare" },
        { name: "HextaUI vs assistant-ui", path: "/compare/assistant-ui" },
      ]}
      title="HextaUI and assistant-ui"
      lead="assistant-ui is a chat framework: a runtime that manages the conversation, with components that read from it. HextaUI gives you finished screens as plain components, and leaves the state where it already is. This page compares them as of October 2026."
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            faqPageJsonLd(
              path,
              questions.map((item) => ({
                question: t(item.question),
                answer: t(item.answer),
              }))
            ),
          ],
        }}
      />

      <LegalSection title="The short answer">
        <DocsParagraph>
          Use assistant-ui when you want a free, complete chat framework and are
          happy to build on its runtime, especially with an agent backend such
          as LangGraph. Use HextaUI when you want finished screens in one
          design, from the chat to the settings pages of your AI product, as
          components you pass data to. Both put their source in your project and
          share the shadcn/ui theme tokens.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="At a glance">
        <CompareTable
          caption="HextaUI compared with assistant-ui"
          columns={["HextaUI", "assistant-ui"]}
          rows={[
            {
              label: "What you get",
              values: [
                "Components, AI blocks and a complete chat app",
                "A chat runtime, headless primitives and styled components",
              ],
            },
            {
              label: "Price",
              values: [
                <>
                  Components free, AI blocks paid once,{" "}
                  <LegalLink href="/blocks/prompt-input">
                    Prompt Input
                  </LegalLink>{" "}
                  free
                </>,
                "Free, with an optional paid cloud service",
              ],
            },
            {
              label: "License",
              values: ["MIT for components, Pro License for blocks", "MIT"],
            },
            {
              label: "Primitives",
              values: ["Base UI", "Base UI or Radix"],
            },
            {
              label: "Chat state",
              values: [
                "Yours. Blocks take messages as props",
                "Held by an assistant-ui runtime",
              ],
            },
            {
              label: "Backends",
              values: [
                "Any, using AI SDK message parts",
                "AI SDK, LangGraph, LangChain, AG-UI, A2A, Google ADK or your own",
              ],
            },
            {
              label: "Platforms",
              values: [
                "React on the web",
                "React, plus React Native and terminal apps",
              ],
            },
            {
              label: "Product screens",
              values: [
                "Settings, models, API keys, billing and team pages",
                "Focused on chat and agent interfaces",
              ],
            },
          ]}
        />
      </LegalSection>

      <LegalSection title="A framework or a set of screens">
        <DocsParagraph>
          <LegalLink href="https://github.com/assistant-ui/assistant-ui">
            assistant-ui
          </LegalLink>{" "}
          starts from state. You wrap your app in{" "}
          <DocsCode>AssistantRuntimeProvider</DocsCode>, pick a runtime for your
          backend, and its components read the thread from that runtime.
          Branching, editing, attachments, tool approvals and resumable streams
          come from the runtime, and its styled components already show states
          like a stopped run or a failed reply. That is a lot of work done for
          you, and the trade is that your chat lives inside its model. Moving
          off it later means rewriting the state as well as the screens.
        </DocsParagraph>
        <DocsParagraph>
          HextaUI starts from the screen. Each block is a component you pass
          messages to, in the shape <DocsCode>useChat</DocsCode> returns, with
          the hard states already designed:
        </DocsParagraph>
        <DocsList>
          <li>
            <LegalLink href="/blocks/chat-thread">Chat Thread</LegalLink>:
            failed replies offer Try again, stopped replies say so, and edits
            and retries become versions you can switch between. Your question
            pins to the top while the answer streams, and older history loads
            without the view jumping.
          </li>
          <li>
            <LegalLink href="/blocks/prompt-input">Prompt Input</LegalLink>:
            Enter never interrupts Japanese, Chinese or Korean input, uploads
            show progress and retry, messages typed during a reply wait in a
            queue, and drafts survive a reload. It is free.
          </li>
          <li>
            <LegalLink href="/blocks/tool-calls">Tool Calls</LegalLink>: every
            AI SDK tool state has its own look, including approvals, with “Tell
            it what to do instead” to send a reason back to the model.
          </li>
          <li>
            <LegalLink href="/blocks/settings">Settings</LegalLink>: the pages
            around the chat, such as{" "}
            <LegalLink href="/blocks/models">Models</LegalLink>,{" "}
            <LegalLink href="/blocks/api-keys">API keys</LegalLink>,{" "}
            <LegalLink href="/blocks/billing">Billing</LegalLink> and{" "}
            <LegalLink href="/blocks/team">Team</LegalLink>, in the same design.
          </li>
        </DocsList>
        <DocsParagraph>
          <LegalLink href="/blocks/hexta-ai">HextaAI</LegalLink> puts every
          block together into a complete chat app you can open and try before
          you install anything.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="Piece by piece">
        <DocsParagraph>
          Most assistant-ui components have a HextaUI counterpart. The names
          below are from the assistant-ui docs.
        </DocsParagraph>
        <CompareTable
          caption="assistant-ui components and their HextaUI counterparts"
          rowHeader="assistant-ui"
          columns={["HextaUI"]}
          rows={[
            {
              label: "Thread, Message actions, Edit message, Error state",
              values: [
                <>
                  <LegalLink href="/blocks/chat-thread">Chat Thread</LegalLink>,
                  with the free{" "}
                  <LegalLink href="/docs/message">Message</LegalLink> and{" "}
                  <LegalLink href="/docs/message-scroller">
                    Message scroller
                  </LegalLink>
                </>,
              ],
            },
            {
              label: "Message branches, Checkpoint history",
              values: [
                <>
                  Versions and checkpoints in{" "}
                  <LegalLink href="/blocks/chat-thread">Chat Thread</LegalLink>
                </>,
              ],
            },
            {
              label:
                "Composer, Composer attachments, Model selector, Message queue, Draft restore",
              values: [
                <>
                  <LegalLink href="/blocks/prompt-input">
                    Prompt Input
                  </LegalLink>
                  , free
                </>,
              ],
            },
            {
              label: "Thread list, Thread list sidebar",
              values: [
                <LegalLink href="/blocks/chat-sidebar">Chat Sidebar</LegalLink>,
              ],
            },
            {
              label: "Reasoning, Sources, Inline citation",
              values: [<LegalLink href="/blocks/thinking">Thinking</LegalLink>],
            },
            {
              label: "Tool call, Tool group, Approval card",
              values: [
                <LegalLink href="/blocks/tool-calls">Tool Calls</LegalLink>,
              ],
            },
            {
              label: "Agent plan, Todo list",
              values: [
                <LegalLink href="/blocks/agent-todos">Agent Todos</LegalLink>,
              ],
            },
            {
              label: "Markdown text, Streaming text",
              values: [
                <>
                  <LegalLink href="/blocks/markdown">Markdown</LegalLink> and{" "}
                  <LegalLink href="/blocks/streaming">Streaming</LegalLink>
                </>,
              ],
            },
            {
              label: "Syntax highlighter, Terminal block",
              values: [
                <LegalLink href="/blocks/code-block">Code Block</LegalLink>,
              ],
            },
            {
              label: "Artifact card, Web preview",
              values: [<LegalLink href="/blocks/artifact">Artifact</LegalLink>],
            },
            {
              label: "Reviewable diff, File tree",
              values: [
                <>
                  <LegalLink href="/blocks/diff-review">Diff Review</LegalLink>,
                  with the free <LegalLink href="/docs/tree">Tree</LegalLink>
                </>,
              ],
            },
            {
              label: "Composer voice, Voice conversation",
              values: [
                <LegalLink href="/blocks/voice-mode">Voice Mode</LegalLink>,
              ],
            },
            {
              label: "Runtimes, Assistant Cloud",
              values: [
                "No counterpart. HextaUI has no runtime or hosted storage, so the state stays in your code.",
              ],
            },
          ]}
        />
      </LegalSection>

      <LegalSection title="When assistant-ui is the better choice">
        <DocsList>
          <li>
            You want everything free and open source. Most of HextaUI’s AI
            blocks are paid.
          </li>
          <li>
            Your backend is an agent framework such as LangGraph, LangChain,
            AG-UI or Google ADK, and you want an adapter for it rather than
            mapping its messages yourself.
          </li>
          <li>
            You want saved threads, run reports and analytics without building
            the storage. Assistant Cloud does that, and HextaUI has no hosted
            service.
          </li>
          <li>
            You also ship a React Native or terminal app and want one chat model
            across them. HextaUI is web only.
          </li>
          <li>You want Radix primitives. HextaUI is built on Base UI only.</li>
          <li>
            You want the widest catalog of chat and agent components, with a
            large community behind it.
          </li>
        </DocsList>
      </LegalSection>

      <LegalSection title="Using them together">
        <DocsParagraph>
          Pick one to own the conversation. If assistant-ui already runs your
          chat, keep it, and use HextaUI for the screens around it, such as{" "}
          <LegalLink href="/blocks/models">Models</LegalLink> or{" "}
          <LegalLink href="/blocks/api-keys">API keys</LegalLink>. If you are on
          the AI SDK and only want better screens, HextaUI blocks read the
          message parts <DocsCode>useChat</DocsCode> already gives you, so there
          is no runtime to adopt. Start with the composer, since{" "}
          <LegalLink href="/blocks/prompt-input">Prompt Input</LegalLink> is
          free.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="Questions">
        {questions.map((item) => (
          <div key={item.question}>
            <h3 className="mt-6 text-base font-medium text-balance">
              {t(item.question)}
            </h3>
            <DocsParagraph className="mt-2">{item.answer}</DocsParagraph>
          </div>
        ))}
      </LegalSection>

      <MoreComparisons current={path} />
    </InfoPage>
  )
}

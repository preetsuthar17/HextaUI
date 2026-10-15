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

const path = "/compare/prompt-kit"

export const metadata: Metadata = pageMetadata({
  title: "HextaUI vs prompt-kit: pieces or finished screens",
  description:
    "prompt-kit gives you free components for an AI chat. HextaUI gives you finished screens with stop, retry, failed replies, tool approvals and uploads handled.",
  path,
})

const questions = [
  {
    question: "Is prompt-kit free?",
    answer:
      "Yes. prompt-kit is open source under the MIT license, and its components and example blocks install with the shadcn CLI.",
  },
  {
    question: "Does prompt-kit need the AI SDK?",
    answer:
      "No. Its components don’t import the AI SDK, although its Tool component uses the same tool states and its chatbot examples are built on it. HextaUI works the same way: blocks read AI SDK message parts without importing the SDK.",
  },
  {
    question: "Is HextaUI free?",
    answer:
      "The components are free and MIT licensed. The AI blocks and full screens are HextaUI Pro, a single payment with every later block included. Prompt Input is free.",
  },
  {
    question: "Can I use HextaUI and prompt-kit in the same project?",
    answer:
      "Yes. Both put their source in your project and use the shadcn/ui theme tokens. prompt-kit builds on Radix and HextaUI on Base UI, so your project carries both while you mix them.",
  },
]

export default function Page() {
  return (
    <InfoPage
      title="HextaUI and prompt-kit"
      lead="prompt-kit gives you the pieces of an AI chat, such as a message, a prompt input and a tool call, as free shadcn/ui components. HextaUI gives you the finished screens those pieces become, with the hard states already handled. This page compares them as of October 2026."
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
          Use prompt-kit when you want free, small pieces for a chat and plan to
          design the screens and their failure states yourself. Use HextaUI when
          you want the chat thread, the composer, the tool calls and the
          settings pages already built, with errors, retries, stops and
          approvals worked out. Both install with the shadcn CLI and share the
          shadcn/ui theme tokens, so you can mix them.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="At a glance">
        <CompareTable
          caption="HextaUI compared with prompt-kit"
          columns={["HextaUI", "prompt-kit"]}
          rows={[
            {
              label: "What you get",
              values: [
                "Components, AI blocks and a complete chat app",
                "Components and example blocks for AI chat",
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
                "Free",
              ],
            },
            {
              label: "License",
              values: ["MIT for components, Pro License for blocks", "MIT"],
            },
            {
              label: "Primitives",
              values: ["Base UI", "Radix, through shadcn/ui"],
            },
            {
              label: "AI SDK",
              values: [
                "Optional, reads the same message parts",
                "Optional, used in its chatbot examples",
              ],
            },
            {
              label: "Full screens",
              values: [
                "Chat app, artifacts, diff review, settings pages",
                "Example layouts, including a chat app with a history sidebar",
              ],
            },
            {
              label: "Failure states",
              values: [
                "Stop, retry, failed replies, tool approvals and failed uploads handled",
                "Left to you",
              ],
            },
          ]}
        />
      </LegalSection>

      <LegalSection title="Pieces or screens">
        <DocsParagraph>
          <LegalLink href="https://github.com/ibelick/prompt-kit">
            prompt-kit
          </LegalLink>{" "}
          is a well-made set of pieces: a chat container that sticks to the
          bottom, a prompt input, Markdown, reasoning, sources and a tool call.
          What happens when something goes wrong is up to you. Its Tool
          component, for instance, shows a call as streaming, ready, done or
          failed, with no state for a call that waits for approval. Its Prompt
          Input sends on Enter without checking whether an input method is still
          composing, and its File Upload handles dropping files but not upload
          progress or a failed upload.
        </DocsParagraph>
        <DocsParagraph>
          HextaUI blocks are those decisions, already made and tested:
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
            <LegalLink href="/blocks/markdown">Markdown</LegalLink> and{" "}
            <LegalLink href="/blocks/streaming">Streaming</LegalLink>: replies
            never show half-typed syntax, and bursty chunks are revealed at a
            steady pace instead of stuttering.
          </li>
          <li>
            <LegalLink href="/blocks/chat-sidebar">Chat Sidebar</LegalLink>:
            delete with undo, rename in place, chats that are still replying,
            and thousands of chats that open instantly.
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
          Most prompt-kit components have a HextaUI counterpart. The names below
          are from the prompt-kit docs.
        </DocsParagraph>
        <CompareTable
          caption="prompt-kit components and their HextaUI counterparts"
          rowHeader="prompt-kit"
          columns={["HextaUI"]}
          rows={[
            {
              label: "Chat Container, Message, Scroll Button",
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
              label: "Prompt Input, Prompt Suggestion, File Upload",
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
              label: "Reasoning, Chain of Thought, Steps, Thinking Bar, Source",
              values: [<LegalLink href="/blocks/thinking">Thinking</LegalLink>],
            },
            {
              label: "Tool",
              values: [
                <LegalLink href="/blocks/tool-calls">Tool Calls</LegalLink>,
              ],
            },
            {
              label: "Markdown, Response Stream",
              values: [
                <>
                  <LegalLink href="/blocks/markdown">Markdown</LegalLink> and{" "}
                  <LegalLink href="/blocks/streaming">Streaming</LegalLink>
                </>,
              ],
            },
            {
              label: "Code Block",
              values: [
                <LegalLink href="/blocks/code-block">Code Block</LegalLink>,
              ],
            },
            {
              label: "JSX Preview",
              values: [<LegalLink href="/blocks/artifact">Artifact</LegalLink>],
            },
            {
              label: "Text Shimmer, Loader",
              values: [
                <>
                  <LegalLink href="/docs/shimmer">Shimmer</LegalLink> and{" "}
                  <LegalLink href="/docs/spinner">Spinner</LegalLink>, free
                </>,
              ],
            },
            {
              label: "System Message",
              values: [
                <>
                  <LegalLink href="/docs/alert">Alert</LegalLink>, free
                </>,
              ],
            },
            {
              label: "Sidebar chat history, Full chat app",
              values: [
                <>
                  <LegalLink href="/blocks/chat-sidebar">
                    Chat Sidebar
                  </LegalLink>{" "}
                  and <LegalLink href="/blocks/hexta-ai">HextaAI</LegalLink>
                </>,
              ],
            },
          ]}
        />
        <DocsParagraph>
          HextaUI also has screens prompt-kit doesn’t cover, such as{" "}
          <LegalLink href="/blocks/diff-review">Diff Review</LegalLink>,{" "}
          <LegalLink href="/blocks/voice-mode">Voice Mode</LegalLink> and
          settings pages for an AI product like{" "}
          <LegalLink href="/blocks/models">Models</LegalLink>,{" "}
          <LegalLink href="/blocks/api-keys">API keys</LegalLink> and{" "}
          <LegalLink href="/blocks/billing">Billing</LegalLink>.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="When prompt-kit is the better choice">
        <DocsList>
          <li>
            You want everything free and open source. Most of HextaUI’s AI
            blocks are paid.
          </li>
          <li>
            You need a small chat inside a larger app, where a message list, a
            prompt box and Markdown are enough.
          </li>
          <li>
            You want to design the screens, and how they fail, yourself, and
            only need a good starting point for each piece.
          </li>
          <li>You want Radix primitives. HextaUI is built on Base UI only.</li>
          <li>
            You want a free, open-source chat app to start from.{" "}
            <LegalLink href="https://github.com/ibelick/zola">Zola</LegalLink>{" "}
            is built with prompt-kit by the same author.
          </li>
        </DocsList>
      </LegalSection>

      <LegalSection title="Moving from prompt-kit">
        <DocsParagraph>
          You don’t have to replace everything at once. Both libraries copy
          source into your project, so swap one piece when you need what it
          handles. The composer is a good first step, since{" "}
          <LegalLink href="/blocks/prompt-input">Prompt Input</LegalLink> is
          free and reads the same <DocsCode>useChat</DocsCode> status if your
          chat runs on the AI SDK. Replace the message list with{" "}
          <LegalLink href="/blocks/chat-thread">Chat Thread</LegalLink> when
          failed replies, retries and edits start to matter.
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

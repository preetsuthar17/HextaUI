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

const path = "/compare/ai-elements"

export const metadata: Metadata = pageMetadata({
  title: "HextaUI vs AI Elements: pieces or finished screens",
  description:
    "AI Elements gives you the pieces of an AI chat. HextaUI gives you finished screens with streaming, stop, retry, failed replies and tool approvals handled.",
  path,
})

const questions = [
  {
    question: "Is Vercel’s AI Elements being deprecated?",
    answer:
      "Yes. The AI Elements repository says it will be deprecated at the end of November 2026 and replaced by AI Elements from shadcn/ui. Code you already copied into your project keeps working, because it lives in your repository.",
  },
  {
    question: "Does HextaUI need the AI SDK?",
    answer:
      "No. The AI blocks read message parts in the same shape the AI SDK’s useChat returns, but they don’t import the SDK. Any backend works once its messages are mapped to those parts.",
  },
  {
    question: "Is HextaUI free?",
    answer:
      "The components are free and MIT licensed. The AI blocks and full screens are HextaUI Pro, a single payment with every later block included. Prompt Input is free.",
  },
  {
    question: "Can I use HextaUI and AI Elements in the same project?",
    answer:
      "Yes. Both put their source in your project and use the shadcn/ui theme tokens, so you can replace one screen at a time.",
  },
]

export default function Page() {
  return (
    <InfoPage
      breadcrumbs={[
        { name: "Compare", path: "/compare" },
        { name: "HextaUI vs AI Elements", path: "/compare/ai-elements" },
      ]}
      title="HextaUI and AI Elements"
      lead="AI Elements gives you the pieces of an AI chat, such as a message, a prompt input and a tool call. HextaUI gives you the finished screens those pieces become, with the hard states already handled. This page compares them as of October 2026."
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

      <LegalSection title="Two things called AI Elements">
        <DocsParagraph>
          <LegalLink href="https://elements.ai-sdk.dev">AI Elements</LegalLink>{" "}
          started at Vercel as a component library for the AI SDK. Its
          repository now says it will be deprecated at the end of November 2026
          and replaced by{" "}
          <LegalLink href="https://ui.shadcn.com/docs/ai-elements">
            AI Elements from shadcn/ui
          </LegalLink>
          , a set of patterns you copy into your project with no package to
          install. This page covers both, because people searching for one
          usually find the other.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="The short answer">
        <DocsParagraph>
          Use AI Elements when you want free building blocks and plan to design
          the screens and their failure states yourself. Use HextaUI when you
          want the chat thread, the composer, the tool calls and the settings
          pages already built, with errors, retries, stops and approvals worked
          out. Both put their source in your project and share the shadcn/ui
          theme tokens, so you can mix them.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="At a glance">
        <CompareTable
          caption="HextaUI compared with both versions of AI Elements"
          columns={[
            "HextaUI",
            "AI Elements (shadcn/ui)",
            "AI Elements (Vercel)",
          ]}
          rows={[
            {
              label: "What you get",
              values: [
                "Components, AI blocks and a complete chat app",
                "21 patterns",
                "49 components",
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
                "Free",
              ],
            },
            {
              label: "License",
              values: [
                "MIT for components, Pro License for blocks",
                "MIT",
                "Apache 2.0",
              ],
            },
            {
              label: "Primitives",
              values: ["Base UI", "Base UI or Radix", "Radix"],
            },
            {
              label: "AI SDK",
              values: [
                "Optional, reads the same message parts",
                "Used in the examples",
                "Required by the setup guide",
              ],
            },
            {
              label: "Full screens",
              values: [
                "Chat app, artifacts, diff review, settings pages",
                "No, you compose them",
                "Example clones of popular chat apps",
              ],
            },
            {
              label: "Status",
              values: [
                "Active",
                "New in October 2026",
                "Deprecated at the end of November 2026",
              ],
            },
          ]}
        />
      </LegalSection>

      <LegalSection title="Pieces or screens">
        <DocsParagraph>
          A chat looks simple until something goes wrong. The reply fails
          halfway. The person stops it, edits an earlier message or sends
          another one while the model is still writing. A tool needs approval in
          the middle of a stream. An upload fails, or the model sends half a
          table. AI Elements gives you the parts to build each of those, and
          leaves the decisions to you. Its own Message example, for instance,
          shows Retry as an action you connect to{" "}
          <DocsCode>regenerate()</DocsCode> yourself.
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
            <LegalLink href="/blocks/artifact">Artifact</LegalLink>: an edit
            that can’t be applied fails with a reason and keeps the last good
            version, previews swap in without a white flash, and runtime errors
            come with a Fix it action.
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
          Most AI Elements pieces have a HextaUI counterpart. The names below
          are from both AI Elements docs.
        </DocsParagraph>
        <CompareTable
          caption="AI Elements pieces and their HextaUI counterparts"
          rowHeader="AI Elements"
          columns={["HextaUI"]}
          rows={[
            {
              label: "Conversation, Chat, Message",
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
              label: "Prompt Input, Attachments, Model Selector, Context",
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
              label: "Reasoning, Chain of Thought, Sources, Inline Citation",
              values: [<LegalLink href="/blocks/thinking">Thinking</LegalLink>],
            },
            {
              label: "Tool, Confirmation",
              values: [
                <LegalLink href="/blocks/tool-calls">Tool Calls</LegalLink>,
              ],
            },
            {
              label: "Plan, Queue, Task",
              values: [
                <LegalLink href="/blocks/agent-todos">Agent Todos</LegalLink>,
              ],
            },
            {
              label: "Code Block, Terminal, Snippet",
              values: [
                <LegalLink href="/blocks/code-block">Code Block</LegalLink>,
              ],
            },
            {
              label: "Artifact, Web Preview, JSX Preview",
              values: [<LegalLink href="/blocks/artifact">Artifact</LegalLink>],
            },
            {
              label: "File Tree, Commit",
              values: [
                <>
                  <LegalLink href="/blocks/diff-review">Diff Review</LegalLink>,
                  with the free <LegalLink href="/docs/tree">Tree</LegalLink>
                </>,
              ],
            },
            {
              label: "Checkpoint, message branches",
              values: [
                <>
                  Checkpoints and versions in{" "}
                  <LegalLink href="/blocks/chat-thread">Chat Thread</LegalLink>
                </>,
              ],
            },
            {
              label: "Persona, Speech Input, Voice Selector",
              values: [
                <LegalLink href="/blocks/voice-mode">Voice Mode</LegalLink>,
              ],
            },
            {
              label: "Shimmer",
              values: [
                <>
                  <LegalLink href="/docs/shimmer">Shimmer</LegalLink>, free
                </>,
              ],
            },
            {
              label: "Canvas, Node, Edge",
              values: ["No counterpart. HextaUI has no workflow canvas."],
            },
          ]}
        />
        <DocsParagraph>
          HextaUI also has screens AI Elements doesn’t cover, such as{" "}
          <LegalLink href="/blocks/chat-sidebar">Chat Sidebar</LegalLink> and
          settings pages for an AI product like{" "}
          <LegalLink href="/blocks/models">Models</LegalLink>,{" "}
          <LegalLink href="/blocks/api-keys">API keys</LegalLink> and{" "}
          <LegalLink href="/blocks/billing">Billing</LegalLink>.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="When AI Elements is the better choice">
        <DocsList>
          <li>
            You want everything free and open source. Most of HextaUI’s AI
            blocks are paid.
          </li>
          <li>
            You only need a few pieces and want to design the screens, and how
            they fail, yourself.
          </li>
          <li>
            You need a workflow canvas with nodes and edges. Vercel’s version
            has one, and HextaUI doesn’t.
          </li>
          <li>
            You want Radix primitives. HextaUI is built on Base UI only, while
            the shadcn/ui version offers both.
          </li>
          <li>
            You want code maintained by shadcn/ui itself, with its community and
            examples behind it.
          </li>
        </DocsList>
      </LegalSection>

      <LegalSection title="Moving off Vercel’s AI Elements">
        <DocsParagraph>
          Nothing breaks at the end of November. The components are already
          source in your repository, and shadcn/ui says existing users don’t
          need to migrate. When you do touch those screens again, you have three
          options: keep the code and maintain it yourself, move to the shadcn/ui
          patterns, or replace a screen with a HextaUI block.
        </DocsParagraph>
        <DocsParagraph>
          HextaUI blocks read the same message parts that{" "}
          <DocsCode>useChat</DocsCode> returns, so your route handler and data
          stay as they are. Start with the composer, since{" "}
          <LegalLink href="/blocks/prompt-input">Prompt Input</LegalLink> is
          free, then swap the thread and the tool calls when you need what they
          handle.
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

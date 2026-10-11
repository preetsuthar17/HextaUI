import type { Metadata } from "next"

import { DocsCommand } from "@/components/docs/docs-command"
import {
  DocsCode,
  DocsList,
  DocsParagraph,
} from "@/components/docs/docs-content"
import { LegalLink, LegalSection } from "@/components/legal/legal-page"
import { InfoPage } from "@/components/site/info-page"
import { docsComponents, docsHooks, docsUtilities } from "@/lib/docs"
import { getRegistryItemUrl } from "@/lib/docs-registry"
import { pageMetadata } from "@/lib/metadata"
import { proBlocks } from "@/lib/pro/catalog"

export const metadata: Metadata = pageMetadata({
  title: "HextaUI vs shadcn/ui: what HextaUI adds on top",
  description:
    "HextaUI is not a replacement for shadcn/ui. It uses the same CLI, names and theme tokens, and adds finished states, motion, extra components and AI blocks.",
  path: "/compare/shadcn-ui",
})

export default function Page() {
  return (
    <InfoPage
      title="HextaUI and shadcn/ui"
      lead="HextaUI is not a replacement for shadcn/ui. It is a registry you add to a shadcn/ui project, with the same CLI, the same component names and the same theme tokens. This page explains what it adds and when you don’t need it."
    >
      <LegalSection title="The short answer">
        <DocsParagraph>
          Use shadcn/ui when you want a clean starting point and plan to write
          the loading, error and empty states yourself. Add HextaUI when you
          want those states, the motion and the accessibility details already
          done, or when you need a component shadcn/ui doesn’t ship. You can mix
          both in one project, one component at a time.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="What stays the same">
        <DocsList>
          <li>
            You install with the shadcn CLI, and the source is copied into your
            project. Nothing is locked inside a package.
          </li>
          <li>
            Components keep the shadcn/ui names, parts and props, so{" "}
            <DocsCode>Dialog</DocsCode>, <DocsCode>DialogTrigger</DocsCode> and{" "}
            <DocsCode>DialogContent</DocsCode> work the way you expect.
          </li>
          <li>
            Styling uses the same theme tokens, such as{" "}
            <DocsCode>--background</DocsCode>, <DocsCode>--primary</DocsCode>{" "}
            and <DocsCode>--radius</DocsCode>, with Tailwind CSS v4.
          </li>
          <li>
            Files land in <DocsCode>@/components/ui</DocsCode>, next to any
            shadcn/ui components you already have.
          </li>
        </DocsList>
        <DocsParagraph>Adding a component looks like this:</DocsParagraph>
        <DocsCommand
          className="mt-4"
          mode="dlx"
          packages={["shadcn@latest", "add", getRegistryItemUrl("button")]}
        />
      </LegalSection>

      <LegalSection title="What HextaUI adds">
        <DocsList>
          <li>
            Finished states. Buttons show pending, success and error feedback
            from the promise you return. Switches save and roll back. Inputs
            shake when they are invalid. Spinners wait before they appear so
            fast work doesn’t flicker.
          </li>
          <li>
            Motion you can interrupt. Animations share one set of easing curves
            and durations, can be reversed halfway and turn into a fade when
            reduced motion is on.
          </li>
          <li>
            Touch, right-to-left and high contrast. Tap targets grow on touch
            screens, text inputs stay at 16px so iOS doesn’t zoom, layouts
            mirror for right-to-left languages and focus rings stay visible in
            Windows high contrast mode.
          </li>
          <li>
            Components that aren’t in the shadcn/ui list at the time of writing
            (October 2026), such as{" "}
            <LegalLink href="/docs/tree">Tree</LegalLink>,{" "}
            <LegalLink href="/docs/video-player">Video player</LegalLink>,{" "}
            <LegalLink href="/docs/questionnaire">Questionnaire</LegalLink>,{" "}
            <LegalLink href="/docs/number-flow">Number flow</LegalLink>,{" "}
            <LegalLink href="/docs/shimmer">Shimmer</LegalLink> and{" "}
            <LegalLink href="/docs/scroll-fade">Scroll fade</LegalLink>.
          </li>
          <li>
            {docsHooks.length} hooks and {docsUtilities.length} utilities you
            can install on their own, like{" "}
            <LegalLink href="/docs/use-button-feedback">
              useButtonFeedback
            </LegalLink>{" "}
            and{" "}
            <LegalLink href="/docs/use-delayed-loading">
              useDelayedLoading
            </LegalLink>
            .
          </li>
          <li>
            <LegalLink href="/blocks">{proBlocks.length} blocks</LegalLink> for
            AI products, such as a chat thread, tool calls and voice mode. These
            are part of HextaUI Pro, which is paid, and{" "}
            <LegalLink href="/blocks/prompt-input">Prompt Input</LegalLink> is
            free.
          </li>
          <li>
            Docs written for agents too. Every page has a Markdown version, and
            there is an <LegalLink href="/docs/mcp">MCP server</LegalLink> your
            assistant can query.
          </li>
        </DocsList>
      </LegalSection>

      <LegalSection title="When shadcn/ui alone is the better choice">
        <DocsList>
          <li>
            You want Radix primitives. HextaUI components are built on Base UI
            only.
          </li>
          <li>
            You want the smallest possible component and would rather add states
            and motion yourself. HextaUI components carry more code because they
            handle more cases.
          </li>
          <li>
            You depend on the shadcn/ui blocks, charts and themes, or on the
            community Vue and Svelte ports. HextaUI is React only.
          </li>
          <li>
            You need the largest community and the most third-party examples.
            shadcn/ui has far more of both.
          </li>
        </DocsList>
      </LegalSection>

      <LegalSection title="Using both together">
        <DocsParagraph>
          Because the names and tokens match, you can replace one component at a
          time. Run the add command with <DocsCode>--overwrite</DocsCode> to
          swap a shadcn/ui component for the HextaUI version, then review the
          diff in git before you keep it. Components you don’t replace keep
          working. HextaUI has {docsComponents.length} components, and{" "}
          <LegalLink href="/docs/installation">Installation</LegalLink> covers
          the theme tokens they expect.
        </DocsParagraph>
      </LegalSection>
    </InfoPage>
  )
}

import type { Metadata } from "next"

import { DocsList, DocsParagraph } from "@/components/docs/docs-content"
import {
  ContactEmail,
  LegalLink,
  LegalSection,
} from "@/components/legal/legal-page"
import { InfoPage } from "@/components/site/info-page"
import { docsComponents, docsHooks, docsUtilities } from "@/lib/docs"
import { pageMetadata } from "@/lib/metadata"
import { siteRepository } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Who makes HextaUI, what it is for, how it is built and how it is funded.",
  path: "/about",
})

export default function Page() {
  return (
    <InfoPage
      breadcrumbs={[{ name: "About", path: "/about" }]}
      pageType="AboutPage"
      title="About HextaUI"
      lead="HextaUI is an open-source React component library built on top of shadcn/ui, made by Preet Suthar, an independent developer based in India."
    >
      <LegalSection title="What HextaUI is">
        <DocsParagraph>
          HextaUI has {docsComponents.length} components, {docsHooks.length}{" "}
          hooks and {docsUtilities.length} utilities for React. They keep the
          shadcn/ui API, sit on Base UI for behavior and accessibility, and are
          styled with Tailwind CSS v4. You add them with the shadcn CLI, the
          source lands in your project, and from then on it is your code.
        </DocsParagraph>
        <DocsParagraph>
          The point is the work you would otherwise do yourself: interruptible
          motion with reduced-motion fallbacks, keyboard and screen reader
          support, touch-sized targets, right-to-left layouts and the loading,
          empty and error states every real interface needs.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="Who makes it">
        <DocsParagraph>
          HextaUI is a one-person project, designed, built and maintained by
          Preet Suthar. Bugs and ideas go to{" "}
          <LegalLink href={`${siteRepository}/issues`}>GitHub issues</LegalLink>
          , and everything else to <ContactEmail />.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="How it is funded">
        <DocsList>
          <li>
            Every component, hook and utility is free and MIT licensed, for
            personal and commercial work. The{" "}
            <LegalLink href={siteRepository}>source is on GitHub</LegalLink>.
          </li>
          <li>
            HextaUI Pro is a one-time purchase of ready-made blocks, such as AI
            chat interfaces and app layouts, under the{" "}
            <LegalLink href="/legal/license">Pro license</LegalLink>. It pays
            for the time that goes into the free library.
          </li>
          <li>
            Payments are handled by Dodo Payments. See the{" "}
            <LegalLink href="/legal/refunds">refund policy</LegalLink> and the{" "}
            <LegalLink href="/legal/privacy">privacy policy</LegalLink>.
          </li>
        </DocsList>
      </LegalSection>

      <LegalSection title="For developers and AI assistants">
        <DocsParagraph>
          Every docs page has a Markdown version, the full index is at{" "}
          <LegalLink href="/llms.txt">llms.txt</LegalLink>, assistants can
          connect to the <LegalLink href="/docs/mcp">MCP server</LegalLink>, and
          the HTTP endpoints are described in the{" "}
          <LegalLink href="/docs/api">API docs</LegalLink>.
        </DocsParagraph>
      </LegalSection>
    </InfoPage>
  )
}

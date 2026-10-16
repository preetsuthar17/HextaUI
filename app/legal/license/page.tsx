import type { Metadata } from "next"

import { DocsList, DocsParagraph } from "@/components/docs/docs-content"
import {
  ContactEmail,
  LegalLink,
  LegalPage,
  LegalSection,
} from "@/components/legal/legal-page"
import { siteRepository } from "@/lib/site"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: "Pro License",
  description:
    "What you can build with HextaUI Pro blocks, and what you can’t do with the code.",
  path: "/legal/license",
})

export default function Page() {
  return (
    <LegalPage href="/legal/license" title="Pro License" updated="2026-10-08">
      <DocsParagraph>
        This license covers the code of HextaUI Pro blocks. It applies when you
        buy HextaUI Pro, and lasts as long as you follow it. The free components
        in the{" "}
        <LegalLink href={siteRepository}>open-source repository</LegalLink> stay
        under the MIT License and aren’t affected.
      </DocsParagraph>

      <LegalSection title="What you get">
        <DocsParagraph>
          A perpetual, worldwide, non-exclusive, non-transferable license for
          the people your plan covers to use, copy and modify Pro blocks in
          their own end products. Solo covers you, the buyer. Team covers the
          buyer and up to nine teammates they give a seat on their account page.
          Free blocks, like Prompt Input, are covered the same way for anyone
          who installs them. An end product is an app, website or piece of
          software where the blocks are part of something larger, not a
          collection of the blocks themselves.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="You can">
        <DocsList>
          <li>Use Pro blocks in unlimited personal and commercial projects.</li>
          <li>
            Use them in work for clients, and hand the finished project to them.
          </li>
          <li>
            Use them in products you sell, including SaaS apps and paid apps.
          </li>
          <li>Modify the code however you like.</li>
          <li>
            Include them in an open-source end product, as long as the project
            isn’t a UI library, kit or template collection.
          </li>
        </DocsList>
      </LegalSection>

      <LegalSection title="You can’t">
        <DocsList>
          <li>
            Resell, redistribute or sublicense Pro code on its own, as
            templates, or as part of a UI kit, component library, design system,
            theme or page builder.
          </li>
          <li>
            Publish Pro code in a way that lets others use it without buying,
            such as a public registry, gist or snippet collection.
          </li>
          <li>
            Share your account or API tokens with anyone, except the one shared
            CI token a Team or Unlimited plan allows.
          </li>
          <li>
            Use Pro code to build a product that competes with HextaUI Pro, or
            to train AI models that generate UI components for others.
          </li>
        </DocsList>
      </LegalSection>

      <LegalSection title="Teams">
        <DocsParagraph>
          Each developer who installs or works on Pro code needs a seat: their
          own Solo plan, or a seat on a Team or Unlimited plan. A Team plan has
          10 seats, including the buyer’s. An Unlimited plan has no seat limit
          and covers the developers of one company. The buyer can move a seat
          from one teammate to another at any time, and the team may keep one
          shared API token in continuous integration and build systems. Clients
          and colleagues who only use the finished product don’t need a seat.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="Ownership and ending the license">
        <DocsParagraph>
          Pro blocks are licensed to you, not sold, and remain the property of
          Preet Suthar. The license ends if you get a refund, lose a chargeback,
          or break these terms. When it ends, stop using Pro code in new work
          and remove it from your projects.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="No warranty">
        <DocsParagraph>
          Pro blocks are provided “as is”, as described in the{" "}
          <LegalLink href="/legal/terms">Terms of Service</LegalLink>.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="Questions">
        <DocsParagraph>
          Not sure whether your use is covered? Email <ContactEmail /> and ask
          before you ship.
        </DocsParagraph>
      </LegalSection>
    </LegalPage>
  )
}

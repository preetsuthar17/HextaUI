import type { Metadata } from "next"

import { DocsList, DocsParagraph } from "@/components/docs/docs-content"
import {
  ContactEmail,
  LegalLink,
  LegalSection,
} from "@/components/legal/legal-page"
import { InfoPage } from "@/components/site/info-page"
import { pageMetadata } from "@/lib/metadata"
import { siteRepository } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "How to reach HextaUI for support, bugs, billing, privacy requests and security reports.",
  path: "/contact",
})

export default function Page() {
  return (
    <InfoPage
      breadcrumbs={[{ name: "Contact", path: "/contact" }]}
      pageType="ContactPage"
      title="Contact HextaUI"
      lead="HextaUI is run by Preet Suthar, an independent developer based in India."
    >
      <LegalSection title="Email">
        <DocsParagraph>
          Write to <ContactEmail /> for anything about your account, HextaUI
          Pro, billing, refunds, privacy or partnerships. Send it from the email
          address on your account when it is about a purchase, so the order can
          be found.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="Bugs and feature requests">
        <DocsParagraph>
          Open an issue on{" "}
          <LegalLink href={`${siteRepository}/issues`}>GitHub</LegalLink> with
          the component, what you expected, what happened, and your browser and
          React versions. A link to a small reproduction gets it fixed fastest.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="Other ways to reach me">
        <DocsList>
          <li>
            On X:{" "}
            <LegalLink href="https://x.com/preetsuthar17">
              @preetsuthar17
            </LegalLink>
            .
          </li>
          <li>
            Security issues: email <ContactEmail /> instead of opening a public
            issue.
          </li>
          <li>
            Data requests under the{" "}
            <LegalLink href="/legal/privacy">privacy policy</LegalLink>: email
            from the address on your account.
          </li>
        </DocsList>
      </LegalSection>

      <LegalSection title="Before you write">
        <DocsParagraph>
          Most answers are in the <LegalLink href="/docs">docs</LegalLink>. The{" "}
          <LegalLink href="/legal/refunds">refund policy</LegalLink> and{" "}
          <LegalLink href="/legal/terms">terms</LegalLink> cover purchases.
        </DocsParagraph>
      </LegalSection>
    </InfoPage>
  )
}

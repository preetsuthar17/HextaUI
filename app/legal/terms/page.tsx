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
  title: "Terms of Service",
  description:
    "The terms for using HextaUI, its accounts and HextaUI Pro purchases.",
  path: "/legal/terms",
})

export default function Page() {
  return (
    <LegalPage
      href="/legal/terms"
      title="Terms of Service"
      updated="2026-10-08"
    >
      <DocsParagraph>
        These terms cover your use of HextaUI (hextaui.com), run by Preet
        Suthar, an individual based in India. By using the site, signing in or
        buying HextaUI Pro, you agree to them. Questions go to <ContactEmail />.
      </DocsParagraph>

      <LegalSection title="What HextaUI offers">
        <DocsList>
          <li>
            <strong className="font-medium text-foreground">
              Free components.
            </strong>{" "}
            The components, hooks and docs in the{" "}
            <LegalLink href={siteRepository}>open-source repository</LegalLink>{" "}
            are released under the MIT License. Nothing in these terms limits
            your rights under that license.
          </li>
          <li>
            <strong className="font-medium text-foreground">
              HextaUI Pro.
            </strong>{" "}
            A one-time purchase that unlocks the code for Pro blocks, on the
            site and through the shadcn CLI. Your use of Pro code is covered by
            the <LegalLink href="/legal/license">Pro License</LegalLink>.
          </li>
        </DocsList>
      </LegalSection>

      <LegalSection title="Your account">
        <DocsList>
          <li>
            You sign in with GitHub or Google and need to be 18 or older, or
            have a guardian’s consent.
          </li>
          <li>An account belongs to one person. Don’t share it.</li>
          <li>
            Keep your API tokens private. You’re responsible for what happens
            with them, and you can revoke them at any time from your account
            page.
          </li>
        </DocsList>
      </LegalSection>

      <LegalSection title="Purchases">
        <DocsList>
          <li>
            HextaUI Pro costs the price shown at checkout, charged once. Taxes
            may be added depending on where you live.
          </li>
          <li>
            Dodo Payments is the merchant of record. It processes the payment,
            handles taxes and sends the invoice, and its terms apply to the
            payment itself.
          </li>
          <li>
            Access is for the lifetime of HextaUI Pro and includes blocks added
            later. If Pro is ever discontinued, you can keep using the code you
            already have under the Pro License.
          </li>
          <li>
            Refunds are covered by the{" "}
            <LegalLink href="/legal/refunds">Refund Policy</LegalLink>.
          </li>
        </DocsList>
      </LegalSection>

      <LegalSection title="Acceptable use">
        <DocsParagraph>Please don’t:</DocsParagraph>
        <DocsList>
          <li>
            Share your account or API tokens, or resell access. A Team or
            Unlimited plan may keep one shared token in CI, as the Pro License
            describes.
          </li>
          <li>Redistribute Pro code outside what the Pro License allows.</li>
          <li>
            Get around access controls, scrape gated content, or use the site in
            a way that overloads or harms it.
          </li>
          <li>Use HextaUI for anything illegal.</li>
        </DocsList>
        <DocsParagraph>
          Breaking these rules, filing a fraudulent chargeback, or abusing the
          service can lead to your tokens being revoked and your account and Pro
          access being suspended or closed.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="Ownership">
        <DocsParagraph>
          The HextaUI name, site and Pro blocks belong to Preet Suthar. Free
          components are open source under the MIT License. Pro blocks are
          licensed to you, not sold.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="Disclaimers">
        <DocsParagraph>
          HextaUI is provided “as is” and “as available”. Components and blocks
          are carefully built and tested, but there’s no guarantee they are free
          of bugs or fit your project. Test them in your product before you
          ship. The site may change, pause or be unavailable at times.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <DocsParagraph>
          To the extent the law allows, I’m not liable for indirect, incidental
          or consequential damages, such as lost profits or data, arising from
          your use of HextaUI. My total liability for any claim is limited to
          the amount you paid for HextaUI Pro in the 12 months before the claim.
          Nothing here limits rights you have that can’t be waived by law.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="Ending your use">
        <DocsParagraph>
          You can stop using HextaUI at any time and ask me to delete your
          account. I may suspend or close accounts that break these terms. The
          sections on ownership, disclaimers and liability continue to apply
          after that.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="Changes">
        <DocsParagraph>
          I may update these terms as HextaUI changes. The date at the top shows
          the latest version, and material changes will be announced on the
          site. Continuing to use HextaUI after a change means you accept it.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="Governing law">
        <DocsParagraph>
          These terms are governed by the laws of India, and disputes are
          subject to the jurisdiction of the courts of India. Before any formal
          dispute, please email <ContactEmail /> so we can try to sort it out.
        </DocsParagraph>
      </LegalSection>
    </LegalPage>
  )
}

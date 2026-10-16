import type { Metadata } from "next"

import { JsonLd } from "@/components/site/json-ld"

import { DocsList, DocsParagraph } from "@/components/docs/docs-content"
import { ContactEmail, LegalSection } from "@/components/legal/legal-page"
import { SponsorForm } from "@/components/site/sponsor-form"
import { pageMetadata } from "@/lib/metadata"
import { pageJsonLd } from "@/lib/structured-data"
import { currentSponsor, sponsorPrice, sponsorReviewDays } from "@/lib/sponsor"

export const metadata: Metadata = pageMetadata({
  title: "Sponsor",
  description: `Put your product beside every HextaUI docs and blocks page. One sponsor at a time, $${sponsorPrice} a month, cancel anytime.`,
  path: "/sponsor",
})

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pt-16 pb-24">
      <JsonLd
        data={pageJsonLd({
          path: "/sponsor",
          name: String(metadata.title),
          description: String(metadata.description),
          breadcrumbs: [{ name: "Sponsor", path: "/sponsor" }],
          type: "WebPage",
        })}
      />
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          Sponsor HextaUI
        </h1>
        <p className="text-base/7 text-pretty text-muted-foreground">
          Put your product in front of developers building with shadcn/ui and
          React, right beside the docs they’re reading.
        </p>
      </header>

      <LegalSection title="What you get">
        <DocsList>
          <li>
            A card under the table of contents on every docs and blocks page, on
            desktop.
          </li>
          <li>The only sponsor on the site. No rotation, no other ads.</li>
          <li>
            A headline, a short description and a button to your site, marked as
            sponsored, with UTM tags so you can measure clicks.
          </li>
          <li>
            ${sponsorPrice} a month, billed by Dodo Payments. Cancel anytime;
            the card stays up until the end of the paid month.
          </li>
          <li>
            Every card is reviewed by hand and goes live within{" "}
            {sponsorReviewDays} business day. If it can’t run, you get a full
            refund.
          </li>
        </DocsList>
      </LegalSection>

      <LegalSection title={currentSponsor ? "The slot is booked" : "Your card"}>
        {currentSponsor ? (
          <DocsParagraph>
            {currentSponsor.name} holds the sponsor slot right now. Email{" "}
            <ContactEmail /> to get the next opening.
          </DocsParagraph>
        ) : (
          <>
            <DocsParagraph>
              Write the card the way it should appear. You can change the copy
              later by email. Products for developers fit best; gambling, crypto
              trading and adult products aren’t accepted.
            </DocsParagraph>
            <div className="mt-8">
              <SponsorForm />
            </div>
          </>
        )}
      </LegalSection>
    </main>
  )
}

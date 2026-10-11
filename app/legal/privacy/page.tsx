import type { Metadata } from "next"

import {
  DocsCode,
  DocsList,
  DocsParagraph,
} from "@/components/docs/docs-content"
import {
  ContactEmail,
  LegalLink,
  LegalPage,
  LegalSection,
} from "@/components/legal/legal-page"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "What data HextaUI collects, why, who processes it and the choices you have.",
  path: "/legal/privacy",
})

export default function Page() {
  return (
    <LegalPage
      href="/legal/privacy"
      title="Privacy Policy"
      updated="2026-10-11"
    >
      <DocsParagraph>
        HextaUI (hextaui.com) is run by Preet Suthar, an individual based in
        India. This policy explains what data the site collects, why, who else
        handles it and what you can ask for. Questions go to <ContactEmail />.
      </DocsParagraph>

      <LegalSection title="The short version">
        <DocsList>
          <li>
            You can read the docs and use every free component without an
            account. Analytics cookies are only set if you allow them.
          </li>
          <li>
            If you sign in, I keep your name, email and profile picture from
            GitHub or Google so your account and HextaUI Pro work.
          </li>
          <li>
            Payments go through Dodo Payments. I never see your full card
            details.
          </li>
          <li>
            Signed-in accounts get a short email when new components or blocks
            ship. One click in any email, or a switch in your account, turns
            them off.
          </li>
          <li>I don’t sell your data, show ads or track you across sites.</li>
        </DocsList>
      </LegalSection>

      <LegalSection title="When you browse">
        <DocsParagraph>
          Reading the site needs no account. Two things happen on every visit,
          and a third only if you agree to it:
        </DocsParagraph>
        <DocsList>
          <li>
            <strong className="font-medium text-foreground">Analytics.</strong>{" "}
            OneDollarStats records aggregate statistics: the page you came from,
            the pages you view, how long you stay, and your device type,
            operating system, browser and country. It doesn’t collect personally
            identifiable data from browsing and sets no cookies.
          </li>
          <li>
            <strong className="font-medium text-foreground">
              Google Analytics, if you allow it.
            </strong>{" "}
            The first time you visit, a banner asks whether HextaUI can use
            Google Analytics. Only if you choose Allow does it load and set
            cookies to count visits and see which pages are used: the pages you
            view, how you got there, roughly where you are, and your device and
            browser. If you choose Decline, it never loads.
          </li>
          <li>
            <strong className="font-medium text-foreground">Hosting.</strong>{" "}
            Cloudflare serves the site and, like any web host, processes your IP
            address and browser details to deliver pages and block abuse.
          </li>
        </DocsList>
      </LegalSection>

      <LegalSection title="When you sign in">
        <DocsParagraph>
          You sign in with GitHub or Google. With your permission on their
          screen, they share the following, which I store:
        </DocsParagraph>
        <DocsList>
          <li>Your name, email address and profile picture URL.</li>
          <li>
            Your account ID with that provider and whether your email is
            verified.
          </li>
          <li>
            The access tokens the provider issues. They’re encrypted in the
            database and only used to complete sign-in.
          </li>
          <li>
            For each session: a session token, the IP address and browser you
            signed in from, and when the session expires.
          </li>
        </DocsList>
        <DocsParagraph>
          If you sign in with both GitHub and Google using the same verified
          email, both connect to one account, so your purchase follows you.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="When you buy HextaUI Pro">
        <DocsParagraph>
          Dodo Payments is the merchant of record. It collects your payment
          details, billing address and tax information, processes the payment
          and issues the invoice, under its own privacy policy. From Dodo I
          receive and keep the payment ID, its customer ID for you, the product,
          amount, currency, status and date.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="When you sponsor HextaUI">
        <DocsParagraph>
          If you book the sponsor slot, I store the card copy you write, the
          link and the contact email you give, plus the subscription ID,
          customer ID and status that Dodo Payments sends back. The copy is
          published on the site; the email is only used for the sponsorship.
          Dodo Payments handles the payment as merchant of record.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="When you manage a Team plan">
        <DocsParagraph>
          If you buy Team and add teammates, I store the email addresses you add
          and when you added them, so those people get Pro when they sign in.
          Each teammate gets one email saying who added them and how to sign in.
          Only add people who expect it. Removing a teammate deletes their email
          from the team.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="When you create API tokens">
        <DocsParagraph>
          Tokens let the shadcn CLI install Pro blocks. I store only a hash of
          each token, the name you give it, a short hint like{" "}
          <DocsCode>hxt_abcd…wxyz</DocsCode>, and when it was created and last
          used. The full token is shown to you once and can’t be recovered.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="Emails">
        <DocsParagraph>
          Some emails come with your account: a welcome email when you sign up,
          a confirmation when you buy HextaUI Pro, and the email a teammate gets
          when you add them to a Team plan. These are sent once each and aren’t
          marketing.
        </DocsParagraph>
        <DocsParagraph>
          When new components or blocks ship, I email the address on your
          account to say what’s new. Every account starts subscribed. Each email
          has an unsubscribe link that works in one click, and you can turn
          release emails on or off any time in{" "}
          <LegalLink href="/account">your account</LegalLink>. I keep a record
          of which release emails went to which account so nobody gets the same
          one twice, and the date you unsubscribed so I stop emailing you.
        </DocsParagraph>
        <DocsParagraph>
          You can also get release emails without an account, by entering your
          email address in the form at the bottom of any page. I store that
          address, the page you subscribed from, the last release email sent to
          it, and the date you unsubscribed if you do. It’s used only for
          release emails.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="How the data is used">
        <DocsList>
          <li>To sign you in and keep you signed in.</li>
          <li>To check your HextaUI Pro access and deliver Pro blocks.</li>
          <li>To process purchases, refunds and disputes.</li>
          <li>To prevent fraud and abuse, such as shared or leaked tokens.</li>
          <li>To email you when new components and blocks ship.</li>
          <li>To answer you when you email me.</li>
          <li>To understand, in aggregate, which pages are useful.</li>
        </DocsList>
      </LegalSection>

      <LegalSection title="Cookies and browser storage">
        <DocsParagraph>
          Without your consent, the only cookies are the ones that make sign-in
          work, set by the authentication system (their names start with{" "}
          <DocsCode>better-auth</DocsCode>):
        </DocsParagraph>
        <DocsList>
          <li>A session cookie that keeps you signed in for up to 30 days.</li>
          <li>
            A short-lived copy of your session, refreshed every few minutes.
          </li>
          <li>
            A sign-in state cookie that lasts a few minutes while GitHub or
            Google redirects you back.
          </li>
        </DocsList>
        <DocsParagraph>
          If you allow analytics, Google Analytics also sets cookies whose names
          start with <DocsCode>_ga</DocsCode>, which last up to two years. You
          can change your choice any time with Cookie settings in the footer.
          Choosing Decline there removes these cookies and stops Google
          Analytics.
        </DocsParagraph>
        <DocsParagraph>
          The site also saves a few preferences in your browser’s storage: your
          analytics choice, your theme, your package manager, recent searches,
          the layout of resizable examples, whether you’ve signed in before, and
          a cached GitHub star count. These never leave your device.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="Who else handles data">
        <DocsList>
          <li>
            <strong className="font-medium text-foreground">Cloudflare</strong>{" "}
            hosts the site, its functions and the database, and delivers release
            emails.
          </li>
          <li>
            <strong className="font-medium text-foreground">
              GitHub and Google
            </strong>{" "}
            handle sign-in under their own privacy policies.
          </li>
          <li>
            <strong className="font-medium text-foreground">
              Dodo Payments
            </strong>{" "}
            processes payments, taxes and refunds.
          </li>
          <li>
            <strong className="font-medium text-foreground">
              OneDollarStats
            </strong>{" "}
            provides analytics, hosted in Finland.
          </li>
          <li>
            <strong className="font-medium text-foreground">Google</strong>{" "}
            provides Google Analytics, only if you allow it, under its own
            privacy policy.
          </li>
        </DocsList>
        <DocsParagraph>
          Some pages also load content straight from other services, which then
          receive your IP address and browser details: the GitHub API for the
          star count, profile pictures from GitHub and Google, sample images and
          videos in docs examples (Unsplash, W3C and MDN), and site icons in the
          Thinking block preview through DuckDuckGo’s icon service.
        </DocsParagraph>
        <DocsParagraph>
          These providers may process data outside India.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="How long data is kept">
        <DocsList>
          <li>Account data: until you ask me to delete your account.</li>
          <li>
            Sessions: they expire after 30 days without use, or when you sign
            out.
          </li>
          <li>API tokens: until you revoke them or delete your account.</li>
          <li>Release email records: until you delete your account.</li>
          <li>
            Email addresses subscribed without an account: until you ask me to
            delete them. Unsubscribing stops the emails straight away.
          </li>
          <li>
            Teammate emails: until the Team owner removes them, or the Team plan
            is refunded or deleted.
          </li>
          <li>
            Purchase records: kept for as long as tax, accounting and fraud
            rules require, even after the account is deleted.
          </li>
        </DocsList>
      </LegalSection>

      <LegalSection title="Your rights">
        <DocsParagraph>
          Under India’s Digital Personal Data Protection Act, 2023, and, where
          it applies to you, the GDPR, you can ask to access, correct or delete
          your data, withdraw consent, or raise a grievance. Email{" "}
          <ContactEmail /> from the address on your account and I’ll respond
          within 30 days. Deleting your account removes your profile, linked
          sign-ins, sessions and API tokens, and ends Pro access.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="Children">
        <DocsParagraph>
          HextaUI accounts and purchases are meant for people 18 or older. If
          you’re younger, ask a parent or guardian before signing in or buying.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="Security">
        <DocsParagraph>
          Traffic is encrypted with HTTPS, API tokens are stored only as hashes
          and provider tokens are encrypted. No system is perfectly secure, so
          please keep your tokens private and revoke any you think have leaked.
        </DocsParagraph>
      </LegalSection>

      <LegalSection title="Changes">
        <DocsParagraph>
          If this policy changes, the date at the top changes too. Material
          changes will be announced on the site. See also the{" "}
          <LegalLink href="/legal/terms">Terms of Service</LegalLink>.
        </DocsParagraph>
      </LegalSection>
    </LegalPage>
  )
}

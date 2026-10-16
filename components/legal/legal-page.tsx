import * as React from "react"
import Link from "@/components/site/link"

import { JsonLd } from "@/components/site/json-ld"
import { siteContactEmail } from "@/lib/site"
import { pageJsonLd } from "@/lib/structured-data"
import { t } from "@/lib/i18n/rich"

const legalPages = [
  { href: "/legal/privacy", title: "Privacy Policy" },
  { href: "/legal/terms", title: "Terms of Service" },
  { href: "/legal/refunds", title: "Refund Policy" },
  { href: "/legal/license", title: "Pro License" },
]

const contactEmail = siteContactEmail

const linkClassName =
  "rounded-sm text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors duration-150 outline-none hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-focus-ring motion-reduce:transition-none"

function LegalLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return href.startsWith("/") ? (
    <Link href={href} className={linkClassName}>
      {children}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noreferrer" className={linkClassName}>
      {children}
    </a>
  )
}

function ContactEmail() {
  return (
    <a href={`mailto:${contactEmail}`} className={linkClassName}>
      {contactEmail}
    </a>
  )
}

function LegalSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const id = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

  return (
    <section aria-labelledby={id} className="mt-12">
      <h2
        id={id}
        className="scroll-mt-20 text-xl font-semibold tracking-tight text-balance"
      >
        {t(title)}
      </h2>
      {children}
    </section>
  )
}

function LegalPage({
  href,
  title,
  updated,
  children,
}: {
  href: string
  title: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pt-16 pb-24">
      <JsonLd
        data={pageJsonLd({
          path: href,
          name: title,
          description: `${title} for HextaUI and HextaUI Pro.`,
          breadcrumbs: [{ name: title, path: href }],
        })}
      />
      <nav aria-label="Legal">
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {legalPages.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                aria-current={page.href === href ? "page" : undefined}
                className="rounded-sm text-muted-foreground transition-colors duration-150 outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-focus-ring aria-[current=page]:text-foreground motion-reduce:transition-none"
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <header className="mt-10 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground">
          Last updated <time dateTime={updated}>{formatDate(updated)}</time>
        </p>
      </header>
      <div className="flex flex-col">{children}</div>
    </main>
  )
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(date))
}

export {
  ContactEmail,
  contactEmail,
  LegalLink,
  LegalPage,
  legalPages,
  LegalSection,
}

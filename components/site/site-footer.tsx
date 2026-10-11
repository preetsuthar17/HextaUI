import Link from "@/components/site/link"
import { cn } from "cn"

import { legalPages } from "@/components/legal/legal-page"
import { CookieSettingsButton } from "@/components/site/cookie-consent"
import { LocaleSwitcher } from "@/components/site/locale-switcher"
import { SubscribeForm } from "@/components/site/subscribe-form"
import { Chrome } from "@/lib/i18n/chrome"

import { siteRepository } from "@/lib/site"

const sitePages = [
  { href: "/docs", title: "Docs" },
  { href: "/components", title: "Components" },
  { href: "/blocks", title: "Blocks" },
  { href: "/compare/shadcn-ui", title: "HextaUI vs shadcn/ui" },
  { href: "/about", title: "About" },
  { href: "/contact", title: "Contact" },
  { href: "/pricing", title: "Pricing" },
  { href: "/sponsor", title: "Sponsor" },
  { href: "/changelog", title: "Changelog" },
]

const linkClassName =
  "rounded-sm text-foreground/80 underline decoration-foreground/30 underline-offset-4 transition-colors duration-150 outline-none hover:text-foreground hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:outline-hidden motion-reduce:transition-none"

function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("px-4 py-8", className)}>
      <div className="mx-auto mb-8 flex max-w-screen-2xl justify-center text-center">
        <SubscribeForm />
      </div>
      <p className="mx-auto max-w-screen-2xl text-center text-sm text-pretty text-muted-foreground">
        <Chrome>Built by</Chrome>{" "}
        <a
          href="https://twitter.com/preetsuthar17"
          target="_blank"
          rel="noreferrer"
          className={linkClassName}
        >
          Preet Suthar
        </a>
        . <Chrome>Open source under the MIT license, with the code on</Chrome>{" "}
        <a
          href={siteRepository}
          target="_blank"
          rel="noreferrer"
          className={linkClassName}
        >
          GitHub
        </a>
        .
      </p>
      <nav
        aria-label="Site"
        className="mx-auto mt-3 flex max-w-screen-2xl flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground"
      >
        {[...sitePages, ...legalPages].map((page) => (
          <Link key={page.href} href={page.href} className={linkClassName}>
            <Chrome>{page.title}</Chrome>
          </Link>
        ))}
        <CookieSettingsButton
          className={cn(
            linkClassName,
            "cursor-pointer disabled:cursor-default"
          )}
        />
      </nav>
      <LocaleSwitcher
        className="mx-auto mt-3 flex max-w-screen-2xl flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground"
        linkClassName={linkClassName}
      />
    </footer>
  )
}

export { SiteFooter }

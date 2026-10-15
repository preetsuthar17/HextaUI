import Link from "@/components/site/link"
import { cn } from "cn"

import { legalPages } from "@/components/legal/legal-page"
import { CookieSettingsButton } from "@/components/site/cookie-consent"
import { LocaleSwitcher } from "@/components/site/locale-switcher"
import { SubscribeForm } from "@/components/site/subscribe-form"
import { Chrome } from "@/lib/i18n/chrome"

import { comparisons } from "@/lib/compare"
import { siteName, siteRepository } from "@/lib/site"

const groups = [
  {
    id: "footer-product",
    title: "Product",
    pages: [
      { href: "/docs", title: "Docs" },
      { href: "/components", title: "Components" },
      { href: "/blocks", title: "Blocks" },
      { href: "/pricing", title: "Pricing" },
      { href: "/changelog", title: "Changelog" },
    ],
  },
  { id: "footer-compare", title: "Compare", pages: comparisons },
  {
    id: "footer-project",
    title: "Project",
    pages: [
      { href: "/about", title: "About" },
      { href: "/sponsor", title: "Sponsor" },
      { href: "/contact", title: "Contact" },
    ],
  },
  { id: "footer-legal", title: "Legal", pages: legalPages },
]

const inlineLinkClassName =
  "rounded-sm text-foreground/80 underline decoration-foreground/30 underline-offset-4 transition-colors duration-150 outline-none hover:text-foreground hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:outline-hidden motion-reduce:transition-none"

function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("px-3 pt-8 pb-10", className)}>
      <div className="mx-auto mb-12 flex max-w-screen-2xl justify-center text-center">
        <SubscribeForm />
      </div>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 border-t pt-8 text-sm lg:flex-row lg:justify-between">
        <div className="flex flex-col items-start gap-1">
          <Link href="/" className="footer-link font-medium text-foreground">
            {siteName}
          </Link>
          <p className="max-w-xs text-sm/6 text-pretty text-muted-foreground">
            <Chrome>Built by</Chrome>{" "}
            <a
              href="https://twitter.com/preetsuthar17"
              target="_blank"
              rel="noreferrer"
              className={inlineLinkClassName}
            >
              Preet Suthar
            </a>
            .{" "}
            <Chrome>Open source under the MIT license, with the code on</Chrome>{" "}
            <a
              href={siteRepository}
              target="_blank"
              rel="noreferrer"
              className={inlineLinkClassName}
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:flex sm:gap-x-16">
          {groups.map((group) => (
            <nav key={group.id} aria-labelledby={group.id}>
              <p id={group.id} className="py-1 font-medium">
                <Chrome>{group.title}</Chrome>
              </p>
              <ul>
                {group.pages.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} className="footer-link">
                      <Chrome>{page.title}</Chrome>
                    </Link>
                  </li>
                ))}
                {group.pages === legalPages ? (
                  <li>
                    <CookieSettingsButton className="footer-link cursor-pointer disabled:cursor-default" />
                  </li>
                ) : null}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <LocaleSwitcher
        className="mx-auto mt-8 flex max-w-screen-2xl flex-wrap gap-x-4 border-t pt-3 text-sm"
        linkClassName="footer-link"
      />
    </footer>
  )
}

export { SiteFooter }

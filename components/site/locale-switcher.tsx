"use client"

import { cn } from "cn"

import { useLocale, useSitePathname } from "@/lib/i18n/client"
import {
  isLocalizedPath,
  localeNames,
  locales,
  localizeHref,
} from "@/lib/i18n/config"

function LocaleSwitcher({
  className,
  linkClassName,
}: {
  className?: string
  linkClassName?: string
}) {
  const current = useLocale()
  const pathname = useSitePathname()
  const path = isLocalizedPath(pathname) ? pathname : "/"

  return (
    <nav aria-label="Language" className={className}>
      {locales.map((locale) => (
        <a
          key={locale}
          href={localizeHref(path, locale)}
          hrefLang={locale}
          lang={locale}
          aria-current={locale === current ? "true" : undefined}
          className={cn(linkClassName, locale === current && "text-foreground")}
        >
          {localeNames[locale]}
        </a>
      ))}
    </nav>
  )
}

export { LocaleSwitcher }

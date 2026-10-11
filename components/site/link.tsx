"use client"

import * as React from "react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"

import { getPathLocale, localizeHref } from "@/lib/i18n/config"

function Link({ href, ...props }: React.ComponentProps<typeof NextLink>) {
  const locale = getPathLocale(usePathname() ?? "/")

  return (
    <NextLink
      href={typeof href === "string" ? localizeHref(href, locale) : href}
      {...props}
    />
  )
}

export default Link

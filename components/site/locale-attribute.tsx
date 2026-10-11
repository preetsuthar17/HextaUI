"use client"

import * as React from "react"

import { defaultLocale, type Locale } from "@/lib/i18n/config"

function LocaleAttribute({ locale }: { locale: Locale }) {
  React.useEffect(() => {
    document.documentElement.lang = locale
    return () => {
      document.documentElement.lang = defaultLocale
    }
  }, [locale])

  return null
}

export { LocaleAttribute }

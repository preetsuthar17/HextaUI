"use client"

import * as React from "react"

import { collect } from "@/lib/i18n/catalog"
import { useLocale } from "@/lib/i18n/client"
import { defaultLocale, type Locale } from "@/lib/i18n/config"
import de from "@/lib/i18n/messages/de/chrome.json"
import es from "@/lib/i18n/messages/es/chrome.json"
import fr from "@/lib/i18n/messages/fr/chrome.json"
import ja from "@/lib/i18n/messages/ja/chrome.json"
import pt from "@/lib/i18n/messages/pt/chrome.json"
import tr from "@/lib/i18n/messages/tr/chrome.json"

type Dictionary = Record<string, string>

const dictionaries: Partial<Record<Locale, Dictionary>> = {
  de,
  es,
  fr,
  ja,
  pt,
  tr,
}

function useChrome() {
  const locale = useLocale()

  return React.useCallback(
    (text: string) => {
      if (locale === defaultLocale) return text
      collect("chrome", text)
      return dictionaries[locale]?.[text] || text
    },
    [locale]
  )
}

function Chrome({ children }: { children: string }) {
  return useChrome()(children)
}

export { Chrome, useChrome }

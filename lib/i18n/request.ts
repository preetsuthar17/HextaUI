import { cache } from "react"

import { defaultLocale, type Locale } from "@/lib/i18n/config"

type RequestLocale = {
  locale: Locale
  namespace: string
  translated: Set<string>
}

const getStore = cache((): RequestLocale => ({
  locale: defaultLocale,
  namespace: "common",
  translated: new Set(),
}))

function setRequestLocale(locale: Locale, namespace?: string) {
  const store = getStore()
  store.locale = locale
  if (namespace) store.namespace = namespace
}

function getRequestLocale() {
  return getStore()
}

export { getRequestLocale, setRequestLocale }

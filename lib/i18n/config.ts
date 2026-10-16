const locales = ["en", "es", "de", "pt", "fr", "tr", "ja"] as const

type Locale = (typeof locales)[number]

const defaultLocale: Locale = "en"

const translatedLocales = locales.filter(
  (locale) => locale !== defaultLocale
) as Exclude<Locale, "en">[]

const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
  pt: "Português",
  fr: "Français",
  tr: "Türkçe",
  ja: "日本語",
}

const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  de: "de_DE",
  pt: "pt_BR",
  fr: "fr_FR",
  tr: "tr_TR",
  ja: "ja_JP",
}

const localizedPrefixes = ["/docs", "/blocks", "/compare", "/blog"]
const localizedPages = ["/", "/components"]
const unlocalizedDocs = ["/docs/stress", "/docs/api"]

function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale)
}

function isTranslatedLocale(
  value: string | undefined
): value is Exclude<Locale, "en"> {
  return isLocale(value) && value !== defaultLocale
}

function splitHref(href: string) {
  const index = href.search(/[?#]/)
  return index === -1
    ? { path: href, suffix: "" }
    : { path: href.slice(0, index), suffix: href.slice(index) }
}

function isLocalizedPath(path: string) {
  if (/\.[a-z0-9]+$/i.test(path)) return false
  if (unlocalizedDocs.includes(path)) return false
  return (
    localizedPages.includes(path) ||
    localizedPrefixes.some(
      (prefix) => path === prefix || path.startsWith(`${prefix}/`)
    )
  )
}

function getPathLocale(pathname: string): Locale {
  const segment = pathname.split("/")[1]
  return isLocale(segment) ? segment : defaultLocale
}

function stripLocale(pathname: string) {
  const locale = getPathLocale(pathname)
  if (locale === defaultLocale && pathname.split("/")[1] !== defaultLocale) {
    return pathname
  }
  return pathname.slice(locale.length + 1) || "/"
}

function localizeHref(href: string, locale: Locale) {
  if (locale === defaultLocale || !href.startsWith("/")) return href
  const { path, suffix } = splitHref(href)
  if (!isLocalizedPath(path)) return href
  return `/${locale}${path === "/" ? "" : path}${suffix}`
}

function languageAlternates(path: string) {
  if (!isLocalizedPath(path)) return undefined
  const entries = locales.map((locale): [string, string] => [
    locale,
    localizeHref(path, locale),
  ])
  return Object.fromEntries([...entries, ["x-default", path]]) as Record<
    Locale | "x-default",
    string
  >
}

export {
  defaultLocale,
  getPathLocale,
  isLocale,
  isLocalizedPath,
  isTranslatedLocale,
  languageAlternates,
  localeNames,
  locales,
  localizeHref,
  openGraphLocales,
  stripLocale,
  translatedLocales,
  type Locale,
}

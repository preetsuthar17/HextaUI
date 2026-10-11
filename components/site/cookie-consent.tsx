"use client"

import * as React from "react"
import Link from "@/components/site/link"
import { GoogleAnalytics } from "@next/third-parties/google"

import { Button } from "@/components/ui/button"
import { useChrome } from "@/lib/i18n/chrome"

const gaId = "G-22S9WDP6VC"
const storageKey = "hextaui-analytics-consent"

type Consent = "granted" | "denied" | null

type ConsentState = { hydrated: boolean; consent: Consent; open: boolean }

const serverState: ConsentState = {
  hydrated: false,
  consent: null,
  open: false,
}

const listeners = new Set<() => void>()
let state: ConsentState | undefined
let reopened = false

function readConsent(): Consent {
  try {
    const value = localStorage.getItem(storageKey)
    return value === "granted" || value === "denied" ? value : null
  } catch {
    return null
  }
}

function refresh() {
  const consent = readConsent()
  state = { hydrated: true, consent, open: consent === null || reopened }
  listeners.forEach((listener) => listener())
}

function onStorage(event: StorageEvent) {
  if (event.key === storageKey) refresh()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (listeners.size === 1) window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) window.removeEventListener("storage", onStorage)
  }
}

function getSnapshot() {
  if (!state) refresh()
  return state as ConsentState
}

function getServerSnapshot() {
  return serverState
}

function clearAnalyticsCookies() {
  const host = window.location.hostname
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`]
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim()
    if (!name.startsWith("_ga")) return
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`
    })
  })
}

function setConsent(consent: "granted" | "denied") {
  const disabled = window as unknown as Record<string, boolean>
  disabled[`ga-disable-${gaId}`] = consent === "denied"
  if (consent === "denied") clearAnalyticsCookies()

  try {
    localStorage.setItem(storageKey, consent)
  } catch {}

  reopened = false
  refresh()
}

function openCookieSettings() {
  reopened = true
  refresh()
}

function useConsent() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

function CookieConsent() {
  const { consent, open } = useConsent()
  const c = useChrome()

  return (
    <>
      {consent === "granted" ? <GoogleAnalytics gaId={gaId} /> : null}
      {open ? (
        <section
          aria-label={c("Cookie consent")}
          className="fixed inset-x-4 bottom-4 z-100 flex flex-col gap-3 rounded-xl bg-popover p-4 text-sm text-popover-foreground shadow-lg ring-(length:--hairline) ring-foreground/10 motion-safe:animate-in motion-safe:animation-duration-300 motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 sm:right-auto sm:w-[22.5rem] forced-colors:border"
        >
          <p className="text-pretty text-muted-foreground">
            {c(
              "HextaUI would like to use Google Analytics cookies to see which pages people find useful. You can change this any time from the footer."
            )}{" "}
            <Link
              href="/legal/privacy#cookies-and-browser-storage"
              className="rounded-sm text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors duration-150 outline-none hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-focus-ring motion-reduce:transition-none"
            >
              {c("Privacy Policy")}
            </Link>
          </p>
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setConsent("denied")}
            >
              {c("Decline")}
            </Button>
            <Button size="sm" onClick={() => setConsent("granted")}>
              {c("Allow")}
            </Button>
          </div>
        </section>
      ) : null}
    </>
  )
}

function CookieSettingsButton({ className }: { className?: string }) {
  const { hydrated } = useConsent()
  const c = useChrome()

  return (
    <button
      type="button"
      className={className}
      disabled={!hydrated}
      onClick={openCookieSettings}
    >
      {c("Cookie settings")}
    </button>
  )
}

export { CookieConsent, CookieSettingsButton }

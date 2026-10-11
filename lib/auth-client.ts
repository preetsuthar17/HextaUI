"use client"

import { useEffect, useState } from "react"
import { createAuthClient } from "better-auth/react"

import type { ProPlanId } from "@/lib/pro/pricing"
import { track } from "@/lib/track"

const authClient = createAuthClient()

type Session = typeof authClient.$Infer.Session

const signedInKey = "hextaui-signed-in"
const userKey = "hextaui-user"

type CachedUser = { name: string; email: string; image?: string | null }

function readCachedUser(): CachedUser | null {
  try {
    const value = JSON.parse(localStorage.getItem(userKey) ?? "null")
    return value && typeof value.email === "string" ? value : null
  } catch {
    return null
  }
}

function writeCachedUser(user: CachedUser | null) {
  try {
    if (user) localStorage.setItem(userKey, JSON.stringify(user))
    else localStorage.removeItem(userKey)
  } catch {}
}

function readSignedIn() {
  try {
    return localStorage.getItem(signedInKey) === "1"
  } catch {
    return false
  }
}

function writeSignedIn(signedIn: boolean) {
  try {
    if (signedIn) localStorage.setItem(signedInKey, "1")
    else localStorage.removeItem(signedInKey)
  } catch {}
}

let sessionRequest: Promise<Session | null> | undefined

function loadSession() {
  sessionRequest ??= authClient.getSession().then(
    ({ data }) => {
      writeSignedIn(Boolean(data))
      writeCachedUser(
        data
          ? {
              name: data.user.name,
              email: data.user.email,
              image: data.user.image,
            }
          : null
      )
      return data ?? null
    },
    () => null
  )
  return sessionRequest
}

function useSession() {
  const [state, setState] = useState<{
    session: Session | null
    pending: boolean
    cachedUser: CachedUser | null
  }>({ session: null, pending: true, cachedUser: null })

  useEffect(() => {
    let active = true
    const signedIn = readSignedIn()
    const cachedUser = signedIn ? readCachedUser() : null
    if (cachedUser) setState((current) => ({ ...current, cachedUser }))
    const request = signedIn ? loadSession() : Promise.resolve(null)
    request.then((session) => {
      if (active) setState({ session, pending: false, cachedUser: null })
    })
    return () => {
      active = false
    }
  }, [])

  return state
}

type SignInProvider = "github" | "google"

function signIn(provider: SignInProvider) {
  track("Sign in started", { provider })
  writeSignedIn(true)
  return authClient.signIn.social({
    provider,
    callbackURL: window.location.pathname,
    errorCallbackURL: "/account",
  })
}

async function startCheckout(plan: ProPlanId = "solo") {
  track("Checkout started", { plan })
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ plan }),
  })
  if (response.status === 401) {
    window.location.assign("/account")
    return
  }
  const { url } = (await response.json()) as { url?: string }
  if (!response.ok || !url) throw new Error("Checkout failed")
  window.location.assign(url)
}

async function signOut() {
  await authClient.signOut()
  writeSignedIn(false)
  writeCachedUser(null)
  sessionRequest = undefined
  window.location.reload()
}

export {
  authClient,
  signIn,
  signOut,
  startCheckout,
  useSession,
  type CachedUser,
  type Session,
  type SignInProvider,
}

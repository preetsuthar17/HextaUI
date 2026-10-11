"use client"

import * as React from "react"
import Link from "@/components/site/link"

import { request } from "@/components/account/pro-tokens"
import { Button } from "@/components/ui/button"

type Status = "idle" | "unsubscribed" | "subscribed" | "invalid"

function useLinkQuery() {
  const [query, setQuery] = React.useState<string | null>(null)

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const user = params.get("u")
    const token = params.get("t")
    setQuery(
      user && token ? new URLSearchParams({ u: user, t: token }).toString() : ""
    )
  }, [])

  return query
}

const copy: Record<Status, { title: string; description: string }> = {
  idle: {
    title: "Unsubscribe from HextaUI emails?",
    description:
      "You’ll stop getting emails about new components and blocks. Receipts and sign-in emails aren’t affected.",
  },
  unsubscribed: {
    title: "You’re unsubscribed",
    description:
      "You won’t get any more release emails. Changed your mind? You can subscribe again here or in your account.",
  },
  subscribed: {
    title: "You’re subscribed again",
    description: "You’ll hear about the next release.",
  },
  invalid: {
    title: "This link isn’t valid",
    description:
      "It may be incomplete. Sign in and turn emails off in your account instead.",
  },
}

function UnsubscribeView() {
  const query = useLinkQuery()
  const [status, setStatus] = React.useState<Status>("idle")
  const current = query === "" ? "invalid" : status
  const { title, description } = copy[current]

  const update = async (subscribed: boolean) => {
    await request(`/api/email/unsubscribe?${query}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ subscribed }),
    })
    setStatus(subscribed ? "subscribed" : "unsubscribed")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2" aria-live="polite">
        <h1 className="text-xl font-semibold tracking-tight text-balance">
          {title}
        </h1>
        <p className="text-sm text-pretty text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {current === "idle" ? (
          <Button
            disabled={query === null}
            feedback
            errorLabel="Try again"
            onClick={() => update(false)}
          >
            Unsubscribe
          </Button>
        ) : null}
        {current === "unsubscribed" ? (
          <Button
            variant="outline"
            feedback
            errorLabel="Try again"
            onClick={() => update(true)}
          >
            Subscribe again
          </Button>
        ) : null}
        {current === "invalid" ? (
          <Button render={<Link href="/account" />} nativeButton={false}>
            Go to your account
          </Button>
        ) : (
          <Button
            variant="ghost"
            render={<Link href="/" />}
            nativeButton={false}
          >
            Back to HextaUI
          </Button>
        )}
      </div>
    </div>
  )
}

export { UnsubscribeView }

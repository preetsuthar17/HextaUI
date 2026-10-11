"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChrome } from "@/lib/i18n/chrome"
import { track } from "@/lib/track"

type Status = "idle" | "pending" | "done" | "error"

async function subscribe(email: string) {
  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, source: window.location.pathname }),
  })
  if (!response.ok) throw new Error("Subscribe failed")
}

function SubscribeForm() {
  const [status, setStatus] = React.useState<Status>("idle")
  const id = React.useId()
  const c = useChrome()

  if (status === "done") {
    return (
      <p role="status" className="text-sm text-foreground">
        {c("You’re on the list. The next release lands in your inbox.")}
      </p>
    )
  }

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-2"
      onSubmit={async (event) => {
        event.preventDefault()
        const email = new FormData(event.currentTarget).get("email")
        if (typeof email !== "string" || status === "pending") return
        setStatus("pending")
        try {
          await subscribe(email)
          track("Subscribed")
          setStatus("done")
        } catch {
          setStatus("error")
        }
      }}
    >
      <label htmlFor={id} className="text-sm text-muted-foreground">
        {c("Get an email when new components and blocks ship.")}
      </label>
      <div className="flex gap-2">
        <Input
          id={id}
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          spellCheck={false}
          placeholder="you@example.com"
          aria-describedby={status === "error" ? `${id}-error` : undefined}
        />
        <Button type="submit" loading={status === "pending"}>
          {c("Subscribe")}
        </Button>
      </div>
      {status === "error" ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {c("That didn’t go through. Check the address and try again.")}
        </p>
      ) : null}
    </form>
  )
}

export { SubscribeForm }

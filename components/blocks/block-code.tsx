"use client"

import * as React from "react"
import Link from "@/components/site/link"
import { IconLock } from "@tabler/icons-react"

import { DocsCodePanel } from "@/components/docs/docs-code-panel"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import { SignInOptions } from "@/components/account/sign-in-options"
import { startCheckout, useSession } from "@/lib/auth-client"
import { earlyBirdLastDay, proPlans, refundDays } from "@/lib/pro/pricing"
import { useEarlyBird } from "@/lib/pro/use-early-bird"

type ProFile = { path: string; code: string; html: string }

type CodeState =
  | { status: "loading" }
  | { status: "locked"; reason: "signed-out" | "free" }
  | { status: "error" }
  | { status: "ready"; files: ProFile[] }

function useBlockCode(name: string, free: boolean): CodeState {
  const { session, pending } = useSession()
  const [state, setState] = React.useState<CodeState>({ status: "loading" })

  React.useEffect(() => {
    if (!free && (pending || !session)) return
    let active = true
    fetch(`/api/pro/blocks/${name}`)
      .then(async (response) => {
        if (response.status === 401 || response.status === 403) {
          return {
            status: "locked",
            reason: response.status === 401 ? "signed-out" : "free",
          } as const
        }
        if (!response.ok) return { status: "error" } as const
        const { files } = (await response.json()) as { files: ProFile[] }
        return { status: "ready", files } as const
      })
      .catch(() => ({ status: "error" }) as const)
      .then((next) => {
        if (active) setState(next)
      })
    return () => {
      active = false
    }
  }, [free, name, pending, session])

  if (free) return state
  if (pending) return { status: "loading" }
  if (!session) return { status: "locked", reason: "signed-out" }
  return state
}

function LockedCode({ reason }: { reason: "signed-out" | "free" }) {
  const early = useEarlyBird()
  const { solo, team } = proPlans

  return (
    <Empty variant="outline">
      <EmptyHeader>
        <EmptyMedia variant="stack">
          <IconLock />
        </EmptyMedia>
        <EmptyTitle>The code is part of HextaUI Pro</EmptyTitle>
        <EmptyDescription>
          One payment of ${early ? solo.earlyPrice : solo.price}, or $
          {early ? team.earlyPrice : team.price} for a team of {team.seats},
          unlocks every block, including future ones.
          {early ? ` Early-bird prices end on ${earlyBirdLastDay}.` : ""}{" "}
          Refundable within {refundDays} days.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {reason === "signed-out" ? (
          <SignInOptions />
        ) : (
          <>
            <Button
              feedback
              successLabel="Redirecting…"
              errorLabel="Try again"
              onClick={() => startCheckout("solo")}
            >
              Get Pro Solo
            </Button>
            <Link
              href="/account"
              className="text-sm text-muted-foreground underline underline-offset-4"
            >
              Buying for a team? See Team
            </Link>
          </>
        )}
      </EmptyContent>
    </Empty>
  )
}

function CodeFile({ file }: { file: ProFile }) {
  return <DocsCodePanel html={file.html} title={file.path} collapsible />
}

function BlockCode({ name, free = false }: { name: string; free?: boolean }) {
  const state = useBlockCode(name, free)

  if (state.status === "loading") {
    return <Skeleton className="h-56 w-full rounded-xl" />
  }
  if (state.status === "locked") {
    return <LockedCode reason={state.reason} />
  }
  if (state.status === "error") {
    return (
      <p className="text-sm text-muted-foreground">
        The code didn’t load. Refresh the page to try again.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {state.files.map((file) => (
        <CodeFile key={file.path} file={file} />
      ))}
    </div>
  )
}

export { BlockCode }

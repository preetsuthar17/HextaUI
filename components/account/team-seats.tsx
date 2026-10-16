"use client"

import * as React from "react"

import { request } from "@/components/account/pro-tokens"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

type Member = { id: string; email: string; createdAt: string }

type Team = { seats: number | null; members: Member[] }

const dateFormat = new Intl.DateTimeFormat("en", { dateStyle: "medium" })

function TeamSeats() {
  const [team, setTeam] = React.useState<Team | null>(null)
  const [email, setEmail] = React.useState("")

  const load = React.useCallback(async () => {
    setTeam(await request<Team>("/api/team"))
  }, [])

  React.useEffect(() => {
    load().catch(() => setTeam({ seats: 10, members: [] }))
  }, [load])

  const add = async () => {
    await request("/api/team", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    })
    setEmail("")
    await load()
  }

  const remove = async (id: string) => {
    await request(`/api/team/${id}`, { method: "DELETE" })
    await load()
  }

  const used = team ? team.members.length + 1 : null
  const full = team !== null && team.seats !== null && used === team.seats

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="font-medium">Team seats</h2>
        <p className="text-sm text-muted-foreground">
          Add a teammate’s email. They get Pro as soon as they sign in to
          HextaUI with that email, and lose it when you remove them.
          {team
            ? team.seats === null
              ? ` ${used} seats used, including yours, with no limit.`
              : ` ${used} of ${team.seats} seats used, including yours.`
            : ""}
          {full ? " Remove someone to add another teammate." : ""}
        </p>
      </div>
      <form
        className="flex items-end gap-2"
        onSubmit={(event) => event.preventDefault()}
      >
        <Field className="flex-1">
          <FieldLabel>Teammate’s email</FieldLabel>
          <Input
            type="email"
            value={email}
            autoComplete="off"
            placeholder="teammate@company.com"
            disabled={full}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>
        <Button
          type="submit"
          variant="outline"
          disabled={full || !email.trim()}
          feedback
          successLabel="Added"
          errorLabel={(error) =>
            error instanceof Error ? error.message : "Failed"
          }
          onClick={add}
        >
          Add teammate
        </Button>
      </form>
      {team === null ? (
        <Skeleton className="h-12 w-full" />
      ) : team.members.length > 0 ? (
        <ul className="flex flex-col divide-y rounded-xl border">
          {team.members.map((member) => (
            <li
              key={member.id}
              className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
            >
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="truncate font-medium">{member.email}</span>
                <span className="truncate text-xs text-muted-foreground">
                  Added {dateFormat.format(new Date(member.createdAt))}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                feedback
                onClick={() => remove(member.id)}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

export { TeamSeats }

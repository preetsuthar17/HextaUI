"use client"

import * as React from "react"

import Link from "@/components/site/link"
import { track, type TrackProps } from "@/lib/track"

function TrackedLink({
  event,
  eventProps,
  onClick,
  ...props
}: React.ComponentProps<typeof Link> & {
  event: string
  eventProps?: TrackProps
}) {
  return (
    <Link
      {...props}
      onClick={(clickEvent) => {
        track(event, eventProps)
        onClick?.(clickEvent)
      }}
    />
  )
}

export { TrackedLink }

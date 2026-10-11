"use client"

import * as React from "react"
import { IconCheck, IconCopy } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { track, type TrackProps } from "@/lib/track"

type CopyValue = string | (() => string | Promise<string>)

async function writeClipboard(value: CopyValue) {
  const text = typeof value === "function" ? value() : value

  if (typeof text === "string") {
    await navigator.clipboard.writeText(text)
    return
  }

  if (typeof ClipboardItem === "function" && navigator.clipboard.write) {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/plain": text.then(
          (content) => new Blob([content], { type: "text/plain" })
        ),
      }),
    ])
    return
  }

  await navigator.clipboard.writeText(await text)
}

function DocsCopyButton({
  value,
  label = "Copy code",
  event = "Copy code",
  eventProps,
  className,
}: {
  value: CopyValue
  label?: string
  event?: string
  eventProps?: TrackProps
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) {
      return
    }

    const timer = setTimeout(() => setCopied(false), 1500)

    return () => {
      clearTimeout(timer)
    }
  }, [copied])

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      className={className}
      onClick={async () => {
        try {
          await writeClipboard(value)
          setCopied(true)
          track(event, eventProps)
        } catch {
          setCopied(false)
        }
      }}
    >
      <span
        data-copied={copied ? "" : undefined}
        className="group/copy relative grid size-4 place-items-center"
      >
        <IconCopy className="col-start-1 row-start-1 transition-all duration-200 ease-out-quint group-data-copied/copy:scale-50 group-data-copied/copy:opacity-0 motion-reduce:transition-none" />
        <IconCheck className="col-start-1 row-start-1 scale-50 opacity-0 transition-all duration-200 ease-out-quint group-data-copied/copy:scale-100 group-data-copied/copy:opacity-100 motion-reduce:transition-none" />
      </span>
      <span role="status" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </Button>
  )
}

export { DocsCopyButton }

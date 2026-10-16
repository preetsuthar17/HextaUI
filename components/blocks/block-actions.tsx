"use client"

import * as React from "react"
import { IconCopy } from "@tabler/icons-react"

import { IconV0 } from "@/components/docs/docs-page-actions"
import { Button } from "@/components/ui/button"
import { useChrome } from "@/lib/i18n/chrome"
import { getBlockPrompt, type PromptBlock } from "@/lib/pro/prompt"
import { absoluteUrl } from "@/lib/site"
import { track } from "@/lib/track"

function CopyPromptButton({ block }: { block: PromptBlock }) {
  const c = useChrome()

  return (
    <Button
      variant="secondary"
      size="sm"
      feedback
      successLabel={c("Copied")}
      errorLabel={c("Couldn’t copy")}
      onClick={() => {
        track("Copy prompt", { block: block.name })
        return navigator.clipboard.writeText(getBlockPrompt(block))
      }}
    >
      <IconCopy />
      {c("Copy prompt")}
    </Button>
  )
}

function OpenInV0Link({ name }: { name: string }) {
  const href = `https://v0.dev/chat/api/open?url=${encodeURIComponent(
    absoluteUrl(`/r/pro/${name}.json`)
  )}`

  return (
    <Button
      variant="ghost"
      size="sm"
      nativeButton={false}
      render={
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("Open in v0", { block: name })}
        />
      }
    >
      <IconV0 />
      Open in v0
    </Button>
  )
}

export { CopyPromptButton, OpenInV0Link }

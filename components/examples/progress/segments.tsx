"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"

const total = 48

export function ProgressSegments() {
  const [counts, setCounts] = React.useState({ passed: 29, failed: 2, skipped: 1 })
  const done = counts.passed + counts.failed + counts.skipped

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <Progress
        max={total}
        segments={[
          { value: counts.passed, variant: "success", label: "passed" },
          { value: counts.failed, variant: "destructive", label: "failed" },
          { value: counts.skipped, variant: "warning", label: "skipped" },
        ]}
      >
        <ProgressLabel>Running tests</ProgressLabel>
        <ProgressValue>{() => `${done} of ${total}`}</ProgressValue>
      </Progress>
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={done >= total}
          onClick={() =>
            setCounts((current) => ({ ...current, passed: current.passed + 1 }))
          }
        >
          Pass one
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={done >= total}
          onClick={() =>
            setCounts((current) => ({ ...current, failed: current.failed + 1 }))
          }
        >
          Fail one
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCounts({ passed: 0, failed: 0, skipped: 0 })}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

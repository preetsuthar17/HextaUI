"use client"

import * as React from "react"
import { cn } from "cn"

import { DocsCopyButton } from "@/components/docs/docs-copy-button"
import {
  getCommand,
  packageManagers,
  type PackageCommandMode,
  type PackageManager,
} from "@/lib/package-manager"

const storageKey = "hextaui-package-manager"
const listeners = new Set<() => void>()

function readPackageManager(): PackageManager {
  try {
    const stored = localStorage.getItem(storageKey)
    return packageManagers.find((item) => item === stored) ?? "pnpm"
  } catch {
    return "pnpm"
  }
}

function writePackageManager(value: PackageManager) {
  try {
    localStorage.setItem(storageKey, value)
  } catch {}
  for (const listener of listeners) {
    listener()
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getPackageCommand(packages: string[], mode: PackageCommandMode) {
  return getCommand(readPackageManager(), packages, mode)
}

function DocsCommand({
  packages,
  mode = "add",
  className,
}: {
  packages: string[]
  mode?: PackageCommandMode
  className?: string
}) {
  const current = React.useSyncExternalStore(
    subscribe,
    readPackageManager,
    () => "pnpm" as const
  )
  const tabsRef = React.useRef<HTMLDivElement>(null)
  const command = getCommand(current, packages, mode)
  const id = React.useId()

  const select = (manager: PackageManager, focus = false) => {
    writePackageManager(manager)
    if (focus) {
      tabsRef.current
        ?.querySelector<HTMLButtonElement>(`[data-manager="${manager}"]`)
        ?.focus()
    }
  }

  return (
    <div
      className={cn(
        "min-w-0 overflow-hidden rounded-xl border bg-muted",
        className
      )}
    >
      <div className="flex h-10 items-center justify-between border-b ps-2 pe-1">
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Package manager"
          className="flex items-center gap-0.5"
          onKeyDown={(event) => {
            const index = packageManagers.indexOf(current)
            const step =
              event.key === "ArrowRight"
                ? 1
                : event.key === "ArrowLeft"
                  ? -1
                  : 0
            if (step === 0) {
              return
            }
            event.preventDefault()
            const rtl =
              getComputedStyle(event.currentTarget).direction === "rtl"
            const next =
              packageManagers[
                (index + (rtl ? -step : step) + packageManagers.length) %
                  packageManagers.length
              ]
            select(next, true)
          }}
        >
          {packageManagers.map((manager) => (
            <button
              key={manager}
              type="button"
              role="tab"
              id={`${id}-${manager}`}
              data-manager={manager}
              aria-selected={manager === current}
              aria-controls={`${id}-panel`}
              tabIndex={manager === current ? 0 : -1}
              onClick={() => select(manager)}
              className="flex h-7 items-center rounded-md px-2 font-mono text-xs text-muted-foreground transition-colors duration-150 ease-out-cubic outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:outline-hidden aria-selected:bg-background aria-selected:text-foreground motion-reduce:transition-none"
            >
              {manager}
            </button>
          ))}
        </div>
        <DocsCopyButton
          value={command}
          label="Copy command"
          event="Copy command"
          eventProps={{ packages: packages.join(" "), mode, manager: current }}
        />
      </div>
      <pre
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-${current}`}
        className="overflow-x-auto overscroll-x-none p-4 font-mono text-sm/6"
      >
        <code>{command}</code>
      </pre>
    </div>
  )
}

export { DocsCommand, getPackageCommand }

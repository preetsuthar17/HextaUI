import * as React from "react"
import { cn } from "@/lib/utils"

const Kbd = React.forwardRef<
  HTMLElement,
  React.ComponentProps<"kbd">
>(function Kbd({ className, ...props }, ref) {
  return (
    <kbd
      ref={ref}
      data-slot="kbd"
      className={cn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium select-none tabular-nums",
        "[&_svg:not([class*='size-'])]:size-3",
        "in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10",
        className
      )}
      {...props}
    />
  )
})

const KbdGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function KbdGroup({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1 touch-manipulation", className)}
      {...props}
    />
  )
})

export { Kbd, KbdGroup }

"use client"

import * as React from "react"
import { GripVerticalIcon } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"
import type { ImperativePanelGroupHandle, ImperativePanelHandle } from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = React.forwardRef<
  ImperativePanelGroupHandle,
  React.ComponentProps<typeof ResizablePrimitive.PanelGroup>
>(function ResizablePanelGroup({ className, ...props }, ref) {
  return (
    <ResizablePrimitive.PanelGroup
      ref={ref}
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col touch-manipulation",
        className
      )}
      {...props}
    />
  )
})

const ResizablePanel = React.forwardRef<
  ImperativePanelHandle,
  React.ComponentProps<typeof ResizablePrimitive.Panel>
>(function ResizablePanel(props, ref) {
  return <ResizablePrimitive.Panel ref={ref} data-slot="resizable-panel" {...props} />
})

function ResizableHandle({ withHandle, className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & { withHandle?: boolean }) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden select-none touch-manipulation data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=horizontal]:cursor-col-resize data-[panel-group-direction=vertical]:cursor-row-resize [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      aria-label={(props as any)["aria-label"] ?? "Resize panel"}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon aria-hidden="true" className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

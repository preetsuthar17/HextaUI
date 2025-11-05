"use client";

import { GripVerticalIcon } from "lucide-react";
import * as React from "react";
import type {
  ImperativePanelGroupHandle,
  ImperativePanelHandle,
} from "react-resizable-panels";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = React.forwardRef<
  ImperativePanelGroupHandle,
  React.ComponentProps<typeof ResizablePrimitive.PanelGroup>
>(function ResizablePanelGroup({ className, ...props }, ref) {
  return (
    <ResizablePrimitive.PanelGroup
      className={cn(
        "flex h-full w-full touch-manipulation data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      data-slot="resizable-panel-group"
      ref={ref}
      {...props}
    />
  );
});

const ResizablePanel = React.forwardRef<
  ImperativePanelHandle,
  React.ComponentProps<typeof ResizablePrimitive.Panel>
>(function ResizablePanel(props, ref) {
  return (
    <ResizablePrimitive.Panel
      data-slot="resizable-panel"
      ref={ref}
      {...props}
    />
  );
});

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      aria-label={(props as any)["aria-label"] ?? "Resize panel"}
      className={cn(
        "after:-translate-x-1/2 data-[panel-group-direction=vertical]:after:-translate-y-1/2 relative flex w-px touch-manipulation select-none items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=horizontal]:cursor-col-resize data-[panel-group-direction=vertical]:cursor-row-resize data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      )}
      data-slot="resizable-handle"
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-xs border bg-border">
          <GripVerticalIcon aria-hidden="true" className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

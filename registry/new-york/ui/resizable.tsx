"use client";

import { GripVerticalIcon } from "lucide-react";
import * as React from "react";
import type {
  GroupImperativeHandle,
  PanelImperativeHandle,
} from "react-resizable-panels";
import {
  Group,
  type GroupProps,
  Panel,
  type PanelProps,
  Separator,
  type SeparatorProps,
} from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = React.forwardRef<
  GroupImperativeHandle,
  GroupProps & { direction?: "horizontal" | "vertical" }
>(function ResizablePanelGroup({ className, direction, ...props }, ref) {
  return (
    <Group
      className={cn(
        "flex h-full w-full touch-manipulation data-[orientation=vertical]:flex-col",
        className
      )}
      data-slot="resizable-panel-group"
      groupRef={ref}
      orientation={direction ?? props.orientation}
      {...props}
    />
  );
});

const ResizablePanel = React.forwardRef<PanelImperativeHandle, PanelProps>(
  function ResizablePanel(props, ref) {
    return <Panel data-slot="resizable-panel" panelRef={ref} {...props} />;
  }
);

function ResizableHandle({
  withHandle,
  className,
  ...props
}: SeparatorProps & {
  withHandle?: boolean;
}) {
  return (
    <Separator
      aria-label={(props as any)["aria-label"] ?? "Resize panel"}
      className={cn(
        "relative flex w-px touch-manipulation select-none items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=horizontal]:cursor-col-resize data-[orientation=vertical]:cursor-row-resize data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:translate-x-0 data-[orientation=vertical]:after:-translate-y-1/2 [&[data-orientation=vertical]>div]:rotate-90",
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
    </Separator>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

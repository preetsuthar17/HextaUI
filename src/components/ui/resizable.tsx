"use client";

import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { cva, type VariantProps } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

const resizablePanelVariants = cva("relative", {
  variants: {
    border: {
      none: "",
      left: "border-s",
      right: "border-e",
      top: "border-t",
      bottom: "border-b",
      all: "border",
      vertical: "border-s border-e",
      horizontal: "border-t border-b",
    },
  },
  defaultVariants: {
    border: "none",
  },
});

const ResizablePanelGroup = React.forwardRef<
  React.ElementRef<typeof PanelGroup>,
  React.ComponentPropsWithoutRef<typeof PanelGroup>
>(({ className, ...props }, ref) => (
  <PanelGroup
    ref={ref}
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className,
    )}
    {...props}
  />
));
ResizablePanelGroup.displayName = "ResizablePanelGroup";

interface ResizablePanelProps
  extends React.ComponentPropsWithoutRef<typeof Panel>,
    VariantProps<typeof resizablePanelVariants> {}

const ResizablePanel = React.forwardRef<
  React.ElementRef<typeof Panel>,
  ResizablePanelProps
>(({ className, border, ...props }, ref) => (
  <Panel
    ref={ref}
    className={cn(resizablePanelVariants({ border }), className)}
    {...props}
  />
));
ResizablePanel.displayName = "ResizablePanel";

const ResizableHandle = ({
  withHandle = true,
  className,
  ...props
}: React.ComponentProps<typeof PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </PanelResizeHandle>
);

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  resizablePanelVariants,
};

"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { cn } from "@/lib/utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return (
    <TooltipPrimitive.Trigger
      className={cn("touch-manipulation", className)}
      data-slot="tooltip-trigger"
      type="button"
      {...props}
    />
  );
}

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentProps<typeof TooltipPrimitive.Content>
>(function TooltipContent(
  { className, sideOffset = 0, children, ...props },
  ref
) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        className={cn(
          "fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in touch-manipulation text-balance rounded-md bg-foreground px-3 py-1.5 text-background text-xs data-[state=closed]:animate-out motion-reduce:animate-none",
          className
        )}
        data-slot="tooltip-content"
        ref={ref}
        sideOffset={sideOffset}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow
          aria-hidden="true"
          className="z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground"
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
});

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

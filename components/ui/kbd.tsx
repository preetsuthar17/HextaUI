import * as React from "react";
import { cn } from "@/lib/utils";

const Kbd = React.forwardRef<HTMLElement, React.ComponentProps<"kbd">>(
  function Kbd({ className, ...props }, ref) {
    return (
      <kbd
        className={cn(
          "pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm bg-muted px-1 font-medium font-mono text-muted-foreground text-xs tabular-nums",
          "[&_svg:not([class*='size-'])]:size-3",
          "in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10",
          className
        )}
        data-slot="kbd"
        ref={ref}
        {...props}
      />
    );
  }
);

const KbdGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function KbdGroup({ className, ...props }, ref) {
    return (
      <div
        className={cn(
          "inline-flex touch-manipulation items-center gap-1",
          className
        )}
        data-slot="kbd-group"
        ref={ref}
        {...props}
      />
    );
  }
);

export { Kbd, KbdGroup };

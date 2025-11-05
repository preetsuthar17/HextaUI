"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import * as React from "react";
import { cn } from "@/lib/utils";

const Collapsible = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Root>,
  React.ComponentProps<typeof CollapsiblePrimitive.Root>
>(function Collapsible({ ...props }, ref) {
  return (
    <CollapsiblePrimitive.Root data-slot="collapsible" ref={ref} {...props} />
  );
});

const CollapsibleTrigger = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>
>(function CollapsibleTrigger({ className, ...props }, ref) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      className={cn("touch-manipulation", className)}
      data-slot="collapsible-trigger"
      ref={ref}
      type="button"
      {...props}
    />
  );
});

const CollapsibleContent = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>
>(function CollapsibleContent({ ...props }, ref) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      ref={ref}
      {...props}
    />
  );
});

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentProps<typeof CheckboxPrimitive.Root>
>(function Checkbox({ className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Root
      aria-disabled={(props as any).disabled ? true : undefined}
      aria-required={(props as any).required ? true : undefined}
      className={cn(
        "peer size-4 shrink-0 touch-manipulation rounded-[4px] border border-input shadow-xs outline-none transition-shadow focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:data-[state=checked]:bg-primary dark:aria-invalid:ring-destructive/40",
        className
      )}
      data-slot="checkbox"
      ref={ref}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="grid place-content-center text-current transition-none"
        data-slot="checkbox-indicator"
      >
        <CheckIcon aria-hidden="true" className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

export { Checkbox };

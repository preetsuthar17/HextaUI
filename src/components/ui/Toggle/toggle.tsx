"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-[hsl(var(--hu-border))] text-[hsl(var(--hu-foreground))] hover:bg-[hsl(var(--hu-accent))] hover:text-[hsl(var(--hu-accent-foreground))] data-[state=on]:bg-[hsl(var(--hu-primary))] data-[state=on]:text-[hsl(var(--hu-primary-foreground))] focus-visible:ring-[hsl(var(--hu-ring))]",
        outline:
          "border border-[hsl(var(--hu-border))] text-[hsl(var(--hu-foreground))] hover:bg-[hsl(var(--hu-accent))] hover:text-[hsl(var(--hu-accent-foreground))] data-[state=on]:bg-[hsl(var(--hu-accent))] data-[state=on]:text-[hsl(var(--hu-accent-foreground))] data-[state=on]:border-[hsl(var(--hu-primary))] focus-visible:ring-[hsl(var(--hu-ring))]",
        ghost:
          "text-[hsl(var(--hu-foreground))] hover:bg-[hsl(var(--hu-accent))] hover:text-[hsl(var(--hu-accent-foreground))] data-[state=on]:bg-[hsl(var(--hu-accent))] data-[state=on]:text-[hsl(var(--hu-accent-foreground))] focus-visible:ring-[hsl(var(--hu-ring))]",
        secondary:
          "bg-[hsl(var(--hu-secondary))] text-[hsl(var(--hu-secondary-foreground))] hover:bg-[hsl(var(--hu-secondary))]/80 data-[state=on]:bg-[hsl(var(--hu-primary))] data-[state=on]:text-[hsl(var(--hu-primary-foreground))] focus-visible:ring-[hsl(var(--hu-ring))]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        xl: "h-12 px-10 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(
  (
    { className, variant, size, leftIcon, rightIcon, children, ...props },
    ref
  ) => (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    >
      {leftIcon && leftIcon}
      {children}
      {rightIcon && rightIcon}
    </TogglePrimitive.Root>
  )
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };

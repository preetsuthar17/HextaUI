"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const kbdVariants = cva(
  "inline-flex items-center justify-center font-mono text-xs bg-muted text-muted-foreground border border-border rounded-md border-b-3 transition-all duration-75 cursor-pointer select-none active:translate-y-[1px] active:border-b-[1px]  hover:bg-muted/80 shadow-sm/2",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground border-border",
        outline: "bg-transparent border-border text-foreground hover:bg-accent",
        solid:
          "bg-foreground text-background border-foreground hover:bg-foreground/90",
        secondary:
          "bg-secondary text-secondary-foreground border-border hover:bg-secondary/80",
      },
      size: {
        xs: "h-5 px-1.5 text-[10px] min-w-[1.25rem]",
        sm: "h-6 px-2 text-xs min-w-[1.5rem]",
        md: "h-7 px-2.5 text-sm min-w-[1.75rem]",
        lg: "h-8 px-3 text-sm min-w-[2rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {
  keys?: string[];
  onClick?: () => void;
}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, variant, size, keys, children, onClick, ...props }, ref) => {
    // If keys array is provided, render multiple kbd elements
    if (keys && keys.length > 0) {
      return (
        <span
          className="inline-flex items-center gap-1"
          ref={ref as React.Ref<HTMLSpanElement>}
          onClick={onClick}
        >
          {keys.map((key, index) => (
            <React.Fragment key={index}>
              <kbd
                className={cn(kbdVariants({ variant, size }), className)}
                {...props}
              >
                {key}
              </kbd>
              {index < keys.length - 1 && (
                <span className="text-muted-foreground text-xs px-1">+</span>
              )}
            </React.Fragment>
          ))}
        </span>
      );
    }

    // Single kbd element
    return (
      <kbd
        className={cn(kbdVariants({ variant, size }), className)}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {children}
      </kbd>
    );
  },
);

Kbd.displayName = "Kbd";

export { Kbd, kbdVariants };

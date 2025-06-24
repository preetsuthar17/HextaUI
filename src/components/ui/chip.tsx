"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { type LucideIcon, X } from "lucide-react";

const chipVariants = cva(
  "inline-flex items-center justify-center rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[hsl(var(--hu-primary))] text-[hsl(var(--hu-primary-foreground))] hover:bg-[hsl(var(--hu-primary))]/80 focus-visible:ring-[hsl(var(--hu-ring))] shadow-sm/2",
        secondary:
          "border-transparent bg-[hsl(var(--hu-secondary))] text-[hsl(var(--hu-secondary-foreground))] hover:bg-[hsl(var(--hu-secondary))]/80 focus-visible:ring-[hsl(var(--hu-ring))]",
        destructive:
          "border-transparent bg-[hsl(var(--hu-destructive))] text-[hsl(var(--hu-destructive-foreground))] hover:bg-[hsl(var(--hu-destructive))]/80 focus-visible:ring-[hsl(var(--hu-destructive))] shadow-sm/2",
        outline:
          "border-[hsl(var(--hu-border))] text-[hsl(var(--hu-foreground))] hover:bg-[hsl(var(--hu-accent))] hover:text-[hsl(var(--hu-accent-foreground))] focus-visible:ring-[hsl(var(--hu-ring))] shadow-sm/2",
        ghost:
          "border-transparent text-[hsl(var(--hu-foreground))] hover:bg-[hsl(var(--hu-accent))] hover:text-[hsl(var(--hu-accent-foreground))] focus-visible:ring-[hsl(var(--hu-ring))]",
      },
      size: {
        sm: "h-6 px-2 gap-1 text-sm",
        default: "h-7 px-3 gap-1.5 text-sm",
        lg: "h-8 px-4 text-sm gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      variant,
      size,
      icon: Icon,
      iconPosition = "left",
      dismissible = false,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    const iconSize = size === "sm" ? 12 : size === "lg" ? 14 : 12;
    const closeIconSize = size === "sm" ? 10 : size === "lg" ? 12 : 10;

    const handleDismiss = (e: React.MouseEvent) => {
      e.stopPropagation();
      onDismiss?.();
    };

    return (
      <div
        ref={ref}
        className={cn(chipVariants({ variant, size }), className)}
        {...props}
      >
        {Icon && iconPosition === "left" && (
          <Icon size={iconSize} className="shrink-0" />
        )}
        {children}
        {Icon && iconPosition === "right" && !dismissible && (
          <Icon size={iconSize} className="shrink-0" />
        )}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="shrink-0 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Remove"
          >
            <X size={closeIconSize} />
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = "Chip";

export { Chip, chipVariants };

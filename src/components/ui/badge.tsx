"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

const badgeVariants = cva(
  "flex items-center justify-center gap-1.5 rounded-[calc(var(--radius)-4px)] border text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[hsl(var(--hu-primary))] text-[hsl(var(--hu-primary-foreground))] hover:bg-[hsl(var(--hu-primary))]/80 focus-visible:ring-[hsl(var(--hu-ring))] shadow-md/2",
        secondary:
          "border-transparent bg-[hsl(var(--hu-secondary))] text-[hsl(var(--hu-secondary-foreground))] hover:bg-[hsl(var(--hu-secondary))]/80 focus-visible:ring-[hsl(var(--hu-ring))]",
        destructive:
          "border-transparent bg-[hsl(var(--hu-destructive))] text-[hsl(var(--hu-destructive-foreground))] hover:bg-[hsl(var(--hu-destructive))]/80 focus-visible:ring-[hsl(var(--hu-destructive))] shadow-md/2",
        outline:
          "border-[hsl(var(--hu-border))] text-[hsl(var(--hu-foreground))] hover:bg-[hsl(var(--hu-accent))] hover:text-[hsl(var(--hu-accent-foreground))] focus-visible:ring-[hsl(var(--hu-ring))] shadow-md/2",
        ghost:
          "border-transparent text-[hsl(var(--hu-foreground))] hover:bg-[hsl(var(--hu-accent))] hover:text-[hsl(var(--hu-accent-foreground))] focus-visible:ring-[hsl(var(--hu-ring))]",
      },
      size: {
        sm: "h-5 px-2",
        default: "h-6 px-2.5",
        lg: "h-7 px-3 text-sm",
        icon: "h-6 w-6 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

function Badge({
  className,
  variant,
  size,
  icon: Icon,
  iconPosition = "left",
  children,
  ...props
}: BadgeProps) {
  const iconSize = size === "sm" ? 12 : size === "lg" ? 14 : 12;

  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {Icon && iconPosition === "left" && (
        <Icon size={iconSize} className="shrink-0" />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon size={iconSize} className="shrink-0" />
      )}
    </span>
  );
}

export { Badge, badgeVariants };

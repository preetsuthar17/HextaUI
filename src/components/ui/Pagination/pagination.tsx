"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const paginationVariants = cva("flex items-center justify-center", {
  variants: {
    variant: {
      default: "gap-1",
      compact: "gap-0.5",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const paginationItemVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-[var(--radius)] h-9 w-9 text-[hsl(var(--hu-foreground))] hover:bg-[hsl(var(--hu-accent))] hover:text-[hsl(var(--hu-accent-foreground))] focus-visible:ring-[hsl(var(--hu-ring))]",
        outline:
          "rounded-[var(--radius)] h-9 w-9 border border-[hsl(var(--hu-border))] text-[hsl(var(--hu-foreground))] hover:bg-[hsl(var(--hu-accent))] hover:text-[hsl(var(--hu-accent-foreground))] focus-visible:ring-[hsl(var(--hu-ring))]",
        ghost:
          "rounded-[var(--radius)] h-9 w-9 text-[hsl(var(--hu-foreground))] hover:bg-[hsl(var(--hu-accent))] hover:text-[hsl(var(--hu-accent-foreground))] focus-visible:ring-[hsl(var(--hu-ring))]",
      },
      size: {
        default: "h-9 w-9",
        sm: "h-8 w-8 text-xs",
        lg: "h-10 w-10",
      },
      state: {
        default: "",
        active:
          "bg-[hsl(var(--hu-primary))] text-[hsl(var(--hu-primary-foreground))] hover:bg-[hsl(var(--hu-primary))]/90 hover:text-[hsl(var(--hu-primary-foreground))] focus-visible:ring-[hsl(var(--hu-ring))]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  },
);

const paginationNavVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-[var(--radius)] px-3 text-[hsl(var(--hu-foreground))] hover:bg-[hsl(var(--hu-accent))] hover:text-[hsl(var(--hu-accent-foreground))] focus-visible:ring-[hsl(var(--hu-ring))]",
  {
    variants: {
      size: {
        default: "h-9",
        sm: "h-8 text-xs px-2",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface PaginationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof paginationVariants> {}

export interface PaginationItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof paginationItemVariants> {
  isActive?: boolean;
}

export interface PaginationNavProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof paginationNavVariants> {}

export interface PaginationEllipsisProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, variant, ...props }, ref) => (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn(paginationVariants({ variant, className }))}
      ref={ref}
      {...props}
    />
  ),
);
Pagination.displayName = "Pagination";

const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ className, variant, size, state, isActive, ...props }, ref) => (
    <button
      className={cn(
        paginationItemVariants({
          variant,
          size,
          state: isActive ? "active" : state,
          className,
        }),
      )}
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      {...props}
    />
  ),
);
PaginationItem.displayName = "PaginationItem";

const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  PaginationNavProps
>(({ className, size, children, ...props }, ref) => (
  <button
    className={cn(paginationNavVariants({ size, className }))}
    ref={ref}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    {children || "Previous"}
  </button>
));
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationNavProps>(
  ({ className, size, children, ...props }, ref) => (
    <button
      className={cn(paginationNavVariants({ size, className }))}
      ref={ref}
      {...props}
    >
      {children || "Next"}
      <ChevronRight className="h-4 w-4" />
    </button>
  ),
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(({ className, ...props }, ref) => (
  <span
    className={cn(
      "inline-flex items-center justify-center h-9 w-9 text-[hsl(var(--hu-muted-foreground))]",
      className,
    )}
    ref={ref}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
));
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  paginationVariants,
  paginationItemVariants,
  paginationNavVariants,
};

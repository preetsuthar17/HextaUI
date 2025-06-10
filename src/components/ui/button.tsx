"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(var(--hu-primary))] text-[hsl(var(--hu-primary-foreground))] hover:bg-[hsl(var(--hu-primary))]/90 focus-visible:ring-[hsl(var(--hu-ring))]",
        destructive:
          "bg-[hsl(var(--hu-destructive))] text-[hsl(var(--hu-destructive-foreground))] hover:bg-[hsl(var(--hu-destructive))]/90 focus-visible:ring-[hsl(var(--hu-destructive))]",
        outline:
          "border border-[hsl(var(--hu-border))] text-[hsl(var(--hu-foreground))] hover:bg-[hsl(var(--hu-accent))] hover:text-[hsl(var(--hu-accent-foreground))] focus-visible:ring-[hsl(var(--hu-ring))]",
        secondary:
          "bg-[hsl(var(--hu-secondary))] text-[hsl(var(--hu-secondary-foreground))] hover:bg-[hsl(var(--hu-secondary))]/80 focus-visible:ring-[hsl(var(--hu-ring))]",
        ghost:
          "text-[hsl(var(--hu-foreground))] hover:bg-[hsl(var(--hu-accent))] hover:text-[hsl(var(--hu-accent-foreground))] focus-visible:ring-[hsl(var(--hu-ring))]",
        link: "text-[hsl(var(--hu-secondary-foreground))] underline-offset-4 hover:underline focus-visible:ring-[hsl(var(--hu-ring))]",
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

export type CustomButtonProps = Omit<
  ButtonProps,
  keyof React.ComponentProps<"button">
>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {leftIcon && !loading && leftIcon}
        {children}
        {rightIcon && !loading && rightIcon}
      </>
    );

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

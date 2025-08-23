"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  "peer shrink-0 rounded-sm border border-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:border-primary bg-accent text-foreground  focus-visible:ring-offset-background focus-visible:ring-offset-2 transition-colors ",
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        default: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
  error?: string;
}

const CheckboxRoot = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size, label, description, error, id, disabled, ...props }, ref) => {
  const checkboxId = id || React.useId();
  const iconSize = size === "sm" ? 10 : size === "lg" ? 14 : 12;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start gap-2">
        <CheckboxPrimitive.Root
          ref={ref}
          id={checkboxId}
          className={cn(checkboxVariants({ size }), className)}
          disabled={disabled}
          {...props}
        >
          <CheckboxPrimitive.Indicator asChild>
            <div className="flex items-center justify-center text-current">
              {props.checked === "indeterminate" ? (
                <svg
                  width={iconSize}
                  height={iconSize}
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 6h8"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  width={iconSize}
                  height={iconSize}
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 6l3 3 6-6"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {(label || description) && (
          <div className="grid gap-1.5 leading-none">
            {label && (
              <label
                htmlFor={checkboxId}
                className={cn(
                  "text-sm leading-none cursor-pointer",
                  disabled && "opacity-70 cursor-not-allowed"
                )}
                aria-disabled={disabled ? true : undefined}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={cn(
                "text-xs text-muted-foreground",
                disabled && "opacity-70"
              )}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-destructive ms-6">{error}</p>}
    </div>
  );
});

CheckboxRoot.displayName = "Checkbox";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>((props, ref) => <CheckboxRoot ref={ref} {...props} />);

Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants, type CheckboxProps };

"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  {
    variants: {
      variant: {
        default:
          "data-[state=checked]:bg-primary data-[state=unchecked]:bg-accent",
        secondary:
          "data-[state=checked]:bg-secondary data-[state=unchecked]:bg-accent",
      },
      size: {
        sm: "h-5 w-9",
        default: "h-6 w-11",
        lg: "h-7 w-13",
        xl: "h-8 w-15",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background  ring-0 transition-transform",
  {
    variants: {
      variant: {
        default: "bg-background",
        secondary: "bg-background",
      },
      size: {
        sm: "h-4 w-4 data-[state=checked]:translate-x-4 rtl:data-[state=checked]:-translate-x-4 data-[state=unchecked]:translate-x-0",
        default:
          "h-5 w-5 data-[state=checked]:translate-x-5 rtl:data-[state=checked]:-translate-x-5 data-[state=unchecked]:translate-x-0",
        lg: "h-6 w-6 data-[state=checked]:translate-x-6 rtl:data-[state=checked]:-translate-x-6 data-[state=unchecked]:translate-x-0",
        xl: "h-7 w-7 data-[state=checked]:translate-x-7 rtl:data-[state=checked]:-translate-x-7 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {
  label?: string;
  description?: string;
  error?: string;
  animated?: boolean;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(
  (
    {
      className,
      variant,
      size,
      label,
      description,
      error,
      animated = true,
      id,
      ...props
    },
    ref,
  ) => {
    const switchId = id || React.useId();

    const switchElement = (
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        className={cn(switchVariants({ variant, size }), className)}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(switchThumbVariants({ variant, size }))}
          asChild={animated}
        >
          {animated ? (
            <motion.div
              layout
              transition={{
                type: "spring",
                stiffness: 700,
                damping: 30,
              }}
              className={cn(switchThumbVariants({ variant, size }))}
            />
          ) : (
            <div className={cn(switchThumbVariants({ variant, size }))} />
          )}
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
    );

    if (label || description || error) {
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            {switchElement}
            <div className="grid gap-1.5 leading-none">
              {label && (
                <label
                  htmlFor={switchId}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {label}
                </label>
              )}
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      );
    }

    return switchElement;
  },
);

Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch, switchVariants };

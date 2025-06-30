"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sliderVariants = cva(
  "relative flex w-full touch-none select-none items-center",
  {
    variants: {
      variant: {
        default: "",
        destructive: "",
        ghost: "",
      },
      size: {
        sm: "h-3",
        default: "h-4",
        lg: "h-5",
        xl: "h-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const sliderTrackVariants = cva(
  "relative w-full grow overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "bg-muted",
        destructive: "bg-destructive/20",
        ghost: "bg-accent",
      },
      size: {
        sm: "h-1.5",
        default: "h-2",
        lg: "h-2.5",
        xl: "h-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const sliderRangeVariants = cva("absolute h-full rounded-full", {
  variants: {
    variant: {
      default: "bg-primary",
      destructive: "bg-destructive",
      ghost: "bg-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const sliderThumbVariants = cva(
  "block rounded-full border-2 bg-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:shadow-md",
  {
    variants: {
      variant: {
        default: "border-primary hover:border-primary/80",
        destructive: "border-destructive hover:border-destructive/80",
        ghost: "border-foreground hover:border-foreground/80",
      },
      size: {
        sm: "h-3 w-3",
        default: "h-4 w-4",
        lg: "h-5 w-5",
        xl: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface SliderProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
      "size"
    >,
    VariantProps<typeof sliderVariants> {
  label?: string;
  description?: string;
  error?: boolean | string;
  showValue?: boolean;
  showMinMax?: boolean;
  formatValue?: (value: number) => string;
  onValueChange?: (value: number[]) => void;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      variant,
      size,
      label,
      description,
      error,
      showValue = false,
      showMinMax = false,
      formatValue = (value) => value.toString(),
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue,
      onValueChange,
      disabled,
      orientation = "horizontal",
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState<number[]>(
      defaultValue || value || [min],
    );

    const currentValue = value || internalValue;
    const effectiveVariant = error ? "destructive" : variant;

    const handleValueChange = React.useCallback(
      (newValue: number[]) => {
        if (!value) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [value, onValueChange],
    );

    const sliderId = React.useId();
    const descriptionId = React.useId();

    const sliderElement = (
      <SliderPrimitive.Root
        ref={ref}
        id={sliderId}
        className={cn(
          sliderVariants({ variant: effectiveVariant, size }),
          className,
        )}
        value={currentValue}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        orientation={orientation}
        aria-describedby={description ? descriptionId : undefined}
        {...props}
      >
        <SliderPrimitive.Track
          className={cn(
            sliderTrackVariants({ variant: effectiveVariant, size }),
          )}
        >
          <SliderPrimitive.Range
            className={cn(sliderRangeVariants({ variant: effectiveVariant }))}
          />
        </SliderPrimitive.Track>
        {currentValue.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className={cn(
              sliderThumbVariants({ variant: effectiveVariant, size }),
            )}
          />
        ))}
      </SliderPrimitive.Root>
    );

    if (label || description || showValue || showMinMax || error) {
      return (
        <div className="space-y-2">
          {/* Header with label and value */}
          {(label || showValue) && (
            <div className="flex items-center justify-between">
              {label && (
                <label
                  htmlFor={sliderId}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {label}
                </label>
              )}
              {showValue && (
                <span className="text-sm text-muted-foreground">
                  {currentValue.length === 1
                    ? formatValue(currentValue[0])
                    : currentValue.map(formatValue).join(" - ")}
                </span>
              )}
            </div>
          )}

          {/* Slider */}
          <div className="space-y-2">
            {sliderElement}

            {/* Min/Max labels */}
            {showMinMax && (
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatValue(min)}</span>
                <span>{formatValue(max)}</span>
              </div>
            )}
          </div>

          {/* Description and error */}
          {(description || error) && (
            <div className="space-y-1">
              {description && (
                <p id={descriptionId} className="text-sm text-muted-foreground">
                  {description}
                </p>
              )}
              {error && typeof error === "string" && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>
          )}
        </div>
      );
    }

    return sliderElement;
  },
);

Slider.displayName = SliderPrimitive.Root.displayName;

export {
  Slider,
  sliderVariants,
  sliderTrackVariants,
  sliderRangeVariants,
  sliderThumbVariants,
};

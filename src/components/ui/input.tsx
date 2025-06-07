"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, X } from "lucide-react";

const inputVariants = cva(
  "flex w-full rounded-xl border border-[hsl(var(--hu-border))] bg-[hsl(var(--hu-background))] px-3 py-2 text-sm ring-offset-[hsl(var(--hu-background))] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[hsl(var(--hu-muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--hu-ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
  {
    variants: {
      variant: {
        default: "border-[hsl(var(--hu-border))]",
        destructive:
          "border-[hsl(var(--hu-destructive))] focus-visible:ring-[hsl(var(--hu-destructive))]",
        ghost:
          "border-transparent bg-[hsl(var(--hu-accent))] focus-visible:bg-[hsl(var(--hu-background))] focus-visible:border-[hsl(var(--hu-border))]",
      },
      size: {
        default: "h-9 px-3 py-2",
        sm: "h-8 px-2 py-1 text-xs",
        lg: "h-10 px-4 py-2",
        xl: "h-12 px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
  clearable?: boolean;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      type = "text",
      leftIcon,
      rightIcon,
      error,
      clearable,
      onClear,
      value,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(
      props.defaultValue || "",
    );

    const inputVariant = error ? "destructive" : variant;
    const isPassword = type === "password";
    const actualType = isPassword && showPassword ? "text" : type;

    // Determine if this is a controlled component
    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : internalValue;
    const showClearButton =
      clearable && inputValue && String(inputValue).length > 0;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      props.onChange?.(e);
    };

    const handleClear = () => {
      const clearEvent = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;

      if (!isControlled) {
        setInternalValue("");
      }
      onClear?.();
      props.onChange?.(clearEvent);
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Calculate right padding based on icons
    let rightPadding = "";
    const iconsCount = [
      isPassword, // password toggle
      showClearButton, // clear button
      rightIcon, // custom right icon
    ].filter(Boolean).length;

    if (iconsCount > 0) {
      rightPadding = `pr-${8 + iconsCount * 6}`;
    }

    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--hu-muted-foreground))] [&_svg]:size-4 [&_svg]:shrink-0 z-10">
            {leftIcon}
          </div>
        )}{" "}
        <input
          type={actualType}
          className={cn(
            inputVariants({ variant: inputVariant, size, className }),
            leftIcon && "pl-10",
            (rightIcon || isPassword || showClearButton) && "pr-10",
          )}
          ref={ref}
          {...(isControlled
            ? { value: inputValue }
            : { defaultValue: props.defaultValue })}
          onChange={handleInputChange}
          {...(({ defaultValue, ...rest }) => rest)(props)}
        />
        {/* Right side icons container */}
        {(rightIcon || isPassword || showClearButton) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
            {/* Custom right icon */}
            {rightIcon && (
              <div className="text-[hsl(var(--hu-muted-foreground))] [&_svg]:size-4 [&_svg]:shrink-0">
                {rightIcon}
              </div>
            )}

            {/* Clear button */}
            {showClearButton && (
              <button
                type="button"
                onClick={handleClear}
                className="text-[hsl(var(--hu-muted-foreground))] hover:text-[hsl(var(--hu-foreground))] transition-colors [&_svg]:size-4 [&_svg]:shrink-0"
                tabIndex={-1}
              >
                <X />
              </button>
            )}

            {/* Password visibility toggle */}
            {isPassword && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-[hsl(var(--hu-muted-foreground))] hover:text-[hsl(var(--hu-foreground))] transition-colors [&_svg]:size-4 [&_svg]:shrink-0"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            )}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants };

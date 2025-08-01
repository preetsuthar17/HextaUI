"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, X } from "lucide-react";

const inputVariants = cva(
  "flex w-full rounded-ele border border-border bg-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm/2",
  {
    variants: {
      variant: {
        default: "border-border",
        destructive: "border-destructive focus-visible:ring-destructive",
        ghost:
          "border-transparent bg-accent focus-visible:bg-input focus-visible:border-border",
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
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Combine external ref with internal ref
    React.useImperativeHandle(ref, () => inputRef.current!);

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
      // Clear the internal state for uncontrolled inputs
      if (!isControlled) {
        setInternalValue("");
      }

      // Call the onClear callback if provided
      onClear?.();

      // Create a synthetic event to trigger onChange with empty value
      if (inputRef.current) {
        const input = inputRef.current;

        // Set the input's value directly
        input.value = "";

        // Create a synthetic React ChangeEvent
        const syntheticEvent = {
          target: input,
          currentTarget: input,
          nativeEvent: new Event("input", { bubbles: true }),
          isDefaultPrevented: () => false,
          isPropagationStopped: () => false,
          persist: () => {},
          preventDefault: () => {},
          stopPropagation: () => {},
          bubbles: true,
          cancelable: true,
          defaultPrevented: false,
          eventPhase: 0,
          isTrusted: true,
          timeStamp: Date.now(),
          type: "change",
        } as React.ChangeEvent<HTMLInputElement>;

        // Trigger the onChange handler
        props.onChange?.(syntheticEvent);

        // Focus the input after clearing
        input.focus();
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0 z-10">
            {leftIcon}
          </div>
        )}{" "}
        <input
          type={actualType}
          className={cn(
            inputVariants({ variant: inputVariant, size, className }),
            leftIcon && "ps-10",
            rightIcon || isPassword || showClearButton,
          )}
          ref={inputRef}
          {...(isControlled
            ? { value: inputValue }
            : { defaultValue: props.defaultValue })}
          onChange={handleInputChange}
          {...(({ defaultValue, ...rest }) => rest)(props)}
        />
        {/* Right side icons container */}
        {(rightIcon || isPassword || showClearButton) && (
          <div className="absolute end-3 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
            {/* Custom right icon */}
            {rightIcon && (
              <div className="text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0">
                {rightIcon}
              </div>
            )}

            {/* Clear button */}
            {showClearButton && (
              <button
                type="button"
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground transition-colors [&_svg]:size-4 [&_svg]:shrink-0"
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
                className="text-muted-foreground hover:text-foreground transition-colors [&_svg]:size-4 [&_svg]:shrink-0"
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

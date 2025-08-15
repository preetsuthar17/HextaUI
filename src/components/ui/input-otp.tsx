"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const inputOTPVariants = cva(
  "flex items-center gap-1 sm:gap-2 has-[:disabled]:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        destructive: "",
      },
      size: {
        sm: "gap-0.5 sm:gap-1",
        default: "gap-1 sm:gap-2",
        lg: "gap-2 sm:gap-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const inputOTPSlotVariants = cva(
  "relative flex items-center justify-center border-y border-e border-border bg-input text-xs sm:text-sm transition-all focus-within:z-10 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-s ",
  {
    variants: {
      variant: {
        default: "border-border text-foreground",
        destructive:
          "border-destructive text-destructive-foreground focus-within:ring-ring",
      },
      size: {
        sm: "h-6 w-6 sm:h-8 sm:w-8 text-xs",
        default: "h-8 w-8 sm:h-10 sm:w-10 text-xs sm:text-sm",
        lg: "h-10 w-10 sm:h-12 sm:w-12 text-sm sm:text-base",
      },
      state: {
        default: "",
        active: "border-primary ring-2 ring-ring ring-offset-2",
        filled: "bg-accent border-border text-accent-foreground",
      },
      position: {
        first: "border-s rounded-s-ele",
        middle: "rounded-sm",
        last: "rounded-e-ele",
        single: "border-s rounded-ele",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
      position: "middle",
    },
  },
);

export interface InputOTPProps {
  maxLength: number;
  value?: string;
  onChange?: (newValue: string) => void;
  onComplete?: (newValue: string) => void;
  disabled?: boolean;
  pattern?: string;
  className?: string;
  containerClassName?: string;
  animated?: boolean;
  variant?: "default" | "destructive";
  otpSize?: "sm" | "default" | "lg";
  children?: React.ReactNode;
}

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  InputOTPProps
>(
  (
    {
      className,
      containerClassName,
      variant,
      otpSize,
      animated = true,
      children,
      ...props
    },
    ref,
  ) => (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        inputOTPVariants({ variant, size: otpSize }),
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    >
      {children}
    </OTPInput>
  ),
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> &
    Omit<VariantProps<typeof inputOTPVariants>, "size"> & {
      otpSize?: "sm" | "default" | "lg";
    }
>(({ className, variant, otpSize, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(inputOTPVariants({ variant, size: otpSize }), className)}
    {...props}
  />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> &
    Omit<VariantProps<typeof inputOTPSlotVariants>, "size"> & {
      index: number;
      animated?: boolean;
      otpSize?: "sm" | "default" | "lg";
    }
>(
  (
    { index, className, variant, otpSize, state, animated = true, ...props },
    ref,
  ) => {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

    const currentState = isActive ? "active" : char ? "filled" : "default";

    // Determine position based on index and total slots
    const totalSlots = inputOTPContext.slots.length;
    const position =
      totalSlots === 1
        ? "single"
        : index === 0
          ? "first"
          : index === totalSlots - 1
            ? "last"
            : "middle";

    const slotContent = (
      <div
        ref={ref}
        className={cn(
          inputOTPSlotVariants({
            variant,
            size: otpSize,
            state: state || currentState,
            position,
          }),
          className,
        )}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <motion.div
              className="h-3 w-px sm:h-4 sm:w-px bg-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        )}
      </div>
    );

    if (!animated) return slotContent;

    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.2,
          delay: index * 0.05,
          ease: "easeOut",
        }}
      >
        {slotContent}
      </motion.div>
    );
  },
);
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof inputOTPVariants>
>(({ variant, size, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn(
      "flex items-center justify-center text-muted-foreground",
      size === "sm"
        ? "text-xs"
        : size === "lg"
          ? "text-sm sm:text-base"
          : "text-xs sm:text-sm",
    )}
    {...props}
  >
    -
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  inputOTPVariants,
  inputOTPSlotVariants,
};

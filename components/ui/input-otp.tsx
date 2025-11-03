"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ComponentRef<typeof OTPInput>,
  React.ComponentProps<typeof OTPInput> & { containerClassName?: string }
>(function InputOTP({ className, containerClassName, ...props }, ref) {
  return (
    <OTPInput
      ref={ref}
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50 touch-manipulation",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      aria-disabled={(props as any).disabled ? true : undefined}
      aria-invalid={(props as any)["aria-invalid"] ? true : undefined}
      aria-busy={
        typeof (props as any).value === "string" && typeof (props as any).maxLength === "number"
          ? ((props as any).value.length < (props as any).maxLength ? true : undefined)
          : undefined
      }
      {...props}
    />
  )
})

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function InputOTPGroup({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
})

const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { index: number }
>(function InputOTPSlot({ index, className, ...props }, ref) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      ref={ref}
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm tabular-nums shadow-xs transition-[color,box-shadow] motion-safe:duration-200 outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink motion-reduce:animate-none bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  )
})

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function InputOTPSeparator({ ...props }, ref) {
  return (
    <div ref={ref} data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon aria-hidden="true" />
    </div>
  )
})

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }

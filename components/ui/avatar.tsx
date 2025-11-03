"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  React.ComponentProps<typeof AvatarPrimitive.Root>
>(function Avatar({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring touch-manipulation",
        className
      )}
      {...props}
    />
  )
})

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentProps<typeof AvatarPrimitive.Image>
>(function AvatarImage({ className, loading, decoding, draggable, ...props }, ref) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      loading={loading ?? "lazy"}
      decoding={decoding ?? "async"}
      draggable={draggable ?? false}
      alt={(props as any).alt ?? ""}
      {...props}
    />
  )
})

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentProps<typeof AvatarPrimitive.Fallback>
>(function AvatarFallback({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
})

export { Avatar, AvatarImage, AvatarFallback }

"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  React.ComponentProps<typeof AvatarPrimitive.Root>
>(function Avatar({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "relative flex size-8 shrink-0 touch-manipulation overflow-hidden rounded-full focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className
      )}
      data-slot="avatar"
      ref={ref}
      {...props}
    />
  );
});

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentProps<typeof AvatarPrimitive.Image>
>(function AvatarImage(
  { className, loading, decoding, draggable, ...props },
  ref
) {
  return (
    <AvatarPrimitive.Image
      alt={(props as any).alt ?? ""}
      className={cn("aspect-square size-full", className)}
      data-slot="avatar-image"
      decoding={decoding ?? "async"}
      draggable={draggable ?? false}
      loading={loading ?? "lazy"}
      ref={ref}
      {...props}
    />
  );
});

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentProps<typeof AvatarPrimitive.Fallback>
>(function AvatarFallback({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted",
        className
      )}
      data-slot="avatar-fallback"
      ref={ref}
      {...props}
    />
  );
});

export { Avatar, AvatarImage, AvatarFallback };

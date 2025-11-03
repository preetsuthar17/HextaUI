import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const Empty = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function Empty({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="empty"
        className={cn(
          "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12 touch-manipulation",
          className
        )}
        {...props}
      />
    )
  }
)

const EmptyHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function EmptyHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="empty-header"
        className={cn(
          "flex max-w-sm flex-col items-center gap-2 text-center",
          className
        )}
        {...props}
      />
    )
  }
)

const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const EmptyMedia = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>
>(function EmptyMedia({ className, variant = "default", ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant }), className)}
      {...props}
    />
  )
})

const EmptyTitle = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function EmptyTitle({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="empty-title"
        className={cn("text-lg font-medium tracking-tight", className)}
        {...props}
      />
    )
  }
)

const EmptyDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"p">
>(function EmptyDescription({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="empty-description"
      className={cn(
          "text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4 tabular-nums",
        className
      )}
      {...props}
    />
  )
})

const EmptyContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function EmptyContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="empty-content"
      className={cn(
          "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance tabular-nums",
        className
      )}
      {...props}
    />
  )
})

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}

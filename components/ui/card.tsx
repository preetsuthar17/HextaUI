import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function Card({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card"
        className={cn(
          "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm touch-manipulation",
          className
        )}
        {...props}
      />
    )
  }
)

const CardHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function CardHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-header"
        className={cn(
          "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
          className
        )}
        {...props}
      />
    )
  }
)

const CardTitle = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function CardTitle({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-title"
        className={cn("leading-none font-semibold", className)}
        {...props}
      />
    )
  }
)

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function CardDescription({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
})

const CardAction = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function CardAction({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-action"
        className={cn(
          "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
          className
        )}
        {...props}
      />
    )
  }
)

const CardContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function CardContent({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-content"
        className={cn("px-6", className)}
        {...props}
      />
    )
  }
)

const CardFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="card-footer"
        className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
        {...props}
      />
    )
  }
)

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

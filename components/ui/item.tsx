import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const ItemGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function ItemGroup({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      role="list"
      data-slot="item-group"
      className={cn("group/item-group flex flex-col touch-manipulation", className)}
      {...props}
    />
  )
})

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "group/item flex items-center border border-transparent text-sm rounded-md transition-colors motion-safe:duration-200 touch-manipulation [a]:hover:bg-accent/50 [a]:transition-colors flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50",
      },
      size: {
        default: "p-4 gap-4 ",
        sm: "py-3 px-4 gap-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Item = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & VariantProps<typeof itemVariants> & { asChild?: boolean }
>(function Item({ className, variant = "default", size = "default", asChild = false, ...props }, ref) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      ref={ref}
      role="listitem"
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size }), className)}
      {...props}
    />
  )
})

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const ItemMedia = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>
>(function ItemMedia({ className, variant = "default", ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant }), className)}
      {...props}
    />
  )
})

const ItemContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function ItemContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
})

const ItemTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function ItemTitle({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="item-title"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        className
      )}
      {...props}
    />
  )
})

const ItemDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(function ItemDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      data-slot="item-description"
      className={cn(
        "text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance tabular-nums",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
})

const ItemActions = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function ItemActions({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )}
)

const ItemHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function ItemHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
})

const ItemFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function ItemFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
})

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}

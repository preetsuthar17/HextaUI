"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { cn } from "@/lib/utils"

const Collapsible = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Root>,
  React.ComponentProps<typeof CollapsiblePrimitive.Root>
>(function Collapsible({ ...props }, ref) {
  return (
    <CollapsiblePrimitive.Root ref={ref} data-slot="collapsible" {...props} />
  )
})

const CollapsibleTrigger = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>
>(function CollapsibleTrigger({ className, ...props }, ref) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      ref={ref}
      data-slot="collapsible-trigger"
      className={cn("touch-manipulation", className)}
      type="button"
      {...props}
    />
  )
})

const CollapsibleContent = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>
>(function CollapsibleContent({ ...props }, ref) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      ref={ref}
      data-slot="collapsible-content"
      {...props}
    />
  )
})

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

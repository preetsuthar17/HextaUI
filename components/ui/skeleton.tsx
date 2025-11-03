import * as React from "react"
import { cn } from "@/lib/utils"

const Skeleton = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function Skeleton({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="skeleton"
        className={cn(
          "bg-accent animate-pulse motion-reduce:animate-none rounded-md",
          className
        )}
        aria-hidden="true"
        {...props}
      />
    )
  }
)

export { Skeleton }

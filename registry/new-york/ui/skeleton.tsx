import * as React from "react";
import { cn } from "@/lib/utils";

const Skeleton = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function Skeleton({ className, ...props }, ref) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "animate-pulse rounded-xl bg-accent motion-reduce:animate-none",
          className
        )}
        data-slot="skeleton"
        ref={ref}
        {...props}
      />
    );
  }
);

export { Skeleton };

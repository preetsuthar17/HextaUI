import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const Empty = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  function Empty({ className, ...props }, ref) {
    return (
      <div
        className={cn(
          "flex min-w-0 flex-1 touch-manipulation flex-col items-center justify-center gap-6 text-balance rounded-lg border-dashed p-6 text-center md:p-12",
          className
        )}
        data-slot="empty"
        ref={ref}
        {...props}
      />
    );
  }
);

const EmptyHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function EmptyHeader({ className, ...props }, ref) {
  return (
    <div
      className={cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        className
      )}
      data-slot="empty-header"
      ref={ref}
      {...props}
    />
  );
});

const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const EmptyMedia = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>
>(function EmptyMedia({ className, variant = "default", ...props }, ref) {
  return (
    <div
      className={cn(emptyMediaVariants({ variant }), className)}
      data-slot="empty-icon"
      data-variant={variant}
      ref={ref}
      {...props}
    />
  );
});

const EmptyTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function EmptyTitle({ className, ...props }, ref) {
  return (
    <div
      className={cn("font-medium text-lg tracking-tight", className)}
      data-slot="empty-title"
      ref={ref}
      {...props}
    />
  );
});

const EmptyDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"p">
>(function EmptyDescription({ className, ...props }, ref) {
  return (
    <div
      className={cn(
        "text-muted-foreground text-sm/relaxed tabular-nums [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      data-slot="empty-description"
      ref={ref}
      {...props}
    />
  );
});

const EmptyContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function EmptyContent({ className, ...props }, ref) {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm tabular-nums",
        className
      )}
      data-slot="empty-content"
      ref={ref}
      {...props}
    />
  );
});

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
};

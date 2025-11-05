import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 [&>svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type LivePoliteness = "polite" | "assertive" | false;

function Alert({
  className,
  variant,
  live = "polite",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & { live?: LivePoliteness }) {
  const liveAttributes =
    live === "assertive"
      ? ({
          role: "alert",
          "aria-live": "assertive",
          "aria-atomic": true,
        } as const)
      : live === "polite"
        ? ({
            role: "status",
            "aria-live": "polite",
            "aria-atomic": true,
          } as const)
        : ({} as const);
  return (
    <div
      data-slot="alert"
      {...liveAttributes}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      data-slot="alert-title"
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-muted-foreground text-sm [&_p]:leading-relaxed",
        className
      )}
      data-slot="alert-description"
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };

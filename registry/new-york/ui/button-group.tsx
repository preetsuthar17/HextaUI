import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const buttonGroupVariants = cva(
  "flex w-fit touch-manipulation items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

const ButtonGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>
>(function ButtonGroup({ className, orientation, ...props }, ref) {
  return (
    <div
      className={cn(buttonGroupVariants({ orientation }), className)}
      data-orientation={orientation}
      data-slot="button-group"
      ref={ref}
      role="group"
      {...props}
    />
  );
});

const ButtonGroupText = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(function ButtonGroupText({ className, asChild = false, ...props }, ref) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "flex min-h-9 touch-manipulation items-center gap-2 rounded-md border bg-muted px-4 font-medium text-sm shadow-xs focus-visible:rounded focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      className={cn(
        "relative m-0! self-stretch bg-input data-[orientation=vertical]:h-auto",
        className
      )}
      data-slot="button-group-separator"
      orientation={orientation}
      {...props}
    />
  );
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
};

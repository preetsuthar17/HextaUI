"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import * as React from "react";
import { cn } from "@/lib/utils";

type AspectRatioProps = React.ComponentProps<typeof AspectRatioPrimitive.Root>;

const AspectRatio = React.forwardRef<
  React.ComponentRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(function AspectRatio({ className, ...props }, ref) {
  return (
    <AspectRatioPrimitive.Root
      className={cn("touch-manipulation", className)}
      data-slot="aspect-ratio"
      ref={ref}
      {...props}
    />
  );
});

export { AspectRatio };

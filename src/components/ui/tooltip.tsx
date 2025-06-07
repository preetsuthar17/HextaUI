"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const tooltipVariants = cva(
  "z-50 overflow-hidden rounded-lg border border-[hsl(var(--hu-border))] bg-[hsl(var(--hu-card))] px-3 py-1.5 text-xs text-[hsl(var(--hu-card-foreground))] font-medium",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(var(--hu-card))] text-[hsl(var(--hu-card-foreground))]",
        dark: "bg-[hsl(var(--hu-foreground))] text-[hsl(var(--hu-background))] border-[hsl(var(--hu-foreground))]",
        light:
          "bg-[hsl(var(--hu-background))] text-[hsl(var(--hu-foreground))] border-[hsl(var(--hu-border))]",
        destructive:
          "bg-[hsl(var(--hu-destructive))] text-[hsl(var(--hu-primary-foreground))] border-[hsl(var(--hu-destructive))]",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipProvider = TooltipPrimitive.Provider;

interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipVariants> {}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, variant, size, sideOffset = 4, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <AnimatePresence>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn("relative", className)}
        onAnimationStart={() => setIsVisible(true)}
        onAnimationEnd={() => setIsVisible(false)}
        asChild
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 5 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.2,
          }}
          className={cn(tooltipVariants({ variant, size }), className)}
        >
          {props.children}
        </motion.div>
      </TooltipPrimitive.Content>
    </AnimatePresence>
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  tooltipVariants,
  type TooltipContentProps,
};

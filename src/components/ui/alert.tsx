"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { type LucideIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 text-sm transition-colors shadow-sm/2",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground",
        destructive:
          "border-destructive bg-destructive/10 text-destructive [&>svg]:text-destructive",
        warning:
          "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-200 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400",
        success:
          "border-green-200 bg-green-50 text-green-800 dark:border-green-700 dark:bg-green-950/30 dark:text-green-200 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-700 dark:bg-blue-950/30 dark:text-blue-200 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: LucideIcon;
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant,
      icon: Icon,
      title,
      dismissible,
      onDismiss,
      children,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleDismiss = () => {
      setIsVisible(false);
      setTimeout(() => {
        onDismiss?.();
      }, 150); // Match the exit animation duration
    };

    // Extract motion-conflicting props
    const {
      onDrag,
      onDragStart,
      onDragEnd,
      onAnimationStart,
      onAnimationEnd,
      onAnimationIteration,
      onTransitionEnd,
      ...motionProps
    } = props;

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={ref}
            className={cn(alertVariants({ variant }), className)}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="alert"
            {...motionProps}
          >
            <div className="flex">
              {Icon && (
                <div className="flex-shrink-0">
                  <Icon className="h-4 w-4 mt-0.5" />
                </div>
              )}
              <div className={cn("flex-1", Icon && "ms-3")}>
                {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
                <div
                  className={cn("text-sm", title && "text-muted-foreground")}
                >
                  {children}
                </div>
              </div>
              {dismissible && (
                <div className="flex-shrink-0 ms-3">
                  <button
                    type="button"
                    className="inline-flex rounded-md p-1.5 transition-colors hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
                    onClick={handleDismiss}
                    aria-label="Dismiss alert"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);

Alert.displayName = "Alert";

export { Alert, alertVariants };

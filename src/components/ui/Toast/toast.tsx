"use client";

import * as React from "react";
import { Toaster as Sonner } from "sonner";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toastVariants = cva(
  "group toast group-[.toaster]:bg-[hsl(var(--hu-card))] group-[.toaster]:text-[hsl(var(--hu-foreground))] group-[.toaster]:border-[hsl(var(--hu-border))] group-[.toaster]:rounded-xl",
  {
    variants: {
      variant: {
        default: "group-[.toaster]:border-[hsl(var(--hu-border))]",
        destructive:
          "group-[.toaster]:border-[hsl(var(--hu-destructive))] group-[.toaster]:text-[hsl(var(--hu-destructive))] group-[.toaster]:bg-[hsl(var(--hu-destructive))]/5",
        success:
          "group-[.toaster]:border-green-500 group-[.toaster]:text-green-600 group-[.toaster]:bg-green-50 dark:group-[.toaster]:bg-green-950/20",
        warning:
          "group-[.toaster]:border-yellow-500 group-[.toaster]:text-yellow-600 group-[.toaster]:bg-yellow-50 dark:group-[.toaster]:bg-yellow-950/20",
        info: "group-[.toaster]:border-blue-500 group-[.toaster]:text-blue-600 group-[.toaster]:bg-blue-50 dark:group-[.toaster]:bg-blue-950/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[hsl(var(--hu-card))] group-[.toaster]:text-[hsl(var(--hu-foreground))] group-[.toaster]:border-[hsl(var(--hu-border))] group-[.toaster]:rounded-xl group-[.toaster]:p-4",
          description:
            "group-[.toast]:text-[hsl(var(--hu-muted-foreground))] group-[.toast]:text-sm",
          actionButton:
            "group-[.toast]:bg-[hsl(var(--hu-primary))] group-[.toast]:text-[hsl(var(--hu-primary-foreground))] group-[.toast]:rounded-xl group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-xs group-[.toast]:font-medium group-[.toast]:transition-colors group-[.toast]:hover:bg-[hsl(var(--hu-primary))]/90",
          cancelButton:
            "group-[.toast]:bg-[hsl(var(--hu-accent))] group-[.toast]:text-[hsl(var(--hu-accent-foreground))] group-[.toast]:rounded-xl group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-xs group-[.toast]:font-medium group-[.toast]:transition-colors group-[.toast]:hover:bg-[hsl(var(--hu-accent))]/80",
          closeButton:
            "group-[.toast]:bg-transparent group-[.toast]:border-0 group-[.toast]:text-[hsl(var(--hu-muted-foreground))] group-[.toast]:hover:text-[hsl(var(--hu-foreground))] group-[.toast]:hover:bg-[hsl(var(--hu-accent))] group-[.toast]:rounded-xl group-[.toast]:w-6 group-[.toast]:h-6 group-[.toast]:flex group-[.toast]:items-center group-[.toast]:justify-center",
          title: "group-[.toast]:text-sm group-[.toast]:font-semibold",
          success:
            "group-[.toaster]:border-green-500 group-[.toaster]:text-green-600 group-[.toaster]:bg-green-50 dark:group-[.toaster]:bg-green-950/20 dark:group-[.toaster]:text-green-400",
          error:
            "group-[.toaster]:border-[hsl(var(--hu-destructive))] group-[.toaster]:text-[hsl(var(--hu-destructive))] group-[.toaster]:bg-[hsl(var(--hu-destructive))]/5",
          warning:
            "group-[.toaster]:border-yellow-500 group-[.toaster]:text-yellow-600 group-[.toaster]:bg-yellow-50 dark:group-[.toaster]:bg-yellow-950/20 dark:group-[.toaster]:text-yellow-400",
          info: "group-[.toaster]:border-blue-500 group-[.toaster]:text-blue-600 group-[.toaster]:bg-blue-50 dark:group-[.toaster]:bg-blue-950/20 dark:group-[.toaster]:text-blue-400",
          loading:
            "group-[.toaster]:border-[hsl(var(--hu-border))] group-[.toaster]:text-[hsl(var(--hu-muted-foreground))]",
        },
      }}
      {...props}
    />
  );
};

export interface ToastProps extends VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick?: () => void;
  };
  duration?: number;
  id?: string | number;
}

export { Toaster, toastVariants };
export type { ToasterProps };

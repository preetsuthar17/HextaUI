"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const accordionVariants = cva("w-full max-w-xl", {
  variants: {
    variant: {
      default: "border border-border rounded-card overflow-hidden shadow-sm/2",
      ghost: "",
      outline: "border border-border rounded-card shadow-sm/2",
    },
    size: {
      sm: "text-sm max-w-lg",
      default: "max-w-2xl",
      lg: "text-lg max-w-4xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const accordionItemVariants = cva("border-b border-border last:border-b-0", {
  variants: {
    variant: {
      default: "",
      ghost: "border-b border-border last:border-b-0 mb-2 last:mb-0",
      outline: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const accordionTriggerVariants = cva(
  "flex flex-1 items-center justify-between py-4 px-6 text-start font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group",
  {
    variants: {
      variant: {
        default: "",
        ghost: "px-0",
        outline: "",
      },
      size: {
        sm: "py-3 px-4 text-sm",
        default: "py-4 px-6",
        lg: "py-5 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const accordionContentVariants = cva("px-6 pb-4 pt-0 text-muted-foreground", {
  variants: {
    variant: {
      default: "",
      ghost: "px-0",
      outline: "",
    },
    size: {
      sm: "px-4 pb-3 text-sm",
      default: "px-6 pb-4",
      lg: "px-6 pb-5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface AccordionProps extends VariantProps<typeof accordionVariants> {
  className?: string;
  children?: React.ReactNode;
}

// Single accordion props
export interface AccordionSingleProps extends AccordionProps {
  type: "single";
  collapsible?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

// Multiple accordion props
export interface AccordionMultipleProps extends AccordionProps {
  type: "multiple";
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

export type AccordionCombinedProps =
  | AccordionSingleProps
  | AccordionMultipleProps;

export interface AccordionItemProps
  extends VariantProps<typeof accordionItemVariants> {
  value: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface AccordionTriggerProps
  extends VariantProps<typeof accordionTriggerVariants> {
  icon?: React.ReactNode;
  hideChevron?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export interface AccordionContentProps
  extends VariantProps<typeof accordionContentVariants> {
  className?: string;
  children?: React.ReactNode;
}

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionCombinedProps
>(({ className, variant, size, children, ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    className={cn(accordionVariants({ variant, size }), className)}
    {...props}
  >
    {children}
  </AccordionPrimitive.Root>
));
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant, children, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(accordionItemVariants({ variant }), className)}
    {...props}
  >
    {children}
  </AccordionPrimitive.Item>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(
  (
    { className, children, variant, size, icon, hideChevron = false, ...props },
    ref,
  ) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(accordionTriggerVariants({ variant, size }), className)}
        {...props}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="shrink-0">{icon}</span>}
          <span className="text-start group-hover:underline transition-all duration-200">
            {children}
          </span>
        </div>
        {!hideChevron && (
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180" />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ),
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, variant, size, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn(accordionContentVariants({ variant, size }), className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

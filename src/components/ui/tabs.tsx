"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useDirection } from "@radix-ui/react-direction";

const tabsVariants = cva(
  "relative inline-flex items-center justify-center rounded-lg transition-all duration-300 w-full",
  {
    variants: {
      variant: {
        default: "bg-background border border-border",
        ghost: "bg-transparent",
        underline: "bg-transparent border-b border-border rounded-none",
      },
      size: {
        sm: "h-9 p-1",
        default: "h-10 p-1.5",
        lg: "h-12 p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const tabTriggerVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1",
  {
    variants: {
      variant: {
        default:
          "text-muted-foreground hover:text-foreground data-[state=active]:text-primary-foreground",
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-accent data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent",
        underline:
          "text-muted-foreground hover:text-foreground data-[state=active]:text-accent-foreground rounded-none",
      },
      size: {
        sm: "px-2.5 py-1 text-xs",
        default: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface TabItem {
  id: string;
  label?: string;
  icon?: React.ReactNode;
}

export interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsVariants> {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  indicatorColor?: string;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      variant,
      size,
      items,
      defaultValue,
      value,
      onValueChange,
      indicatorColor = "hsl(var(--hu-accent))",
      ...props
    },
    ref,
  ) => {
    const dir = useDirection();
    const [activeValue, setActiveValue] = React.useState(
      value || defaultValue || items[0]?.id,
    );
    const [activeTabBounds, setActiveTabBounds] = React.useState({
      start: 0,
      width: 0,
    });

    const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

    React.useEffect(() => {
      if (value !== undefined) {
        setActiveValue(value);
      }
    }, [value]);

    React.useEffect(() => {
      const activeIndex = items.findIndex(
        (item: TabItem) => item.id === activeValue,
      );
      const activeTab = tabRefs.current[activeIndex];

      if (activeTab) {
        const tabRect = activeTab.getBoundingClientRect();
        const containerRect = activeTab.parentElement?.getBoundingClientRect();

        if (containerRect) {
          setActiveTabBounds({
            start:
              dir === "ltr"
                ? tabRect.left - containerRect.left
                : containerRect.right - tabRect.right,
            width: tabRect.width,
          });
        }
      }
    }, [activeValue, items, dir]);

    const handleTabClick = (tabId: string) => {
      setActiveValue(tabId);
      onValueChange?.(tabId);
    };

    const animate = {
      left: dir === "ltr" ? activeTabBounds.start : "unset",
      right: dir === "ltr" ? "unset" : activeTabBounds.start,
      width: activeTabBounds.width,
    };

    return (
      <div
        ref={ref}
        className={cn(tabsVariants({ variant, size }), className)}
        {...props}
      >
        {" "}
        {/* Animated indicator */}
        <motion.div
          className={cn(
            "absolute z-10",
            variant === "underline"
              ? "bottom-0 h-0.5 rounded-none"
              : "top-1 bottom-1 rounded-md",
          )}
          style={{
            backgroundColor:
              variant === "underline"
                ? "hsl(var(--hu-foreground))"
                : indicatorColor,
          }}
          initial={false}
          animate={animate}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
        {/* Tab triggers */}
        {items.map((item: TabItem, index: number) => {
          const isActive = activeValue === item.id;

          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              className={cn(
                tabTriggerVariants({ variant, size }),
                "relative z-20 text-muted-foreground data-[state=active]:text-accent-foreground gap-2",
              )}
              data-state={isActive ? "active" : "inactive"}
              onClick={() => handleTabClick(item.id)}
              type="button"
            >
              {item.icon && <span className="[&_svg]:size-4">{item.icon}</span>}
              {item.label}
            </button>
          );
        })}
      </div>
    );
  },
);

Tabs.displayName = "Tabs";

// Content component for tab panels
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  activeValue?: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, activeValue, children, ...props }, ref) => {
    const isActive = value === activeValue;

    if (!isActive) return null;

    const {
      onDrag,
      onDragStart,
      onDragEnd,
      onAnimationStart,
      onAnimationEnd,
      onTransitionEnd,
      ...divProps
    } = props;

    return (
      <motion.div
        ref={ref}
        className={cn(
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
        )}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        {...divProps}
      >
        {children}
      </motion.div>
    );
  },
);

TabsContent.displayName = "TabsContent";

export { Tabs, TabsContent, tabsVariants };

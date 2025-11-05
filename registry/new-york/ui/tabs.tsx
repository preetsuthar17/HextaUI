"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "@/lib/utils";

const Tabs = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Root>,
  React.ComponentProps<typeof TabsPrimitive.Root>
>(function Tabs({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Root
      className={cn("flex flex-col gap-2", className)}
      data-slot="tabs"
      ref={ref}
      {...props}
    />
  );
});

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentProps<typeof TabsPrimitive.List>
>(function TabsList({ className, ...props }, ref) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex h-9 w-fit touch-manipulation items-center justify-center rounded-lg bg-muted p-[3px] text-muted-foreground",
        className
      )}
      data-slot="tabs-list"
      ref={ref}
      {...props}
    />
  );
});

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentProps<typeof TabsPrimitive.Trigger>
>(function TabsTrigger({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Trigger
      aria-disabled={(props as any).disabled ? true : undefined}
      className={cn(
        "inline-flex h-[calc(100%-1px)] flex-1 touch-manipulation items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-2 py-1 font-medium text-foreground text-sm transition-[color,box-shadow] focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:shadow-sm dark:text-muted-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-slot="tabs-trigger"
      ref={ref}
      type="button"
      {...props}
    />
  );
});

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentProps<typeof TabsPrimitive.Content>
>(function TabsContent({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Content
      className={cn("flex-1 outline-none", className)}
      data-slot="tabs-content"
      ref={ref}
      {...props}
    />
  );
});

export { Tabs, TabsList, TabsTrigger, TabsContent };

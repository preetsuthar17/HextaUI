"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronRight, Circle, type LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Kbd } from "../kbd";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

// Motion wrapper for animations
const MotionContent = React.forwardRef<
  React.ElementRef<typeof motion.div>,
  React.ComponentPropsWithoutRef<typeof motion.div>
>(({ children, ...props }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, scale: 0.95, y: -8 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: -8 }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 25,
      duration: 0.2,
    }}
    {...props}
  >
    {children}
  </motion.div>
));
MotionContent.displayName = "MotionContent";

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
    icon?: LucideIcon;
  }
>(({ className, inset, children, icon: Icon, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default gap-2 select-none items-center rounded-lg px-3 py-2.5 sm:py-2 text-sm outline-none transition-colors touch-manipulation",
      "hover:bg-[hsl(var(--hu-accent))] hover:text-[hsl(var(--hu-accent-foreground))]",
      "focus:bg-[hsl(var(--hu-accent))] focus:text-[hsl(var(--hu-accent-foreground))]",
      "data-[state=open]:bg-[hsl(var(--hu-accent))] data-[state=open]:text-[hsl(var(--hu-accent-foreground))]",
      "active:bg-[hsl(var(--hu-accent))] active:text-[hsl(var(--hu-accent-foreground))]",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    <motion.div
      className="flex text-sm w-full items-center gap-2"
      whileHover={{ x: 2 }}
      transition={{ duration: 0.1 }}
    >
      {Icon && <Icon size={16} className="shrink-0" />}
      <span className="flex-1">{children}</span>
      <ChevronRight className="ml-auto h-4 w-4" />
    </motion.div>
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] max-w-[95vw] sm:max-w-[280px] overflow-hidden rounded-[var(--radius)] border border-[hsl(var(--hu-border))] bg-[hsl(var(--hu-background))] p-1 text-[hsl(var(--hu-foreground))] shadow-lg",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] max-w-[95vw] sm:max-w-[350px] overflow-hidden rounded-[var(--radius)] border border-[hsl(var(--hu-border))] bg-[hsl(var(--hu-background))] p-1 text-[hsl(var(--hu-foreground))] shadow-xl",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const dropdownMenuItemVariants = cva(
  "relative flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-2.5 sm:py-2 text-sm outline-none transition-colors touch-manipulation",
  {
    variants: {
      variant: {
        default:
          "hover:bg-[hsl(var(--hu-accent))] hover:text-[hsl(var(--hu-accent-foreground))] focus:bg-[hsl(var(--hu-accent))] focus:text-[hsl(var(--hu-accent-foreground))] active:bg-[hsl(var(--hu-accent))] active:text-[hsl(var(--hu-accent-foreground))]",
        destructive:
          "text-[hsl(var(--hu-destructive))] hover:bg-[hsl(var(--hu-destructive))] hover:text-[hsl(var(--hu-destructive-foreground))] focus:bg-[hsl(var(--hu-destructive))] focus:text-[hsl(var(--hu-destructive-foreground))] active:bg-[hsl(var(--hu-destructive))] active:text-[hsl(var(--hu-destructive-foreground))]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    icon?: LucideIcon;
    shortcut?: string;
  } & VariantProps<typeof dropdownMenuItemVariants>
>(
  (
    { className, variant, inset, icon: Icon, shortcut, children, ...props },
    ref,
  ) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        dropdownMenuItemVariants({ variant }),
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        inset && "pl-8",
        className,
      )}
      {...props}
    >
      <motion.div
        className="flex text-sm w-full items-center gap-2"
        whileHover={{ x: 2 }}
        transition={{ duration: 0.1 }}
      >
        {Icon && <Icon size={16} className="shrink-0" />}
        <span className="flex-1 text-sm">{children}</span>
        {shortcut && (
          <Kbd size="xs" className="ml-auto text-xs tracking-widest opacity-60">
            {shortcut}
          </Kbd>
        )}
      </motion.div>
    </DropdownMenuPrimitive.Item>
  ),
);
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & {
    icon?: LucideIcon;
  }
>(({ className, children, checked, icon: Icon, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-lg py-2.5 sm:py-2 pl-8 pr-3 text-sm outline-none transition-colors touch-manipulation",
      "hover:bg-[hsl(var(--hu-accent))] hover:text-[hsl(var(--hu-accent-foreground))]",
      "focus:bg-[hsl(var(--hu-accent))] focus:text-[hsl(var(--hu-accent-foreground))]",
      "active:bg-[hsl(var(--hu-accent))] active:text-[hsl(var(--hu-accent-foreground))]",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
        >
          <Check className="h-4 w-4" />
        </motion.div>
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    <motion.div
      className="flex text-sm w-full items-center gap-2"
      whileHover={{ x: 2 }}
      transition={{ duration: 0.1 }}
    >
      {Icon && <Icon size={16} className="shrink-0" />}
      {children}
    </motion.div>
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> & {
    icon?: LucideIcon;
  }
>(({ className, children, icon: Icon, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-lg py-2.5 sm:py-2 pl-8 pr-3 text-sm outline-none transition-colors touch-manipulation",
      "hover:bg-[hsl(var(--hu-accent))] hover:text-[hsl(var(--hu-accent-foreground))]",
      "focus:bg-[hsl(var(--hu-accent))] focus:text-[hsl(var(--hu-accent-foreground))]",
      "active:bg-[hsl(var(--hu-accent))] active:text-[hsl(var(--hu-accent-foreground))]",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
        >
          <Circle className="h-2 w-2 fill-current" />
        </motion.div>
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    <motion.div
      className="flex text-sm w-full items-center gap-2"
      whileHover={{ x: 2 }}
      transition={{ duration: 0.1 }}
    >
      {Icon && <Icon size={16} className="shrink-0" />}
      {children}
    </motion.div>
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
    icon?: LucideIcon;
  }
>(({ className, inset, icon: Icon, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-3 py-1.5 text-sm font-semibold text-[hsl(var(--hu-muted-foreground))] flex items-center gap-2",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {Icon && <Icon size={16} className="shrink-0" />}
    {children}
  </DropdownMenuPrimitive.Label>
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-[hsl(var(--hu-border))]", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  dropdownMenuItemVariants,
};

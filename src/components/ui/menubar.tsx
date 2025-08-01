"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { type LucideIcon } from "lucide-react";

const menubarVariants = cva(
  "flex items-center rounded-card border border-border bg-background transition-all overflow-x-auto scrollbar-hide w-full max-w-full shadow-sm/2",
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        outline: "border-2 border-border bg-background",
        ghost: "border-transparent bg-transparent shadow-none",
      },
      size: {
        sm: "p-1.5 gap-1 sm:p-2 sm:gap-1",
        default: "p-1.5 gap-1.5 sm:p-2 sm:gap-2",
        lg: "p-2 gap-2 sm:p-2 sm:gap-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const menubarTriggerVariants = cva(
  "flex cursor-default select-none items-center rounded-[calc(var(--card-radius)-5px)] outline-none transition-all touch-manipulation focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "text-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground active:bg-accent active:text-accent-foreground",
        ghost:
          "text-foreground hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent/50 focus:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground",
      },
      size: {
        sm: "px-2.5 py-1.5 text-xs gap-1 min-h-[2rem] [&_svg]:size-3 sm:px-3 sm:py-2 sm:text-sm sm:gap-1.5 sm:[&_svg]:size-4",
        default:
          "px-3 py-2 text-sm gap-1.5 min-h-[2.5rem] [&_svg]:size-4 sm:px-4 sm:py-2.5 sm:gap-2",
        lg: "px-4 py-2.5 text-sm gap-2 min-h-[3rem] [&_svg]:size-4 sm:px-5 sm:py-3 sm:text-base sm:gap-2.5 sm:[&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const menubarContentVariants = cva(
  "z-50 min-w-[12rem] max-w-[95vw] sm:max-w-[350px] overflow-hidden rounded-card border border-border bg-background p-1.5 sm:p-2 text-foreground shadow-xl mt-2",
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        accent: "bg-accent text-accent-foreground border-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const menubarItemVariants = cva(
  "relative flex cursor-default select-none items-center gap-2 rounded-[calc(var(--card-radius)-5px)] px-2.5 py-2 sm:px-3 sm:py-2.5 text-sm outline-none transition-all touch-manipulation focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 min-h-[44px] sm:min-h-auto",
  {
    variants: {
      variant: {
        default:
          "text-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground active:bg-accent active:text-accent-foreground",
        destructive:
          "text-destructive hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground active:bg-destructive active:text-destructive-foreground",
      },
      inset: {
        true: "ps-6 sm:ps-8",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      inset: false,
    },
  },
);

interface MenuBarProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>,
    VariantProps<typeof menubarVariants> {
  /**
   * Enable mobile-responsive mode
   * @default false
   */
  responsive?: boolean;
}

interface MenuBarTriggerProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>,
    VariantProps<typeof menubarTriggerVariants> {
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

interface MenuBarContentProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>,
    VariantProps<typeof menubarContentVariants> {}

interface MenuBarItemProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item>,
    VariantProps<typeof menubarItemVariants> {
  icon?: LucideIcon;
  shortcut?: string;
}

const MenuBar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  MenuBarProps
>(({ className, variant, size, responsive = false, ...props }, ref) => (
  <div className={responsive ? "w-full overflow-x-auto scrollbar-hide" : ""}>
    <MenubarPrimitive.Root
      ref={ref}
      className={cn(
        menubarVariants({ variant, size }),
        responsive && "min-w-max",
        className,
      )}
      {...props}
    />
  </div>
));
MenuBar.displayName = "MenuBar";

const MenuBarMenu = MenubarPrimitive.Menu;

const MenuBarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  MenuBarTriggerProps
>(
  (
    {
      className,
      variant,
      size,
      icon: Icon,
      iconPosition = "left",
      children,
      ...props
    },
    ref,
  ) => {
    // Responsive icon sizes
    const iconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;
    const mobileIconSize = size === "sm" ? 12 : size === "lg" ? 16 : 14;

    return (
      <MenubarPrimitive.Trigger
        ref={ref}
        className={cn(menubarTriggerVariants({ variant, size }), className)}
        asChild
        {...props}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.1,
          }}
          className="flex items-center gap-1.5 sm:gap-2"
        >
          {Icon && iconPosition === "left" && (
            <motion.div
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.15 }}
            >
              <Icon size={iconSize} className="shrink-0 hidden sm:block" />
              <Icon
                size={mobileIconSize}
                className="shrink-0 block sm:hidden"
              />
            </motion.div>
          )}
          <span className="truncate">{children}</span>
          {Icon && iconPosition === "right" && (
            <motion.div
              whileHover={{ rotate: -5 }}
              transition={{ duration: 0.15 }}
            >
              <Icon size={iconSize} className="shrink-0 hidden sm:block" />
              <Icon
                size={mobileIconSize}
                className="shrink-0 block sm:hidden"
              />
            </motion.div>
          )}
        </motion.button>
      </MenubarPrimitive.Trigger>
    );
  },
);
MenuBarTrigger.displayName = "MenuBarTrigger";

const MenuBarSub = MenubarPrimitive.Sub;

const MenuBarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
    icon?: LucideIcon;
  }
>(({ className, inset, icon: Icon, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-ele px-2.5 py-2 sm:px-3 sm:py-2.5 text-sm outline-none transition-all touch-manipulation focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground active:bg-accent active:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 min-h-[44px] sm:min-h-auto",
      inset && "ps-6 sm:ps-8",
      className,
    )}
    {...props}
  >
    <motion.div
      className="flex text-sm w-full items-center gap-1.5 sm:gap-2"
      whileHover={{ x: 2 }}
      transition={{ duration: 0.1 }}
    >
      {Icon && (
        <>
          <Icon size={14} className="shrink-0 block sm:hidden" />
          <Icon size={16} className="shrink-0 hidden sm:block" />
        </>
      )}
      <span className="flex-1 truncate">{children}</span>
      <svg
        className="ms-auto h-3.5 w-3.5 sm:h-4 sm:w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </motion.div>
  </MenubarPrimitive.SubTrigger>
));
MenuBarSubTrigger.displayName = "MenuBarSubTrigger";

const MenuBarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[10rem] max-w-[95vw] sm:max-w-[280px] overflow-hidden rounded-ele border border-border bg-background p-1.5 sm:p-2 text-foreground shadow-xl ",
      className,
    )}
    asChild
    {...props}
  >
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
        x: -8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
        x: -8,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.8,
        duration: 0.15,
      }}
    >
      {props.children}
    </motion.div>
  </MenubarPrimitive.SubContent>
));
MenuBarSubContent.displayName = "MenuBarSubContent";

const MenuBarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  MenuBarContentProps
>(
  (
    {
      className,
      variant,
      align = "start",
      alignOffset = -4,
      sideOffset = 8,
      ...props
    },
    ref,
  ) => (
    <AnimatePresence>
      <MenubarPrimitive.Portal>
        <MenubarPrimitive.Content
          ref={ref}
          align={align}
          alignOffset={alignOffset}
          sideOffset={sideOffset}
          className={cn(menubarContentVariants({ variant }), className)}
          asChild
          {...props}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: -8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: -8,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.8,
              duration: 0.2,
            }}
          >
            {props.children}
          </motion.div>
        </MenubarPrimitive.Content>
      </MenubarPrimitive.Portal>
    </AnimatePresence>
  ),
);
MenuBarContent.displayName = "MenuBarContent";

const MenuBarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  MenuBarItemProps
>(
  (
    { className, variant, inset, icon: Icon, shortcut, children, ...props },
    ref,
  ) => (
    <MenubarPrimitive.Item
      ref={ref}
      className={cn(menubarItemVariants({ variant, inset }), className)}
      asChild
      {...props}
    >
      <motion.div
        whileHover={{
          scale: 1.02,
          x: 2,
        }}
        whileTap={{
          scale: 0.98,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          duration: 0.1,
        }}
        className="flex items-center gap-1.5 sm:gap-2 w-full"
      >
        {Icon && (
          <>
            <Icon size={14} className="shrink-0 block sm:hidden" />
            <Icon size={16} className="shrink-0 hidden sm:block" />
          </>
        )}
        <span className="flex-1 truncate">{children}</span>
        {shortcut && (
          <motion.span
            className="ms-auto text-xs tracking-widest text-muted-foreground font-mono hidden sm:inline"
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            {shortcut}
          </motion.span>
        )}
      </motion.div>
    </MenubarPrimitive.Item>
  ),
);
MenuBarItem.displayName = "MenuBarItem";

const MenuBarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("my-2 h-px bg-border mx-1", className)}
    {...props}
  />
));
MenuBarSeparator.displayName = "MenuBarSeparator";

// Animation variants for staggered menu items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

// Animated container for menu items
const AnimatedMenuContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={className}
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    style={props.style}
  >
    {React.Children.map(children, (child, index) => (
      <motion.div key={index} variants={itemVariants}>
        {child}
      </motion.div>
    ))}
  </motion.div>
));
AnimatedMenuContainer.displayName = "AnimatedMenuContainer";

export {
  MenuBar,
  MenuBarMenu,
  MenuBarTrigger,
  MenuBarContent,
  MenuBarItem,
  MenuBarSeparator,
  MenuBarSub,
  MenuBarSubTrigger,
  MenuBarSubContent,
  menubarVariants,
  menubarTriggerVariants,
  menubarContentVariants,
  menubarItemVariants,
  AnimatedMenuContainer,
};

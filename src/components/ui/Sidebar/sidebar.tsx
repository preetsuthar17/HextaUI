"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useDirection } from "@radix-ui/react-direction";

const sidebarVariants = cva(
  "z-40 bg-background border-e border-border flex flex-col",
  {
    variants: {
      variant: {
        default: "bg-background",
        elevated: "bg-card ",
        ghost: "bg-background/95 backdrop-blur-sm",
      },
      size: {
        sm: "w-12",
        default: "w-64",
        lg: "w-72",
        xl: "w-80",
      },
      position: {
        fixed: "fixed top-0 start-0 h-screen",
        relative: "relative h-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      position: "fixed",
    },
  },
);

const sidebarHeaderVariants = cva(
  "flex items-center border-b border-border min-h-[3.5rem]",
  {
    variants: {
      collapsed: {
        true: "justify-center px-2",
        false: "justify-between px-4",
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  },
);

const sidebarItemVariants = cva(
  "relative flex items-center rounded-ele text-sm font-medium cursor-pointer group",
  {
    variants: {
      variant: {
        default: "text-muted-foreground hover:text-foreground hover:bg-accent",
        active: "text-primary-foreground bg-primary hover:bg-primary/90",
        ghost: "text-muted-foreground hover:text-foreground hover:bg-accent/50",
      },
      collapsed: {
        true: "w-10 h-10 justify-center px-0 py-0",
        false: "px-3 py-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      collapsed: false,
    },
  },
);

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  collapsible?: boolean;
  overlay?: boolean;
  onOverlayClick?: () => void;
  position?: "fixed" | "relative";
  children: React.ReactNode;
}

const SidebarContext = React.createContext<{
  collapsed: boolean;
  activeItem?: string;
  onItemClick?: (item: { id: string; label: string; href?: string }) => void;
  sidebarId: string;
}>({
  collapsed: false,
  sidebarId: "",
});

const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a Sidebar");
  }
  return context;
};

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      position = "fixed",
      collapsed: controlledCollapsed,
      onCollapsedChange,
      collapsible = true,
      overlay = false,
      onOverlayClick,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalCollapsed, setInternalCollapsed] = React.useState(false);
    const [activeItem, setActiveItem] = React.useState<string>();
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const sidebarId = React.useId();

    const collapsed = controlledCollapsed ?? internalCollapsed;

    React.useImperativeHandle(ref, () => sidebarRef.current!);

    const handleToggleCollapse = () => {
      const newCollapsed = !collapsed;
      if (onCollapsedChange) {
        onCollapsedChange(newCollapsed);
      } else {
        setInternalCollapsed(newCollapsed);
      }
    };

    const handleItemClick = (item: {
      id: string;
      label: string;
      href?: string;
    }) => {
      setActiveItem(item.id);
    };

    // Auto-collapse on mobile
    React.useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 768 && !collapsed) {
          handleToggleCollapse();
        }
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, [collapsed]);

    // Keyboard navigation support
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && overlay && !collapsed) {
          onOverlayClick?.();
        }
      };

      if (overlay) {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
      }
    }, [overlay, collapsed, onOverlayClick]);

    // Focus management for better keyboard navigation accessibility
    const focusableElementsRef = React.useRef<HTMLElement[]>([]);

    React.useEffect(() => {
      // Update focusable elements when sidebar state changes
      const updateFocusableElements = () => {
        if (sidebarRef.current) {
          const elements = sidebarRef.current.querySelectorAll(
            'button, a, [tabindex]:not([tabindex="-1"])',
          ) as NodeListOf<HTMLElement>;
          focusableElementsRef.current = Array.from(elements);
        }
      };

      updateFocusableElements();

      // Re-scan when collapsed state changes
      const timeoutId = setTimeout(updateFocusableElements, 300);
      return () => clearTimeout(timeoutId);
    }, [collapsed]);

    // Extract header, body and footer from children
    const headerChild = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === SidebarHeader,
    );
    const bodyChild = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === SidebarBody,
    );
    const footerChild = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === SidebarFooter,
    );

    const sidebarContent = (
      <SidebarContext.Provider
        value={{
          collapsed,
          activeItem,
          onItemClick: handleItemClick,
          sidebarId,
        }}
      >
        {" "}
        <motion.aside
          ref={(node) => {
            const divNode = node as HTMLDivElement | null;
            if (typeof ref === "function") {
              ref(divNode);
            } else if (ref) {
              ref.current = divNode;
            }
            sidebarRef.current = divNode;
          }}
          className={cn(
            sidebarVariants({
              variant,
              size: collapsed ? "sm" : size,
              position,
            }),
            className,
          )}
          initial={false}
          animate={{
            width: collapsed
              ? 57
              : size === "lg"
                ? 288
                : size === "xl"
                  ? 320
                  : 256,
          }}
          transition={{
            duration: 0.25,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={props.style}
          id={props.id || sidebarId}
          role="complementary"
          aria-label={
            collapsed ? "Collapsed navigation sidebar" : "Navigation sidebar"
          }
          aria-expanded={!collapsed}
          aria-hidden={overlay && collapsed}
        >
          {/* Header */}
          {(headerChild || collapsible) && (
            <div className={cn(sidebarHeaderVariants({ collapsed }))}>
              {collapsed ? (
                // Show only toggle button when collapsed
                collapsible && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleToggleCollapse}
                    className="h-8 w-8 shrink-0"
                    aria-label="Expand sidebar"
                    aria-controls={sidebarId}
                    aria-expanded={false}
                  >
                    <ChevronRight className="rtl:-scale-x-100" size={16} />
                  </Button>
                )
              ) : (
                // Show header content and toggle button when expanded
                <>
                  <AnimatePresence mode="wait">
                    {headerChild && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex-1"
                      >
                        {headerChild}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {collapsible && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleToggleCollapse}
                      className="h-8 w-8 shrink-0"
                      aria-label="Collapse sidebar"
                      aria-controls={sidebarId}
                      aria-expanded={true}
                    >
                      <ChevronLeft className="rtl:-scale-x-100" size={16} />
                    </Button>
                  )}
                </>
              )}
            </div>
          )}

          {/* Body */}
          {bodyChild}

          {/* Footer */}
          {footerChild && (
            <div
              className={cn(
                "border-t border-border",
                collapsed ? "p-2" : "p-3",
              )}
            >
              {footerChild}
            </div>
          )}
        </motion.aside>
      </SidebarContext.Provider>
    );
    if (overlay) {
      return (
        <>
          {/* Overlay */}
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-30 bg-black/50 md:hidden"
                onClick={onOverlayClick}
                role="presentation"
                aria-hidden="true"
              />
            )}
          </AnimatePresence>
          {sidebarContent}
        </>
      );
    }

    return sidebarContent;
  },
);

Sidebar.displayName = "Sidebar";

// SidebarBody component
interface SidebarBodyProps {
  children: React.ReactNode;
  className?: string;
}

const SidebarBody: React.FC<SidebarBodyProps> = ({ children, className }) => {
  const { collapsed } = useSidebar();

  return (
    <ScrollArea
      className={cn("flex-1 py-2", collapsed ? "px-2" : "px-2", className)}
    >
      <nav role="navigation" aria-label="Main navigation">
        <ul className="space-y-1 list-none" role="list">
          {children}
        </ul>
      </nav>
    </ScrollArea>
  );
};

// SidebarItem component
interface SidebarItemProps {
  id: string;
  label: string;
  icon?: LucideIcon;
  href?: string;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  level?: number;
  onClick?: () => void;
  className?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  id,
  label,
  icon: Icon,
  href,
  badge,
  children,
  level = 0,
  onClick,
  className,
}) => {
  const { collapsed, activeItem, onItemClick } = useSidebar();
  const [expanded, setExpanded] = React.useState(false);
  const isActive = activeItem === id;
  const hasChildren = React.Children.count(children) > 0;
  const itemId = React.useId();

  const handleClick = () => {
    if (hasChildren && !collapsed) {
      setExpanded(!expanded);
    }
    onItemClick?.({ id, label, href });
    onClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    } else if (
      e.key === "ArrowRight" &&
      hasChildren &&
      !expanded &&
      !collapsed
    ) {
      e.preventDefault();
      setExpanded(true);
    } else if (e.key === "ArrowLeft" && hasChildren && expanded && !collapsed) {
      e.preventDefault();
      setExpanded(false);
    }
  };

  const ItemContent = (
    <>
      {/* Static icon positioned always in the center-left area */}
      <div
        className={cn(
          "flex items-center justify-center shrink-0",
          collapsed ? "w-10 h-10" : "w-4 h-4 ms-0",
        )}
        aria-hidden="true"
      >
        {Icon && <Icon size={16} />}
      </div>

      {/* Text - simple conditional rendering, no animation */}
      {!collapsed && <span className="ms-3 truncate flex-1">{label}</span>}

      {/* Badge and chevron */}
      {!collapsed && (badge || hasChildren) && (
        <div className="flex items-center gap-2 ms-2">
          {badge}
          {hasChildren && (
            <ChevronRight
              size={14}
              className={cn(
                "shrink-0 transition-transform duration-200 rtl:-scale-x-100",
                expanded && "rotate-90",
              )}
              aria-hidden="true"
            />
          )}
        </div>
      )}

      {/* Tooltip for collapsed state */}
      {collapsed && (
        <div
          className="absolute start-full ms-2 px-2 py-1 bg-[hsl(var(--hu-popover))] text-[hsl(var(--hu-popover-foreground))] text-xs rounded-ele border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50"
          role="tooltip"
          id={`${itemId}-tooltip`}
        >
          {label}
        </div>
      )}
    </>
  );

  return (
    <li role="none">
      {href ? (
        <a
          href={href}
          className={cn(
            sidebarItemVariants({
              variant: isActive ? "active" : "default",
              collapsed,
            }),
            level > 0 &&
              !collapsed &&
              "ms-0 border-border ps-3 relative before:absolute before:start-[-2px] before:top-1/2 before:w-3 before:h-[1px] before:bg-border before:-translate-y-1/2",
            "group relative no-underline",
            className,
          )}
          onClick={onClick}
          role="menuitem"
          aria-current={isActive ? "page" : undefined}
          aria-describedby={collapsed ? `${itemId}-tooltip` : undefined}
        >
          {ItemContent}
        </a>
      ) : (
        <button
          type="button"
          className={cn(
            sidebarItemVariants({
              variant: isActive ? "active" : "default",
              collapsed,
            }),
            level > 0 &&
              !collapsed &&
              "ms-0 border-border ps-3 relative before:absolute before:start-[-2px] before:top-1/2 before:w-3 before:h-[1px] before:bg-border before:-translate-y-1/2",
            "group relative w-full text-start border-none",
            !isActive && "bg-transparent",
            className,
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="menuitem"
          aria-expanded={hasChildren ? expanded : undefined}
          aria-haspopup={hasChildren ? "menu" : undefined}
          aria-current={isActive ? "page" : undefined}
          aria-describedby={collapsed ? `${itemId}-tooltip` : undefined}
        >
          {ItemContent}
        </button>
      )}

      {/* Children */}
      <AnimatePresence>
        {hasChildren && expanded && !collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="overflow-hidden"
          >
            <ul
              className="space-y-1 py-1 ms-2 border-s border-border/50 ps-2 list-none"
              role="menu"
              aria-label={`${label} submenu`}
            >
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === SidebarItem) {
                  return React.cloneElement(
                    child as React.ReactElement<SidebarItemProps>,
                    {
                      level: level + 1,
                      ...(child.props as SidebarItemProps),
                    },
                  );
                }
                return child;
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

// Sidebar content wrapper for responsive behavior
export interface SidebarContentProps {
  children: React.ReactNode;
  sidebarCollapsed?: boolean;
  className?: string;
  position?: "fixed" | "relative";
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  children,
  sidebarCollapsed = false,
  className,
  position = "fixed",
}) => {
  const dir = useDirection();

  if (position === "relative") {
    return (
      <main className={cn("flex-1", className)} role="main">
        {children}
      </main>
    );
  }

  const mainAnimate =
    dir === "rtl"
      ? { marginRight: sidebarCollapsed ? 48 : 256, marginLeft: "unset" }
      : { marginRight: "unset", marginLeft: sidebarCollapsed ? 48 : 256 };
  const divAnimate =
    dir === "rtl"
      ? { marginRight: 0, marginLeft: "unset" }
      : { marginRight: "unset", marginLeft: 0 };

  return (
    <motion.main
      className={cn("flex-1", className)}
      initial={false}
      animate={mainAnimate}
      transition={{
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1],
      }}
      role="main"
    >
      <div className="md:hidden">
        <motion.div animate={divAnimate}>{children}</motion.div>
      </div>
      <div className="hidden md:block">{children}</div>
    </motion.main>
  );
};

// Utility components
const SidebarHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>{children}</div>
  );
};

const SidebarFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={cn("space-y-1", className)}>{children}</div>;
};

const SidebarSeparator: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => {
  const { collapsed } = useSidebar();

  if (collapsed && children) {
    // In collapsed mode, just show the separator without text
    return (
      <div className={cn("my-2", className)}>
        <Separator className="mx-2" />
      </div>
    );
  }

  return (
    <div className={cn("my-2", className)}>
      <Separator className="mx-2">{children}</Separator>
    </div>
  );
};

const SidebarText: React.FC<{
  children: React.ReactNode;
  className?: string;
  animation?: boolean;
}> = ({ children, className, animation = true }) => {
  const { collapsed } = useSidebar();

  if (!animation) {
    return !collapsed ? <span className={className}>{children}</span> : null;
  }

  return (
    <AnimatePresence mode="wait">
      {!collapsed && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.15 }}
          className={cn("truncate", className)}
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  useSidebar,
  sidebarVariants,
  sidebarItemVariants,
  SidebarText,
};

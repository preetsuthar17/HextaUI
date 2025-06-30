"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full shadow-sm/2 bg-background",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, tooltip, ...props }, ref) => {
  const avatar = (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return avatar;
  }

  const tooltipProps =
    typeof tooltip === "string" ? { children: tooltip } : tooltip;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{avatar}</TooltipTrigger>
        <TooltipContent size={"sm"} {...tooltipProps} />
      </Tooltip>
    </TooltipProvider>
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground font-medium",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  spacing?: "tight" | "normal" | "loose";
  size?: VariantProps<typeof avatarVariants>["size"];
  children: React.ReactElement[];
}

const avatarGroupSpacing = {
  tight: "-space-x-2",
  normal: "-space-x-1",
  loose: "space-x-1",
};

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    { className, max = 3, spacing = "normal", size = "md", children, ...props },
    ref,
  ) => {
    const avatarsToShow = children.slice(0, max);
    const remainingCount = Math.max(0, children.length - max);

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          avatarGroupSpacing[spacing],
          className,
        )}
        {...props}
      >
        {avatarsToShow.map((child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              key: index,
              size,
              className: cn(
                "border-2 border-background",
                (child.props as any)?.className,
              ),
            } as any);
          }
          return child;
        })}
        {remainingCount > 0 && (
          <Avatar size={size} className="border-2 border-background">
            <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold">
              +{remainingCount}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, avatarVariants };
export type { AvatarGroupProps };

"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type * as React from "react";

import { cn } from "@/lib/utils";

export function TooltipProvider({
  delay,
  closeDelay,
  timeout = 400,
  children,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Provider>) {
  return (
    <BaseTooltip.Provider
      closeDelay={closeDelay}
      delay={delay}
      timeout={timeout}
      {...props}
    >
      {children}
    </BaseTooltip.Provider>
  );
}

export function TooltipRoot({
  children,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Root>) {
  return <BaseTooltip.Root {...props}>{children}</BaseTooltip.Root>;
}

export const Tooltip = TooltipRoot;

export function TooltipTrigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Trigger>) {
  return (
    <BaseTooltip.Trigger
      className={cn(
        "ring-ring focus:outline-none focus-visible:ring-2",
        className
      )}
      {...props}
    />
  );
}

export function TooltipPortal({
  className,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Portal>) {
  return <BaseTooltip.Portal className={className} {...props} />;
}

export function TooltipPositioner({
  className,
  align = "center",
  alignOffset = 0,
  side = "top",
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Positioner>) {
  return (
    <BaseTooltip.Positioner
      align={align}
      alignOffset={alignOffset}
      className={cn("isolate z-50", className)}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  );
}

export function TooltipPopup({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Popup>) {
  return (
    <BaseTooltip.Popup
      className={cn(
        "z-50 w-fit max-w-xs origin-[--transform-origin] rounded-md bg-foreground px-3 py-1.5 text-background text-xs shadow-lg transition-[opacity,transform]",
        "data-open:fade-in-0 data-open:zoom-in-95 data-open:animate-in",
        "data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:animate-out",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      {children}
    </BaseTooltip.Popup>
  );
}

export function TooltipArrow({
  className,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Arrow>) {
  return (
    <BaseTooltip.Arrow
      className={cn(
        "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground",
        "data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5 data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=right]:top-1/2!",
        className
      )}
      {...props}
    />
  );
}

type TooltipContentProps = Omit<
  React.ComponentProps<typeof TooltipPopup> &
    React.ComponentProps<typeof TooltipPositioner> &
    React.ComponentProps<typeof TooltipPortal>,
  "children"
> & {
  children: React.ReactNode;
  arrow?: boolean;
};
export function TooltipContent({
  children,
  arrow = true,
  className,
  portalClassName,
  positionerClassName,
  ...props
}: TooltipContentProps & {
  portalClassName?: string;
  positionerClassName?: string;
}) {
  return (
    <TooltipPortal className={portalClassName}>
      <TooltipPositioner className={positionerClassName} {...props}>
        <TooltipPopup className={className}>
          {arrow && <TooltipArrow />}
          {children}
        </TooltipPopup>
      </TooltipPositioner>
    </TooltipPortal>
  );
}

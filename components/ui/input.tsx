import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  function Input({ className, type, ...props }, ref) {
    return (
      <input
        autoCapitalize={
          (props as any).autoCapitalize ??
          (type === "email" || type === "password" ? "none" : undefined)
        }
        autoCorrect={
          (props as any).autoCorrect ??
          (type === "email" || type === "password" ? "off" : undefined)
        }
        className={cn(
          "h-9 w-full min-w-0 touch-manipulation rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          className
        )}
        data-slot="input"
        ref={ref}
        spellCheck={
          (props as any).spellCheck ??
          (type === "email" || type === "password" ? false : undefined)
        }
        type={type}
        {...props}
      />
    );
  }
);

export { Input };

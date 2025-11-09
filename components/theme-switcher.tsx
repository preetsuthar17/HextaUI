"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = useCallback(() => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  }, [theme, setTheme]);

  const currentTheme = theme || "light";
  const Icon =
    currentTheme === "light" ? Sun : currentTheme === "dark" ? Moon : Laptop;
  const label =
    currentTheme === "light"
      ? "Light"
      : currentTheme === "dark"
        ? "Dark"
        : "System";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          aria-label={`Current theme: ${label}.`}
          onClick={cycleTheme}
          size="icon-sm"
          suppressHydrationWarning
          variant="ghost"
        >
          <Icon className="size-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label} theme</p>
      </TooltipContent>
    </Tooltip>
  );
}

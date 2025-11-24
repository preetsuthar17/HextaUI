"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/registry/new-york/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = useCallback(() => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  }, [theme, setTheme]);

  const currentTheme = mounted ? theme || "system" : "system";
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
          {mounted ? (
            <Icon className="size-4" />
          ) : (
            <Laptop className="size-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{mounted ? label : "System"} theme</p>
      </TooltipContent>
    </Tooltip>
  );
}

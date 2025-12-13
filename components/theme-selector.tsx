"use client";

import { Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { startTransition, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { applyTheme, getTheme, type ThemeName, themes } from "@/lib/themes";

const THEME_STORAGE_KEY = "hextaui-color-theme";

export function ThemeSelector() {
  const { theme: mode } = useTheme();
  const [colorTheme, setColorTheme] = useState<ThemeName>(() => {
    if (typeof window === "undefined") return "default";
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeName;
    if (stored && getTheme(stored)) {
      return stored;
    }
    return "default";
  });
  const [hydrated, setHydrated] = useState(() => typeof window !== "undefined");

  useEffect(() => {
    if (!hydrated) {
      startTransition(() => {
        setHydrated(true);
      });
    }
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName;
    if (stored && getTheme(stored) && stored !== colorTheme) {
      startTransition(() => {
        setColorTheme(stored);
      });
    }
  }, [hydrated, colorTheme]);

  useEffect(() => {
    if (!hydrated) return;
    const theme = getTheme(colorTheme);
    if (theme) {
      const isDark = mode === "dark";
      applyTheme(theme, isDark);
    }
  }, [colorTheme, mode, hydrated]);

  const handleThemeChange = (themeName: ThemeName) => {
    setColorTheme(themeName);
    localStorage.setItem(THEME_STORAGE_KEY, themeName);
  };

  if (!hydrated) {
    return (
      <Tooltip>
        <TooltipTrigger>
          <Button
            aria-label="Select color theme"
            size="icon-sm"
            suppressHydrationWarning
            variant="ghost"
          >
            <Palette className="size-4" />
            <span className="sr-only">Color theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Color theme</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  const currentTheme = themes.find((t) => t.name === colorTheme);

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenuTrigger>
            <Button
              aria-label={`Current color theme: ${currentTheme?.label}`}
              size="icon-sm"
              variant="ghost"
            >
              <Palette className="size-4" />
              <span className="sr-only">Color theme</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{currentTheme?.label} theme</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem
            className={colorTheme === theme.name ? "bg-accent" : ""}
            key={theme.name}
            onClick={() => handleThemeChange(theme.name)}
          >
            <span className="flex items-center gap-2">
              {colorTheme === theme.name && (
                <span className="size-1.5 rounded-full bg-primary" />
              )}
              {theme.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

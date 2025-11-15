"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { applyTheme, getTheme, type ThemeName } from "@/lib/themes";

const THEME_STORAGE_KEY = "hextaui-color-theme";

function applyStoredTheme(mode: string | undefined) {
  const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName;
  const themeName = stored && getTheme(stored) ? stored : "default";
  const theme = getTheme(themeName);

  if (theme) {
    let isDark = false;
    if (mode === "dark") {
      isDark = true;
    } else if (mode === "light") {
      isDark = false;
    } else {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    applyTheme(theme, isDark);
  }
}

export function ThemeInitializer() {
  const { theme: mode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    applyStoredTheme(mode);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY) {
        applyStoredTheme(mode);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (mounted) {
      applyStoredTheme(mode);
    }
  }, [mode, mounted]);

  return null;
}

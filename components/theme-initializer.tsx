"use client";

import { useTheme } from "next-themes";
import { startTransition, useEffect, useState } from "react";
import { applyTheme, getTheme, type ThemeName } from "@/lib/themes";

const THEME_STORAGE_KEY = "hextaui-color-theme";

function applyStoredTheme(mode: string | undefined) {
  const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName;
  const themeName = stored && getTheme(stored) ? stored : "default";
  const theme = getTheme(themeName);

  if (theme) {
    const isDark = mode === "dark";
    applyTheme(theme, isDark);
  }
}

export function ThemeInitializer() {
  const { theme: mode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
    applyStoredTheme(mode);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY) {
        applyStoredTheme(mode);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [mode]);

  useEffect(() => {
    if (mounted) {
      applyStoredTheme(mode);
    }
  }, [mode, mounted]);

  return null;
}

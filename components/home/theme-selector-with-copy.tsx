"use client";

import { Check, Copy, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { startTransition, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { applyTheme, getTheme, type ThemeName, themes } from "@/lib/themes";

const THEME_STORAGE_KEY = "hextaui-color-theme";

const themeFonts: Record<
  ThemeName,
  { sans?: string; serif?: string; mono?: string }
> = {
  default: {},
  "retro-blue": {
    sans: "Geist Mono",
    serif: "Playfair Display",
    mono: "Geist Mono",
  },
  purple: {
    sans: "Rubik",
  },
  "night-wind": {},
  orbiter: {
    sans: "TASA Orbiter",
  },
  "soft-orange": {
    sans: "Onest",
  },
};

const fontImportMap: Record<string, string> = {
  "Geist Mono": "Geist_Mono",
  "Playfair Display": "Playfair_Display",
  "Press Start 2P": "Press_Start_2P",
  "Space Mono": "Space_Mono",
  "Architects Daughter": "Architects_Daughter",
  "DM Sans": "DM_Sans",
  "Fira Code": "Fira_Code",
  "JetBrains Mono": "JetBrains_Mono",
  "Source Code Pro": "Source_Code_Pro",
  Rubik: "Rubik",
  Onest: "Onest",
  "TASA Orbiter": "TASA_Orbiter",
};

function getFontImportCode(themeName: ThemeName): string {
  const fonts = themeFonts[themeName];
  if (!fonts || Object.keys(fonts).length === 0) {
    return "// No custom fonts required for this theme";
  }

  const imports: string[] = [];
  const configs: string[] = [];
  const classNameVars: string[] = [];

  const fontVarMap: Record<string, string> = {
    "Geist Mono": "geistMono",
    "Playfair Display": "playfairDisplay",
    "Press Start 2P": "pressStart2P",
    "Space Mono": "spaceMono",
    "Architects Daughter": "architectsDaughter",
    "DM Sans": "dmSans",
    Outfit: "outfit",
    Poppins: "poppins",
    Lora: "lora",
    "Fira Code": "firaCode",
    Merriweather: "merriweather",
    "JetBrains Mono": "jetBrainsMono",
    Oxanium: "oxanium",
    "Source Code Pro": "sourceCodePro",
    Inter: "inter",
    Rubik: "rubik",
    Onest: "onest",
  };

  const processFont = (
    fontDisplayName: string,
    type: "sans" | "serif" | "mono"
  ) => {
    const fontImportName =
      fontImportMap[fontDisplayName] || fontDisplayName.replace(/\s+/g, "_");
    const varName =
      fontVarMap[fontDisplayName] ||
      fontDisplayName.toLowerCase().replace(/\s+/g, "");

    imports.push(`import ${fontImportName} from "next/font/google";`);

    const weightConfig =
      fontDisplayName === "Press Start 2P"
        ? '  weight: "400",'
        : fontDisplayName === "Space Mono"
          ? '  weight: ["400", "700"],'
          : fontDisplayName === "Fira Code" ||
              fontDisplayName === "JetBrains Mono" ||
              fontDisplayName === "Source Code Pro"
            ? '  weight: ["400", "500", "600", "700"],'
            : fontDisplayName === "Poppins"
              ? '  weight: ["400", "500", "600", "700"],'
              : fontDisplayName === "Merriweather"
                ? '  weight: ["300", "400", "700", "900"],'
                : fontDisplayName === "Oxanium"
                  ? '  weight: ["400", "500", "600", "700"],'
                  : "";

    const configLines = [
      `const ${varName} = ${fontImportName}({`,
      `  variable: "--font-${varName}",`,
      `  subsets: ["latin"],`,
      ...(weightConfig ? [weightConfig] : []),
      "});",
    ];

    configs.push(configLines.join("\n"));
    classNameVars.push(`${varName}.variable`);
  };

  if (fonts.sans) processFont(fonts.sans, "sans");
  if (fonts.serif) processFont(fonts.serif, "serif");
  if (fonts.mono) processFont(fonts.mono, "mono");

  return `${imports.join("\n")}\n\n${configs.join("\n\n")}\n\nclassName={\`... ${classNameVars.join(" ")}\`}`;
}

function getThemeCSSCode(themeName: ThemeName, isDark: boolean): string {
  const theme = getTheme(themeName);
  if (!theme) return "";

  const vars = isDark ? theme.dark : theme.light;
  const cssVars = Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");

  return `:root {\n${cssVars}\n}`;
}

function getGlobalsCSSCode(): string {
  return `@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
}`;
}

export function ThemeSelectorWithCopy() {
  const { theme: mode } = useTheme();
  const [colorTheme, setColorTheme] = useState<ThemeName>(() => {
    if (typeof window === "undefined") return "default";
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeName;
    if (stored && getTheme(stored)) {
      return stored;
    }
    return "default";
  });
  const [hydrated, setHydrated] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  useEffect(() => {
    startTransition(() => {
      setHydrated(true);
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName;
      if (stored && getTheme(stored)) {
        setColorTheme(stored);
      }
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName;
    const themeToUse = stored && getTheme(stored) ? stored : "default";

    if (themeToUse !== colorTheme) {
      startTransition(() => {
        setColorTheme(themeToUse);
      });
    }

    const theme = getTheme(themeToUse);
    if (theme) {
      const isDark = mode === "dark";
      applyTheme(theme, isDark);
    }
  }, [colorTheme, mode, hydrated]);

  const handleThemeChange = (themeName: ThemeName) => {
    setColorTheme(themeName);
    localStorage.setItem(THEME_STORAGE_KEY, themeName);
  };

  const handleCopy = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!hydrated) {
    return (
      <div className="flex items-center gap-2">
        <Select disabled value={colorTheme}>
          <SelectTrigger className="w-[180px]">
            <SelectValue>Select theme</SelectValue>
          </SelectTrigger>
        </Select>
        <Button disabled size="icon" variant="outline">
          <Palette className="size-4" />
        </Button>
      </div>
    );
  }

  const currentTheme = themes.find((t) => t.name === colorTheme);
  const isDark = mode === "dark";
  const lightCssCode = getThemeCSSCode(colorTheme, false);
  const darkCssCode = getThemeCSSCode(colorTheme, true);
  const globalsCssCode = getGlobalsCSSCode();
  const fontCode = getFontImportCode(colorTheme);

  const darkCssFormatted = darkCssCode.replace(":root {", ".dark {");
  const allCssCode = `${lightCssCode}\n\n${darkCssFormatted}\n\n${globalsCssCode}`;

  return (
    <div className="flex items-center gap-2">
      <Select
        onValueChange={(value) => handleThemeChange(value as ThemeName)}
        value={colorTheme}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue>
            <span className="flex items-center gap-2">
              <Palette className="size-4" />
              {currentTheme?.label ?? "Select theme"}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {themes.map((theme) => (
            <SelectItem key={theme.name} value={theme.name}>
              {theme.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Dialog>
        <DialogTrigger>
          <Button aria-label="Copy theme CSS" size="icon" variant="outline">
            <Copy className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="flex max-h-[80vh] max-w-[95vw] flex-col overflow-hidden sm:max-w-2xl">
          <DialogHeader className="shrink-0">
            <DialogTitle>Theme CSS Code</DialogTitle>
            <DialogDescription>
              Copy the CSS variables and font imports for the{" "}
              <strong>{currentTheme?.label}</strong> theme
            </DialogDescription>
          </DialogHeader>
          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
              <div className="flex shrink-0 items-center justify-between gap-2">
                <h3 className="font-medium text-sm">All CSS Variables</h3>
                <Button
                  aria-label={
                    copiedSection === "css" ? "Copied!" : "Copy all CSS"
                  }
                  onClick={() => handleCopy(allCssCode, "css")}
                  size="icon-sm"
                  variant="outline"
                >
                  {copiedSection === "css" ? (
                    <Check className="size-4" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>
              <div className="overflow-hidden rounded-md border">
                <ScrollArea className="h-[495px] w-full">
                  <div className="p-4">
                    <pre className="whitespace-pre text-xs">
                      <code className="block min-w-max">{allCssCode}</code>
                    </pre>
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-medium text-sm">
                  Font Imports (layout.tsx)
                </h3>
                <Button
                  aria-label={
                    copiedSection === "font" ? "Copied!" : "Copy font code"
                  }
                  onClick={() => handleCopy(fontCode, "font")}
                  size="icon-sm"
                  variant="outline"
                >
                  {copiedSection === "font" ? (
                    <Check className="size-4" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>
              <div className="rounded-md border">
                <ScrollArea className="h-[200px]">
                  <div className="p-4">
                    <pre className="whitespace-pre text-xs">
                      <code className="block min-w-max">{fontCode}</code>
                    </pre>
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

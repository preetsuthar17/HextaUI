export type ThemeName =
  | "default"
  | "retro-blue"
  | "purple"
  | "night-wind"
  | "orbiter"
  | "soft-orange";

export type ThemeRadius = {
  light: string;
  dark: string;
};

export type ThemeFonts = {
  sans: string;
  serif: string;
  mono: string;
};

export interface Theme {
  name: ThemeName;
  label: string;
  light: Record<string, string>;
  dark: Record<string, string>;
}

export const themeRadii: Record<ThemeName, ThemeRadius> = {
  default: { light: "0.825rem", dark: "0.825rem" },
  "retro-blue": { light: "0rem", dark: "0rem" },
  purple: { light: "0.825rem", dark: "0.825rem" },
  "night-wind": { light: "0.825rem", dark: "0.825rem" },
  orbiter: { light: "0rem", dark: "0rem" },
  "soft-orange": { light: "0.825rem", dark: "0.825rem" },
};

export const themeFonts: Record<ThemeName, ThemeFonts> = {
  default: {
    sans: "Inter, sans-serif",
    serif: "Playfair Display, serif",
    mono: "Geist Mono, monospace",
  },
  "retro-blue": {
    sans: "Geist Mono, sans-serif",
    serif: "Playfair Display, serif",
    mono: "Geist Mono, monospace",
  },
  purple: {
    sans: "Rubik",
    serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    mono: "monospace",
  },
  "night-wind": {
    sans: "Geist, sans-serif",
    serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    mono: "monospace",
  },
  orbiter: {
    sans: "Tasa Orbiter",
    serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    mono: "monospace",
  },
  "soft-orange": {
    sans: "Onest",
    serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    mono: "monospace",
  },
};

type ShadowConfig = {
  x: string;
  y: string;
  blur: string;
  spread: string;
  opacity: string;
  color: string;
};

type ShadowPreset = "standard" | "retro" | "purple";

const shadowPresets: Record<ShadowPreset, ShadowConfig> = {
  standard: {
    x: "0",
    y: "1px",
    blur: "px",
    spread: "0px",
    opacity: "0.02",
    color: "oklch(0 0 0)",
  },
  retro: {
    x: "2px",
    y: "2px",
    blur: "4px",
    spread: "0px",
    opacity: "0.2",
    color: "hsl(255 86% 66%)",
  },
  purple: {
    x: "0",
    y: "1px",
    blur: "3px",
    spread: "0px",
    opacity: "0.1",
    color: "oklch(0 0 0)",
  },
};

function generateStandardShadows(
  _color: string,
  opacity: string
): Record<string, string> {
  const base = `hsl(0 0% 0% / ${opacity})`;
  return {
    "--shadow-2xs": `0 1px 3px 0 ${base}`,
    "--shadow-xs": `0 1px 3px 0 ${base}`,
    "--shadow-sm": `0 1px 3px 0 ${base}, 0 1px 2px -1px ${base}`,
    "--shadow": `0 1px 3px 0 ${base}, 0 1px 2px -1px ${base}`,
    "--shadow-md": `0 1px 3px 0 ${base}, 0 2px 4px -1px ${base}`,
    "--shadow-lg": `0 1px 3px 0 ${base}, 0 4px 6px -1px ${base}`,
    "--shadow-xl": `0 1px 3px 0 ${base}, 0 8px 10px -1px ${base}`,
    "--shadow-2xl": "0 1px 3px 0 hsl(0 0% 0% / 0.25)",
  };
}

function generateRetroShadows(
  color: string,
  opacity: string
): Record<string, string> {
  return {
    "--shadow-2xs": `4px 4px 0px 0px ${color} / ${opacity}`,
    "--shadow-xs": `4px 4px 0px 0px ${color} / ${opacity}`,
    "--shadow-sm": `4px 4px 0px 0px ${color} / ${opacity}, 4px 1px 2px -1px ${color} / ${opacity}`,
    "--shadow": `4px 4px 0px 0px ${color} / ${opacity}, 4px 1px 2px -1px ${color} / ${opacity}`,
    "--shadow-md": `4px 4px 0px 0px ${color} / ${opacity}, 4px 2px 4px -1px ${color} / ${opacity}`,
    "--shadow-lg": `4px 4px 0px 0px ${color} / ${opacity}, 4px 4px 6px -1px ${color} / ${opacity}`,
    "--shadow-xl": `4px 4px 0px 0px ${color} / ${opacity}, 4px 8px 10px -1px ${color} / ${opacity}`,
    "--shadow-2xl": `4px 4px 0px 0px ${color} / 0.38`,
  };
}

function generatePurpleShadows(color: string): Record<string, string> {
  return {
    "--shadow-2xs": `0 1px 0 0 ${color} / 0.05`,
    "--shadow-xs": `0 1px 2px 0 ${color} / 0.05`,
    "--shadow-sm": `0 1px 3px 0 ${color} / 0.1, 0 1px 2px -1px ${color} / 0.1`,
    "--shadow": `0 1px 3px 0 ${color} / 0.1, 0 1px 2px -1px ${color} / 0.1`,
    "--shadow-md": `0 4px 6px -1px ${color} / 0.1, 0 2px 4px -2px ${color} / 0.1`,
    "--shadow-lg": `0 1px 3px 0 ${color} / 0.1, 0 4px 6px -1px ${color} / 0.1`,
    "--shadow-xl": `0 20px 25px -5px oklch(0 0 0 / 0.1), 0 8px 10px -6px ${color} / 0.1`,
    "--shadow-2xl": `0 25px 50px -12px ${color} / 0.15`,
  };
}

function getShadowVariables(
  preset: ShadowPreset,
  config?: Partial<ShadowConfig>
): Record<string, string> {
  const shadowConfig = { ...shadowPresets[preset], ...config };
  const { x, y, blur, spread, opacity, color } = shadowConfig;

  const base = {
    "--shadow-x": x,
    "--shadow-y": y,
    "--shadow-blur": blur,
    "--shadow-spread": spread,
    "--shadow-opacity": opacity,
    "--shadow-color": color,
    "--tracking-normal": "0em",
    "--spacing": "0.25rem",
  };

  switch (preset) {
    case "retro":
      return { ...base, ...generateRetroShadows(color, opacity) };
    case "purple":
      return { ...base, ...generatePurpleShadows(color) };
    default:
      return { ...base, ...generateStandardShadows(color, opacity) };
  }
}

type ColorPalette = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
};

function buildThemeVariables(
  palette: ColorPalette,
  fonts: ThemeFonts,
  shadowPreset: ShadowPreset = "standard",
  shadowConfig?: Partial<ShadowConfig>
): Record<string, string> {
  return {
    "--background": palette.background,
    "--foreground": palette.foreground,
    "--card": palette.card,
    "--card-foreground": palette.cardForeground,
    "--popover": palette.popover,
    "--popover-foreground": palette.popoverForeground,
    "--primary": palette.primary,
    "--primary-foreground": palette.primaryForeground,
    "--secondary": palette.secondary,
    "--secondary-foreground": palette.secondaryForeground,
    "--muted": palette.muted,
    "--muted-foreground": palette.mutedForeground,
    "--accent": palette.accent,
    "--accent-foreground": palette.accentForeground,
    "--destructive": palette.destructive,
    "--destructive-foreground": palette.destructiveForeground,
    "--border": palette.border,
    "--input": palette.input,
    "--ring": palette.ring,
    "--chart-1": palette.chart1,
    "--chart-2": palette.chart2,
    "--chart-3": palette.chart3,
    "--chart-4": palette.chart4,
    "--chart-5": palette.chart5,
    "--sidebar": palette.sidebar,
    "--sidebar-foreground": palette.sidebarForeground,
    "--sidebar-primary": palette.sidebarPrimary,
    "--sidebar-primary-foreground": palette.sidebarPrimaryForeground,
    "--sidebar-accent": palette.sidebarAccent,
    "--sidebar-accent-foreground": palette.sidebarAccentForeground,
    "--sidebar-border": palette.sidebarBorder,
    "--sidebar-ring": palette.sidebarRing,
    "--font-sans": fonts.sans,
    "--font-serif": fonts.serif,
    "--font-mono": fonts.mono,
    ...getShadowVariables(shadowPreset, shadowConfig),
  };
}

export const themes: Theme[] = [
  {
    name: "default",
    label: "Default",
    light: buildThemeVariables(
      {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.141 0.005 285.823)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.141 0.005 285.823)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.141 0.005 285.823)",
        primary: "oklch(0.205 0 0)",
        primaryForeground: "oklch(0.985 0 0)",
        secondary: "oklch(0.967 0.001 286.375)",
        secondaryForeground: "oklch(0.21 0.006 285.885)",
        muted: "oklch(0.967 0.001 286.375)",
        mutedForeground: "oklch(0.552 0.016 285.938)",
        accent: "oklch(0.967 0.001 286.375)",
        accentForeground: "oklch(0.21 0.006 285.885)",
        destructive: "oklch(0.577 0.245 27.325)",
        destructiveForeground: "oklch(1 0 0)",
        border: "oklch(0.92 0.004 286.32)",
        input: "oklch(0.92 0.004 286.32)",
        ring: "oklch(0.708 0 0)",
        chart1: "oklch(0.809 0.105 251.813)",
        chart2: "oklch(0.623 0.214 259.815)",
        chart3: "oklch(0.546 0.245 262.881)",
        chart4: "oklch(0.488 0.243 264.376)",
        chart5: "oklch(0.424 0.199 265.638)",
        sidebar: "oklch(0.985 0 0)",
        sidebarForeground: "oklch(0.141 0.005 285.823)",
        sidebarPrimary: "oklch(0.546 0.245 262.881)",
        sidebarPrimaryForeground: "oklch(0.97 0.014 254.604)",
        sidebarAccent: "oklch(0.967 0.001 286.375)",
        sidebarAccentForeground: "oklch(0.21 0.006 285.885)",
        sidebarBorder: "oklch(0.92 0.004 286.32)",
        sidebarRing: "oklch(0.708 0 0)",
      },
      themeFonts.default
    ),
    dark: buildThemeVariables(
      {
        background: "oklch(0.141 0.005 285.823)",
        foreground: "oklch(0.985 0 0)",
        card: "oklch(0.21 0.006 285.885)",
        cardForeground: "oklch(0.985 0 0)",
        popover: "oklch(0.21 0.006 285.885)",
        popoverForeground: "oklch(0.985 0 0)",
        primary: "oklch(0.922 0 0)",
        primaryForeground: "oklch(0.205 0 0)",
        secondary: "oklch(0.274 0.006 286.033)",
        secondaryForeground: "oklch(0.985 0 0)",
        muted: "oklch(0.274 0.006 286.033)",
        mutedForeground: "oklch(0.705 0.015 286.067)",
        accent: "oklch(0.274 0.006 286.033)",
        accentForeground: "oklch(0.985 0 0)",
        destructive: "oklch(0.704 0.191 22.216)",
        destructiveForeground: "oklch(1 0 0)",
        border: "oklch(1 0 0 / 10%)",
        input: "oklch(1 0 0 / 15%)",
        ring: "oklch(0.556 0 0)",
        chart1: "oklch(0.809 0.105 251.813)",
        chart2: "oklch(0.623 0.214 259.815)",
        chart3: "oklch(0.546 0.245 262.881)",
        chart4: "oklch(0.488 0.243 264.376)",
        chart5: "oklch(0.424 0.199 265.638)",
        sidebar: "oklch(0.21 0.006 285.885)",
        sidebarForeground: "oklch(0.985 0 0)",
        sidebarPrimary: "oklch(0.623 0.214 259.815)",
        sidebarPrimaryForeground: "oklch(0.97 0.014 254.604)",
        sidebarAccent: "oklch(0.274 0.006 286.033)",
        sidebarAccentForeground: "oklch(0.985 0 0)",
        sidebarBorder: "oklch(1 0 0 / 10%)",
        sidebarRing: "oklch(0.439 0 0)",
      },
      themeFonts.default
    ),
  },
  {
    name: "retro-blue",
    label: "Retro Blue",
    light: buildThemeVariables(
      {
        background: "oklch(0.98 0 0)",
        foreground: "oklch(0.5066 0.2501 271.8903)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.5066 0.2501 271.8903)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.5066 0.2501 271.8903)",
        primary: "oklch(0.5066 0.2501 271.8903)",
        primaryForeground: "oklch(1 0 0)",
        secondary: "oklch(1 0 0)",
        secondaryForeground: "oklch(0.5066 0.2501 271.8903)",
        muted: "oklch(0.9189 0.0147 106.6853)",
        mutedForeground: "oklch(0.5066 0.2501 271.8903)",
        accent: "oklch(0.94 0 0)",
        accentForeground: "oklch(0.4486 0.2266 271.5512)",
        destructive: "oklch(0.629 0.1902 23.0704)",
        destructiveForeground: "oklch(1 0 0)",
        border: "oklch(0.5066 0.2501 271.8903)",
        input: "oklch(0.5066 0.2501 271.8903)",
        ring: "oklch(0.468 0.2721 279.6007)",
        chart1: "oklch(0.5066 0.2501 271.8903)",
        chart2: "oklch(0.5499 0.2197 264.4382)",
        chart3: "oklch(0.7187 0 0)",
        chart4: "oklch(0.9189 0 0)",
        chart5: "oklch(0.559 0 0)",
        sidebar: "oklch(1 0 0)",
        sidebarForeground: "oklch(0.5066 0.2501 271.8903)",
        sidebarPrimary: "oklch(0.5066 0.2501 271.8903)",
        sidebarPrimaryForeground: "oklch(1 0 0)",
        sidebarAccent: "oklch(0.94 0 0)",
        sidebarAccentForeground: "oklch(0.4486 0.2266 271.5512)",
        sidebarBorder: "oklch(0.4486 0.2266 271.5512)",
        sidebarRing: "oklch(0.4486 0.2266 271.5512)",
      },
      themeFonts["retro-blue"],
      "retro",
      { color: "hsl(238.3146 85.5769% 59.2157%)", opacity: "0.07" }
    ),
    dark: buildThemeVariables(
      {
        background: "oklch(0 0.151 268.343)",
        foreground: "oklch(0.972 0.016 110.55)",
        card: "oklch(0 0.151 268.343)",
        cardForeground: "oklch(0.972 0.016 110.55)",
        popover: "oklch(0.507 0.25 271.89)",
        popoverForeground: "oklch(0.972 0.016 110.55)",
        primary: "oklch(0.972 0.016 110.55)",
        primaryForeground: "oklch(0.253 0.094 275.725)",
        secondary: "oklch(1 0 0 / 0.2)",
        secondaryForeground: "oklch(1 0 0)",
        muted: "oklch(0.228 0.127 269.556)",
        mutedForeground: "oklch(0.972 0.016 110.55)",
        accent: "oklch(0.228 0.127 269.556)",
        accentForeground: "oklch(0.972 0.016 110.55)",
        destructive: "oklch(0.711 0.166 22.216)",
        destructiveForeground: "oklch(0 0 0)",
        border: "oklch(0.427 0.149 277.089)",
        input: "oklch(0.427 0.149 277.089)",
        ring: "oklch(1 0 0)",
        chart1: "oklch(0.972 0.016 110.55)",
        chart2: "oklch(0.7 0.19 48)",
        chart3: "oklch(0.77 0.2 131)",
        chart4: "oklch(0.68 0.15 237)",
        chart5: "oklch(0.66 0.21 354)",
        sidebar: "oklch(0 0.151 268.343)",
        sidebarForeground: "oklch(0.972 0.016 110.55)",
        sidebarPrimary: "oklch(0.507 0.25 271.89)",
        sidebarPrimaryForeground: "oklch(1 0 0)",
        sidebarAccent: "oklch(0.416 0.203 272.082)",
        sidebarAccentForeground: "oklch(0.972 0.016 110.55)",
        sidebarBorder: "oklch(0.972 0.016 110.55)",
        sidebarRing: "oklch(0.972 0.016 110.55)",
      },
      themeFonts["retro-blue"],
      "retro",
      { color: "oklch(0.427 0.149 277.089)", opacity: "0.5" }
    ),
  },
  {
    name: "purple",
    label: "Purple",
    light: buildThemeVariables(
      {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.282 0.087 267.935)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.282 0.087 267.935)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.282 0.087 267.935)",
        primary: "oklch(0.468 0.272 279.601)",
        primaryForeground: "oklch(1 0 0)",
        secondary: "oklch(0.955 0.025 298.615)",
        secondaryForeground: "oklch(0.266 0.151 281.039)",
        muted: "oklch(0.984 0.003 247.858)",
        mutedForeground: "oklch(0.516 0.054 272.586)",
        accent: "oklch(0.968 0.007 247.896)",
        accentForeground: "oklch(0.282 0.087 267.935)",
        destructive: "oklch(0.69 0.2 23.91)",
        destructiveForeground: "oklch(1 0 0)",
        border: "oklch(0.929 0.013 255.508)",
        input: "oklch(0.929 0.013 255.508)",
        ring: "oklch(0.468 0.272 279.601 / 0.1)",
        chart1: "oklch(0.55 0.25 279.6)",
        chart2: "oklch(0.7 0.19 48)",
        chart3: "oklch(0.77 0.2 131)",
        chart4: "oklch(0.68 0.15 237)",
        chart5: "oklch(0.66 0.21 354)",
        sidebar: "oklch(0.984 0.003 247.858)",
        sidebarForeground: "oklch(0.282 0.087 267.935)",
        sidebarPrimary: "oklch(0.468 0.272 279.601)",
        sidebarPrimaryForeground: "oklch(1 0 0)",
        sidebarAccent: "oklch(0.968 0.007 247.896)",
        sidebarAccentForeground: "oklch(0.282 0.087 267.935)",
        sidebarBorder: "oklch(0.929 0.013 255.508)",
        sidebarRing: "oklch(0.929 0.013 255.508)",
      },
      themeFonts.purple,
      "purple",
      { color: "oklch(0.554 0.041 257.417)" }
    ),
    dark: buildThemeVariables(
      {
        background: "oklch(0.15 0.03 268)",
        foreground: "oklch(0.98 0 0)",
        card: "oklch(0.17 0.03 268)",
        cardForeground: "oklch(0.98 0 0)",
        popover: "oklch(0.18 0.03 268)",
        popoverForeground: "oklch(0.98 0 0)",
        primary: "oklch(0.55 0.25 279.6)",
        primaryForeground: "oklch(1 0 0)",
        secondary: "oklch(0.55 0.25 279.6 / 25%)",
        secondaryForeground: "oklch(0.7 0.25 279.6)",
        muted: "oklch(0.22 0.02 270)",
        mutedForeground: "oklch(0.75 0.04 275)",
        accent: "oklch(0.28 0.03 272)",
        accentForeground: "oklch(0.98 0 0)",
        destructive: "oklch(0.69 0.2 23.91)",
        destructiveForeground: "oklch(0 0 0)",
        border: "oklch(0.3 0.02 270)",
        input: "oklch(0.32 0.02 270)",
        ring: "oklch(0.55 0.25 279.6)",
        chart1: "oklch(0.55 0.25 279.6)",
        chart2: "oklch(0.7 0.19 48)",
        chart3: "oklch(0.77 0.2 131)",
        chart4: "oklch(0.68 0.15 237)",
        chart5: "oklch(0.66 0.21 354)",
        sidebar: "oklch(0.16 0.02 270)",
        sidebarForeground: "oklch(0.98 0 0)",
        sidebarPrimary: "oklch(1 0 0)",
        sidebarPrimaryForeground: "oklch(0.2 0.02 268)",
        sidebarAccent: "oklch(0.24 0.02 272)",
        sidebarAccentForeground: "oklch(0.98 0 0)",
        sidebarBorder: "oklch(0.28 0.02 270)",
        sidebarRing: "oklch(0.55 0.25 279.6)",
      },
      themeFonts.purple,
      "standard"
    ),
  },
  {
    name: "night-wind",
    label: "Night Wind",
    light: buildThemeVariables(
      {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.145 0 0)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.145 0 0)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.145 0 0)",
        primary: "oklch(0.7273 0.143 215.221)",
        primaryForeground: "oklch(0.1 0.143 215.221)",
        secondary: "oklch(0.7273 0.143 215.221 / 0.1)",
        secondaryForeground: "oklch(0.2 0.143 215.221)",
        muted: "oklch(0.97 0 0)",
        mutedForeground: "oklch(0.556 0 0)",
        accent: "oklch(0.97 0 0)",
        accentForeground: "oklch(0.145 0 0)",
        destructive: "oklch(0.577 0.245 27.325)",
        destructiveForeground: "oklch(1 0 0)",
        border: "oklch(0.922 0 0)",
        input: "oklch(0.922 0 0)",
        ring: "oklch(0.715 0.143 215.221)",
        chart1: "oklch(0.81 0.1 252)",
        chart2: "oklch(0.7 0.19 48)",
        chart3: "oklch(0.77 0.2 131)",
        chart4: "oklch(0.68 0.15 237)",
        chart5: "oklch(0.66 0.21 354)",
        sidebar: "oklch(1 0 0)",
        sidebarForeground: "oklch(0.145 0 0)",
        sidebarPrimary: "oklch(0.715 0.143 215.221)",
        sidebarPrimaryForeground: "oklch(0.1 0.143 215.221)",
        sidebarAccent: "oklch(0.97 0 0)",
        sidebarAccentForeground: "oklch(0.145 0 0)",
        sidebarBorder: "oklch(0.922 0 0)",
        sidebarRing: "oklch(0.715 0.143 215.221)",
      },
      themeFonts["night-wind"]
    ),
    dark: buildThemeVariables(
      {
        background: "oklch(0.1783 0.042 264.695)",
        foreground: "oklch(0.985 0 0)",
        card: "oklch(0.1783 0.042 264.695)",
        cardForeground: "oklch(0.985 0 0)",
        popover: "oklch(0.208 0.042 265.755)",
        popoverForeground: "oklch(0.984 0.003 247.858)",
        primary: "oklch(0.7273 0.143 215.221)",
        primaryForeground: "oklch(0.129 0.042 264.695)",
        secondary: "oklch(0.279 0.041 260.031)",
        secondaryForeground: "oklch(0.984 0.003 247.858)",
        muted: "oklch(0.129 0.042 264.695)",
        mutedForeground: "oklch(0.704 0.04 256.788)",
        accent: "oklch(0.208 0.042 265.755)",
        accentForeground: "oklch(0.985 0 0)",
        destructive: "oklch(0.577 0.245 27.325)",
        destructiveForeground: "oklch(0.985 0 0)",
        border: "oklch(0.308 0.042 265.755)",
        input: "oklch(0.308 0.042 265.755)",
        ring: "oklch(0.715 0.143 215.221)",
        chart1: "oklch(0.81 0.1 252)",
        chart2: "oklch(0.7 0.19 48)",
        chart3: "oklch(0.77 0.2 131)",
        chart4: "oklch(0.68 0.15 237)",
        chart5: "oklch(0.66 0.21 354)",
        sidebar: "oklch(0.1783 0.042 264.695)",
        sidebarForeground: "oklch(0.985 0 0)",
        sidebarPrimary: "oklch(0.715 0.143 215.221)",
        sidebarPrimaryForeground: "oklch(0.985 0 0)",
        sidebarAccent: "oklch(0.208 0.042 265.755)",
        sidebarAccentForeground: "oklch(0.985 0 0)",
        sidebarBorder: "oklch(0.279 0.041 260.031)",
        sidebarRing: "oklch(0.715 0.143 215.221)",
      },
      themeFonts["night-wind"]
    ),
  },
  {
    name: "orbiter",
    label: "Orbiter",
    light: buildThemeVariables(
      {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.145 0 0)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.145 0 0)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.145 0 0)",
        primary: "oklch(0.628 0.258 29.264)",
        primaryForeground: "oklch(1 0 0)",
        secondary: "oklch(0.97 0 0)",
        secondaryForeground: "oklch(0.145 0 0)",
        muted: "oklch(0.97 0 0)",
        mutedForeground: "oklch(0.556 0 0)",
        accent: "oklch(0.97 0 0)",
        accentForeground: "oklch(0.145 0 0)",
        destructive: "oklch(0.69 0.2 23.91)",
        destructiveForeground: "oklch(1 0 0)",
        border: "oklch(0.922 0 0)",
        input: "oklch(0.922 0 0)",
        ring: "oklch(0.646 0.28 41.116)",
        chart1: "oklch(0.646 0.28 41.116)",
        chart2: "oklch(0.7 0.19 48)",
        chart3: "oklch(0.77 0.2 131)",
        chart4: "oklch(0.68 0.15 237)",
        chart5: "oklch(0.66 0.21 354)",
        sidebar: "oklch(1 0 0)",
        sidebarForeground: "oklch(0.145 0 0)",
        sidebarPrimary: "oklch(0.646 0.28 41.116)",
        sidebarPrimaryForeground: "oklch(1 0 0)",
        sidebarAccent: "oklch(0.97 0 0)",
        sidebarAccentForeground: "oklch(0.145 0 0)",
        sidebarBorder: "oklch(0.922 0 0)",
        sidebarRing: "oklch(0.72 0 0)",
      },
      themeFonts.orbiter
    ),
    dark: buildThemeVariables(
      {
        background: "oklch(0 0 0)",
        foreground: "oklch(1 0 0)",
        card: "oklch(0.14 0 0)",
        cardForeground: "oklch(1 0 0)",
        popover: "oklch(0.18 0 0)",
        popoverForeground: "oklch(1 0 0)",
        primary: "oklch(0.646 0.28 41.116)",
        primaryForeground: "oklch(1 0 0)",
        secondary: "oklch(0.25 0 0)",
        secondaryForeground: "oklch(1 0 0)",
        muted: "oklch(0.23 0 0)",
        mutedForeground: "oklch(0.72 0 0)",
        accent: "oklch(0.25 0 0)",
        accentForeground: "oklch(1 0 0)",
        destructive: "oklch(0.69 0.2 23.91)",
        destructiveForeground: "oklch(0 0 0)",
        border: "oklch(0.26 0 0)",
        input: "oklch(0.32 0 0)",
        ring: "oklch(0.646 0.28 41.116)",
        chart1: "oklch(0.646 0.28 41.116)",
        chart2: "oklch(0.7 0.19 48)",
        chart3: "oklch(0.77 0.2 131)",
        chart4: "oklch(0.68 0.15 237)",
        chart5: "oklch(0.66 0.21 354)",
        sidebar: "oklch(0.18 0 0)",
        sidebarForeground: "oklch(1 0 0)",
        sidebarPrimary: "oklch(0.646 0.28 41.116)",
        sidebarPrimaryForeground: "oklch(1 0 0)",
        sidebarAccent: "oklch(0.32 0 0)",
        sidebarAccentForeground: "oklch(1 0 0)",
        sidebarBorder: "oklch(0.32 0 0)",
        sidebarRing: "oklch(0.72 0 0)",
      },
      themeFonts.orbiter
    ),
  },
  {
    name: "soft-orange",
    label: "Soft Orange",
    light: buildThemeVariables(
      {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.282 0.087 267.935)",
        card: "oklch(1 0 0)",
        cardForeground: "oklch(0.282 0.087 267.935)",
        popover: "oklch(1 0 0)",
        popoverForeground: "oklch(0.282 0.087 267.935)",
        primary: "oklch(0.677 0.203 40.381)",
        primaryForeground: "oklch(1 0 0)",
        secondary: "oklch(0.981 0.009 258.335)",
        secondaryForeground: "oklch(0.282 0.087 267.935)",
        muted: "oklch(0.984 0.003 247.858)",
        mutedForeground: "oklch(0.516 0.054 272.586)",
        accent: "oklch(0.968 0.007 247.896)",
        accentForeground: "oklch(0.282 0.087 267.935)",
        destructive: "oklch(0.69 0.2 23.91)",
        destructiveForeground: "oklch(1 0 0)",
        border: "oklch(0.929 0.013 255.508)",
        input: "oklch(0.929 0.013 255.508)",
        ring: "oklch(0.677 0.203 40.381 / 0.1)",
        chart1: "oklch(0.677 0.203 40.381)",
        chart2: "oklch(0.7 0.19 48)",
        chart3: "oklch(0.77 0.2 131)",
        chart4: "oklch(0.68 0.15 237)",
        chart5: "oklch(0.66 0.21 354)",
        sidebar: "oklch(0.984 0.003 247.858)",
        sidebarForeground: "oklch(0.282 0.087 267.935)",
        sidebarPrimary: "oklch(0.282 0.087 267.935)",
        sidebarPrimaryForeground: "oklch(1 0 0)",
        sidebarAccent: "oklch(0.968 0.007 247.896)",
        sidebarAccentForeground: "oklch(0.282 0.087 267.935)",
        sidebarBorder: "oklch(0.929 0.013 255.508)",
        sidebarRing: "oklch(0.929 0.013 255.508)",
      },
      themeFonts["soft-orange"],
      "purple",
      { color: "oklch(0.554 0.041 257.417)" }
    ),
    dark: buildThemeVariables(
      {
        background: "oklch(0.129 0.041 264.695)",
        foreground: "oklch(0.97 0.014 254.604)",
        card: "oklch(0.208 0.04 265.755)",
        cardForeground: "oklch(0.97 0.014 254.604)",
        popover: "oklch(0.279 0.037 260.031)",
        popoverForeground: "oklch(0.97 0.014 254.604)",
        primary: "oklch(0.677 0.203 40.381)",
        primaryForeground: "oklch(1 0 0)",
        secondary: "oklch(0.279 0.037 260.031)",
        secondaryForeground: "oklch(0.97 0.014 254.604)",
        muted: "oklch(0.279 0.037 260.031)",
        mutedForeground: "oklch(0.711 0.035 256.788)",
        accent: "oklch(0.279 0.037 260.031)",
        accentForeground: "oklch(0.984 0.003 247.858)",
        destructive: "oklch(0.711 0.166 22.216)",
        destructiveForeground: "oklch(0 0 0)",
        border: "oklch(1 0 0 / 0.1)",
        input: "oklch(1 0 0 / 0.15)",
        ring: "oklch(0.677 0.203 40.381 / 0.1)",
        chart1: "oklch(0.677 0.203 40.381)",
        chart2: "oklch(0.696 0.149 162.48)",
        chart3: "oklch(0.769 0.165 70.08)",
        chart4: "oklch(0.627 0.233 303.9)",
        chart5: "oklch(0.645 0.215 16.439)",
        sidebar: "oklch(0.208 0.04 265.755)",
        sidebarForeground: "oklch(0.97 0.014 254.604)",
        sidebarPrimary: "oklch(0.677 0.203 40.381)",
        sidebarPrimaryForeground: "oklch(1 0 0)",
        sidebarAccent: "oklch(0.279 0.037 260.031)",
        sidebarAccentForeground: "oklch(0.984 0.003 247.858)",
        sidebarBorder: "oklch(1 0 0 / 0.1)",
        sidebarRing: "oklch(0.446 0.037 257.281)",
      },
      themeFonts["soft-orange"]
    ),
  },
];

export function getTheme(name: ThemeName): Theme | undefined {
  return themes.find((t) => t.name === name);
}

export function getThemeRadius(themeName: ThemeName, isDark: boolean): string {
  const radiusObj = themeRadii[themeName];
  return isDark ? radiusObj.dark : radiusObj.light;
}

export function getThemeFonts(themeName: ThemeName): ThemeFonts {
  return themeFonts[themeName];
}

function isChrome(): boolean {
  if (typeof window === "undefined") return false;
  const userAgent = window.navigator.userAgent;
  return /Chrome/.test(userAgent) && !/Edg/.test(userAgent);
}

export function applyTheme(theme: Theme, isDark: boolean) {
  const root = document.documentElement;
  const variables = isDark ? theme.dark : theme.light;
  let radius = getThemeRadius(theme.name, isDark);

  if (!isChrome()) {
    radius = "0.625rem";
  }

  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  root.style.setProperty("--radius", radius);
}

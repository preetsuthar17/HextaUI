"use client";

import {
  Calendar,
  Clock,
  Eye,
  Globe,
  Hash,
  Keyboard,
  Languages,
  Layout,
  Loader2,
  Moon,
  Palette,
  Save,
  Sun,
  Type,
  Volume2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/new-york/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import { Separator } from "@/registry/new-york/ui/separator";
import { Switch } from "@/registry/new-york/ui/switch";

export interface PreferencesData {
  theme: "light" | "dark" | "system";
  accentColor?: string;
  fontSize: "small" | "medium" | "large";
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
  numberFormat: string;
  density: "compact" | "comfortable" | "spacious";
  animations: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  screenReaderAnnouncements: boolean;
  keyboardShortcuts: boolean;
}

export interface SettingsPreferencesProps {
  preferences?: PreferencesData;
  onSave?: (data: PreferencesData) => Promise<void>;
  className?: string;
}

const accentColors = [
  { value: "blue", label: "Blue", color: "bg-blue-500" },
  { value: "green", label: "Green", color: "bg-green-500" },
  { value: "purple", label: "Purple", color: "bg-purple-500" },
  { value: "orange", label: "Orange", color: "bg-orange-500" },
  { value: "red", label: "Red", color: "bg-red-500" },
  { value: "pink", label: "Pink", color: "bg-pink-500" },
];

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
  { value: "zh", label: "Chinese" },
];

const timezones = [
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "Europe/Paris", label: "Paris (CET)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
];

const dateFormats = [
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
  { value: "DD MMM YYYY", label: "DD MMM YYYY" },
];

const numberFormats = [
  { value: "1,234.56", label: "1,234.56 (US)" },
  { value: "1.234,56", label: "1.234,56 (EU)" },
  { value: "1 234,56", label: "1 234,56 (FR)" },
];

const defaultPreferences: PreferencesData = {
  theme: "system",
  accentColor: "blue",
  fontSize: "medium",
  language: "en",
  timezone: "UTC",
  dateFormat: "MM/DD/YYYY",
  timeFormat: "12h",
  numberFormat: "1,234.56",
  density: "comfortable",
  animations: true,
  reducedMotion: false,
  highContrast: false,
  screenReaderAnnouncements: true,
  keyboardShortcuts: true,
};

export default function SettingsPreferences({
  preferences = defaultPreferences,
  onSave,
  className,
}: SettingsPreferencesProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [localPreferences, setLocalPreferences] =
    useState<PreferencesData>(preferences);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave?.(localPreferences);
    } finally {
      setIsSaving(false);
    }
  };

  const updatePreference = <K extends keyof PreferencesData>(
    key: K,
    value: PreferencesData[K]
  ) => {
    setLocalPreferences((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <CardTitle className="wrap-break-word">Preferences</CardTitle>
            <CardDescription className="wrap-break-word">
              Customize your app experience and appearance
            </CardDescription>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button
              className="w-full sm:w-auto"
              disabled={isSaving}
              onClick={handleSave}
              type="button"
            >
              {isSaving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span className="whitespace-nowrap">Saving…</span>
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  <span className="whitespace-nowrap">Save Changes</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Appearance Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Palette className="size-5 text-muted-foreground" />
              <h3 className="font-semibold text-base">Appearance</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Theme Selection */}
              <div className="flex flex-col gap-4 rounded-lg border p-4 md:col-span-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Sun className="size-4" />
                  </div>
                  <FieldLabel className="mb-0">Theme</FieldLabel>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "light", label: "Light", icon: Sun },
                    { value: "dark", label: "Dark", icon: Moon },
                    { value: "system", label: "System", icon: Layout },
                  ].map((theme) => {
                    const Icon = theme.icon;
                    return (
                      <button
                        aria-label={`Select ${theme.label} theme`}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all",
                          localPreferences.theme === theme.value
                            ? "border-primary bg-primary/5"
                            : "border-muted hover:border-primary/50"
                        )}
                        key={theme.value}
                        onClick={() =>
                          updatePreference(
                            "theme",
                            theme.value as "light" | "dark" | "system"
                          )
                        }
                        type="button"
                      >
                        <Icon className="size-5" />
                        <span className="font-medium text-xs">
                          {theme.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accent Color */}
              <div className="flex flex-col gap-4 rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Palette className="size-4" />
                  </div>
                  <FieldLabel className="mb-0">Accent Color</FieldLabel>
                </div>
                <div className="flex flex-wrap gap-2">
                  {accentColors.map((color) => (
                    <button
                      aria-label={`Select ${color.label} accent color`}
                      className={cn(
                        "flex size-9 items-center justify-center rounded-full border-2 transition-all",
                        localPreferences.accentColor === color.value
                          ? "scale-110 border-primary ring-2 ring-primary/20"
                          : "border-muted hover:border-primary/50"
                      )}
                      key={color.value}
                      onClick={() =>
                        updatePreference("accentColor", color.value)
                      }
                      type="button"
                    >
                      <div className={cn("size-5 rounded-full", color.color)} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="flex flex-col gap-4 rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Type className="size-4" />
                  </div>
                  <FieldLabel className="mb-0" htmlFor="font-size">
                    Font Size
                  </FieldLabel>
                </div>
                <Select
                  onValueChange={(value: "small" | "medium" | "large") =>
                    updatePreference("fontSize", value)
                  }
                  value={localPreferences.fontSize}
                >
                  <SelectTrigger className="w-full" id="font-size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Density */}
              <div className="flex flex-col gap-4 rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Layout className="size-4" />
                  </div>
                  <FieldLabel className="mb-0" htmlFor="density">
                    Display Density
                  </FieldLabel>
                </div>
                <Select
                  onValueChange={(
                    value: "compact" | "comfortable" | "spacious"
                  ) => updatePreference("density", value)}
                  value={localPreferences.density}
                >
                  <SelectTrigger className="w-full" id="density">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Language & Region Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Globe className="size-5 text-muted-foreground" />
              <h3 className="font-semibold text-base">Language & Region</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Language */}
              <div className="flex flex-col gap-4 rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Languages className="size-4" />
                  </div>
                  <FieldLabel className="mb-0" htmlFor="language">
                    Language
                  </FieldLabel>
                </div>
                <Select
                  onValueChange={(value) => updatePreference("language", value)}
                  value={localPreferences.language}
                >
                  <SelectTrigger className="w-full" id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Timezone */}
              <div className="flex flex-col gap-4 rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Clock className="size-4" />
                  </div>
                  <FieldLabel className="mb-0" htmlFor="timezone">
                    Timezone
                  </FieldLabel>
                </div>
                <Select
                  onValueChange={(value) => updatePreference("timezone", value)}
                  value={localPreferences.timezone}
                >
                  <SelectTrigger className="w-full" id="timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Format */}
              <div className="flex flex-col gap-4 rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Calendar className="size-4" />
                  </div>
                  <FieldLabel className="mb-0" htmlFor="date-format">
                    Date Format
                  </FieldLabel>
                </div>
                <Select
                  onValueChange={(value) =>
                    updatePreference("dateFormat", value)
                  }
                  value={localPreferences.dateFormat}
                >
                  <SelectTrigger className="w-full" id="date-format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dateFormats.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time Format */}
              <div className="flex flex-col gap-4 rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Clock className="size-4" />
                  </div>
                  <FieldLabel className="mb-0" htmlFor="time-format">
                    Time Format
                  </FieldLabel>
                </div>
                <Select
                  onValueChange={(value: "12h" | "24h") =>
                    updatePreference("timeFormat", value)
                  }
                  value={localPreferences.timeFormat}
                >
                  <SelectTrigger className="w-full" id="time-format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                    <SelectItem value="24h">24-hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Number Format */}
              <div className="flex flex-col gap-4 rounded-lg border p-4 md:col-span-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Hash className="size-4" />
                  </div>
                  <FieldLabel className="mb-0" htmlFor="number-format">
                    Number Format
                  </FieldLabel>
                </div>
                <Select
                  onValueChange={(value) =>
                    updatePreference("numberFormat", value)
                  }
                  value={localPreferences.numberFormat}
                >
                  <SelectTrigger className="w-full" id="number-format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {numberFormats.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Accessibility Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Eye className="size-5 text-muted-foreground" />
            <h3 className="font-semibold text-base">Accessibility</h3>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Field>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Volume2 className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <FieldLabel className="mb-0" htmlFor="animations">
                      Animations
                    </FieldLabel>
                    <FieldDescription className="text-xs">
                      Smooth transitions
                    </FieldDescription>
                  </div>
                </div>
                <Switch
                  checked={localPreferences.animations}
                  id="animations"
                  onCheckedChange={(checked) =>
                    updatePreference("animations", checked)
                  }
                />
              </div>
            </Field>

            <Field>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Eye className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <FieldLabel className="mb-0" htmlFor="reduced-motion">
                      Reduced Motion
                    </FieldLabel>
                    <FieldDescription className="text-xs">
                      Respect system preference
                    </FieldDescription>
                  </div>
                </div>
                <Switch
                  checked={localPreferences.reducedMotion}
                  id="reduced-motion"
                  onCheckedChange={(checked) =>
                    updatePreference("reducedMotion", checked)
                  }
                />
              </div>
            </Field>

            <Field>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Eye className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <FieldLabel className="mb-0" htmlFor="high-contrast">
                      High Contrast
                    </FieldLabel>
                    <FieldDescription className="text-xs">
                      Better visibility
                    </FieldDescription>
                  </div>
                </div>
                <Switch
                  checked={localPreferences.highContrast}
                  id="high-contrast"
                  onCheckedChange={(checked) =>
                    updatePreference("highContrast", checked)
                  }
                />
              </div>
            </Field>

            <Field>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Volume2 className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <FieldLabel className="mb-0" htmlFor="screen-reader">
                      Screen Reader
                    </FieldLabel>
                    <FieldDescription className="text-xs">
                      Enable announcements
                    </FieldDescription>
                  </div>
                </div>
                <Switch
                  checked={localPreferences.screenReaderAnnouncements}
                  id="screen-reader"
                  onCheckedChange={(checked) =>
                    updatePreference("screenReaderAnnouncements", checked)
                  }
                />
              </div>
            </Field>

            <Field>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Keyboard className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <FieldLabel className="mb-0" htmlFor="keyboard-shortcuts">
                      Keyboard Shortcuts
                    </FieldLabel>
                    <FieldDescription className="text-xs">
                      Faster navigation
                    </FieldDescription>
                  </div>
                </div>
                <Switch
                  checked={localPreferences.keyboardShortcuts}
                  id="keyboard-shortcuts"
                  onCheckedChange={(checked) =>
                    updatePreference("keyboardShortcuts", checked)
                  }
                />
              </div>
            </Field>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

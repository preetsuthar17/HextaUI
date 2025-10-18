"use client";

import {
  AlertCircle,
  Bell,
  Check,
  Database,
  Download,
  Globe,
  HardDrive,
  Languages,
  Monitor,
  Moon,
  Palette,
  RefreshCw,
  Save,
  Settings,
  Shield,
  Smartphone,
  Sun,
  X,
  Zap,
} from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface GeneralData {
  appearance: {
    theme: string;
    accentColor: string;
    fontSize: string;
    compactMode: boolean;
    animations: boolean;
  };
  language: {
    interface: string;
    dateFormat: string;
    timeFormat: string;
    timezone: string;
  };
  privacy: {
    analytics: boolean;
    crashReports: boolean;
    usageData: boolean;
    marketing: boolean;
  };
  performance: {
    autoSave: boolean;
    autoSaveInterval: string;
    cacheSize: string;
    preloadContent: boolean;
  };
  advanced: {
    developerMode: boolean;
    experimentalFeatures: boolean;
    debugMode: boolean;
    hardwareAcceleration: boolean;
  };
}

interface GeneralSettingsProps {
  className?: string;
  onSave?: (data: GeneralData) => Promise<void>;
  onReset?: () => Promise<void>;
}

// Switch Field Component
function SwitchField({
  id,
  label,
  description,
  icon,
  checked,
  onCheckedChange,
  badge,
}: {
  id: string;
  label: string;
  description: string;
  icon?: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  badge?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {icon}
          <Label className="font-medium" htmlFor={id}>
            {label}
          </Label>
          {badge}
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <Switch
        aria-describedby={`${id}-description`}
        checked={checked}
        id={id}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}

// Conditional Field Component
function ConditionalField({
  condition,
  children,
}: {
  condition: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden={!condition}
      className={cn(
        "transition-all duration-200 ease-in-out",
        condition ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0"
      )}
    >
      {condition && children}
    </div>
  );
}

// Main General Settings Component
export default function GeneralSettings({
  className,
  onSave,
  onReset,
}: GeneralSettingsProps) {
  const [generalData, setGeneralData] = React.useState<GeneralData>({
    appearance: {
      theme: "system",
      accentColor: "blue",
      fontSize: "medium",
      compactMode: false,
      animations: true,
    },
    language: {
      interface: "en",
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12h",
      timezone: "UTC-5",
    },
    privacy: {
      analytics: true,
      crashReports: true,
      usageData: false,
      marketing: false,
    },
    performance: {
      autoSave: true,
      autoSaveInterval: "5min",
      cacheSize: "500MB",
      preloadContent: true,
    },
    advanced: {
      developerMode: false,
      experimentalFeatures: false,
      debugMode: false,
      hardwareAcceleration: true,
    },
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleNestedChange = (category: string, field: string, value: any) => {
    setGeneralData((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof GeneralData] as any),
        [field]: value,
      },
    }));
    setHasUnsavedChanges(true);

    // Clear error when user makes changes
    const errorKey = `${category}-${field}`;
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: "" }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onSave) {
        await onSave(generalData);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      setSaveSuccess(true);
      setHasUnsavedChanges(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setHasUnsavedChanges(false);
    setErrors({});
    // Reset to original data (in real app, you'd restore from initial state)
  };

  const handleResetToDefaults = async () => {
    try {
      if (onReset) {
        await onReset();
      }
      // Reset to default values
      setGeneralData({
        appearance: {
          theme: "system",
          accentColor: "blue",
          fontSize: "medium",
          compactMode: false,
          animations: true,
        },
        language: {
          interface: "en",
          dateFormat: "MM/DD/YYYY",
          timeFormat: "12h",
          timezone: "UTC-5",
        },
        privacy: {
          analytics: true,
          crashReports: true,
          usageData: false,
          marketing: false,
        },
        performance: {
          autoSave: true,
          autoSaveInterval: "5min",
          cacheSize: "500MB",
          preloadContent: true,
        },
        advanced: {
          developerMode: false,
          experimentalFeatures: false,
          debugMode: false,
          hardwareAcceleration: true,
        },
      });
      setHasUnsavedChanges(true);
    } catch (error) {
      console.error("Failed to reset settings:", error);
    }
  };

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  const accentColors = [
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "purple", label: "Purple" },
    { value: "orange", label: "Orange" },
    { value: "red", label: "Red" },
  ];

  const fontSizes = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
    { value: "xl", label: "Extra Large" },
  ];

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "it", label: "Italiano" },
    { value: "ja", label: "日本語" },
    { value: "ko", label: "한국어" },
    { value: "zh", label: "中文" },
  ];

  const dateFormats = [
    { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
    { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
    { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
    { value: "DD MMM YYYY", label: "DD MMM YYYY" },
  ];

  const timeFormats = [
    { value: "12h", label: "12 Hour (AM/PM)" },
    { value: "24h", label: "24 Hour" },
  ];

  const autoSaveIntervals = [
    { value: "1min", label: "Every minute" },
    { value: "5min", label: "Every 5 minutes" },
    { value: "10min", label: "Every 10 minutes" },
    { value: "30min", label: "Every 30 minutes" },
    { value: "never", label: "Manual only" },
  ];

  const cacheSizes = [
    { value: "100MB", label: "100 MB" },
    { value: "250MB", label: "250 MB" },
    { value: "500MB", label: "500 MB" },
    { value: "1GB", label: "1 GB" },
    { value: "2GB", label: "2 GB" },
  ];

  return (
    <div className={cn("mx-auto flex w-full flex-col gap-6", className)}>
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-3xl text-foreground">
            General Settings
          </h1>
          <p className="mt-1 text-muted-foreground">
            Customize your application preferences and behavior
          </p>
        </div>
      </header>

      {/* Appearance Settings */}
      <Card className="gap-6 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette aria-hidden="true" className="size-5" focusable="false" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize the look and feel of the application
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex w-full grow flex-col gap-2 sm:w-auto">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  onValueChange={(value) =>
                    handleNestedChange("appearance", "theme", value)
                  }
                  value={generalData.appearance.theme}
                >
                  <SelectTrigger className="w-full grow sm:w-auto">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((theme) => {
                      const Icon = theme.icon;
                      return (
                        <SelectItem key={theme.value} value={theme.value}>
                          <div className="flex items-center gap-2">
                            <Icon
                              aria-hidden="true"
                              className="size-4"
                              focusable="false"
                            />
                            {theme.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex w-full grow flex-col gap-2 sm:w-auto">
                <Label htmlFor="accentColor">Accent Color</Label>
                <Select
                  onValueChange={(value) =>
                    handleNestedChange("appearance", "accentColor", value)
                  }
                  value={generalData.appearance.accentColor}
                >
                  <SelectTrigger className="w-full grow sm:w-auto">
                    <SelectValue placeholder="Select accent color" />
                  </SelectTrigger>
                  <SelectContent>
                    {accentColors.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        {color.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex w-full grow flex-col gap-2 sm:w-auto">
                <Label htmlFor="fontSize">Font Size</Label>
                <Select
                  onValueChange={(value) =>
                    handleNestedChange("appearance", "fontSize", value)
                  }
                  value={generalData.appearance.fontSize}
                >
                  <SelectTrigger className="w-full grow sm:w-auto">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontSizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <SwitchField
              checked={generalData.appearance.compactMode}
              description="Reduce spacing and padding for a denser interface"
              icon={
                <Smartphone
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                  focusable="false"
                />
              }
              id="compactMode"
              label="Compact Mode"
              onCheckedChange={(checked) =>
                handleNestedChange("appearance", "compactMode", checked)
              }
            />

            <Separator />

            <SwitchField
              checked={generalData.appearance.animations}
              description="Enable smooth transitions and animations"
              icon={
                <Zap
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                  focusable="false"
                />
              }
              id="animations"
              label="Animations"
              onCheckedChange={(checked) =>
                handleNestedChange("appearance", "animations", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Language & Region Settings */}
      <Card className="gap-6 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages
              aria-hidden="true"
              className="size-5"
              focusable="false"
            />
            Language & Region
          </CardTitle>
          <CardDescription>
            Configure language, date, time, and regional preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex w-full grow flex-col gap-2 sm:w-auto">
                <Label htmlFor="interface">Interface Language</Label>
                <Select
                  onValueChange={(value) =>
                    handleNestedChange("language", "interface", value)
                  }
                  value={generalData.language.interface}
                >
                  <SelectTrigger className="w-full grow sm:w-auto">
                    <SelectValue placeholder="Select language" />
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

              <div className="flex w-full grow flex-col gap-2 sm:w-auto">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select
                  onValueChange={(value) =>
                    handleNestedChange("language", "dateFormat", value)
                  }
                  value={generalData.language.dateFormat}
                >
                  <SelectTrigger className="w-full grow sm:w-auto">
                    <SelectValue placeholder="Select date format" />
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

              <div className="flex w-full grow flex-col gap-2 sm:w-auto">
                <Label htmlFor="timeFormat">Time Format</Label>
                <Select
                  onValueChange={(value) =>
                    handleNestedChange("language", "timeFormat", value)
                  }
                  value={generalData.language.timeFormat}
                >
                  <SelectTrigger className="w-full grow sm:w-auto">
                    <SelectValue placeholder="Select time format" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeFormats.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex w-full grow flex-col gap-2 sm:w-auto">
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  onChange={(e) =>
                    handleNestedChange("language", "timezone", e.target.value)
                  }
                  placeholder="UTC-5"
                  value={generalData.language.timezone}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="gap-6 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield aria-hidden="true" className="size-5" focusable="false" />
            Privacy & Data
          </CardTitle>
          <CardDescription>
            Control what data is collected and how it's used
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <SwitchField
              checked={generalData.privacy.analytics}
              description="Help improve the app by sharing anonymous usage analytics"
              icon={
                <Database
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                  focusable="false"
                />
              }
              id="analytics"
              label="Analytics"
              onCheckedChange={(checked) =>
                handleNestedChange("privacy", "analytics", checked)
              }
            />

            <Separator />

            <SwitchField
              checked={generalData.privacy.crashReports}
              description="Automatically send crash reports to help fix bugs"
              icon={
                <AlertCircle
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                  focusable="false"
                />
              }
              id="crashReports"
              label="Crash Reports"
              onCheckedChange={(checked) =>
                handleNestedChange("privacy", "crashReports", checked)
              }
            />

            <Separator />

            <SwitchField
              checked={generalData.privacy.usageData}
              description="Share detailed usage patterns for product improvement"
              icon={
                <Globe
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                  focusable="false"
                />
              }
              id="usageData"
              label="Usage Data"
              onCheckedChange={(checked) =>
                handleNestedChange("privacy", "usageData", checked)
              }
            />

            <Separator />

            <SwitchField
              checked={generalData.privacy.marketing}
              description="Receive product updates and promotional content"
              icon={
                <Bell
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                  focusable="false"
                />
              }
              id="marketing"
              label="Marketing Communications"
              onCheckedChange={(checked) =>
                handleNestedChange("privacy", "marketing", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Performance Settings */}
      <Card className="gap-6 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap aria-hidden="true" className="size-5" focusable="false" />
            Performance
          </CardTitle>
          <CardDescription>
            Optimize application performance and resource usage
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <SwitchField
              checked={generalData.performance.autoSave}
              description="Automatically save your work at regular intervals"
              icon={
                <Save
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                  focusable="false"
                />
              }
              id="autoSave"
              label="Auto Save"
              onCheckedChange={(checked) =>
                handleNestedChange("performance", "autoSave", checked)
              }
            />

            <ConditionalField condition={generalData.performance.autoSave}>
              <div className="flex flex-col gap-2">
                <Label htmlFor="autoSaveInterval">Auto Save Interval</Label>
                <Select
                  onValueChange={(value) =>
                    handleNestedChange("performance", "autoSaveInterval", value)
                  }
                  value={generalData.performance.autoSaveInterval}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select interval" />
                  </SelectTrigger>
                  <SelectContent>
                    {autoSaveIntervals.map((interval) => (
                      <SelectItem key={interval.value} value={interval.value}>
                        {interval.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </ConditionalField>

            <Separator />

            <div className="flex flex-col gap-2">
              <Label htmlFor="cacheSize">Cache Size</Label>
              <Select
                onValueChange={(value) =>
                  handleNestedChange("performance", "cacheSize", value)
                }
                value={generalData.performance.cacheSize}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cache size" />
                </SelectTrigger>
                <SelectContent>
                  {cacheSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <SwitchField
              checked={generalData.performance.preloadContent}
              description="Download content in advance for faster loading"
              icon={
                <Download
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                  focusable="false"
                />
              }
              id="preloadContent"
              label="Preload Content"
              onCheckedChange={(checked) =>
                handleNestedChange("performance", "preloadContent", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card className="gap-6 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings aria-hidden="true" className="size-5" focusable="false" />
            Advanced
          </CardTitle>
          <CardDescription>
            Advanced settings for power users and developers
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <SwitchField
              badge={
                <Badge className="text-xs" variant="secondary">
                  Advanced
                </Badge>
              }
              checked={generalData.advanced.developerMode}
              description="Enable advanced debugging and development tools"
              icon={
                <Settings
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                  focusable="false"
                />
              }
              id="developerMode"
              label="Developer Mode"
              onCheckedChange={(checked) =>
                handleNestedChange("advanced", "developerMode", checked)
              }
            />

            <Separator />

            <SwitchField
              badge={
                <Badge className="text-xs" variant="destructive">
                  Beta
                </Badge>
              }
              checked={generalData.advanced.experimentalFeatures}
              description="Try out new features before they're officially released"
              icon={
                <RefreshCw
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                  focusable="false"
                />
              }
              id="experimentalFeatures"
              label="Experimental Features"
              onCheckedChange={(checked) =>
                handleNestedChange("advanced", "experimentalFeatures", checked)
              }
            />

            <Separator />

            <SwitchField
              checked={generalData.advanced.debugMode}
              description="Show detailed logging and error information"
              icon={
                <AlertCircle
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                  focusable="false"
                />
              }
              id="debugMode"
              label="Debug Mode"
              onCheckedChange={(checked) =>
                handleNestedChange("advanced", "debugMode", checked)
              }
            />

            <Separator />

            <SwitchField
              checked={generalData.advanced.hardwareAcceleration}
              description="Use GPU acceleration for better performance"
              icon={
                <HardDrive
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                  focusable="false"
                />
              }
              id="hardwareAcceleration"
              label="Hardware Acceleration"
              onCheckedChange={(checked) =>
                handleNestedChange("advanced", "hardwareAcceleration", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="gap-6 shadow-none">
        <CardFooter className="flex flex-col gap-3 sm:flex-row">
          <div className="flex w-full flex-wrap gap-3">
            <Button
              className="w-full sm:w-auto"
              disabled={!hasUnsavedChanges || isSaving}
              onClick={handleSave}
              type="button"
            >
              {isSaving ? (
                <>
                  <Settings
                    aria-hidden="true"
                    className="size-4"
                    focusable="false"
                  />
                  Saving…
                </>
              ) : saveSuccess ? (
                <>
                  <Check
                    aria-hidden="true"
                    className="size-4"
                    focusable="false"
                  />
                  Saved!
                </>
              ) : (
                <>
                  <Save
                    aria-hidden="true"
                    className="size-4"
                    focusable="false"
                  />
                  Save Changes
                </>
              )}
            </Button>

            {hasUnsavedChanges && (
              <Button
                className="w-full sm:w-auto"
                onClick={handleCancel}
                type="button"
                variant="outline"
              >
                <X aria-hidden="true" className="size-4" focusable="false" />
                Cancel
              </Button>
            )}

            <Button
              className="w-full sm:w-auto"
              onClick={handleResetToDefaults}
              type="button"
              variant="outline"
            >
              <RefreshCw
                aria-hidden="true"
                className="size-4"
                focusable="false"
              />
              Reset to Defaults
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

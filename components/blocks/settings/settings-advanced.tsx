"use client";

import {
  Code,
  Database,
  Loader2,
  Save,
  Settings,
  TestTube,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldDescription, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
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

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  experimental?: boolean;
}

export interface SettingsAdvancedProps {
  featureFlags?: FeatureFlag[];
  debugMode?: boolean;
  apiRateLimit?: number;
  loggingLevel?: "error" | "warn" | "info" | "debug";
  onToggleFeature?: (id: string, enabled: boolean) => Promise<void>;
  onUpdateSettings?: (settings: {
    debugMode?: boolean;
    apiRateLimit?: number;
    loggingLevel?: "error" | "warn" | "info" | "debug";
  }) => Promise<void>;
  onClearCache?: () => Promise<void>;
  className?: string;
}

export default function SettingsAdvanced({
  featureFlags = [],
  debugMode = false,
  apiRateLimit = 1000,
  loggingLevel = "info",
  onToggleFeature,
  onUpdateSettings,
  onClearCache,
  className,
}: SettingsAdvancedProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [localSettings, setLocalSettings] = useState({
    debugMode,
    apiRateLimit,
    loggingLevel,
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdateSettings?.(localSettings);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <CardTitle className="wrap-break-word">Advanced Settings</CardTitle>
            <CardDescription className="wrap-break-word">
              Developer tools and experimental features
            </CardDescription>
          </div>
          <Button
            className="w-full sm:w-auto"
            disabled={isSaving}
            onClick={handleSave}
            type="button"
          >
            {isSaving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {/* Developer Settings */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  <Code className="size-4" />
                </div>
                <FieldLabel className="mb-0">Debug Mode</FieldLabel>
              </div>
              <div className="flex items-center justify-between">
                <FieldDescription>
                  Enable debug logging and diagnostics
                </FieldDescription>
                <Switch
                  checked={localSettings.debugMode}
                  onCheckedChange={(checked) =>
                    setLocalSettings((prev) => ({
                      ...prev,
                      debugMode: checked,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  <Settings className="size-4" />
                </div>
                <FieldLabel className="mb-0" htmlFor="logging-level">
                  Logging Level
                </FieldLabel>
              </div>
              <Select
                onValueChange={(value: "error" | "warn" | "info" | "debug") =>
                  setLocalSettings((prev) => ({ ...prev, loggingLevel: value }))
                }
                value={localSettings.loggingLevel}
              >
                <SelectTrigger id="logging-level">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="warn">Warning</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="debug">Debug</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  <Database className="size-4" />
                </div>
                <FieldLabel className="mb-0" htmlFor="rate-limit">
                  API Rate Limit
                </FieldLabel>
              </div>
              <InputGroup>
                <InputGroupInput
                  id="rate-limit"
                  onChange={(e) =>
                    setLocalSettings((prev) => ({
                      ...prev,
                      apiRateLimit: Number.parseInt(e.target.value) || 1000,
                    }))
                  }
                  type="number"
                  value={localSettings.apiRateLimit}
                />
              </InputGroup>
              <FieldDescription>Requests per hour</FieldDescription>
            </div>
          </div>

          <Separator />

          {/* Feature Flags */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <TestTube className="size-5 text-muted-foreground" />
              <h3 className="font-semibold text-base">Feature Flags</h3>
            </div>
            {featureFlags.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No feature flags available
              </p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {featureFlags.map((flag) => (
                  <div
                    className="flex items-center justify-between rounded-lg border p-4"
                    key={flag.id}
                  >
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{flag.name}</span>
                        {flag.experimental && (
                          <Badge className="text-xs" variant="secondary">
                            Experimental
                          </Badge>
                        )}
                      </div>
                      <FieldDescription className="text-xs">
                        {flag.description}
                      </FieldDescription>
                    </div>
                    <Switch
                      checked={flag.enabled}
                      onCheckedChange={(checked) =>
                        onToggleFeature?.(flag.id, checked)
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Cache Management */}
          <div className="flex flex-col gap-4 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                <Trash2 className="size-4" />
              </div>
              <FieldLabel className="mb-0">Cache Management</FieldLabel>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-full sm:w-auto"
                  type="button"
                  variant="outline"
                >
                  <Trash2 className="size-4" />
                  Clear Cache
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Cache?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will clear all cached data. The application may be
                    slower on the next load as it rebuilds the cache.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onClearCache}>
                    Clear Cache
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <FieldDescription>
              Clear cached data to free up memory and refresh content
            </FieldDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

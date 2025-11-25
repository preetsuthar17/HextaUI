"use client";

import {
  Bell,
  Loader2,
  Mail,
  MessageSquare,
  Save,
  Smartphone,
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
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/registry/new-york/ui/field";
import {
  InputGroup,
  InputGroupInput,
} from "@/registry/new-york/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import { Separator } from "@/registry/new-york/ui/separator";
import { Switch } from "@/registry/new-york/ui/switch";

export interface NotificationChannel {
  email: boolean;
  push: boolean;
  inApp: boolean;
  sms: boolean;
}

export interface NotificationCategory {
  id: string;
  name: string;
  description: string;
  channels: NotificationChannel;
  frequency?: "realtime" | "digest-daily" | "digest-weekly" | "off";
}

export interface NotificationPreferences {
  categories: NotificationCategory[];
  quietHoursEnabled: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
}

export interface SettingsNotificationsProps {
  preferences?: NotificationPreferences;
  onSave?: (data: NotificationPreferences) => Promise<void>;
  className?: string;
}

const defaultCategories: NotificationCategory[] = [
  {
    id: "mentions",
    name: "Mentions",
    description: "When someone mentions you",
    channels: { email: true, push: true, inApp: true, sms: false },
    frequency: "realtime",
  },
  {
    id: "replies",
    name: "Replies",
    description: "When someone replies to your messages",
    channels: { email: true, push: true, inApp: true, sms: false },
    frequency: "realtime",
  },
  {
    id: "system",
    name: "System Alerts",
    description: "Important system notifications",
    channels: { email: true, push: true, inApp: true, sms: true },
    frequency: "realtime",
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Promotional emails and updates",
    channels: { email: true, push: false, inApp: false, sms: false },
    frequency: "digest-weekly",
  },
  {
    id: "security",
    name: "Security",
    description: "Security alerts and login notifications",
    channels: { email: true, push: true, inApp: true, sms: true },
    frequency: "realtime",
  },
];

const defaultPreferences: NotificationPreferences = {
  categories: defaultCategories,
  quietHoursEnabled: false,
  quietHoursStart: "22:00",
  quietHoursEnd: "08:00",
};

export default function SettingsNotifications({
  preferences = defaultPreferences,
  onSave,
  className,
}: SettingsNotificationsProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [localPreferences, setLocalPreferences] =
    useState<NotificationPreferences>(preferences);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave?.(localPreferences);
    } finally {
      setIsSaving(false);
    }
  };

  const updateCategoryChannel = (
    categoryId: string,
    channel: keyof NotificationChannel,
    enabled: boolean
  ) => {
    setLocalPreferences((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              channels: { ...cat.channels, [channel]: enabled },
            }
          : cat
      ),
    }));
  };

  const updateCategoryFrequency = (
    categoryId: string,
    frequency: "realtime" | "digest-daily" | "digest-weekly" | "off"
  ) => {
    setLocalPreferences((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.id === categoryId ? { ...cat, frequency } : cat
      ),
    }));
  };

  const getFrequencyLabel = (
    frequency?: "realtime" | "digest-daily" | "digest-weekly" | "off"
  ) => {
    switch (frequency) {
      case "realtime":
        return "Real-time";
      case "digest-daily":
        return "Daily Digest";
      case "digest-weekly":
        return "Weekly Digest";
      case "off":
        return "Off";
      default:
        return "Real-time";
    }
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <CardTitle className="wrap-break-word">
              Notification Preferences
            </CardTitle>
            <CardDescription className="wrap-break-word">
              Manage how and when you receive notifications
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
        <div className="flex flex-col gap-6">
          {/* Notification Categories */}
          <div className="flex flex-col gap-4">
            {localPreferences.categories.map((category) => (
              <div
                className="flex flex-col gap-4 rounded-lg border p-4"
                key={category.id}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <h4 className="font-medium text-sm">{category.name}</h4>
                      <p className="text-muted-foreground text-xs">
                        {category.description}
                      </p>
                    </div>
                    <Select
                      onValueChange={(
                        value:
                          | "realtime"
                          | "digest-daily"
                          | "digest-weekly"
                          | "off"
                      ) => updateCategoryFrequency(category.id, value)}
                      value={category.frequency ?? "realtime"}
                    >
                      <SelectTrigger className="w-full shrink-0 sm:w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="digest-daily">
                          Daily Digest
                        </SelectItem>
                        <SelectItem value="digest-weekly">
                          Weekly Digest
                        </SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col gap-3">
                  <Field>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="size-4 text-muted-foreground" />
                        <FieldLabel htmlFor={`${category.id}-email`}>
                          Email
                        </FieldLabel>
                      </div>
                      <Switch
                        checked={category.channels.email}
                        id={`${category.id}-email`}
                        onCheckedChange={(checked) =>
                          updateCategoryChannel(category.id, "email", checked)
                        }
                      />
                    </div>
                  </Field>

                  <Field>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="size-4 text-muted-foreground" />
                        <FieldLabel htmlFor={`${category.id}-push`}>
                          Push
                        </FieldLabel>
                      </div>
                      <Switch
                        checked={category.channels.push}
                        id={`${category.id}-push`}
                        onCheckedChange={(checked) =>
                          updateCategoryChannel(category.id, "push", checked)
                        }
                      />
                    </div>
                  </Field>

                  <Field>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="size-4 text-muted-foreground" />
                        <FieldLabel htmlFor={`${category.id}-inapp`}>
                          In-App
                        </FieldLabel>
                      </div>
                      <Switch
                        checked={category.channels.inApp}
                        id={`${category.id}-inapp`}
                        onCheckedChange={(checked) =>
                          updateCategoryChannel(category.id, "inApp", checked)
                        }
                      />
                    </div>
                  </Field>

                  <Field>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="size-4 text-muted-foreground" />
                        <FieldLabel htmlFor={`${category.id}-sms`}>
                          SMS
                        </FieldLabel>
                      </div>
                      <Switch
                        checked={category.channels.sms}
                        id={`${category.id}-sms`}
                        onCheckedChange={(checked) =>
                          updateCategoryChannel(category.id, "sms", checked)
                        }
                      />
                    </div>
                  </Field>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Quiet Hours */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-base">Quiet Hours</h3>
            <Field>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <FieldLabel htmlFor="quiet-hours">
                    Enable Quiet Hours
                  </FieldLabel>
                  <FieldDescription>
                    Pause non-urgent notifications during these hours
                  </FieldDescription>
                </div>
                <Switch
                  checked={localPreferences.quietHoursEnabled}
                  id="quiet-hours"
                  onCheckedChange={(checked) =>
                    setLocalPreferences((prev) => ({
                      ...prev,
                      quietHoursEnabled: checked,
                    }))
                  }
                />
              </div>
            </Field>

            {localPreferences.quietHoursEnabled && (
              <div className="flex flex-col gap-4 rounded-lg border bg-muted/30 p-4">
                <Field>
                  <FieldLabel htmlFor="quiet-start">Start Time</FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="quiet-start"
                        onChange={(e) =>
                          setLocalPreferences((prev) => ({
                            ...prev,
                            quietHoursStart: e.target.value,
                          }))
                        }
                        type="time"
                        value={localPreferences.quietHoursStart || "22:00"}
                      />
                    </InputGroup>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="quiet-end">End Time</FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="quiet-end"
                        onChange={(e) =>
                          setLocalPreferences((prev) => ({
                            ...prev,
                            quietHoursEnd: e.target.value,
                          }))
                        }
                        type="time"
                        value={localPreferences.quietHoursEnd || "08:00"}
                      />
                    </InputGroup>
                  </FieldContent>
                </Field>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

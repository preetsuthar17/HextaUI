"use client";

import {
  Bell,
  Check,
  Mail,
  Moon,
  Save,
  Settings,
  Smartphone,
  X,
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

interface NotificationData {
  email: {
    enabled: boolean;
    frequency: string;
    marketing: boolean;
    productUpdates: boolean;
    securityAlerts: boolean;
    weeklyDigest: boolean;
    comments: boolean;
    mentions: boolean;
  };
  push: {
    mobile: boolean;
    desktop: boolean;
    marketing: boolean;
    comments: boolean;
    mentions: boolean;
    directMessages: boolean;
  };
  inApp: {
    enabled: boolean;
    comments: boolean;
    mentions: boolean;
    likes: boolean;
    followers: boolean;
    directMessages: boolean;
  };
  channels: {
    email: boolean;
    sms: boolean;
    inApp: boolean;
  };
  quietHours: {
    enabled: boolean;
    startTime: string;
    endTime: string;
    weekends: boolean;
  };
  preferences: {
    frequency: string;
    emailFormat: string;
    soundEnabled: boolean;
    vibrationEnabled: boolean;
  };
}

interface NotificationSettingsProps {
  className?: string;
  onSave?: (data: NotificationData) => Promise<void>;
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
  disabled = false,
}: {
  id: string;
  label: string;
  description: string;
  icon?: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  badge?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {icon}
          <Label className="font-medium" htmlFor={id}>
            {label}
          </Label>
        </div>
        <p className="text-muted-foreground text-sm" id={`${id}-description`}>
          {description}
        </p>
      </div>
      <Switch
        aria-describedby={`${id}-description`}
        aria-label={`${label}: ${description}`}
        checked={checked}
        disabled={disabled}
        id={id}
        onCheckedChange={onCheckedChange}
        role="switch"
        tabIndex={0}
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
      className={condition ? "block" : "hidden"}
      role="region"
    >
      {condition && children}
    </div>
  );
}

export default function NotificationSettings({
  className,
  onSave,
  onReset,
}: NotificationSettingsProps) {
  const [notificationData, setNotificationData] =
    React.useState<NotificationData>({
      email: {
        enabled: true,
        frequency: "immediate",
        marketing: false,
        productUpdates: true,
        securityAlerts: true,
        weeklyDigest: true,
        comments: true,
        mentions: true,
      },
      push: {
        mobile: true,
        desktop: true,
        marketing: false,
        comments: true,
        mentions: true,
        directMessages: true,
      },
      inApp: {
        enabled: true,
        comments: true,
        mentions: true,
        likes: true,
        followers: true,
        directMessages: true,
      },
      channels: {
        email: true,
        sms: false,
        inApp: true,
      },
      quietHours: {
        enabled: false,
        startTime: "22:00",
        endTime: "08:00",
        weekends: false,
      },
      preferences: {
        frequency: "immediate",
        emailFormat: "html",
        soundEnabled: true,
        vibrationEnabled: true,
      },
    });

  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // Keyboard navigation support
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" && hasUnsavedChanges) {
      handleCancel();
    }
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      if (hasUnsavedChanges && !isSaving) {
        handleSave();
      }
    }
  };

  const handleNestedChange = (
    category: keyof NotificationData,
    field: string,
    value: any
  ) => {
    setNotificationData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
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
        await onSave(notificationData);
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
      setNotificationData({
        email: {
          enabled: true,
          frequency: "immediate",
          marketing: false,
          productUpdates: true,
          securityAlerts: true,
          weeklyDigest: true,
          comments: true,
          mentions: true,
        },
        push: {
          mobile: true,
          desktop: true,
          marketing: false,
          comments: true,
          mentions: true,
          directMessages: true,
        },
        inApp: {
          enabled: true,
          comments: true,
          mentions: true,
          likes: true,
          followers: true,
          directMessages: true,
        },
        channels: {
          email: true,
          sms: false,
          inApp: true,
        },
        quietHours: {
          enabled: false,
          startTime: "22:00",
          endTime: "08:00",
          weekends: false,
        },
        preferences: {
          frequency: "immediate",
          emailFormat: "html",
          soundEnabled: true,
          vibrationEnabled: true,
        },
      });
      setHasUnsavedChanges(true);
    } catch (error) {
      console.error("Failed to reset settings:", error);
    }
  };

  const frequencies = [
    { value: "immediate", label: "Immediate" },
    { value: "hourly", label: "Hourly" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
  ];

  const emailFormats = [
    { value: "html", label: "HTML" },
    { value: "text", label: "Plain Text" },
  ];

  return (
    <main
      aria-label="Notification settings"
      className={cn("mx-auto flex w-full flex-col gap-8", className)}
      onKeyDown={handleKeyDown}
      role="main"
      tabIndex={-1}
    >
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-3xl text-foreground">
            Notification Settings
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage how and when you receive notifications
          </p>
        </div>
      </header>

      {/* Email Notifications */}
      <Card className="gap-6 p-4 shadow-none md:p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <Mail aria-hidden="true" className="size-5" focusable="false" />
            Email Notifications
          </CardTitle>
          <CardDescription>
            Configure email notification preferences and frequency
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col gap-6">
            <SwitchField
              checked={notificationData.email.enabled}
              description="Receive notifications via email"
              id="email-enabled"
              label="Enable Email Notifications"
              onCheckedChange={(checked) =>
                handleNestedChange("email", "enabled", checked)
              }
            />

            <ConditionalField condition={notificationData.email.enabled}>
              <div className="ml-3flex flex-col gap-6 border-muted border-l-2 pl-5">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="email-frequency">Email Frequency</Label>
                  <p
                    className="text-muted-foreground text-sm"
                    id="email-frequency-description"
                  >
                    Choose how often you want to receive email notifications
                  </p>
                  <Select
                    onValueChange={(value) =>
                      handleNestedChange("email", "frequency", value)
                    }
                    value={notificationData.email.frequency}
                  >
                    <SelectTrigger
                      aria-describedby="email-frequency-description"
                      aria-label="Select email notification frequency"
                      id="email-frequency"
                    >
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {frequencies.map((freq) => (
                        <SelectItem key={freq.value} value={freq.value}>
                          {freq.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex flex-col gap-6">
                  <SwitchField
                    checked={notificationData.email.marketing}
                    description="News, feature announcements, and special offers"
                    id="email-marketing"
                    label="Marketing & Promotions"
                    onCheckedChange={(checked) =>
                      handleNestedChange("email", "marketing", checked)
                    }
                  />

                  <SwitchField
                    checked={notificationData.email.productUpdates}
                    description="New features, improvements, and bug fixes"
                    id="email-productUpdates"
                    label="Product Updates"
                    onCheckedChange={(checked) =>
                      handleNestedChange("email", "productUpdates", checked)
                    }
                  />

                  <SwitchField
                    badge={
                      <Badge className="text-xs" variant="secondary">
                        Required
                      </Badge>
                    }
                    checked={notificationData.email.securityAlerts}
                    description="Account security and login notifications"
                    disabled={true}
                    id="email-securityAlerts"
                    label="Security Alerts"
                    onCheckedChange={(checked) =>
                      handleNestedChange("email", "securityAlerts", checked)
                    }
                  />

                  <SwitchField
                    badge={
                      <Badge className="text-xs" variant="secondary">
                        Recommended
                      </Badge>
                    }
                    checked={notificationData.email.weeklyDigest}
                    description="Weekly summary of your activity and updates"
                    id="email-weeklyDigest"
                    label="Weekly Digest"
                    onCheckedChange={(checked) =>
                      handleNestedChange("email", "weeklyDigest", checked)
                    }
                  />

                  <SwitchField
                    checked={notificationData.email.comments}
                    description="When someone comments on your posts"
                    id="email-comments"
                    label="Comments & Replies"
                    onCheckedChange={(checked) =>
                      handleNestedChange("email", "comments", checked)
                    }
                  />

                  <SwitchField
                    checked={notificationData.email.mentions}
                    description="When someone mentions you in a comment or post"
                    id="email-mentions"
                    label="Mentions"
                    onCheckedChange={(checked) =>
                      handleNestedChange("email", "mentions", checked)
                    }
                  />
                </div>
              </div>
            </ConditionalField>
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card className="gap-6 p-4 shadow-none md:p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <Smartphone
              aria-hidden="true"
              className="size-5"
              focusable="false"
            />
            Push Notifications
          </CardTitle>
          <CardDescription>
            Configure push notifications for mobile and desktop devices
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col gap-6">
            <SwitchField
              checked={notificationData.push.mobile}
              description="Receive notifications on your mobile device"
              id="push-mobile"
              label="Mobile Push Notifications"
              onCheckedChange={(checked) =>
                handleNestedChange("push", "mobile", checked)
              }
            />

            <SwitchField
              checked={notificationData.push.desktop}
              description="Receive notifications on your desktop"
              id="push-desktop"
              label="Desktop Push Notifications"
              onCheckedChange={(checked) =>
                handleNestedChange("push", "desktop", checked)
              }
            />

            <ConditionalField
              condition={
                notificationData.push.mobile || notificationData.push.desktop
              }
            >
              <div className="ml-3flex flex-col gap-6 border-muted border-l-2 pl-5">
                <div className="flex flex-col gap-6">
                  <SwitchField
                    checked={notificationData.push.marketing}
                    description="Special offers and announcements"
                    id="push-marketing"
                    label="Marketing & Promotions"
                    onCheckedChange={(checked) =>
                      handleNestedChange("push", "marketing", checked)
                    }
                  />

                  <SwitchField
                    checked={notificationData.push.comments}
                    description="When someone interacts with your content"
                    id="push-comments"
                    label="Comments & Mentions"
                    onCheckedChange={(checked) =>
                      handleNestedChange("push", "comments", checked)
                    }
                  />

                  <SwitchField
                    checked={notificationData.push.mentions}
                    description="When someone mentions you"
                    id="push-mentions"
                    label="Mentions"
                    onCheckedChange={(checked) =>
                      handleNestedChange("push", "mentions", checked)
                    }
                  />

                  <SwitchField
                    checked={notificationData.push.directMessages}
                    description="Private messages from other users"
                    id="push-directMessages"
                    label="Direct Messages"
                    onCheckedChange={(checked) =>
                      handleNestedChange("push", "directMessages", checked)
                    }
                  />
                </div>
              </div>
            </ConditionalField>
          </div>
        </CardContent>
      </Card>

      {/* In-App Notifications */}
      <Card className="gap-6 p-4 shadow-none md:p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <Bell aria-hidden="true" className="size-5" focusable="false" />
            In-App Notifications
          </CardTitle>
          <CardDescription>
            Control notifications within the application
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col gap-6">
            <SwitchField
              checked={notificationData.inApp.enabled}
              description="Show notifications within the application"
              id="inApp-enabled"
              label="Enable In-App Notifications"
              onCheckedChange={(checked) =>
                handleNestedChange("inApp", "enabled", checked)
              }
            />

            <ConditionalField condition={notificationData.inApp.enabled}>
              <div className="ml-3flex flex-col gap-6 border-muted border-l-2 pl-5">
                <div className="flex flex-col gap-6">
                  <SwitchField
                    checked={notificationData.inApp.comments}
                    description="When someone comments on your posts"
                    id="inApp-comments"
                    label="Comments & Replies"
                    onCheckedChange={(checked) =>
                      handleNestedChange("inApp", "comments", checked)
                    }
                  />

                  <SwitchField
                    checked={notificationData.inApp.mentions}
                    description="When someone mentions you"
                    id="inApp-mentions"
                    label="Mentions"
                    onCheckedChange={(checked) =>
                      handleNestedChange("inApp", "mentions", checked)
                    }
                  />

                  <SwitchField
                    checked={notificationData.inApp.likes}
                    description="When someone likes your content"
                    id="inApp-likes"
                    label="Likes & Reactions"
                    onCheckedChange={(checked) =>
                      handleNestedChange("inApp", "likes", checked)
                    }
                  />

                  <SwitchField
                    checked={notificationData.inApp.followers}
                    description="When someone follows you"
                    id="inApp-followers"
                    label="New Followers"
                    onCheckedChange={(checked) =>
                      handleNestedChange("inApp", "followers", checked)
                    }
                  />

                  <SwitchField
                    checked={notificationData.inApp.directMessages}
                    description="Private messages from other users"
                    id="inApp-directMessages"
                    label="Direct Messages"
                    onCheckedChange={(checked) =>
                      handleNestedChange("inApp", "directMessages", checked)
                    }
                  />
                </div>
              </div>
            </ConditionalField>
          </div>
        </CardContent>
      </Card>

      {/* Notification Channels */}
      <Card className="gap-6 p-4 shadow-none md:p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <Settings aria-hidden="true" className="size-5" focusable="false" />
            Notification Channels
          </CardTitle>
          <CardDescription>
            Choose your preferred notification delivery methods
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col gap-6">
            <SwitchField
              checked={notificationData.channels.email}
              description="Receive notifications via email"
              id="channel-email"
              label="Email Notifications"
              onCheckedChange={(checked) =>
                handleNestedChange("channels", "email", checked)
              }
            />

            <SwitchField
              checked={notificationData.channels.sms}
              description="Receive notifications via text message"
              id="channel-sms"
              label="SMS Notifications"
              onCheckedChange={(checked) =>
                handleNestedChange("channels", "sms", checked)
              }
            />

            <SwitchField
              checked={notificationData.channels.inApp}
              description="Receive notifications within the application"
              id="channel-inApp"
              label="In-App Notifications"
              onCheckedChange={(checked) =>
                handleNestedChange("channels", "inApp", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card className="gap-6 p-4 shadow-none md:p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <Moon aria-hidden="true" className="size-5" focusable="false" />
            Quiet Hours
          </CardTitle>
          <CardDescription>
            Set specific times when you don't want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col gap-6">
            <SwitchField
              checked={notificationData.quietHours.enabled}
              description="Pause non-urgent notifications during specified hours"
              id="quietHours-enabled"
              label="Enable Quiet Hours"
              onCheckedChange={(checked) =>
                handleNestedChange("quietHours", "enabled", checked)
              }
            />

            <ConditionalField condition={notificationData.quietHours.enabled}>
              <div className="ml-3flex flex-col gap-6 border-muted border-l-2 pl-5">
                <div className="flex flex-wrap gap-4">
                  <div className="flex w-full grow flex-col gap-3 sm:w-auto">
                    <Label htmlFor="quietStart">Start Time</Label>
                    <Input
                      aria-describedby="quietStart-description"
                      aria-label="Quiet hours start time"
                      id="quietStart"
                      onChange={(e) =>
                        handleNestedChange(
                          "quietHours",
                          "startTime",
                          e.target.value
                        )
                      }
                      type="time"
                      value={notificationData.quietHours.startTime}
                    />
                    <p
                      className="text-muted-foreground text-sm"
                      id="quietStart-description"
                    >
                      Time when quiet hours begin
                    </p>
                  </div>
                  <div className="flex w-full grow flex-col gap-3 sm:w-auto">
                    <Label htmlFor="quietEnd">End Time</Label>
                    <Input
                      aria-describedby="quietEnd-description"
                      aria-label="Quiet hours end time"
                      id="quietEnd"
                      onChange={(e) =>
                        handleNestedChange(
                          "quietHours",
                          "endTime",
                          e.target.value
                        )
                      }
                      type="time"
                      value={notificationData.quietHours.endTime}
                    />
                    <p
                      className="text-muted-foreground text-sm"
                      id="quietEnd-description"
                    >
                      Time when quiet hours end
                    </p>
                  </div>
                </div>

                <SwitchField
                  checked={notificationData.quietHours.weekends}
                  description="Apply quiet hours to weekends as well"
                  id="quietHours-weekends"
                  label="Include Weekends"
                  onCheckedChange={(checked) =>
                    handleNestedChange("quietHours", "weekends", checked)
                  }
                />
              </div>
            </ConditionalField>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="gap-6 p-4 shadow-none md:p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <Settings aria-hidden="true" className="size-5" focusable="false" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Customize how and when you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label htmlFor="preferences-frequency">
                Notification Frequency
              </Label>
              <p
                className="text-muted-foreground text-sm"
                id="preferences-frequency-description"
              >
                Choose how often you want to receive notifications
              </p>
              <Select
                onValueChange={(value) =>
                  handleNestedChange("preferences", "frequency", value)
                }
                value={notificationData.preferences.frequency}
              >
                <SelectTrigger
                  aria-describedby="preferences-frequency-description"
                  aria-label="Select notification frequency"
                  id="preferences-frequency"
                >
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((freq) => (
                    <SelectItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex flex-col gap-3">
              <Label htmlFor="preferences-emailFormat">Email Format</Label>
              <p
                className="text-muted-foreground text-sm"
                id="preferences-emailFormat-description"
              >
                Choose the format for email notifications
              </p>
              <Select
                onValueChange={(value) =>
                  handleNestedChange("preferences", "emailFormat", value)
                }
                value={notificationData.preferences.emailFormat}
              >
                <SelectTrigger
                  aria-describedby="preferences-emailFormat-description"
                  aria-label="Select email format"
                  id="preferences-emailFormat"
                >
                  <SelectValue placeholder="Select email format" />
                </SelectTrigger>
                <SelectContent>
                  {emailFormats.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <SwitchField
              checked={notificationData.preferences.soundEnabled}
              description="Play sound when receiving notifications"
              id="preferences-sound"
              label="Sound Notifications"
              onCheckedChange={(checked) =>
                handleNestedChange("preferences", "soundEnabled", checked)
              }
            />

            <SwitchField
              checked={notificationData.preferences.vibrationEnabled}
              description="Vibrate device when receiving notifications"
              id="preferences-vibration"
              label="Vibration Notifications"
              onCheckedChange={(checked) =>
                handleNestedChange("preferences", "vibrationEnabled", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Footer Actions */}
      <Card className="gap-6 p-4 shadow-none md:p-6">
        <CardFooter className="flex flex-col gap-3 p-0 sm:flex-row">
          <div className="flex w-full flex-wrap gap-3">
            <Button
              aria-describedby="save-button-description"
              aria-label={
                isSaving
                  ? "Saving changes"
                  : saveSuccess
                    ? "Changes saved"
                    : "Save notification settings"
              }
              className="w-full sm:w-auto"
              disabled={!hasUnsavedChanges || isSaving}
              onClick={handleSave}
              type="button"
            >
              {isSaving ? (
                <>
                  <div
                    aria-hidden="true"
                    className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                  />
                  Saving...
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
            <p className="sr-only" id="save-button-description">
              {isSaving
                ? "Saving your notification settings"
                : saveSuccess
                  ? "Your settings have been saved"
                  : "Save your notification settings"}
            </p>
            {hasUnsavedChanges && (
              <Button
                aria-label="Cancel changes and revert to saved settings"
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
              aria-label="Reset all notification settings to default values"
              className="w-full sm:w-auto"
              onClick={handleResetToDefaults}
              type="button"
              variant="outline"
            >
              <Settings
                aria-hidden="true"
                className="size-4"
                focusable="false"
              />
              Reset to Defaults
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

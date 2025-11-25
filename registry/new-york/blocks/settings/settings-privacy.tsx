"use client";

import { Download, Loader2, Lock, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
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
} from "@/registry/new-york/ui/alert-dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import { Separator } from "@/registry/new-york/ui/separator";
import { Switch } from "@/registry/new-york/ui/switch";

export interface PrivacyData {
  profileVisibility: "public" | "private";
  showEmail: boolean;
  showActivity: boolean;
  analyticsOptOut: boolean;
  marketingEmails: boolean;
  thirdPartyIntegrations: boolean;
  dataRetentionDays?: number;
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
}

export interface SettingsPrivacyProps {
  privacy?: PrivacyData;
  onSave?: (data: PrivacyData) => Promise<void>;
  onExportData?: () => Promise<void>;
  onDeleteAccount?: () => Promise<void>;
  onEnable2FA?: () => Promise<void>;
  className?: string;
}

const defaultPrivacy: PrivacyData = {
  profileVisibility: "public",
  showEmail: false,
  showActivity: true,
  analyticsOptOut: false,
  marketingEmails: true,
  thirdPartyIntegrations: true,
  dataRetentionDays: 365,
  twoFactorEnabled: false,
  loginNotifications: true,
};

export default function SettingsPrivacy({
  privacy = defaultPrivacy,
  onSave,
  onExportData,
  onDeleteAccount,
  onEnable2FA,
  className,
}: SettingsPrivacyProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [localPrivacy, setLocalPrivacy] = useState<PrivacyData>(privacy);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave?.(localPrivacy);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      await onExportData?.();
    } finally {
      setIsExporting(false);
    }
  };

  const updatePrivacy = <K extends keyof PrivacyData>(
    key: K,
    value: PrivacyData[K]
  ) => {
    setLocalPrivacy((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <CardTitle className="wrap-break-word">Privacy Settings</CardTitle>
            <CardDescription className="wrap-break-word">
              Control your privacy and data sharing preferences
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
          {/* Profile Visibility */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-base">Profile Visibility</h3>
            <Field>
              <FieldLabel htmlFor="profile-visibility">
                Profile Visibility
              </FieldLabel>
              <FieldContent>
                <Select
                  onValueChange={(value: "public" | "private") =>
                    updatePrivacy("profileVisibility", value)
                  }
                  value={localPrivacy.profileVisibility}
                >
                  <SelectTrigger id="profile-visibility">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
                <FieldDescription>
                  Control who can view your profile
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <FieldLabel htmlFor="show-email">Show Email</FieldLabel>
                  <FieldDescription>
                    Display your email address on your profile
                  </FieldDescription>
                </div>
                <Switch
                  checked={localPrivacy.showEmail}
                  id="show-email"
                  onCheckedChange={(checked) =>
                    updatePrivacy("showEmail", checked)
                  }
                />
              </div>
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <FieldLabel htmlFor="show-activity">Show Activity</FieldLabel>
                  <FieldDescription>
                    Display your recent activity on your profile
                  </FieldDescription>
                </div>
                <Switch
                  checked={localPrivacy.showActivity}
                  id="show-activity"
                  onCheckedChange={(checked) =>
                    updatePrivacy("showActivity", checked)
                  }
                />
              </div>
            </Field>
          </div>

          <Separator />

          {/* Data Sharing */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-base">Data Sharing</h3>
            <Field>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <FieldLabel htmlFor="analytics-opt-out">
                    Analytics Opt-Out
                  </FieldLabel>
                  <FieldDescription>
                    Stop sharing usage analytics with us
                  </FieldDescription>
                </div>
                <Switch
                  checked={localPrivacy.analyticsOptOut}
                  id="analytics-opt-out"
                  onCheckedChange={(checked) =>
                    updatePrivacy("analyticsOptOut", checked)
                  }
                />
              </div>
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <FieldLabel htmlFor="marketing-emails">
                    Marketing Emails
                  </FieldLabel>
                  <FieldDescription>
                    Receive promotional emails and updates
                  </FieldDescription>
                </div>
                <Switch
                  checked={localPrivacy.marketingEmails}
                  id="marketing-emails"
                  onCheckedChange={(checked) =>
                    updatePrivacy("marketingEmails", checked)
                  }
                />
              </div>
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <FieldLabel htmlFor="third-party">
                    Third-Party Integrations
                  </FieldLabel>
                  <FieldDescription>
                    Allow data sharing with connected third-party services
                  </FieldDescription>
                </div>
                <Switch
                  checked={localPrivacy.thirdPartyIntegrations}
                  id="third-party"
                  onCheckedChange={(checked) =>
                    updatePrivacy("thirdPartyIntegrations", checked)
                  }
                />
              </div>
            </Field>
          </div>

          <Separator />

          {/* Security */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-base">Security</h3>
            <Field>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <FieldLabel htmlFor="two-factor">
                    Two-Factor Authentication
                  </FieldLabel>
                  <FieldDescription>
                    Add an extra layer of security to your account
                  </FieldDescription>
                </div>
                <div className="flex items-center gap-2">
                  {localPrivacy.twoFactorEnabled ? (
                    <span className="text-muted-foreground text-sm">
                      Enabled
                    </span>
                  ) : (
                    <Button
                      onClick={onEnable2FA}
                      type="button"
                      variant="outline"
                    >
                      <Lock className="size-4" />
                      Enable 2FA
                    </Button>
                  )}
                </div>
              </div>
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <FieldLabel htmlFor="login-notifications">
                    Login Notifications
                  </FieldLabel>
                  <FieldDescription>
                    Get notified when someone logs into your account
                  </FieldDescription>
                </div>
                <Switch
                  checked={localPrivacy.loginNotifications}
                  id="login-notifications"
                  onCheckedChange={(checked) =>
                    updatePrivacy("loginNotifications", checked)
                  }
                />
              </div>
            </Field>
          </div>

          <Separator />

          {/* Data Management */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-base">Data Management</h3>
            <Field>
              <FieldLabel htmlFor="data-retention">Data Retention</FieldLabel>
              <FieldContent>
                <Select
                  onValueChange={(value) =>
                    updatePrivacy("dataRetentionDays", Number.parseInt(value))
                  }
                  value={localPrivacy.dataRetentionDays?.toString() || "365"}
                >
                  <SelectTrigger id="data-retention">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                    <SelectItem value="0">Indefinitely</SelectItem>
                  </SelectContent>
                </Select>
                <FieldDescription>
                  How long to keep your activity history
                </FieldDescription>
              </FieldContent>
            </Field>

            <div className="flex flex-col gap-2">
              <Button
                className="w-full sm:w-auto"
                disabled={isExporting}
                onClick={handleExportData}
                type="button"
                variant="outline"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Exporting…
                  </>
                ) : (
                  <>
                    <Download className="size-4" />
                    Export My Data
                  </>
                )}
              </Button>
              <p className="text-muted-foreground text-xs">
                Download a copy of all your data in JSON format
              </p>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-full sm:w-auto"
                    type="button"
                    variant="destructive"
                  >
                    <Trash2 className="size-4" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Account</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete your account? This action
                      cannot be undone. All your data will be permanently
                      deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={onDeleteAccount}
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <p className="text-muted-foreground text-xs">
                Permanently delete your account and all associated data
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

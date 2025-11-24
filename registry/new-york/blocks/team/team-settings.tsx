"use client";

import { Loader2, Save, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar";
import { Badge } from "@/registry/new-york/ui/badge";
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
  FieldError,
  FieldLabel,
} from "@/registry/new-york/ui/field";
import {
  InputGroup,
  InputGroupInput,
} from "@/registry/new-york/ui/input-group";
import { Separator } from "@/registry/new-york/ui/separator";
import { Textarea } from "@/registry/new-york/ui/textarea";

export interface TeamSettings {
  name: string;
  description?: string;
  avatar?: string;
  slug?: string;
  color?: string;
  defaultModel?: string;
  defaultAccessScope?: string[];
  metadata?: Record<string, string>;
}

export interface TeamSettingsProps {
  settings?: TeamSettings;
  plan?: "free" | "pro" | "enterprise";
  onSave?: (settings: TeamSettings) => Promise<void>;
  onAvatarUpload?: (file: File) => Promise<string>;
  onAvatarRemove?: () => Promise<void>;
  className?: string;
  availableModels?: string[];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TeamSettings({
  settings,
  plan = "free",
  onSave,
  onAvatarUpload,
  onAvatarRemove,
  className,
  availableModels = ["gpt-4", "gpt-3.5-turbo", "claude-3-opus"],
}: TeamSettingsProps) {
  const [localSettings, setLocalSettings] = useState<TeamSettings>(
    settings || {
      name: "",
      description: "",
      slug: "",
      color: "#3b82f6",
    }
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const hasChanges = JSON.stringify(localSettings) !== JSON.stringify(settings);

  const handleSave = async () => {
    setErrors({});

    if (!localSettings.name.trim()) {
      setErrors({ name: "Team name is required" });
      return;
    }

    setIsSaving(true);
    try {
      await onSave?.(localSettings);
    } catch (error) {
      setErrors({
        _general:
          error instanceof Error ? error.message : "Failed to save settings",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!(file && onAvatarUpload)) return;

    setIsUploadingAvatar(true);
    try {
      const url = await onAvatarUpload(file);
      setLocalSettings((prev) => ({ ...prev, avatar: url }));
    } catch (error) {
      setErrors({
        _general:
          error instanceof Error ? error.message : "Failed to upload avatar",
      });
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleAvatarRemove = async () => {
    if (!onAvatarRemove) return;
    setIsUploadingAvatar(true);
    try {
      await onAvatarRemove();
      setLocalSettings((prev) => ({ ...prev, avatar: undefined }));
    } catch (error) {
      setErrors({
        _general:
          error instanceof Error ? error.message : "Failed to remove avatar",
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Team Settings</CardTitle>
          <CardDescription>
            Manage your team&apos;s name, appearance, and defaults
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {errors._general && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
              <p className="text-destructive text-sm">{errors._general}</p>
            </div>
          )}

          {/* Avatar */}
          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel>Team Avatar</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-4">
                  <Avatar className="size-20">
                    <AvatarImage
                      alt={localSettings.name}
                      src={localSettings.avatar}
                    />
                    <AvatarFallback className="text-lg">
                      {getInitials(localSettings.name || "Team")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <input
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                        ref={fileInputRef}
                        type="file"
                      />
                      <Button
                        disabled={isUploadingAvatar || !onAvatarUpload}
                        onClick={() => fileInputRef.current?.click()}
                        size="sm"
                        type="button"
                        variant="outline"
                      >
                        {isUploadingAvatar ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            Uploading…
                          </>
                        ) : (
                          <>
                            <Upload className="size-4" />
                            Upload
                          </>
                        )}
                      </Button>
                      {localSettings.avatar && onAvatarRemove && (
                        <Button
                          disabled={isUploadingAvatar}
                          onClick={handleAvatarRemove}
                          size="sm"
                          type="button"
                          variant="outline"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <FieldDescription>
                      Recommended size: 256x256px. Max 2MB.
                    </FieldDescription>
                  </div>
                </div>
              </FieldContent>
            </Field>
          </div>

          <Separator />

          {/* Basic Info */}
          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel htmlFor="name">
                Team Name <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <InputGroup>
                  <InputGroupInput
                    id="name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setLocalSettings((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Acme Inc."
                    type="text"
                    value={localSettings.name}
                  />
                </InputGroup>
              </FieldContent>
              {errors.name && <FieldError>{errors.name}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <FieldContent>
                <Textarea
                  id="description"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setLocalSettings((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="What does your team do?"
                  rows={3}
                  value={localSettings.description || ""}
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="slug">Team Slug</FieldLabel>
              <FieldContent>
                <InputGroup>
                  <InputGroupInput
                    id="slug"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setLocalSettings((prev) => ({
                        ...prev,
                        slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                      }))
                    }
                    placeholder="acme-inc"
                    type="text"
                    value={localSettings.slug || ""}
                  />
                </InputGroup>
              </FieldContent>
              <FieldDescription>
                Used in URLs. Only lowercase letters, numbers, and hyphens.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="color">Team Color</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-3">
                  <input
                    className="size-10 rounded border"
                    id="color"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setLocalSettings((prev) => ({
                        ...prev,
                        color: e.target.value,
                      }))
                    }
                    type="color"
                    value={localSettings.color || "#3b82f6"}
                  />
                  <InputGroup className="flex-1">
                    <InputGroupInput
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setLocalSettings((prev) => ({
                          ...prev,
                          color: e.target.value,
                        }))
                      }
                      placeholder="#3b82f6"
                      type="text"
                      value={localSettings.color || ""}
                    />
                  </InputGroup>
                </div>
              </FieldContent>
              <FieldDescription>
                Used for team branding and UI accents
              </FieldDescription>
            </Field>
          </div>

          <Separator />

          {/* Defaults */}
          <div className="flex flex-col gap-4">
            <h3 className="font-medium text-sm">Default Settings</h3>
            {availableModels.length > 0 && (
              <Field>
                <FieldLabel htmlFor="default-model">
                  Default AI Model
                </FieldLabel>
                <FieldContent>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="default-model"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setLocalSettings((prev) => ({
                        ...prev,
                        defaultModel: e.target.value,
                      }))
                    }
                    value={localSettings.defaultModel || ""}
                  >
                    <option value="">None (use user preference)</option>
                    {availableModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </FieldContent>
                <FieldDescription>
                  Default AI model for new team members
                </FieldDescription>
              </Field>
            )}
          </div>

          <Separator />

          {/* Plan Info */}
          <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
            <div className="flex flex-col gap-1">
              <span className="font-medium text-sm">Current Plan</span>
              <span className="text-muted-foreground text-sm">
                {plan === "free" && "Free plan"}
                {plan === "pro" && "Pro plan"}
                {plan === "enterprise" && "Enterprise plan"}
              </span>
            </div>
            <Badge variant={plan === "enterprise" ? "default" : "secondary"}>
              {plan}
            </Badge>
          </div>

          {/* Save Button */}
          {onSave && (
            <div className="flex justify-end">
              <Button
                aria-busy={isSaving}
                data-loading={isSaving}
                disabled={!hasChanges}
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
          )}
        </div>
      </CardContent>
    </Card>
  );
}

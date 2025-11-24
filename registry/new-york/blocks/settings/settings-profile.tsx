"use client";

import { Camera, Loader2, Save, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
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
  FieldError,
  FieldLabel,
} from "@/registry/new-york/ui/field";
import {
  InputGroup,
  InputGroupInput,
} from "@/registry/new-york/ui/input-group";
import { Separator } from "@/registry/new-york/ui/separator";
import { Textarea } from "@/registry/new-york/ui/textarea";

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ProfileData {
  name: string;
  email: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar?: string;
  socialLinks?: SocialLink[];
}

export interface SettingsProfileProps {
  profile?: ProfileData;
  onSave?: (data: ProfileData) => Promise<void>;
  onEmailChange?: (newEmail: string, currentPassword: string) => Promise<void>;
  onAvatarUpload?: (file: File) => Promise<string>;
  onAvatarRemove?: () => Promise<void>;
  className?: string;
  showEmailVerification?: boolean;
}

const defaultSocialPlatforms = [
  {
    id: "twitter",
    label: "Twitter/X",
    placeholder: "https://x.com/preetsuthar17",
  },
  {
    id: "github",
    label: "GitHub",
    placeholder: "https://github.com/preetsuthar17",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    placeholder: "https://linkedin.com/in/preetsuthar17",
  },
  { id: "website", label: "Website", placeholder: "https://preetsuthar.me" },
];

export default function SettingsProfile({
  profile,
  onSave,
  onEmailChange,
  onAvatarUpload,
  onAvatarRemove,
  className,
  showEmailVerification = true,
}: SettingsProfileProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [showEmailChangeForm, setShowEmailChangeForm] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    profile?.avatar || null
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<ProfileData>({
    name: profile?.name || "",
    email: profile?.email || "",
    bio: profile?.bio || "",
    location: profile?.location || "",
    website: profile?.website || "",
    socialLinks: profile?.socialLinks || [],
  });

  const [emailChangeData, setEmailChangeData] = useState({
    newEmail: "",
    currentPassword: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarFileRef = useRef<File | null>(null);

  const handleAvatarSelect = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        setErrors({ avatar: "Please select an image file" });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors({ avatar: "Image size must be less than 5MB" });
        return;
      }

      avatarFileRef.current = file;
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      if (onAvatarUpload) {
        setIsUploadingAvatar(true);
        try {
          const avatarUrl = await onAvatarUpload(file);
          setAvatarPreview(avatarUrl);
          setErrors({});
        } catch (error) {
          setErrors({
            avatar:
              error instanceof Error
                ? error.message
                : "Failed to upload avatar",
          });
        } finally {
          setIsUploadingAvatar(false);
        }
      }
    },
    [onAvatarUpload]
  );

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarRemove = async () => {
    if (onAvatarRemove) {
      setIsUploadingAvatar(true);
      try {
        await onAvatarRemove();
        setAvatarPreview(null);
        avatarFileRef.current = null;
        setErrors({});
      } catch (error) {
        setErrors({
          avatar:
            error instanceof Error ? error.message : "Failed to remove avatar",
        });
      } finally {
        setIsUploadingAvatar(false);
      }
    } else {
      setAvatarPreview(null);
      avatarFileRef.current = null;
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const file = e.dataTransfer.files[0];
      if (file) {
        handleAvatarSelect(file);
      }
    },
    [handleAvatarSelect]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleAvatarSelect(file);
      }
    },
    [handleAvatarSelect]
  );

  const handleSave = async () => {
    setErrors({});

    if (!formData.name.trim()) {
      setErrors({ name: "Name is required" });
      return;
    }

    if (!formData.email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    if (formData.website && formData.website.trim()) {
      try {
        new URL(formData.website);
      } catch {
        setErrors({ website: "Please enter a valid URL" });
        return;
      }
    }

    setIsSaving(true);
    try {
      await onSave?.(formData);
    } catch (error) {
      setErrors({
        _general:
          error instanceof Error ? error.message : "Failed to save profile",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEmailChange = async () => {
    setErrors({});

    if (!emailChangeData.newEmail.trim()) {
      setErrors({ newEmail: "New email is required" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailChangeData.newEmail)) {
      setErrors({ newEmail: "Please enter a valid email address" });
      return;
    }

    if (!emailChangeData.currentPassword.trim()) {
      setErrors({ currentPassword: "Current password is required" });
      return;
    }

    setIsChangingEmail(true);
    try {
      await onEmailChange?.(
        emailChangeData.newEmail,
        emailChangeData.currentPassword
      );
      setFormData((prev) => ({ ...prev, email: emailChangeData.newEmail }));
      setEmailChangeData({ newEmail: "", currentPassword: "" });
      setShowEmailChangeForm(false);
      setErrors({});
    } catch (error) {
      setErrors({
        emailChange:
          error instanceof Error ? error.message : "Failed to change email",
      });
    } finally {
      setIsChangingEmail(false);
    }
  };

  const updateSocialLink = (platform: string, url: string) => {
    setFormData((prev) => {
      const socialLinks = prev.socialLinks || [];
      const existingIndex = socialLinks.findIndex(
        (link) => link.platform === platform
      );
      const updatedLinks = [...socialLinks];

      if (url.trim()) {
        if (existingIndex >= 0) {
          updatedLinks[existingIndex] = { platform, url };
        } else {
          updatedLinks.push({ platform, url });
        }
      } else if (existingIndex >= 0) {
        updatedLinks.splice(existingIndex, 1);
      }

      return { ...prev, socialLinks: updatedLinks };
    });
  };

  const getSocialLink = (platform: string): string =>
    formData.socialLinks?.find((link) => link.platform === platform)?.url || "";

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <CardTitle className="wrap-break-word">Profile Settings</CardTitle>
            <CardDescription className="wrap-break-word">
              Manage your profile information and avatar
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
          {errors._general && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
              <p className="text-destructive text-sm">{errors._general}</p>
            </div>
          )}

          {/* Avatar Upload */}
          <div className="flex flex-col gap-4">
            <FieldLabel>Profile Picture</FieldLabel>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div
                className={cn(
                  "relative flex size-24 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed transition-colors",
                  isUploadingAvatar
                    ? "border-primary bg-primary/5"
                    : "border-muted bg-muted/30 hover:border-primary/50"
                )}
                onClick={handleAvatarClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {avatarPreview ? (
                  <>
                    <Image
                      alt="Profile avatar"
                      className="object-cover"
                      fill
                      sizes="96px"
                      src={avatarPreview}
                      unoptimized
                    />
                    {isUploadingAvatar && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                        <Loader2 className="size-6 animate-spin text-primary" />
                      </div>
                    )}
                  </>
                ) : (
                  <Camera className="size-8 text-muted-foreground" />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    onClick={handleAvatarClick}
                    type="button"
                    variant="outline"
                  >
                    <Camera className="size-4" />
                    {avatarPreview ? "Change Photo" : "Upload Photo"}
                  </Button>
                  {avatarPreview && (
                    <Button
                      onClick={handleAvatarRemove}
                      type="button"
                      variant="outline"
                    >
                      <X className="size-4" />
                      Remove
                    </Button>
                  )}
                </div>
                <p className="text-muted-foreground text-xs">
                  Drag and drop an image here, or click to browse. Max size: 5MB
                </p>
                {errors.avatar && (
                  <p className="text-destructive text-xs">{errors.avatar}</p>
                )}
              </div>
              <input
                accept="image/*"
                className="hidden"
                onChange={handleFileInputChange}
                ref={fileInputRef}
                type="file"
              />
            </div>
          </div>

          <Separator />

          {/* Basic Information */}
          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel htmlFor="name">
                Name <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldContent>
                <InputGroup>
                  <InputGroupInput
                    id="name"
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Your full name"
                    value={formData.name}
                  />
                </InputGroup>
                {errors.name && <FieldError>{errors.name}</FieldError>}
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldContent>
                <div className="flex flex-col gap-2">
                  <InputGroup>
                    <InputGroupInput
                      disabled={showEmailChangeForm}
                      id="email"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="your.email@example.com"
                      type="email"
                      value={formData.email}
                    />
                  </InputGroup>
                  {showEmailVerification && (
                    <Button
                      className="w-full sm:w-auto"
                      onClick={() =>
                        setShowEmailChangeForm(!showEmailChangeForm)
                      }
                      type="button"
                      variant="outline"
                    >
                      {showEmailChangeForm ? "Cancel" : "Change Email"}
                    </Button>
                  )}
                </div>
                {errors.email && <FieldError>{errors.email}</FieldError>}
              </FieldContent>
            </Field>

            {showEmailChangeForm && (
              <div className="flex flex-col gap-4 rounded-lg border bg-muted/30 p-4">
                <Field>
                  <FieldLabel htmlFor="new-email">
                    New Email <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="new-email"
                        onChange={(e) =>
                          setEmailChangeData((prev) => ({
                            ...prev,
                            newEmail: e.target.value,
                          }))
                        }
                        placeholder="new.email@example.com"
                        type="email"
                        value={emailChangeData.newEmail}
                      />
                    </InputGroup>
                    {errors.newEmail && (
                      <FieldError>{errors.newEmail}</FieldError>
                    )}
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="current-password">
                    Current Password <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="current-password"
                        onChange={(e) =>
                          setEmailChangeData((prev) => ({
                            ...prev,
                            currentPassword: e.target.value,
                          }))
                        }
                        placeholder="Enter your current password"
                        type="password"
                        value={emailChangeData.currentPassword}
                      />
                    </InputGroup>
                    {errors.currentPassword && (
                      <FieldError>{errors.currentPassword}</FieldError>
                    )}
                    {errors.emailChange && (
                      <FieldError>{errors.emailChange}</FieldError>
                    )}
                  </FieldContent>
                </Field>

                <Button
                  className="w-full sm:w-auto"
                  disabled={isChangingEmail}
                  onClick={handleEmailChange}
                  type="button"
                >
                  {isChangingEmail ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Changing…
                    </>
                  ) : (
                    "Update Email"
                  )}
                </Button>
              </div>
            )}

            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <FieldContent>
                <Textarea
                  id="bio"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  placeholder="Tell us about yourself..."
                  rows={4}
                  value={formData.bio || ""}
                />
                <FieldDescription>
                  A brief description about yourself (max 500 characters)
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <FieldContent>
                <InputGroup>
                  <InputGroupInput
                    id="location"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    placeholder="City, Country"
                    value={formData.location || ""}
                  />
                </InputGroup>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="website">Website</FieldLabel>
              <FieldContent>
                <InputGroup>
                  <InputGroupInput
                    id="website"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        website: e.target.value,
                      }))
                    }
                    placeholder="https://example.com"
                    type="url"
                    value={formData.website || ""}
                  />
                </InputGroup>
                {errors.website && <FieldError>{errors.website}</FieldError>}
              </FieldContent>
            </Field>
          </div>

          <Separator />

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <FieldLabel>Social Links</FieldLabel>
            <div className="flex flex-col gap-3">
              {defaultSocialPlatforms.map((platform) => (
                <Field key={platform.id}>
                  <FieldLabel htmlFor={`social-${platform.id}`}>
                    {platform.label}
                  </FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id={`social-${platform.id}`}
                        onChange={(e) =>
                          updateSocialLink(platform.id, e.target.value)
                        }
                        placeholder={platform.placeholder}
                        type="url"
                        value={getSocialLink(platform.id)}
                      />
                    </InputGroup>
                  </FieldContent>
                </Field>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

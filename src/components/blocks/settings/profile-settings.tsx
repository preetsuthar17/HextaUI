"use client";

import {
  Calendar,
  Camera,
  Check,
  Globe,
  Mail,
  MapPin,
  Phone,
  Save,
  Settings,
  Trash2,
  User,
  X,
} from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ProfileData {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  website: string;
  location: string;
  dateOfBirth: string;
  timezone: string;
  language: string;
}

interface ProfileSettingsProps {
  className?: string;
  onSave?: (data: ProfileData) => Promise<void>;
  onDelete?: () => Promise<void>;
}

// Avatar Upload Component
function AvatarUpload({
  avatar,
  firstName,
  lastName,
  onAvatarChange,
}: {
  avatar: string;
  firstName: string;
  lastName: string;
  onAvatarChange: (avatar: string) => void;
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onAvatarChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <Avatar className="size-24 ring-2 ring-border">
        <AvatarImage
          alt={`${firstName} ${lastName}'s profile picture`}
          src={avatar}
        />
        <AvatarFallback className="text-lg">
          {firstName[0]}
          {lastName[0]}
        </AvatarFallback>
      </Avatar>
      <Button
        aria-label="Change profile picture"
        className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity hover:opacity-100"
        onClick={() => fileInputRef.current?.click()}
        size="icon"
        type="button"
      >
        <Camera
          aria-hidden="true"
          className="size-5 text-white"
          focusable="false"
        />
      </Button>
      <Input
        accept="image/*"
        aria-label="Upload profile picture"
        className="hidden"
        onChange={handleAvatarUpload}
        ref={fileInputRef}
        type="file"
      />
    </div>
  );
}

// Form Field Component
function FormField({
  id,
  label,
  icon,
  children,
  required = false,
}: {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="flex items-center gap-2" htmlFor={id}>
        {icon}
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
    </div>
  );
}

// Main Profile Settings Component
export default function ProfileSettings({
  className,
  onSave,
  onDelete,
}: ProfileSettingsProps) {
  const [profileData, setProfileData] = React.useState<ProfileData>({
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=Sara",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Product designer passionate about creating beautiful, accessible interfaces that delight users.",
    website: "https://johndoe.design",
    location: "San Francisco, CA",
    dateOfBirth: "1990-05-15",
    timezone: "America/Los_Angeles",
    language: "en",
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: any) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasUnsavedChanges(true);

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!profileData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!profileData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!profileData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (profileData.website && !/^https?:\/\/.+/.test(profileData.website)) {
      newErrors.website =
        "Please enter a valid URL starting with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      if (onSave) {
        await onSave(profileData);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      setSaveSuccess(true);
      setHasUnsavedChanges(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setHasUnsavedChanges(false);
    setErrors({});
    // Reset to original data (in real app, you'd restore from initial state)
  };

  const timezones = [
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "Europe/London", label: "GMT" },
    { value: "Europe/Paris", label: "Central European Time" },
    { value: "Asia/Tokyo", label: "Japan Standard Time" },
    { value: "Asia/Shanghai", label: "China Standard Time" },
  ];

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "ja", label: "Japanese" },
    { value: "zh", label: "Chinese" },
  ];

  return (
    <div className={cn("mx-auto flex w-full flex-col gap-6", className)}>
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-3xl text-foreground">
            Profile Settings
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </header>

      {/* Profile Picture Section */}
      <Card className="gap-6 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User aria-hidden="true" className="size-5" focusable="false" />
            Profile Picture
          </CardTitle>
          <CardDescription>
            Upload a new profile picture or change your current one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <AvatarUpload
              avatar={profileData.avatar}
              firstName={profileData.firstName}
              lastName={profileData.lastName}
              onAvatarChange={(avatar) => handleInputChange("avatar", avatar)}
            />
            <div className="text-center sm:text-left">
              <h2 className="font-semibold text-foreground text-xl">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-muted-foreground">{profileData.email}</p>
              <div className="mt-2 flex items-center justify-center gap-2 sm:justify-start">
                <Badge className="text-xs" variant="secondary">
                  Pro Member
                </Badge>
                <Badge className="text-xs" variant="outline">
                  Verified
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information Form */}
      <Card className="gap-6 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User aria-hidden="true" className="size-5" focusable="false" />
            Personal Information
          </CardTitle>
          <CardDescription>
            Update your personal details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              icon={
                <User aria-hidden="true" className="size-4" focusable="false" />
              }
              id="firstName"
              label="First Name"
              required
            >
              <Input
                aria-describedby={
                  errors.firstName ? "firstName-error" : undefined
                }
                aria-invalid={!!errors.firstName}
                id="firstName"
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Enter your first name"
                value={profileData.firstName}
              />
              {errors.firstName && (
                <p className="text-destructive text-sm" id="firstName-error">
                  {errors.firstName}
                </p>
              )}
            </FormField>

            <FormField id="lastName" label="Last Name" required>
              <Input
                aria-describedby={
                  errors.lastName ? "lastName-error" : undefined
                }
                aria-invalid={!!errors.lastName}
                id="lastName"
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter your last name"
                value={profileData.lastName}
              />
              {errors.lastName && (
                <p className="text-destructive text-sm" id="lastName-error">
                  {errors.lastName}
                </p>
              )}
            </FormField>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              icon={
                <Mail aria-hidden="true" className="size-4" focusable="false" />
              }
              id="email"
              label="Email Address"
              required
            >
              <Input
                aria-describedby={errors.email ? "email-error" : undefined}
                aria-invalid={!!errors.email}
                id="email"
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                type="email"
                value={profileData.email}
              />
              {errors.email && (
                <p className="text-destructive text-sm" id="email-error">
                  {errors.email}
                </p>
              )}
            </FormField>

            <FormField
              icon={
                <Phone
                  aria-hidden="true"
                  className="size-4"
                  focusable="false"
                />
              }
              id="phone"
              label="Phone Number"
            >
              <Input
                id="phone"
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
                type="tel"
                value={profileData.phone}
              />
            </FormField>
          </div>

          <FormField id="bio" label="Bio">
            <Textarea
              id="bio"
              onChange={(e) => handleInputChange("bio", e.target.value)}
              placeholder="Tell us about yourself..."
              rows={3}
              value={profileData.bio}
            />
          </FormField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              icon={
                <Globe
                  aria-hidden="true"
                  className="size-4"
                  focusable="false"
                />
              }
              id="website"
              label="Website"
            >
              <Input
                aria-describedby={errors.website ? "website-error" : undefined}
                aria-invalid={!!errors.website}
                id="website"
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="https://your-website.com"
                type="url"
                value={profileData.website}
              />
              {errors.website && (
                <p className="text-destructive text-sm" id="website-error">
                  {errors.website}
                </p>
              )}
            </FormField>

            <FormField
              icon={
                <MapPin
                  aria-hidden="true"
                  className="size-4"
                  focusable="false"
                />
              }
              id="location"
              label="Location"
            >
              <Input
                id="location"
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="City, Country"
                value={profileData.location}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              icon={
                <Calendar
                  aria-hidden="true"
                  className="size-4"
                  focusable="false"
                />
              }
              id="dateOfBirth"
              label="Date of Birth"
            >
              <Input
                id="dateOfBirth"
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
                type="date"
                value={profileData.dateOfBirth}
              />
            </FormField>

            <FormField id="timezone" label="Timezone">
              <Select
                onValueChange={(value) => handleInputChange("timezone", value)}
                value={profileData.timezone}
              >
                <SelectTrigger className="w-full grow sm:w-auto">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField id="language" label="Preferred Language">
              <Select
                onValueChange={(value) => handleInputChange("language", value)}
                value={profileData.language}
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
            </FormField>
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
          </div>

          <Button
            className="w-full sm:w-auto"
            onClick={onDelete}
            type="button"
            variant="destructive"
          >
            <Trash2 aria-hidden="true" className="size-4" focusable="false" />
            Delete Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

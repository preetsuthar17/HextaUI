"use client";

import { CheckCircle, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

interface PasswordUpdateFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  general?: string;
}

const validateForm = (data: PasswordUpdateFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.currentPassword) {
    errors.currentPassword = "Current password is required";
  }

  if (!data.newPassword) {
    errors.newPassword = "New password is required";
  } else if (data.newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.newPassword)) {
    errors.newPassword = "Must include uppercase, lowercase, and a number";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your new password";
  } else if (data.newPassword !== data.confirmPassword) {
    errors.confirmPassword = "Passwords don't match";
  }

  return errors;
};

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <Card className="mx-auto w-full max-w-md shadow-none">
      <CardHeader>
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="size-6 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-center font-semibold text-2xl text-green-700 tracking-tight dark:text-green-400">
            Password updated
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Your password has been changed successfully.
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full"
          onClick={onClose}
          type="button"
          variant="outline"
        >
          Close
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function PasswordUpdateBlock() {
  const [formData, setFormData] = useState<PasswordUpdateFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleInputChange = (
    field: keyof PasswordUpdateFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return <SuccessState onClose={() => setIsSuccess(false)} />;
  }

  return (
    <Card className="mx-auto w-full max-w-md gap-8 shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="font-bold text-2xl tracking-tight">
          Update Password
        </CardTitle>
        <CardDescription>Enter your current and new password</CardDescription>
      </CardHeader>

      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-4">
          {errors.general ? (
            <Alert variant="destructive">
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          ) : null}

          <div className="flex flex-col gap-2">
            <Label htmlFor="currentPassword">Current password</Label>
            <InputGroup
              aria-invalid={errors.currentPassword ? true : undefined}
            >
              <InputGroupInput
                aria-describedby={
                  errors.currentPassword ? "currentPassword-error" : undefined
                }
                autoComplete="current-password"
                id="currentPassword"
                onChange={(e) =>
                  handleInputChange("currentPassword", e.target.value)
                }
                placeholder="Enter current password"
                type={showCurrent ? "text" : "password"}
                value={formData.currentPassword}
              />
              <InputGroupAddon align="inline-start">
                <Lock className="size-4" />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label={showCurrent ? "Hide password" : "Show password"}
                  onClick={() => setShowCurrent(!showCurrent)}
                  size="icon-xs"
                  variant="ghost"
                >
                  {showCurrent ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {errors.currentPassword ? (
              <p
                className="text-destructive text-sm"
                id="currentPassword-error"
              >
                {errors.currentPassword}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="newPassword">New password</Label>
            <InputGroup aria-invalid={errors.newPassword ? true : undefined}>
              <InputGroupInput
                aria-describedby={
                  errors.newPassword ? "newPassword-error" : undefined
                }
                autoComplete="new-password"
                id="newPassword"
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                placeholder="Create a strong password"
                type={showNew ? "text" : "password"}
                value={formData.newPassword}
              />
              <InputGroupAddon align="inline-start">
                <Lock className="size-4" />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label={showNew ? "Hide password" : "Show password"}
                  onClick={() => setShowNew(!showNew)}
                  size="icon-xs"
                  variant="ghost"
                >
                  {showNew ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {errors.newPassword ? (
              <p className="text-destructive text-sm" id="newPassword-error">
                {errors.newPassword}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirm new password</Label>
            <InputGroup
              aria-invalid={errors.confirmPassword ? true : undefined}
            >
              <InputGroupInput
                aria-describedby={
                  errors.confirmPassword ? "confirmPassword-error" : undefined
                }
                autoComplete="new-password"
                id="confirmPassword"
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                placeholder="Confirm your new password"
                type={showConfirm ? "text" : "password"}
                value={formData.confirmPassword}
              />
              <InputGroupAddon align="inline-start">
                <Lock className="size-4" />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  onClick={() => setShowConfirm(!showConfirm)}
                  size="icon-xs"
                  variant="ghost"
                >
                  {showConfirm ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {errors.confirmPassword ? (
              <p
                className="text-destructive text-sm"
                id="confirmPassword-error"
              >
                {errors.confirmPassword}
              </p>
            ) : null}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <Spinner />
                Update Password
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

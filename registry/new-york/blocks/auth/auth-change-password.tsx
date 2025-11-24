"use client";

import { CheckCircle2, Eye, EyeOff, Loader2, Lock, Shield } from "lucide-react";
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
  FieldError,
  FieldLabel,
} from "@/registry/new-york/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/new-york/ui/input-group";

export interface AuthChangePasswordProps {
  onSubmit?: (data: { currentPassword: string; newPassword: string }) => void;
  className?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  errors?: {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
    general?: string;
  };
  successMessage?: string;
}

export default function AuthChangePassword({
  onSubmit,
  className,
  isLoading = false,
  isSuccess = false,
  errors,
  successMessage = "Your password has been changed successfully.",
}: AuthChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localErrors, setLocalErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const validateCurrentPassword = (value: string): string | undefined => {
    if (!value) {
      return "Current password is required";
    }
    return;
  };

  const validateNewPassword = (value: string): string | undefined => {
    if (!value) {
      return "New password is required";
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/(?=.*[a-z])/.test(value)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(value)) {
      return "Password must contain at least one number";
    }
    if (value === currentPassword) {
      return "New password must be different from current password";
    }
    return;
  };

  const validateConfirmPassword = (
    value: string,
    passwordValue: string
  ): string | undefined => {
    if (!value) {
      return "Please confirm your password";
    }
    if (value !== passwordValue) {
      return "Passwords do not match";
    }
    return;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const currentPasswordError = validateCurrentPassword(currentPassword);
    const newPasswordError = validateNewPassword(newPassword);
    const confirmPasswordError = validateConfirmPassword(
      confirmPassword,
      newPassword
    );

    if (currentPasswordError || newPasswordError || confirmPasswordError) {
      setLocalErrors({
        currentPassword: currentPasswordError,
        newPassword: newPasswordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    setLocalErrors({});
    onSubmit?.({
      currentPassword,
      newPassword,
    });
  };

  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCurrentPassword(value);
    if (localErrors.currentPassword) {
      setLocalErrors((prev) => ({
        ...prev,
        currentPassword: validateCurrentPassword(value),
      }));
    }
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    if (localErrors.newPassword) {
      setLocalErrors((prev) => ({
        ...prev,
        newPassword: validateNewPassword(value),
      }));
    }
    if (localErrors.confirmPassword && confirmPassword) {
      setLocalErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(confirmPassword, value),
      }));
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (localErrors.confirmPassword) {
      setLocalErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(value, newPassword),
      }));
    }
  };

  const currentPasswordError =
    errors?.currentPassword || localErrors.currentPassword;
  const newPasswordError = errors?.newPassword || localErrors.newPassword;
  const confirmPasswordError =
    errors?.confirmPassword || localErrors.confirmPassword;
  const generalError = errors?.general;

  if (isSuccess) {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <CardTitle>Password changed</CardTitle>
          <CardDescription>Your password has been updated</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="size-6 text-primary" />
            </div>
            <p className="font-medium text-sm">{successMessage}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <CardTitle>Change password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {generalError && (
            <div
              aria-live="polite"
              className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-destructive text-sm"
              role="alert"
            >
              {generalError}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <Field data-invalid={!!currentPasswordError}>
              <FieldLabel htmlFor="change-current-password">
                Current password
                <span aria-label="required" className="text-destructive">
                  *
                </span>
              </FieldLabel>
              <FieldContent>
                <InputGroup aria-invalid={!!currentPasswordError}>
                  <InputGroupAddon>
                    <Lock className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    aria-describedby={
                      currentPasswordError
                        ? "change-current-password-error"
                        : undefined
                    }
                    aria-invalid={!!currentPasswordError}
                    autoComplete="current-password"
                    id="change-current-password"
                    name="currentPassword"
                    onChange={handleCurrentPasswordChange}
                    placeholder="Enter current password"
                    required
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                  />
                  <InputGroupButton
                    aria-label={
                      showCurrentPassword
                        ? "Hide current password"
                        : "Show current password"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setShowCurrentPassword((prev) => !prev);
                    }}
                    type="button"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </InputGroupButton>
                </InputGroup>
                {currentPasswordError && (
                  <FieldError id="change-current-password-error">
                    {currentPasswordError}
                  </FieldError>
                )}
              </FieldContent>
            </Field>

            <Field data-invalid={!!newPasswordError}>
              <FieldLabel htmlFor="change-new-password">
                New password
                <span aria-label="required" className="text-destructive">
                  *
                </span>
              </FieldLabel>
              <FieldContent>
                <InputGroup aria-invalid={!!newPasswordError}>
                  <InputGroupAddon>
                    <Shield className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    aria-describedby={
                      newPasswordError ? "change-new-password-error" : undefined
                    }
                    aria-invalid={!!newPasswordError}
                    autoComplete="new-password"
                    id="change-new-password"
                    name="newPassword"
                    onChange={handleNewPasswordChange}
                    placeholder="Enter new password"
                    required
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                  />
                  <InputGroupButton
                    aria-label={
                      showNewPassword
                        ? "Hide new password"
                        : "Show new password"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setShowNewPassword((prev) => !prev);
                    }}
                    type="button"
                  >
                    {showNewPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </InputGroupButton>
                </InputGroup>
                {newPasswordError && (
                  <FieldError id="change-new-password-error">
                    {newPasswordError}
                  </FieldError>
                )}
                <FieldDescription>
                  Must be at least 8 characters with uppercase, lowercase, and
                  number
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field data-invalid={!!confirmPasswordError}>
              <FieldLabel htmlFor="change-confirm-password">
                Confirm new password
                <span aria-label="required" className="text-destructive">
                  *
                </span>
              </FieldLabel>
              <FieldContent>
                <InputGroup aria-invalid={!!confirmPasswordError}>
                  <InputGroupAddon>
                    <Lock className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    aria-describedby={
                      confirmPasswordError
                        ? "change-confirm-password-error"
                        : undefined
                    }
                    aria-invalid={!!confirmPasswordError}
                    autoComplete="new-password"
                    id="change-confirm-password"
                    name="confirmPassword"
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirm new password"
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                  />
                  <InputGroupButton
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setShowConfirmPassword((prev) => !prev);
                    }}
                    type="button"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </InputGroupButton>
                </InputGroup>
                {confirmPasswordError && (
                  <FieldError id="change-confirm-password-error">
                    {confirmPasswordError}
                  </FieldError>
                )}
              </FieldContent>
            </Field>
          </div>

          <Button
            aria-busy={isLoading}
            className="w-full"
            data-loading={isLoading}
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Updating password…
              </>
            ) : (
              <>
                <Shield className="size-4" />
                Update password
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

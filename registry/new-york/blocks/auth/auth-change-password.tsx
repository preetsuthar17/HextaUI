"use client";

import { CheckCircle2, Eye, EyeOff, Loader2, Lock, Shield } from "lucide-react";
import { useCallback, useState } from "react";
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

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  showPassword: boolean;
  onTogglePassword: () => void;
  autoComplete: string;
  placeholder: string;
  icon: React.ReactNode;
  description?: string;
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  error,
  showPassword,
  onTogglePassword,
  autoComplete,
  placeholder,
  icon,
  description,
}: PasswordFieldProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>
        {label}
        <span aria-label="required" className="text-destructive">
          *
        </span>
      </FieldLabel>
      <FieldContent>
        <InputGroup aria-invalid={!!error}>
          <InputGroupAddon>{icon}</InputGroupAddon>
          <InputGroupInput
            aria-describedby={errorId}
            aria-invalid={!!error}
            autoComplete={autoComplete}
            id={id}
            name={id}
            onChange={onChange}
            placeholder={placeholder}
            required
            type={showPassword ? "text" : "password"}
            value={value}
          />
          <InputGroupButton
            aria-label={
              showPassword
                ? `Hide ${label.toLowerCase()}`
                : `Show ${label.toLowerCase()}`
            }
            className="h-full min-w-[32px] touch-manipulation"
            onClick={(e) => {
              e.preventDefault();
              onTogglePassword();
            }}
            type="button"
          >
            {showPassword ? (
              <EyeOff aria-hidden="true" className="size-4" />
            ) : (
              <Eye aria-hidden="true" className="size-4" />
            )}
          </InputGroupButton>
        </InputGroup>
        {error && (
          <FieldError aria-live="polite" id={errorId}>
            {error}
          </FieldError>
        )}
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
    </Field>
  );
}

interface SuccessStateProps {
  message: string;
  className?: string;
}

function SuccessState({ message, className }: SuccessStateProps) {
  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <CardTitle>Password changed</CardTitle>
        <CardDescription>Your password has been updated</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          aria-live="polite"
          className="flex flex-col items-center gap-4 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center"
          role="status"
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 aria-hidden="true" className="size-6 text-primary" />
          </div>
          <p className="font-medium text-sm">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}

interface ValidationErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

function validateCurrentPassword(value: string): string | undefined {
  if (!value.trim()) {
    return "Current password is required";
  }
  return;
}

function validateNewPassword(
  value: string,
  currentPassword: string
): string | undefined {
  if (!value.trim()) {
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
}

function validateConfirmPassword(
  value: string,
  passwordValue: string
): string | undefined {
  if (!value.trim()) {
    return "Please confirm your password";
  }
  if (value !== passwordValue) {
    return "Passwords do not match";
  }
  return;
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
  const [localErrors, setLocalErrors] = useState<ValidationErrors>({});

  const handleCurrentPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCurrentPassword(value);
      if (localErrors.currentPassword) {
        setLocalErrors((prev) => ({
          ...prev,
          currentPassword: validateCurrentPassword(value),
        }));
      }
    },
    [localErrors.currentPassword]
  );

  const handleNewPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setNewPassword(value);
      if (localErrors.newPassword) {
        setLocalErrors((prev) => ({
          ...prev,
          newPassword: validateNewPassword(value, currentPassword),
        }));
      }
      if (localErrors.confirmPassword && confirmPassword) {
        setLocalErrors((prev) => ({
          ...prev,
          confirmPassword: validateConfirmPassword(confirmPassword, value),
        }));
      }
    },
    [
      currentPassword,
      confirmPassword,
      localErrors.newPassword,
      localErrors.confirmPassword,
    ]
  );

  const handleConfirmPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setConfirmPassword(value);
      if (localErrors.confirmPassword) {
        setLocalErrors((prev) => ({
          ...prev,
          confirmPassword: validateConfirmPassword(value, newPassword),
        }));
      }
    },
    [newPassword, localErrors.confirmPassword]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const currentPasswordError = validateCurrentPassword(currentPassword);
      const newPasswordError = validateNewPassword(
        newPassword,
        currentPassword
      );
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
        currentPassword: currentPassword.trim(),
        newPassword: newPassword.trim(),
      });
    },
    [currentPassword, newPassword, confirmPassword, onSubmit]
  );

  if (isSuccess) {
    return <SuccessState className={className} message={successMessage} />;
  }

  const currentPasswordError =
    errors?.currentPassword || localErrors.currentPassword;
  const newPasswordError = errors?.newPassword || localErrors.newPassword;
  const confirmPasswordError =
    errors?.confirmPassword || localErrors.confirmPassword;
  const generalError = errors?.general;

  return (
    <Card className={cn("w-full shadow-xs max-w-sm", className)}>
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
            <PasswordField
              autoComplete="current-password"
              error={currentPasswordError}
              icon={<Lock aria-hidden="true" className="size-4" />}
              id="change-current-password"
              label="Current password"
              onChange={handleCurrentPasswordChange}
              onTogglePassword={() => setShowCurrentPassword((prev) => !prev)}
              placeholder="Enter current password…"
              showPassword={showCurrentPassword}
              value={currentPassword}
            />

            <PasswordField
              autoComplete="new-password"
              description="Must be at least 8 characters with uppercase, lowercase, and number"
              error={newPasswordError}
              icon={<Shield aria-hidden="true" className="size-4" />}
              id="change-new-password"
              label="New password"
              onChange={handleNewPasswordChange}
              onTogglePassword={() => setShowNewPassword((prev) => !prev)}
              placeholder="Enter new password…"
              showPassword={showNewPassword}
              value={newPassword}
            />

            <PasswordField
              autoComplete="new-password"
              error={confirmPasswordError}
              icon={<Lock aria-hidden="true" className="size-4" />}
              id="change-confirm-password"
              label="Confirm new password"
              onChange={handleConfirmPasswordChange}
              onTogglePassword={() => setShowConfirmPassword((prev) => !prev)}
              placeholder="Confirm new password…"
              showPassword={showConfirmPassword}
              value={confirmPassword}
            />
          </div>

          <Button
            aria-busy={isLoading}
            className="min-h-[44px] w-full touch-manipulation"
            data-loading={isLoading}
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <>
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                Updating password…
              </>
            ) : (
              <>
                <Shield aria-hidden="true" className="size-4" />
                Update password
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

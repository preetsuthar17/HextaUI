"use client";

import { CheckCircle2, Eye, EyeOff, Loader2, Mail, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

export interface AuthEmailChangeProps {
  currentEmail?: string;
  onSubmit?: (data: { newEmail: string; password: string }) => void;
  className?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  errors?: {
    newEmail?: string;
    password?: string;
    general?: string;
  };
  successMessage?: string;
}

export default function AuthEmailChange({
  currentEmail,
  onSubmit,
  className,
  isLoading = false,
  isSuccess = false,
  errors,
  successMessage = "We've sent a verification link to your new email address.",
}: AuthEmailChangeProps) {
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localErrors, setLocalErrors] = useState<{
    newEmail?: string;
    password?: string;
  }>({});

  const validateEmail = (value: string): string | undefined => {
    if (!value.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    if (value.trim().toLowerCase() === currentEmail?.toLowerCase()) {
      return "New email must be different from current email";
    }
    return;
  };

  const validatePassword = (value: string): string | undefined => {
    if (!value) {
      return "Password is required";
    }
    return;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEmailError = validateEmail(newEmail);
    const passwordError = validatePassword(password);

    if (newEmailError || passwordError) {
      setLocalErrors({
        newEmail: newEmailError,
        password: passwordError,
      });
      return;
    }

    setLocalErrors({});
    onSubmit?.({
      newEmail: newEmail.trim(),
      password,
    });
  };

  const handleNewEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewEmail(value);
    if (localErrors.newEmail) {
      setLocalErrors((prev) => ({
        ...prev,
        newEmail: validateEmail(value),
      }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (localErrors.password) {
      setLocalErrors((prev) => ({
        ...prev,
        password: validatePassword(value),
      }));
    }
  };

  const newEmailError = errors?.newEmail || localErrors.newEmail;
  const passwordError = errors?.password || localErrors.password;
  const generalError = errors?.general;

  if (isSuccess) {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <CardTitle>Verification email sent</CardTitle>
          <CardDescription>
            Check your new email address to verify the change
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="size-8 text-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-sm">{successMessage}</p>
              {newEmail && (
                <p className="text-muted-foreground text-sm">
                  Sent to <span className="font-medium">{newEmail}</span>
                </p>
              )}
              <p className="text-muted-foreground text-xs">
                Click the verification link in the email to complete the change.
                If you don&apos;t see it, check your spam folder.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <CardTitle>Change email address</CardTitle>
        <CardDescription>
          Update your email address. We&apos;ll send a verification link to your
          new email.
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

          {currentEmail && (
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-muted-foreground" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-muted-foreground text-xs">
                    Current email
                  </span>
                  <span className="font-medium text-sm">{currentEmail}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <Field data-invalid={!!newEmailError}>
              <FieldLabel htmlFor="email-change-new">
                New email address
                <span aria-label="required" className="text-destructive">
                  *
                </span>
              </FieldLabel>
              <FieldContent>
                <InputGroup aria-invalid={!!newEmailError}>
                  <InputGroupAddon>
                    <Mail className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    aria-describedby={
                      newEmailError ? "email-change-new-error" : undefined
                    }
                    aria-invalid={!!newEmailError}
                    autoComplete="email"
                    id="email-change-new"
                    inputMode="email"
                    name="newEmail"
                    onChange={handleNewEmailChange}
                    placeholder="new@example.com"
                    required
                    type="email"
                    value={newEmail}
                  />
                </InputGroup>
                {newEmailError && (
                  <FieldError id="email-change-new-error">
                    {newEmailError}
                  </FieldError>
                )}
                <FieldDescription>
                  We&apos;ll send a verification link to this address
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field data-invalid={!!passwordError}>
              <FieldLabel htmlFor="email-change-password">
                Password
                <span aria-label="required" className="text-destructive">
                  *
                </span>
              </FieldLabel>
              <FieldContent>
                <InputGroup aria-invalid={!!passwordError}>
                  <InputGroupAddon>
                    <Shield className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    aria-describedby={
                      passwordError ? "email-change-password-error" : undefined
                    }
                    aria-invalid={!!passwordError}
                    autoComplete="current-password"
                    id="email-change-password"
                    name="password"
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                  />
                  <InputGroupButton
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword((prev) => !prev);
                    }}
                    type="button"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </InputGroupButton>
                </InputGroup>
                {passwordError && (
                  <FieldError id="email-change-password-error">
                    {passwordError}
                  </FieldError>
                )}
                <FieldDescription>
                  Enter your current password to confirm this change
                </FieldDescription>
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
                Sending verification email…
              </>
            ) : (
              <>
                <Mail className="size-4" />
                Change email address
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

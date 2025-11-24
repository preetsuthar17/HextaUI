"use client";

import { ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";
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
  InputGroupInput,
} from "@/registry/new-york/ui/input-group";

export interface AuthForgotPasswordProps {
  onSubmit?: (email: string) => void;
  onBack?: () => void;
  className?: string;
  defaultEmail?: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  errors?: {
    email?: string;
    general?: string;
  };
  successMessage?: string;
}

export default function AuthForgotPassword({
  onSubmit,
  onBack,
  className,
  defaultEmail = "",
  isLoading = false,
  isSuccess = false,
  errors,
  successMessage = "We&apos;ve sent a password reset link to your email address.",
}: AuthForgotPasswordProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [localErrors, setLocalErrors] = useState<{
    email?: string;
  }>({});

  const validateEmail = (value: string): string | undefined => {
    if (!value.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return;
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const emailError = validateEmail(email);

      if (emailError) {
        setLocalErrors({ email: emailError });
        return;
      }

      setLocalErrors({});
      onSubmit?.(email.trim());
    },
    [email, onSubmit]
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (localErrors.email) {
      setLocalErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const emailError = errors?.email || localErrors.email;
  const generalError = errors?.general;

  if (isSuccess) {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We&apos;ve sent you a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-4 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="size-6 text-primary" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium text-sm">{successMessage}</p>
                <p className="text-muted-foreground text-sm">
                  If you don&apos;t see the email, check your spam folder.
                </p>
              </div>
            </div>

            {onBack && (
              <Button
                className="w-full"
                onClick={onBack}
                type="button"
                variant="outline"
              >
                <ArrowLeft className="size-4" />
                Back to sign in
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>
          Enter your email address and we&apos;ll send you a link to reset your
          password
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

          <Field data-invalid={!!emailError}>
            <FieldLabel htmlFor="forgot-password-email">
              Email
              <span aria-label="required" className="text-destructive">
                *
              </span>
            </FieldLabel>
            <FieldContent>
              <InputGroup aria-invalid={!!emailError}>
                <InputGroupAddon>
                  <Mail className="size-4" />
                </InputGroupAddon>
                <InputGroupInput
                  aria-describedby={
                    emailError ? "forgot-password-email-error" : undefined
                  }
                  aria-invalid={!!emailError}
                  autoComplete="email"
                  id="forgot-password-email"
                  inputMode="email"
                  name="email"
                  onChange={handleEmailChange}
                  placeholder="name@example.com"
                  required
                  type="email"
                  value={email}
                />
              </InputGroup>
              {emailError && (
                <FieldError id="forgot-password-email-error">
                  {emailError}
                </FieldError>
              )}
              <FieldDescription>
                We&apos;ll send a password reset link to this email address
              </FieldDescription>
            </FieldContent>
          </Field>

          <div className="flex flex-col gap-2">
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
                  Sending reset link…
                </>
              ) : (
                "Send reset link"
              )}
            </Button>

            {onBack && (
              <Button
                className="w-full"
                onClick={onBack}
                type="button"
                variant="ghost"
              >
                <ArrowLeft className="size-4" />
                Back to sign in
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

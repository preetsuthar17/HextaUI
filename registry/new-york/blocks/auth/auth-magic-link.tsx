"use client";

import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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

export type MagicLinkStatus = "pending" | "sent" | "verified" | "expired";

export interface AuthMagicLinkProps {
  onSubmit?: (email: string) => void;
  onResend?: (email: string) => void;
  className?: string;
  defaultEmail?: string;
  isLoading?: boolean;
  status?: MagicLinkStatus;
  email?: string;
  resendCooldown?: number; // seconds
  errors?: {
    email?: string;
    general?: string;
  };
  successMessage?: string;
}

export default function AuthMagicLink({
  onSubmit,
  onResend,
  className,
  defaultEmail = "",
  isLoading = false,
  status = "pending",
  email: statusEmail,
  resendCooldown = 60,
  errors,
  successMessage = "We&apos;ve sent a magic link to your email address.",
}: AuthMagicLinkProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [cooldown, setCooldown] = useState(0);
  const [localErrors, setLocalErrors] = useState<{
    email?: string;
  }>({});

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

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

  const handleResend = useCallback(async () => {
    if (cooldown > 0) return;
    const emailToUse = statusEmail || email;
    if (emailToUse) {
      await onResend?.(emailToUse);
      setCooldown(resendCooldown);
    }
  }, [cooldown, onResend, statusEmail, email, resendCooldown]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (localErrors.email) {
      setLocalErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const emailError = errors?.email || localErrors.email;
  const generalError = errors?.general;
  const displayEmail = statusEmail || email;

  if (status === "verified") {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <CardTitle>Email verified</CardTitle>
          <CardDescription>You&apos;ve successfully signed in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="size-8 text-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-sm">
                You&apos;re all set! Redirecting…
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === "expired") {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <CardTitle>Link expired</CardTitle>
          <CardDescription>
            This magic link has expired. Please request a new one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-4 rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
                <XCircle className="size-8 text-destructive" />
              </div>
              <p className="text-destructive text-sm">
                The magic link has expired. Please request a new one.
              </p>
            </div>

            {onResend && (
              <Button
                aria-busy={isLoading}
                className="w-full"
                data-loading={isLoading}
                disabled={cooldown > 0 || isLoading}
                onClick={handleResend}
                type="button"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending…
                  </>
                ) : cooldown > 0 ? (
                  <>
                    <Clock className="size-4" />
                    Resend in {cooldown}s
                  </>
                ) : (
                  <>
                    <RefreshCw className="size-4" />
                    Request new magic link
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === "sent") {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>We&apos;ve sent you a magic link</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-4 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                <Mail className="size-8 text-primary" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium text-sm">{successMessage}</p>
                {displayEmail && (
                  <p className="text-muted-foreground text-sm">
                    Sent to <span className="font-medium">{displayEmail}</span>
                  </p>
                )}
                <p className="text-muted-foreground text-xs">
                  Click the link in the email to sign in. If you don&apos;t see
                  it, check your spam folder.
                </p>
              </div>
            </div>

            {onResend && (
              <Button
                aria-busy={isLoading}
                className="w-full"
                data-loading={isLoading}
                disabled={cooldown > 0 || isLoading}
                onClick={handleResend}
                type="button"
                variant="outline"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending…
                  </>
                ) : cooldown > 0 ? (
                  <>
                    <Clock className="size-4" />
                    Resend in {cooldown}s
                  </>
                ) : (
                  <>
                    <RefreshCw className="size-4" />
                    Resend magic link
                  </>
                )}
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
        <CardTitle>Sign in with magic link</CardTitle>
        <CardDescription>
          Enter your email and we&apos;ll send you a passwordless sign-in link
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
            <FieldLabel htmlFor="magic-link-email">
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
                    emailError ? "magic-link-email-error" : undefined
                  }
                  aria-invalid={!!emailError}
                  autoComplete="email"
                  id="magic-link-email"
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
                <FieldError id="magic-link-email-error">
                  {emailError}
                </FieldError>
              )}
              <FieldDescription>
                We&apos;ll send a secure link to sign in without a password
              </FieldDescription>
            </FieldContent>
          </Field>

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
                Sending magic link…
              </>
            ) : (
              <>
                <Mail className="size-4" />
                Send magic link
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

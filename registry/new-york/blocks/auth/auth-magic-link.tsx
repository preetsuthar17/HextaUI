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
  resendCooldown?: number;
  errors?: {
    email?: string;
    general?: string;
  };
  successMessage?: string;
}

function validateEmail(value: string): string | undefined {
  if (!value.trim()) {
    return "Email is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Please enter a valid email address";
  }
  return;
}

interface ErrorAlertProps {
  message: string;
}

function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div
      aria-live="polite"
      className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-destructive text-sm"
      role="alert"
    >
      {message}
    </div>
  );
}

interface EmailFieldProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

function EmailField({ id, value, onChange, error }: EmailFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>
        Email
        <span aria-label="required" className="text-destructive">
          *
        </span>
      </FieldLabel>
      <FieldContent>
        <InputGroup aria-invalid={!!error}>
          <InputGroupAddon>
            <Mail aria-hidden="true" className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={!!error}
            autoComplete="email"
            id={id}
            inputMode="email"
            name="email"
            onChange={onChange}
            placeholder="name@example.com…"
            required
            type="email"
            value={value}
          />
        </InputGroup>
        {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
        <FieldDescription>
          We&apos;ll send a secure link to sign in without a password
        </FieldDescription>
      </FieldContent>
    </Field>
  );
}

interface ResendButtonProps {
  cooldown: number;
  isLoading: boolean;
  onClick: () => void;
  variant?: "default" | "outline";
}

function ResendButton({
  cooldown,
  isLoading,
  onClick,
  variant = "default",
}: ResendButtonProps) {
  return (
    <Button
      aria-busy={isLoading}
      className="min-h-[44px] w-full touch-manipulation"
      data-loading={isLoading}
      disabled={cooldown > 0 || isLoading}
      onClick={onClick}
      type="button"
      variant={variant}
    >
      {isLoading ? (
        <>
          <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          Sending…
        </>
      ) : cooldown > 0 ? (
        <>
          <Clock aria-hidden="true" className="size-4" />
          Resend in {cooldown}s
        </>
      ) : (
        <>
          <RefreshCw aria-hidden="true" className="size-4" />
          {variant === "outline"
            ? "Resend magic link"
            : "Request new magic link"}
        </>
      )}
    </Button>
  );
}

interface VerifiedStateProps {
  className?: string;
}

function VerifiedState({ className }: VerifiedStateProps) {
  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <CardTitle>Email verified</CardTitle>
        <CardDescription>You&apos;ve successfully signed in</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 aria-hidden="true" className="size-8 text-primary" />
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

interface ExpiredStateProps {
  className?: string;
  cooldown: number;
  isLoading: boolean;
  onResend?: () => void;
}

function ExpiredState({
  className,
  cooldown,
  isLoading,
  onResend,
}: ExpiredStateProps) {
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
              <XCircle aria-hidden="true" className="size-8 text-destructive" />
            </div>
            <p className="text-destructive text-sm">
              The magic link has expired. Please request a new one.
            </p>
          </div>

          {onResend && (
            <ResendButton
              cooldown={cooldown}
              isLoading={isLoading}
              onClick={onResend}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface SentStateProps {
  className?: string;
  cooldown: number;
  displayEmail?: string;
  isLoading: boolean;
  message: string;
  onResend?: () => void;
}

function SentState({
  className,
  cooldown,
  displayEmail,
  isLoading,
  message,
  onResend,
}: SentStateProps) {
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
              <Mail aria-hidden="true" className="size-8 text-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-sm">{message}</p>
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
            <ResendButton
              cooldown={cooldown}
              isLoading={isLoading}
              onClick={onResend}
              variant="outline"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
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

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      if (localErrors.email) {
        setLocalErrors((prev) => ({ ...prev, email: validateEmail(value) }));
      }
    },
    [localErrors.email]
  );

  const emailError = errors?.email || localErrors.email;
  const generalError = errors?.general;
  const displayEmail = statusEmail || email;

  if (status === "verified") {
    return <VerifiedState className={className} />;
  }

  if (status === "expired") {
    return (
      <ExpiredState
        className={className}
        cooldown={cooldown}
        isLoading={isLoading}
        onResend={onResend ? handleResend : undefined}
      />
    );
  }

  if (status === "sent") {
    return (
      <SentState
        className={className}
        cooldown={cooldown}
        displayEmail={displayEmail}
        isLoading={isLoading}
        message={successMessage}
        onResend={onResend ? handleResend : undefined}
      />
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
          {generalError && <ErrorAlert message={generalError} />}

          <EmailField
            error={emailError}
            id="magic-link-email"
            onChange={handleEmailChange}
            value={email}
          />

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
                Sending magic link…
              </>
            ) : (
              <>
                <Mail aria-hidden="true" className="size-4" />
                Send magic link
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

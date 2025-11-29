"use client";

import { CheckCircle2, Eye, EyeOff, Loader2, Mail, Shield } from "lucide-react";
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

interface FormErrors {
  newEmail?: string;
  password?: string;
}

function validateEmail(
  value: string,
  currentEmail?: string
): string | undefined {
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
}

function validatePassword(value: string): string | undefined {
  if (!value) {
    return "Password is required";
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

interface CurrentEmailDisplayProps {
  email: string;
}

function CurrentEmailDisplay({ email }: CurrentEmailDisplayProps) {
  return (
    <section
      aria-label="Current email"
      className="flex items-center gap-3 rounded-lg border border-muted bg-background px-4 py-3"
    >
      <span className="hidden size-12 items-center justify-center rounded-full bg-muted/70 sm:flex">
        <Mail aria-hidden="true" className="size-4 text-muted-foreground" />
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-muted-foreground text-xs leading-none">
          Signed in as
        </span>
        <span
          className="truncate font-medium font-mono text-foreground text-sm"
          title={email}
        >
          {email}
        </span>
      </div>
    </section>
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
        New email address
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
            name="newEmail"
            onChange={onChange}
            placeholder="new@example.com…"
            required
            type="email"
            value={value}
          />
        </InputGroup>
        {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
        <FieldDescription>
          We&apos;ll send a verification link to this address
        </FieldDescription>
      </FieldContent>
    </Field>
  );
}

interface PasswordFieldProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  error?: string;
}

function PasswordField({
  id,
  value,
  onChange,
  showPassword,
  onTogglePassword,
  error,
}: PasswordFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>
        Password
        <span aria-label="required" className="text-destructive">
          *
        </span>
      </FieldLabel>
      <FieldContent>
        <InputGroup aria-invalid={!!error}>
          <InputGroupAddon>
            <Shield aria-hidden="true" className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={!!error}
            autoComplete="current-password"
            id={id}
            name="password"
            onChange={onChange}
            placeholder="Enter your password…"
            required
            type={showPassword ? "text" : "password"}
            value={value}
          />
          <InputGroupButton
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="min-h-[32px] min-w-[32px] touch-manipulation"
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
        {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
        <FieldDescription>
          Enter your current password to confirm this change
        </FieldDescription>
      </FieldContent>
    </Field>
  );
}

interface SuccessStateProps {
  message: string;
  newEmail?: string;
  className?: string;
}

function SuccessState({ message, newEmail, className }: SuccessStateProps) {
  return (
    <Card className={cn("w-full max-w-sm shadow-xs", className)}>
      <CardHeader>
        <CardTitle>Verification email sent</CardTitle>
        <CardDescription>
          Check your new email address to verify the change
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 aria-hidden="true" className="size-8 text-primary" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">{message}</p>
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
  const [localErrors, setLocalErrors] = useState<FormErrors>({});

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const newEmailError = validateEmail(newEmail, currentEmail);
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
    },
    [newEmail, password, currentEmail, onSubmit]
  );

  const handleNewEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setNewEmail(value);
      if (localErrors.newEmail) {
        setLocalErrors((prev) => ({
          ...prev,
          newEmail: validateEmail(value, currentEmail),
        }));
      }
    },
    [localErrors.newEmail, currentEmail]
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPassword(value);
      if (localErrors.password) {
        setLocalErrors((prev) => ({
          ...prev,
          password: validatePassword(value),
        }));
      }
    },
    [localErrors.password]
  );

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const newEmailError = errors?.newEmail || localErrors.newEmail;
  const passwordError = errors?.password || localErrors.password;
  const generalError = errors?.general;

  if (isSuccess) {
    return (
      <SuccessState
        className={className}
        message={successMessage}
        newEmail={newEmail}
      />
    );
  }

  return (
    <Card className={cn("w-full max-w-sm shadow-xs", className)}>
      <CardHeader>
        <CardTitle>Change email address</CardTitle>
        <CardDescription>
          Update your email address. We&apos;ll send a verification link to your
          new email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {generalError && <ErrorAlert message={generalError} />}

          {currentEmail && <CurrentEmailDisplay email={currentEmail} />}

          <div className="flex flex-col gap-4">
            <EmailField
              error={newEmailError}
              id="email-change-new"
              onChange={handleNewEmailChange}
              value={newEmail}
            />

            <PasswordField
              error={passwordError}
              id="email-change-password"
              onChange={handlePasswordChange}
              onTogglePassword={handleTogglePassword}
              showPassword={showPassword}
              value={password}
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
                Sending verification email…
              </>
            ) : (
              <>
                <Mail aria-hidden="true" className="size-4" />
                Change email address
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

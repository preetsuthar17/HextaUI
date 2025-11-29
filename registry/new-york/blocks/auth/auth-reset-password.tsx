"use client";

import { CheckCircle2, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
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
import { Progress } from "@/registry/new-york/ui/progress";

export interface PasswordStrength {
  score: number; // 0-4
  feedback: string[];
}

export interface AuthResetPasswordProps {
  token?: string;
  onSubmit?: (data: { password: string; token: string }) => void;
  onTokenValidate?: (token: string) => Promise<boolean>;
  className?: string;
  isLoading?: boolean;
  isTokenValid?: boolean;
  isTokenValidating?: boolean;
  errors?: {
    password?: string;
    confirmPassword?: string;
    token?: string;
    general?: string;
  };
}

function calculatePasswordStrength(password: string): PasswordStrength {
  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push("At least 8 characters");
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("One lowercase letter");
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("One uppercase letter");
  }

  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push("One number");
  }

  if (/[^a-zA-Z\d]/.test(password)) {
    score += 1;
  } else {
    feedback.push("One special character");
  }

  return { score, feedback };
}

function getStrengthLabel(score: number): string {
  if (score <= 1) return "Weak";
  if (score <= 2) return "Fair";
  if (score <= 3) return "Good";
  return "Strong";
}

function validatePassword(value: string): string | undefined {
  if (!value) {
    return "Password is required";
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
  return;
}

function validateConfirmPassword(
  value: string,
  passwordValue: string
): string | undefined {
  if (!value) {
    return "Please confirm your password";
  }
  if (value !== passwordValue) {
    return "Passwords do not match";
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

interface TokenValidatingStateProps {
  className?: string;
}

function TokenValidatingState({ className }: TokenValidatingStateProps) {
  return (
    <Card className={cn("w-full max-w-sm shadow-xs", className)}>
      <CardHeader>
        <CardTitle>Validating reset token</CardTitle>
        <CardDescription>
          Please wait while we verify your reset link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <Loader2
            aria-hidden="true"
            className="size-6 animate-spin text-muted-foreground"
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface InvalidTokenStateProps {
  className?: string;
  message?: string;
}

function InvalidTokenState({ className, message }: InvalidTokenStateProps) {
  return (
    <Card className={cn("w-full max-w-sm shadow-xs", className)}>
      <CardHeader>
        <CardTitle>Invalid reset link</CardTitle>
        <CardDescription>
          This password reset link is invalid or has expired
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
          {message || "Please request a new password reset link."}
        </div>
      </CardContent>
    </Card>
  );
}

interface PasswordStrengthIndicatorProps {
  feedback: string[];
  score: number;
}

function PasswordStrengthIndicator({
  feedback,
  score,
}: PasswordStrengthIndicatorProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <Progress
          aria-label={`Password strength: ${getStrengthLabel(score)}`}
          className="h-1.5"
          value={(score / 5) * 100}
        />
        <span
          className={cn(
            "font-medium text-xs",
            score <= 1 && "text-destructive",
            score === 2 && "text-yellow-500",
            score === 3 && "text-blue-500",
            score >= 4 && "text-green-500"
          )}
        >
          {getStrengthLabel(score)}
        </span>
      </div>
      {feedback.length > 0 && (
        <FieldDescription>
          <span className="text-xs">Missing: {feedback.join(", ")}</span>
        </FieldDescription>
      )}
    </div>
  );
}

interface PasswordFieldProps {
  error?: string;
  id: string;
  password: string;
  passwordStrength: PasswordStrength;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
  showPassword: boolean;
}

function PasswordField({
  error,
  id,
  password,
  passwordStrength,
  onChange,
  onTogglePassword,
  showPassword,
}: PasswordFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>
        New password
        <span aria-label="required" className="text-destructive">
          *
        </span>
      </FieldLabel>
      <FieldContent>
        <InputGroup aria-invalid={!!error}>
          <InputGroupAddon>
            <Lock aria-hidden="true" className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={!!error}
            autoComplete="new-password"
            id={id}
            name="password"
            onChange={onChange}
            placeholder="Enter new password…"
            required
            type={showPassword ? "text" : "password"}
            value={password}
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
        {password && (
          <PasswordStrengthIndicator
            feedback={passwordStrength.feedback}
            score={passwordStrength.score}
          />
        )}
      </FieldContent>
    </Field>
  );
}

interface ConfirmPasswordFieldProps {
  error?: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
  showPassword: boolean;
  value: string;
}

function ConfirmPasswordField({
  error,
  id,
  onChange,
  onTogglePassword,
  showPassword,
  value,
}: ConfirmPasswordFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>
        Confirm password
        <span aria-label="required" className="text-destructive">
          *
        </span>
      </FieldLabel>
      <FieldContent>
        <InputGroup aria-invalid={!!error}>
          <InputGroupAddon>
            <Lock aria-hidden="true" className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={!!error}
            autoComplete="new-password"
            id={id}
            name="confirmPassword"
            onChange={onChange}
            placeholder="Confirm new password…"
            required
            type={showPassword ? "text" : "password"}
            value={value}
          />
          <InputGroupButton
            aria-label={
              showPassword ? "Hide confirm password" : "Show confirm password"
            }
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
      </FieldContent>
    </Field>
  );
}

export default function AuthResetPassword({
  token = "",
  onSubmit,
  onTokenValidate,
  className,
  isLoading = false,
  isTokenValid,
  isTokenValidating = false,
  errors,
}: AuthResetPasswordProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localErrors, setLocalErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const passwordStrength = useMemo(
    () => calculatePasswordStrength(password),
    [password]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const passwordError = validatePassword(password);
      const confirmPasswordError = validateConfirmPassword(
        confirmPassword,
        password
      );

      if (passwordError || confirmPasswordError) {
        setLocalErrors({
          password: passwordError,
          confirmPassword: confirmPasswordError,
        });
        return;
      }

      setLocalErrors({});
      onSubmit?.({
        password,
        token,
      });
    },
    [password, confirmPassword, token, onSubmit]
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
      if (localErrors.confirmPassword && confirmPassword) {
        setLocalErrors((prev) => ({
          ...prev,
          confirmPassword: validateConfirmPassword(confirmPassword, value),
        }));
      }
    },
    [localErrors.password, localErrors.confirmPassword, confirmPassword]
  );

  const handleConfirmPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setConfirmPassword(value);
      if (localErrors.confirmPassword) {
        setLocalErrors((prev) => ({
          ...prev,
          confirmPassword: validateConfirmPassword(value, password),
        }));
      }
    },
    [localErrors.confirmPassword, password]
  );

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleToggleConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const passwordError = errors?.password || localErrors.password;
  const confirmPasswordError =
    errors?.confirmPassword || localErrors.confirmPassword;
  const generalError = errors?.general;
  const tokenError = errors?.token;

  if (onTokenValidate && isTokenValid === undefined && !isTokenValidating) {
    onTokenValidate(token);
  }

  if (isTokenValidating) {
    return <TokenValidatingState className={className} />;
  }

  if (isTokenValid === false || tokenError) {
    return <InvalidTokenState className={className} message={tokenError} />;
  }

  return (
    <Card className={cn("w-full max-w-sm shadow-xs", className)}>
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>Enter your new password below</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {generalError && <ErrorAlert message={generalError} />}

          <div className="flex flex-col gap-4">
            <PasswordField
              error={passwordError}
              id="reset-password"
              onChange={handlePasswordChange}
              onTogglePassword={handleTogglePassword}
              password={password}
              passwordStrength={passwordStrength}
              showPassword={showPassword}
            />

            <ConfirmPasswordField
              error={confirmPasswordError}
              id="reset-confirm-password"
              onChange={handleConfirmPasswordChange}
              onTogglePassword={handleToggleConfirmPassword}
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
                Resetting password…
              </>
            ) : (
              <>
                <CheckCircle2 aria-hidden="true" className="size-4" />
                Reset password
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

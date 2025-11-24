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

function getStrengthColor(score: number): string {
  if (score <= 1) return "bg-destructive";
  if (score <= 2) return "bg-yellow-500";
  if (score <= 3) return "bg-blue-500";
  return "bg-green-500";
}

function getStrengthLabel(score: number): string {
  if (score <= 1) return "Weak";
  if (score <= 2) return "Fair";
  if (score <= 3) return "Good";
  return "Strong";
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

  const validatePassword = (value: string): string | undefined => {
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (localErrors.confirmPassword) {
      setLocalErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(value, password),
      }));
    }
  };

  const passwordError = errors?.password || localErrors.password;
  const confirmPasswordError =
    errors?.confirmPassword || localErrors.confirmPassword;
  const generalError = errors?.general;
  const tokenError = errors?.token;

  // Token validation state
  if (onTokenValidate && isTokenValid === undefined && !isTokenValidating) {
    onTokenValidate(token);
  }

  if (isTokenValidating) {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <CardTitle>Validating reset token</CardTitle>
          <CardDescription>
            Please wait while we verify your reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isTokenValid === false || tokenError) {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <CardTitle>Invalid reset link</CardTitle>
          <CardDescription>
            This password reset link is invalid or has expired
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
            {tokenError || "Please request a new password reset link."}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>Enter your new password below</CardDescription>
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
            <Field data-invalid={!!passwordError}>
              <FieldLabel htmlFor="reset-password">
                New password
                <span aria-label="required" className="text-destructive">
                  *
                </span>
              </FieldLabel>
              <FieldContent>
                <InputGroup aria-invalid={!!passwordError}>
                  <InputGroupAddon>
                    <Lock className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    aria-describedby={
                      passwordError ? "reset-password-error" : undefined
                    }
                    aria-invalid={!!passwordError}
                    autoComplete="new-password"
                    id="reset-password"
                    name="password"
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
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
                  <FieldError id="reset-password-error">
                    {passwordError}
                  </FieldError>
                )}
                {password && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <Progress
                        aria-label={`Password strength: ${getStrengthLabel(passwordStrength.score)}`}
                        className="h-1.5"
                        value={(passwordStrength.score / 5) * 100}
                      />
                      <span
                        className={cn(
                          "font-medium text-xs",
                          passwordStrength.score <= 1 && "text-destructive",
                          passwordStrength.score === 2 && "text-yellow-500",
                          passwordStrength.score === 3 && "text-blue-500",
                          passwordStrength.score >= 4 && "text-green-500"
                        )}
                      >
                        {getStrengthLabel(passwordStrength.score)}
                      </span>
                    </div>
                    {passwordStrength.feedback.length > 0 && (
                      <FieldDescription>
                        <span className="text-xs">
                          Missing: {passwordStrength.feedback.join(", ")}
                        </span>
                      </FieldDescription>
                    )}
                  </div>
                )}
              </FieldContent>
            </Field>

            <Field data-invalid={!!confirmPasswordError}>
              <FieldLabel htmlFor="reset-confirm-password">
                Confirm password
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
                        ? "reset-confirm-password-error"
                        : undefined
                    }
                    aria-invalid={!!confirmPasswordError}
                    autoComplete="new-password"
                    id="reset-confirm-password"
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
                  <FieldError id="reset-confirm-password-error">
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
                Resetting password…
              </>
            ) : (
              <>
                <CheckCircle2 className="size-4" />
                Reset password
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

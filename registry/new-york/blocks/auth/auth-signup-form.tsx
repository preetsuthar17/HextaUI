"use client";

import { Eye, EyeOff, Github, Loader2, Lock, Mail, User } from "lucide-react";
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
import { Checkbox } from "@/registry/new-york/ui/checkbox";
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
import { Separator } from "@/registry/new-york/ui/separator";

export interface SocialProvider {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface AuthSignupFormProps {
  onSubmit?: (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }) => void;
  onSocialLogin?: (provider: string) => void;
  socialProviders?: SocialProvider[];
  showSocialLogin?: boolean;
  className?: string;
  isLoading?: boolean;
  errors?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    general?: string;
  };
  termsUrl?: string;
  privacyUrl?: string;
}

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1-1.265.06a6 6 0 1 0 2.103 6.836l.001-.004h-3.66a1 1 0 0 1-.992-.883L13 13v-2a1 1 0 0 1 1-1h6.945a1 1 0 0 1 .994.89q.06.55.061 1.11c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2"
      fill="currentColor"
    />
  </svg>
);

const DEFAULT_SOCIAL_PROVIDERS: SocialProvider[] = [
  { id: "google", name: "Google", icon: GoogleIcon },
  { id: "github", name: "GitHub", icon: Github },
];

export default function AuthSignupForm({
  onSubmit,
  onSocialLogin,
  socialProviders = DEFAULT_SOCIAL_PROVIDERS,
  showSocialLogin = true,
  className,
  isLoading = false,
  errors,
  termsUrl = "#",
  privacyUrl = "#",
}: AuthSignupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localErrors, setLocalErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});

  const validateName = (value: string): string | undefined => {
    if (!value.trim()) {
      return "Name is required";
    }
    if (value.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    return;
  };

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

      const nameError = validateName(name);
      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);
      const confirmPasswordError = validateConfirmPassword(
        confirmPassword,
        password
      );
      const termsError = acceptTerms ? undefined : "You must accept the terms";

      if (
        nameError ||
        emailError ||
        passwordError ||
        confirmPasswordError ||
        termsError
      ) {
        setLocalErrors({
          name: nameError,
          email: emailError,
          password: passwordError,
          confirmPassword: confirmPasswordError,
          terms: termsError,
        });
        return;
      }

      setLocalErrors({});
      onSubmit?.({
        name: name.trim(),
        email: email.trim(),
        password,
        confirmPassword,
        acceptTerms,
      });
    },
    [name, email, password, confirmPassword, acceptTerms, onSubmit]
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (localErrors.name) {
      setLocalErrors((prev) => ({ ...prev, name: validateName(value) }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (localErrors.email) {
      setLocalErrors((prev) => ({ ...prev, email: validateEmail(value) }));
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

  const nameError = errors?.name || localErrors.name;
  const emailError = errors?.email || localErrors.email;
  const passwordError = errors?.password || localErrors.password;
  const confirmPasswordError =
    errors?.confirmPassword || localErrors.confirmPassword;
  const termsError = errors?.terms || localErrors.terms;
  const generalError = errors?.general;

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your information to get started</CardDescription>
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

          {showSocialLogin && socialProviders.length > 0 && (
            <>
              <div className="flex flex-col gap-2">
                {socialProviders.map((provider) => {
                  const Icon = provider.icon;
                  return (
                    <Button
                      aria-label={`Sign up with ${provider.name}`}
                      className="w-full"
                      key={provider.id}
                      onClick={(e) => {
                        e.preventDefault();
                        onSocialLogin?.(provider.id);
                      }}
                      type="button"
                      variant="outline"
                    >
                      <Icon className="size-4" />
                      Continue with {provider.name}
                    </Button>
                  );
                })}
              </div>
              <div className="relative">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-background px-2 text-muted-foreground text-xs">
                    Or continue with email
                  </span>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col gap-4">
            <Field data-invalid={!!nameError}>
              <FieldLabel htmlFor="signup-name">
                Full name
                <span aria-label="required" className="text-destructive">
                  *
                </span>
              </FieldLabel>
              <FieldContent>
                <InputGroup aria-invalid={!!nameError}>
                  <InputGroupAddon>
                    <User className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    aria-describedby={
                      nameError ? "signup-name-error" : undefined
                    }
                    aria-invalid={!!nameError}
                    autoComplete="name"
                    id="signup-name"
                    name="name"
                    onChange={handleNameChange}
                    placeholder="John Doe"
                    required
                    type="text"
                    value={name}
                  />
                </InputGroup>
                {nameError && (
                  <FieldError id="signup-name-error">{nameError}</FieldError>
                )}
              </FieldContent>
            </Field>

            <Field data-invalid={!!emailError}>
              <FieldLabel htmlFor="signup-email">
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
                      emailError ? "signup-email-error" : undefined
                    }
                    aria-invalid={!!emailError}
                    autoComplete="email"
                    id="signup-email"
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
                  <FieldError id="signup-email-error">{emailError}</FieldError>
                )}
              </FieldContent>
            </Field>

            <Field data-invalid={!!passwordError}>
              <FieldLabel htmlFor="signup-password">
                Password
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
                      passwordError ? "signup-password-error" : undefined
                    }
                    aria-invalid={!!passwordError}
                    autoComplete="new-password"
                    id="signup-password"
                    name="password"
                    onChange={handlePasswordChange}
                    placeholder="Create a password"
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
                  <FieldError id="signup-password-error">
                    {passwordError}
                  </FieldError>
                )}
                <FieldDescription>
                  Must be at least 8 characters with uppercase, lowercase, and
                  number
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field data-invalid={!!confirmPasswordError}>
              <FieldLabel htmlFor="signup-confirm-password">
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
                        ? "signup-confirm-password-error"
                        : undefined
                    }
                    aria-invalid={!!confirmPasswordError}
                    autoComplete="new-password"
                    id="signup-confirm-password"
                    name="confirmPassword"
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirm your password"
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
                  <FieldError id="signup-confirm-password-error">
                    {confirmPasswordError}
                  </FieldError>
                )}
              </FieldContent>
            </Field>

            <Field data-invalid={!!termsError}>
              <FieldContent className="flex flex-col">
                <div className="flex items-start gap-2">
                  <Checkbox
                    checked={acceptTerms}
                    id="accept-terms"
                    onCheckedChange={(checked) =>
                      setAcceptTerms(checked === true)
                    }
                  />
                  <label
                    className="cursor-pointer text-sm leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="accept-terms"
                  >
                    I agree to the{" "}
                    <a
                      className="rounded-sm text-primary underline underline-offset-4 hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      href={termsUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      className="rounded-sm text-primary underline underline-offset-4 hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      href={privacyUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Privacy Policy
                    </a>
                    <span aria-label="required" className="text-destructive">
                      *
                    </span>
                  </label>
                </div>
                {termsError && <FieldError>{termsError}</FieldError>}
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
                Creating account…
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import { Eye, EyeOff, Github, Loader2, Lock, Mail } from "lucide-react";
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

export interface AuthLoginFormProps {
  onSubmit?: (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => void;
  onSocialLogin?: (provider: string) => void;
  socialProviders?: SocialProvider[];
  showRememberMe?: boolean;
  showSocialLogin?: boolean;
  className?: string;
  defaultEmail?: string;
  isLoading?: boolean;
  errors?: {
    email?: string;
    password?: string;
    general?: string;
  };
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

function validatePassword(value: string): string | undefined {
  if (!value) {
    return "Password is required";
  }
  if (value.length < 6) {
    return "Password must be at least 6 characters";
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
            <Lock aria-hidden="true" className="size-4" />
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
      </FieldContent>
    </Field>
  );
}

interface RememberMeCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id: string;
}

function RememberMeCheckbox({
  checked,
  onCheckedChange,
  id,
}: RememberMeCheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={checked}
        id={id}
        onCheckedChange={(checked) => onCheckedChange(checked === true)}
      />
      <label
        className="cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor={id}
      >
        Remember me
      </label>
    </div>
  );
}

interface SocialLoginButtonsProps {
  providers: SocialProvider[];
  onSocialLogin?: (provider: string) => void;
}

function SocialLoginButtons({
  providers,
  onSocialLogin,
}: SocialLoginButtonsProps) {
  return (
    <div className="flex flex-col gap-2">
      {providers.map((provider) => {
        const Icon = provider.icon;
        return (
          <Button
            aria-label={`Sign in with ${provider.name}`}
            className="min-h-[44px] w-full touch-manipulation"
            key={provider.id}
            onClick={(e) => {
              e.preventDefault();
              onSocialLogin?.(provider.id);
            }}
            type="button"
            variant="outline"
          >
            <Icon aria-hidden="true" className="size-4" />
            Continue with {provider.name}
          </Button>
        );
      })}
    </div>
  );
}

function EmailSeparator() {
  return (
    <div className="relative">
      <Separator />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="bg-card px-2 text-muted-foreground text-xs">
          Or continue with email
        </span>
      </div>
    </div>
  );
}

export default function AuthLoginForm({
  onSubmit,
  onSocialLogin,
  socialProviders = DEFAULT_SOCIAL_PROVIDERS,
  showRememberMe = true,
  showSocialLogin = true,
  className,
  defaultEmail = "",
  isLoading = false,
  errors,
}: AuthLoginFormProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [localErrors, setLocalErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);

      if (emailError || passwordError) {
        setLocalErrors({
          email: emailError,
          password: passwordError,
        });
        return;
      }

      setLocalErrors({});
      onSubmit?.({
        email: email.trim(),
        password,
        rememberMe,
      });
    },
    [email, password, rememberMe, onSubmit]
  );

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

  const handleRememberMeChange = useCallback((checked: boolean) => {
    setRememberMe(checked);
  }, []);

  const emailError = errors?.email || localErrors.email;
  const passwordError = errors?.password || localErrors.password;
  const generalError = errors?.general;

  return (
    <Card className={cn("w-full shadow-xs max-w-sm", className)}>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {generalError && <ErrorAlert message={generalError} />}

          {showSocialLogin && socialProviders.length > 0 && (
            <>
              <SocialLoginButtons
                onSocialLogin={onSocialLogin}
                providers={socialProviders}
              />
              <EmailSeparator />
            </>
          )}

          <div className="flex flex-col gap-4">
            <EmailField
              error={emailError}
              id="login-email"
              onChange={handleEmailChange}
              value={email}
            />

            <PasswordField
              error={passwordError}
              id="login-password"
              onChange={handlePasswordChange}
              onTogglePassword={handleTogglePassword}
              showPassword={showPassword}
              value={password}
            />

            {showRememberMe && (
              <RememberMeCheckbox
                checked={rememberMe}
                id="remember-me"
                onCheckedChange={handleRememberMeChange}
              />
            )}
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
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

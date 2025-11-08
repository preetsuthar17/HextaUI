"use client";

import { Eye, EyeOff, Github, Loader2, Lock, Mail } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
    return;
  };

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
  };

  const emailError = errors?.email || localErrors.email;
  const passwordError = errors?.password || localErrors.password;
  const generalError = errors?.general;

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
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

          {showSocialLogin && socialProviders.length > 0 && (
            <>
              <div className="flex flex-col gap-2">
                {socialProviders.map((provider) => {
                  const Icon = provider.icon;
                  return (
                    <Button
                      aria-label={`Sign in with ${provider.name}`}
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
            <Field data-invalid={!!emailError}>
              <FieldLabel htmlFor="login-email">
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
                      emailError ? "login-email-error" : undefined
                    }
                    aria-invalid={!!emailError}
                    autoComplete="email"
                    id="login-email"
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
                  <FieldError id="login-email-error">{emailError}</FieldError>
                )}
              </FieldContent>
            </Field>

            <Field data-invalid={!!passwordError}>
              <FieldLabel htmlFor="login-password">
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
                      passwordError ? "login-password-error" : undefined
                    }
                    aria-invalid={!!passwordError}
                    autoComplete="current-password"
                    id="login-password"
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
                  <FieldError id="login-password-error">
                    {passwordError}
                  </FieldError>
                )}
              </FieldContent>
            </Field>

            {showRememberMe && (
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={rememberMe}
                  id="remember-me"
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <label
                  className="cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="remember-me"
                >
                  Remember me
                </label>
              </div>
            )}
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

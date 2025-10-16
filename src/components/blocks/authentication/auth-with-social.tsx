"use client";

import {
  Eye,
  EyeOff,
  Facebook,
  Github,
  Mail as Google,
  Lock,
  Twitter,
} from "lucide-react";
import Link from "next/link";
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
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

type Provider = "google" | "github" | "facebook" | "twitter";

interface AuthWithSocialProps {
  mode?: "signin" | "signup";
  redirectTo?: string;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  fullName?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
  general?: string;
}

const validate = (data: FormData, mode: "signin" | "signup"): FormErrors => {
  const errors: FormErrors = {};
  if (!data.email) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email address";

  if (!data.password) errors.password = "Password is required";
  else if (data.password.length < 6)
    errors.password = "Password must be at least 6 characters";

  if (mode === "signup") {
    if (!data.fullName) errors.fullName = "Full name is required";
    if (!data.confirmPassword)
      errors.confirmPassword = "Please confirm your password";
    else if (data.password !== data.confirmPassword)
      errors.confirmPassword = "Passwords don't match";
  }
  return errors;
};

export default function AuthWithSocialBlock({
  mode = "signin",
  redirectTo = "/dashboard",
}: AuthWithSocialProps) {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const providers: Array<{
    id: Provider;
    name: string;
    icon: React.ReactNode;
  }> = [
    { id: "google", name: "Google", icon: <Google className="size-4" /> },
    { id: "github", name: "GitHub", icon: <Github className="size-4" /> },
    { id: "facebook", name: "Facebook", icon: <Facebook className="size-4" /> },
    { id: "twitter", name: "Twitter", icon: <Twitter className="size-4" /> },
  ];

  const handleField = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(formData, mode);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    setErrors({});
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Demo only; integrate with your auth flow
      window.location.href = redirectTo;
    } catch {
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: Provider) => {
    setLoadingProvider(provider);
    setErrors({});
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Demo only; integrate with your social auth flow
      window.location.href = redirectTo;
    } catch {
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md gap-8 shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="font-bold text-2xl tracking-tight">
          {mode === "signup" ? "Create your account" : "Welcome back!"}
        </CardTitle>
        <CardDescription>
          {mode === "signup"
            ? "Sign up to get started with your account."
            : "Sign in to your account to continue."}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {errors.general ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-destructive text-sm">
            {errors.general}
          </div>
        ) : null}

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 overflow-hidden rounded-md border">
            {providers.map((provider, idx) => {
              const classes = [
                idx === 0 ? "rounded-tl-md rounded-none" : "rounded-none",
                idx == 1 ? "rounded-tr-md rounded-none" : "",
                idx == 2 ? "rounded-bl-md rounded-none" : "",
                idx == 3 ? "rounded-br-md rounded-none" : "",
                idx >= 2 ? "border-t" : "",
                idx === 0 ? "border-r" : "",
                idx === 2 ? "border-r" : "",
                "flex items-center justify-center w-full h-full py-3",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <Button
                  className={classes}
                  disabled={loadingProvider !== null || isLoading}
                  key={provider.id}
                  onClick={() => handleSocialAuth(provider.id)}
                  type="button"
                  variant="ghost"
                >
                  {loadingProvider === provider.id ? (
                    <Spinner />
                  ) : (
                    provider.icon
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        <div
          aria-label="OR CONTINUE WITH EMAIL"
          className="flex items-center gap-3"
        >
          <div aria-hidden="true" className="h-px flex-1 bg-border" />
          <span className="select-none font-medium text-muted-foreground text-xs">
            OR CONTINUE WITH EMAIL
          </span>
          <div aria-hidden="true" className="h-px flex-1 bg-border" />
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            {mode === "signup" ? (
              <div className="flex flex-col gap-2">
                <Label htmlFor="fullName">Full name</Label>
                <InputGroup aria-invalid={errors.fullName ? true : undefined}>
                  <InputGroupInput
                    aria-describedby={
                      errors.fullName ? "fullName-error" : undefined
                    }
                    disabled={isLoading}
                    id="fullName"
                    onChange={(e) => handleField("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    type="text"
                    value={formData.fullName ?? ""}
                  />
                </InputGroup>
                {errors.fullName ? (
                  <p className="text-destructive text-sm" id="fullName-error">
                    {errors.fullName}
                  </p>
                ) : null}
              </div>
            ) : null}

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <InputGroup aria-invalid={errors.email ? true : undefined}>
                <InputGroupInput
                  aria-describedby={errors.email ? "email-error" : undefined}
                  autoComplete="email"
                  disabled={isLoading}
                  id="email"
                  onChange={(e) => handleField("email", e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                  value={formData.email}
                />
                <InputGroupAddon align="inline-start">
                  <Google className="size-4" />
                </InputGroupAddon>
              </InputGroup>
              {errors.email ? (
                <p className="text-destructive text-sm" id="email-error">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <InputGroup aria-invalid={errors.password ? true : undefined}>
                <InputGroupInput
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  autoComplete={
                    mode === "signup" ? "new-password" : "current-password"
                  }
                  disabled={isLoading}
                  id="password"
                  onChange={(e) => handleField("password", e.target.value)}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                />
                <InputGroupAddon align="inline-start">
                  <Lock className="size-4" />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    size="icon-xs"
                    variant="ghost"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {errors.password ? (
                <p className="text-destructive text-sm" id="password-error">
                  {errors.password}
                </p>
              ) : null}
            </div>

            {mode === "signup" ? (
              <div className="flex flex-col gap-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <InputGroup
                  aria-invalid={errors.confirmPassword ? true : undefined}
                >
                  <InputGroupInput
                    aria-describedby={
                      errors.confirmPassword
                        ? "confirmPassword-error"
                        : undefined
                    }
                    autoComplete="new-password"
                    disabled={isLoading}
                    id="confirmPassword"
                    onChange={(e) =>
                      handleField("confirmPassword", e.target.value)
                    }
                    placeholder="Confirm your password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword ?? ""}
                  />
                  <InputGroupAddon align="inline-start">
                    <Lock className="size-4" />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      size="icon-xs"
                      variant="ghost"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {errors.confirmPassword ? (
                  <p
                    className="text-destructive text-sm"
                    id="confirmPassword-error"
                  >
                    {errors.confirmPassword}
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="flex justify-end">
                <Link
                  className="text-primary text-sm underline-offset-4 hover:underline"
                  href="#"
                >
                  Forgot password?
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Button
              className="w-full"
              disabled={isLoading || loadingProvider !== null}
              type="submit"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  {mode === "signup" ? "Creating account…" : "Signing in…"}
                </>
              ) : mode === "signup" ? (
                "Create account"
              ) : (
                "Sign in"
              )}
            </Button>

            <div className="text-center">
              <p className="text-muted-foreground text-sm">
                {mode === "signup" ? (
                  <>
                    Already have an account?{" "}
                    <Link
                      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                      href="/auth/signin"
                    >
                      Sign in
                    </Link>
                  </>
                ) : (
                  <>
                    Dont have an account?{" "}
                    <Link
                      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                      href="/auth/signup"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

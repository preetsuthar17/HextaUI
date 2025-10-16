"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  rememberMe?: string;
  general?: string;
}

const validateForm = (data: SignInFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  return errors;
};

interface FormFieldProps {
  id: string;
  label?: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  autoComplete?: string;
}

function FormField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  icon,
  showPasswordToggle,
  showPassword,
  onTogglePassword,
  autoComplete,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <InputGroup aria-invalid={error ? true : undefined}>
        <InputGroupInput
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete={autoComplete}
          disabled={disabled}
          id={id}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          type={type}
          value={value}
        />
        {icon ? (
          <InputGroupAddon align="inline-start">{icon}</InputGroupAddon>
        ) : null}
        {showPasswordToggle ? (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={onTogglePassword}
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
        ) : null}
      </InputGroup>
      {error ? (
        <p className="text-destructive text-sm" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function SignInBlock() {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (
    field: keyof SignInFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md gap-8 shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="font-bold text-2xl tracking-tight">
          Welcome Back
        </CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>

      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-4">
          {errors.general ? (
            <Alert variant="destructive">
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          ) : null}

          <FormField
            autoComplete="email"
            disabled={isLoading}
            error={errors.email}
            icon={<Mail className="size-4" />}
            id="email"
            label="Email"
            onChange={(value) => handleInputChange("email", value)}
            placeholder="john.doe@example.com"
            type="email"
            value={formData.email}
          />

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                className="text-primary text-sm underline-offset-4 hover:underline"
                href="#"
              >
                Forgot password?
              </Link>
            </div>
            <FormField
              autoComplete="current-password"
              disabled={isLoading}
              error={errors.password}
              icon={<Lock className="size-4" />}
              id="password"
              onChange={(value) => handleInputChange("password", value)}
              onTogglePassword={() => setShowPassword(!showPassword)}
              placeholder="Enter your password"
              showPassword={showPassword}
              showPasswordToggle
              type={showPassword ? "text" : "password"}
              value={formData.password}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.rememberMe}
                disabled={isLoading}
                id="rememberMe"
                onCheckedChange={(checked) =>
                  handleInputChange("rememberMe", checked === true)
                }
              />
              <Label className="text-sm" htmlFor="rememberMe">
                Remember me
              </Label>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <Spinner />
                Sign In
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Dont have an account?{" "}
              <Link
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                href="#"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

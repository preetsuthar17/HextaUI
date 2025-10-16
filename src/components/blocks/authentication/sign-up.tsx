"use client";

import { CheckCircle, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
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

// Types
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface FormErrors {
  [key: string]: string | undefined;
}

// Validation utility
const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim()) errors.lastName = "Last name is required";

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
    errors.password = "Password must contain uppercase, lowercase, and number";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords don't match";
  }

  if (!data.acceptTerms) {
    errors.acceptTerms = "You must accept the terms and conditions";
  }

  return errors;
};

// Form Field Component
interface FormFieldProps {
  id: string;
  label: string;
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
      <Label htmlFor={id}>
        {label} <span className="text-destructive">*</span>
      </Label>
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

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <Card className="mx-auto w-full max-w-md shadow-none">
      <CardHeader>
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="size-6 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-center font-semibold text-2xl text-green-700 tracking-tight dark:text-green-400">
            Account created!
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Check your email&nbsp;for verification before signing in.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          aria-live="polite"
          className="w-full"
          onClick={onReset}
          type="button"
          variant="outline"
        >
          Sign up another account
        </Button>
      </CardContent>
    </Card>
  );
}

// Main Component
export default function SignUpBlock() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (
    field: keyof FormData,
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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      });
    } catch (error) {
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return <SuccessState onReset={() => setIsSuccess(false)} />;
  }

  return (
    <Card className="mx-auto w-full max-w-md gap-8 shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="font-bold text-2xl tracking-tight">
          Create Account
        </CardTitle>
        <CardDescription>
          Enter your information to create a new account
        </CardDescription>
      </CardHeader>

      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-4">
          {errors.general && (
            <Alert variant="destructive">
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4">
            <FormField
              autoComplete="given-name"
              disabled={isLoading}
              error={errors.firstName}
              icon={<User className="size-4" />}
              id="firstName"
              label="First Name"
              onChange={(value) => handleInputChange("firstName", value)}
              placeholder="John"
              type="text"
              value={formData.firstName}
            />
            <FormField
              autoComplete="family-name"
              disabled={isLoading}
              error={errors.lastName}
              icon={<User className="size-4" />}
              id="lastName"
              label="Last Name"
              onChange={(value) => handleInputChange("lastName", value)}
              placeholder="Doe"
              type="text"
              value={formData.lastName}
            />
          </div>

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

          <FormField
            autoComplete="new-password"
            disabled={isLoading}
            error={errors.password}
            icon={<Lock className="size-4" />}
            id="password"
            label="Password"
            onChange={(value) => handleInputChange("password", value)}
            onTogglePassword={() => setShowPassword(!showPassword)}
            placeholder="Create a strong password"
            showPassword={showPassword}
            showPasswordToggle
            type={showPassword ? "text" : "password"}
            value={formData.password}
          />

          <FormField
            autoComplete="new-password"
            disabled={isLoading}
            error={errors.confirmPassword}
            icon={<Lock className="size-4" />}
            id="confirmPassword"
            label="Confirm Password"
            onChange={(value) => handleInputChange("confirmPassword", value)}
            onTogglePassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            placeholder="Confirm your password"
            showPassword={showConfirmPassword}
            showPasswordToggle
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
          />

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                aria-describedby={
                  errors.acceptTerms ? "acceptTerms-error" : undefined
                }
                checked={formData.acceptTerms}
                disabled={isLoading}
                id="acceptTerms"
                onCheckedChange={(checked) =>
                  handleInputChange("acceptTerms", checked === true)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  className="font-normal text-sm leading-relaxed"
                  htmlFor="acceptTerms"
                >
                  I agree to the{" "}
                  <Link
                    className="text-primary underline underline-offset-4 hover:text-primary/80"
                    href="/terms"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    className="text-primary underline underline-offset-4 hover:text-primary/80"
                    href="/privacy"
                  >
                    Privacy Policy
                  </Link>
                </Label>
                {errors.acceptTerms && (
                  <p
                    className="text-destructive text-sm"
                    id="acceptTerms-error"
                  >
                    {errors.acceptTerms}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <Spinner />
                Create Account
              </>
            ) : (
              "Create Account"
            )}
          </Button>

          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                href="/sign-in"
              >
                Sign In
              </Link>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

"use client";

import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

interface PasswordResetFormData {
  email: string;
}

interface FormErrors {
  email?: string;
  general?: string;
}

const validateForm = (data: PasswordResetFormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  return errors;
};

function SuccessState({
  email,
  onReset,
}: {
  email: string;
  onReset: () => void;
}) {
  return (
    <Card className="mx-auto w-full max-w-md shadow-none">
      <CardHeader>
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="size-6 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-center font-semibold text-2xl text-green-700 tracking-tight dark:text-green-400">
            Check your email
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Weve sent a password reset link to{" "}
            <span className="font-medium">{email}</span>
          </CardDescription>
        </div>
      </CardHeader>

      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full"
          onClick={onReset}
          type="button"
          variant="outline"
        >
          Send another reset link
        </Button>
        <Button className="w-full" type="button" variant="ghost">
          <Link
            className="flex items-center justify-center gap-2 text-muted-foreground text-sm"
            href="#"
          >
            <ArrowLeft className="size-4" />
            Back to Sign In
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function PasswordResetBlock() {
  const [formData, setFormData] = useState<PasswordResetFormData>({
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    field: keyof PasswordResetFormData,
    value: string
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
      setIsSuccess(true);
    } catch (error) {
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <SuccessState
        email={formData.email}
        onReset={() => setIsSuccess(false)}
      />
    );
  }

  return (
    <Card className="mx-auto w-full max-w-md gap-8 shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="font-bold text-2xl tracking-tight">
          Reset Password
        </CardTitle>
        <CardDescription>
          Enter your email address and well send you a link to reset your
          password
        </CardDescription>
      </CardHeader>

      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-4">
          {errors.general ? (
            <Alert variant="destructive">
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          ) : null}

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email address</Label>
            <InputGroup aria-invalid={errors.email ? true : undefined}>
              <InputGroupInput
                aria-describedby={errors.email ? "email-error" : undefined}
                autoComplete="email"
                disabled={isLoading}
                id="email"
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john.doe@example.com"
                type="email"
                value={formData.email}
              />
              <InputGroupAddon align="inline-start">
                <Mail className="size-4" />
              </InputGroupAddon>
            </InputGroup>
            {errors.email ? (
              <p className="text-destructive text-sm" id="email-error">
                {errors.email}
              </p>
            ) : null}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <Spinner />
                Send Reset Link
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>

          <Button className="w-full" type="button" variant="ghost">
            <span className="inline-flex items-center justify-center gap-2 text-muted-foreground text-sm hover:text-foreground">
              <ArrowLeft className="size-4" />
              Back to Sign In
            </span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

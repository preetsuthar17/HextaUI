"use client";

import { ArrowLeft, RefreshCw, Shield } from "lucide-react";
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
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

interface FormErrors {
  code?: string;
  general?: string;
}

export default function TwoFactorAuthBlock() {
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleCodeChange = (value: string) => {
    setCode(value);
    if (errors.code) setErrors((prev) => ({ ...prev, code: undefined }));
  };

  const handleCodeComplete = (value: string) => {
    setCode(value);
    if (value.length === 6) handleSubmit();
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (code.length !== 6)
      newErrors.code = "Please enter the complete 6-digit code";
    else if (!/^\d{6}$/.test(code))
      newErrors.code = "Code must contain only numbers";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (code !== "123456")
        setErrors({ general: "Invalid verification code. Please try again." });
    } catch {
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setErrors({});
    setResendSuccess(false);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResendSuccess(true);
      setCode("");
      setTimeout(() => setResendSuccess(false), 5000);
    } catch {
      setErrors({ general: "Failed to resend code. Please try again." });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md gap-8 shadow-none">
      <CardHeader className="text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Shield className="size-6 text-primary" />
          </div>
          <CardTitle className="font-bold text-2xl tracking-tight">
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your device
          </CardDescription>
        </div>
      </CardHeader>

      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-4">
          {errors.general ? (
            <Alert variant="destructive">
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          ) : null}

          {resendSuccess ? (
            <Alert>
              <AlertDescription>
                New verification code sent successfully!
              </AlertDescription>
            </Alert>
          ) : null}

          <div className="flex flex-col items-center gap-2">
            <Label className="text-center" htmlFor="otp">
              Verification code
            </Label>
            <InputOTP
              disabled={isLoading}
              id="otp"
              maxLength={6}
              onChange={handleCodeChange}
              onComplete={handleCodeComplete}
              pattern="[0-9]*"
              value={code}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {errors.code ? (
              <p className="text-center text-destructive text-sm">
                {errors.code}
              </p>
            ) : null}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Didnt receive the code?{" "}
              <button
                className="text-primary underline-offset-4 hover:underline disabled:opacity-50"
                disabled={isResending}
                onClick={handleResendCode}
                type="button"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="mr-1 inline size-3 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Resend code"
                )}
              </button>
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full"
            disabled={isLoading || code.length < 6}
            type="submit"
          >
            {isLoading ? (
              <>
                <Spinner />
                Verifying…
              </>
            ) : (
              "Verify code"
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

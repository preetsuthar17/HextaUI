"use client";

import { Loader2, RefreshCw, Shield, ShieldCheck } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface AuthTwoFactorVerifyProps {
  onSubmit?: (code: string) => void;
  onRecoveryCode?: (code: string) => void;
  onResend?: () => void;
  className?: string;
  isLoading?: boolean;
  resendCooldown?: number; // seconds
  errors?: {
    code?: string;
    recoveryCode?: string;
    general?: string;
  };
  autoSubmit?: boolean;
}

export default function AuthTwoFactorVerify({
  onSubmit,
  onRecoveryCode,
  onResend,
  className,
  isLoading = false,
  resendCooldown = 60,
  errors,
  autoSubmit = true,
}: AuthTwoFactorVerifyProps) {
  const [code, setCode] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [useRecoveryCode, setUseRecoveryCode] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  useEffect(() => {
    if (autoSubmit && code.length === 6 && !isLoading && !useRecoveryCode) {
      onSubmit?.(code);
    }
  }, [code, autoSubmit, isLoading, useRecoveryCode, onSubmit]);

  const handleResend = useCallback(async () => {
    if (cooldown > 0) return;
    await onResend?.();
    setCooldown(resendCooldown);
  }, [cooldown, onResend, resendCooldown]);

  const handleRecoveryCodeSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (recoveryCode.trim()) {
        onRecoveryCode?.(recoveryCode.trim());
      }
    },
    [recoveryCode, onRecoveryCode]
  );

  const codeError = errors?.code;
  const recoveryCodeError = errors?.recoveryCode;
  const generalError = errors?.general;

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="size-5" />
          Verify two-factor authentication
        </CardTitle>
        <CardDescription>
          Enter the 6-digit code from your authenticator app
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {generalError && (
            <div
              aria-live="polite"
              className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-destructive text-sm"
              role="alert"
            >
              {generalError}
            </div>
          )}

          {useRecoveryCode ? (
            <form
              className="flex flex-col gap-4"
              onSubmit={handleRecoveryCodeSubmit}
            >
              <Field data-invalid={!!recoveryCodeError}>
                <FieldLabel htmlFor="recovery-code">
                  Recovery code
                  <span aria-label="required" className="text-destructive">
                    *
                  </span>
                </FieldLabel>
                <FieldContent>
                  <InputGroup aria-invalid={!!recoveryCodeError}>
                    <InputGroupAddon>
                      <ShieldCheck className="size-4" />
                    </InputGroupAddon>
                    <InputGroupInput
                      aria-describedby={
                        recoveryCodeError ? "recovery-code-error" : undefined
                      }
                      aria-invalid={!!recoveryCodeError}
                      autoComplete="one-time-code"
                      id="recovery-code"
                      name="recoveryCode"
                      onChange={(e) => setRecoveryCode(e.target.value)}
                      placeholder="Enter recovery code"
                      required
                      type="text"
                      value={recoveryCode}
                    />
                  </InputGroup>
                  {recoveryCodeError && (
                    <FieldError id="recovery-code-error">
                      {recoveryCodeError}
                    </FieldError>
                  )}
                </FieldContent>
              </Field>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  aria-busy={isLoading}
                  className="w-full sm:w-auto"
                  data-loading={isLoading}
                  disabled={isLoading || !recoveryCode.trim()}
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Verifying…
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="size-4" />
                      Verify recovery code
                    </>
                  )}
                </Button>
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setUseRecoveryCode(false);
                    setRecoveryCode("");
                  }}
                  type="button"
                  variant="outline"
                >
                  Use authenticator code
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-4">
              <Field data-invalid={!!codeError}>
                <FieldLabel htmlFor="2fa-code">
                  Authentication code
                  <span aria-label="required" className="text-destructive">
                    *
                  </span>
                </FieldLabel>
                <FieldContent>
                  <InputOTP
                    aria-describedby={codeError ? "2fa-code-error" : undefined}
                    aria-invalid={!!codeError}
                    disabled={isLoading}
                    id="2fa-code"
                    maxLength={6}
                    onChange={setCode}
                    value={code}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  {codeError && (
                    <FieldError id="2fa-code-error">{codeError}</FieldError>
                  )}
                  <div className="flex flex-col gap-2 text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between">
                    <span>Enter the 6-digit code from your app</span>
                    {onResend && (
                      <button
                        className="self-start rounded-sm hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
                        disabled={cooldown > 0 || isLoading}
                        onClick={handleResend}
                        type="button"
                      >
                        {cooldown > 0 ? (
                          `Resend in ${cooldown}s`
                        ) : (
                          <span className="flex items-center gap-1">
                            <RefreshCw className="size-3" />
                            Resend code
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                </FieldContent>
              </Field>

              {onRecoveryCode && (
                <>
                  <div className="relative">
                    <Separator />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-background px-2 text-muted-foreground text-xs">
                        Or
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setUseRecoveryCode(true)}
                    type="button"
                    variant="ghost"
                  >
                    Use recovery code instead
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

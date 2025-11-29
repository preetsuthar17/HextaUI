"use client";

import { Loader2, RefreshCw, Shield, ShieldCheck } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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
  FieldError,
  FieldLabel,
} from "@/registry/new-york/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/new-york/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/registry/new-york/ui/input-otp";
import { Separator } from "@/registry/new-york/ui/separator";

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

function Header() {
  return (
    <>
      <CardTitle className="flex items-center gap-2">
        Verify two-factor authentication
      </CardTitle>
      <CardDescription>
        Enter the 6-digit code from your authenticator app
      </CardDescription>
    </>
  );
}

interface RecoveryCodeFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function RecoveryCodeField({ value, onChange, error }: RecoveryCodeFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor="recovery-code">
        Recovery code
        <span aria-label="required" className="text-destructive">
          *
        </span>
      </FieldLabel>
      <FieldContent>
        <InputGroup aria-invalid={!!error}>
          <InputGroupAddon>
            <ShieldCheck aria-hidden="true" className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            aria-describedby={error ? "recovery-code-error" : undefined}
            aria-invalid={!!error}
            autoComplete="one-time-code"
            id="recovery-code"
            name="recoveryCode"
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter recovery code…"
            required
            type="text"
            value={value}
          />
        </InputGroup>
        {error && <FieldError id="recovery-code-error">{error}</FieldError>}
      </FieldContent>
    </Field>
  );
}

interface VerifyRecoveryCodeButtonProps {
  isLoading: boolean;
  disabled: boolean;
}

function VerifyRecoveryCodeButton({
  isLoading,
  disabled,
}: VerifyRecoveryCodeButtonProps) {
  return (
    <Button
      aria-busy={isLoading}
      className="min-h-[44px] w-full touch-manipulation sm:min-h-[32px] sm:w-auto"
      data-loading={isLoading}
      disabled={disabled}
      type="submit"
    >
      {isLoading ? (
        <>
          <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          Verifying…
        </>
      ) : (
        <>
          <ShieldCheck aria-hidden="true" className="size-4" />
          Verify recovery code
        </>
      )}
    </Button>
  );
}

interface SwitchToAuthenticatorButtonProps {
  onSwitch: () => void;
}

function SwitchToAuthenticatorButton({
  onSwitch,
}: SwitchToAuthenticatorButtonProps) {
  return (
    <Button
      className="min-h-[44px] w-full touch-manipulation sm:min-h-[32px] sm:w-auto"
      onClick={onSwitch}
      type="button"
      variant="outline"
    >
      Use authenticator code
    </Button>
  );
}

interface RecoveryCodeFormProps {
  recoveryCode: string;
  onRecoveryCodeChange: (value: string) => void;
  error?: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchToAuthenticator: () => void;
}

function RecoveryCodeForm({
  recoveryCode,
  onRecoveryCodeChange,
  error,
  isLoading,
  onSubmit,
  onSwitchToAuthenticator,
}: RecoveryCodeFormProps) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <RecoveryCodeField
        error={error}
        onChange={onRecoveryCodeChange}
        value={recoveryCode}
      />
      <div className="flex flex-col gap-2 sm:flex-row">
        <VerifyRecoveryCodeButton
          disabled={isLoading || !recoveryCode.trim()}
          isLoading={isLoading}
        />
        <SwitchToAuthenticatorButton onSwitch={onSwitchToAuthenticator} />
      </div>
    </form>
  );
}

interface ResendButtonProps {
  cooldown: number;
  isLoading: boolean;
  onResend: () => void;
}

function ResendButton({ cooldown, isLoading, onResend }: ResendButtonProps) {
  return (
    <button
      className="min-h-[32px] touch-manipulation self-start rounded-sm hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
      disabled={cooldown > 0 || isLoading}
      onClick={onResend}
      type="button"
    >
      {cooldown > 0 ? (
        `Resend in ${cooldown}s`
      ) : (
        <span className="flex items-center gap-1">
          <RefreshCw aria-hidden="true" className="size-3" />
          Resend code
        </span>
      )}
    </button>
  );
}

interface OTPFieldWithResendProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  isLoading: boolean;
  cooldown: number;
  onResend?: () => void;
}

function OTPFieldWithResend({
  value,
  onChange,
  error,
  isLoading,
  cooldown,
  onResend,
}: OTPFieldWithResendProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor="2fa-code">
        Authentication code
        <span aria-label="required" className="text-destructive">
          *
        </span>
      </FieldLabel>
      <FieldContent>
        <InputOTP
          aria-describedby={error ? "2fa-code-error" : undefined}
          aria-invalid={!!error}
          disabled={isLoading}
          id="2fa-code"
          maxLength={6}
          onChange={onChange}
          value={value}
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
        {error && <FieldError id="2fa-code-error">{error}</FieldError>}
        <div className="flex flex-col gap-2 text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>Enter the 6-digit code from your app</span>
          {onResend && (
            <ResendButton
              cooldown={cooldown}
              isLoading={isLoading}
              onResend={onResend}
            />
          )}
        </div>
      </FieldContent>
    </Field>
  );
}

function EmailSeparator() {
  return (
    <div className="relative">
      <Separator />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="bg-card px-2 text-muted-foreground text-xs">Or</span>
      </div>
    </div>
  );
}

interface RecoveryCodeToggleButtonProps {
  onToggle: () => void;
}

function RecoveryCodeToggleButton({ onToggle }: RecoveryCodeToggleButtonProps) {
  return (
    <Button
      className="min-h-[44px] w-full touch-manipulation sm:min-h-[32px]"
      onClick={onToggle}
      type="button"
      variant="ghost"
    >
      Use recovery code instead
    </Button>
  );
}

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

  const handleSwitchToAuthenticator = useCallback(() => {
    setUseRecoveryCode(false);
    setRecoveryCode("");
  }, []);

  const handleSwitchToRecoveryCode = useCallback(() => {
    setUseRecoveryCode(true);
  }, []);

  return (
    <Card className={cn("w-full max-w-sm shadow-xs", className)}>
      <CardHeader>
        <Header />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {errors?.general && <ErrorAlert message={errors.general} />}

          {useRecoveryCode ? (
            <RecoveryCodeForm
              error={errors?.recoveryCode}
              isLoading={isLoading}
              onRecoveryCodeChange={setRecoveryCode}
              onSubmit={handleRecoveryCodeSubmit}
              onSwitchToAuthenticator={handleSwitchToAuthenticator}
              recoveryCode={recoveryCode}
            />
          ) : (
            <div className="flex flex-col gap-4">
              <OTPFieldWithResend
                cooldown={cooldown}
                error={errors?.code}
                isLoading={isLoading}
                onChange={setCode}
                onResend={onResend}
                value={code}
              />

              {onRecoveryCode && (
                <>
                  <EmailSeparator />
                  <RecoveryCodeToggleButton
                    onToggle={handleSwitchToRecoveryCode}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

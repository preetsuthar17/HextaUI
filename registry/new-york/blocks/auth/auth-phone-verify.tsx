"use client";

import {
  CheckCircle2,
  Loader2,
  MessageSquare,
  Phone,
  RefreshCw,
  XCircle,
} from "lucide-react";
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
  FieldDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import { Separator } from "@/registry/new-york/ui/separator";

export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

export type VerificationStatus =
  | "pending"
  | "sent"
  | "verifying"
  | "verified"
  | "expired"
  | "error";

export interface AuthPhoneVerifyProps {
  phoneNumber?: string;
  countryCode?: string;
  onPhoneSubmit?: (phoneNumber: string, countryCode: string) => void;
  onOTPSubmit?: (code: string) => void;
  onResend?: () => void;
  onChangePhone?: () => void;
  className?: string;
  isLoading?: boolean;
  status?: VerificationStatus;
  resendCooldown?: number; // seconds
  errors?: {
    phone?: string;
    code?: string;
    general?: string;
  };
  autoSubmit?: boolean;
  countries?: Country[];
}

// Common countries list
const DEFAULT_COUNTRIES: Country[] = [
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
];

export default function AuthPhoneVerify({
  phoneNumber: initialPhoneNumber,
  countryCode: initialCountryCode = "US",
  onPhoneSubmit,
  onOTPSubmit,
  onResend,
  onChangePhone,
  className,
  isLoading = false,
  status = "pending",
  resendCooldown = 60,
  errors,
  autoSubmit = true,
  countries = DEFAULT_COUNTRIES,
}: AuthPhoneVerifyProps) {
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || "");
  const [countryCode, setCountryCode] = useState(initialCountryCode);
  const [code, setCode] = useState("");
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
    if (autoSubmit && code.length === 6 && !isLoading && status === "sent") {
      onOTPSubmit?.(code);
    }
  }, [code, autoSubmit, isLoading, status, onOTPSubmit]);

  const handlePhoneSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (phoneNumber.trim()) {
        onPhoneSubmit?.(phoneNumber.trim(), countryCode);
      }
    },
    [phoneNumber, countryCode, onPhoneSubmit]
  );

  const handleResend = useCallback(async () => {
    if (cooldown > 0) return;
    await onResend?.();
    setCooldown(resendCooldown);
  }, [cooldown, onResend, resendCooldown]);

  const selectedCountry = countries.find((c) => c.code === countryCode);
  const phoneError = errors?.phone;
  const codeError = errors?.code;
  const generalError = errors?.general;

  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    // Format as (XXX) XXX-XXXX for US/CA, or keep as is
    if (countryCode === "US" || countryCode === "CA") {
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      }
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
    return digits;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  if (status === "verified") {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <CardTitle>Phone verified</CardTitle>
          <CardDescription>
            Your phone number has been successfully verified
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="size-8 text-primary" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-sm">
                Phone number verified successfully
              </p>
              {phoneNumber && (
                <p className="text-muted-foreground text-sm">
                  {selectedCountry?.dialCode} {phoneNumber}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === "expired" || status === "error") {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <CardTitle>Verification failed</CardTitle>
          <CardDescription>
            {status === "expired"
              ? "The verification code has expired"
              : "Something went wrong with verification"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {generalError && (
              <div
                aria-live="polite"
                className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-destructive text-sm"
                role="alert"
              >
                {generalError}
              </div>
            )}

            <div className="flex flex-col items-center gap-4 rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
                <XCircle className="size-8 text-destructive" />
              </div>
              <p className="text-destructive text-sm">
                {status === "expired"
                  ? "The verification code has expired. Please request a new one."
                  : "Verification failed. Please try again."}
              </p>
            </div>

            {onChangePhone && (
              <Button
                className="w-full"
                onClick={onChangePhone}
                type="button"
                variant="outline"
              >
                Change phone number
              </Button>
            )}

            {onResend && (
              <Button
                aria-busy={isLoading}
                className="w-full"
                data-loading={isLoading}
                disabled={cooldown > 0 || isLoading}
                onClick={handleResend}
                type="button"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending…
                  </>
                ) : cooldown > 0 ? (
                  <>
                    <RefreshCw className="size-4" />
                    Resend in {cooldown}s
                  </>
                ) : (
                  <>
                    <RefreshCw className="size-4" />
                    Request new code
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === "sent" || status === "verifying") {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <CardTitle>Verify your phone number</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to{" "}
            {phoneNumber && (
              <span className="font-medium">
                {selectedCountry?.dialCode} {phoneNumber}
              </span>
            )}
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

            <Field data-invalid={!!codeError}>
              <FieldLabel htmlFor="phone-otp-code">
                Verification code
                <span aria-label="required" className="text-destructive">
                  *
                </span>
              </FieldLabel>
              <FieldContent>
                <InputOTP
                  aria-describedby={
                    codeError ? "phone-otp-code-error" : undefined
                  }
                  aria-invalid={!!codeError}
                  disabled={isLoading || status === "verifying"}
                  id="phone-otp-code"
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
                  <FieldError id="phone-otp-code-error">{codeError}</FieldError>
                )}
                <div className="flex flex-col gap-2 text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between">
                  <span>Enter the 6-digit code from SMS</span>
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

            {onChangePhone && (
              <>
                <Separator />
                <Button
                  className="w-full"
                  onClick={onChangePhone}
                  type="button"
                  variant="ghost"
                >
                  Change phone number
                </Button>
              </>
            )}

            {!autoSubmit && (
              <Button
                aria-busy={isLoading || status === "verifying"}
                className="w-full"
                data-loading={isLoading || status === "verifying"}
                disabled={
                  isLoading || status === "verifying" || code.length !== 6
                }
                onClick={() => onOTPSubmit?.(code)}
                type="button"
              >
                {isLoading || status === "verifying" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Verifying…
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="size-4" />
                    Verify code
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <CardTitle>Verify your phone number</CardTitle>
        <CardDescription>
          We&apos;ll send a verification code via SMS
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={handlePhoneSubmit}>
          {generalError && (
            <div
              aria-live="polite"
              className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-destructive text-sm"
              role="alert"
            >
              {generalError}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
              <Field className="w-full sm:w-32">
                <FieldLabel htmlFor="phone-country">Country</FieldLabel>
                <FieldContent>
                  <Select onValueChange={setCountryCode} value={countryCode}>
                    <SelectTrigger id="phone-country">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <div className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.dialCode}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldContent>
              </Field>

              <Field className="flex-1" data-invalid={!!phoneError}>
                <FieldLabel htmlFor="phone-number">
                  Phone number
                  <span aria-label="required" className="text-destructive">
                    *
                  </span>
                </FieldLabel>
                <FieldContent>
                  <InputGroup aria-invalid={!!phoneError}>
                    <InputGroupAddon>
                      <Phone className="size-4" />
                    </InputGroupAddon>
                    <InputGroupInput
                      aria-describedby={
                        phoneError ? "phone-number-error" : undefined
                      }
                      aria-invalid={!!phoneError}
                      autoComplete="tel"
                      id="phone-number"
                      inputMode="tel"
                      name="phoneNumber"
                      onChange={handlePhoneChange}
                      placeholder="(555) 123-4567"
                      required
                      type="tel"
                      value={phoneNumber}
                    />
                  </InputGroup>
                  {phoneError && (
                    <FieldError id="phone-number-error">
                      {phoneError}
                    </FieldError>
                  )}
                  <FieldDescription>
                    We&apos;ll send a verification code to this number
                  </FieldDescription>
                </FieldContent>
              </Field>
            </div>
          </div>

          <Button
            aria-busy={isLoading}
            className="w-full"
            data-loading={isLoading}
            disabled={isLoading || !phoneNumber.trim()}
            type="submit"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending code…
              </>
            ) : (
              <>
                <MessageSquare className="size-4" />
                Send verification code
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

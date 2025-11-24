"use client";

import { Loader2, Mail, MessageSquare, Phone, RefreshCw } from "lucide-react";
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

export type OTPDeliveryMethod = "email" | "sms" | "whatsapp";

export interface AuthOTPVerifyProps {
  deliveryMethod?: OTPDeliveryMethod;
  deliveryAddress?: string; // email or phone number
  onDeliveryMethodChange?: (method: OTPDeliveryMethod) => void;
  onSubmit?: (code: string) => void;
  onResend?: (method: OTPDeliveryMethod) => void;
  className?: string;
  isLoading?: boolean;
  resendCooldown?: number; // seconds
  errors?: {
    code?: string;
    general?: string;
  };
  autoSubmit?: boolean;
  codeLength?: number;
  availableMethods?: OTPDeliveryMethod[];
}

const DELIVERY_METHOD_CONFIG: Record<
  OTPDeliveryMethod,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  email: {
    label: "Email",
    icon: Mail,
  },
  sms: {
    label: "SMS",
    icon: MessageSquare,
  },
  whatsapp: {
    label: "WhatsApp",
    icon: Phone,
  },
};

export default function AuthOTPVerify({
  deliveryMethod = "email",
  deliveryAddress,
  onDeliveryMethodChange,
  onSubmit,
  onResend,
  className,
  isLoading = false,
  resendCooldown = 60,
  errors,
  autoSubmit = true,
  codeLength = 6,
  availableMethods = ["email", "sms"],
}: AuthOTPVerifyProps) {
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
    if (autoSubmit && code.length === codeLength && !isLoading) {
      onSubmit?.(code);
    }
  }, [code, autoSubmit, isLoading, codeLength, onSubmit]);

  const handleResend = useCallback(async () => {
    if (cooldown > 0) return;
    await onResend?.(deliveryMethod);
    setCooldown(resendCooldown);
  }, [cooldown, onResend, deliveryMethod, resendCooldown]);

  const codeError = errors?.code;
  const generalError = errors?.general;
  const methodConfig = DELIVERY_METHOD_CONFIG[deliveryMethod];
  const MethodIcon = methodConfig.icon;

  const formatDeliveryAddress = (address?: string): string => {
    if (!address) return "";
    if (deliveryMethod === "email") return address;
    // Mask phone number: +1 (***) ***-5678
    if (address.length > 4) {
      const visible = address.slice(-4);
      const masked = "*".repeat(address.length - 4);
      return `${masked}${visible}`;
    }
    return address;
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MethodIcon className="size-5" />
          Verify your {methodConfig.label.toLowerCase()}
        </CardTitle>
        <CardDescription>
          We&apos;ve sent a {codeLength}-digit code to{" "}
          {deliveryAddress ? (
            <span className="font-medium">
              {formatDeliveryAddress(deliveryAddress)}
            </span>
          ) : (
            "your " + methodConfig.label.toLowerCase()
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

          {availableMethods.length > 1 && onDeliveryMethodChange && (
            <Field>
              <FieldLabel>Delivery method</FieldLabel>
              <FieldContent>
                <Select
                  onValueChange={(value) =>
                    onDeliveryMethodChange(value as OTPDeliveryMethod)
                  }
                  value={deliveryMethod}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMethods.map((method) => {
                      const config = DELIVERY_METHOD_CONFIG[method];
                      const Icon = config.icon;
                      return (
                        <SelectItem key={method} value={method}>
                          <div className="flex items-center gap-2">
                            <Icon className="size-4" />
                            {config.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FieldDescription>
                  Choose how you want to receive the verification code
                </FieldDescription>
              </FieldContent>
            </Field>
          )}

          <Field data-invalid={!!codeError}>
            <FieldLabel htmlFor="otp-code">
              Verification code
              <span aria-label="required" className="text-destructive">
                *
              </span>
            </FieldLabel>
            <FieldContent>
              <InputOTP
                aria-describedby={codeError ? "otp-code-error" : undefined}
                aria-invalid={!!codeError}
                disabled={isLoading}
                id="otp-code"
                maxLength={codeLength}
                onChange={setCode}
                value={code}
              >
                <InputOTPGroup>
                  {Array.from({ length: codeLength }).map((_, index) => (
                    <InputOTPSlot index={index} key={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              {codeError && (
                <FieldError id="otp-code-error">{codeError}</FieldError>
              )}
              <div className="flex flex-col gap-2 text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between">
                <span>Enter the {codeLength}-digit code</span>
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

          {!autoSubmit && (
            <Button
              aria-busy={isLoading}
              className="w-full"
              data-loading={isLoading}
              disabled={isLoading || code.length !== codeLength}
              onClick={() => onSubmit?.(code)}
              type="button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Verifying…
                </>
              ) : (
                "Verify code"
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

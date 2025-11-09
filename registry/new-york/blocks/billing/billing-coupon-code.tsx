"use client";

import { Check, Loader2, Tag, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface AppliedCoupon {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  label?: string;
  expiresAt?: Date;
  description?: string;
}

export interface BillingCouponCodeProps {
  onApply?: (code: string) => Promise<void>;
  onRemove?: () => Promise<void>;
  appliedCoupon?: AppliedCoupon | null;
  className?: string;
  currency?: string;
  isLoading?: boolean;
  error?: string;
}

function formatPrice(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

export default function BillingCouponCode({
  onApply,
  onRemove,
  appliedCoupon,
  className,
  currency = "USD",
  isLoading: externalLoading,
  error: externalError,
}: BillingCouponCodeProps) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async () => {
    if (!code.trim()) {
      setError("Please enter a coupon code");
      return;
    }

    if (!onApply) return;

    setIsLoading(true);
    setError(null);

    try {
      await onApply(code.trim().toUpperCase());
      setCode("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to apply coupon code"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!onRemove) return;

    setIsLoading(true);
    setError(null);

    try {
      await onRemove();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to remove coupon code"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading && !externalLoading) {
      handleApply();
    }
  };

  const displayError = externalError || error;
  const displayLoading = isLoading || externalLoading;

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Discount Code</CardTitle>
          <CardDescription>
            Apply a promotional code to your subscription
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {appliedCoupon ? (
            <div className="flex flex-col gap-4 rounded-lg border bg-muted/50 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag className="size-4 shrink-0 text-primary" />
                    <span className="font-medium text-sm">
                      {appliedCoupon.code}
                    </span>
                    <Badge className="shrink-0 text-xs" variant="secondary">
                      Applied
                    </Badge>
                  </div>
                  {appliedCoupon.label && (
                    <p className="wrap-break-word text-muted-foreground text-sm">
                      {appliedCoupon.label}
                    </p>
                  )}
                  {appliedCoupon.description && (
                    <p className="wrap-break-word text-muted-foreground text-xs">
                      {appliedCoupon.description}
                    </p>
                  )}
                  {appliedCoupon.expiresAt && (
                    <p className="text-muted-foreground text-xs">
                      Expires: {formatDate(appliedCoupon.expiresAt)}
                    </p>
                  )}
                </div>
                {onRemove && (
                  <Button
                    aria-label={`Remove coupon ${appliedCoupon.code}`}
                    className="w-full sm:w-auto"
                    onClick={handleRemove}
                    type="button"
                    variant="ghost"
                  >
                    <X className="size-4" />
                    Remove
                  </Button>
                )}
              </div>

              <Separator />

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <div className="flex items-center gap-2">
                    {appliedCoupon.type === "percentage" ? (
                      <span className="font-medium text-green-600">
                        -{appliedCoupon.value}%
                      </span>
                    ) : (
                      <span className="font-medium text-green-600">
                        -{formatPrice(appliedCoupon.value, currency)}
                      </span>
                    )}
                    <Check className="size-4 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Field>
                <FieldLabel htmlFor="coupon-code">Coupon Code</FieldLabel>
                <FieldContent>
                  <InputGroup>
                    <InputGroupAddon>
                      <Tag className="size-4" />
                    </InputGroupAddon>
                    <InputGroupInput
                      aria-describedby={
                        displayError ? "coupon-error" : undefined
                      }
                      aria-invalid={!!displayError}
                      autoComplete="off"
                      disabled={displayLoading}
                      id="coupon-code"
                      onChange={(e) => {
                        setCode(e.target.value.toUpperCase());
                        setError(null);
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter code"
                      type="text"
                      value={code}
                    />
                  </InputGroup>
                  {displayError && (
                    <FieldError id="coupon-error">{displayError}</FieldError>
                  )}
                </FieldContent>
              </Field>

              <Button
                aria-busy={displayLoading}
                className="w-full sm:w-auto"
                data-loading={displayLoading}
                disabled={!code.trim() || displayLoading}
                onClick={handleApply}
                type="button"
              >
                {displayLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Applying…
                  </>
                ) : (
                  <>
                    <Tag className="size-4" />
                    Apply Code
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

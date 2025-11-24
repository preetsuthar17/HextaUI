"use client";

import {
  AlertTriangle,
  CreditCard,
  Loader2,
  Mail,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/registry/new-york/ui/badge";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Separator } from "@/registry/new-york/ui/separator";

export interface PaymentFailureDetails {
  invoiceId?: string;
  invoiceNumber?: string;
  amount: number;
  currency?: string;
  failedAt: Date;
  reason:
    | "insufficient_funds"
    | "card_declined"
    | "expired_card"
    | "invalid_card"
    | "processing_error"
    | "fraud_detected"
    | "other";
  reasonMessage?: string;
  paymentMethod?: {
    type: string;
    last4?: string;
    brand?: string;
    expiresAt?: Date;
  };
  gracePeriodEndsAt?: Date;
  retryAttempts?: number;
  maxRetryAttempts?: number;
}

export interface BillingPaymentFailedProps {
  failure: PaymentFailureDetails;
  onRetry?: () => Promise<void>;
  onUpdatePaymentMethod?: () => void;
  onContactSupport?: () => void;
  className?: string;
  currency?: string;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

function formatPrice(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function getReasonConfig(reason: PaymentFailureDetails["reason"]) {
  switch (reason) {
    case "insufficient_funds":
      return {
        title: "Insufficient Funds",
        message:
          "Your payment was declined due to insufficient funds in your account.",
        action:
          "Please ensure you have sufficient funds or use a different payment method.",
      };
    case "card_declined":
      return {
        title: "Card Declined",
        message: "Your card was declined by your bank.",
        action: "Please contact your bank or use a different payment method.",
      };
    case "expired_card":
      return {
        title: "Expired Card",
        message: "Your payment card has expired.",
        action: "Please update your payment method with a valid card.",
      };
    case "invalid_card":
      return {
        title: "Invalid Card",
        message: "The card information provided is invalid.",
        action:
          "Please verify your card details or use a different payment method.",
      };
    case "processing_error":
      return {
        title: "Processing Error",
        message: "An error occurred while processing your payment.",
        action: "Please try again or contact support if the issue persists.",
      };
    case "fraud_detected":
      return {
        title: "Fraud Detection",
        message: "Your payment was flagged for security reasons.",
        action: "Please contact support to resolve this issue.",
      };
    case "other":
      return {
        title: "Payment Failed",
        message: "Your payment could not be processed.",
        action: "Please try again or contact support for assistance.",
      };
    default:
      return {
        title: "Payment Failed",
        message: "Your payment could not be processed.",
        action: "Please try again or contact support for assistance.",
      };
  }
}

export default function BillingPaymentFailed({
  failure,
  onRetry,
  onUpdatePaymentMethod,
  onContactSupport,
  className,
  currency = "USD",
}: BillingPaymentFailedProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const reasonConfig = getReasonConfig(failure.reason);
  const failureCurrency = failure.currency || currency;
  const isCardExpired =
    failure.reason === "expired_card" ||
    (failure.paymentMethod?.expiresAt &&
      new Date(failure.paymentMethod.expiresAt) < new Date());

  const handleRetry = async () => {
    if (!onRetry) return;

    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <Card className={cn("w-full border-destructive/50 shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <AlertTriangle className="size-5 shrink-0 text-destructive" />
              <CardTitle className="wrap-break-word text-destructive">
                {reasonConfig.title}
              </CardTitle>
            </div>
            <CardDescription className="wrap-break-word">
              {failure.reasonMessage || reasonConfig.message}
            </CardDescription>
          </div>
          <Badge className="shrink-0 text-xs" variant="destructive">
            Failed
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-lg border bg-destructive/5 p-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-sm">Payment Details</h3>
              <div className="flex flex-col gap-2 text-muted-foreground text-sm">
                {failure.invoiceNumber && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span>Invoice:</span>
                    <span className="font-medium text-foreground">
                      {failure.invoiceNumber}
                    </span>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-2">
                  <span>Amount:</span>
                  <span className="font-medium text-foreground">
                    {formatPrice(failure.amount, failureCurrency)}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span>Failed on:</span>
                  <span className="text-foreground">
                    {formatDate(failure.failedAt)}
                  </span>
                </div>
                {failure.paymentMethod && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span>Payment Method:</span>
                    <div className="flex flex-wrap items-center gap-2 text-foreground">
                      <span className="capitalize">
                        {failure.paymentMethod.type}
                      </span>
                      {failure.paymentMethod.brand && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span className="capitalize">
                            {failure.paymentMethod.brand}
                          </span>
                        </>
                      )}
                      {failure.paymentMethod.last4 && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span>•••• {failure.paymentMethod.last4}</span>
                        </>
                      )}
                      {isCardExpired && (
                        <>
                          <span aria-hidden="true">•</span>
                          <Badge className="text-xs" variant="destructive">
                            Expired
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                )}
                {failure.retryAttempts !== undefined &&
                  failure.maxRetryAttempts !== undefined && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span>Retry Attempts:</span>
                      <span className="text-foreground">
                        {failure.retryAttempts} / {failure.maxRetryAttempts}
                      </span>
                    </div>
                  )}
              </div>
            </div>

            {failure.gracePeriodEndsAt && (
              <>
                <Separator />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 font-medium text-sm text-yellow-600">
                    <AlertTriangle className="size-4" />
                    <span>Grace Period</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Your service will continue until{" "}
                    <span className="font-medium text-foreground">
                      {formatDate(failure.gracePeriodEndsAt)}
                    </span>
                    . Please update your payment method before this date to
                    avoid service interruption.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p className="wrap-break-word text-muted-foreground text-sm">
              {reasonConfig.action}
            </p>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            {onRetry && (
              <Button
                aria-busy={isRetrying}
                className="w-full"
                data-loading={isRetrying}
                onClick={handleRetry}
                type="button"
              >
                {isRetrying ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Retrying…
                  </>
                ) : (
                  <>
                    <RefreshCw className="size-4" />
                    Retry Payment
                  </>
                )}
              </Button>
            )}
            {onUpdatePaymentMethod && (
              <Button
                className="w-full"
                onClick={onUpdatePaymentMethod}
                type="button"
                variant="outline"
              >
                <CreditCard className="size-4" />
                Update Payment Method
              </Button>
            )}
            {onContactSupport && (
              <Button
                className="w-full"
                onClick={onContactSupport}
                type="button"
                variant="ghost"
              >
                <Mail className="size-4" />
                Contact Support
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

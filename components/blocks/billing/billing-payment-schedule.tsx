"use client";

import {
  Calendar,
  Check,
  Clock,
  CreditCard,
  Loader2,
  TrendingUp,
  X,
} from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface ScheduledPayment {
  id: string;
  date: Date;
  amount: number;
  currency?: string;
  status: "upcoming" | "processing" | "completed" | "failed" | "canceled";
  description: string;
  paymentMethod?: {
    type: string;
    last4?: string;
    brand?: string;
  };
  invoiceId?: string;
  invoiceNumber?: string;
  retryAttempts?: number;
  maxRetryAttempts?: number;
}

export interface BillingPaymentScheduleProps {
  payments: ScheduledPayment[];
  onViewInvoice?: (invoiceId: string) => void;
  onRetry?: (paymentId: string) => Promise<void>;
  onCancel?: (paymentId: string) => Promise<void>;
  className?: string;
  currency?: string;
  showUpcomingOnly?: boolean;
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

function getStatusConfig(status: ScheduledPayment["status"]) {
  switch (status) {
    case "upcoming":
      return {
        label: "Upcoming",
        variant: "secondary" as const,
        className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
        icon: Clock,
      };
    case "processing":
      return {
        label: "Processing",
        variant: "secondary" as const,
        className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
        icon: Loader2,
      };
    case "completed":
      return {
        label: "Completed",
        variant: "default" as const,
        className: "bg-green-500/10 text-green-600 border-green-500/20",
        icon: Check,
      };
    case "failed":
      return {
        label: "Failed",
        variant: "destructive" as const,
        className: "bg-destructive/10 text-destructive border-destructive/20",
        icon: TrendingUp,
      };
    case "canceled":
      return {
        label: "Canceled",
        variant: "secondary" as const,
        className: "",
        icon: X,
      };
    default:
      return {
        label: "Unknown",
        variant: "secondary" as const,
        className: "",
        icon: Clock,
      };
  }
}

function getDaysUntil(date: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export default function BillingPaymentSchedule({
  payments,
  onViewInvoice,
  onRetry,
  onCancel,
  className,
  currency = "USD",
  showUpcomingOnly = false,
}: BillingPaymentScheduleProps) {
  const [isRetrying, setIsRetrying] = useState<string | null>(null);

  const filteredPayments = showUpcomingOnly
    ? payments.filter((p) => p.status === "upcoming")
    : payments;

  const sortedPayments = [...filteredPayments].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  const upcomingPayments = payments.filter((p) => p.status === "upcoming");
  const nextPayment =
    upcomingPayments.length > 0
      ? upcomingPayments.sort((a, b) => a.date.getTime() - b.date.getTime())[0]
      : null;

  const handleRetry = async (paymentId: string) => {
    if (!onRetry) return;

    setIsRetrying(paymentId);
    try {
      await onRetry(paymentId);
    } finally {
      setIsRetrying(null);
    }
  };

  if (payments.length === 0) {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <div className="flex flex-col gap-1">
            <CardTitle>Payment Schedule</CardTitle>
            <CardDescription>
              View your upcoming and past scheduled payments
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Calendar className="size-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">
              No scheduled payments
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>Payment Schedule</CardTitle>
            <CardDescription>
              View your upcoming and past scheduled payments
            </CardDescription>
          </div>
          {nextPayment && (
            <div className="flex flex-col gap-1 text-right">
              <div className="flex items-center justify-end gap-2 text-muted-foreground text-sm">
                <Calendar className="size-4" />
                <span>Next payment</span>
              </div>
              <div className="font-medium text-sm">
                {formatDate(nextPayment.date)}
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {nextPayment && (
            <div className="flex flex-col gap-4 rounded-lg border bg-muted/50 p-4">
              <div className="flex items-center gap-2">
                <Clock className="size-5 text-blue-600" />
                <h3 className="font-medium text-sm">Next Payment</h3>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Amount</span>
                  <span className="font-medium text-sm">
                    {formatPrice(
                      nextPayment.amount,
                      nextPayment.currency || currency
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Date</span>
                  <span className="text-sm">
                    {formatDate(nextPayment.date)}
                  </span>
                </div>
                {nextPayment.paymentMethod && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Payment Method
                    </span>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="capitalize">
                        {nextPayment.paymentMethod.type}
                      </span>
                      {nextPayment.paymentMethod.brand && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span className="capitalize">
                            {nextPayment.paymentMethod.brand}
                          </span>
                        </>
                      )}
                      {nextPayment.paymentMethod.last4 && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span>•••• {nextPayment.paymentMethod.last4}</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
                {nextPayment.description && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Description
                    </span>
                    <span className="wrap-break-word text-right text-sm">
                      {nextPayment.description}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 pt-2">
                  <div className="flex-1">
                    <Progress
                      aria-label={`Days until payment: ${getDaysUntil(nextPayment.date)}`}
                      className="h-2"
                      value={Math.max(
                        0,
                        Math.min(
                          100,
                          ((30 - getDaysUntil(nextPayment.date)) / 30) * 100
                        )
                      )}
                    />
                  </div>
                  <span className="shrink-0 text-muted-foreground text-xs">
                    {getDaysUntil(nextPayment.date)} day
                    {getDaysUntil(nextPayment.date) !== 1 ? "s" : ""} until
                  </span>
                </div>
              </div>
            </div>
          )}

          {sortedPayments.length > 0 && (
            <>
              {nextPayment && <Separator />}
              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-sm">
                  {showUpcomingOnly ? "Upcoming Payments" : "All Payments"}
                </h3>
                <div className="flex flex-col gap-2">
                  {sortedPayments.map((payment) => {
                    const statusConfig = getStatusConfig(payment.status);
                    const StatusIcon = statusConfig.icon;
                    const isUpcoming = payment.status === "upcoming";
                    const daysUntil = getDaysUntil(payment.date);

                    return (
                      <div
                        className="flex flex-col gap-3 rounded-lg border bg-card p-4"
                        key={payment.id}
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex min-w-0 flex-1 flex-col gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="flex items-center gap-2">
                                <StatusIcon
                                  className={cn(
                                    "size-4 shrink-0",
                                    payment.status === "processing" &&
                                      "animate-spin",
                                    isUpcoming && "text-blue-600",
                                    payment.status === "completed" &&
                                      "text-green-600",
                                    payment.status === "failed" &&
                                      "text-destructive"
                                  )}
                                />
                                <span className="wrap-break-word font-medium text-sm">
                                  {payment.description}
                                </span>
                              </div>
                              <Badge
                                className={cn(
                                  "shrink-0 text-xs",
                                  statusConfig.className
                                )}
                                variant={statusConfig.variant}
                              >
                                {statusConfig.label}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
                              <div className="flex items-center gap-1">
                                <Calendar className="size-3.5" />
                                <span>{formatDate(payment.date)}</span>
                              </div>
                              {isUpcoming && daysUntil >= 0 && (
                                <>
                                  <span aria-hidden="true">•</span>
                                  <span>
                                    {daysUntil === 0
                                      ? "Today"
                                      : daysUntil === 1
                                        ? "Tomorrow"
                                        : `${daysUntil} days`}
                                  </span>
                                </>
                              )}
                              {payment.invoiceNumber && (
                                <>
                                  <span aria-hidden="true">•</span>
                                  <span>{payment.invoiceNumber}</span>
                                </>
                              )}
                              {payment.paymentMethod && (
                                <>
                                  <span aria-hidden="true">•</span>
                                  <div className="flex items-center gap-1">
                                    <CreditCard className="size-3.5" />
                                    <span className="capitalize">
                                      {payment.paymentMethod.type}
                                    </span>
                                    {payment.paymentMethod.last4 && (
                                      <span>
                                        {" "}
                                        •••• {payment.paymentMethod.last4}
                                      </span>
                                    )}
                                  </div>
                                </>
                              )}
                              {payment.status === "failed" &&
                                payment.retryAttempts !== undefined &&
                                payment.maxRetryAttempts !== undefined && (
                                  <>
                                    <span aria-hidden="true">•</span>
                                    <span>
                                      Retry {payment.retryAttempts}/
                                      {payment.maxRetryAttempts}
                                    </span>
                                  </>
                                )}
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-3">
                            <span className="font-medium text-sm">
                              {formatPrice(
                                payment.amount,
                                payment.currency || currency
                              )}
                            </span>
                            <div className="flex gap-2">
                              {payment.status === "failed" && onRetry && (
                                <Button
                                  aria-busy={isRetrying === payment.id}
                                  aria-label={`Retry payment ${payment.id}`}
                                  data-loading={isRetrying === payment.id}
                                  onClick={() => handleRetry(payment.id)}
                                  size="icon"
                                  type="button"
                                  variant="ghost"
                                >
                                  {isRetrying === payment.id ? (
                                    <Loader2 className="size-4 animate-spin" />
                                  ) : (
                                    <TrendingUp className="size-4" />
                                  )}
                                </Button>
                              )}
                              {isUpcoming && onCancel && (
                                <Button
                                  aria-label={`Cancel payment ${payment.id}`}
                                  onClick={() => onCancel?.(payment.id)}
                                  size="icon"
                                  type="button"
                                  variant="ghost"
                                >
                                  <X className="size-4" />
                                </Button>
                              )}
                              {payment.invoiceId && onViewInvoice && (
                                <Button
                                  aria-label={`View invoice ${payment.invoiceNumber}`}
                                  onClick={() =>
                                    onViewInvoice(payment.invoiceId!)
                                  }
                                  size="icon"
                                  type="button"
                                  variant="ghost"
                                >
                                  <Calendar className="size-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

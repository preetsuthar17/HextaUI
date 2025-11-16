"use client";

import { Calendar, Loader2, Pause, Play, RefreshCw, X } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export interface SubscriptionSettings {
  id: string;
  planName: string;
  status: "active" | "paused" | "canceled" | "expired";
  billingPeriod: "monthly" | "annual";
  currentBillingDate: Date;
  nextBillingDate?: Date;
  pausedUntil?: Date;
  canceledAt?: Date;
  cancelAtPeriodEnd?: boolean;
  autoRenew: boolean;
  prorationPreview?: {
    newAmount: number;
    creditAmount: number;
    nextBillingDate: Date;
  };
}

export interface BillingSubscriptionSettingsProps {
  subscription: SubscriptionSettings;
  onPause?: (resumeDate?: Date) => Promise<void>;
  onResume?: () => Promise<void>;
  onChangeBillingPeriod?: (period: "monthly" | "annual") => Promise<void>;
  onUpdateBillingDate?: (date: Date) => Promise<void>;
  onCancel?: (feedback?: string) => Promise<void>;
  onReactivate?: () => Promise<void>;
  onToggleAutoRenew?: (enabled: boolean) => Promise<void>;
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

export default function BillingSubscriptionSettings({
  subscription,
  onPause,
  onResume,
  onChangeBillingPeriod,
  onUpdateBillingDate,
  onCancel,
  onReactivate,
  onToggleAutoRenew,
  className,
  currency = "USD",
}: BillingSubscriptionSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelFeedback, setCancelFeedback] = useState("");
  const [showPauseDialog, setShowPauseDialog] = useState(false);
  const [pauseDuration, setPauseDuration] = useState<
    "1" | "3" | "6" | "custom"
  >("1");

  const isActive = subscription.status === "active";
  const isPaused = subscription.status === "paused";
  const isCanceled = subscription.status === "canceled";

  const handlePause = async () => {
    if (!onPause) return;

    setIsLoading(true);
    try {
      let resumeDate: Date | undefined;
      if (pauseDuration === "1") {
        resumeDate = new Date();
        resumeDate.setMonth(resumeDate.getMonth() + 1);
      } else if (pauseDuration === "3") {
        resumeDate = new Date();
        resumeDate.setMonth(resumeDate.getMonth() + 3);
      } else if (pauseDuration === "6") {
        resumeDate = new Date();
        resumeDate.setMonth(resumeDate.getMonth() + 6);
      }

      await onPause(resumeDate);
      setShowPauseDialog(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResume = async () => {
    if (!onResume) return;

    setIsLoading(true);
    try {
      await onResume();
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeBillingPeriod = async (period: "monthly" | "annual") => {
    if (!onChangeBillingPeriod) return;

    setIsLoading(true);
    try {
      await onChangeBillingPeriod(period);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!onCancel) return;

    setIsLoading(true);
    try {
      await onCancel(cancelFeedback || undefined);
      setShowCancelDialog(false);
      setCancelFeedback("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReactivate = async () => {
    if (!onReactivate) return;

    setIsLoading(true);
    try {
      await onReactivate();
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAutoRenew = async (enabled: boolean) => {
    if (!onToggleAutoRenew) return;

    setIsLoading(true);
    try {
      await onToggleAutoRenew(enabled);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <div className="flex flex-col gap-1">
            <CardTitle>Subscription Settings</CardTitle>
            <CardDescription>
              Manage your subscription preferences and billing
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-sm">Plan</span>
                    <span className="text-muted-foreground text-sm">
                      {subscription.planName}
                    </span>
                  </div>
                  <Badge
                    className="shrink-0 text-xs"
                    variant={
                      isActive
                        ? "default"
                        : isPaused
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {subscription.status.charAt(0).toUpperCase() +
                      subscription.status.slice(1)}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-sm">Billing Period</span>
                    <span className="text-muted-foreground text-sm">
                      {subscription.billingPeriod === "monthly"
                        ? "Monthly"
                        : "Annual"}
                    </span>
                  </div>
                  {onChangeBillingPeriod && isActive && (
                    <Select
                      disabled={isLoading}
                      onValueChange={(value) =>
                        handleChangeBillingPeriod(value as "monthly" | "annual")
                      }
                      value={subscription.billingPeriod ?? "monthly"}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-muted-foreground" />
                      <span className="font-medium text-sm">Billing Date</span>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {subscription.nextBillingDate
                        ? formatDate(subscription.nextBillingDate)
                        : formatDate(subscription.currentBillingDate)}
                    </span>
                  </div>
                </div>
              </div>

              {subscription.pausedUntil && (
                <>
                  <Separator />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-sm">
                          Paused Until
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {formatDate(subscription.pausedUntil)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {subscription.canceledAt && (
                <>
                  <Separator />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-sm">Canceled On</span>
                        <span className="text-muted-foreground text-sm">
                          {formatDate(subscription.canceledAt)}
                        </span>
                      </div>
                    </div>
                    {subscription.cancelAtPeriodEnd && (
                      <p className="text-muted-foreground text-xs">
                        Your subscription will end on{" "}
                        {subscription.nextBillingDate
                          ? formatDate(subscription.nextBillingDate)
                          : formatDate(subscription.currentBillingDate)}
                      </p>
                    )}
                  </div>
                </>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-sm">Auto-renewal</span>
                  <span className="text-muted-foreground text-xs">
                    {subscription.autoRenew
                      ? "Your subscription will renew automatically"
                      : "Your subscription will not renew"}
                  </span>
                </div>
                {onToggleAutoRenew && isActive && (
                  <Switch
                    checked={subscription.autoRenew}
                    disabled={isLoading}
                    onCheckedChange={handleToggleAutoRenew}
                  />
                )}
              </div>

              {subscription.prorationPreview && (
                <>
                  <Separator />
                  <div className="flex flex-col gap-2 rounded-lg border bg-muted/50 p-4">
                    <h4 className="font-medium text-sm">Proration Preview</h4>
                    <div className="flex flex-col gap-2 text-muted-foreground text-sm">
                      <div className="flex items-center justify-between">
                        <span>New Amount:</span>
                        <span className="font-medium text-foreground">
                          {formatPrice(
                            subscription.prorationPreview.newAmount,
                            currency
                          )}
                        </span>
                      </div>
                      {subscription.prorationPreview.creditAmount > 0 && (
                        <div className="flex items-center justify-between">
                          <span>Credit Applied:</span>
                          <span className="font-medium text-green-600">
                            -
                            {formatPrice(
                              subscription.prorationPreview.creditAmount,
                              currency
                            )}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span>Next Billing Date:</span>
                        <span className="text-foreground">
                          {formatDate(
                            subscription.prorationPreview.nextBillingDate
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              {isPaused && onResume && (
                <Button
                  aria-busy={isLoading}
                  className="w-full"
                  data-loading={isLoading}
                  onClick={handleResume}
                  type="button"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Resuming…
                    </>
                  ) : (
                    <>
                      <Play className="size-4" />
                      Resume Subscription
                    </>
                  )}
                </Button>
              )}

              {isActive && onPause && (
                <Button
                  className="w-full"
                  onClick={() => setShowPauseDialog(true)}
                  type="button"
                  variant="outline"
                >
                  <Pause className="size-4" />
                  Pause Subscription
                </Button>
              )}

              {isCanceled && onReactivate && (
                <Button
                  aria-busy={isLoading}
                  className="w-full"
                  data-loading={isLoading}
                  onClick={handleReactivate}
                  type="button"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Reactivating…
                    </>
                  ) : (
                    <>
                      <RefreshCw className="size-4" />
                      Reactivate Subscription
                    </>
                  )}
                </Button>
              )}

              {isActive && onCancel && (
                <Button
                  className="w-full"
                  onClick={() => setShowCancelDialog(true)}
                  type="button"
                  variant="destructive"
                >
                  <X className="size-4" />
                  Cancel Subscription
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog onOpenChange={setShowCancelDialog} open={showCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your subscription? You&apos;ll
              lose access to all premium features at the end of your billing
              period.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm" htmlFor="cancel-feedback">
                Reason for canceling (optional)
              </label>
              <textarea
                className="min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="cancel-feedback"
                onChange={(e) => setCancelFeedback(e.target.value)}
                placeholder="Help us improve by sharing why you're canceling..."
                value={cancelFeedback}
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
            <AlertDialogAction
              aria-busy={isLoading}
              data-loading={isLoading}
              onClick={handleCancel}
              type="button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Canceling…
                </>
              ) : (
                "Cancel Subscription"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog onOpenChange={setShowPauseDialog} open={showPauseDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Pause Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Your subscription will be paused and you won&apos;t be charged
              during the pause period. You can resume at any time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm" htmlFor="pause-duration">
                Pause Duration
              </label>
              <Select
                onValueChange={(value) =>
                  setPauseDuration(value as "1" | "3" | "6" | "custom")
                }
                value={pauseDuration}
              >
                <SelectTrigger id="pause-duration">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Month</SelectItem>
                  <SelectItem value="3">3 Months</SelectItem>
                  <SelectItem value="6">6 Months</SelectItem>
                  <SelectItem value="custom">Custom Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              aria-busy={isLoading}
              data-loading={isLoading}
              onClick={handlePause}
              type="button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Pausing…
                </>
              ) : (
                "Pause Subscription"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

"use client";

import { AlertTriangle, Calendar, TrendingUp } from "lucide-react";
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
import { Progress } from "@/registry/new-york/ui/progress";
import { Separator } from "@/registry/new-york/ui/separator";
import { Switch } from "@/registry/new-york/ui/switch";

export interface SubscriptionUsage {
  label: string;
  used: number;
  limit: number | null;
  unit?: string;
  warningThreshold?: number;
}

export interface BillingSubscriptionCardProps {
  plan: {
    id: string;
    name: string;
    price: number;
    currency?: string;
    billingPeriod: "monthly" | "annual";
  };
  usage?: SubscriptionUsage[];
  nextBillingDate?: Date;
  autoRenew?: boolean;
  status?: "active" | "canceled" | "expired" | "past_due";
  onUpgrade?: () => void;
  onDowngrade?: () => void;
  onCancel?: () => void;
  onManage?: () => void;
  className?: string;
  showUsageDetails?: boolean;
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
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function getStatusConfig(status: string) {
  switch (status) {
    case "active":
      return {
        label: "Active",
        variant: "default" as const,
        className: "bg-green-500/10 text-green-600 border-green-500/20",
      };
    case "canceled":
      return {
        label: "Canceled",
        variant: "secondary" as const,
        className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      };
    case "expired":
      return {
        label: "Expired",
        variant: "destructive" as const,
        className: "bg-destructive/10 text-destructive border-destructive/20",
      };
    case "past_due":
      return {
        label: "Past Due",
        variant: "destructive" as const,
        className: "bg-destructive/10 text-destructive border-destructive/20",
      };
    default:
      return {
        label: "Unknown",
        variant: "secondary" as const,
        className: "",
      };
  }
}

export default function BillingSubscriptionCard({
  plan,
  usage = [],
  nextBillingDate,
  autoRenew = true,
  status = "active",
  onUpgrade,
  onDowngrade,
  onCancel,
  onManage,
  className,
  showUsageDetails = true,
}: BillingSubscriptionCardProps) {
  const statusConfig = getStatusConfig(status);
  const currency = plan.currency || "USD";

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="wrap-break-word">{plan.name}</CardTitle>
              <Badge
                className={cn("text-xs", statusConfig.className)}
                variant={statusConfig.variant}
              >
                {statusConfig.label}
              </Badge>
            </div>
            <CardDescription className="wrap-break-word">
              {formatPrice(plan.price, currency)}/
              {plan.billingPeriod === "monthly" ? "month" : "year"}
            </CardDescription>
          </div>
          {onManage && (
            <Button
              className="w-full sm:w-auto"
              onClick={onManage}
              type="button"
              variant="outline"
            >
              Manage
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {showUsageDetails && usage.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-sm">Usage</h3>
              <div className="flex flex-col gap-4">
                {usage.map((item, idx) => {
                  const percentage =
                    item.limit !== null ? (item.used / item.limit) * 100 : 0;
                  const isWarning =
                    item.warningThreshold !== undefined &&
                    percentage >= item.warningThreshold;
                  const isOverLimit =
                    item.limit !== null && item.used > item.limit;

                  return (
                    <div className="flex flex-col gap-2" key={idx}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{item.label}</span>
                        <span className="text-muted-foreground text-sm">
                          {item.used.toLocaleString()}
                          {item.unit && ` ${item.unit}`}
                          {item.limit !== null && (
                            <> / {item.limit.toLocaleString()}</>
                          )}
                          {item.limit === null && " (Unlimited)"}
                        </span>
                      </div>
                      {item.limit !== null && (
                        <Progress
                          aria-label={`${item.label} usage: ${percentage.toFixed(0)}%`}
                          className="h-2"
                          value={Math.min(percentage, 100)}
                        />
                      )}
                      {isWarning && !isOverLimit && (
                        <div className="flex items-center gap-2 text-xs text-yellow-600">
                          <AlertTriangle className="size-3.5" />
                          <span>
                            You&apos;ve used {percentage.toFixed(0)}% of your
                            limit
                          </span>
                        </div>
                      )}
                      {isOverLimit && (
                        <div className="flex items-center gap-2 text-destructive text-xs">
                          <AlertTriangle className="size-3.5" />
                          <span>You&apos;ve exceeded your limit</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {nextBillingDate && (
            <>
              {showUsageDetails && usage.length > 0 && <Separator />}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <span className="text-sm">Next billing date</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {formatDate(nextBillingDate)}
                </p>
              </div>
            </>
          )}

          <Separator />

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm">Auto-renewal</span>
                <span className="text-muted-foreground text-xs">
                  {autoRenew
                    ? "Your subscription will renew automatically"
                    : "Your subscription will not renew"}
                </span>
              </div>
              <Switch checked={autoRenew} disabled />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              {onUpgrade && (
                <Button
                  className="w-full sm:w-auto"
                  onClick={onUpgrade}
                  type="button"
                  variant="default"
                >
                  <TrendingUp className="size-4" />
                  Upgrade
                </Button>
              )}
              {onDowngrade && (
                <Button
                  className="w-full sm:w-auto"
                  onClick={onDowngrade}
                  type="button"
                  variant="outline"
                >
                  Downgrade
                </Button>
              )}
              {onCancel && (
                <Button
                  className="w-full sm:w-auto"
                  onClick={onCancel}
                  type="button"
                  variant="destructive"
                >
                  Cancel subscription
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

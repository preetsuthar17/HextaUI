"use client";

import { AlertTriangle, Clock, TrendingUp, Zap } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/new-york/ui/alert";
import { Badge } from "@/registry/new-york/ui/badge";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Progress } from "@/registry/new-york/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip";

export interface TokenUsage {
  input: number;
  output: number;
  total: number;
}

export interface RateLimit {
  remaining: number;
  limit: number;
  resetAt?: Date;
  window: "minute" | "hour" | "day" | "month";
}

export interface Quota {
  used: number;
  limit: number;
  resetAt?: Date;
  period: "day" | "month" | "year";
}

export interface AIUsageQuotaProps {
  tokenUsage?: TokenUsage;
  rateLimit?: RateLimit;
  quota?: Quota;
  onUpgrade?: () => void;
  className?: string;
  showUpgradePrompt?: boolean;
  upgradeThreshold?: number;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const WINDOW_LABELS = {
  minute: "min",
  hour: "hr",
  day: "day",
  month: "mo",
} as const;

const PERIOD_LABELS = {
  day: "Daily",
  month: "Monthly",
  year: "Yearly",
} as const;

function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toLocaleString();
}

function formatTimeUntil(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  if (diff <= 0) return "Now";

  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return "Soon";
}

function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hour12 = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";
  const minutesStr = minutes.toString().padStart(2, "0");
  return `${hour12}:${minutesStr} ${ampm}`;
}

function formatDateTime(date: Date): string {
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hour12 = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";
  const minutesStr = minutes.toString().padStart(2, "0");
  return `${month} ${day}, ${hour12}:${minutesStr} ${ampm}`;
}

function calculatePercentage(used: number, limit: number): number {
  return (used / limit) * 100;
}

function getStatusVariant(percentage: number, isQuota = false) {
  if (isQuota) {
    if (percentage >= 90) return "destructive";
    if (percentage >= 75) return "outline";
    return "secondary";
  }
  if (percentage < 20) return "destructive";
  if (percentage < 50) return "outline";
  return "secondary";
}

interface TimeUntilProps {
  date: Date;
  className?: string;
  "aria-label"?: string;
}

function TimeUntil({
  date,
  className,
  "aria-label": ariaLabel,
}: TimeUntilProps) {
  const [timeUntil, setTimeUntil] = useState(() => formatTimeUntil(date));

  useEffect(() => {
    const updateTime = () => {
      setTimeUntil(formatTimeUntil(date));
    };

    const timeoutId = setTimeout(updateTime, 0);
    const interval = setInterval(updateTime, 60_000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, [date]);

  return (
    <span aria-label={ariaLabel} aria-live="polite" className={className}>
      {timeUntil}
    </span>
  );
}

interface TokenUsageDisplayProps {
  tokenUsage: TokenUsage;
}

function TokenUsageDisplay({ tokenUsage }: TokenUsageDisplayProps) {
  return (
    <section
      aria-labelledby="token-usage-heading"
      className="flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm" id="token-usage-heading">
          Token Usage
        </h3>
        <Badge
          aria-label={`Total tokens: ${formatNumber(tokenUsage.total)}`}
          className="font-mono text-xs"
          variant="outline"
        >
          {formatNumber(tokenUsage.total)}
        </Badge>
      </div>
      <div className="flex flex-col gap-2" role="list">
        <div
          className="flex items-center justify-between text-muted-foreground text-xs"
          role="listitem"
        >
          <div className="flex items-center gap-1.5">
            <TrendingUp aria-hidden="true" className="size-3.5" />
            <span>Input</span>
          </div>
          <span
            aria-label={`Input tokens: ${formatNumber(tokenUsage.input)}`}
            className="font-mono tabular-nums"
          >
            {formatNumber(tokenUsage.input)}
          </span>
        </div>
        <div
          className="flex items-center justify-between text-muted-foreground text-xs"
          role="listitem"
        >
          <div className="flex items-center gap-1.5">
            <Zap aria-hidden="true" className="size-3" />
            <span>Output</span>
          </div>
          <span
            aria-label={`Output tokens: ${formatNumber(tokenUsage.output)}`}
            className="font-mono tabular-nums"
          >
            {formatNumber(tokenUsage.output)}
          </span>
        </div>
      </div>
    </section>
  );
}

interface RateLimitIndicatorProps {
  rateLimit: RateLimit;
}

function RateLimitIndicator({ rateLimit }: RateLimitIndicatorProps) {
  const percentage = calculatePercentage(rateLimit.remaining, rateLimit.limit);
  const usedPercentage = 100 - percentage;
  const isLow = percentage < 20;
  const isWarning = percentage < 50;
  const variant = getStatusVariant(percentage);

  const windowLabel = WINDOW_LABELS[rateLimit.window];

  return (
    <section
      aria-labelledby="rate-limit-heading"
      className="flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm" id="rate-limit-heading">
          Rate Limit
        </h3>
        <Badge
          aria-label={`${rateLimit.remaining} of ${rateLimit.limit} requests remaining`}
          className={cn(
            "font-mono text-xs",
            isLow && "border-destructive/50 bg-destructive/10 text-destructive"
          )}
          variant={variant}
        >
          {rateLimit.remaining}/{rateLimit.limit}
        </Badge>
      </div>
      <div className="flex flex-col gap-2">
        <Progress
          aria-label={`${rateLimit.remaining} of ${rateLimit.limit} requests remaining, ${usedPercentage.toFixed(1)}% used`}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={percentage}
          className="h-2"
          role="progressbar"
          value={percentage}
        />
        <div className="flex items-center justify-between text-muted-foreground text-xs">
          <div className="flex items-center gap-1.5">
            <Clock aria-hidden="true" className="size-3" />
            <span>Per {windowLabel}</span>
          </div>
          {rateLimit.resetAt && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help touch-manipulation" tabIndex={0}>
                  <span className="sr-only">Rate limit resets in </span>
                  <TimeUntil
                    aria-label={`Rate limit resets in ${formatTimeUntil(rateLimit.resetAt)}`}
                    date={rateLimit.resetAt}
                  />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Resets at {formatTime(rateLimit.resetAt)}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </section>
  );
}

interface QuotaProgressProps {
  quota: Quota;
}

function QuotaProgress({ quota }: QuotaProgressProps) {
  const percentage = calculatePercentage(quota.used, quota.limit);
  const isLow = percentage >= 90;
  const isWarning = percentage >= 75;
  const variant = getStatusVariant(percentage, true);

  const periodLabel = PERIOD_LABELS[quota.period];

  return (
    <section aria-labelledby="quota-heading" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm" id="quota-heading">
          {periodLabel} Quota
        </h3>
        <Badge
          aria-label={`${formatNumber(quota.used)} of ${formatNumber(quota.limit)} tokens used, ${percentage.toFixed(1)}%`}
          className={cn(
            "font-mono text-xs",
            isLow && "border-destructive/50 bg-destructive/10 text-destructive"
          )}
          variant={variant}
        >
          {formatNumber(quota.used)}/{formatNumber(quota.limit)}
        </Badge>
      </div>
      <div className="flex flex-col gap-2">
        <Progress
          aria-label={`${formatNumber(quota.used)} of ${formatNumber(quota.limit)} tokens used, ${percentage.toFixed(1)}%`}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={percentage}
          className={cn(
            "h-2",
            isLow && "[&>div]:bg-destructive",
            isWarning && !isLow && "[&>div]:bg-yellow-500"
          )}
          role="progressbar"
          value={percentage}
        />
        <div className="flex items-center justify-between text-muted-foreground text-xs">
          <span aria-live="polite">{percentage.toFixed(1)}% used</span>
          {quota.resetAt && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className="flex cursor-help touch-manipulation items-center gap-1"
                  tabIndex={0}
                >
                  <Clock aria-hidden="true" className="size-3" />
                  <span>
                    <span className="sr-only">Quota resets in </span>
                    <TimeUntil
                      aria-label={`Quota resets in ${formatTimeUntil(quota.resetAt)}`}
                      date={quota.resetAt}
                    />
                  </span>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Resets at {formatDateTime(quota.resetAt)}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </section>
  );
}

interface UpgradePromptProps {
  message?: string;
  onUpgrade?: () => void;
}

function UpgradePrompt({ message, onUpgrade }: UpgradePromptProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onUpgrade?.();
      }
    },
    [onUpgrade]
  );

  return (
    <Alert
      className="rounded-xl border-primary/20 bg-primary/5 shadow-sm"
      live="assertive"
      role="alert"
    >
      <AlertTriangle aria-hidden="true" className="size-4 text-primary" />
      <AlertTitle className="text-sm">Usage Warning!</AlertTitle>
      <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-muted-foreground text-xs">
          {message ||
            "You're approaching your usage limits. Upgrade to continue using HextaAI without interruptions."}
        </span>
        {onUpgrade && (
          <Button
            className="min-h-[32px] w-full touch-manipulation sm:w-auto"
            onClick={onUpgrade}
            onKeyDown={handleKeyDown}
            size="sm"
            variant="default"
          >
            Upgrade Now
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}

export default function AIUsageQuota({
  tokenUsage,
  rateLimit,
  quota,
  onUpgrade,
  className,
  showUpgradePrompt = true,
  upgradeThreshold = 80,
}: AIUsageQuotaProps) {
  const shouldShowUpgrade = useMemo(() => {
    if (!showUpgradePrompt) return false;

    const quotaPercentage = quota
      ? calculatePercentage(quota.used, quota.limit)
      : 0;
    const rateLimitPercentage = rateLimit
      ? calculatePercentage(
          rateLimit.limit - rateLimit.remaining,
          rateLimit.limit
        )
      : 0;

    return (
      quotaPercentage >= upgradeThreshold ||
      rateLimitPercentage >= upgradeThreshold
    );
  }, [quota, rateLimit, showUpgradePrompt, upgradeThreshold]);

  const upgradeMessage = useMemo(() => {
    if (!shouldShowUpgrade) return;

    if (quota) {
      const quotaPercentage = calculatePercentage(quota.used, quota.limit);
      if (quotaPercentage >= upgradeThreshold) {
        return `You've used ${quotaPercentage.toFixed(0)}% of your ${quota.period}ly quota. Upgrade to get more tokens.`;
      }
    }

    if (rateLimit) {
      const rateLimitPercentage = calculatePercentage(
        rateLimit.limit - rateLimit.remaining,
        rateLimit.limit
      );
      if (rateLimitPercentage >= upgradeThreshold) {
        return `You've used ${rateLimitPercentage.toFixed(0)}% of your rate limit. Upgrade for higher limits.`;
      }
    }

    return;
  }, [quota, rateLimit, shouldShowUpgrade, upgradeThreshold]);

  const hasAnyData = tokenUsage || rateLimit || quota;

  if (!hasAnyData) {
    return null;
  }

  return (
    <TooltipProvider>
      <div
        aria-label="AI usage and quota information"
        className={cn("flex w-full flex-col gap-4", className)}
        role="region"
      >
        {shouldShowUpgrade && (
          <UpgradePrompt message={upgradeMessage} onUpgrade={onUpgrade} />
        )}

        <Card className="gap-2 p-4 shadow-xs md:p-6">
          <CardHeader className="p-0">
            <CardTitle className="p-0 text-base">Usage & Quota</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-0">
            {tokenUsage && <TokenUsageDisplay tokenUsage={tokenUsage} />}
            {rateLimit && <RateLimitIndicator rateLimit={rateLimit} />}
            {quota && <QuotaProgress quota={quota} />}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}

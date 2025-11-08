"use client";

import { AlertTriangle, Clock, TrendingUp, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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
  upgradeThreshold?: number; // Percentage threshold to show upgrade prompt (default: 80)
}

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
  // Use consistent format to avoid hydration mismatches
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hour12 = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";
  const minutesStr = minutes.toString().padStart(2, "0");
  return `${hour12}:${minutesStr} ${ampm}`;
}

function formatDateTime(date: Date): string {
  // Use consistent format to avoid hydration mismatches
  const months = [
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
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hour12 = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";
  const minutesStr = minutes.toString().padStart(2, "0");
  return `${month} ${day}, ${hour12}:${minutesStr} ${ampm}`;
}

interface TimeUntilProps {
  date: Date;
  className?: string;
}

function TimeUntil({ date, className }: TimeUntilProps) {
  const [timeUntil, setTimeUntil] = useState(() => formatTimeUntil(date));

  useEffect(() => {
    // Update time on client only
    setTimeUntil(formatTimeUntil(date));

    const interval = setInterval(() => {
      setTimeUntil(formatTimeUntil(date));
    }, 60_000); // Update every minute

    return () => clearInterval(interval);
  }, [date]);

  return <span className={className}>{timeUntil}</span>;
}

interface TokenUsageDisplayProps {
  tokenUsage: TokenUsage;
}

function TokenUsageDisplay({ tokenUsage }: TokenUsageDisplayProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">Token Usage</h3>
        <Badge className="font-mono text-xs" variant="outline">
          {formatNumber(tokenUsage.total)}
        </Badge>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-muted-foreground text-xs">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="size-3" />
            <span>Input</span>
          </div>
          <span className="font-mono tabular-nums">
            {formatNumber(tokenUsage.input)}
          </span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground text-xs">
          <div className="flex items-center gap-1.5">
            <Zap className="size-3" />
            <span>Output</span>
          </div>
          <span className="font-mono tabular-nums">
            {formatNumber(tokenUsage.output)}
          </span>
        </div>
      </div>
    </div>
  );
}

interface RateLimitIndicatorProps {
  rateLimit: RateLimit;
}

function RateLimitIndicator({ rateLimit }: RateLimitIndicatorProps) {
  const percentage = (rateLimit.remaining / rateLimit.limit) * 100;
  const isLow = percentage < 20;
  const isWarning = percentage < 50;

  const windowLabel = {
    minute: "min",
    hour: "hr",
    day: "day",
    month: "mo",
  }[rateLimit.window];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">Rate Limit</h3>
        <Badge
          className={cn(
            "font-mono text-xs",
            isLow && "border-destructive/50 bg-destructive/10 text-destructive"
          )}
          variant={isLow ? "destructive" : isWarning ? "outline" : "secondary"}
        >
          {rateLimit.remaining}/{rateLimit.limit}
        </Badge>
      </div>
      <div className="flex flex-col gap-2">
        <Progress
          aria-label={`${rateLimit.remaining} of ${rateLimit.limit} requests remaining`}
          className="h-2"
          value={percentage}
        />
        <div className="flex items-center justify-between text-muted-foreground text-xs">
          <div className="flex items-center gap-1.5">
            <Clock className="size-3" />
            <span>Per {windowLabel}</span>
          </div>
          {rateLimit.resetAt && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help">
                  Resets in <TimeUntil date={rateLimit.resetAt} />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Resets at {formatTime(rateLimit.resetAt)}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}

interface QuotaProgressProps {
  quota: Quota;
}

function QuotaProgress({ quota }: QuotaProgressProps) {
  const percentage = (quota.used / quota.limit) * 100;
  const isLow = percentage >= 90;
  const isWarning = percentage >= 75;

  const periodLabel = {
    day: "Daily",
    month: "Monthly",
    year: "Yearly",
  }[quota.period];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">{periodLabel} Quota</h3>
        <Badge
          className={cn(
            "font-mono text-xs",
            isLow && "border-destructive/50 bg-destructive/10 text-destructive"
          )}
          variant={isLow ? "destructive" : isWarning ? "outline" : "secondary"}
        >
          {formatNumber(quota.used)}/{formatNumber(quota.limit)}
        </Badge>
      </div>
      <div className="flex flex-col gap-2">
        <Progress
          aria-label={`${quota.used} of ${quota.limit} tokens used`}
          className={cn(
            "h-2",
            isLow && "[&>div]:bg-destructive",
            isWarning && !isLow && "[&>div]:bg-yellow-500"
          )}
          value={percentage}
        />
        <div className="flex items-center justify-between text-muted-foreground text-xs">
          <span>{percentage.toFixed(1)}% used</span>
          {quota.resetAt && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex cursor-help items-center gap-1">
                  <Clock className="size-3" />
                  <span>
                    Resets in <TimeUntil date={quota.resetAt} />
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
    </div>
  );
}

interface UpgradePromptProps {
  message?: string;
}

function UpgradePrompt({ message }: UpgradePromptProps) {
  return (
    <Alert className="rounded-xl border-primary/20 bg-primary/5">
      <AlertTriangle className="size-4 text-primary" />
      <AlertTitle className="text-sm">Usage Warning!</AlertTitle>
      <AlertDescription className="flex items-center justify-between gap-2">
        <span className="text-muted-foreground text-xs">
          {message ||
            "You're approaching your usage limits. Upgrade to continue using HextaAI without interruptions."}
        </span>
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

    const quotaPercentage = quota ? (quota.used / quota.limit) * 100 : 0;
    const rateLimitPercentage = rateLimit
      ? ((rateLimit.limit - rateLimit.remaining) / rateLimit.limit) * 100
      : 0;

    return (
      quotaPercentage >= upgradeThreshold ||
      rateLimitPercentage >= upgradeThreshold
    );
  }, [quota, rateLimit, showUpgradePrompt, upgradeThreshold]);

  const hasAnyData = tokenUsage || rateLimit || quota;

  if (!hasAnyData) {
    return null;
  }

  return (
    <TooltipProvider>
      {shouldShowUpgrade && (
        <UpgradePrompt
          message={
            quota && (quota.used / quota.limit) * 100 >= upgradeThreshold
              ? `You've used ${((quota.used / quota.limit) * 100).toFixed(0)}% of your ${quota.period}ly quota. Upgrade to get more tokens.`
              : rateLimit &&
                  ((rateLimit.limit - rateLimit.remaining) / rateLimit.limit) *
                    100 >=
                    upgradeThreshold
                ? `You've used ${(((rateLimit.limit - rateLimit.remaining) / rateLimit.limit) * 100).toFixed(0)}% of your rate limit. Upgrade for higher limits.`
                : undefined
          }
        />
      )}

      <div className={cn("flex w-full flex-col gap-4", className)}>
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

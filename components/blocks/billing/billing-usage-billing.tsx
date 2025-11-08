"use client";

import {
  AlertTriangle,
  Download,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
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

export interface UsageDataPoint {
  date: Date;
  value: number;
  category?: string;
}

export interface UsageCategory {
  name: string;
  value: number;
  limit?: number;
  color?: string;
}

export interface BillingUsageBillingProps {
  currentPeriod: {
    start: Date;
    end: Date;
    usage: number;
    limit?: number;
  };
  previousPeriod?: {
    usage: number;
    limit?: number;
  };
  dataPoints?: UsageDataPoint[];
  categories?: UsageCategory[];
  unit?: string;
  onDateRangeChange?: (start: Date, end: Date) => void;
  onExport?: () => void;
  className?: string;
  showChart?: boolean;
  showBreakdown?: boolean;
  warningThreshold?: number;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

function formatNumber(value: number, unit?: string): string {
  const formatted = value.toLocaleString();
  return unit ? `${formatted} ${unit}` : formatted;
}

function calculateTrend(
  current: number,
  previous: number
): {
  percentage: number;
  isIncrease: boolean;
} {
  if (previous === 0) {
    return { percentage: current > 0 ? 100 : 0, isIncrease: current > 0 };
  }
  const percentage = ((current - previous) / previous) * 100;
  return {
    percentage: Math.abs(percentage),
    isIncrease: percentage > 0,
  };
}

export default function BillingUsageBilling({
  currentPeriod,
  previousPeriod,
  dataPoints = [],
  categories = [],
  unit = "",
  onDateRangeChange,
  onExport,
  className,
  showChart = true,
  showBreakdown = true,
  warningThreshold = 80,
}: BillingUsageBillingProps) {
  const usagePercentage =
    currentPeriod.limit !== undefined
      ? (currentPeriod.usage / currentPeriod.limit) * 100
      : 0;
  const isWarning = usagePercentage >= warningThreshold;
  const isOverLimit =
    currentPeriod.limit !== undefined &&
    currentPeriod.usage > currentPeriod.limit;

  const trend = previousPeriod
    ? calculateTrend(currentPeriod.usage, previousPeriod.usage)
    : null;

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>Usage</CardTitle>
            <CardDescription>
              {formatDate(currentPeriod.start)} -{" "}
              {formatDate(currentPeriod.end)}
            </CardDescription>
          </div>
          {onExport && (
            <Button
              className="w-full sm:w-auto"
              onClick={onExport}
              type="button"
              variant="outline"
            >
              <Download className="size-4" />
              Export
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Current period</span>
              <span className="font-medium text-sm">
                {formatNumber(currentPeriod.usage, unit)}
                {currentPeriod.limit !== undefined && (
                  <> / {formatNumber(currentPeriod.limit, unit)}</>
                )}
                {currentPeriod.limit === undefined && " (Unlimited)"}
              </span>
            </div>
            {currentPeriod.limit !== undefined && (
              <Progress
                aria-label={`Usage: ${usagePercentage.toFixed(0)}%`}
                className="h-2"
                value={Math.min(usagePercentage, 100)}
              />
            )}
            {isWarning && !isOverLimit && (
              <div className="flex items-center gap-2 text-xs text-yellow-600">
                <AlertTriangle className="size-3.5" />
                <span>
                  You&apos;ve used {usagePercentage.toFixed(0)}% of your limit
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

          {previousPeriod && (
            <>
              <Separator />
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    Previous period
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {formatNumber(previousPeriod.usage, unit)}
                    {previousPeriod.limit !== undefined && (
                      <> / {formatNumber(previousPeriod.limit, unit)}</>
                    )}
                  </span>
                </div>
                {trend && (
                  <div className="flex items-center gap-2">
                    {trend.isIncrease ? (
                      <TrendingUp className="size-4 text-green-600" />
                    ) : (
                      <TrendingDown className="size-4 text-blue-600" />
                    )}
                    <span className="text-muted-foreground text-xs">
                      {trend.isIncrease ? "Increased" : "Decreased"} by{" "}
                      {trend.percentage.toFixed(1)}% compared to previous period
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

          {showBreakdown && categories.length > 0 && (
            <>
              <Separator />
              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-sm">Breakdown by category</h3>
                <div className="flex flex-col gap-3">
                  {categories.map((category, idx) => {
                    const categoryPercentage =
                      category.limit !== undefined
                        ? (category.value / category.limit) * 100
                        : 0;
                    return (
                      <div className="flex flex-col gap-2" key={idx}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{category.name}</span>
                          <span className="text-muted-foreground text-sm">
                            {formatNumber(category.value, unit)}
                            {category.limit !== undefined && (
                              <> / {formatNumber(category.limit, unit)}</>
                            )}
                          </span>
                        </div>
                        {category.limit !== undefined && (
                          <Progress
                            aria-label={`${category.name} usage: ${categoryPercentage.toFixed(0)}%`}
                            className="h-1.5"
                            value={Math.min(categoryPercentage, 100)}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {showChart && dataPoints.length > 0 && (
            <>
              <Separator />
              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-sm">Usage over time</h3>
                <div className="relative h-32 overflow-hidden rounded-lg border bg-muted/50 p-4">
                  <div className="flex h-full items-end justify-between gap-1">
                    {(() => {
                      const maxDataValue = Math.max(
                        ...dataPoints.map((p) => p.value),
                        1
                      );
                      const containerHeight = 128;
                      const padding = 16;
                      const availableHeight = containerHeight - padding * 2;
                      const minHeightPx = 4;

                      return dataPoints.map((point, idx) => {
                        const heightPercentage =
                          maxDataValue > 0
                            ? (point.value / maxDataValue) * 100
                            : 0;
                        const calculatedHeightPx = Math.min(
                          Math.max(
                            (heightPercentage / 100) * availableHeight,
                            minHeightPx
                          ),
                          availableHeight
                        );

                        return (
                          <div
                            className="group relative flex-1"
                            key={idx}
                            title={`${formatDate(point.date)}: ${formatNumber(point.value, unit)}`}
                          >
                            <div
                              className="w-full rounded-t bg-primary transition-all hover:bg-primary/80"
                              style={{
                                height: `${calculatedHeightPx}px`,
                                minHeight: `${minHeightPx}px`,
                              }}
                            />
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
                <div className="flex items-center justify-between text-muted-foreground text-xs">
                  <span>{formatDate(dataPoints[0]?.date || new Date())}</span>
                  <span>
                    {formatDate(
                      dataPoints[dataPoints.length - 1]?.date || new Date()
                    )}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

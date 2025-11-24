"use client";

import { Check, Loader2, Sparkles, TrendingUp, X } from "lucide-react";
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

export interface UpgradeFeature {
  name: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface BillingUpgradePromptProps {
  currentPlan: {
    id: string;
    name: string;
  };
  recommendedPlan: {
    id: string;
    name: string;
    price: number;
    currency?: string;
    billingPeriod?: "monthly" | "annual";
  };
  features?: UpgradeFeature[];
  reason?: "usage_limit" | "feature_unlock" | "recommended" | "custom";
  customMessage?: string;
  onUpgrade?: () => void;
  onDismiss?: () => void;
  onLearnMore?: () => void;
  className?: string;
  variant?: "banner" | "card" | "modal";
  showSavings?: boolean;
  savingsAmount?: number;
  limitedTime?: boolean;
}

function formatPrice(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function BillingUpgradePrompt({
  currentPlan,
  recommendedPlan,
  features = [],
  reason = "recommended",
  customMessage,
  onUpgrade,
  onDismiss,
  onLearnMore,
  className,
  variant = "card",
  showSavings = false,
  savingsAmount = 0,
  limitedTime = false,
}: BillingUpgradePromptProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      await onUpgrade?.();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  if (isDismissed) return null;

  const getReasonMessage = () => {
    switch (reason) {
      case "usage_limit":
        return `You've used 90% of your ${currentPlan.name} plan limit. Upgrade to continue using all features.`;
      case "feature_unlock":
        return `Unlock advanced features with ${recommendedPlan.name}.`;
      case "recommended":
        return `${recommendedPlan.name} is recommended for your usage.`;
      case "custom":
        return (
          customMessage ||
          `Upgrade to ${recommendedPlan.name} for more features.`
        );
      default:
        return `Upgrade to ${recommendedPlan.name} for more features.`;
    }
  };

  const currency = recommendedPlan.currency || "USD";
  const price = formatPrice(recommendedPlan.price, currency);
  const period =
    recommendedPlan.billingPeriod === "annual" ? "/year" : "/month";

  if (variant === "banner") {
    return (
      <div
        className={cn(
          "flex flex-col gap-4 rounded-lg border bg-linear-to-r from-primary/10 to-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between",
          className
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Sparkles className="size-5 shrink-0 text-primary" />
            <h3 className="font-semibold text-sm">
              Upgrade to {recommendedPlan.name}
            </h3>
            {limitedTime && (
              <Badge className="bg-primary text-primary-foreground text-xs">
                Limited time
              </Badge>
            )}
          </div>
          <p className="wrap-break-word text-muted-foreground text-sm">
            {getReasonMessage()}
          </p>
          {features.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {features.slice(0, 3).map((feature, idx) => (
                <div className="flex items-center gap-1" key={idx}>
                  <Check className="size-3.5 text-primary" />
                  <span className="wrap-break-word">{feature.name}</span>
                </div>
              ))}
              {features.length > 3 && (
                <span className="text-muted-foreground">
                  +{features.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          {onDismiss && (
            <Button
              aria-label="Dismiss upgrade prompt"
              onClick={handleDismiss}
              size="icon"
              type="button"
              variant="ghost"
            >
              <X className="size-4" />
            </Button>
          )}
          {onLearnMore && (
            <Button onClick={onLearnMore} type="button" variant="outline">
              Learn more
            </Button>
          )}
          {onUpgrade && (
            <Button
              aria-busy={isLoading}
              data-loading={isLoading}
              onClick={handleUpgrade}
              type="button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Upgrading…
                </>
              ) : (
                <>
                  <TrendingUp className="size-4" />
                  Upgrade to {price}
                  {period}
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card className={cn("relative w-full shadow-xs", className)}>
      {onDismiss && (
        <Button
          aria-label="Dismiss upgrade prompt"
          className="absolute top-4 right-4 z-10"
          onClick={handleDismiss}
          size="icon"
          type="button"
          variant="ghost"
        >
          <X className="size-4" />
        </Button>
      )}
      <CardHeader>
        <div className="flex min-w-0 flex-1 flex-col gap-2 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle className="wrap-break-word">
              Upgrade to {recommendedPlan.name}
            </CardTitle>
            {limitedTime && (
              <Badge className="shrink-0 bg-primary text-primary-foreground text-xs">
                Limited time
              </Badge>
            )}
          </div>
          <CardDescription className="wrap-break-word">
            {getReasonMessage()}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-3">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-3xl">{price}</span>
              <span className="text-muted-foreground text-sm">{period}</span>
            </div>
            {showSavings && savingsAmount > 0 && (
              <Badge className="shrink-0 text-xs" variant="secondary">
                Save {formatPrice(savingsAmount, currency)}/year
              </Badge>
            )}
          </div>

          {features.length > 0 && (
            <>
              <Separator />
              <div className="flex flex-col gap-3">
                <h4 className="font-medium text-sm">What you&apos;ll get:</h4>
                <div className="flex flex-col gap-2">
                  {features.map((feature, idx) => (
                    <div className="flex items-start gap-3" key={idx}>
                      {feature.icon ? (
                        <feature.icon className="size-4 shrink-0 text-primary" />
                      ) : (
                        <Check className="size-4 shrink-0 text-primary" />
                      )}
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="wrap-break-word text-sm">
                          {feature.name}
                        </span>
                        {feature.description && (
                          <span className="wrap-break-word text-muted-foreground text-xs">
                            {feature.description}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="flex flex-col gap-2">
            {onUpgrade && (
              <Button
                aria-busy={isLoading}
                className="w-full"
                data-loading={isLoading}
                onClick={handleUpgrade}
                type="button"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Upgrading…
                  </>
                ) : (
                  <>
                    <TrendingUp className="size-4" />
                    Upgrade now
                  </>
                )}
              </Button>
            )}
            {onLearnMore && (
              <Button
                className="w-full"
                onClick={onLearnMore}
                type="button"
                variant="outline"
              >
                Learn more
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

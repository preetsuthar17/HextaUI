"use client";

import { Check, Loader2 } from "lucide-react";
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
import { Switch } from "@/registry/new-york/ui/switch";

export interface PlanFeature {
  name: string;
  included?: boolean;
  limit?: number | string;
  tooltip?: string;
}

export interface SelectablePlan {
  id: string;
  name: string;
  description?: string;
  price: {
    monthly: number;
    annual: number;
  };
  currency?: string;
  features: PlanFeature[];
  isPopular?: boolean;
  isCurrent?: boolean;
  ctaLabel?: string;
  disabled?: boolean;
}

export interface BillingPlanSelectorProps {
  plans: SelectablePlan[];
  selectedPlanId?: string;
  billingPeriod?: "monthly" | "annual";
  onBillingPeriodChange?: (period: "monthly" | "annual") => void;
  onPlanSelect?: (planId: string) => void;
  className?: string;
  showAnnualSavings?: boolean;
  currency?: string;
  layout?: "grid" | "list";
}

function formatPrice(
  amount: number,
  currency = "USD",
  period: "monthly" | "annual" = "monthly"
): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatted = formatter.format(amount);
  return period === "monthly" ? `${formatted}/mo` : `${formatted}/yr`;
}

export default function BillingPlanSelector({
  plans,
  selectedPlanId,
  billingPeriod = "monthly",
  onBillingPeriodChange,
  onPlanSelect,
  className,
  showAnnualSavings = true,
  currency = "USD",
  layout = "grid",
}: BillingPlanSelectorProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handlePlanSelect = async (planId: string) => {
    setIsLoading(planId);
    try {
      await onPlanSelect?.(planId);
    } finally {
      setIsLoading(null);
    }
  };

  const calculateSavings = (plan: SelectablePlan): number | null => {
    if (!showAnnualSavings || billingPeriod === "annual") return null;
    const monthlyTotal = plan.price.monthly * 12;
    const annualTotal = plan.price.annual;
    const savings = monthlyTotal - annualTotal;
    return savings > 0 ? savings : null;
  };

  const defaultCurrency = currency || plans[0]?.currency || "USD";

  return (
    <div className={cn("flex w-full flex-col gap-6", className)}>
      {plans.length > 0 && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-lg">Choose your plan</h2>
            <p className="text-muted-foreground text-sm">
              Select the plan that best fits your needs
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "text-sm",
                billingPeriod === "monthly" && "font-medium"
              )}
            >
              Monthly
            </span>
            <Switch
              checked={billingPeriod === "annual"}
              onCheckedChange={(checked) =>
                onBillingPeriodChange?.(checked ? "annual" : "monthly")
              }
            />
            <div className="flex flex-col">
              <span
                className={cn(
                  "text-sm",
                  billingPeriod === "annual" && "font-medium"
                )}
              >
                Annual
              </span>
              {showAnnualSavings && billingPeriod === "annual" && (
                <span className="text-primary text-xs">Save up to 20%</span>
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className={cn(
          "grid gap-4",
          layout === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        )}
      >
        {plans.map((plan) => {
          const savings = calculateSavings(plan);
          const price =
            billingPeriod === "monthly"
              ? plan.price.monthly
              : plan.price.annual;
          const isSelected = selectedPlanId === plan.id;

          return (
            <Card
              className={cn(
                "relative flex flex-col shadow-xs transition-all",
                plan.isCurrent && "border-primary",
                plan.isPopular && "border-primary shadow-md",
                isSelected && "ring-2 ring-primary",
                plan.disabled && "opacity-50"
              )}
              key={plan.id}
            >
              {plan.isPopular && (
                <div className="-top-3 -translate-x-1/2 absolute left-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Popular
                  </Badge>
                </div>
              )}
              <CardHeader>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="wrap-break-word">
                      {plan.name}
                    </CardTitle>
                    {plan.isCurrent && (
                      <Badge variant="secondary">Current</Badge>
                    )}
                  </div>
                  {plan.description && (
                    <CardDescription className="wrap-break-word">
                      {plan.description}
                    </CardDescription>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="font-semibold text-3xl">
                      {
                        formatPrice(
                          price,
                          plan.currency || defaultCurrency,
                          billingPeriod
                        ).split("/")[0]
                      }
                    </span>
                    <span className="text-muted-foreground text-sm">
                      /{billingPeriod === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                  {savings && (
                    <p className="text-primary text-sm">
                      Save{" "}
                      {
                        formatPrice(
                          savings,
                          plan.currency || defaultCurrency,
                          "annual"
                        ).split("/")[0]
                      }{" "}
                      per year
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-1 flex-col gap-6">
                  {plan.features.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {plan.features.map((feature, idx) => (
                        <div className="flex items-start gap-2" key={idx}>
                          {feature.included !== false ? (
                            <Check className="size-4 shrink-0 text-primary" />
                          ) : (
                            <div className="size-4 shrink-0" />
                          )}
                          <div className="flex min-w-0 flex-1 flex-col gap-1">
                            <span className="wrap-break-word text-sm">
                              {feature.name}
                              {feature.limit !== undefined &&
                                feature.included !== false && (
                                  <span className="text-muted-foreground">
                                    {" "}
                                    ({feature.limit})
                                  </span>
                                )}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <Button
                    aria-busy={isLoading === plan.id}
                    className="w-full"
                    data-loading={isLoading === plan.id}
                    disabled={
                      isLoading === plan.id || plan.disabled || plan.isCurrent
                    }
                    onClick={() => handlePlanSelect(plan.id)}
                    type="button"
                    variant={
                      plan.isCurrent
                        ? "outline"
                        : isSelected
                          ? "default"
                          : "default"
                    }
                  >
                    {isLoading === plan.id ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Processing…
                      </>
                    ) : plan.isCurrent ? (
                      "Current plan"
                    ) : (
                      plan.ctaLabel || "Select plan"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

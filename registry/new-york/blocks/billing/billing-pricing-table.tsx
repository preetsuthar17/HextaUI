"use client";

import { Check, HelpCircle, Loader2, X } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip";

export interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  price: {
    monthly: number;
    annual: number;
  };
  currency?: string;
  isPopular?: boolean;
  isCurrent?: boolean;
  features: PricingFeature[];
  ctaLabel?: string;
  ctaVariant?: "default" | "outline";
}

export interface PricingFeature {
  name: string;
  description?: string;
  values: {
    [planId: string]: string | boolean | number | null;
  };
  tooltip?: string;
}

export interface BillingPricingTableProps {
  plans: PricingPlan[];
  billingPeriod?: "monthly" | "annual";
  onBillingPeriodChange?: (period: "monthly" | "annual") => void;
  onPlanSelect?: (planId: string) => void;
  className?: string;
  showAnnualSavings?: boolean;
  currency?: string;
  mobileView?: "table" | "cards";
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

function formatFeatureValue(
  value: string | boolean | number | null
): React.ReactNode {
  if (value === null || value === false) {
    return <X className="size-4 text-muted-foreground" />;
  }
  if (value === true) {
    return <Check className="size-4 text-primary" />;
  }
  if (typeof value === "string") {
    return <span className="text-sm">{value}</span>;
  }
  return <span className="text-sm">{value}</span>;
}

export default function BillingPricingTable({
  plans,
  billingPeriod = "monthly",
  onBillingPeriodChange,
  onPlanSelect,
  className,
  showAnnualSavings = true,
  currency = "USD",
  mobileView = "cards",
}: BillingPricingTableProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handlePlanSelect = async (planId: string) => {
    setIsLoading(planId);
    try {
      await onPlanSelect?.(planId);
    } finally {
      setIsLoading(null);
    }
  };

  const calculateSavings = (plan: PricingPlan): number | null => {
    if (!showAnnualSavings || billingPeriod === "annual") return null;
    const monthlyTotal = plan.price.monthly * 12;
    const annualTotal = plan.price.annual;
    const savings = monthlyTotal - annualTotal;
    return savings > 0 ? savings : null;
  };

  const allFeatures = plans[0]?.features || [];
  const defaultCurrency = currency || plans[0]?.currency || "USD";

  return (
    <div className={cn("flex w-full flex-col gap-6", className)}>
      {plans.length > 0 && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-lg">Choose your plan</h2>
            <p className="text-muted-foreground text-sm">
              Compare features and pricing
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

      {mobileView === "cards" ? (
        <div className="flex flex-col gap-4 md:hidden">
          {plans.map((plan) => {
            const savings = calculateSavings(plan);
            const price =
              billingPeriod === "monthly"
                ? plan.price.monthly
                : plan.price.annual;

            return (
              <Card
                className={cn(
                  "relative w-full shadow-xs",
                  plan.isCurrent && "border-primary",
                  plan.isPopular && "border-primary shadow-md"
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
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      {allFeatures.map((feature, idx) => {
                        const value = feature.values[plan.id];
                        const hasValue = value !== null && value !== false;

                        let featureTitle = feature.name;
                        if (hasValue) {
                          if (
                            typeof value === "string" ||
                            typeof value === "number"
                          ) {
                            featureTitle = `${value} ${feature.name}`;
                          } else if (value === true) {
                            featureTitle = feature.name;
                          }
                        }

                        return (
                          <div className="flex items-start gap-3" key={idx}>
                            {hasValue && (
                              <div className="shrink-0">
                                <Check className="size-4 text-primary" />
                              </div>
                            )}
                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="wrap-break-word font-medium text-sm">
                                  {featureTitle}
                                </span>
                                {feature.tooltip && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <HelpCircle className="size-3.5 shrink-0 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-xs">
                                      <p className="wrap-break-word">
                                        {feature.tooltip}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>
                              {feature.description && (
                                <p className="wrap-break-word text-muted-foreground text-xs">
                                  {feature.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <Button
                      aria-busy={isLoading === plan.id}
                      className="w-full"
                      data-loading={isLoading === plan.id}
                      disabled={isLoading === plan.id || plan.isCurrent}
                      onClick={() => handlePlanSelect(plan.id)}
                      type="button"
                      variant={
                        plan.isCurrent
                          ? "outline"
                          : plan.ctaVariant || "default"
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
      ) : null}

      <div className="hidden w-full overflow-x-auto md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-background p-4 text-left">
                <span className="font-medium text-sm">Features</span>
              </th>
              {plans.map((plan) => {
                const savings = calculateSavings(plan);
                const price =
                  billingPeriod === "monthly"
                    ? plan.price.monthly
                    : plan.price.annual;

                return (
                  <th
                    className={cn(
                      "relative p-4 text-center",
                      plan.isCurrent && "bg-primary/5",
                      plan.isPopular && "bg-primary/10"
                    )}
                    key={plan.id}
                  >
                    <div className="flex flex-col gap-2">
                      {plan.isPopular && (
                        <Badge className="mx-auto bg-primary text-primary-foreground">
                          Popular
                        </Badge>
                      )}
                      <div className="flex flex-col gap-1">
                        <CardTitle className="wrap-break-word">
                          {plan.name}
                        </CardTitle>
                        {plan.description && (
                          <CardDescription className="wrap-break-word text-xs">
                            {plan.description}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex items-baseline justify-center gap-1">
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
                        <p className="text-primary text-xs">
                          Save{" "}
                          {
                            formatPrice(
                              savings,
                              plan.currency || defaultCurrency,
                              "annual"
                            ).split("/")[0]
                          }
                          /yr
                        </p>
                      )}
                      {plan.isCurrent && (
                        <Badge className="mx-auto" variant="secondary">
                          Current
                        </Badge>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {allFeatures.map((feature, idx) => (
              <tr className="border-b last:border-b-0" key={idx}>
                <td className="sticky left-0 z-10 bg-background p-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="wrap-break-word font-medium text-sm">
                        {feature.name}
                      </span>
                      {feature.tooltip && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="size-3.5 shrink-0 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="wrap-break-word">{feature.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    {feature.description && (
                      <p className="wrap-break-word text-muted-foreground text-xs">
                        {feature.description}
                      </p>
                    )}
                  </div>
                </td>
                {plans.map((plan) => {
                  const value = feature.values[plan.id];
                  return (
                    <td
                      className={cn(
                        "p-4 text-center",
                        plan.isCurrent && "bg-primary/5"
                      )}
                      key={plan.id}
                    >
                      <div className="flex items-center justify-center">
                        {formatFeatureValue(value)}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="sticky left-0 z-10 bg-background p-4" />
              {plans.map((plan) => (
                <td className="p-4" key={plan.id}>
                  <Button
                    aria-busy={isLoading === plan.id}
                    className="w-full"
                    data-loading={isLoading === plan.id}
                    disabled={isLoading === plan.id || plan.isCurrent}
                    onClick={() => handlePlanSelect(plan.id)}
                    type="button"
                    variant={
                      plan.isCurrent ? "outline" : plan.ctaVariant || "default"
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
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

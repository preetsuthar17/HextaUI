"use client";

import { useState } from "react";
import BillingBillingHistory, {
  type BillingTransaction,
} from "@/registry/new-york/blocks/billing/billing-billing-history";
import BillingCouponCode, {
  type AppliedCoupon,
} from "@/registry/new-york/blocks/billing/billing-coupon-code";
import BillingInvoiceDetails, {
  type InvoiceDetails,
} from "@/registry/new-york/blocks/billing/billing-invoice-details";
import BillingInvoiceList, {
  type Invoice,
} from "@/registry/new-york/blocks/billing/billing-invoice-list";
import BillingPaymentFailed, {
  type PaymentFailureDetails,
} from "@/registry/new-york/blocks/billing/billing-payment-failed";
import BillingPaymentForm from "@/registry/new-york/blocks/billing/billing-payment-form";
import BillingPaymentMethod, {
  type PaymentMethod,
} from "@/registry/new-york/blocks/billing/billing-payment-method";
import BillingPaymentSchedule, {
  type ScheduledPayment,
} from "@/registry/new-york/blocks/billing/billing-payment-schedule";
import BillingPlanSelector, {
  type SelectablePlan,
} from "@/registry/new-york/blocks/billing/billing-plan-selector";
import BillingPricingTable, {
  type PricingPlan,
} from "@/registry/new-york/blocks/billing/billing-pricing-table";
import BillingSubscriptionCard from "@/registry/new-york/blocks/billing/billing-subscription-card";
import BillingSubscriptionSettings, {
  type SubscriptionSettings,
} from "@/registry/new-york/blocks/billing/billing-subscription-settings";
import BillingUpgradePrompt, {
  type UpgradeFeature,
} from "@/registry/new-york/blocks/billing/billing-upgrade-prompt";
import BillingUsageAlerts, {
  type UsageAlert,
} from "@/registry/new-york/blocks/billing/billing-usage-alerts";
import BillingUsageBilling, {
  type UsageCategory,
  type UsageDataPoint,
} from "@/registry/new-york/blocks/billing/billing-usage-billing";

export default function BillingPreview() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">(
    "monthly"
  );
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
    null
  );
  const [invoiceDetailsOpen, setInvoiceDetailsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null
  );

  const examplePlans: PricingPlan[] = [
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started",
      price: {
        monthly: 0,
        annual: 0,
      },
      currency: "USD",
      features: [
        {
          name: "API requests",
          description: "Monthly API request limit",
          values: {
            free: "1,000/month",
            pro: "100,000/month",
            enterprise: "Unlimited",
          },
          tooltip: "Number of API requests you can make per month",
        },
        {
          name: "Storage",
          description: "Total storage capacity",
          values: {
            free: "5 GB",
            pro: "100 GB",
            enterprise: "1 TB",
          },
          tooltip: "Total storage space for your files and data",
        },
        {
          name: "Team members",
          description: "Number of team members",
          values: {
            free: 1,
            pro: 10,
            enterprise: "Unlimited",
          },
          tooltip: "Maximum number of team members you can invite",
        },
        {
          name: "Support",
          description: "Customer support level",
          values: {
            free: false,
            pro: "Email",
            enterprise: "Priority",
          },
          tooltip: "Type of customer support available",
        },
        {
          name: "Custom domains",
          description: "Add your own domain",
          values: {
            free: false,
            pro: true,
            enterprise: true,
          },
          tooltip: "Use your own custom domain name",
        },
        {
          name: "SSO integration",
          description: "Single sign-on support",
          values: {
            free: false,
            pro: false,
            enterprise: true,
          },
          tooltip: "Integrate with your SSO provider",
        },
      ],
      ctaLabel: "Get started",
      ctaVariant: "outline",
    },
    {
      id: "pro",
      name: "Pro",
      description: "For growing teams",
      price: {
        monthly: 29,
        annual: 290,
      },
      currency: "USD",
      isPopular: true,
      isCurrent: true,
      features: [
        {
          name: "API requests",
          description: "Monthly API request limit",
          values: {
            free: "1,000/month",
            pro: "100,000/month",
            enterprise: "Unlimited",
          },
          tooltip: "Number of API requests you can make per month",
        },
        {
          name: "Storage",
          description: "Total storage capacity",
          values: {
            free: "5 GB",
            pro: "100 GB",
            enterprise: "1 TB",
          },
          tooltip: "Total storage space for your files and data",
        },
        {
          name: "Team members",
          description: "Number of team members",
          values: {
            free: 1,
            pro: 10,
            enterprise: "Unlimited",
          },
          tooltip: "Maximum number of team members you can invite",
        },
        {
          name: "Support",
          description: "Customer support level",
          values: {
            free: false,
            pro: "Email",
            enterprise: "Priority",
          },
          tooltip: "Type of customer support available",
        },
        {
          name: "Custom domains",
          description: "Add your own domain",
          values: {
            free: false,
            pro: true,
            enterprise: true,
          },
          tooltip: "Use your own custom domain name",
        },
        {
          name: "SSO integration",
          description: "Single sign-on support",
          values: {
            free: false,
            pro: false,
            enterprise: true,
          },
          tooltip: "Integrate with your SSO provider",
        },
      ],
      ctaLabel: "Current plan",
      ctaVariant: "outline",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations",
      price: {
        monthly: 99,
        annual: 990,
      },
      currency: "USD",
      features: [
        {
          name: "API requests",
          description: "Monthly API request limit",
          values: {
            free: "1,000/month",
            pro: "100,000/month",
            enterprise: "Unlimited",
          },
          tooltip: "Number of API requests you can make per month",
        },
        {
          name: "Storage",
          description: "Total storage capacity",
          values: {
            free: "5 GB",
            pro: "100 GB",
            enterprise: "1 TB",
          },
          tooltip: "Total storage space for your files and data",
        },
        {
          name: "Team members",
          description: "Number of team members",
          values: {
            free: 1,
            pro: 10,
            enterprise: "Unlimited",
          },
          tooltip: "Maximum number of team members you can invite",
        },
        {
          name: "Support",
          description: "Customer support level",
          values: {
            free: false,
            pro: "Email",
            enterprise: "Priority",
          },
          tooltip: "Type of customer support available",
        },
        {
          name: "Custom domains",
          description: "Add your own domain",
          values: {
            free: false,
            pro: true,
            enterprise: true,
          },
          tooltip: "Use your own custom domain name",
        },
        {
          name: "SSO integration",
          description: "Single sign-on support",
          values: {
            free: false,
            pro: false,
            enterprise: true,
          },
          tooltip: "Integrate with your SSO provider",
        },
      ],
      ctaLabel: "Contact sales",
      ctaVariant: "default",
    },
  ];

  const exampleInvoices: Invoice[] = [
    {
      id: "inv-1",
      invoiceNumber: "INV-2024-001",
      date: new Date("2024-01-15T10:00:00Z"),
      amount: 29,
      currency: "USD",
      status: "paid",
      description: "Pro Plan - January 2024",
      downloadUrl: "#",
    },
    {
      id: "inv-2",
      invoiceNumber: "INV-2023-156",
      date: new Date("2023-12-15T10:00:00Z"),
      amount: 29,
      currency: "USD",
      status: "paid",
      description: "Pro Plan - December 2023",
      downloadUrl: "#",
    },
    {
      id: "inv-3",
      invoiceNumber: "INV-2023-155",
      date: new Date("2023-11-15T10:00:00Z"),
      amount: 29,
      currency: "USD",
      status: "paid",
      description: "Pro Plan - November 2023",
      downloadUrl: "#",
    },
  ];

  const examplePaymentMethods: PaymentMethod[] = [
    {
      id: "pm-1",
      type: "card",
      brand: "visa",
      last4: "4242",
      expiryMonth: 12,
      expiryYear: 2025,
      holderName: "John Doe",
      isDefault: true,
    },
    {
      id: "pm-2",
      type: "card",
      brand: "mastercard",
      last4: "8888",
      expiryMonth: 6,
      expiryYear: 2026,
      holderName: "John Doe",
      isDefault: false,
    },
  ];

  const usageDataPoints: UsageDataPoint[] = [
    { date: new Date("2024-01-01"), value: 1200 },
    { date: new Date("2024-01-02"), value: 1500 },
    { date: new Date("2024-01-03"), value: 1800 },
    { date: new Date("2024-01-04"), value: 2100 },
    { date: new Date("2024-01-05"), value: 1900 },
    { date: new Date("2024-01-06"), value: 2200 },
    { date: new Date("2024-01-07"), value: 2500 },
  ];

  const usageCategories: UsageCategory[] = [
    {
      name: "API Requests",
      value: 45_000,
      limit: 100_000,
      color: "#3b82f6",
    },
    {
      name: "Storage",
      value: 35,
      limit: 100,
      color: "#10b981",
    },
    {
      name: "Bandwidth",
      value: 120,
      limit: 500,
      color: "#f59e0b",
    },
  ];

  const exampleTransactions: BillingTransaction[] = [
    {
      id: "txn-1",
      date: new Date("2024-01-15T10:00:00Z"),
      type: "charge",
      amount: 29,
      currency: "USD",
      description: "Pro Plan - January 2024",
      status: "completed",
      invoiceId: "INV-2024-001",
      paymentMethod: "Visa •••• 4242",
    },
    {
      id: "txn-2",
      date: new Date("2023-12-15T10:00:00Z"),
      type: "charge",
      amount: 29,
      currency: "USD",
      description: "Pro Plan - December 2023",
      status: "completed",
      invoiceId: "INV-2023-156",
      paymentMethod: "Visa •••• 4242",
    },
    {
      id: "txn-3",
      date: new Date("2023-11-20T10:00:00Z"),
      type: "refund",
      amount: -10,
      currency: "USD",
      description: "Partial refund - November 2023",
      status: "completed",
      invoiceId: "INV-2023-155",
    },
  ];

  const selectablePlans: SelectablePlan[] = [
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started",
      price: { monthly: 0, annual: 0 },
      currency: "USD",
      features: [
        { name: "1,000 API requests/month", included: true },
        { name: "5 GB storage", included: true },
        { name: "1 team member", included: true },
        { name: "Community support", included: true },
      ],
      ctaLabel: "Get started",
    },
    {
      id: "pro",
      name: "Pro",
      description: "For growing teams",
      price: { monthly: 29, annual: 290 },
      currency: "USD",
      isPopular: true,
      isCurrent: true,
      features: [
        { name: "100,000 API requests/month", included: true },
        { name: "100 GB storage", included: true },
        { name: "10 team members", included: true },
        { name: "Email support", included: true },
        { name: "Custom domains", included: true },
        { name: "Advanced analytics", included: true },
      ],
      ctaLabel: "Current plan",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations",
      price: { monthly: 99, annual: 990 },
      currency: "USD",
      features: [
        { name: "Unlimited API requests", included: true },
        { name: "1 TB storage", included: true },
        { name: "Unlimited team members", included: true },
        { name: "Priority support", included: true },
        { name: "SSO integration", included: true },
        { name: "Dedicated account manager", included: true },
      ],
      ctaLabel: "Contact sales",
    },
  ];

  const upgradeFeatures: UpgradeFeature[] = [
    { name: "Unlimited API requests" },
    { name: "1 TB storage" },
    { name: "Priority support" },
    { name: "SSO integration" },
    { name: "Dedicated account manager" },
  ];

  const exampleInvoiceDetails: InvoiceDetails | null = selectedInvoiceId
    ? {
        id: selectedInvoiceId,
        invoiceNumber: "INV-2024-001",
        date: new Date("2024-01-15T10:00:00Z"),
        dueDate: new Date("2024-02-15T10:00:00Z"),
        amount: 29,
        currency: "USD",
        status: "paid",
        description: "Pro Plan - January 2024",
        lineItems: [
          {
            description: "Pro Plan Subscription",
            quantity: 1,
            unitPrice: 29,
            subtotal: 29,
          },
        ],
        subtotal: 29,
        tax: {
          amount: 0,
          rate: 0,
          label: "No tax",
        },
        total: 29,
        paymentMethod: {
          type: "card",
          last4: "4242",
          brand: "visa",
        },
        billingAddress: {
          name: "John Doe",
          line1: "123 Main Street",
          line2: "Suite 100",
          city: "San Francisco",
          state: "CA",
          zip: "94105",
          country: "United States",
        },
        downloadUrl: "#",
      }
    : null;

  const examplePaymentFailure: PaymentFailureDetails = {
    invoiceId: "inv-1",
    invoiceNumber: "INV-2024-001",
    amount: 29,
    currency: "USD",
    failedAt: new Date("2024-01-15T10:00:00Z"),
    reason: "card_declined",
    reasonMessage:
      "Your card was declined by your bank. Please contact your bank or use a different payment method.",
    paymentMethod: {
      type: "card",
      last4: "4242",
      brand: "visa",
      expiresAt: new Date("2025-12-31"),
    },
    gracePeriodEndsAt: new Date("2024-02-15T10:00:00Z"),
    retryAttempts: 2,
    maxRetryAttempts: 3,
  };

  const exampleSubscriptionSettings: SubscriptionSettings = {
    id: "sub-1",
    planName: "Pro Plan",
    status: "active",
    billingPeriod: "monthly",
    currentBillingDate: new Date("2024-01-15T10:00:00Z"),
    nextBillingDate: new Date("2024-02-15T10:00:00Z"),
    autoRenew: true,
    prorationPreview: {
      newAmount: 99,
      creditAmount: 14.5,
      nextBillingDate: new Date("2024-02-15T10:00:00Z"),
    },
  };

  const handleViewInvoiceDetails = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId);
    setInvoiceDetailsOpen(true);
  };

  const handleApplyCoupon = async (code: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setAppliedCoupon({
      code,
      type: "percentage",
      value: 20,
      label: "20% off your first month",
      expiresAt: new Date("2024-12-31"),
      description: "Valid for new subscriptions only",
    });
  };

  const handleRemoveCoupon = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setAppliedCoupon(null);
  };

  const exampleUsageAlerts: UsageAlert[] = [
    {
      id: "alert-1",
      name: "API Requests - 80%",
      category: "API Requests",
      threshold: 80,
      thresholdType: "percentage",
      enabled: true,
      channels: ["email", "in_app"],
      lastTriggered: new Date("2024-01-10T10:00:00Z"),
      triggerCount: 2,
    },
    {
      id: "alert-2",
      name: "Storage - 90%",
      category: "Storage",
      threshold: 90,
      thresholdType: "percentage",
      enabled: true,
      channels: ["email", "sms", "in_app"],
      lastTriggered: undefined,
      triggerCount: 0,
    },
    {
      id: "alert-3",
      name: "Bandwidth - 50GB",
      category: "Bandwidth",
      threshold: 50,
      thresholdType: "absolute",
      enabled: false,
      channels: ["email"],
      lastTriggered: new Date("2024-01-05T10:00:00Z"),
      triggerCount: 1,
    },
  ];

  const exampleScheduledPayments: ScheduledPayment[] = [
    {
      id: "payment-1",
      date: new Date("2024-02-15T10:00:00Z"),
      amount: 29,
      currency: "USD",
      status: "upcoming",
      description: "Pro Plan - February 2024",
      paymentMethod: {
        type: "card",
        last4: "4242",
        brand: "visa",
      },
      invoiceId: "inv-1",
      invoiceNumber: "INV-2024-002",
    },
    {
      id: "payment-2",
      date: new Date("2024-01-15T10:00:00Z"),
      amount: 29,
      currency: "USD",
      status: "completed",
      description: "Pro Plan - January 2024",
      paymentMethod: {
        type: "card",
        last4: "4242",
        brand: "visa",
      },
      invoiceId: "inv-1",
      invoiceNumber: "INV-2024-001",
    },
    {
      id: "payment-3",
      date: new Date("2023-12-15T10:00:00Z"),
      amount: 29,
      currency: "USD",
      status: "completed",
      description: "Pro Plan - December 2023",
      paymentMethod: {
        type: "card",
        last4: "4242",
        brand: "visa",
      },
      invoiceId: "inv-2",
      invoiceNumber: "INV-2023-156",
    },
    {
      id: "payment-4",
      date: new Date("2023-11-20T10:00:00Z"),
      amount: 29,
      currency: "USD",
      status: "failed",
      description: "Pro Plan - November 2023",
      paymentMethod: {
        type: "card",
        last4: "4242",
        brand: "visa",
      },
      retryAttempts: 2,
      maxRetryAttempts: 3,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <BillingPricingTable
        billingPeriod={billingPeriod}
        currency="USD"
        mobileView="cards"
        onBillingPeriodChange={setBillingPeriod}
        onPlanSelect={(planId) => console.log("Plan selected:", planId)}
        plans={examplePlans}
        showAnnualSavings={true}
      />
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <BillingSubscriptionCard
            autoRenew={true}
            nextBillingDate={new Date("2024-02-15T10:00:00Z")}
            onCancel={() => console.log("Cancel clicked")}
            onDowngrade={() => console.log("Downgrade clicked")}
            onManage={() => console.log("Manage clicked")}
            onUpgrade={() => console.log("Upgrade clicked")}
            plan={{
              id: "pro",
              name: "Pro Plan",
              price: 29,
              currency: "USD",
              billingPeriod: "monthly",
            }}
            status="active"
            usage={[
              {
                label: "API requests",
                used: 45_000,
                limit: 100_000,
                unit: "requests",
                warningThreshold: 80,
              },
              {
                label: "Storage",
                used: 35,
                limit: 100,
                unit: "GB",
                warningThreshold: 80,
              },
            ]}
          />
          <BillingUsageBilling
            categories={usageCategories}
            currentPeriod={{
              start: new Date("2024-01-01T00:00:00Z"),
              end: new Date("2024-01-31T23:59:59Z"),
              usage: 45_000,
              limit: 100_000,
            }}
            dataPoints={usageDataPoints}
            onExport={() => console.log("Export clicked")}
            previousPeriod={{
              usage: 38_000,
              limit: 100_000,
            }}
            showBreakdown={true}
            showChart={true}
            unit="requests"
            warningThreshold={80}
          />
          <BillingPaymentMethod
            allowMultiple={true}
            onAdd={() => console.log("Add payment method")}
            onDelete={(methodId) => console.log("Delete:", methodId)}
            onEdit={(methodId) => console.log("Edit:", methodId)}
            onSetDefault={(methodId) => console.log("Set default:", methodId)}
            paymentMethods={examplePaymentMethods}
          />
          <BillingPaymentForm
            onCancel={() => console.log("Payment form cancelled")}
            onSubmit={(data) => console.log("Payment form submitted:", data)}
            showBillingAddress={true}
            showSaveOption={true}
            showSetDefault={true}
          />
          <BillingSubscriptionSettings
            currency="USD"
            onCancel={async (feedback) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              console.log("Canceled with feedback:", feedback);
            }}
            onChangeBillingPeriod={async (period) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              console.log("Changed to:", period);
            }}
            onPause={async (resumeDate) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              console.log("Paused until:", resumeDate);
            }}
            onReactivate={async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              console.log("Reactivated");
            }}
            onResume={async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              console.log("Resumed");
            }}
            onToggleAutoRenew={async (enabled) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              console.log("Auto-renew toggled:", enabled);
            }}
            subscription={exampleSubscriptionSettings}
          />
          <BillingUsageAlerts
            alerts={exampleUsageAlerts}
            onCreate={() => console.log("Create alert")}
            onDelete={async (alertId) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              console.log("Delete alert:", alertId);
            }}
            onEdit={(alertId) => console.log("Edit alert:", alertId)}
            onToggle={async (alertId, enabled) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              console.log("Toggle alert:", alertId, enabled);
            }}
          />
        </div>

        <div className="flex flex-col gap-8">
          <BillingInvoiceList
            currency="USD"
            invoices={exampleInvoices}
            onDownload={(invoiceId) => console.log("Download:", invoiceId)}
            onViewDetails={handleViewInvoiceDetails}
            showFilters={true}
            showSearch={true}
          />
          <BillingInvoiceDetails
            currency="USD"
            invoice={exampleInvoiceDetails}
            onDownload={(invoiceId) => console.log("Download:", invoiceId)}
            onOpenChange={setInvoiceDetailsOpen}
            onPrint={(invoiceId) => console.log("Print:", invoiceId)}
            open={invoiceDetailsOpen}
          />
          <BillingBillingHistory
            currency="USD"
            onExport={() => console.log("Export clicked")}
            onViewDetails={(txnId) => console.log("View transaction:", txnId)}
            showFilters={true}
            showSearch={true}
            showSummary={true}
            transactions={exampleTransactions}
          />
          <BillingPlanSelector
            billingPeriod={billingPeriod}
            currency="USD"
            layout="grid"
            onBillingPeriodChange={setBillingPeriod}
            onPlanSelect={(planId) => console.log("Plan selected:", planId)}
            plans={selectablePlans}
            selectedPlanId="pro"
            showAnnualSavings={true}
          />
          <BillingUpgradePrompt
            currentPlan={{ id: "pro", name: "Pro" }}
            features={upgradeFeatures}
            limitedTime={true}
            onDismiss={() => console.log("Dismiss clicked")}
            onLearnMore={() => console.log("Learn more clicked")}
            onUpgrade={() => console.log("Upgrade clicked")}
            reason="usage_limit"
            recommendedPlan={{
              id: "enterprise",
              name: "Enterprise",
              price: 99,
              currency: "USD",
              billingPeriod: "monthly",
            }}
            savingsAmount={58}
            showSavings={true}
          />
          <BillingCouponCode
            appliedCoupon={appliedCoupon}
            currency="USD"
            onApply={handleApplyCoupon}
            onRemove={handleRemoveCoupon}
          />
          <BillingPaymentFailed
            currency="USD"
            failure={examplePaymentFailure}
            onContactSupport={() => console.log("Contact support")}
            onRetry={async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              console.log("Payment retried");
            }}
            onUpdatePaymentMethod={() => console.log("Update payment method")}
          />
          <BillingPaymentSchedule
            currency="USD"
            onCancel={async (paymentId) => {
              await new Promise((resolve) => setTimeout(resolve, 500));
              console.log("Cancel payment:", paymentId);
            }}
            onRetry={async (paymentId) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              console.log("Retry payment:", paymentId);
            }}
            onViewInvoice={(invoiceId) => {
              setSelectedInvoiceId(invoiceId);
              setInvoiceDetailsOpen(true);
            }}
            payments={exampleScheduledPayments}
          />
        </div>
      </div>
    </div>
  );
}

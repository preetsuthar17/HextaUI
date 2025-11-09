export const blockSnippets = {
  "ai-chat-history": {
    usageImports: `import AIChatHistory from "@/components/blocks/ai/ai-chat-history";`,
    usageCode: `<AIChatHistory
  conversations={[
    {
      id: "conv-1",
      title: "React Component Patterns",
      lastMessage: "How do I create reusable components?",
      lastMessageAt: new Date(),
      messageCount: 12,
      isActive: true,
    },
  ]}
  activeConversationId="conv-1"
  onSelect={(id) => {
    /* select conversation logic */
  }}
  onNewConversation={() => {
    /* create new conversation */
  }}
  onRename={async (id, newName) => {
    /* rename logic */
  }}
  onDelete={async (id) => {
    /* delete logic */
  }}
/>`,
  },
  "ai-citations": {
    usageImports: `import AICitations from "@/components/blocks/ai/ai-citations";`,
    usageCode: `<AICitations
  citations={[
    {
      id: "citation-1",
      number: 1,
      text: "React component patterns",
      sources: [
        {
          id: "source-1",
          title: "React Component Patterns - Best Practices",
          url: "https://react.dev/learn/thinking-in-react",
          domain: "react.dev",
          snippet: "Components let you split the UI into independent, reusable pieces.",
          author: "React Team",
          publishedAt: new Date("2024-01-15"),
          type: "web",
        },
      ],
    },
  ]}
  onSourceClick={(sourceId) => {
    /* open citation source */
  }}
/>`,
  },
  "ai-conversation": {
    usageImports: `import AIConversation from "@/components/blocks/ai/ai-conversation";`,
    usageCode: `<AIConversation
  messages={[
    {
      id: "1",
      role: "user",
      content: "What is HextaUI?",
      timestamp: new Date(),
    },
    {
      id: "2",
      role: "assistant",
      content: "HextaUI is a modern UI component library for Next.js applications.",
      timestamp: new Date(),
    },
  ]}
  isStreaming={false}
  isThinking={false}
  onEdit={(id) => {
    /* edit message by id */
  }}
  onRegenerate={(id) => {
    /* regenerate reply for a given id */
  }}
/>`,
  },
  "ai-error-handler": {
    usageImports: `import AIErrorHandler from "@/components/blocks/ai/ai-error-handler";`,
    usageCode: `<AIErrorHandler
  error={{
    code: "network_error",
    message: "Network unreachable. Please check your connection and retry.",
  }}
  onRetry={async () => {
    /* retry logic example */
  }}
  onDismiss={() => {
    /* dismiss error panel */
  }}
  onContactSupport={() => {
    /* contact support logic */
  }}
/>`,
  },
  "ai-file-upload": {
    usageImports: `import AIFileUpload from "@/components/blocks/ai/ai-file-upload";`,
    usageCode: `<AIFileUpload
  onUpload={(files) => {
    /* handle file upload */
  }}
  maxSize={10 * 1024 * 1024}
  acceptedTypes={["pdf", "txt", "docx"]}
/>`,
  },
  "ai-message": {
    usageImports: `import AIMessage from "@/components/blocks/ai/ai-message";`,
    usageCode: `<AIMessage
  content="# Welcome to HextaUI

HextaUI is a modern UI component library for Next.js applications.

## Features

- **Copy & Paste Components**: Just copy and use instantly!
- **Fully Customizable**: Tailwind CSS + extensive props
- **Type-Safe**: Full TypeScript support"
  isStreaming={false}
  onEdit={() => {
    /* edit message */
  }}
  onRegenerate={() => {
    /* regenerate message */
  }}
/>`,
  },
  "ai-model-selector": {
    usageImports: `import AIModelSelector from "@/components/blocks/ai/ai-model-selector";`,
    usageCode: `<AIModelSelector
  models={[
    { id: "gpt-4o", name: "GPT-4o", provider: "openai" },
    { id: "gpt-4", name: "GPT-4", provider: "openai" },
  ]}
  selectedModelId="gpt-4o"
  onSelect={(id) => {
    /* select model */
  }}
/>`,
  },
  "ai-prompt-input": {
    usageImports: `import AIPromptInput from "@/components/blocks/ai/ai-prompt-input";`,
    usageCode: `<AIPromptInput
  onSend={(text) => {
    /* send prompt logic with value: text */
  }}
  placeholder="Type your prompt here (e.g. Summarize this article)..."
  disabled={false}
  autoFocus={true}
/>`,
  },
  "ai-prompt-templates": {
    usageImports: `import AIPromptTemplates from "@/components/blocks/ai/ai-prompt-templates";`,
    usageCode: `<AIPromptTemplates
  templates={[
    {
      id: "template-1",
      name: "Blog Post Writer",
      description: "Generate a comprehensive blog post on any topic",
      category: "Writing",
      prompt: "Write a detailed blog post about {topic}.",
      variables: [
        {
          name: "topic",
          label: "Topic",
          placeholder: "e.g., React best practices",
          required: true,
        },
      ],
      isPopular: true,
      usageCount: 342,
      tags: ["blog", "writing"],
    },
  ]}
  categories={["All", "Writing", "Code", "Analysis"]}
  onSelect={(templateId) => {
    /* select template by id */
  }}
  onFavorite={async (id, fav) => {
    /* set/unset favorite */
  }}
  onCreate={(tpl) => {
    /* create new template */
  }}
/>`,
  },
  "ai-settings-panel": {
    usageImports: `import AISettingsPanel from "@/components/blocks/ai/ai-settings-panel";`,
    usageCode: `<AISettingsPanel
  settings={{
    temperature: 0.85,
    maxTokens: 4000,
    topP: 0.95,
    topK: 120,
    frequencyPenalty: 0.25,
    presencePenalty: 0.15,
    systemPrompt: "You are a concise expert assistant.",
    model: "gpt-4o",
  }}
  onSettingsChange={(settings) => {
    /* update settings */
  }}
  onSave={async () => {
    /* save settings */
  }}
  onReset={() => {
    /* reset to defaults */
  }}
  availableModels={["gpt-4o", "gpt-4", "gpt-3.5-turbo"]}
/>`,
  },
  "ai-streaming-response": {
    usageImports: `import AIStreamingResponse from "@/components/blocks/ai/ai-streaming-response";`,
    usageCode: `<AIStreamingResponse
  content="# Streaming Response

This is a demonstration of real-time token-by-token streaming."
  autoStart={true}
  onComplete={() => {
    /* streaming completed */
  }}
/>`,
  },
  "ai-suggested-prompts": {
    usageImports: `import AISuggestedPrompts from "@/components/blocks/ai/ai-suggested-prompts";`,
    usageCode: `<AISuggestedPrompts
  prompts={[
    {
      id: "prompt-1",
      title: "Write a blog post",
      prompt: "Write a comprehensive blog post about [topic]",
      category: "Writing",
      description: "Generate a well-structured blog post",
      isPopular: true,
      usageCount: 245,
    },
  ]}
  onSelect={(promptId) => {
    /* choose prompt */
  }}
  showSearch={true}
  showCategories={true}
/>`,
  },
  "ai-thinking": {
    usageImports: `import AIThinking from "@/components/blocks/ai/ai-thinking";`,
    usageCode: `<AIThinking
  spinner={true}
  message="Let me think of the best answer..."
/>`,
  },
  "ai-usage-quota": {
    usageImports: `import AIUsageQuota from "@/components/blocks/ai/ai-usage-quota";`,
    usageCode: `<AIUsageQuota
  tokenUsage={{
    input: 225_000,
    output: 178_700,
    total: 403_700,
    dailyUsageHistory: [],
  }}
  rateLimit={{
    remaining: 7,
    limit: 100,
    resetAt: new Date(),
    window: "hour",
  }}
  quota={{
    used: 9_590_000,
    limit: 10_000_000,
    resetAt: new Date(),
    period: "month",
  }}
  showUpgradePrompt={true}
  upgradeThreshold={80}
  onUpgrade={() => {
    /* upgrade logic */
  }}
/>`,
  },
  "auth-account-delete": {
    usageImports: `import AuthAccountDelete from "@/components/blocks/auth/auth-account-delete";`,
    usageCode: `<AuthAccountDelete
  onDelete={async () => {
    /* delete user account */
  }}
  confirmText="DELETE"
  info="This action cannot be undone. All your data will be erased."
/>`,
  },
  "auth-change-password": {
    usageImports: `import AuthChangePassword from "@/components/blocks/auth/auth-change-password";`,
    usageCode: `<AuthChangePassword
  onSubmit={async ({ current, next, confirm }) => {
    /* change password */
  }}
/>`,
  },
  "auth-email-change": {
    usageImports: `import AuthEmailChange from "@/components/blocks/auth/auth-email-change";`,
    usageCode: `<AuthEmailChange
  currentEmail="user@example.com"
  onSubmit={async ({ newEmail }) => {
    /* change email */
  }}
/>`,
  },
  "auth-forgot-password": {
    usageImports: `import AuthForgotPassword from "@/components/blocks/auth/auth-forgot-password";`,
    usageCode: `<AuthForgotPassword
  onSubmit={async ({ email }) => {
    /* send reset link */
  }}
  onBackToLogin={() => {
    /* nav back to login */
  }}
  emailPlaceholder="Enter your email address"
/>`,
  },
  "auth-login-form": {
    usageImports: `import AuthLoginForm from "@/components/blocks/auth/auth-login-form";`,
    usageCode: `<AuthLoginForm
  onSubmit={async ({ email, password, remember }) => {
    /* demo login */
  }}
  onSocialLogin={(provider) => {
    /* social login */
  }}
  showRememberMe={true}
  showSocialLogin={true}
  emailPlaceholder="your@email.com"
/>`,
  },
  "auth-magic-link": {
    usageImports: `import AuthMagicLink from "@/components/blocks/auth/auth-magic-link";`,
    usageCode: `<AuthMagicLink
  onSubmit={async ({ email }) => {
    /* send magic link */
  }}
  onResend={() => {
    /* resend magic link */
  }}
  status="pending"
  infoText="Check your inbox for a sign-in link."
/>`,
  },
  "auth-otp-verify": {
    usageImports: `import AuthOTPVerify from "@/components/blocks/auth/auth-otp-verify";`,
    usageCode: `<AuthOTPVerify
  deliveryMethod="email"
  deliveryAddress="user@example.com"
  onSubmit={async ({ code }) => {
    /* verify otp */
  }}
  onResend={() => {
    /* resend code */
  }}
/>`,
  },
  "auth-phone-verify": {
    usageImports: `import AuthPhoneVerify from "@/components/blocks/auth/auth-phone-verify";`,
    usageCode: `<AuthPhoneVerify
  phoneNumber="+1234567890"
  onSubmit={async ({ code }) => {
    /* verify sms */
  }}
  onResend={() => {
    /* resend sms */
  }}
  status="pending"
/>`,
  },
  "auth-recovery-codes": {
    usageImports: `import AuthRecoveryCodes from "@/components/blocks/auth/auth-recovery-codes";`,
    usageCode: `<AuthRecoveryCodes
  codes={["173839", "572048", "208453", "983242"]}
  onRegenerate={async () => {
    /* regenerate demo codes */
  }}
  onDownload={() => {
    /* download demo codes */
  }}
  showWarning={true}
/>`,
  },
  "auth-reset-password": {
    usageImports: `import AuthResetPassword from "@/components/blocks/auth/auth-reset-password";`,
    usageCode: `<AuthResetPassword
  onSubmit={async ({ password, confirm }) => {
    /* reset password logic */
  }}
  token="example-token-sent-via-email"
  showPasswordStrength={true}
/>`,
  },
  "auth-session-manager": {
    usageImports: `import AuthSessionManager from "@/components/blocks/auth/auth-session-manager";`,
    usageCode: `<AuthSessionManager
  sessions={[
    {
      id: "session-1",
      deviceType: "desktop",
      deviceName: "MacBook Pro",
      browser: "Chrome",
      location: "San Francisco, CA",
      lastActive: new Date(),
      isCurrent: true,
    },
  ]}
  onRevoke={(id) => {
    /* revoke single session */
  }}
  onRevokeAll={() => {
    /* revoke all sessions */
  }}
/>`,
  },
  "auth-signup-form": {
    usageImports: `import AuthSignupForm from "@/components/blocks/auth/auth-signup-form";`,
    usageCode: `<AuthSignupForm
  onSubmit={async ({ email, password, confirm }) => {
    /* signup logic */
  }}
  onSocialLogin={(provider) => {
    /* signup with provider */
  }}
  showSocialLogin={true}
/>`,
  },
  "auth-social-accounts": {
    usageImports: `import AuthSocialAccounts from "@/components/blocks/auth/auth-social-accounts";`,
    usageCode: `<AuthSocialAccounts
  connectedAccounts={[
    {
      id: "acct-google",
      provider: "google",
      email: "john.doe@gmail.com",
    },
  ]}
  availableProviders={["google", "github", "twitter"]}
  onConnect={async (prov) => {
    /* connect social provider */
  }}
  onDisconnect={async (prov) => {
    /* disconnect provider */
  }}
/>`,
  },
  "auth-two-factor-setup": {
    usageImports: `import AuthTwoFactorSetup from "@/components/blocks/auth/auth-two-factor-setup";`,
    usageCode: `<AuthTwoFactorSetup
  qrUrl="/static/2fa-qr.png"
  secret="JFVHK324HKJS"
  onComplete={async ({ code }) => {
    /* complete 2fa setup */
  }}
/>`,
  },
  "auth-two-factor-verify": {
    usageImports: `import AuthTwoFactorVerify from "@/components/blocks/auth/auth-two-factor-verify";`,
    usageCode: `<AuthTwoFactorVerify
  onSubmit={async ({ code }) => {
    /* verify two-factor code */
  }}
/>`,
  },
  "auth-verify-email": {
    usageImports: `import AuthVerifyEmail from "@/components/blocks/auth/auth-verify-email";`,
    usageCode: `<AuthVerifyEmail
  email="user@example.com"
  status="pending"
  onResend={async () => {
    /* resend email */
  }}
  onVerify={() => {
    /* verify email link */
  }}
  infoText="Verification link sent to your email."
/>`,
  },
  "billing-billing-history": {
    usageImports: `import BillingBillingHistory from "@/components/blocks/billing/billing-billing-history";`,
    usageCode: `<BillingBillingHistory
  transactions={[
    {
      id: "txn-1",
      date: new Date(),
      amount: 29,
      type: "payment",
      status: "success",
      description: "Subscription - Pro Plan",
    },
  ]}
  onViewDetails={(txnId) => {
    /* view transaction */
  }}
/>`,
  },
  "billing-coupon-code": {
    usageImports: `import BillingCouponCode from "@/components/blocks/billing/billing-coupon-code";`,
    usageCode: `<BillingCouponCode
  onApply={async (code) => {
    /* apply coupon code */
  }}
  placeholder="Enter coupon code..."
  discountInfo="Save 20% with WELCOME20"
/>`,
  },
  "billing-invoice-details": {
    usageImports: `import BillingInvoiceDetails from "@/components/blocks/billing/billing-invoice-details";`,
    usageCode: `<BillingInvoiceDetails
  invoice={{
    id: "inv-1",
    invoiceNumber: "INV-2024-001",
    date: new Date(),
    dueDate: new Date(),
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
    tax: { amount: 0, rate: 0, label: "No tax" },
    total: 29,
    paymentMethod: { type: "card", last4: "4242", brand: "visa" },
    billingAddress: {
      name: "John Doe",
      line1: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      country: "United States",
    },
  }}
  open={true}
  onOpenChange={(open) => {
    /* handle open/close */
  }}
  onDownload={() => {
    /* download invoice */
  }}
  currency="USD"
/>`,
  },
  "billing-invoice-list": {
    usageImports: `import BillingInvoiceList from "@/components/blocks/billing/billing-invoice-list";`,
    usageCode: `<BillingInvoiceList
  invoices={[
    {
      id: "inv-1",
      invoiceNumber: "INV-2024-001",
      date: new Date(),
      amount: 29,
      currency: "USD",
      status: "paid",
    },
  ]}
  onViewInvoice={(id) => {
    /* view invoice details */
  }}
  onDownloadInvoice={(id) => {
    /* download invoice */
  }}
/>`,
  },
  "billing-payment-failed": {
    usageImports: `import BillingPaymentFailed from "@/components/blocks/billing/billing-payment-failed";`,
    usageCode: `<BillingPaymentFailed
  failure={{
    invoiceId: "inv-1",
    invoiceNumber: "INV-2024-001",
    amount: 29,
    currency: "USD",
    failedAt: new Date(),
    reason: "insufficient_funds",
    reasonMessage: "Your payment method was declined due to insufficient funds.",
    paymentMethod: { type: "card", last4: "4242", brand: "visa" },
    retryAttempts: 1,
    maxRetryAttempts: 3,
  }}
  onRetry={async () => {
    /* retry payment */
  }}
  onUpdatePaymentMethod={() => {
    /* update method */
  }}
  onContactSupport={() => {
    /* contact support */
  }}
  currency="USD"
/>`,
  },
  "billing-payment-form": {
    usageImports: `import BillingPaymentForm from "@/components/blocks/billing/billing-payment-form";`,
    usageCode: `<BillingPaymentForm
  onSubmit={async ({ cardNumber, exp, cvc }) => {
    /* submit payment */
  }}
  onCancel={() => {
    /* cancel payment form */
  }}
  supportedBrands={["visa", "mastercard", "amex"]}
/>`,
  },
  "billing-payment-method": {
    usageImports: `import BillingPaymentMethod from "@/components/blocks/billing/billing-payment-method";`,
    usageCode: `<BillingPaymentMethod
  paymentMethods={[
    {
      id: "pm-1",
      type: "card",
      brand: "visa",
      last4: "4242",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
  ]}
  onAdd={() => {
    /* add payment method */
  }}
  onSetDefault={(pmId) => {
    /* set default method */
  }}
  onRemove={(pmId) => {
    /* remove method */
  }}
/>`,
  },
  "billing-payment-schedule": {
    usageImports: `import BillingPaymentSchedule from "@/components/blocks/billing/billing-payment-schedule";`,
    usageCode: `<BillingPaymentSchedule
  payments={[
    {
      id: "sch-1",
      date: new Date(),
      amount: 29,
      currency: "USD",
      status: "upcoming",
      description: "Pro Plan - February 2024",
      paymentMethod: { type: "card", last4: "4242", brand: "visa" },
      invoiceId: "inv-2",
      invoiceNumber: "INV-2024-002",
    },
  ]}
  onViewInvoice={(invoiceId) => {
    /* view invoice */
  }}
  onRetry={async (paymentId) => {
    /* retry payment */
  }}
  currency="USD"
/>`,
  },
  "billing-plan-selector": {
    usageImports: `import BillingPlanSelector from "@/components/blocks/billing/billing-plan-selector";`,
    usageCode: `<BillingPlanSelector
  plans={[
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started",
      price: { monthly: 0, annual: 0 },
      currency: "USD",
      features: [
        { name: "1,000 API requests/month", included: true },
        { name: "5 GB storage", included: true },
      ],
      isCurrent: true,
      ctaLabel: "Current plan",
    },
  ]}
  selectedPlanId="free"
  billingPeriod="monthly"
  onBillingPeriodChange={(period) => {
    /* change billing period */
  }}
  onPlanSelect={(planId) => {
    /* select plan by id */
  }}
/>`,
  },
  "billing-pricing-table": {
    usageImports: `import BillingPricingTable from "@/components/blocks/billing/billing-pricing-table";`,
    usageCode: `<BillingPricingTable
  plans={[
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started",
      price: { monthly: 0, annual: 0 },
      currency: "USD",
      features: [
        {
          name: "Community support",
          values: { free: true, pro: true, enterprise: true },
        },
      ],
      isPopular: false,
    },
  ]}
  billingPeriod="monthly"
  onBillingPeriodChange={(period) => {
    /* change billing period */
  }}
  onSelectPlan={(planId) => {
    /* select plan */
  }}
/>`,
  },
  "billing-subscription-card": {
    usageImports: `import BillingSubscriptionCard from "@/components/blocks/billing/billing-subscription-card";`,
    usageCode: `<BillingSubscriptionCard
  plan={{
    id: "pro",
    name: "Pro",
    price: 29,
    currency: "USD",
    billingPeriod: "monthly",
  }}
  usage={[
    {
      label: "API Requests",
      used: 85_000,
      limit: 100_000,
      unit: "requests",
      warningThreshold: 80,
    },
  ]}
  nextBillingDate={new Date()}
  autoRenew={true}
  status="active"
  onUpgrade={() => {
    /* upgrade plan */
  }}
  onManage={() => {
    /* manage subscription */
  }}
/>`,
  },
  "billing-subscription-settings": {
    usageImports: `import BillingSubscriptionSettings from "@/components/blocks/billing/billing-subscription-settings";`,
    usageCode: `<BillingSubscriptionSettings
  subscription={{
    id: "sub-1",
    planName: "Pro Plan",
    status: "active",
    billingPeriod: "monthly",
    currentBillingDate: new Date(),
    nextBillingDate: new Date(),
    autoRenew: true,
  }}
  onPause={async (resumeDate) => {
    /* pause subscription */
  }}
  onCancel={async (feedback) => {
    /* cancel subscription */
  }}
  currency="USD"
/>`,
  },
  "billing-upgrade-prompt": {
    usageImports: `import BillingUpgradePrompt from "@/components/blocks/billing/billing-upgrade-prompt";`,
    usageCode: `<BillingUpgradePrompt
  currentPlan={{ id: "free", name: "Free" }}
  recommendedPlan={{
    id: "pro",
    name: "Pro",
    price: 29,
    currency: "USD",
    billingPeriod: "monthly",
  }}
  features={[
    { name: "Unlimited API requests" },
    { name: "1 TB storage" },
  ]}
  reason="recommended"
  onUpgrade={() => {
    /* upgrade to recommended plan */
  }}
/>`,
  },
  "billing-usage-alerts": {
    usageImports: `import BillingUsageAlerts from "@/components/blocks/billing/billing-usage-alerts";`,
    usageCode: `<BillingUsageAlerts
  alerts={[
    {
      id: "alert-1",
      name: "API Usage Alert",
      category: "API Requests",
      threshold: 80,
      thresholdType: "percentage",
      enabled: true,
      channels: ["email", "in_app"],
      lastTriggered: new Date(),
      triggerCount: 3,
    },
  ]}
  onToggle={async (alertId, enabled) => {
    /* toggle alert */
  }}
  onEdit={(alertId) => {
    /* edit alert */
  }}
  onCreate={() => {
    /* create new alert */
  }}
/>`,
  },
  "billing-usage-billing": {
    usageImports: `import BillingUsageBilling from "@/components/blocks/billing/billing-usage-billing";`,
    usageCode: `<BillingUsageBilling
  currentPeriod={{
    start: new Date(),
    end: new Date(),
    usage: 8_500_000,
    limit: 10_000_000,
  }}
  previousPeriod={{
    usage: 7_200_000,
    limit: 10_000_000,
  }}
  dataPoints={[]}
  categories={[]}
  unit="requests"
  onDateRangeChange={(start, end) => {
    /* change date range */
  }}
/>`,
  },
  "settings-account": {
    usageImports: `import SettingsAccount from "@/components/blocks/settings/settings-account";`,
    usageCode: `<SettingsAccount
  account={{
    type: "pro",
    status: "active",
    memberCount: 8,
    memberLimit: 10,
    storageUsed: 15 * 1024 * 1024 * 1024,
    storageLimit: 100 * 1024 * 1024 * 1024,
  }}
  onUpgrade={async () => {
    /* upgrade account */
  }}
  onDelete={async () => {
    /* delete account */
  }}
  onTransfer={async () => {
    /* transfer account */
  }}
/>`,
  },
  "settings-activity-log": {
    usageImports: `import SettingsActivityLog from "@/components/blocks/settings/settings-activity-log";`,
    usageCode: `<SettingsActivityLog
  entries={[
    {
      id: "log-1",
      action: "login",
      type: "login",
      description: "User logged in",
      ipAddress: "192.168.1.1",
      location: "San Francisco, CA",
      device: "MacBook Pro",
      timestamp: new Date(),
      status: "success",
    },
  ]}
  onExport={async (filters) => {
    /* export activity log */
  }}
/>`,
  },
  "settings-advanced": {
    usageImports: `import SettingsAdvanced from "@/components/blocks/settings/settings-advanced";`,
    usageCode: `<SettingsAdvanced
  featureFlags={[
    { id: "ff-1", name: "Experimental UI", enabled: true },
    { id: "ff-2", name: "Debug Logging", enabled: false },
  ]}
  onToggleFlag={(flagId, enabled) => {
    /* enable flag */
  }}
/>`,
  },
  "settings-api-keys": {
    usageImports: `import SettingsAPIKeys from "@/components/blocks/settings/settings-api-keys";`,
    usageCode: `<SettingsAPIKeys
  apiKeys={[
    {
      id: "key-1",
      name: "Production API Key",
      key: "sk_live_1234567890abcdef",
      createdAt: new Date(),
      lastUsed: new Date(),
      scopes: ["read", "write"],
      usageCount: 15_420,
    },
  ]}
  onCreate={async (data) => {
    /* create new key */
  }}
  onRevoke={async (keyId) => {
    /* revoke key */
  }}
/>`,
  },
  "settings-export-data": {
    usageImports: `import SettingsExportData from "@/components/blocks/settings/settings-export-data";`,
    usageCode: `<SettingsExportData
  exportHistory={[
    {
      id: "export-1",
      format: "json",
      scope: ["profile", "activity"],
      status: "completed",
      createdAt: new Date(),
      completedAt: new Date(),
      downloadUrl: "#",
      expiresAt: new Date(),
    },
  ]}
  onExport={async (data) => {
    /* start export */
  }}
  onDownload={async (jobId) => {
    /* download export */
  }}
/>`,
  },
  "settings-backup": {
    usageImports: `import SettingsBackup from "@/components/blocks/settings/settings-backup";`,
    usageCode: `<SettingsBackup
  backups={[
    {
      id: "backup-1",
      name: "Automatic Backup - Daily",
      type: "automatic",
      status: "completed",
      size: 500 * 1024 * 1024,
      createdAt: new Date(),
      completedAt: new Date(),
      location: "cloud",
      retentionDays: 30,
    },
  ]}
  autoBackupEnabled={true}
  autoBackupSchedule="daily"
  retentionDays={30}
  onCreateBackup={async () => {
    /* create backup */
  }}
  onRestore={async (backupId) => {
    /* restore backup */
  }}
/>`,
  },
  "settings-domains": {
    usageImports: `import SettingsDomains from "@/components/blocks/settings/settings-domains";`,
    usageCode: `<SettingsDomains
  domains={[
    {
      id: "domain-1",
      domain: "example.com",
      status: "verified",
      sslEnabled: true,
      verifiedAt: new Date(),
    },
  ]}
  onCreate={async (domain) => {
    /* create domain */
  }}
  onDelete={async (id) => {
    /* delete domain */
  }}
  onVerify={async (id) => {
    /* verify domain */
  }}
/>`,
  },
  "settings-import-data": {
    usageImports: `import SettingsImportData from "@/components/blocks/settings/settings-import-data";`,
    usageCode: `<SettingsImportData
  importHistory={[
    {
      id: "import-1",
      filename: "user-data-backup.json",
      format: "json",
      status: "completed",
      createdAt: new Date(),
      completedAt: new Date(),
      recordsImported: 1250,
      recordsSkipped: 12,
      recordsFailed: 3,
      conflictResolution: "merge",
    },
  ]}
  onUpload={async (file) => {
    /* upload and preview file */
  }}
  onImport={async (data) => {
    /* import data */
  }}
/>`,
  },
  "settings-integrations": {
    usageImports: `import SettingsIntegrations from "@/components/blocks/settings/settings-integrations";`,
    usageCode: `<SettingsIntegrations
  integrations={[
    {
      id: "github",
      name: "GitHub",
      description: "Connect your GitHub account to sync repositories",
      status: "connected",
      lastSynced: new Date(),
      scopes: ["repo", "read:user"],
    },
  ]}
  onConnect={async (integrationId) => {
    /* connect integration */
  }}
  onDisconnect={async (integrationId) => {
    /* disconnect integration */
  }}
/>`,
  },
  "settings-notifications": {
    usageImports: `import SettingsNotifications from "@/components/blocks/settings/settings-notifications";`,
    usageCode: `<SettingsNotifications
  preferences={{
    categories: [
      {
        id: "mentions",
        name: "Mentions",
        description: "When someone mentions you",
        channels: { email: true, push: true, inApp: true, sms: false },
        frequency: "realtime",
      },
    ],
    quietHoursEnabled: true,
    quietHoursStart: "22:00",
    quietHoursEnd: "08:00",
  }}
  onSave={async (data) => {
    /* save notification preferences */
  }}
/>`,
  },
  "settings-preferences": {
    usageImports: `import SettingsPreferences from "@/components/blocks/settings/settings-preferences";`,
    usageCode: `<SettingsPreferences
  preferences={{
    theme: "dark",
    language: "en",
    timezone: "America/Los_Angeles",
    codeFontSize: 16,
  }}
  onSave={async (prefs) => {
    /* save preferences */
  }}
/>`,
  },
  "settings-privacy": {
    usageImports: `import SettingsPrivacy from "@/components/blocks/settings/settings-privacy";`,
    usageCode: `<SettingsPrivacy
  privacySettings={{
    profileVisibility: "private",
    dataSharing: false,
    require2FA: true,
  }}
  onSave={async (settings) => {
    /* save privacy */
  }}
/>`,
  },
  "settings-profile": {
    usageImports: `import SettingsProfile from "@/components/blocks/settings/settings-profile";`,
    usageCode: `<SettingsProfile
  profile={{
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Design Engineer. Open Source Advocate. Loves UI/UX.",
    location: "San Francisco, CA",
    website: "https://example.com",
    avatarUrl: "/static/avatar-john.png",
    social: { twitter: "johndoe", github: "johnnydoe" },
  }}
  onSave={async (data) => {
    /* save profile */
  }}
/>`,
  },
  "settings-security": {
    usageImports: `import SettingsSecurity from "@/components/blocks/settings/settings-security";`,
    usageCode: `<SettingsSecurity
  sessions={[
    {
      id: "sec-session-1",
      ip: "192.168.1.1",
      device: "MacBook Pro",
      browser: "Chrome",
      active: true,
      lastActive: new Date(),
    },
  ]}
  events={[]}
  onRevokeSession={(id) => {
    /* revoke session */
  }}
  onRevokeAllSessions={() => {
    /* revoke all */
  }}
/>`,
  },
  "settings-sso": {
    usageImports: `import SettingsSSO from "@/components/blocks/settings/settings-sso";`,
    usageCode: `<SettingsSSO
  enabled={true}
  providers={[
    {
      id: "sso-1",
      name: "Okta",
      type: "saml",
      enabled: true,
      status: "active",
      metadataUrl: "https://example.okta.com/saml/metadata",
      entityId: "https://example.okta.com/app/example",
      ssoUrl: "https://example.okta.com/app/example/sso/saml",
      lastTested: new Date(),
      userCount: 45,
    },
  ]}
  onCreate={async (data) => {
    /* create SSO provider */
  }}
  onUpdate={async (id, data) => {
    /* update SSO provider */
  }}
  onTest={async (id) => {
    /* test SSO connection */
  }}
/>`,
  },
  "settings-storage": {
    usageImports: `import SettingsStorage from "@/components/blocks/settings/settings-storage";`,
    usageCode: `<SettingsStorage
  totalUsed={7 * 1024 * 1024 * 1024}
  totalLimit={100 * 1024 * 1024 * 1024}
  categories={[
    {
      id: "files",
      name: "Files",
      icon: FileText,
      used: 5 * 1024 * 1024 * 1024,
      total: 10 * 1024 * 1024 * 1024,
      color: "bg-blue-500/10",
    },
  ]}
  onCleanup={async (categoryId) => {
    /* start cleanup */
  }}
/>`,
  },
  "settings-team-members": {
    usageImports: `import SettingsTeamMembers from "@/components/blocks/settings/settings-team-members";`,
    usageCode: `<SettingsTeamMembers
  members={[
    {
      id: "user-1",
      name: "Alice Admin",
      email: "alice@company.com",
      role: "admin",
    },
  ]}
  onInvite={async (email, role) => {
    /* invite member */
  }}
  onRemove={async (id) => {
    /* remove member */
  }}
  onUpdateRole={async (id, newRole) => {
    /* update role */
  }}
/>`,
  },
  "settings-webhooks": {
    usageImports: `import SettingsWebhooks from "@/components/blocks/settings/settings-webhooks";`,
    usageCode: `<SettingsWebhooks
  webhooks={[
    {
      id: "webhook-1",
      name: "Payment Notifications",
      url: "https://api.example.com/webhooks/payment",
      secret: "whsec_1234567890abcdef",
      events: ["payment.succeeded", "payment.failed"],
      status: "active",
      createdAt: new Date(),
      lastTriggered: new Date(),
      successCount: 245,
      failureCount: 3,
    },
  ]}
  deliveries={{}}
  onCreate={async (data) => {
    /* create webhook */
  }}
  onUpdate={async (id, data) => {
    /* update webhook */
  }}
  onDelete={async (id) => {
    /* delete webhook */
  }}
/>`,
  },
} as const;

export type BlockSnippets = typeof blockSnippets;

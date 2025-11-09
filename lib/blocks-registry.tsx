import AIChatHistory from "@/components/blocks/ai/ai-chat-history";
import AICitations from "@/components/blocks/ai/ai-citations";
import AIConversation from "@/components/blocks/ai/ai-conversation";
import AIErrorHandler from "@/components/blocks/ai/ai-error-handler";
import AIFileUpload from "@/components/blocks/ai/ai-file-upload";
import AIMessage from "@/components/blocks/ai/ai-message";
import AIModelSelector from "@/components/blocks/ai/ai-model-selector";
import AIPromptInput from "@/components/blocks/ai/ai-prompt-input";
import AIPromptTemplates from "@/components/blocks/ai/ai-prompt-templates";
import AISettingsPanel from "@/components/blocks/ai/ai-settings-panel";
import AIStreamingResponse from "@/components/blocks/ai/ai-streaming-response";
import AISuggestedPrompts from "@/components/blocks/ai/ai-suggested-prompts";
import AIThinking from "@/components/blocks/ai/ai-thinking";
import AIUsageQuota from "@/components/blocks/ai/ai-usage-quota";

import AuthAccountDelete from "@/components/blocks/auth/auth-account-delete";
import AuthChangePassword from "@/components/blocks/auth/auth-change-password";
import AuthEmailChange from "@/components/blocks/auth/auth-email-change";
import AuthForgotPassword from "@/components/blocks/auth/auth-forgot-password";
import AuthLoginForm from "@/components/blocks/auth/auth-login-form";
import AuthMagicLink from "@/components/blocks/auth/auth-magic-link";
import AuthOTPVerify from "@/components/blocks/auth/auth-otp-verify";
import AuthPhoneVerify from "@/components/blocks/auth/auth-phone-verify";
import AuthRecoveryCodes from "@/components/blocks/auth/auth-recovery-codes";
import AuthResetPassword from "@/components/blocks/auth/auth-reset-password";
import AuthSessionManager from "@/components/blocks/auth/auth-session-manager";
import AuthSignupForm from "@/components/blocks/auth/auth-signup-form";
import AuthSocialAccounts from "@/components/blocks/auth/auth-social-accounts";
import AuthTwoFactorSetup from "@/components/blocks/auth/auth-two-factor-setup";
import AuthTwoFactorVerify from "@/components/blocks/auth/auth-two-factor-verify";
import AuthVerifyEmail from "@/components/blocks/auth/auth-verify-email";

import BillingBillingHistory from "@/components/blocks/billing/billing-billing-history";
import BillingCouponCode from "@/components/blocks/billing/billing-coupon-code";
import BillingInvoiceDetails from "@/components/blocks/billing/billing-invoice-details";
import BillingInvoiceList from "@/components/blocks/billing/billing-invoice-list";
import BillingPaymentFailed from "@/components/blocks/billing/billing-payment-failed";
import BillingPaymentForm from "@/components/blocks/billing/billing-payment-form";
import BillingPaymentMethod from "@/components/blocks/billing/billing-payment-method";
import BillingPaymentSchedule from "@/components/blocks/billing/billing-payment-schedule";
import BillingPlanSelector from "@/components/blocks/billing/billing-plan-selector";
import BillingPricingTable from "@/components/blocks/billing/billing-pricing-table";
import BillingSubscriptionCard from "@/components/blocks/billing/billing-subscription-card";
import BillingSubscriptionSettings from "@/components/blocks/billing/billing-subscription-settings";
import BillingUpgradePrompt from "@/components/blocks/billing/billing-upgrade-prompt";
import BillingUsageAlerts from "@/components/blocks/billing/billing-usage-alerts";
import BillingUsageBilling from "@/components/blocks/billing/billing-usage-billing";

import SettingsAccount from "@/components/blocks/settings/settings-account";
import SettingsActivityLog from "@/components/blocks/settings/settings-activity-log";
import SettingsAdvanced from "@/components/blocks/settings/settings-advanced";
import SettingsAPIKeys from "@/components/blocks/settings/settings-api-keys";
import SettingsBackup from "@/components/blocks/settings/settings-backup";
import SettingsDomains from "@/components/blocks/settings/settings-domains";
import SettingsExportData from "@/components/blocks/settings/settings-export-data";
import SettingsImportData from "@/components/blocks/settings/settings-import-data";
import SettingsIntegrations from "@/components/blocks/settings/settings-integrations";
import SettingsNotifications from "@/components/blocks/settings/settings-notifications";
import SettingsPreferences from "@/components/blocks/settings/settings-preferences";
import SettingsPrivacy from "@/components/blocks/settings/settings-privacy";
import SettingsProfile from "@/components/blocks/settings/settings-profile";
import SettingsSecurity from "@/components/blocks/settings/settings-security";
import SettingsSSO from "@/components/blocks/settings/settings-sso";
import SettingsStorage from "@/components/blocks/settings/settings-storage";
import SettingsTeamMembers from "@/components/blocks/settings/settings-team-members";
import SettingsWebhooks from "@/components/blocks/settings/settings-webhooks";
import { getBlockExampleProps } from "./block-examples";

export type BlockCategory = "ai" | "auth" | "billing" | "settings";

export type BlockMeta = {
  id: string;
  title: string;
  description?: string;
  category: BlockCategory;
  Component: React.ComponentType<any>;
  getExampleProps?: () => Record<string, any>;
};

const blocksList: Omit<BlockMeta, "Component">[] = [
  // AI Blocks
  {
    id: "ai-chat-history",
    title: "Chat History",
    description:
      "Display and manage conversation history with search and filtering.",
    category: "ai",
  },
  {
    id: "ai-citations",
    title: "Citations",
    description: "Show source citations and references for AI responses.",
    category: "ai",
  },
  {
    id: "ai-conversation",
    title: "Conversation",
    description: "Full conversation interface with messages and input.",
    category: "ai",
  },
  {
    id: "ai-error-handler",
    title: "Error Handler",
    description: "Handle and display AI-related errors gracefully.",
    category: "ai",
  },
  {
    id: "ai-file-upload",
    title: "File Upload",
    description: "Upload files for AI processing and analysis.",
    category: "ai",
  },
  {
    id: "ai-message",
    title: "Message",
    description: "Display individual AI messages with formatting.",
    category: "ai",
  },
  {
    id: "ai-model-selector",
    title: "Model Selector",
    description: "Select and switch between AI models.",
    category: "ai",
  },
  {
    id: "ai-prompt-input",
    title: "Prompt Input",
    description: "Input field for AI prompts with suggestions.",
    category: "ai",
  },
  {
    id: "ai-prompt-templates",
    title: "Prompt Templates",
    description: "Browse and use pre-built prompt templates.",
    category: "ai",
  },
  {
    id: "ai-settings-panel",
    title: "Settings Panel",
    description: "Configure AI settings and preferences.",
    category: "ai",
  },
  {
    id: "ai-streaming-response",
    title: "Streaming Response",
    description: "Display streaming AI responses in real-time.",
    category: "ai",
  },
  {
    id: "ai-suggested-prompts",
    title: "Suggested Prompts",
    description: "Show suggested prompts to help users get started.",
    category: "ai",
  },
  {
    id: "ai-thinking",
    title: "Thinking",
    description: "Display AI thinking/processing state.",
    category: "ai",
  },
  {
    id: "ai-usage-quota",
    title: "Usage Quota",
    description: "Display AI usage and quota information.",
    category: "ai",
  },
  // Auth Blocks
  {
    id: "auth-account-delete",
    title: "Account Delete",
    description: "Delete user account with confirmation.",
    category: "auth",
  },
  {
    id: "auth-change-password",
    title: "Change Password",
    description: "Change user password with validation.",
    category: "auth",
  },
  {
    id: "auth-email-change",
    title: "Email Change",
    description: "Change user email address.",
    category: "auth",
  },
  {
    id: "auth-forgot-password",
    title: "Forgot Password",
    description: "Request password reset via email.",
    category: "auth",
  },
  {
    id: "auth-login-form",
    title: "Login Form",
    description: "User login form with email and password.",
    category: "auth",
  },
  {
    id: "auth-magic-link",
    title: "Magic Link",
    description: "Passwordless login with magic link.",
    category: "auth",
  },
  {
    id: "auth-otp-verify",
    title: "OTP Verify",
    description: "Verify one-time password for authentication.",
    category: "auth",
  },
  {
    id: "auth-phone-verify",
    title: "Phone Verify",
    description: "Verify phone number with OTP.",
    category: "auth",
  },
  {
    id: "auth-recovery-codes",
    title: "Recovery Codes",
    description: "Display and manage 2FA recovery codes.",
    category: "auth",
  },
  {
    id: "auth-reset-password",
    title: "Reset Password",
    description: "Reset password with token validation.",
    category: "auth",
  },
  {
    id: "auth-session-manager",
    title: "Session Manager",
    description: "Manage active sessions and devices.",
    category: "auth",
  },
  {
    id: "auth-signup-form",
    title: "Signup Form",
    description: "User registration form with validation.",
    category: "auth",
  },
  {
    id: "auth-social-accounts",
    title: "Social Accounts",
    description: "Connect and manage social account logins.",
    category: "auth",
  },
  {
    id: "auth-two-factor-setup",
    title: "Two Factor Setup",
    description: "Set up two-factor authentication.",
    category: "auth",
  },
  {
    id: "auth-two-factor-verify",
    title: "Two Factor Verify",
    description: "Verify two-factor authentication code.",
    category: "auth",
  },
  {
    id: "auth-verify-email",
    title: "Verify Email",
    description: "Verify email address with confirmation code.",
    category: "auth",
  },
  // Billing Blocks
  {
    id: "billing-billing-history",
    title: "Billing History",
    description: "View complete billing and payment history.",
    category: "billing",
  },
  {
    id: "billing-coupon-code",
    title: "Coupon Code",
    description: "Apply discount coupons and promo codes.",
    category: "billing",
  },
  {
    id: "billing-invoice-details",
    title: "Invoice Details",
    description: "Detailed view of individual invoices.",
    category: "billing",
  },
  {
    id: "billing-invoice-list",
    title: "Invoice List",
    description: "List all invoices with filtering and search.",
    category: "billing",
  },
  {
    id: "billing-payment-failed",
    title: "Payment Failed",
    description: "Handle failed payment attempts.",
    category: "billing",
  },
  {
    id: "billing-payment-form",
    title: "Payment Form",
    description: "Form for entering payment information.",
    category: "billing",
  },
  {
    id: "billing-payment-method",
    title: "Payment Method",
    description: "Manage saved payment methods.",
    category: "billing",
  },
  {
    id: "billing-payment-schedule",
    title: "Payment Schedule",
    description: "View and manage payment schedules.",
    category: "billing",
  },
  {
    id: "billing-plan-selector",
    title: "Plan Selector",
    description: "Select and switch between subscription plans.",
    category: "billing",
  },
  {
    id: "billing-pricing-table",
    title: "Pricing Table",
    description: "Display pricing plans and features.",
    category: "billing",
  },
  {
    id: "billing-subscription-card",
    title: "Subscription Card",
    description: "Display current subscription information.",
    category: "billing",
  },
  {
    id: "billing-subscription-settings",
    title: "Subscription Settings",
    description: "Manage subscription settings and preferences.",
    category: "billing",
  },
  {
    id: "billing-upgrade-prompt",
    title: "Upgrade Prompt",
    description: "Prompt users to upgrade their plan.",
    category: "billing",
  },
  {
    id: "billing-usage-alerts",
    title: "Usage Alerts",
    description: "Set alerts for usage thresholds.",
    category: "billing",
  },
  {
    id: "billing-usage-billing",
    title: "Usage Billing",
    description: "View usage-based billing information.",
    category: "billing",
  },
  // Settings Blocks
  {
    id: "settings-account",
    title: "Account",
    description: "Manage account settings and preferences.",
    category: "settings",
  },
  {
    id: "settings-activity-log",
    title: "Activity Log",
    description: "View account activity and audit logs.",
    category: "settings",
  },
  {
    id: "settings-advanced",
    title: "Advanced",
    description: "Advanced settings and configuration options.",
    category: "settings",
  },
  {
    id: "settings-api-keys",
    title: "API Keys",
    description: "Manage API keys and tokens.",
    category: "settings",
  },
  {
    id: "settings-backup",
    title: "Backup",
    description: "Configure and manage backups.",
    category: "settings",
  },
  {
    id: "settings-domains",
    title: "Domains",
    description: "Manage custom domains and DNS settings.",
    category: "settings",
  },
  {
    id: "settings-export-data",
    title: "Export Data",
    description: "Export user data in various formats.",
    category: "settings",
  },
  {
    id: "settings-import-data",
    title: "Import Data",
    description: "Import data from external sources.",
    category: "settings",
  },
  {
    id: "settings-integrations",
    title: "Integrations",
    description: "Manage third-party integrations.",
    category: "settings",
  },
  {
    id: "settings-notifications",
    title: "Notifications",
    description: "Configure notification preferences.",
    category: "settings",
  },
  {
    id: "settings-preferences",
    title: "Preferences",
    description: "User preferences and customization.",
    category: "settings",
  },
  {
    id: "settings-privacy",
    title: "Privacy",
    description: "Privacy settings and data controls.",
    category: "settings",
  },
  {
    id: "settings-profile",
    title: "Profile",
    description: "Edit user profile information.",
    category: "settings",
  },
  {
    id: "settings-security",
    title: "Security",
    description: "Security settings and authentication.",
    category: "settings",
  },
  {
    id: "settings-sso",
    title: "SSO",
    description: "Configure single sign-on settings.",
    category: "settings",
  },
  {
    id: "settings-storage",
    title: "Storage",
    description: "Manage storage usage and limits.",
    category: "settings",
  },
  {
    id: "settings-team-members",
    title: "Team Members",
    description: "Manage team members and permissions.",
    category: "settings",
  },
  {
    id: "settings-webhooks",
    title: "Webhooks",
    description: "Configure webhooks and event notifications.",
    category: "settings",
  },
];

const blockComponents: Record<string, React.ComponentType<any>> = {
  // AI
  "ai-chat-history": AIChatHistory,
  "ai-citations": AICitations,
  "ai-conversation": AIConversation,
  "ai-error-handler": AIErrorHandler,
  "ai-file-upload": AIFileUpload,
  "ai-message": AIMessage,
  "ai-model-selector": AIModelSelector,
  "ai-prompt-input": AIPromptInput,
  "ai-prompt-templates": AIPromptTemplates,
  "ai-settings-panel": AISettingsPanel,
  "ai-streaming-response": AIStreamingResponse,
  "ai-suggested-prompts": AISuggestedPrompts,
  "ai-thinking": AIThinking,
  "ai-usage-quota": AIUsageQuota,
  // Auth
  "auth-account-delete": AuthAccountDelete,
  "auth-change-password": AuthChangePassword,
  "auth-email-change": AuthEmailChange,
  "auth-forgot-password": AuthForgotPassword,
  "auth-login-form": AuthLoginForm,
  "auth-magic-link": AuthMagicLink,
  "auth-otp-verify": AuthOTPVerify,
  "auth-phone-verify": AuthPhoneVerify,
  "auth-recovery-codes": AuthRecoveryCodes,
  "auth-reset-password": AuthResetPassword,
  "auth-session-manager": AuthSessionManager,
  "auth-signup-form": AuthSignupForm,
  "auth-social-accounts": AuthSocialAccounts,
  "auth-two-factor-setup": AuthTwoFactorSetup,
  "auth-two-factor-verify": AuthTwoFactorVerify,
  "auth-verify-email": AuthVerifyEmail,
  // Billing
  "billing-billing-history": BillingBillingHistory,
  "billing-coupon-code": BillingCouponCode,
  "billing-invoice-details": BillingInvoiceDetails,
  "billing-invoice-list": BillingInvoiceList,
  "billing-payment-failed": BillingPaymentFailed,
  "billing-payment-form": BillingPaymentForm,
  "billing-payment-method": BillingPaymentMethod,
  "billing-payment-schedule": BillingPaymentSchedule,
  "billing-plan-selector": BillingPlanSelector,
  "billing-pricing-table": BillingPricingTable,
  "billing-subscription-card": BillingSubscriptionCard,
  "billing-subscription-settings": BillingSubscriptionSettings,
  "billing-upgrade-prompt": BillingUpgradePrompt,
  "billing-usage-alerts": BillingUsageAlerts,
  "billing-usage-billing": BillingUsageBilling,
  // Settings
  "settings-account": SettingsAccount,
  "settings-activity-log": SettingsActivityLog,
  "settings-advanced": SettingsAdvanced,
  "settings-api-keys": SettingsAPIKeys,
  "settings-backup": SettingsBackup,
  "settings-domains": SettingsDomains,
  "settings-export-data": SettingsExportData,
  "settings-import-data": SettingsImportData,
  "settings-integrations": SettingsIntegrations,
  "settings-notifications": SettingsNotifications,
  "settings-preferences": SettingsPreferences,
  "settings-privacy": SettingsPrivacy,
  "settings-profile": SettingsProfile,
  "settings-security": SettingsSecurity,
  "settings-sso": SettingsSSO,
  "settings-storage": SettingsStorage,
  "settings-team-members": SettingsTeamMembers,
  "settings-webhooks": SettingsWebhooks,
};

export const blocksRegistry: BlockMeta[] = blocksList.map((block) => ({
  ...block,
  Component: blockComponents[block.id],
  getExampleProps: () => getBlockExampleProps(block.id),
}));

export function getBlockMetaById(id: string): BlockMeta | undefined {
  return blocksRegistry.find((b) => b.id === id);
}

export function getBlocksByCategory(category: BlockCategory): BlockMeta[] {
  return blocksRegistry.filter((b) => b.category === category);
}

export const blockCategories: BlockCategory[] = [
  "ai",
  "auth",
  "billing",
  "settings",
];

export const categoryLabels: Record<BlockCategory, string> = {
  ai: "AI",
  auth: "Authentication",
  billing: "Billing",
  settings: "Settings",
};

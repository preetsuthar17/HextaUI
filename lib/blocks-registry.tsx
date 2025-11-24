import AIChatHistory from "@/registry/new-york/blocks/ai/ai-chat-history";
import AICitations from "@/registry/new-york/blocks/ai/ai-citations";
import AIConversation from "@/registry/new-york/blocks/ai/ai-conversation";
import AIErrorHandler from "@/registry/new-york/blocks/ai/ai-error-handler";
import AIFileUpload from "@/registry/new-york/blocks/ai/ai-file-upload";
import AIMessage from "@/registry/new-york/blocks/ai/ai-message";
import AIModelSelector from "@/registry/new-york/blocks/ai/ai-model-selector";
import AIPromptInput from "@/registry/new-york/blocks/ai/ai-prompt-input";
import AIPromptTemplates from "@/registry/new-york/blocks/ai/ai-prompt-templates";
import AISettingsPanel from "@/registry/new-york/blocks/ai/ai-settings-panel";
import AIStreamingResponse from "@/registry/new-york/blocks/ai/ai-streaming-response";
import AISuggestedPrompts from "@/registry/new-york/blocks/ai/ai-suggested-prompts";
import AIThinking from "@/registry/new-york/blocks/ai/ai-thinking";
import AIUsageQuota from "@/registry/new-york/blocks/ai/ai-usage-quota";

import AuthAccountDelete from "@/registry/new-york/blocks/auth/auth-account-delete";
import AuthChangePassword from "@/registry/new-york/blocks/auth/auth-change-password";
import AuthEmailChange from "@/registry/new-york/blocks/auth/auth-email-change";
import AuthForgotPassword from "@/registry/new-york/blocks/auth/auth-forgot-password";
import AuthLoginForm from "@/registry/new-york/blocks/auth/auth-login-form";
import AuthMagicLink from "@/registry/new-york/blocks/auth/auth-magic-link";
import AuthOTPVerify from "@/registry/new-york/blocks/auth/auth-otp-verify";
import AuthPhoneVerify from "@/registry/new-york/blocks/auth/auth-phone-verify";
import AuthRecoveryCodes from "@/registry/new-york/blocks/auth/auth-recovery-codes";
import AuthResetPassword from "@/registry/new-york/blocks/auth/auth-reset-password";
import AuthSessionManager from "@/registry/new-york/blocks/auth/auth-session-manager";
import AuthSignupForm from "@/registry/new-york/blocks/auth/auth-signup-form";
import AuthSocialAccounts from "@/registry/new-york/blocks/auth/auth-social-accounts";
import AuthTwoFactorSetup from "@/registry/new-york/blocks/auth/auth-two-factor-setup";
import AuthTwoFactorVerify from "@/registry/new-york/blocks/auth/auth-two-factor-verify";
import AuthVerifyEmail from "@/registry/new-york/blocks/auth/auth-verify-email";

import BillingBillingHistory from "@/registry/new-york/blocks/billing/billing-billing-history";
import BillingCouponCode from "@/registry/new-york/blocks/billing/billing-coupon-code";
import BillingInvoiceDetails from "@/registry/new-york/blocks/billing/billing-invoice-details";
import BillingInvoiceList from "@/registry/new-york/blocks/billing/billing-invoice-list";
import BillingPaymentFailed from "@/registry/new-york/blocks/billing/billing-payment-failed";
import BillingPaymentForm from "@/registry/new-york/blocks/billing/billing-payment-form";
import BillingPaymentMethod from "@/registry/new-york/blocks/billing/billing-payment-method";
import BillingPaymentSchedule from "@/registry/new-york/blocks/billing/billing-payment-schedule";
import BillingPlanSelector from "@/registry/new-york/blocks/billing/billing-plan-selector";
import BillingPricingTable from "@/registry/new-york/blocks/billing/billing-pricing-table";
import BillingSubscriptionCard from "@/registry/new-york/blocks/billing/billing-subscription-card";
import BillingSubscriptionSettings from "@/registry/new-york/blocks/billing/billing-subscription-settings";
import BillingUpgradePrompt from "@/registry/new-york/blocks/billing/billing-upgrade-prompt";
import BillingUsageAlerts from "@/registry/new-york/blocks/billing/billing-usage-alerts";
import BillingUsageBilling from "@/registry/new-york/blocks/billing/billing-usage-billing";

import SettingsAccount from "@/registry/new-york/blocks/settings/settings-account";
import SettingsActivityLog from "@/registry/new-york/blocks/settings/settings-activity-log";
import SettingsAdvanced from "@/registry/new-york/blocks/settings/settings-advanced";
import SettingsAPIKeys from "@/registry/new-york/blocks/settings/settings-api-keys";
import SettingsBackup from "@/registry/new-york/blocks/settings/settings-backup";
import SettingsDomains from "@/registry/new-york/blocks/settings/settings-domains";
import SettingsExportData from "@/registry/new-york/blocks/settings/settings-export-data";
import SettingsImportData from "@/registry/new-york/blocks/settings/settings-import-data";
import SettingsIntegrations from "@/registry/new-york/blocks/settings/settings-integrations";
import SettingsNotifications from "@/registry/new-york/blocks/settings/settings-notifications";
import SettingsPreferences from "@/registry/new-york/blocks/settings/settings-preferences";
import SettingsPrivacy from "@/registry/new-york/blocks/settings/settings-privacy";
import SettingsProfile from "@/registry/new-york/blocks/settings/settings-profile";
import SettingsSecurity from "@/registry/new-york/blocks/settings/settings-security";
import SettingsSSO from "@/registry/new-york/blocks/settings/settings-sso";
import SettingsStorage from "@/registry/new-york/blocks/settings/settings-storage";
import SettingsTeamMembers from "@/registry/new-york/blocks/settings/settings-team-members";
import SettingsWebhooks from "@/registry/new-york/blocks/settings/settings-webhooks";
import ProjectList from "@/registry/new-york/blocks/tasks/project-list";
import TaskBoard from "@/registry/new-york/blocks/tasks/task-board";
import TaskCreate from "@/registry/new-york/blocks/tasks/task-create";
import TaskDetail from "@/registry/new-york/blocks/tasks/task-detail";
import TaskFilters from "@/registry/new-york/blocks/tasks/task-filters";
import TaskList from "@/registry/new-york/blocks/tasks/task-list";
import TaskProgress from "@/registry/new-york/blocks/tasks/task-progress";
import TeamActivityFeed from "@/registry/new-york/blocks/team/team-activity-feed";
import TeamAIRoom from "@/registry/new-york/blocks/team/team-ai-room";
import TeamAnalytics from "@/registry/new-york/blocks/team/team-analytics";
import TeamChat from "@/registry/new-york/blocks/team/team-chat";
import TeamDashboard from "@/registry/new-york/blocks/team/team-dashboard";
import TeamFiles from "@/registry/new-york/blocks/team/team-files";
import TeamInvitations from "@/registry/new-york/blocks/team/team-invitations";
import TeamMemberList from "@/registry/new-york/blocks/team/team-member-list";
import TeamNotes from "@/registry/new-york/blocks/team/team-notes";
import TeamNotifications from "@/registry/new-york/blocks/team/team-notifications";
import TeamPermissionsMatrix from "@/registry/new-york/blocks/team/team-permissions-matrix";
import TeamProjects from "@/registry/new-york/blocks/team/team-projects";
import TeamPromptLibrary from "@/registry/new-york/blocks/team/team-prompt-library";
import TeamSettings from "@/registry/new-york/blocks/team/team-settings";
import TeamSwitcher from "@/registry/new-york/blocks/team/team-switcher";
import { getBlockExampleProps } from "./block-examples";
import { blockSnippets } from "./block-snippets";

export type BlockCategory =
  | "ai"
  | "auth"
  | "billing"
  | "settings"
  | "team"
  | "tasks";

export type BlockMeta = {
  id: string;
  title: string;
  description?: string;
  category: BlockCategory;
  Component: React.ComponentType<any>;
  getExampleProps?: () => Record<string, any>;
  usageImports?: string;
  usageCode?: string;
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
  // Team Blocks
  {
    id: "team-activity-feed",
    title: "Activity Feed",
    description: "Display team activity and events in a feed.",
    category: "team",
  },
  {
    id: "team-ai-room",
    title: "AI Room",
    description: "Collaborative AI workspace for team members.",
    category: "team",
  },
  {
    id: "team-analytics",
    title: "Analytics",
    description: "View team analytics and usage statistics.",
    category: "team",
  },
  {
    id: "team-chat",
    title: "Chat",
    description: "Team chat interface with messages and channels.",
    category: "team",
  },
  {
    id: "team-dashboard",
    title: "Dashboard",
    description: "Team dashboard with overview and metrics.",
    category: "team",
  },
  {
    id: "team-files",
    title: "Files",
    description: "Manage and share team files.",
    category: "team",
  },
  {
    id: "team-invitations",
    title: "Invitations",
    description: "Send and manage team invitations.",
    category: "team",
  },
  {
    id: "team-member-list",
    title: "Member List",
    description: "List and manage team members.",
    category: "team",
  },
  {
    id: "team-notes",
    title: "Notes",
    description: "Collaborative notes and documentation.",
    category: "team",
  },
  {
    id: "team-notifications",
    title: "Notifications",
    description: "Team notifications and alerts.",
    category: "team",
  },
  {
    id: "team-permissions-matrix",
    title: "Permissions Matrix",
    description: "Manage team permissions and roles.",
    category: "team",
  },
  {
    id: "team-projects",
    title: "Projects",
    description: "Manage team projects and tasks.",
    category: "team",
  },
  {
    id: "team-prompt-library",
    title: "Prompt Library",
    description: "Shared prompt library for the team.",
    category: "team",
  },
  {
    id: "team-settings",
    title: "Settings",
    description: "Team settings and configuration.",
    category: "team",
  },
  {
    id: "team-switcher",
    title: "Team Switcher",
    description: "Switch between teams and workspaces.",
    category: "team",
  },
  // Task Blocks
  {
    id: "task-board",
    title: "Task Board",
    description: "Kanban-style board for managing tasks with drag-and-drop.",
    category: "tasks",
  },
  {
    id: "task-create",
    title: "Task Create",
    description: "Form to create new tasks with all necessary fields.",
    category: "tasks",
  },
  {
    id: "task-detail",
    title: "Task Detail",
    description:
      "Detailed view of a task with subtasks, comments, and activity.",
    category: "tasks",
  },
  {
    id: "task-filters",
    title: "Task Filters",
    description: "Filter and search tasks by various criteria.",
    category: "tasks",
  },
  {
    id: "task-list",
    title: "Task List",
    description: "List view of tasks with sorting and filtering options.",
    category: "tasks",
  },
  {
    id: "task-progress",
    title: "Task Progress",
    description: "Visual progress indicator for task completion goals.",
    category: "tasks",
  },
  {
    id: "project-list",
    title: "Project List",
    description: "Display and manage projects with progress tracking.",
    category: "tasks",
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
  // Team
  "team-activity-feed": TeamActivityFeed,
  "team-ai-room": TeamAIRoom,
  "team-analytics": TeamAnalytics,
  "team-chat": TeamChat,
  "team-dashboard": TeamDashboard,
  "team-files": TeamFiles,
  "team-invitations": TeamInvitations,
  "team-member-list": TeamMemberList,
  "team-notes": TeamNotes,
  "team-notifications": TeamNotifications,
  "team-permissions-matrix": TeamPermissionsMatrix,
  "team-projects": TeamProjects,
  "team-prompt-library": TeamPromptLibrary,
  "team-settings": TeamSettings,
  "team-switcher": TeamSwitcher,
  // Tasks
  "task-board": TaskBoard,
  "task-create": TaskCreate,
  "task-detail": TaskDetail,
  "task-filters": TaskFilters,
  "task-list": TaskList,
  "task-progress": TaskProgress,
  "project-list": ProjectList,
};

const snippets = blockSnippets as Record<
  string,
  Partial<Pick<BlockMeta, "usageImports" | "usageCode">>
>;

export const blocksRegistry: BlockMeta[] = blocksList.map((block) => ({
  ...block,
  Component: blockComponents[block.id],
  getExampleProps: () => getBlockExampleProps(block.id),
  ...(snippets[block.id] ?? {}),
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
  "team",
  "tasks",
];

export const categoryLabels: Record<BlockCategory, string> = {
  ai: "AI",
  auth: "Authentication",
  billing: "Billing",
  settings: "Settings",
  team: "Team",
  tasks: "Tasks",
};

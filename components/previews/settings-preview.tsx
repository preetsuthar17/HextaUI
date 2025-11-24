"use client";

import { FileText, Image } from "lucide-react";
import { useMemo, useState } from "react";
import SettingsAccount, {
  type AccountInfo,
} from "@/registry/new-york/blocks/settings/settings-account";
import SettingsActivityLog, {
  type ActivityLogEntry,
} from "@/registry/new-york/blocks/settings/settings-activity-log";
import SettingsAdvanced, {
  type FeatureFlag,
} from "@/registry/new-york/blocks/settings/settings-advanced";
import SettingsAPIKeys, {
  type APIKey,
} from "@/registry/new-york/blocks/settings/settings-api-keys";
import SettingsBackup, {
  type Backup,
} from "@/registry/new-york/blocks/settings/settings-backup";
import SettingsDomains, {
  type Domain,
} from "@/registry/new-york/blocks/settings/settings-domains";
import SettingsExportData, {
  type ExportJob,
} from "@/registry/new-york/blocks/settings/settings-export-data";
import SettingsImportData, {
  type ImportJob,
} from "@/registry/new-york/blocks/settings/settings-import-data";
import SettingsIntegrations, {
  type Integration,
} from "@/registry/new-york/blocks/settings/settings-integrations";
import SettingsNotifications from "@/registry/new-york/blocks/settings/settings-notifications";
import SettingsPreferences from "@/registry/new-york/blocks/settings/settings-preferences";
import SettingsPrivacy from "@/registry/new-york/blocks/settings/settings-privacy";
import SettingsProfile, {
  type ProfileData,
} from "@/registry/new-york/blocks/settings/settings-profile";
import SettingsSecurity, {
  type SecurityEvent,
  type SecuritySession,
} from "@/registry/new-york/blocks/settings/settings-security";
import SettingsSSO, {
  type SSOProvider,
} from "@/registry/new-york/blocks/settings/settings-sso";
import SettingsStorage, {
  type StorageCategory,
} from "@/registry/new-york/blocks/settings/settings-storage";
import SettingsTeamMembers, {
  type TeamMember,
} from "@/registry/new-york/blocks/settings/settings-team-members";
import SettingsWebhooks, {
  type Webhook,
  type WebhookDelivery,
} from "@/registry/new-york/blocks/settings/settings-webhooks";

export default function SettingsPreview() {
  const [baseTimestamp] = useState(() => Date.now());

  const [exampleProfile] = useState<ProfileData>({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Design Engineer.",
    location: "San Francisco, CA",
    website: "https://preetsuthar.me",
    avatar: undefined,
    socialLinks: [
      { platform: "twitter", url: "https://x.com/preetsuthar17" },
      { platform: "github", url: "https://github.com/preetsuthar17" },
      { platform: "linkedin", url: "https://linkedin.com/in/preetsuthar17" },
      { platform: "website", url: "https://preetsuthar.me" },
    ],
  });

  const exampleAPIKeys: APIKey[] = useMemo(
    () => [
      {
        id: "key-1",
        name: "Production API Key",
        key: "sk_live_1234567890abcdef",
        createdAt: new Date(baseTimestamp - 30 * 24 * 60 * 60 * 1000),
        lastUsed: new Date(baseTimestamp - 2 * 60 * 60 * 1000),
        scopes: ["read", "write"],
        usageCount: 15_420,
        rateLimit: {
          limit: 10_000,
          remaining: 8560,
          resetAt: new Date(baseTimestamp + 24 * 60 * 60 * 1000),
        },
      },
      {
        id: "key-2",
        name: "Development Key",
        key: "sk_test_abcdef1234567890",
        createdAt: new Date(baseTimestamp - 7 * 24 * 60 * 60 * 1000),
        scopes: ["read"],
        usageCount: 234,
      },
    ],
    [baseTimestamp]
  );

  const exampleTeamMembers: TeamMember[] = useMemo(
    () => [
      {
        id: "member-1",
        name: "John Doe",
        email: "john.doe@example.com",
        role: "owner",
        status: "active",
        lastActive: new Date(baseTimestamp - 5 * 60 * 1000),
        joinedAt: new Date(baseTimestamp - 365 * 24 * 60 * 60 * 1000),
      },
      {
        id: "member-2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "admin",
        status: "active",
        lastActive: new Date(baseTimestamp - 2 * 60 * 60 * 1000),
        joinedAt: new Date(baseTimestamp - 180 * 24 * 60 * 60 * 1000),
      },
      {
        id: "member-3",
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        role: "member",
        status: "invited",
        joinedAt: new Date(baseTimestamp - 1 * 24 * 60 * 60 * 1000),
      },
    ],
    [baseTimestamp]
  );

  const exampleIntegrations: Integration[] = useMemo(
    () => [
      {
        id: "github",
        name: "GitHub",
        description: "Connect your GitHub account to sync repositories",
        status: "connected",
        lastSynced: new Date(baseTimestamp - 2 * 60 * 60 * 1000),
        scopes: ["repo", "read:user"],
      },
      {
        id: "slack",
        name: "Slack",
        description: "Send notifications to your Slack workspace",
        status: "disconnected",
        scopes: ["chat:write", "channels:read"],
      },
      {
        id: "google",
        name: "Google Drive",
        description: "Access and sync files from Google Drive",
        status: "expired",
        lastSynced: new Date(baseTimestamp - 30 * 24 * 60 * 60 * 1000),
        needsReconnection: true,
        scopes: ["drive.readonly"],
      },
    ],
    [baseTimestamp]
  );

  const exampleExportHistory: ExportJob[] = useMemo(
    () => [
      {
        id: "export-1",
        format: "json",
        scope: ["profile", "activity"],
        status: "completed",
        createdAt: new Date(baseTimestamp - 7 * 24 * 60 * 60 * 1000),
        completedAt: new Date(baseTimestamp - 7 * 24 * 60 * 60 * 1000 + 30_000),
        downloadUrl: "#",
        expiresAt: new Date(baseTimestamp + 23 * 24 * 60 * 60 * 1000),
      },
      {
        id: "export-2",
        format: "csv",
        scope: ["messages"],
        status: "processing",
        progress: 65,
        createdAt: new Date(baseTimestamp - 5 * 60 * 1000),
      },
    ],
    [baseTimestamp]
  );

  const exampleImportHistory: ImportJob[] = useMemo(
    () => [
      {
        id: "import-1",
        filename: "backup.json",
        format: "json",
        status: "completed",
        createdAt: new Date(baseTimestamp - 14 * 24 * 60 * 60 * 1000),
        completedAt: new Date(
          baseTimestamp - 14 * 24 * 60 * 60 * 1000 + 45_000
        ),
        recordsImported: 1250,
        recordsSkipped: 12,
        recordsFailed: 3,
      },
    ],
    [baseTimestamp]
  );

  const exampleSecuritySessions: SecuritySession[] = useMemo(
    () => [
      {
        id: "session-1",
        device: "MacBook Pro",
        location: "San Francisco, CA",
        ipAddress: "192.168.1.1",
        lastActive: new Date(baseTimestamp - 5 * 60 * 1000),
        current: true,
      },
      {
        id: "session-2",
        device: "iPhone 14",
        location: "San Francisco, CA",
        ipAddress: "192.168.1.2",
        lastActive: new Date(baseTimestamp - 2 * 60 * 60 * 1000),
        current: false,
      },
      {
        id: "session-3",
        device: "Windows PC",
        location: "New York, NY",
        ipAddress: "10.0.0.1",
        lastActive: new Date(baseTimestamp - 24 * 60 * 60 * 1000),
        current: false,
      },
    ],
    [baseTimestamp]
  );

  const exampleSecurityHistory: SecurityEvent[] = useMemo(
    () => [
      {
        id: "event-1",
        type: "login",
        description: "Successful login from MacBook Pro",
        ipAddress: "192.168.1.1",
        location: "San Francisco, CA",
        timestamp: new Date(baseTimestamp - 5 * 60 * 1000),
        status: "success",
      },
      {
        id: "event-2",
        type: "password_change",
        description: "Password changed",
        ipAddress: "192.168.1.1",
        location: "San Francisco, CA",
        timestamp: new Date(baseTimestamp - 7 * 24 * 60 * 60 * 1000),
        status: "success",
      },
      {
        id: "event-3",
        type: "login",
        description: "Failed login attempt",
        ipAddress: "10.0.0.1",
        location: "Unknown",
        timestamp: new Date(baseTimestamp - 2 * 24 * 60 * 60 * 1000),
        status: "failed",
      },
    ],
    [baseTimestamp]
  );

  const exampleActivityLog: ActivityLogEntry[] = useMemo(
    () => [
      {
        id: "log-1",
        action: "login",
        type: "login",
        description: "User logged in",
        ipAddress: "192.168.1.1",
        location: "San Francisco, CA",
        device: "MacBook Pro",
        timestamp: new Date(baseTimestamp - 5 * 60 * 1000),
        status: "success",
      },
      {
        id: "log-2",
        action: "profile_update",
        type: "profile_update",
        description: "Profile information updated",
        ipAddress: "192.168.1.1",
        location: "San Francisco, CA",
        device: "MacBook Pro",
        timestamp: new Date(baseTimestamp - 2 * 60 * 60 * 1000),
        status: "success",
      },
      {
        id: "log-3",
        action: "export",
        type: "export",
        description: "Data exported",
        ipAddress: "192.168.1.1",
        location: "San Francisco, CA",
        device: "MacBook Pro",
        timestamp: new Date(baseTimestamp - 7 * 24 * 60 * 60 * 1000),
        status: "success",
      },
    ],
    [baseTimestamp]
  );

  const exampleWebhooks: Webhook[] = useMemo(
    () => [
      {
        id: "webhook-1",
        name: "Payment Notifications",
        url: "https://example.com/webhooks/payment",
        secret: "whsec_1234567890abcdef",
        events: ["payment.succeeded", "payment.failed"],
        status: "active",
        createdAt: new Date(baseTimestamp - 30 * 24 * 60 * 60 * 1000),
        lastTriggered: new Date(baseTimestamp - 2 * 60 * 60 * 1000),
        successCount: 245,
        failureCount: 3,
      },
      {
        id: "webhook-2",
        name: "User Events",
        url: "https://example.com/webhooks/users",
        events: ["user.created", "user.updated"],
        status: "paused",
        createdAt: new Date(baseTimestamp - 14 * 24 * 60 * 60 * 1000),
        successCount: 120,
        failureCount: 0,
      },
    ],
    [baseTimestamp]
  );

  const exampleWebhookDeliveries: Record<string, WebhookDelivery[]> = useMemo(
    () => ({
      "webhook-1": [
        {
          id: "delivery-1",
          webhookId: "webhook-1",
          status: "success",
          responseCode: 200,
          timestamp: new Date(baseTimestamp - 2 * 60 * 60 * 1000),
          payload: '{"event": "payment.succeeded"}',
          response: "OK",
        },
      ],
    }),
    [baseTimestamp]
  );

  const exampleStorageCategories: StorageCategory[] = [
    {
      id: "files",
      name: "Files",
      icon: FileText,
      used: 5 * 1024 * 1024 * 1024,
      total: 10 * 1024 * 1024 * 1024,
      color: "bg-blue-500/10",
    },
    {
      id: "images",
      name: "Images",
      icon: Image,
      used: 2 * 1024 * 1024 * 1024,
      total: 5 * 1024 * 1024 * 1024,
      color: "bg-green-500/10",
    },
  ];

  const exampleDomains: Domain[] = useMemo(
    () => [
      {
        id: "domain-1",
        domain: "example.com",
        status: "verified",
        sslEnabled: true,
        verifiedAt: new Date(baseTimestamp - 30 * 24 * 60 * 60 * 1000),
      },
      {
        id: "domain-2",
        domain: "app.example.com",
        status: "pending",
        sslEnabled: false,
        dnsRecords: [
          {
            type: "CNAME",
            name: "app",
            value: "example.vercel.app",
          },
        ],
      },
    ],
    [baseTimestamp]
  );

  const exampleSSOProviders: SSOProvider[] = useMemo(
    () => [
      {
        id: "sso-1",
        name: "Okta",
        type: "saml",
        enabled: true,
        status: "active",
        metadataUrl: "https://example.okta.com/saml/metadata",
        lastTested: new Date(baseTimestamp - 7 * 24 * 60 * 60 * 1000),
        userCount: 45,
      },
      {
        id: "sso-2",
        name: "Azure AD",
        type: "oidc",
        enabled: false,
        status: "pending",
        lastTested: new Date(baseTimestamp - 14 * 24 * 60 * 60 * 1000),
      },
    ],
    [baseTimestamp]
  );

  const exampleBackups: Backup[] = useMemo(
    () => [
      {
        id: "backup-1",
        name: "Automatic Backup - Daily",
        type: "automatic",
        status: "completed",
        size: 500 * 1024 * 1024,
        createdAt: new Date(baseTimestamp - 24 * 60 * 60 * 1000),
        completedAt: new Date(baseTimestamp - 24 * 60 * 60 * 1000 + 30_000),
        location: "cloud",
        retentionDays: 30,
      },
      {
        id: "backup-2",
        name: "Manual Backup",
        type: "manual",
        status: "completed",
        size: 450 * 1024 * 1024,
        createdAt: new Date(baseTimestamp - 7 * 24 * 60 * 60 * 1000),
        completedAt: new Date(baseTimestamp - 7 * 24 * 60 * 60 * 1000 + 25_000),
        location: "cloud",
      },
      {
        id: "backup-3",
        name: "Automatic Backup - Daily",
        type: "automatic",
        status: "in_progress",
        size: 0,
        createdAt: new Date(baseTimestamp - 5 * 60 * 1000),
        location: "cloud",
      },
    ],
    [baseTimestamp]
  );

  const exampleFeatureFlags: FeatureFlag[] = [
    {
      id: "flag-1",
      name: "New Dashboard",
      description: "Enable the new dashboard interface",
      enabled: true,
      experimental: false,
    },
    {
      id: "flag-2",
      name: "AI Features",
      description: "Enable AI-powered features",
      enabled: false,
      experimental: true,
    },
    {
      id: "flag-3",
      name: "Beta API",
      description: "Enable beta API endpoints",
      enabled: false,
      experimental: true,
    },
  ];

  const exampleAccount: AccountInfo = {
    type: "pro",
    status: "active",
    memberCount: 8,
    memberLimit: 10,
    storageUsed: 15 * 1024 * 1024 * 1024,
    storageLimit: 100 * 1024 * 1024 * 1024,
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-8">
        <SettingsProfile
          onAvatarRemove={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Avatar removed");
          }}
          onAvatarUpload={async (file) => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Avatar uploaded:", file.name);
            return URL.createObjectURL(file);
          }}
          onEmailChange={async (newEmail, currentPassword) => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Email change requested:", newEmail);
            if (currentPassword !== "123") {
              throw new Error("Current password is incorrect");
            }
          }}
          onSave={async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Profile saved:", data);
          }}
          profile={exampleProfile}
          showEmailVerification={true}
        />
        <SettingsPreferences
          onSave={async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Preferences saved:", data);
          }}
        />
        <SettingsPrivacy
          onDeleteAccount={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Account deleted");
          }}
          onEnable2FA={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("2FA enabled");
          }}
          onExportData={async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Data exported");
          }}
          onSave={async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Privacy settings saved:", data);
          }}
        />
        <SettingsNotifications
          onSave={async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Notification preferences saved:", data);
          }}
        />
        <SettingsSecurity
          onDisable2FA={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("2FA disabled");
          }}
          onEnable2FA={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("2FA enabled");
          }}
          onGenerateBackupCodes={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return Array.from(
              { length: 10 },
              (_, i) =>
                `CODE-${i + 1}-${Math.random().toString(36).substring(7).toUpperCase()}`
            );
          }}
          onPasswordChange={async (current, newPassword) => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Password changed");
            if (current !== "password123") {
              throw new Error("Current password is incorrect");
            }
          }}
          onRevokeAllSessions={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("All sessions revoked");
          }}
          onRevokeSession={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Session revoked:", id);
          }}
          securityHistory={exampleSecurityHistory}
          sessions={exampleSecuritySessions}
          twoFactorEnabled={false}
        />
        <SettingsActivityLog
          entries={exampleActivityLog}
          onExport={async (filters) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Exporting activity log:", filters);
          }}
        />
        <SettingsStorage
          categories={exampleStorageCategories}
          onCleanup={async (categoryId) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Cleaning up:", categoryId || "all");
          }}
          totalLimit={100 * 1024 * 1024 * 1024}
          totalUsed={7 * 1024 * 1024 * 1024}
        />
      </div>
      <div className="flex flex-col gap-8">
        <SettingsAccount
          account={exampleAccount}
          onDelete={async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Account deleted");
          }}
          onTransfer={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Account transfer initiated");
          }}
          onUpgrade={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Upgrade initiated");
          }}
        />
        <SettingsIntegrations
          integrations={exampleIntegrations}
          onConnect={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Connecting:", id);
          }}
          onDisconnect={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Disconnecting:", id);
          }}
          onReauthorize={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Reauthorizing:", id);
          }}
        />
        <SettingsAPIKeys
          apiKeys={exampleAPIKeys}
          onCreate={async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Creating API key:", data);
            return {
              id: `key-${Date.now()}`,
              name: data.name,
              key: `sk_${Math.random().toString(36).substring(7)}`,
              createdAt: new Date(),
              scopes: data.scopes,
            };
          }}
          onRegenerate={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Regenerating key:", id);
            return {
              id,
              name: "Regenerated Key",
              key: `sk_${Math.random().toString(36).substring(7)}`,
              createdAt: new Date(),
              scopes: ["read", "write"],
            };
          }}
          onRevoke={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Revoking key:", id);
          }}
        />
        <SettingsBackup
          autoBackupEnabled={true}
          autoBackupSchedule="daily"
          backups={exampleBackups}
          onCreateBackup={async () => {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            console.log("Backup created");
            return {
              id: `backup-${Date.now()}`,
              name: "Manual Backup",
              type: "manual",
              status: "completed",
              size: 500 * 1024 * 1024,
              createdAt: new Date(),
              completedAt: new Date(),
              location: "cloud",
            };
          }}
          onDelete={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Backup deleted:", id);
          }}
          onRestore={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            console.log("Backup restored:", id);
          }}
          onUpdateSettings={async (settings) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Backup settings updated:", settings);
          }}
          retentionDays={30}
          storageLocation="cloud"
        />
        <SettingsAdvanced
          apiRateLimit={1000}
          debugMode={false}
          featureFlags={exampleFeatureFlags}
          loggingLevel="info"
          onClearCache={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Cache cleared");
          }}
          onToggleFeature={async (id, enabled) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Feature toggled:", id, enabled);
          }}
          onUpdateSettings={async (settings) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Advanced settings updated:", settings);
          }}
        />
        <SettingsTeamMembers
          currentUserId="member-1"
          members={exampleTeamMembers}
          onChangeRole={async (id, role) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Changing role:", id, role);
          }}
          onInvite={async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Inviting:", data);
          }}
          onRemove={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Removing member:", id);
          }}
          onTransferOwnership={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Transferring ownership:", id);
          }}
        />
        <SettingsExportData
          exportHistory={exampleExportHistory}
          onDownload={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Downloading export:", id);
          }}
          onExport={async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Exporting:", data);
            return {
              id: `export-${Date.now()}`,
              format: data.format,
              scope: data.scope,
              status: "processing",
              createdAt: new Date(),
            };
          }}
        />
        <SettingsImportData
          importHistory={exampleImportHistory}
          onImport={async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            console.log("Importing:", data);
            return {
              id: `import-${Date.now()}`,
              filename: data.file.name,
              format: data.file.name.endsWith(".json") ? "json" : "csv",
              status: "completed",
              createdAt: new Date(),
              completedAt: new Date(),
              recordsImported: 100,
            };
          }}
          onUpload={async (file) => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Uploading:", file.name);
            return {
              totalRecords: 150,
              categories: {
                profile: 1,
                activity: 50,
                messages: 99,
              },
              conflicts: 5,
              fields: ["id", "name", "email", "createdAt"],
            };
          }}
        />
        <SettingsWebhooks
          deliveries={exampleWebhookDeliveries}
          onCreate={async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Creating webhook:", data);
            return {
              id: `webhook-${Date.now()}`,
              name: data.name,
              url: data.url,
              events: data.events,
              status: "active",
              createdAt: new Date(),
              successCount: 0,
              failureCount: 0,
            };
          }}
          onDelete={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Deleting webhook:", id);
          }}
          onTest={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Testing webhook:", id);
          }}
          onToggleStatus={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Toggling webhook status:", id);
          }}
          onUpdate={async (id, data) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Updating webhook:", id, data);
          }}
          webhooks={exampleWebhooks}
        />
        <SettingsDomains
          domains={exampleDomains}
          onCreate={async (domain) => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Adding domain:", domain);
            return {
              id: `domain-${Date.now()}`,
              domain,
              status: "pending",
              sslEnabled: false,
              dnsRecords: [
                {
                  type: "CNAME",
                  name: domain.split(".")[0],
                  value: "example.vercel.app",
                },
              ],
            };
          }}
          onDelete={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Deleting domain:", id);
          }}
          onToggleSSL={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Toggling SSL:", id);
          }}
          onVerify={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Verifying domain:", id);
          }}
        />
        <SettingsSSO
          enabled={true}
          onCreate={async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Creating SSO provider:", data);
            return {
              id: `sso-${Date.now()}`,
              name: data.name,
              type: data.type,
              enabled: false,
              status: "pending",
            };
          }}
          onDelete={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Deleting SSO provider:", id);
          }}
          onTest={async (id) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Testing SSO connection:", id);
          }}
          onToggle={async (enabled) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Toggling SSO:", enabled);
          }}
          onUpdate={async (id, data) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Updating SSO provider:", id, data);
          }}
          providers={exampleSSOProviders}
        />
      </div>
    </div>
  );
}

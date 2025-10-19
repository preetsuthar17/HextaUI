"use client";

import {
  Check,
  CheckCircle,
  Clock,
  Database,
  ExternalLink,
  Globe,
  Key,
  Plus,
  RefreshCw,
  Save,
  Shield,
  Trash2,
  Webhook,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface IntegrationData {
  thirdParty: {
    enabled: boolean;
    connections: Array<{
      id: string;
      name: string;
      type: string;
      status: "connected" | "disconnected" | "error";
      lastSync: string;
      permissions: string[];
    }>;
  };
  apiIntegrations: {
    enabled: boolean;
    endpoints: Array<{
      id: string;
      name: string;
      url: string;
      method: string;
      status: "active" | "inactive" | "error";
      lastCall: string;
    }>;
  };
  webhooks: {
    enabled: boolean;
    endpoints: Array<{
      id: string;
      name: string;
      url: string;
      events: string[];
      status: "active" | "inactive" | "error";
      lastTriggered: string;
    }>;
  };
  oauth: {
    enabled: boolean;
    providers: Array<{
      id: string;
      name: string;
      clientId: string;
      status: "active" | "inactive" | "error";
      scopes: string[];
    }>;
  };
  dataSync: {
    enabled: boolean;
    frequency: string;
    direction: string;
    conflictResolution: string;
    autoSync: boolean;
  };
}

const SwitchField = ({
  id,
  label,
  description,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex flex-col gap-1">
      <Label className="font-medium" htmlFor={id}>
        {label}
      </Label>
      <p className="text-muted-foreground text-sm" id={`${id}-description`}>
        {description}
      </p>
    </div>
    <Switch
      aria-describedby={`${id}-description`}
      aria-label={label}
      checked={checked}
      id={id}
      onCheckedChange={onCheckedChange}
      role="switch"
      tabIndex={0}
    />
  </div>
);

const ConditionalField = ({
  condition,
  children,
}: {
  condition: boolean;
  children: React.ReactNode;
}) => {
  if (!condition) return null;

  return (
    <div
      aria-hidden="false"
      aria-label="Additional settings"
      className="ml-3flex flex-col gap-6 border-muted border-l-2 pl-5"
      role="region"
    >
      {children}
    </div>
  );
};

const ThirdPartyConnections = () => {
  const [connections, setConnections] = React.useState([
    {
      id: "1",
      name: "Google Workspace",
      type: "OAuth",
      status: "connected" as const,
      lastSync: "2024-01-15T10:30:00Z",
      permissions: ["read:calendar", "write:contacts"],
    },
    {
      id: "2",
      name: "Slack",
      type: "OAuth",
      status: "connected" as const,
      lastSync: "2024-01-15T09:15:00Z",
      permissions: ["read:messages", "write:channels"],
    },
    {
      id: "3",
      name: "Microsoft 365",
      type: "OAuth",
      status: "error" as const,
      lastSync: "2024-01-14T16:45:00Z",
      permissions: ["read:mail", "write:calendar"],
    },
  ]);

  const disconnectConnection = (id: string) => {
    setConnections((prev) => prev.filter((conn) => conn.id !== id));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="size-4 text-green-500" />;
      case "error":
        return <XCircle className="size-4 text-red-500" />;
      default:
        return <Clock className="size-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="w-fit text-xs" variant="default">
            Connected
          </Badge>
        );
      case "error":
        return (
          <Badge className="w-fit text-xs" variant="destructive">
            Error
          </Badge>
        );
      default:
        return (
          <Badge className="w-fit text-xs" variant="secondary">
            Disconnected
          </Badge>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold text-lg">Third-Party Connections</h3>
          <p className="text-muted-foreground text-sm">
            Manage your connected third-party applications
          </p>
        </div>
        <Button className="w-full sm:w-auto" size="sm" type="button">
          <Plus aria-hidden="true" className="size-4" focusable="false" />
          Add Connection
        </Button>
      </div>

      <div
        aria-label="Third-party connections list"
        className="flex flex-col gap-4"
        role="list"
      >
        {connections.map((connection) => (
          <Card className="p-0 shadow-none" key={connection.id} role="listitem">
            <CardContent className="flex flex-col gap-4 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(connection.status)}
                      <h4 className="font-medium">{connection.name}</h4>
                    </div>
                    {getStatusBadge(connection.status)}
                  </div>
                  <div className="flex flex-col gap-1 text-muted-foreground text-sm">
                    <p>
                      <span className="font-medium">Type:</span>{" "}
                      {connection.type}
                    </p>
                    <p>
                      <span className="font-medium">Last sync:</span>{" "}
                      {
                        new Date(connection.lastSync)
                          .toISOString()
                          .split("T")[0]
                      }
                    </p>
                    <p>
                      <span className="font-medium">Permissions:</span>{" "}
                      {connection.permissions.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <Button
                    aria-label="View connection details"
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <ExternalLink
                      aria-hidden="true"
                      className="size-4"
                      focusable="false"
                    />
                  </Button>
                  <Button
                    aria-label="Disconnect integration"
                    onClick={() => disconnectConnection(connection.id)}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <Trash2
                      aria-hidden="true"
                      className="size-4"
                      focusable="false"
                    />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ApiIntegrations = () => {
  const [endpoints, setEndpoints] = React.useState([
    {
      id: "1",
      name: "CRM Integration",
      url: "https://api.crm.com/v1/contacts",
      method: "POST",
      status: "active" as const,
      lastCall: "2024-01-15T11:20:00Z",
    },
    {
      id: "2",
      name: "Analytics API",
      url: "https://analytics.api.com/events",
      method: "GET",
      status: "active" as const,
      lastCall: "2024-01-15T10:45:00Z",
    },
    {
      id: "3",
      name: "Payment Gateway",
      url: "https://payments.api.com/transactions",
      method: "POST",
      status: "error" as const,
      lastCall: "2024-01-14T14:30:00Z",
    },
  ]);

  const deleteEndpoint = (id: string) => {
    setEndpoints((prev) => prev.filter((endpoint) => endpoint.id !== id));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="size-4 text-green-500" />;
      case "error":
        return <XCircle className="size-4 text-red-500" />;
      default:
        return <Clock className="size-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="w-fit text-xs" variant="default">
            Active
          </Badge>
        );
      case "error":
        return (
          <Badge className="w-fit text-xs" variant="destructive">
            Error
          </Badge>
        );
      default:
        return (
          <Badge className="w-fit text-xs" variant="secondary">
            Inactive
          </Badge>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold text-lg">API Integrations</h3>
          <p className="text-muted-foreground text-sm">
            Configure external API endpoints and integrations
          </p>
        </div>
        <Button className="w-full sm:w-auto" size="sm" type="button">
          <Plus aria-hidden="true" className="size-4" focusable="false" />
          Add Integration
        </Button>
      </div>

      <div
        aria-label="API integrations list"
        className="flex flex-col gap-4"
        role="list"
      >
        {endpoints.map((endpoint) => (
          <Card className="p-0 shadow-none" key={endpoint.id} role="listitem">
            <CardContent className="flex flex-col gap-4 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(endpoint.status)}
                      <h4 className="font-medium">{endpoint.name}</h4>
                    </div>
                    {getStatusBadge(endpoint.status)}
                  </div>
                  <div className="flex flex-col gap-1 text-muted-foreground text-sm">
                    <p>
                      <span className="font-medium">URL:</span> {endpoint.url}
                    </p>
                    <p>
                      <span className="font-medium">Method:</span>{" "}
                      {endpoint.method}
                    </p>
                    <p>
                      <span className="font-medium">Last call:</span>{" "}
                      {new Date(endpoint.lastCall).toISOString().split("T")[0]}
                    </p>
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <Button
                    aria-label="Test API endpoint"
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <Zap
                      aria-hidden="true"
                      className="size-4"
                      focusable="false"
                    />
                  </Button>
                  <Button
                    aria-label="Delete API integration"
                    onClick={() => deleteEndpoint(endpoint.id)}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <Trash2
                      aria-hidden="true"
                      className="size-4"
                      focusable="false"
                    />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const WebhookConfigurations = () => {
  const [webhooks, setWebhooks] = React.useState([
    {
      id: "1",
      name: "User Registration",
      url: "https://webhook.site/abc123",
      events: ["user.created", "user.updated"],
      status: "active" as const,
      lastTriggered: "2024-01-15T12:00:00Z",
    },
    {
      id: "2",
      name: "Order Processing",
      url: "https://api.store.com/webhooks/orders",
      events: ["order.created", "order.completed"],
      status: "active" as const,
      lastTriggered: "2024-01-15T11:30:00Z",
    },
    {
      id: "3",
      name: "Payment Notifications",
      url: "https://payments.webhook.com/notify",
      events: ["payment.success", "payment.failed"],
      status: "error" as const,
      lastTriggered: "2024-01-14T15:20:00Z",
    },
  ]);

  const toggleWebhook = (id: string) => {
    setWebhooks((prev) =>
      prev.map((webhook) =>
        webhook.id === id
          ? {
              ...webhook,
              status: webhook.status === "active" ? "error" : "active",
            }
          : webhook
      )
    );
  };

  const deleteWebhook = (id: string) => {
    setWebhooks((prev) => prev.filter((webhook) => webhook.id !== id));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="size-4 text-green-500" />;
      case "error":
        return <XCircle className="size-4 text-red-500" />;
      default:
        return <Clock className="size-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="w-fit text-xs" variant="default">
            Active
          </Badge>
        );
      case "error":
        return (
          <Badge className="w-fit text-xs" variant="destructive">
            Error
          </Badge>
        );
      default:
        return (
          <Badge className="w-fit text-xs" variant="secondary">
            Inactive
          </Badge>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold text-lg">Webhook Endpoints</h3>
          <p className="text-muted-foreground text-sm">
            Configure webhook endpoints to receive real-time events
          </p>
        </div>
        <Button className="w-full sm:w-auto" size="sm" type="button">
          <Plus aria-hidden="true" className="size-4" focusable="false" />
          Add Webhook
        </Button>
      </div>

      <div
        aria-label="Webhook endpoints list"
        className="flex flex-col gap-4"
        role="list"
      >
        {webhooks.map((webhook) => (
          <Card className="p-0 shadow-none" key={webhook.id} role="listitem">
            <CardContent className="flex flex-col gap-4 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(webhook.status)}
                      <h4 className="font-medium">{webhook.name}</h4>
                    </div>
                    {getStatusBadge(webhook.status)}
                  </div>
                  <div className="flex flex-col gap-1 text-muted-foreground text-sm">
                    <p>
                      <span className="font-medium">URL:</span> {webhook.url}
                    </p>
                    <p>
                      <span className="font-medium">Events:</span>{" "}
                      {webhook.events.join(", ")}
                    </p>
                    <p>
                      <span className="font-medium">Last triggered:</span>{" "}
                      {
                        new Date(webhook.lastTriggered)
                          .toISOString()
                          .split("T")[0]
                      }
                    </p>
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <Button
                    aria-label={`${webhook.status === "active" ? "Disable" : "Enable"} webhook`}
                    onClick={() => toggleWebhook(webhook.id)}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    {webhook.status === "active" ? (
                      <X
                        aria-hidden="true"
                        className="size-4"
                        focusable="false"
                      />
                    ) : (
                      <Check
                        aria-hidden="true"
                        className="size-4"
                        focusable="false"
                      />
                    )}
                  </Button>
                  <Button
                    aria-label="Delete webhook"
                    onClick={() => deleteWebhook(webhook.id)}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <Trash2
                      aria-hidden="true"
                      className="size-4"
                      focusable="false"
                    />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const OAuthConnections = () => {
  const [providers, setProviders] = React.useState([
    {
      id: "1",
      name: "Google OAuth",
      clientId: "123456789-abc123.apps.googleusercontent.com",
      status: "active" as const,
      scopes: ["openid", "profile", "email"],
    },
    {
      id: "2",
      name: "GitHub OAuth",
      clientId: "ghp_1234567890abcdef",
      status: "active" as const,
      scopes: ["user:email", "repo"],
    },
    {
      id: "3",
      name: "Microsoft OAuth",
      clientId: "ms-12345678-1234-1234-1234-123456789012",
      status: "error" as const,
      scopes: ["User.Read", "Mail.Read"],
    },
  ]);

  const deleteProvider = (id: string) => {
    setProviders((prev) => prev.filter((provider) => provider.id !== id));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="size-4 text-green-500" />;
      case "error":
        return <XCircle className="size-4 text-red-500" />;
      default:
        return <Clock className="size-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="w-fit text-xs" variant="default">
            Active
          </Badge>
        );
      case "error":
        return (
          <Badge className="w-fit text-xs" variant="destructive">
            Error
          </Badge>
        );
      default:
        return (
          <Badge className="w-fit text-xs" variant="secondary">
            Inactive
          </Badge>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold text-lg">OAuth Providers</h3>
          <p className="text-muted-foreground text-sm">
            Manage OAuth authentication providers and configurations
          </p>
        </div>
        <Button className="w-full sm:w-auto" size="sm" type="button">
          <Plus aria-hidden="true" className="size-4" focusable="false" />
          Add Provider
        </Button>
      </div>

      <div
        aria-label="OAuth providers list"
        className="flex flex-col gap-4"
        role="list"
      >
        {providers.map((provider) => (
          <Card className="p-0 shadow-none" key={provider.id} role="listitem">
            <CardContent className="flex flex-col gap-4 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(provider.status)}
                      <h4 className="font-medium">{provider.name}</h4>
                    </div>
                    {getStatusBadge(provider.status)}
                  </div>
                  <div className="flex flex-col gap-1 text-muted-foreground text-sm">
                    <p>
                      <span className="font-medium">Client ID:</span>{" "}
                      {provider.clientId}
                    </p>
                    <p>
                      <span className="font-medium">Scopes:</span>{" "}
                      {provider.scopes.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <Button
                    aria-label="Test OAuth connection"
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <Shield
                      aria-hidden="true"
                      className="size-4"
                      focusable="false"
                    />
                  </Button>
                  <Button
                    aria-label="Delete OAuth provider"
                    onClick={() => deleteProvider(provider.id)}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <Trash2
                      aria-hidden="true"
                      className="size-4"
                      focusable="false"
                    />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const IntegrationsSettings = ({ className }: { className?: string }) => {
  const [integrationData, setIntegrationData] = React.useState<IntegrationData>(
    {
      thirdParty: {
        enabled: true,
        connections: [],
      },
      apiIntegrations: {
        enabled: true,
        endpoints: [],
      },
      webhooks: {
        enabled: true,
        endpoints: [],
      },
      oauth: {
        enabled: true,
        providers: [],
      },
      dataSync: {
        enabled: true,
        frequency: "realtime",
        direction: "bidirectional",
        conflictResolution: "server-wins",
        autoSync: true,
      },
    }
  );

  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  const handleNestedChange = (category: string, field: string, value: any) => {
    setIntegrationData((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof IntegrationData] as any),
        [field]: value,
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSaveSuccess(true);
    setHasUnsavedChanges(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCancel = () => {
    setHasUnsavedChanges(false);
  };

  const handleResetToDefaults = () => {
    setIntegrationData({
      thirdParty: {
        enabled: true,
        connections: [],
      },
      apiIntegrations: {
        enabled: true,
        endpoints: [],
      },
      webhooks: {
        enabled: true,
        endpoints: [],
      },
      oauth: {
        enabled: true,
        providers: [],
      },
      dataSync: {
        enabled: true,
        frequency: "realtime",
        direction: "bidirectional",
        conflictResolution: "server-wins",
        autoSync: true,
      },
    });
    setHasUnsavedChanges(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      handleCancel();
    } else if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      handleSave();
    }
  };

  const frequencies = [
    { value: "realtime", label: "Real-time" },
    { value: "hourly", label: "Hourly" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "manual", label: "Manual" },
  ];

  const directions = [
    { value: "inbound", label: "Inbound only" },
    { value: "outbound", label: "Outbound only" },
    { value: "bidirectional", label: "Bidirectional" },
  ];

  const conflictResolutions = [
    { value: "server-wins", label: "Server wins" },
    { value: "client-wins", label: "Client wins" },
    { value: "merge", label: "Merge conflicts" },
    { value: "manual", label: "Manual resolution" },
  ];

  return (
    <main
      aria-label="Integrations settings"
      className={cn("mx-auto flex w-full flex-col gap-8", className)}
      onKeyDown={handleKeyDown}
      role="main"
      tabIndex={-1}
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-3xl text-foreground">
            Integrations Settings
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage third-party connections, APIs, and data synchronization
          </p>
        </div>
      </div>

      {/* Status Messages */}
      <div aria-atomic="true" aria-live="polite" className="sr-only">
        {isSaving && "Saving integration settings..."}
        {saveSuccess && "Integration settings saved successfully"}
        {hasUnsavedChanges && "You have unsaved changes"}
      </div>

      {/* Third-Party Connections */}
      <Card className="gap-6 p-4 shadow-none md:p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <Globe aria-hidden="true" className="size-5" focusable="false" />
            Third-Party Connections
          </CardTitle>
          <CardDescription>
            Connect and manage external applications and services
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col gap-6">
            <SwitchField
              checked={integrationData.thirdParty.enabled}
              description="Allow connections to third-party applications"
              id="thirdParty-enabled"
              label="Enable Third-Party Connections"
              onCheckedChange={(checked) =>
                handleNestedChange("thirdParty", "enabled", checked)
              }
            />

            <ConditionalField condition={integrationData.thirdParty.enabled}>
              <ThirdPartyConnections />
            </ConditionalField>
          </div>
        </CardContent>
      </Card>

      {/* API Integrations */}
      <Card className="gap-6 p-4 shadow-none md:p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <Key aria-hidden="true" className="size-5" focusable="false" />
            API Integrations
          </CardTitle>
          <CardDescription>
            Configure external API endpoints and data exchange
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col gap-6">
            <SwitchField
              checked={integrationData.apiIntegrations.enabled}
              description="Enable API integrations with external services"
              id="apiIntegrations-enabled"
              label="Enable API Integrations"
              onCheckedChange={(checked) =>
                handleNestedChange("apiIntegrations", "enabled", checked)
              }
            />

            <ConditionalField
              condition={integrationData.apiIntegrations.enabled}
            >
              <ApiIntegrations />
            </ConditionalField>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Configurations */}
      <Card className="gap-6 p-4 shadow-none md:p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <Webhook aria-hidden="true" className="size-5" focusable="false" />
            Webhook Configurations
          </CardTitle>
          <CardDescription>
            Set up webhook endpoints to receive real-time notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col gap-6">
            <SwitchField
              checked={integrationData.webhooks.enabled}
              description="Enable webhook endpoints for real-time events"
              id="webhooks-enabled"
              label="Enable Webhooks"
              onCheckedChange={(checked) =>
                handleNestedChange("webhooks", "enabled", checked)
              }
            />

            <ConditionalField condition={integrationData.webhooks.enabled}>
              <WebhookConfigurations />
            </ConditionalField>
          </div>
        </CardContent>
      </Card>

      {/* OAuth Connections */}
      <Card className="gap-6 p-4 shadow-none md:p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <Shield aria-hidden="true" className="size-5" focusable="false" />
            OAuth Connections
          </CardTitle>
          <CardDescription>
            Manage OAuth providers for secure authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col gap-6">
            <SwitchField
              checked={integrationData.oauth.enabled}
              description="Enable OAuth authentication providers"
              id="oauth-enabled"
              label="Enable OAuth"
              onCheckedChange={(checked) =>
                handleNestedChange("oauth", "enabled", checked)
              }
            />

            <ConditionalField condition={integrationData.oauth.enabled}>
              <OAuthConnections />
            </ConditionalField>
          </div>
        </CardContent>
      </Card>

      {/* Data Sync Settings */}
      <Card className="gap-6 p-4 shadow-none md:p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <Database aria-hidden="true" className="size-5" focusable="false" />
            Data Sync Settings
          </CardTitle>
          <CardDescription>
            Configure data synchronization preferences and behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col gap-6">
            <SwitchField
              checked={integrationData.dataSync.enabled}
              description="Enable automatic data synchronization"
              id="dataSync-enabled"
              label="Enable Data Sync"
              onCheckedChange={(checked) =>
                handleNestedChange("dataSync", "enabled", checked)
              }
            />

            <ConditionalField condition={integrationData.dataSync.enabled}>
              <div className="flex flex-col gap-6 border-muted">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="syncFrequency">Sync Frequency</Label>
                    <Select
                      onValueChange={(value) =>
                        handleNestedChange("dataSync", "frequency", value)
                      }
                      value={integrationData.dataSync.frequency}
                    >
                      <SelectTrigger
                        aria-describedby="syncFrequency-description"
                        aria-label="Select sync frequency"
                        aria-required="true"
                        className="h-10"
                      >
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {frequencies.map((freq) => (
                          <SelectItem key={freq.value} value={freq.value}>
                            {freq.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p
                      className="text-muted-foreground text-sm"
                      id="syncFrequency-description"
                    >
                      How often to synchronize data with external systems
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label htmlFor="syncDirection">Sync Direction</Label>
                    <Select
                      onValueChange={(value) =>
                        handleNestedChange("dataSync", "direction", value)
                      }
                      value={integrationData.dataSync.direction}
                    >
                      <SelectTrigger
                        aria-describedby="syncDirection-description"
                        aria-label="Select sync direction"
                        aria-required="true"
                        className="h-10"
                      >
                        <SelectValue placeholder="Select direction" />
                      </SelectTrigger>
                      <SelectContent>
                        {directions.map((dir) => (
                          <SelectItem key={dir.value} value={dir.value}>
                            {dir.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p
                      className="text-muted-foreground text-sm"
                      id="syncDirection-description"
                    >
                      Direction of data synchronization
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="conflictResolution">
                    Conflict Resolution
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleNestedChange(
                        "dataSync",
                        "conflictResolution",
                        value
                      )
                    }
                    value={integrationData.dataSync.conflictResolution}
                  >
                    <SelectTrigger
                      aria-describedby="conflictResolution-description"
                      aria-label="Select conflict resolution strategy"
                      aria-required="true"
                      className="h-10"
                    >
                      <SelectValue placeholder="Select resolution strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      {conflictResolutions.map((resolution) => (
                        <SelectItem
                          key={resolution.value}
                          value={resolution.value}
                        >
                          {resolution.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p
                    className="text-muted-foreground text-sm"
                    id="conflictResolution-description"
                  >
                    How to handle data conflicts during synchronization
                  </p>
                </div>

                <SwitchField
                  checked={integrationData.dataSync.autoSync}
                  description="Automatically sync data when changes are detected"
                  id="autoSync"
                  label="Auto Sync"
                  onCheckedChange={(checked) =>
                    handleNestedChange("dataSync", "autoSync", checked)
                  }
                />
              </div>
            </ConditionalField>
          </div>
        </CardContent>
      </Card>

      {/* Footer Actions */}
      <Card className="gap-6 p-4 shadow-none md:p-6">
        <CardFooter className="flex flex-col gap-3 p-0 sm:flex-row">
          <div className="flex w-full flex-wrap gap-3">
            <Button
              aria-describedby="save-button-description"
              aria-label={
                isSaving
                  ? "Saving changes"
                  : saveSuccess
                    ? "Changes saved"
                    : "Save integration settings"
              }
              className="w-full sm:w-auto"
              disabled={!hasUnsavedChanges || isSaving}
              onClick={handleSave}
              type="button"
            >
              {isSaving ? (
                <>
                  <div
                    aria-hidden="true"
                    className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                  />
                  Saving...
                </>
              ) : saveSuccess ? (
                <>
                  <Check
                    aria-hidden="true"
                    className="size-4"
                    focusable="false"
                  />
                  Saved!
                </>
              ) : (
                <>
                  <Save
                    aria-hidden="true"
                    className="size-4"
                    focusable="false"
                  />
                  Save Changes
                </>
              )}
            </Button>
            <p className="sr-only" id="save-button-description">
              {isSaving
                ? "Saving your integration settings"
                : saveSuccess
                  ? "Your settings have been saved"
                  : "Save your integration settings"}
            </p>
            {hasUnsavedChanges && (
              <Button
                aria-label="Cancel changes and revert to saved settings"
                className="w-full sm:w-auto"
                onClick={handleCancel}
                type="button"
                variant="outline"
              >
                <X aria-hidden="true" className="size-4" focusable="false" />
                Cancel
              </Button>
            )}
            <Button
              aria-label="Reset all integration settings to default values"
              className="w-full sm:w-auto"
              onClick={handleResetToDefaults}
              type="button"
              variant="outline"
            >
              <RefreshCw
                aria-hidden="true"
                className="size-4"
                focusable="false"
              />
              Reset to Defaults
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default IntegrationsSettings;

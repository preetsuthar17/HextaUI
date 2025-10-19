"use client";

import {
  Check,
  Code,
  Copy,
  Eye,
  EyeOff,
  Key,
  Plus,
  RefreshCw,
  Save,
  Settings,
  Trash2,
  Webhook,
  X,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  lastUsed: string;
  createdAt: string;
  expiresAt?: string;
}

interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  secret: string;
  isActive: boolean;
  lastTriggered?: string;
  createdAt: string;
}

interface ApiData {
  keys: {
    enabled: boolean;
    maxKeys: number;
    keyExpiration: string;
    rotationEnabled: boolean;
    rotationInterval: string;
  };
  rateLimits: {
    enabled: boolean;
    requestsPerMinute: number;
    requestsPerHour: number;
    requestsPerDay: number;
    burstLimit: number;
  };
  webhooks: {
    enabled: boolean;
    maxEndpoints: number;
    timeoutSeconds: number;
    retryAttempts: number;
    retryDelay: number;
  };
  sdk: {
    enabled: boolean;
    supportedLanguages: string[];
    autoUpdate: boolean;
    versionPinning: boolean;
  };
  developer: {
    debugMode: boolean;
    logging: boolean;
    analytics: boolean;
    errorReporting: boolean;
  };
}

interface ApiSettingsProps {
  className?: string;
  onSave?: (data: ApiData) => Promise<void>;
  onReset?: () => Promise<void>;
}

// Switch Field Component
function SwitchField({
  id,
  label,
  description,
  checked,
  onCheckedChange,
  disabled = false,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
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
        aria-label={`${label}: ${description}`}
        checked={checked}
        disabled={disabled}
        id={id}
        onCheckedChange={onCheckedChange}
        role="switch"
        tabIndex={0}
      />
    </div>
  );
}

// Conditional Field Component
function ConditionalField({
  condition,
  children,
}: {
  condition: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden={!condition}
      className={condition ? "block" : "hidden"}
      role="region"
    >
      {condition && children}
    </div>
  );
}

// API Key Management Component
function ApiKeyManagement() {
  const [apiKeys, setApiKeys] = React.useState<ApiKey[]>([
    {
      id: "1",
      name: "Production API Key",
      key: "sk-prod-1234567890abcdef",
      permissions: ["read", "write"],
      lastUsed: "2024-01-15T10:30:00Z",
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "2",
      name: "Development API Key",
      key: "sk-dev-abcdef1234567890",
      permissions: ["read"],
      lastUsed: "2024-01-14T15:45:00Z",
      createdAt: "2024-01-05T00:00:00Z",
      expiresAt: "2024-12-31T23:59:59Z",
    },
  ]);

  const [showKeys, setShowKeys] = React.useState<Record<string, boolean>>({});

  const toggleKeyVisibility = (id: string) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
  };

  const deleteKey = (id: string) => {
    setApiKeys((prev) => prev.filter((key) => key.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-semibold text-lg">API Keys</h3>
          <p className="text-muted-foreground text-sm">
            Manage your API keys and their permissions
          </p>
        </div>
        <Button size="sm" type="button">
          <Plus aria-hidden="true" className="size-4" focusable="false" />
          Add Key
        </Button>
      </div>

      <div
        aria-label="API keys list"
        className="flex flex-col gap-4"
        role="list"
      >
        {apiKeys.map((key) => (
          <Card className="shadow-none" key={key.id} role="listitem">
            <CardContent className="flex flex-col gap-4 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <h4 className="font-medium">{key.name}</h4>
                    <Badge className="w-fit text-xs" variant="secondary">
                      {key.permissions.join(", ")}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-1 text-muted-foreground text-sm">
                    <p>
                      <span className="font-medium">Created:</span>{" "}
                      {new Date(key.createdAt).toISOString().split("T")[0]}
                    </p>
                    {key.lastUsed && (
                      <p>
                        <span className="font-medium">Last used:</span>{" "}
                        {new Date(key.lastUsed).toISOString().split("T")[0]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <Button
                    aria-label={`${showKeys[key.id] ? "Hide" : "Show"} API key`}
                    onClick={() => toggleKeyVisibility(key.id)}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    {showKeys[key.id] ? (
                      <EyeOff
                        aria-hidden="true"
                        className="size-4"
                        focusable="false"
                      />
                    ) : (
                      <Eye
                        aria-hidden="true"
                        className="size-4"
                        focusable="false"
                      />
                    )}
                  </Button>
                  <Button
                    aria-label="Copy API key"
                    onClick={() => copyKey(key.key)}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <Copy
                      aria-hidden="true"
                      className="size-4"
                      focusable="false"
                    />
                  </Button>
                  <Button
                    aria-label="Delete API key"
                    onClick={() => deleteKey(key.id)}
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

              <div className="flex items-center gap-2">
                <Input
                  aria-label="API key value"
                  className="font-mono text-sm"
                  readOnly
                  value={
                    showKeys[key.id]
                      ? key.key
                      : "••••••••••••••••••••••••••••••••"
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Webhook Management Component
function WebhookManagement() {
  const [webhooks, setWebhooks] = React.useState<WebhookEndpoint[]>([
    {
      id: "1",
      url: "https://api.example.com/webhooks/events",
      events: ["user.created", "user.updated"],
      secret: "whsec_1234567890abcdef",
      isActive: true,
      lastTriggered: "2024-01-15T09:15:00Z",
      createdAt: "2024-01-01T00:00:00Z",
    },
  ]);

  const toggleWebhook = (id: string) => {
    setWebhooks((prev) =>
      prev.map((webhook) =>
        webhook.id === id
          ? { ...webhook, isActive: !webhook.isActive }
          : webhook
      )
    );
  };

  const deleteWebhook = (id: string) => {
    setWebhooks((prev) => prev.filter((webhook) => webhook.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-semibold text-lg">Webhook Endpoints</h3>
          <p className="text-muted-foreground text-sm">
            Configure webhook endpoints to receive real-time events
          </p>
        </div>
        <Button size="sm" type="button">
          <Plus aria-hidden="true" className="size-4" focusable="false" />
          Add Endpoint
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
                {/* CONTENT */}
                <div className="flex flex-col gap-2 sm:min-w-0 sm:flex-[2]">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
                    <h4 className="text-wrap break-all font-medium">
                      {webhook.url}
                    </h4>
                    <Badge
                      className="w-fit text-xs"
                      variant={webhook.isActive ? "default" : "secondary"}
                    >
                      {webhook.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-1 text-muted-foreground text-sm">
                    <p>
                      <span className="font-medium">Events:</span>{" "}
                      <span className="break-words">
                        {webhook.events.join(", ")}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Created:</span>{" "}
                      {new Date(webhook.createdAt).toISOString().split("T")[0]}
                    </p>
                    {webhook.lastTriggered && (
                      <p>
                        <span className="font-medium">Last triggered:</span>{" "}
                        {
                          new Date(webhook.lastTriggered)
                            .toISOString()
                            .split("T")[0]
                        }
                      </p>
                    )}
                  </div>
                </div>
                {/* BUTTONS - always stay at the end, wrap below on small screens */}
                <div className="flex flex-row items-center gap-2 pt-2 sm:flex-shrink-0 sm:self-start sm:pt-0 md:flex-row">
                  <Button
                    aria-label={`${webhook.isActive ? "Disable" : "Enable"} webhook`}
                    onClick={() => toggleWebhook(webhook.id)}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    {webhook.isActive ? (
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
}

export default function ApiSettings({
  className,
  onSave,
  onReset,
}: ApiSettingsProps) {
  const [apiData, setApiData] = React.useState<ApiData>({
    keys: {
      enabled: true,
      maxKeys: 10,
      keyExpiration: "1year",
      rotationEnabled: false,
      rotationInterval: "30days",
    },
    rateLimits: {
      enabled: true,
      requestsPerMinute: 60,
      requestsPerHour: 1000,
      requestsPerDay: 10_000,
      burstLimit: 100,
    },
    webhooks: {
      enabled: true,
      maxEndpoints: 5,
      timeoutSeconds: 30,
      retryAttempts: 3,
      retryDelay: 5,
    },
    sdk: {
      enabled: true,
      supportedLanguages: ["javascript", "python", "java", "csharp"],
      autoUpdate: true,
      versionPinning: false,
    },
    developer: {
      debugMode: false,
      logging: true,
      analytics: true,
      errorReporting: true,
    },
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // Keyboard navigation support
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" && hasUnsavedChanges) {
      handleCancel();
    }
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      if (hasUnsavedChanges && !isSaving) {
        handleSave();
      }
    }
  };

  const handleNestedChange = (
    category: keyof ApiData,
    field: string,
    value: any
  ) => {
    setApiData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
    setHasUnsavedChanges(true);

    // Clear error when user makes changes
    const errorKey = `${category}-${field}`;
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: "" }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onSave) {
        await onSave(apiData);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      setSaveSuccess(true);
      setHasUnsavedChanges(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setHasUnsavedChanges(false);
    setErrors({});
  };

  const handleResetToDefaults = async () => {
    try {
      if (onReset) {
        await onReset();
      }
      setApiData({
        keys: {
          enabled: true,
          maxKeys: 10,
          keyExpiration: "1year",
          rotationEnabled: false,
          rotationInterval: "30days",
        },
        rateLimits: {
          enabled: true,
          requestsPerMinute: 60,
          requestsPerHour: 1000,
          requestsPerDay: 10_000,
          burstLimit: 100,
        },
        webhooks: {
          enabled: true,
          maxEndpoints: 5,
          timeoutSeconds: 30,
          retryAttempts: 3,
          retryDelay: 5,
        },
        sdk: {
          enabled: true,
          supportedLanguages: ["javascript", "python", "java", "csharp"],
          autoUpdate: true,
          versionPinning: false,
        },
        developer: {
          debugMode: false,
          logging: true,
          analytics: true,
          errorReporting: true,
        },
      });
      setHasUnsavedChanges(true);
    } catch (error) {
      console.error("Failed to reset settings:", error);
    }
  };

  const keyExpirationOptions = [
    { value: "30days", label: "30 Days" },
    { value: "90days", label: "90 Days" },
    { value: "1year", label: "1 Year" },
    { value: "2years", label: "2 Years" },
    { value: "never", label: "Never" },
  ];

  const rotationIntervalOptions = [
    { value: "7days", label: "7 Days" },
    { value: "30days", label: "30 Days" },
    { value: "90days", label: "90 Days" },
    { value: "1year", label: "1 Year" },
  ];

  const supportedLanguages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
  ];

  return (
    <main
      aria-label="API and developer settings"
      className={cn("mx-auto flex w-full flex-col gap-8", className)}
      onKeyDown={handleKeyDown}
      role="main"
      tabIndex={-1}
    >
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-3xl text-foreground">
            API & Developer Settings
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage API keys, rate limits, webhooks, and developer tools
          </p>
        </div>
      </header>

      {/* Status Messages */}
      <div aria-atomic="true" aria-live="polite" className="sr-only">
        {isSaving && "Saving API settings..."}
        {saveSuccess && "API settings saved successfully"}
        {hasUnsavedChanges && "You have unsaved changes"}
      </div>

      {/* API Keys Management */}
      <Card className="gap-6 p-4 shadow-none md:p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <Key aria-hidden="true" className="size-5" focusable="false" />
            API Keys Management
          </CardTitle>
          <CardDescription>
            Create and manage API keys for secure access to your services
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col gap-6">
            <SwitchField
              checked={apiData.keys.enabled}
              description="Allow creation and management of API keys"
              id="keys-enabled"
              label="Enable API Keys"
              onCheckedChange={(checked) =>
                handleNestedChange("keys", "enabled", checked)
              }
            />

            <ConditionalField condition={apiData.keys.enabled}>
              <div className="ml-3flex flex-col gap-6 border-muted border-l-2 pl-5">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="maxKeys">Maximum Keys</Label>
                  <Input
                    aria-describedby="maxKeys-description"
                    aria-label="Maximum number of API keys"
                    aria-required="true"
                    id="maxKeys"
                    max={100}
                    min={1}
                    onChange={(e) =>
                      handleNestedChange(
                        "keys",
                        "maxKeys",
                        Number.parseInt(e.target.value)
                      )
                    }
                    type="number"
                    value={apiData.keys.maxKeys}
                  />
                  <p
                    className="text-muted-foreground text-sm"
                    id="maxKeys-description"
                  >
                    Maximum number of API keys allowed per account
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="keyExpiration">Key Expiration</Label>
                  <Select
                    onValueChange={(value) =>
                      handleNestedChange("keys", "keyExpiration", value)
                    }
                    value={apiData.keys.keyExpiration}
                  >
                    <SelectTrigger
                      aria-describedby="keyExpiration-description"
                      aria-label="Select API key expiration period"
                      aria-required="true"
                      id="keyExpiration"
                    >
                      <SelectValue placeholder="Select expiration period" />
                    </SelectTrigger>
                    <SelectContent>
                      {keyExpirationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p
                    className="text-muted-foreground text-sm"
                    id="keyExpiration-description"
                  >
                    How long API keys remain valid
                  </p>
                </div>

                <SwitchField
                  checked={apiData.keys.rotationEnabled}
                  description="Automatically rotate API keys at regular intervals"
                  id="rotationEnabled"
                  label="Enable Key Rotation"
                  onCheckedChange={(checked) =>
                    handleNestedChange("keys", "rotationEnabled", checked)
                  }
                />

                <ConditionalField condition={apiData.keys.rotationEnabled}>
                  <div className="ml-3flex flex-col gap-3">
                    <Label htmlFor="rotationInterval">Rotation Interval</Label>
                    <Select
                      onValueChange={(value) =>
                        handleNestedChange("keys", "rotationInterval", value)
                      }
                      value={apiData.keys.rotationInterval}
                    >
                      <SelectTrigger
                        aria-describedby="rotationInterval-description"
                        aria-label="Select key rotation interval"
                        aria-required="true"
                        id="rotationInterval"
                      >
                        <SelectValue placeholder="Select rotation interval" />
                      </SelectTrigger>
                      <SelectContent>
                        {rotationIntervalOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p
                      className="text-muted-foreground text-sm"
                      id="rotationInterval-description"
                    >
                      How often to automatically rotate API keys
                    </p>
                  </div>
                </ConditionalField>
              </div>
            </ConditionalField>

            <ApiKeyManagement />
          </div>
        </CardContent>
      </Card>

      {/* Rate Limits */}
      <Card className="gap-6 p-4 shadow-none md:p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <Settings aria-hidden="true" className="size-5" focusable="false" />
            Rate Limits
          </CardTitle>
          <CardDescription>
            Configure API rate limits to control usage and prevent abuse
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col gap-6">
            <SwitchField
              checked={apiData.rateLimits.enabled}
              description="Apply rate limits to API requests"
              id="rateLimits-enabled"
              label="Enable Rate Limiting"
              onCheckedChange={(checked) =>
                handleNestedChange("rateLimits", "enabled", checked)
              }
            />

            <ConditionalField condition={apiData.rateLimits.enabled}>
              <div className="ml-3flex flex-col gap-6 border-muted border-l-2 pl-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="requestsPerMinute">
                      Requests per Minute
                    </Label>
                    <Input
                      aria-describedby="requestsPerMinute-description"
                      aria-label="Maximum requests per minute"
                      aria-required="true"
                      id="requestsPerMinute"
                      max={1000}
                      min={1}
                      onChange={(e) =>
                        handleNestedChange(
                          "rateLimits",
                          "requestsPerMinute",
                          Number.parseInt(e.target.value)
                        )
                      }
                      type="number"
                      value={apiData.rateLimits.requestsPerMinute}
                    />
                    <p
                      className="text-muted-foreground text-sm"
                      id="requestsPerMinute-description"
                    >
                      Maximum requests allowed per minute
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label htmlFor="requestsPerHour">Requests per Hour</Label>
                    <Input
                      aria-describedby="requestsPerHour-description"
                      aria-label="Maximum requests per hour"
                      aria-required="true"
                      id="requestsPerHour"
                      max={10_000}
                      min={1}
                      onChange={(e) =>
                        handleNestedChange(
                          "rateLimits",
                          "requestsPerHour",
                          Number.parseInt(e.target.value)
                        )
                      }
                      type="number"
                      value={apiData.rateLimits.requestsPerHour}
                    />
                    <p
                      className="text-muted-foreground text-sm"
                      id="requestsPerHour-description"
                    >
                      Maximum requests allowed per hour
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label htmlFor="requestsPerDay">Requests per Day</Label>
                    <Input
                      aria-describedby="requestsPerDay-description"
                      aria-label="Maximum requests per day"
                      aria-required="true"
                      id="requestsPerDay"
                      max={100_000}
                      min={1}
                      onChange={(e) =>
                        handleNestedChange(
                          "rateLimits",
                          "requestsPerDay",
                          Number.parseInt(e.target.value)
                        )
                      }
                      type="number"
                      value={apiData.rateLimits.requestsPerDay}
                    />
                    <p
                      className="text-muted-foreground text-sm"
                      id="requestsPerDay-description"
                    >
                      Maximum requests allowed per day
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label htmlFor="burstLimit">Burst Limit</Label>
                    <Input
                      aria-describedby="burstLimit-description"
                      aria-label="Maximum burst requests"
                      aria-required="true"
                      id="burstLimit"
                      max={1000}
                      min={1}
                      onChange={(e) =>
                        handleNestedChange(
                          "rateLimits",
                          "burstLimit",
                          Number.parseInt(e.target.value)
                        )
                      }
                      type="number"
                      value={apiData.rateLimits.burstLimit}
                    />
                    <p
                      className="text-muted-foreground text-sm"
                      id="burstLimit-description"
                    >
                      Maximum requests allowed in a burst
                    </p>
                  </div>
                </div>
              </div>
            </ConditionalField>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Endpoints */}
      <Card className="gap-6 p-4 shadow-none md:p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <Webhook aria-hidden="true" className="size-5" focusable="false" />
            Webhook Endpoints
          </CardTitle>
          <CardDescription>
            Configure webhook endpoints to receive real-time event notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col gap-6">
            <SwitchField
              checked={apiData.webhooks.enabled}
              description="Allow creation and management of webhook endpoints"
              id="webhooks-enabled"
              label="Enable Webhooks"
              onCheckedChange={(checked) =>
                handleNestedChange("webhooks", "enabled", checked)
              }
            />

            <ConditionalField condition={apiData.webhooks.enabled}>
              <div className="ml-3flex flex-col gap-6 border-muted border-l-2 pl-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="maxEndpoints">Maximum Endpoints</Label>
                    <Input
                      aria-describedby="maxEndpoints-description"
                      aria-label="Maximum number of webhook endpoints"
                      aria-required="true"
                      id="maxEndpoints"
                      max={50}
                      min={1}
                      onChange={(e) =>
                        handleNestedChange(
                          "webhooks",
                          "maxEndpoints",
                          Number.parseInt(e.target.value)
                        )
                      }
                      type="number"
                      value={apiData.webhooks.maxEndpoints}
                    />
                    <p
                      className="text-muted-foreground text-sm"
                      id="maxEndpoints-description"
                    >
                      Maximum number of webhook endpoints allowed
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label htmlFor="timeoutSeconds">Timeout (seconds)</Label>
                    <Input
                      aria-describedby="timeoutSeconds-description"
                      aria-label="Webhook timeout in seconds"
                      aria-required="true"
                      id="timeoutSeconds"
                      max={300}
                      min={5}
                      onChange={(e) =>
                        handleNestedChange(
                          "webhooks",
                          "timeoutSeconds",
                          Number.parseInt(e.target.value)
                        )
                      }
                      type="number"
                      value={apiData.webhooks.timeoutSeconds}
                    />
                    <p
                      className="text-muted-foreground text-sm"
                      id="timeoutSeconds-description"
                    >
                      Maximum time to wait for webhook response
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label htmlFor="retryAttempts">Retry Attempts</Label>
                    <Input
                      aria-describedby="retryAttempts-description"
                      aria-label="Number of retry attempts"
                      aria-required="true"
                      id="retryAttempts"
                      max={10}
                      min={0}
                      onChange={(e) =>
                        handleNestedChange(
                          "webhooks",
                          "retryAttempts",
                          Number.parseInt(e.target.value)
                        )
                      }
                      type="number"
                      value={apiData.webhooks.retryAttempts}
                    />
                    <p
                      className="text-muted-foreground text-sm"
                      id="retryAttempts-description"
                    >
                      Number of retry attempts for failed webhooks
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label htmlFor="retryDelay">Retry Delay (seconds)</Label>
                    <Input
                      aria-describedby="retryDelay-description"
                      aria-label="Delay between retry attempts"
                      aria-required="true"
                      id="retryDelay"
                      max={300}
                      min={1}
                      onChange={(e) =>
                        handleNestedChange(
                          "webhooks",
                          "retryDelay",
                          Number.parseInt(e.target.value)
                        )
                      }
                      type="number"
                      value={apiData.webhooks.retryDelay}
                    />
                    <p
                      className="text-muted-foreground text-sm"
                      id="retryDelay-description"
                    >
                      Delay between retry attempts in seconds
                    </p>
                  </div>
                </div>
              </div>
            </ConditionalField>

            <WebhookManagement />
          </div>
        </CardContent>
      </Card>

      {/* SDK Configuration */}
      <Card className="gap-6 p-4 shadow-none md:p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <Code aria-hidden="true" className="size-5" focusable="false" />
            SDK Configuration
          </CardTitle>
          <CardDescription>
            Configure SDK settings and supported programming languages
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col gap-6">
            <SwitchField
              checked={apiData.sdk.enabled}
              description="Provide SDK libraries for easier integration"
              id="sdk-enabled"
              label="Enable SDK"
              onCheckedChange={(checked) =>
                handleNestedChange("sdk", "enabled", checked)
              }
            />

            <ConditionalField condition={apiData.sdk.enabled}>
              <div className="ml-3flex flex-col gap-6 border-muted border-l-2 pl-5">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="supportedLanguages">
                    Supported Languages
                  </Label>
                  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-4">
                    {supportedLanguages.map((lang) => (
                      <div className="flex items-center gap-2" key={lang.value}>
                        <Checkbox
                          aria-describedby={`sdk-lang-${lang.value}-description`}
                          aria-label={`${lang.label} SDK support`}
                          checked={apiData.sdk.supportedLanguages.includes(
                            lang.value
                          )}
                          id={`sdk-lang-${lang.value}`}
                          onCheckedChange={(checked) => {
                            const newLanguages = checked
                              ? [...apiData.sdk.supportedLanguages, lang.value]
                              : apiData.sdk.supportedLanguages.filter(
                                  (l) => l !== lang.value
                                );
                            handleNestedChange(
                              "sdk",
                              "supportedLanguages",
                              newLanguages
                            );
                          }}
                        />
                        <Label
                          className="cursor-pointer font-normal text-sm"
                          htmlFor={`sdk-lang-${lang.value}`}
                        >
                          {lang.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Select programming languages for SDK support
                  </p>
                </div>

                <SwitchField
                  checked={apiData.sdk.autoUpdate}
                  description="Automatically update SDK libraries when new versions are available"
                  id="autoUpdate"
                  label="Auto Update SDK"
                  onCheckedChange={(checked) =>
                    handleNestedChange("sdk", "autoUpdate", checked)
                  }
                />

                <SwitchField
                  checked={apiData.sdk.versionPinning}
                  description="Pin SDK versions to prevent breaking changes"
                  id="versionPinning"
                  label="Version Pinning"
                  onCheckedChange={(checked) =>
                    handleNestedChange("sdk", "versionPinning", checked)
                  }
                />
              </div>
            </ConditionalField>
          </div>
        </CardContent>
      </Card>

      {/* Developer Tools */}
      <Card className="gap-6 p-4 shadow-none md:p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <Settings aria-hidden="true" className="size-5" focusable="false" />
            Developer Tools
          </CardTitle>
          <CardDescription>
            Configure debugging, logging, and development features
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="flex flex-col gap-6">
            <SwitchField
              checked={apiData.developer.debugMode}
              description="Enable detailed debugging information and verbose logging"
              id="debugMode"
              label="Debug Mode"
              onCheckedChange={(checked) =>
                handleNestedChange("developer", "debugMode", checked)
              }
            />

            <SwitchField
              checked={apiData.developer.logging}
              description="Log API requests and responses for debugging"
              id="logging"
              label="Enable Logging"
              onCheckedChange={(checked) =>
                handleNestedChange("developer", "logging", checked)
              }
            />

            <SwitchField
              checked={apiData.developer.analytics}
              description="Collect usage analytics and performance metrics"
              id="analytics"
              label="Analytics"
              onCheckedChange={(checked) =>
                handleNestedChange("developer", "analytics", checked)
              }
            />

            <SwitchField
              checked={apiData.developer.errorReporting}
              description="Automatically report errors and exceptions"
              id="errorReporting"
              label="Error Reporting"
              onCheckedChange={(checked) =>
                handleNestedChange("developer", "errorReporting", checked)
              }
            />
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
                    : "Save API settings"
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
                ? "Saving your API settings"
                : saveSuccess
                  ? "Your settings have been saved"
                  : "Save your API settings"}
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
              aria-label="Reset all API settings to default values"
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
}

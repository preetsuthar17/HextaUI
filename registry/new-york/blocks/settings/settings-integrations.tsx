"use client";

import {
  AlertCircle,
  Check,
  Link as LinkIcon,
  Loader2,
  RefreshCw,
  Unlink,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/new-york/ui/alert-dialog";
import { Badge } from "@/registry/new-york/ui/badge";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  status: "connected" | "disconnected" | "error" | "expired";
  lastSynced?: Date;
  scopes?: string[];
  needsReconnection?: boolean;
}

export interface SettingsIntegrationsProps {
  integrations?: Integration[];
  onConnect?: (integrationId: string) => Promise<void>;
  onDisconnect?: (integrationId: string) => Promise<void>;
  onReauthorize?: (integrationId: string) => Promise<void>;
  className?: string;
}

const defaultIntegrations: Integration[] = [
  {
    id: "github",
    name: "GitHub",
    description: "Connect your GitHub account to sync repositories",
    status: "connected",
    lastSynced: new Date(Date.now() - 2 * 60 * 60 * 1000),
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
    lastSynced: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    needsReconnection: true,
    scopes: ["drive.readonly"],
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Manage payments and subscriptions",
    status: "error",
    lastSynced: new Date(Date.now() - 5 * 60 * 60 * 1000),
    scopes: ["read"],
  },
];

function getStatusConfig(status: Integration["status"]) {
  switch (status) {
    case "connected":
      return {
        label: "Connected",
        variant: "default" as const,
        icon: Check,
      };
    case "disconnected":
      return {
        label: "Disconnected",
        variant: "secondary" as const,
        icon: Unlink,
      };
    case "error":
      return {
        label: "Error",
        variant: "destructive" as const,
        icon: AlertCircle,
      };
    case "expired":
      return {
        label: "Expired",
        variant: "outline" as const,
        icon: X,
      };
  }
}

function formatLastSynced(date?: Date): string {
  if (!date) return "Never";
  const now = Date.now();
  const diff = now - date.getTime();
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function SettingsIntegrations({
  integrations = defaultIntegrations,
  onConnect,
  onDisconnect,
  onReauthorize,
  className,
}: SettingsIntegrationsProps) {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [disconnecting, setDisconnecting] = useState<string | null>(null);

  const handleConnect = async (integrationId: string) => {
    setConnecting(integrationId);
    try {
      await onConnect?.(integrationId);
    } finally {
      setConnecting(null);
    }
  };

  const handleDisconnect = async (integrationId: string) => {
    setDisconnecting(integrationId);
    try {
      await onDisconnect?.(integrationId);
    } finally {
      setDisconnecting(null);
    }
  };

  const handleReauthorize = async (integrationId: string) => {
    setConnecting(integrationId);
    try {
      await onReauthorize?.(integrationId);
    } finally {
      setConnecting(null);
    }
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <CardTitle className="wrap-break-word">Integrations</CardTitle>
            <CardDescription className="wrap-break-word">
              Connect and manage third-party integrations
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {integrations.map((integration) => {
            const statusConfig = getStatusConfig(integration.status);
            const StatusIcon = statusConfig.icon;
            const isConnecting = connecting === integration.id;
            const isDisconnecting = disconnecting === integration.id;
            const isConnected = integration.status === "connected";
            const needsReconnect =
              integration.status === "expired" || integration.needsReconnection;

            return (
              <div
                className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-start"
                key={integration.id}
              >
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <div className="flex items-start gap-3">
                    {integration.icon && (
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <integration.icon className="size-5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-medium text-sm">
                          {integration.name}
                        </h4>
                        <Badge
                          className="flex items-center gap-1 text-xs"
                          variant={statusConfig.variant}
                        >
                          <StatusIcon className="size-3" />
                          <span>{statusConfig.label}</span>
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-xs">
                        {integration.description}
                      </p>
                    </div>
                  </div>

                  {integration.lastSynced && (
                    <p className="text-muted-foreground text-xs">
                      Last synced: {formatLastSynced(integration.lastSynced)}
                    </p>
                  )}

                  {integration.scopes && integration.scopes.length > 0 && (
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-muted-foreground text-xs">
                        Permissions:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {integration.scopes.map((scope) => (
                          <Badge
                            className="text-xs"
                            key={scope}
                            variant="outline"
                          >
                            {scope}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                  {isConnected ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          className="w-full sm:w-auto"
                          disabled={isDisconnecting}
                          type="button"
                          variant="outline"
                        >
                          {isDisconnecting ? (
                            <>
                              <Loader2 className="size-4 animate-spin" />
                              Disconnecting…
                            </>
                          ) : (
                            <>
                              <Unlink className="size-4" />
                              Disconnect
                            </>
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Disconnect {integration.name}?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will revoke access and stop syncing data from{" "}
                            {integration.name}. You can reconnect anytime.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDisconnect(integration.id)}
                          >
                            Disconnect
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : needsReconnect ? (
                    <Button
                      className="w-full sm:w-auto"
                      disabled={isConnecting}
                      onClick={() => handleReauthorize(integration.id)}
                      type="button"
                    >
                      {isConnecting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Reconnecting…
                        </>
                      ) : (
                        <>
                          <RefreshCw className="size-4" />
                          Reconnect
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      className="w-full sm:w-auto"
                      disabled={isConnecting}
                      onClick={() => handleConnect(integration.id)}
                      type="button"
                    >
                      {isConnecting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Connecting…
                        </>
                      ) : (
                        <>
                          <LinkIcon className="size-4" />
                          Connect
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

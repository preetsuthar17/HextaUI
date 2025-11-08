"use client";

import { Bell, Loader2, Settings, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export interface UsageAlert {
  id: string;
  name: string;
  category: string;
  threshold: number;
  thresholdType: "percentage" | "absolute";
  enabled: boolean;
  channels: ("email" | "sms" | "in_app")[];
  lastTriggered?: Date;
  triggerCount?: number;
}

export interface BillingUsageAlertsProps {
  alerts?: UsageAlert[];
  onToggle?: (alertId: string, enabled: boolean) => Promise<void>;
  onEdit?: (alertId: string) => void;
  onDelete?: (alertId: string) => Promise<void>;
  onCreate?: () => void;
  className?: string;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

function getChannelIcon(channel: string) {
  switch (channel) {
    case "email":
      return "📧";
    case "sms":
      return "💬";
    case "in_app":
      return "🔔";
    default:
      return "🔔";
  }
}

function getChannelLabel(channel: string) {
  switch (channel) {
    case "email":
      return "Email";
    case "sms":
      return "SMS";
    case "in_app":
      return "In-App";
    default:
      return channel;
  }
}

export default function BillingUsageAlerts({
  alerts = [],
  onToggle,
  onEdit,
  onDelete,
  onCreate,
  className,
}: BillingUsageAlertsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleToggle = async (alertId: string, enabled: boolean) => {
    if (!onToggle) return;

    setIsLoading(alertId);
    try {
      await onToggle(alertId, enabled);
    } finally {
      setIsLoading(null);
    }
  };

  const handleDelete = async (alertId: string) => {
    if (!onDelete) return;

    setIsLoading(alertId);
    try {
      await onDelete(alertId);
    } finally {
      setIsLoading(null);
    }
  };

  if (alerts.length === 0) {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle>Usage Alerts</CardTitle>
              <CardDescription>
                Get notified when you approach your usage limits
              </CardDescription>
            </div>
            {onCreate && (
              <Button
                className="w-full sm:w-auto"
                onClick={onCreate}
                type="button"
              >
                <Bell className="size-4" />
                Create Alert
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Bell className="size-6 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-sm">No alerts configured</p>
              <p className="text-muted-foreground text-sm">
                Create alerts to get notified when you approach your usage
                limits
              </p>
            </div>
            {onCreate && (
              <Button onClick={onCreate} type="button" variant="outline">
                <Bell className="size-4" />
                Create Your First Alert
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>Usage Alerts</CardTitle>
            <CardDescription>
              Get notified when you approach your usage limits
            </CardDescription>
          </div>
          {onCreate && (
            <Button
              className="w-full sm:w-auto"
              onClick={onCreate}
              type="button"
            >
              <Bell className="size-4" />
              Create Alert
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {alerts.map((alert, idx) => (
            <div key={alert.id}>
              <div className="flex flex-col gap-4 rounded-lg border bg-card p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="wrap-break-word font-medium text-sm">
                        {alert.name}
                      </h3>
                      {alert.enabled ? (
                        <Badge className="shrink-0 text-xs" variant="default">
                          Active
                        </Badge>
                      ) : (
                        <Badge className="shrink-0 text-xs" variant="secondary">
                          Disabled
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
                      <span className="wrap-break-word">{alert.category}</span>
                      <span aria-hidden="true">•</span>
                      <span>
                        Alert at{" "}
                        {alert.thresholdType === "percentage"
                          ? `${alert.threshold}%`
                          : alert.threshold.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
                      <span>Notify via:</span>
                      {alert.channels.map((channel, channelIdx) => (
                        <div
                          className="flex items-center gap-1"
                          key={channelIdx}
                        >
                          <span>{getChannelIcon(channel)}</span>
                          <span>{getChannelLabel(channel)}</span>
                        </div>
                      ))}
                      {alert.lastTriggered && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span>
                            Last triggered: {formatDate(alert.lastTriggered)}
                          </span>
                        </>
                      )}
                      {alert.triggerCount !== undefined &&
                        alert.triggerCount > 0 && (
                          <>
                            <span aria-hidden="true">•</span>
                            <span>
                              Triggered {alert.triggerCount} time
                              {alert.triggerCount !== 1 ? "s" : ""}
                            </span>
                          </>
                        )}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    {onToggle && (
                      <div className="flex items-center gap-2">
                        {isLoading === alert.id ? (
                          <Loader2 className="size-4 animate-spin text-muted-foreground" />
                        ) : (
                          <Switch
                            checked={alert.enabled}
                            disabled={isLoading !== null}
                            onCheckedChange={(checked) =>
                              handleToggle(alert.id, checked)
                            }
                          />
                        )}
                      </div>
                    )}
                    {onEdit && (
                      <Button
                        aria-label={`Edit alert ${alert.name}`}
                        onClick={() => onEdit(alert.id)}
                        size="icon"
                        type="button"
                        variant="ghost"
                      >
                        <Settings className="size-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        aria-label={`Delete alert ${alert.name}`}
                        disabled={isLoading !== null}
                        onClick={() => handleDelete(alert.id)}
                        size="icon"
                        type="button"
                        variant="ghost"
                      >
                        {isLoading === alert.id ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <X className="size-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              {idx < alerts.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

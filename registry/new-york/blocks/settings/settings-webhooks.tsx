"use client";

import { Check, Copy, Plus, RefreshCw, Send, Trash2, X } from "lucide-react";
import { useState } from "react";
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
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface Webhook {
  id: string;
  name: string;
  url: string;
  secret?: string;
  events: string[];
  status: "active" | "paused" | "failed";
  createdAt: Date;
  lastTriggered?: Date;
  successCount: number;
  failureCount: number;
}

export interface WebhookDelivery {
  id: string;
  webhookId: string;
  status: "success" | "failed";
  responseCode?: number;
  timestamp: Date;
  payload: string;
  response?: string;
}

export interface SettingsWebhooksProps {
  webhooks?: Webhook[];
  deliveries?: Record<string, WebhookDelivery[]>;
  onCreate?: (data: {
    name: string;
    url: string;
    events: string[];
  }) => Promise<Webhook>;
  onUpdate?: (id: string, data: Partial<Webhook>) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onTest?: (id: string) => Promise<void>;
  onToggleStatus?: (id: string) => Promise<void>;
  className?: string;
}

const availableEvents = [
  { id: "user.created", label: "User Created" },
  { id: "user.updated", label: "User Updated" },
  { id: "user.deleted", label: "User Deleted" },
  { id: "payment.succeeded", label: "Payment Succeeded" },
  { id: "payment.failed", label: "Payment Failed" },
  { id: "subscription.created", label: "Subscription Created" },
  { id: "subscription.updated", label: "Subscription Updated" },
  { id: "subscription.cancelled", label: "Subscription Cancelled" },
];

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default function SettingsWebhooks({
  webhooks = [],
  deliveries = {},
  onCreate,
  onUpdate,
  onDelete,
  onTest,
  onToggleStatus,
  className,
}: SettingsWebhooksProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedSecret, setCopiedSecret] = useState<string | null>(null);

  const [webhookData, setWebhookData] = useState({
    name: "",
    url: "",
    events: [] as string[],
  });

  const handleCreate = async () => {
    setErrors({});

    if (!webhookData.name.trim()) {
      setErrors({ name: "Name is required" });
      return;
    }

    if (!webhookData.url.trim()) {
      setErrors({ url: "URL is required" });
      return;
    }

    try {
      new URL(webhookData.url);
    } catch {
      setErrors({ url: "Please enter a valid URL" });
      return;
    }

    if (webhookData.events.length === 0) {
      setErrors({ events: "Select at least one event" });
      return;
    }

    try {
      await onCreate?.(webhookData);
      setWebhookData({ name: "", url: "", events: [] });
      setCreateDialogOpen(false);
    } catch (error) {
      setErrors({
        _general:
          error instanceof Error ? error.message : "Failed to create webhook",
      });
    }
  };

  const toggleEvent = (eventId: string) => {
    setWebhookData((prev) => ({
      ...prev,
      events: prev.events.includes(eventId)
        ? prev.events.filter((e) => e !== eventId)
        : [...prev.events, eventId],
    }));
  };

  const copySecret = async (secret: string) => {
    await navigator.clipboard.writeText(secret);
    setCopiedSecret(secret);
    setTimeout(() => setCopiedSecret(null), 2000);
  };

  const getStatusBadge = (status: Webhook["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="text-xs" variant="default">
            Active
          </Badge>
        );
      case "paused":
        return (
          <Badge className="text-xs" variant="secondary">
            Paused
          </Badge>
        );
      case "failed":
        return (
          <Badge className="text-xs" variant="destructive">
            Failed
          </Badge>
        );
    }
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <CardTitle className="wrap-break-word">Webhooks</CardTitle>
            <CardDescription className="wrap-break-word">
              Configure webhooks to receive real-time event notifications
            </CardDescription>
          </div>
          <Dialog onOpenChange={setCreateDialogOpen} open={createDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full shrink-0 sm:w-auto" type="button">
                <Plus className="size-4" />
                <span className="whitespace-nowrap">Create Webhook</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Webhook</DialogTitle>
                <DialogDescription>
                  Set up a new webhook to receive event notifications
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                {errors._general && (
                  <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                    <p className="text-destructive text-sm">
                      {errors._general}
                    </p>
                  </div>
                )}

                <Field>
                  <FieldLabel htmlFor="webhook-name">
                    Name <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="webhook-name"
                        onChange={(e) =>
                          setWebhookData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="My Webhook"
                        value={webhookData.name}
                      />
                    </InputGroup>
                    {errors.name && <FieldError>{errors.name}</FieldError>}
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="webhook-url">
                    URL <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="webhook-url"
                        onChange={(e) =>
                          setWebhookData((prev) => ({
                            ...prev,
                            url: e.target.value,
                          }))
                        }
                        placeholder="https://example.com/webhook"
                        type="url"
                        value={webhookData.url}
                      />
                    </InputGroup>
                    {errors.url && <FieldError>{errors.url}</FieldError>}
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel>
                    Events <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldContent>
                    <div className="flex flex-col gap-2 rounded-lg border p-3">
                      {availableEvents.map((event) => (
                        <div
                          className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50"
                          key={event.id}
                        >
                          <Checkbox
                            checked={webhookData.events.includes(event.id)}
                            id={`event-${event.id}`}
                            onCheckedChange={() => toggleEvent(event.id)}
                          />
                          <label
                            className="flex-1 cursor-pointer text-sm"
                            htmlFor={`event-${event.id}`}
                          >
                            {event.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.events && <FieldError>{errors.events}</FieldError>}
                  </FieldContent>
                </Field>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => setCreateDialogOpen(false)}
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button onClick={handleCreate} type="button">
                  Create Webhook
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {webhooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Send className="size-6 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-sm">No webhooks</p>
              <p className="text-muted-foreground text-sm">
                Create your first webhook to receive event notifications
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {webhooks.map((webhook) => (
              <div
                className="flex flex-col gap-4 rounded-lg border p-4"
                key={webhook.id}
              >
                {/* Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-medium text-sm">{webhook.name}</h4>
                    {getStatusBadge(webhook.status)}
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Button
                      className="w-full sm:w-auto"
                      onClick={() => onTest?.(webhook.id)}
                      type="button"
                      variant="outline"
                    >
                      <Send className="size-4" />
                      Test
                    </Button>
                    <Button
                      className="w-full sm:w-auto"
                      onClick={() => onToggleStatus?.(webhook.id)}
                      type="button"
                      variant="outline"
                    >
                      {webhook.status === "active" ? (
                        <div className="flex items-center gap-2">
                          <X className="size-4" />
                          <span>Pause</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <RefreshCw className="size-4" />
                          <span>Resume</span>
                        </div>
                      )}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          className="w-full sm:w-auto"
                          type="button"
                          variant="destructive"
                        >
                          <Trash2 className="size-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Webhook?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the webhook{" "}
                            <strong>{webhook.name}</strong>. This action cannot
                            be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete?.(webhook.id)}
                          >
                            Delete Webhook
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col gap-4">
                  {/* URL and Secret */}
                  <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-4">
                    <Field>
                      <FieldLabel className="mb-0">URL</FieldLabel>
                      <FieldContent>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 break-all rounded bg-background px-3 py-2 font-mono text-xs">
                            {webhook.url}
                          </code>
                          <Button
                            aria-label="Copy URL"
                            onClick={() => copySecret(webhook.url)}
                            size="icon-sm"
                            type="button"
                            variant="ghost"
                          >
                            {copiedSecret === webhook.url ? (
                              <Check className="size-4 text-green-600" />
                            ) : (
                              <Copy className="size-4" />
                            )}
                          </Button>
                        </div>
                      </FieldContent>
                    </Field>
                    {webhook.secret && (
                      <Field>
                        <FieldLabel className="mb-0">Secret</FieldLabel>
                        <FieldContent>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 rounded bg-background px-3 py-2 font-mono text-xs">
                              {webhook.secret.slice(0, 8)}...
                            </code>
                            <Button
                              aria-label="Copy secret"
                              onClick={() => copySecret(webhook.secret!)}
                              size="icon-sm"
                              type="button"
                              variant="ghost"
                            >
                              {copiedSecret === webhook.secret ? (
                                <Check className="size-4 text-green-600" />
                              ) : (
                                <Copy className="size-4" />
                              )}
                            </Button>
                          </div>
                        </FieldContent>
                      </Field>
                    )}
                  </div>

                  {/* Events */}
                  <div className="flex flex-col gap-2">
                    <FieldLabel className="mb-0">Events</FieldLabel>
                    <div className="flex flex-wrap gap-2">
                      {webhook.events.map((event) => (
                        <Badge
                          className="text-xs"
                          key={event}
                          variant="outline"
                        >
                          {availableEvents.find((e) => e.id === event)?.label ||
                            event}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-xs">
                    <span>Created: {formatDate(webhook.createdAt)}</span>
                    {webhook.lastTriggered && (
                      <>
                        <span>•</span>
                        <span>
                          Last triggered: {formatDate(webhook.lastTriggered)}
                        </span>
                      </>
                    )}
                    <span>•</span>
                    <span className="text-green-600">
                      {webhook.successCount} successful
                    </span>
                    {webhook.failureCount > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-destructive">
                          {webhook.failureCount} failed
                        </span>
                      </>
                    )}
                  </div>

                  {/* Recent Deliveries */}
                  {deliveries[webhook.id] &&
                    deliveries[webhook.id].length > 0 && (
                      <>
                        <Separator />
                        <div className="flex flex-col gap-3">
                          <h5 className="font-medium text-sm">
                            Recent Deliveries
                          </h5>
                          <div className="flex flex-col gap-2">
                            {deliveries[webhook.id]
                              .slice(0, 5)
                              .map((delivery) => (
                                <div
                                  className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
                                  key={delivery.id}
                                >
                                  <div className="flex flex-wrap items-center gap-2">
                                    <Badge
                                      className="text-xs"
                                      variant={
                                        delivery.status === "success"
                                          ? "default"
                                          : "destructive"
                                      }
                                    >
                                      {delivery.status}
                                    </Badge>
                                    {delivery.responseCode && (
                                      <span className="text-muted-foreground text-xs">
                                        {delivery.responseCode}
                                      </span>
                                    )}
                                    <span className="text-muted-foreground text-xs">
                                      {formatDate(delivery.timestamp)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

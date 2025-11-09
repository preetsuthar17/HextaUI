"use client";

import {
  Check,
  Copy,
  Eye,
  EyeOff,
  Loader2,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface APIKey {
  id: string;
  name: string;
  key: string;
  createdAt: Date;
  lastUsed?: Date;
  expiresAt?: Date;
  scopes: string[];
  usageCount?: number;
  rateLimit?: {
    limit: number;
    remaining: number;
    resetAt: Date;
  };
}

export interface SettingsAPIKeysProps {
  apiKeys?: APIKey[];
  onCreate?: (data: {
    name: string;
    expiresAt?: Date;
    scopes: string[];
  }) => Promise<APIKey>;
  onRevoke?: (keyId: string) => Promise<void>;
  onRegenerate?: (keyId: string) => Promise<APIKey>;
  className?: string;
}

const availableScopes = [
  { id: "read", label: "Read", description: "Read-only access" },
  { id: "write", label: "Write", description: "Read and write access" },
  { id: "admin", label: "Admin", description: "Full administrative access" },
];

function maskKey(key: string): string {
  if (key.length <= 8) return "•".repeat(key.length);
  return `${key.slice(0, 4)}${"•".repeat(key.length - 8)}${key.slice(-4)}`;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function SettingsAPIKeys({
  apiKeys = [],
  onCreate,
  onRevoke,
  onRegenerate,
  className,
}: SettingsAPIKeysProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [isRevoking, setIsRevoking] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [newKeyData, setNewKeyData] = useState({
    name: "",
    expiresIn: "never" as "never" | "30" | "90" | "365",
    scopes: [] as string[],
  });

  const handleCreate = async () => {
    setErrors({});

    if (!newKeyData.name.trim()) {
      setErrors({ name: "Name is required" });
      return;
    }

    if (newKeyData.scopes.length === 0) {
      setErrors({ scopes: "At least one scope is required" });
      return;
    }

    setIsCreating(true);
    try {
      const expiresAt =
        newKeyData.expiresIn === "never"
          ? undefined
          : new Date(
              Date.now() +
                Number.parseInt(newKeyData.expiresIn) * 24 * 60 * 60 * 1000
            );

      await onCreate?.({
        name: newKeyData.name,
        expiresAt,
        scopes: newKeyData.scopes,
      });

      setNewKeyData({ name: "", expiresIn: "never", scopes: [] });
      setCreateDialogOpen(false);
    } catch (error) {
      setErrors({
        _general:
          error instanceof Error ? error.message : "Failed to create API key",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleRevoke = async (keyId: string) => {
    setIsRevoking(keyId);
    try {
      await onRevoke?.(keyId);
    } finally {
      setIsRevoking(null);
    }
  };

  const handleRegenerate = async (keyId: string) => {
    setIsRegenerating(keyId);
    try {
      await onRegenerate?.(keyId);
    } finally {
      setIsRegenerating(null);
    }
  };

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev);
      if (next.has(keyId)) {
        next.delete(keyId);
      } else {
        next.add(keyId);
      }
      return next;
    });
  };

  const copyKey = async (key: string) => {
    await navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleScope = (scopeId: string) => {
    setNewKeyData((prev) => ({
      ...prev,
      scopes: prev.scopes.includes(scopeId)
        ? prev.scopes.filter((s) => s !== scopeId)
        : [...prev.scopes, scopeId],
    }));
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <CardTitle className="wrap-break-word">API Keys</CardTitle>
            <CardDescription className="wrap-break-word">
              Manage your API keys for programmatic access
            </CardDescription>
          </div>
          <Dialog onOpenChange={setCreateDialogOpen} open={createDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full shrink-0 sm:w-auto" type="button">
                <Plus className="size-4" />
                <span className="whitespace-nowrap">Create API Key</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create API Key</DialogTitle>
                <DialogDescription>
                  Create a new API key with specific permissions
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
                  <FieldLabel htmlFor="key-name">
                    Name <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="key-name"
                        onChange={(e) =>
                          setNewKeyData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="My API Key"
                        value={newKeyData.name}
                      />
                    </InputGroup>
                    {errors.name && <FieldError>{errors.name}</FieldError>}
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="expires">Expires In</FieldLabel>
                  <FieldContent>
                    <Select
                      onValueChange={(value: "never" | "30" | "90" | "365") =>
                        setNewKeyData((prev) => ({
                          ...prev,
                          expiresIn: value,
                        }))
                      }
                      value={newKeyData.expiresIn}
                    >
                      <SelectTrigger id="expires">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Never</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel>
                    Permissions <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldContent>
                    <div className="flex flex-col gap-3">
                      {availableScopes.map((scope) => (
                        <div
                          className="flex items-start gap-3 rounded-lg border p-3"
                          key={scope.id}
                        >
                          <Checkbox
                            checked={newKeyData.scopes.includes(scope.id)}
                            id={`scope-${scope.id}`}
                            onCheckedChange={() => toggleScope(scope.id)}
                          />
                          <div className="flex flex-1 flex-col gap-1">
                            <label
                              className="cursor-pointer font-medium text-sm"
                              htmlFor={`scope-${scope.id}`}
                            >
                              {scope.label}
                            </label>
                            <p className="text-muted-foreground text-xs">
                              {scope.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.scopes && <FieldError>{errors.scopes}</FieldError>}
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
                <Button
                  disabled={isCreating}
                  onClick={handleCreate}
                  type="button"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Creating…
                    </>
                  ) : (
                    "Create Key"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {apiKeys.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Plus className="size-6 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-sm">No API keys</p>
              <p className="text-muted-foreground text-sm">
                Create your first API key to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {apiKeys.map((apiKey) => {
              const isVisible = visibleKeys.has(apiKey.id);
              const isExpired =
                apiKey.expiresAt && apiKey.expiresAt < new Date();

              return (
                <div
                  className="flex flex-col gap-4 rounded-lg border p-4"
                  key={apiKey.id}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h4 className="font-medium text-sm">{apiKey.name}</h4>

                          {isExpired && (
                            <Badge className="text-xs" variant="destructive">
                              Expired
                            </Badge>
                          )}
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                          <div className="flex flex-wrap gap-2">
                            <Button
                              className="w-full sm:w-auto"
                              disabled={isRegenerating === apiKey.id}
                              onClick={() => handleRegenerate(apiKey.id)}
                              size={"sm"}
                              type="button"
                              variant="outline"
                            >
                              {isRegenerating === apiKey.id ? (
                                <>
                                  <Loader2 className="size-4 animate-spin" />
                                  Regenerating…
                                </>
                              ) : (
                                <>
                                  <RefreshCw className="size-4" />
                                  Regenerate
                                </>
                              )}
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  className="w-full sm:w-auto"
                                  disabled={isRevoking === apiKey.id}
                                  size={"sm"}
                                  type="button"
                                  variant="destructive"
                                >
                                  {isRevoking === apiKey.id ? (
                                    <>
                                      <Loader2 className="size-4 animate-spin" />
                                      Revoking…
                                    </>
                                  ) : (
                                    <>
                                      <Trash2 className="size-4" />
                                      Revoke
                                    </>
                                  )}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Revoke API Key?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently revoke the API key{" "}
                                    <strong>{apiKey.name}</strong>. This action
                                    cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleRevoke(apiKey.id)}
                                  >
                                    Revoke Key
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                      <div className="flex min-w-0 items-center gap-2 bg-muted">
                        <code className="bg- min-w-0 flex-1 break-all rounded px-2 py-1 font-mono text-xs">
                          {isVisible ? apiKey.key : maskKey(apiKey.key)}
                        </code>
                        <Button
                          aria-label={`${isVisible ? "Hide" : "Show"} API key`}
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          size="icon-sm"
                          type="button"
                          variant="ghost"
                        >
                          {isVisible ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </Button>
                        <Button
                          aria-label="Copy API key"
                          onClick={() => copyKey(apiKey.key)}
                          size="icon-sm"
                          type="button"
                          variant="ghost"
                        >
                          {copiedKey === apiKey.key ? (
                            <Check className="size-4 text-green-600" />
                          ) : (
                            <Copy className="size-4" />
                          )}
                        </Button>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-xs">
                        <span>Created: {formatDate(apiKey.createdAt)}</span>
                        {apiKey.lastUsed && (
                          <span>Last used: {formatDate(apiKey.lastUsed)}</span>
                        )}
                        {apiKey.expiresAt && (
                          <span>Expires: {formatDate(apiKey.expiresAt)}</span>
                        )}
                        {apiKey.usageCount !== undefined && (
                          <span>{apiKey.usageCount} requests</span>
                        )}
                      </div>
                      {apiKey.scopes.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {apiKey.scopes.map((scope) => (
                            <Badge
                              className="text-xs"
                              key={scope}
                              variant="outline"
                            >
                              {scope}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {apiKey.rateLimit && (
                        <div className="flex flex-col gap-1">
                          <p className="text-muted-foreground text-xs">
                            Rate Limit: {apiKey.rateLimit.remaining} /{" "}
                            {apiKey.rateLimit.limit} remaining
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Resets: {formatDate(apiKey.rateLimit.resetAt)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

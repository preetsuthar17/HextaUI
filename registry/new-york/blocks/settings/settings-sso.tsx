"use client";

import {
  Check,
  Copy,
  Lock,
  RefreshCw,
  TestTube,
  Trash2,
  Users,
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
  FieldDescription,
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface SSOProvider {
  id: string;
  name: string;
  type: "saml" | "oauth" | "oidc";
  enabled: boolean;
  status: "active" | "error" | "pending";
  metadataUrl?: string;
  entityId?: string;
  ssoUrl?: string;
  certificate?: string;
  lastTested?: Date;
  userCount?: number;
}

export interface SettingsSSOProps {
  providers?: SSOProvider[];
  enabled?: boolean;
  onCreate?: (data: {
    name: string;
    type: "saml" | "oauth" | "oidc";
    metadataUrl?: string;
    entityId?: string;
    ssoUrl?: string;
    certificate?: string;
  }) => Promise<SSOProvider>;
  onUpdate?: (id: string, data: Partial<SSOProvider>) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onTest?: (id: string) => Promise<void>;
  onToggle?: (enabled: boolean) => Promise<void>;
  className?: string;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default function SettingsSSO({
  providers = [],
  enabled = false,
  onCreate,
  onUpdate,
  onDelete,
  onTest,
  onToggle,
  className,
}: SettingsSSOProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const [providerData, setProviderData] = useState({
    name: "",
    type: "saml" as "saml" | "oauth" | "oidc",
    metadataUrl: "",
    entityId: "",
    ssoUrl: "",
    certificate: "",
  });

  const handleCreate = async () => {
    setErrors({});

    if (!providerData.name.trim()) {
      setErrors({ name: "Name is required" });
      return;
    }

    try {
      await onCreate?.(providerData);
      setProviderData({
        name: "",
        type: "saml",
        metadataUrl: "",
        entityId: "",
        ssoUrl: "",
        certificate: "",
      });
      setCreateDialogOpen(false);
    } catch (error) {
      setErrors({
        _general:
          error instanceof Error
            ? error.message
            : "Failed to create SSO provider",
      });
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getStatusBadge = (status: SSOProvider["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="flex items-center gap-1 text-xs" variant="default">
            <Check className="size-3" />
            <span>Active</span>
          </Badge>
        );
      case "error":
        return (
          <Badge className="text-xs" variant="destructive">
            Error
          </Badge>
        );
      case "pending":
        return (
          <Badge className="text-xs" variant="secondary">
            Pending
          </Badge>
        );
    }
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <CardTitle className="wrap-break-word">Single Sign-On</CardTitle>
            <CardDescription className="wrap-break-word">
              Configure SSO providers for your organization
            </CardDescription>
          </div>
          <div className="flex flex-col gap-3 sm:shrink-0 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <FieldLabel className="mb-0" htmlFor="sso-enabled">
                Enable SSO
              </FieldLabel>
              <Switch
                checked={enabled}
                id="sso-enabled"
                onCheckedChange={(checked) => onToggle?.(checked)}
              />
            </div>
            <Dialog onOpenChange={setCreateDialogOpen} open={createDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto sm:shrink-0" type="button">
                  <Lock className="size-4" />
                  <span className="whitespace-nowrap">Add Provider</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add SSO Provider</DialogTitle>
                  <DialogDescription>
                    Configure a new SSO provider for authentication
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
                    <FieldLabel htmlFor="provider-name">
                      Provider Name <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                      <InputGroup>
                        <InputGroupInput
                          id="provider-name"
                          onChange={(e) =>
                            setProviderData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Okta, Azure AD, etc."
                          value={providerData.name}
                        />
                      </InputGroup>
                      {errors.name && <FieldError>{errors.name}</FieldError>}
                    </FieldContent>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="provider-type">
                      Provider Type <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                      <Select
                        onValueChange={(value: "saml" | "oauth" | "oidc") =>
                          setProviderData((prev) => ({ ...prev, type: value }))
                        }
                        value={providerData.type}
                      >
                        <SelectTrigger id="provider-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saml">SAML 2.0</SelectItem>
                          <SelectItem value="oauth">OAuth 2.0</SelectItem>
                          <SelectItem value="oidc">OpenID Connect</SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldContent>
                  </Field>

                  {providerData.type === "saml" && (
                    <>
                      <Field>
                        <FieldLabel htmlFor="metadata-url">
                          Metadata URL
                        </FieldLabel>
                        <FieldContent>
                          <InputGroup>
                            <InputGroupInput
                              id="metadata-url"
                              onChange={(e) =>
                                setProviderData((prev) => ({
                                  ...prev,
                                  metadataUrl: e.target.value,
                                }))
                              }
                              placeholder="https://example.com/saml/metadata"
                              type="url"
                              value={providerData.metadataUrl}
                            />
                          </InputGroup>
                          <FieldDescription>
                            Or manually configure the fields below
                          </FieldDescription>
                        </FieldContent>
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="entity-id">Entity ID</FieldLabel>
                        <FieldContent>
                          <InputGroup>
                            <InputGroupInput
                              id="entity-id"
                              onChange={(e) =>
                                setProviderData((prev) => ({
                                  ...prev,
                                  entityId: e.target.value,
                                }))
                              }
                              placeholder="https://example.com/saml"
                              value={providerData.entityId}
                            />
                          </InputGroup>
                        </FieldContent>
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="sso-url">SSO URL</FieldLabel>
                        <FieldContent>
                          <InputGroup>
                            <InputGroupInput
                              id="sso-url"
                              onChange={(e) =>
                                setProviderData((prev) => ({
                                  ...prev,
                                  ssoUrl: e.target.value,
                                }))
                              }
                              placeholder="https://example.com/saml/sso"
                              type="url"
                              value={providerData.ssoUrl}
                            />
                          </InputGroup>
                        </FieldContent>
                      </Field>

                      <Field>
                        <FieldLabel htmlFor="certificate">
                          Certificate
                        </FieldLabel>
                        <FieldContent>
                          <Textarea
                            id="certificate"
                            onChange={(e) =>
                              setProviderData((prev) => ({
                                ...prev,
                                certificate: e.target.value,
                              }))
                            }
                            placeholder="Paste your SAML certificate here..."
                            rows={4}
                            value={providerData.certificate}
                          />
                        </FieldContent>
                      </Field>
                    </>
                  )}
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
                    Create Provider
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {providers.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Lock className="size-6 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-sm">No SSO providers</p>
              <p className="text-muted-foreground text-sm">
                Add an SSO provider to enable single sign-on
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {providers.map((provider) => (
              <div
                className="flex flex-col gap-4 rounded-lg border p-4"
                key={provider.id}
              >
                {/* Header */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-medium text-sm">{provider.name}</h4>
                    {getStatusBadge(provider.status)}
                    <Badge className="text-xs uppercase" variant="outline">
                      {provider.type}
                    </Badge>
                  </div>
                  <div className="ml-auto flex shrink-0 flex-wrap gap-2">
                    <Button
                      className="w-full sm:w-auto"
                      onClick={() => onTest?.(provider.id)}
                      type="button"
                      variant="outline"
                    >
                      <div className="flex items-center gap-2">
                        <TestTube className="size-4" />
                        <span>Test Connection</span>
                      </div>
                    </Button>
                    <Button
                      className="w-full sm:w-auto"
                      onClick={() =>
                        onUpdate?.(provider.id, { enabled: !provider.enabled })
                      }
                      type="button"
                      variant="outline"
                    >
                      {provider.enabled ? (
                        <div className="flex items-center gap-2">
                          <Check className="size-4" />
                          <span>Enabled</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <RefreshCw className="size-4" />
                          <span>Enable</span>
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
                          <div className="flex items-center gap-2">
                            <Trash2 className="size-4" />
                            <span>Delete</span>
                          </div>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete SSO Provider?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the SSO provider{" "}
                            <strong>{provider.name}</strong>. This action cannot
                            be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete?.(provider.id)}
                          >
                            Delete Provider
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col gap-4">
                  {/* Metadata URL */}
                  {provider.metadataUrl && (
                    <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-4">
                      <Field>
                        <FieldLabel className="mb-0">Metadata URL</FieldLabel>
                        <FieldContent>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 break-all rounded bg-background px-3 py-2 font-mono text-xs">
                              {provider.metadataUrl}
                            </code>
                            <Button
                              aria-label="Copy metadata URL"
                              onClick={() =>
                                copyToClipboard(provider.metadataUrl!)
                              }
                              size="icon-sm"
                              type="button"
                              variant="ghost"
                            >
                              {copiedText === provider.metadataUrl ? (
                                <Check className="size-4 text-green-600" />
                              ) : (
                                <Copy className="size-4" />
                              )}
                            </Button>
                          </div>
                        </FieldContent>
                      </Field>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-xs">
                    {provider.userCount !== undefined && (
                      <>
                        <span className="flex items-center gap-1">
                          <Users className="size-3" />
                          {provider.userCount} users
                        </span>
                        <span>•</span>
                      </>
                    )}
                    {provider.lastTested && (
                      <span>
                        Last tested: {formatDate(provider.lastTested)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

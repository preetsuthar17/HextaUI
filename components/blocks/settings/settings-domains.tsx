"use client";

import { Check, Copy, Globe, Plus, RefreshCw, Trash2, X } from "lucide-react";
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
import { cn } from "@/lib/utils";

export interface Domain {
  id: string;
  domain: string;
  status: "verified" | "pending" | "failed";
  sslEnabled: boolean;
  verifiedAt?: Date;
  dnsRecords?: {
    type: string;
    name: string;
    value: string;
  }[];
}

export interface SettingsDomainsProps {
  domains?: Domain[];
  onCreate?: (domain: string) => Promise<Domain>;
  onDelete?: (id: string) => Promise<void>;
  onVerify?: (id: string) => Promise<void>;
  onToggleSSL?: (id: string) => Promise<void>;
  className?: string;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function SettingsDomains({
  domains = [],
  onCreate,
  onDelete,
  onVerify,
  onToggleSSL,
  className,
}: SettingsDomainsProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newDomain, setNewDomain] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedDomain, setCopiedDomain] = useState<string | null>(null);

  const handleCreate = async () => {
    setErrors({});

    if (!newDomain.trim()) {
      setErrors({ domain: "Domain is required" });
      return;
    }

    try {
      await onCreate?.(newDomain.trim());
      setNewDomain("");
      setCreateDialogOpen(false);
    } catch (error) {
      setErrors({
        domain: error instanceof Error ? error.message : "Failed to add domain",
      });
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedDomain(text);
    setTimeout(() => setCopiedDomain(null), 2000);
  };

  const getStatusBadge = (status: Domain["status"]) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="flex items-center gap-1 text-xs" variant="default">
            <Check className="size-3" />
            <span>Verified</span>
          </Badge>
        );
      case "pending":
        return (
          <Badge className="text-xs" variant="secondary">
            Pending
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
            <CardTitle className="wrap-break-word">Custom Domains</CardTitle>
            <CardDescription className="wrap-break-word">
              Manage your custom domains and SSL certificates
            </CardDescription>
          </div>
          <Dialog onOpenChange={setCreateDialogOpen} open={createDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full shrink-0 sm:w-auto" type="button">
                <Plus className="size-4" />
                <span className="whitespace-nowrap">Add Domain</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Custom Domain</DialogTitle>
                <DialogDescription>
                  Add a custom domain to your account
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <Field>
                  <FieldLabel htmlFor="domain">
                    Domain <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="domain"
                        onChange={(e) => setNewDomain(e.target.value)}
                        placeholder="example.com"
                        type="text"
                        value={newDomain}
                      />
                    </InputGroup>
                    {errors.domain && <FieldError>{errors.domain}</FieldError>}
                    <FieldDescription>
                      Enter your domain name without http:// or https://
                    </FieldDescription>
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
                  Add Domain
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {domains.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Globe className="size-6 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-sm">No custom domains</p>
              <p className="text-muted-foreground text-sm">
                Add a custom domain to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {domains.map((domain) => (
              <div
                className="flex flex-col gap-4 rounded-lg border p-4"
                key={domain.id}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 flex-1 flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Globe className="size-5 text-muted-foreground" />
                        <span className="font-medium text-sm">
                          {domain.domain}
                        </span>
                      </div>
                      {getStatusBadge(domain.status)}
                      {domain.sslEnabled && (
                        <Badge className="text-xs" variant="default">
                          SSL Enabled
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    {domain.status === "pending" && (
                      <Button
                        className="w-full sm:w-auto"
                        onClick={() => onVerify?.(domain.id)}
                        type="button"
                        variant="outline"
                      >
                        <RefreshCw className="size-4" />
                        Verify
                      </Button>
                    )}
                    <Button
                      className="w-full sm:w-auto"
                      onClick={() => onToggleSSL?.(domain.id)}
                      type="button"
                      variant="outline"
                    >
                      {domain.sslEnabled ? (
                        <>
                          <X className="size-4" />
                          Disable SSL
                        </>
                      ) : (
                        <>
                          <Check className="size-4" />
                          Enable SSL
                        </>
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
                          Remove
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove Domain?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will remove the domain{" "}
                            <strong>{domain.domain}</strong> from your account.
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete?.(domain.id)}
                          >
                            Remove Domain
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                {domain.status === "pending" && domain.dnsRecords && (
                  <div className="flex w-full flex-col gap-3 rounded-lg border bg-muted/30 p-4">
                    <FieldLabel className="mb-0">DNS Configuration</FieldLabel>
                    <div className="flex flex-col gap-2">
                      {domain.dnsRecords.map((record, index) => (
                        <div
                          className="flex items-center justify-between rounded-lg border bg-background p-2"
                          key={index}
                        >
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-xs">
                              {record.type} {record.name}
                            </span>
                            <code className="font-mono text-muted-foreground text-xs">
                              {record.value}
                            </code>
                          </div>
                          <Button
                            aria-label="Copy DNS record"
                            onClick={() =>
                              copyToClipboard(
                                `${record.type} ${record.name} ${record.value}`
                              )
                            }
                            size="icon-sm"
                            type="button"
                            variant="ghost"
                          >
                            {copiedDomain ===
                            `${record.type} ${record.name} ${record.value}` ? (
                              <Check className="size-4 text-green-600" />
                            ) : (
                              <Copy className="size-4" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                    <FieldDescription>
                      Add these DNS records to your domain provider to verify
                      ownership
                    </FieldDescription>
                  </div>
                )}

                {domain.verifiedAt && (
                  <p className="text-muted-foreground text-xs">
                    Verified on {formatDate(domain.verifiedAt)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

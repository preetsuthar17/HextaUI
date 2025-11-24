"use client";

import {
  Check,
  Copy,
  Loader2,
  Mail,
  Plus,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/registry/new-york/ui/badge";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Checkbox } from "@/registry/new-york/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/new-york/ui/empty";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/new-york/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/new-york/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import { Textarea } from "@/registry/new-york/ui/textarea";

export interface TeamInvitation {
  id: string;
  email?: string;
  link?: string;
  role: "admin" | "member" | "viewer";
  status: "pending" | "accepted" | "expired" | "revoked";
  invitedBy: {
    name: string;
    email: string;
  };
  expiresAt?: Date;
  createdAt: Date;
  acceptedAt?: Date;
}

export interface TeamInvitationsProps {
  invitations?: TeamInvitation[];
  onCreate?: (data: {
    email?: string;
    role: "admin" | "member" | "viewer";
    expiresInDays?: number;
    message?: string;
  }) => Promise<TeamInvitation>;
  onRevoke?: (invitationId: string) => Promise<void>;
  onResend?: (invitationId: string) => Promise<void>;
  onCopyLink?: (link: string) => Promise<void>;
  className?: string;
  allowDirectLinks?: boolean;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatTimeUntil(date: Date): string {
  const now = Date.now();
  const diff = date.getTime() - now;

  if (diff <= 0) return "Expired";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) return `${days} day${days !== 1 ? "s" : ""}`;
  if (hours > 0) return `${hours} hour${hours !== 1 ? "s" : ""}`;
  return "Less than an hour";
}

function getStatusBadge(status: TeamInvitation["status"]) {
  switch (status) {
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "accepted":
      return <Badge variant="default">Accepted</Badge>;
    case "expired":
      return <Badge variant="outline">Expired</Badge>;
    case "revoked":
      return <Badge variant="destructive">Revoked</Badge>;
  }
}

export default function TeamInvitations({
  invitations = [],
  onCreate,
  onRevoke,
  onResend,
  onCopyLink,
  className,
  allowDirectLinks = true,
}: TeamInvitationsProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [inviteData, setInviteData] = useState({
    email: "",
    role: "member" as "admin" | "member" | "viewer",
    expiresInDays: 7,
    message: "",
    useDirectLink: false,
  });

  const pendingInvitations = invitations.filter((i) => i.status === "pending");
  const acceptedInvitations = invitations.filter(
    (i) => i.status === "accepted"
  );

  const handleCreate = async () => {
    setErrors({});

    if (!(inviteData.useDirectLink || inviteData.email.trim())) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!inviteData.useDirectLink) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inviteData.email)) {
        setErrors({ email: "Please enter a valid email address" });
        return;
      }
    }

    setIsCreating(true);
    try {
      await onCreate?.({
        email: inviteData.useDirectLink ? undefined : inviteData.email,
        role: inviteData.role,
        expiresInDays: inviteData.expiresInDays,
        message: inviteData.message,
      });
      setInviteData({
        email: "",
        role: "member",
        expiresInDays: 7,
        message: "",
        useDirectLink: false,
      });
      setCreateDialogOpen(false);
    } catch (error) {
      setErrors({
        _general:
          error instanceof Error
            ? error.message
            : "Failed to create invitation",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleAction = async (
    action: () => Promise<void>,
    invitationId: string
  ) => {
    setActionLoading(invitationId);
    try {
      await action();
    } finally {
      setActionLoading(null);
    }
  };

  const handleCopyLink = async (link: string, invitationId: string) => {
    try {
      await onCopyLink?.(link);
      await navigator.clipboard.writeText(link);
      setCopiedLink(invitationId);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch {}
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col flex-wrap gap-3 md:flex-row md:items-start md:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <CardTitle>Invitations</CardTitle>
            <CardDescription>
              {pendingInvitations.length} pending, {acceptedInvitations.length}{" "}
              accepted
            </CardDescription>
          </div>
          <Dialog onOpenChange={setCreateDialogOpen} open={createDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full shrink-0 md:w-auto" type="button">
                <Plus className="size-4" />
                Create Invitation
              </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Invitation</DialogTitle>
                <DialogDescription>
                  Invite someone to join your team
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
                {allowDirectLinks && (
                  <Field>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={inviteData.useDirectLink}
                        id="use-direct-link"
                        onCheckedChange={(checked: boolean) =>
                          setInviteData((prev) => ({
                            ...prev,
                            useDirectLink: checked === true,
                          }))
                        }
                      />
                      <FieldLabel htmlFor="use-direct-link">
                        Generate direct link (no email required)
                      </FieldLabel>
                    </div>
                  </Field>
                )}
                {!inviteData.useDirectLink && (
                  <Field>
                    <FieldLabel htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </FieldLabel>
                    <FieldContent>
                      <InputGroup>
                        <InputGroupAddon>
                          <Mail className="size-4" />
                        </InputGroupAddon>
                        <InputGroupInput
                          id="email"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setInviteData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          placeholder="colleague@example.com"
                          type="email"
                          value={inviteData.email}
                        />
                      </InputGroup>
                    </FieldContent>
                    {errors.email && <FieldError>{errors.email}</FieldError>}
                  </Field>
                )}
                <Field>
                  <FieldLabel htmlFor="role">Role</FieldLabel>
                  <FieldContent>
                    <Select
                      onValueChange={(value: "admin" | "member" | "viewer") =>
                        setInviteData((prev) => ({ ...prev, role: value }))
                      }
                      value={inviteData.role}
                    >
                      <SelectTrigger id="role">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldContent>
                  <FieldDescription>
                    Members can create content, admins can manage the team
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="expires">Expires in</FieldLabel>
                  <FieldContent>
                    <Select
                      onValueChange={(value: string) =>
                        setInviteData((prev) => ({
                          ...prev,
                          expiresInDays: Number.parseInt(value),
                        }))
                      }
                      value={inviteData.expiresInDays.toString()}
                    >
                      <SelectTrigger id="expires">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day</SelectItem>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel htmlFor="message">Message (optional)</FieldLabel>
                  <FieldContent>
                    <Textarea
                      id="message"
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setInviteData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Add a personal message…"
                      rows={3}
                      value={inviteData.message}
                    />
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
                  aria-busy={isCreating}
                  data-loading={isCreating}
                  onClick={handleCreate}
                  type="button"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Creating…
                    </>
                  ) : (
                    <>
                      <Mail className="size-4" />
                      Send Invitation
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {invitations.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Mail className="size-6" />
              </EmptyMedia>
              <EmptyTitle>No invitations yet</EmptyTitle>
              <EmptyDescription>Create one to get started.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="flex flex-col gap-4">
            {invitations.map((invitation) => (
              <div
                className="flex flex-col gap-3 rounded-lg border bg-card p-4"
                key={invitation.id}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {invitation.email ? (
                        <span className="font-medium text-sm">
                          {invitation.email}
                        </span>
                      ) : (
                        <span className="font-medium text-sm">Direct Link</span>
                      )}
                      {getStatusBadge(invitation.status)}
                      <Badge variant="outline">{invitation.role}</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
                      <span>
                        Invited by {invitation.invitedBy.name} on{" "}
                        {formatDate(invitation.createdAt)}
                      </span>
                      {invitation.expiresAt && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span>
                            Expires in {formatTimeUntil(invitation.expiresAt)}
                          </span>
                        </>
                      )}
                      {invitation.acceptedAt && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span>
                            Accepted {formatDate(invitation.acceptedAt)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  {invitation.status === "pending" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-label="More options"
                          size="icon"
                          type="button"
                          variant="ghost"
                        >
                          {actionLoading === invitation.id ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <X className="size-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        collisionPadding={8}
                        sideOffset={4}
                      >
                        {onResend && (
                          <DropdownMenuItem
                            onSelect={() =>
                              handleAction(
                                () => onResend(invitation.id),
                                invitation.id
                              )
                            }
                          >
                            <RefreshCw className="size-4" />
                            Resend
                          </DropdownMenuItem>
                        )}
                        {onRevoke && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onSelect={() =>
                                handleAction(
                                  () => onRevoke(invitation.id),
                                  invitation.id
                                )
                              }
                              variant="destructive"
                            >
                              <Trash2 className="size-4" />
                              Revoke
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                {invitation.link && (
                  <div className="flex items-center gap-2 rounded-md border bg-muted/30 p-2">
                    <code className="wrap-break-word truncate text-wrap break-all text-xs">
                      {invitation.link}
                    </code>
                    <Button
                      aria-label="Copy link"
                      onClick={() =>
                        handleCopyLink(invitation.link!, invitation.id)
                      }
                      size="icon-sm"
                      type="button"
                      variant="ghost"
                    >
                      {copiedLink === invitation.id ? (
                        <Check className="size-4" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

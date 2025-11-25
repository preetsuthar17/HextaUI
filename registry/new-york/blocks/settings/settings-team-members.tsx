"use client";

import {
  Crown,
  Loader2,
  MoreVertical,
  Send,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar";
import { Badge } from "@/registry/new-york/ui/badge";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
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
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/new-york/ui/field";
import {
  InputGroup,
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

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "owner" | "admin" | "member" | "viewer";
  status: "active" | "invited" | "suspended";
  lastActive?: Date;
  joinedAt: Date;
}

export interface SettingsTeamMembersProps {
  members?: TeamMember[];
  currentUserId?: string;
  onInvite?: (data: {
    email: string;
    role: "admin" | "member" | "viewer";
    message?: string;
  }) => Promise<void>;
  onRemove?: (memberId: string) => Promise<void>;
  onChangeRole?: (
    memberId: string,
    role: "admin" | "member" | "viewer"
  ) => Promise<void>;
  onTransferOwnership?: (memberId: string) => Promise<void>;
  className?: string;
}

const roleDescriptions = {
  owner: "Full access to all settings and billing",
  admin: "Can manage team members and settings",
  member: "Can create and edit content",
  viewer: "Read-only access",
};

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatLastActive(date?: Date): string {
  if (!date) return "Never";
  const now = Date.now();
  const diff = now - date.getTime();
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
}

export default function SettingsTeamMembers({
  members = [],
  currentUserId,
  onInvite,
  onRemove,
  onChangeRole,
  onTransferOwnership,
  className,
}: SettingsTeamMembersProps) {
  const [isInviting, setIsInviting] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [inviteData, setInviteData] = useState({
    email: "",
    role: "member" as "admin" | "member" | "viewer",
    message: "",
  });

  const handleInvite = async () => {
    setErrors({});

    if (!inviteData.email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteData.email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    setIsInviting(true);
    try {
      await onInvite?.(inviteData);
      setInviteData({ email: "", role: "member", message: "" });
      setInviteDialogOpen(false);
    } catch (error) {
      setErrors({
        _general:
          error instanceof Error ? error.message : "Failed to send invitation",
      });
    } finally {
      setIsInviting(false);
    }
  };

  const getInitials = (name: string): string =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <CardTitle className="wrap-break-word">Team Members</CardTitle>
            <CardDescription className="wrap-break-word">
              Manage team members and their roles
            </CardDescription>
          </div>
          <Dialog onOpenChange={setInviteDialogOpen} open={inviteDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full shrink-0 sm:w-auto" type="button">
                <UserPlus className="size-4" />
                <span className="whitespace-nowrap">Invite Member</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join your team
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
                  <FieldLabel htmlFor="invite-email">
                    Email <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="invite-email"
                        onChange={(e) =>
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
                    {errors.email && <FieldError>{errors.email}</FieldError>}
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="invite-role">Role</FieldLabel>
                  <FieldContent>
                    <Select
                      onValueChange={(value: "admin" | "member" | "viewer") =>
                        setInviteData((prev) => ({ ...prev, role: value }))
                      }
                      value={inviteData.role}
                    >
                      <SelectTrigger id="invite-role">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      {roleDescriptions[inviteData.role]}
                    </FieldDescription>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="invite-message">
                    Message (Optional)
                  </FieldLabel>
                  <FieldContent>
                    <Textarea
                      id="invite-message"
                      onChange={(e) =>
                        setInviteData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Add a personal message..."
                      rows={3}
                      value={inviteData.message}
                    />
                  </FieldContent>
                </Field>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => setInviteDialogOpen(false)}
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  disabled={isInviting}
                  onClick={handleInvite}
                  type="button"
                >
                  {isInviting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
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
        {members.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <UserPlus className="size-6 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-sm">No team members</p>
              <p className="text-muted-foreground text-sm">
                Invite team members to collaborate
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {members.map((member) => {
              const isCurrentUser = member.id === currentUserId;
              const isOwner = member.role === "owner";
              const canManage = !(isOwner || isCurrentUser);

              return (
                <div
                  className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                  key={member.id}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarImage alt={member.name} src={member.avatar} />
                      <AvatarFallback>
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-medium text-sm">{member.name}</h4>
                        {isOwner && (
                          <Badge
                            className="flex items-center gap-1 text-xs"
                            variant="default"
                          >
                            <Crown className="size-3" />
                            <span>Owner</span>
                          </Badge>
                        )}
                        {member.status === "invited" && (
                          <Badge className="text-xs" variant="secondary">
                            Invited
                          </Badge>
                        )}
                        {member.status === "suspended" && (
                          <Badge className="text-xs" variant="destructive">
                            Suspended
                          </Badge>
                        )}
                        {isCurrentUser && (
                          <Badge className="text-xs" variant="outline">
                            You
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-xs">
                        {member.email}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-xs">
                        <span className="capitalize">{member.role}</span>
                        <span>•</span>
                        <span>Joined {formatDate(member.joinedAt)}</span>
                        {member.lastActive && (
                          <>
                            <span>•</span>
                            <span>
                              Active {formatLastActive(member.lastActive)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {canManage && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-label={`More options for ${member.name}`}
                          size="icon-sm"
                          type="button"
                          variant="ghost"
                        >
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onChangeRole && (
                          <>
                            <DropdownMenuItem
                              onClick={() => onChangeRole(member.id, "admin")}
                            >
                              Change to Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onChangeRole(member.id, "member")}
                            >
                              Change to Member
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onChangeRole(member.id, "viewer")}
                            >
                              Change to Viewer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        {onTransferOwnership && (
                          <>
                            <DropdownMenuItem
                              className="flex items-center gap-2"
                              onClick={() => onTransferOwnership(member.id)}
                            >
                              <Crown className="size-4" />
                              <span>Transfer Ownership</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        {onRemove && (
                          <DropdownMenuItem
                            className="flex items-center gap-2 text-destructive"
                            onClick={() => onRemove(member.id)}
                          >
                            <Trash2 className="size-4" />
                            <span>Remove Member</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

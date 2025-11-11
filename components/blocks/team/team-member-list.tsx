"use client";

import {
  Crown,
  Loader2,
  Mail,
  MoreVertical,
  Shield,
  Trash2,
  User,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "owner" | "admin" | "member" | "viewer";
  status: "active" | "invited" | "suspended";
  lastActive?: Date;
  joinedAt: Date;
  aiUsage?: {
    tokens: number;
    sessions: number;
  };
}

export interface TeamMemberListProps {
  members?: TeamMember[];
  currentUserId?: string;
  onPromote?: (memberId: string) => Promise<void>;
  onDemote?: (memberId: string) => Promise<void>;
  onRemove?: (memberId: string) => Promise<void>;
  onResendInvite?: (memberId: string) => Promise<void>;
  className?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  showUsage?: boolean;
}

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

function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

function getRoleIcon(role: TeamMember["role"]) {
  switch (role) {
    case "owner":
      return Crown;
    case "admin":
      return Shield;
    case "member":
      return UserCheck;
    case "viewer":
      return User;
    default:
      return User;
  }
}

function getRoleBadgeVariant(role: TeamMember["role"]) {
  switch (role) {
    case "owner":
      return "default";
    case "admin":
      return "secondary";
    default:
      return "outline";
  }
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TeamMemberList({
  members = [],
  currentUserId,
  onPromote,
  onDemote,
  onRemove,
  onResendInvite,
  className,
  showSearch = true,
  showFilters = true,
  showUsage = false,
}: TeamMemberListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      !searchQuery.trim() ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAction = async (
    action: () => Promise<void>,
    memberId: string
  ) => {
    setActionLoading(memberId);
    try {
      await action();
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              {members.length} member{members.length !== 1 ? "s" : ""} in your
              team
            </CardDescription>
          </div>
          {showSearch && (
            <InputGroup>
              <InputGroupAddon>
                <svg
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </InputGroupAddon>
              <InputGroupInput
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search members…"
                type="search"
                value={searchQuery}
              />
            </InputGroup>
          )}
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              <Select onValueChange={setRoleFilter} value={roleFilter}>
                <SelectTrigger className="w-full md:w-[140px]">
                  <SelectValue placeholder="All roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All roles</SelectItem>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={setStatusFilter} value={statusFilter}>
                <SelectTrigger className="w-full md:w-[140px]">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="invited">Invited</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {filteredMembers.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <User className="size-6" />
              </EmptyMedia>
              <EmptyTitle>
                {searchQuery || roleFilter !== "all" || statusFilter !== "all"
                  ? "No members found"
                  : "No members yet"}
              </EmptyTitle>
              <EmptyDescription>
                {searchQuery || roleFilter !== "all" || statusFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Invite members to get started"}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="flex flex-col gap-0 overflow-hidden rounded-lg border">
            {filteredMembers.map((member, idx) => {
              const RoleIcon = getRoleIcon(member.role);
              const isCurrentUser = member.id === currentUserId;
              const canModify = !isCurrentUser && member.role !== "owner";

              return (
                <div key={member.id}>
                  <div className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50">
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-2 font-medium text-sm">
                          {" "}
                          <Avatar className="size-8">
                            <AvatarImage
                              alt={member.name}
                              src={member.avatar}
                            />
                            <AvatarFallback>
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          {member.name}
                        </span>
                        {isCurrentUser && (
                          <Badge className="text-xs" variant="secondary">
                            You
                          </Badge>
                        )}
                        <Badge
                          className="text-xs"
                          variant={getRoleBadgeVariant(member.role)}
                        >
                          <RoleIcon className="mr-1 size-3" />
                          {member.role}
                        </Badge>
                        {member.status === "invited" && (
                          <Badge className="text-xs" variant="outline">
                            Invited
                          </Badge>
                        )}
                        {member.status === "suspended" && (
                          <Badge className="text-xs" variant="destructive">
                            Suspended
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {member.email}
                      </p>
                      <div className="flex flex-wrap items-center gap-1 text-muted-foreground text-xs">
                        <span>Joined {formatDate(member.joinedAt)}</span>
                        {member.lastActive && (
                          <>
                            <span aria-hidden="true">•</span>
                            <span>
                              Active {formatLastActive(member.lastActive)}
                            </span>
                          </>
                        )}
                        {showUsage && member.aiUsage && (
                          <>
                            <span aria-hidden="true">•</span>
                            <span>
                              {formatNumber(member.aiUsage.tokens)} tokens
                            </span>
                            <span aria-hidden="true">•</span>
                            <span>
                              {member.aiUsage.sessions} session
                              {member.aiUsage.sessions !== 1 ? "s" : ""}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    {canModify && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-label={`More options for ${member.name}`}
                            size="icon"
                            type="button"
                            variant="ghost"
                          >
                            {actionLoading === member.id ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <MoreVertical className="size-4" />
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          collisionPadding={8}
                          sideOffset={4}
                        >
                          {member.role === "member" && onPromote && (
                            <DropdownMenuItem
                              onSelect={() =>
                                handleAction(
                                  () => onPromote(member.id),
                                  member.id
                                )
                              }
                            >
                              <Shield className="size-4" />
                              Promote to Admin
                            </DropdownMenuItem>
                          )}
                          {member.role === "admin" && onDemote && (
                            <DropdownMenuItem
                              onSelect={() =>
                                handleAction(
                                  () => onDemote(member.id),
                                  member.id
                                )
                              }
                            >
                              <UserCheck className="size-4" />
                              Demote to Member
                            </DropdownMenuItem>
                          )}
                          {member.status === "invited" && onResendInvite && (
                            <DropdownMenuItem
                              onSelect={() =>
                                handleAction(
                                  () => onResendInvite(member.id),
                                  member.id
                                )
                              }
                            >
                              <Mail className="size-4" />
                              Resend Invitation
                            </DropdownMenuItem>
                          )}
                          {member.role !== "viewer" && (
                            <DropdownMenuSeparator />
                          )}
                          {onRemove && (
                            <>
                              <DropdownMenuItem
                                onSelect={() =>
                                  handleAction(
                                    () => onRemove(member.id),
                                    member.id
                                  )
                                }
                                variant="destructive"
                              >
                                <Trash2 className="size-4" />
                                Remove Member
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  {idx < filteredMembers.length - 1 && <Separator />}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

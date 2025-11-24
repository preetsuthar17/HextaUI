"use client";

import {
  Activity,
  Bot,
  FileText,
  MessageSquare,
  Plus,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
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
import { Progress } from "@/registry/new-york/ui/progress";
import { Separator } from "@/registry/new-york/ui/separator";

export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  role: "owner" | "admin" | "member" | "viewer";
  status: "active" | "away" | "offline";
}

export interface TeamActivity {
  id: string;
  type: "member_joined" | "ai_session" | "file_uploaded" | "note_created";
  user: {
    name: string;
    avatar?: string;
  };
  description: string;
  timestamp: Date;
}

export interface TeamUsage {
  aiTokens: {
    used: number;
    limit: number;
  };
  storage: {
    used: number;
    limit: number;
  };
  members: {
    current: number;
    limit: number;
  };
}

export interface TeamDashboardProps {
  teamName: string;
  teamAvatar?: string;
  plan?: "free" | "pro" | "enterprise";
  members?: TeamMember[];
  recentActivities?: TeamActivity[];
  usage?: TeamUsage;
  onInviteMember?: () => void;
  onManageSettings?: () => void;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round((bytes / k ** i) * 100) / 100} ${sizes[i]}`;
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

function formatTimeAgo(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function getActivityIcon(type: TeamActivity["type"]) {
  switch (type) {
    case "member_joined":
      return Users;
    case "ai_session":
      return Bot;
    case "file_uploaded":
      return FileText;
    case "note_created":
      return MessageSquare;
    default:
      return Activity;
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

export default function TeamDashboard({
  teamName,
  teamAvatar,
  plan = "free",
  members = [],
  recentActivities = [],
  usage,
  onInviteMember,
  onManageSettings,
  className,
}: TeamDashboardProps) {
  const activeMembers = members.filter((m) => m.status === "active").length;
  const onlineMembers = members.filter((m) => m.status === "active").length;

  return (
    <div className={cn("flex w-full flex-col gap-6", className)}>
      {/* Header */}
      <div className="flex flex-col flex-wrap gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-12">
            <AvatarImage alt={teamName} src={teamAvatar} />
            <AvatarFallback>{getInitials(teamName)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-xl">{teamName}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{plan}</Badge>
              <span className="text-muted-foreground text-sm">
                {members.length} member{members.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {onInviteMember && (
            <Button onClick={onInviteMember} type="button">
              <Plus className="size-4" />
              Invite Member
            </Button>
          )}
          {onManageSettings && (
            <Button onClick={onManageSettings} type="button" variant="outline">
              <Settings className="size-4" />
              Settings
            </Button>
          )}
        </div>
      </div>

      {/* Usage Stats */}
      {usage && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="font-medium text-sm">AI Usage</CardTitle>
              <CardDescription className="text-muted-foreground">
                How many AI tokens your team used this month.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-2xl">
                  {formatNumber(usage.aiTokens.used)}
                </span>
                <span className="text-muted-foreground text-sm">
                  / {formatNumber(usage.aiTokens.limit)} tokens
                </span>
              </div>
              <Progress
                value={(usage.aiTokens.used / usage.aiTokens.limit) * 100}
              />
            </CardContent>
          </Card>

          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="font-medium text-sm">Storage</CardTitle>
              <CardDescription className="text-muted-foreground">
                Space your team is using for storing files.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-2xl">
                  {formatBytes(usage.storage.used)}
                </span>
                <span className="text-muted-foreground text-sm">
                  / {formatBytes(usage.storage.limit)}
                </span>
              </div>
              <Progress
                value={(usage.storage.used / usage.storage.limit) * 100}
              />
            </CardContent>
          </Card>

          <Card className="shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="font-medium text-sm">Members</CardTitle>
              <CardDescription className="text-muted-foreground">
                Number of people in your current team.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-2xl">
                  {usage.members.current}
                </span>
                <span className="text-muted-foreground text-sm">
                  / {usage.members.limit} members
                </span>
              </div>
              <Progress
                value={(usage.members.current / usage.members.limit) * 100}
              />
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card className="shadow-xs">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common team operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <Button
                asChild
                className="h-auto flex-col gap-2 py-4"
                variant="outline"
              >
                <Link href="#chat">
                  <MessageSquare className="size-5" />
                  <span>Team Chat</span>
                </Link>
              </Button>
              <Button
                asChild
                className="h-auto flex-col gap-2 py-4"
                variant="outline"
              >
                <Link href="#ai-room">
                  <Bot className="size-5" />
                  <span>AI Room</span>
                </Link>
              </Button>
              <Button
                asChild
                className="h-auto flex-col gap-2 py-4"
                variant="outline"
              >
                <Link href="#files">
                  <FileText className="size-5" />
                  <span>Files</span>
                </Link>
              </Button>
              <Button
                asChild
                className="h-auto flex-col gap-2 py-4"
                variant="outline"
              >
                <Link href="#analytics">
                  <TrendingUp className="size-5" />
                  <span>Analytics</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Members */}
        <Card className="shadow-xs">
          <CardHeader>
            <CardTitle>Active Members</CardTitle>
            <CardDescription>
              {onlineMembers} member{onlineMembers !== 1 ? "s" : ""} online
            </CardDescription>
          </CardHeader>
          <CardContent>
            {members.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
                <Users className="size-8 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">No members yet</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {members.slice(0, 8).map((member) => (
                  <div
                    className="flex flex-col items-center gap-2"
                    key={member.id}
                  >
                    <div className="relative">
                      <Avatar className="size-10">
                        <AvatarImage alt={member.name} src={member.avatar} />
                        <AvatarFallback>
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      {member.status === "active" && (
                        <div className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-background bg-green-500" />
                      )}
                    </div>
                    <span className="max-w-[60px] truncate text-xs">
                      {member.name}
                    </span>
                  </div>
                ))}
                {members.length > 8 && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded-full border bg-muted">
                      <span className="text-muted-foreground text-xs">
                        +{members.length - 8}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      {recentActivities.length > 0 && (
        <Card className="shadow-xs">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest team updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {recentActivities.slice(0, 5).map((activity, idx) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id}>
                    <div className="flex items-start gap-3">
                      <Avatar className="size-8 shrink-0">
                        <AvatarImage
                          alt={activity.user.name}
                          src={activity.user.avatar}
                        />
                        <AvatarFallback className="text-xs">
                          {getInitials(activity.user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {activity.user.name}
                          </span>
                          <div className="flex size-4 items-center justify-center rounded-full text-muted-foreground">
                            <Icon className="size-3" />
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {activity.description}
                        </p>
                        <span className="text-muted-foreground text-xs">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                    {idx < recentActivities.slice(0, 5).length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

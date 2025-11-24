"use client";

import {
  Activity,
  Bot,
  FileText,
  MessageSquare,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
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
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/new-york/ui/empty";
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
import { Separator } from "@/registry/new-york/ui/separator";

export type ActivityType =
  | "member_joined"
  | "member_left"
  | "member_role_changed"
  | "ai_session_created"
  | "file_uploaded"
  | "file_deleted"
  | "note_created"
  | "note_updated"
  | "project_created"
  | "project_updated"
  | "chat_message"
  | "settings_updated";

export interface ActivityEntry {
  id: string;
  type: ActivityType;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  description: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
  projectId?: string;
  projectName?: string;
}

export interface TeamActivityFeedProps {
  activities?: ActivityEntry[];
  onFilterChange?: (filters: {
    type?: ActivityType;
    userId?: string;
    projectId?: string;
  }) => void;
  className?: string;
  showFilters?: boolean;
  showSearch?: boolean;
  itemsPerPage?: number;
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatDate(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatRelativeTime(date: Date): string {
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

function getActivityIcon(type: ActivityType) {
  switch (type) {
    case "member_joined":
    case "member_left":
      return UserPlus;
    case "member_role_changed":
      return Users;
    case "ai_session_created":
      return Bot;
    case "file_uploaded":
    case "file_deleted":
      return FileText;
    case "note_created":
    case "note_updated":
      return MessageSquare;
    case "chat_message":
      return MessageSquare;
    default:
      return Activity;
  }
}

function getActivityColor(type: ActivityType): string {
  switch (type) {
    case "member_joined":
      return "text-green-600";
    case "member_left":
      return "text-red-600";
    case "ai_session_created":
      return "text-primary";
    default:
      return "text-muted-foreground";
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

export default function TeamActivityFeed({
  activities = [],
  onFilterChange,
  className,
  showFilters = true,
  showSearch = true,
  itemsPerPage = 20,
}: TeamActivityFeedProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [displayedCount, setDisplayedCount] = useState(itemsPerPage);

  const filteredActivities = useMemo(() => {
    let filtered = activities;

    if (typeFilter !== "all") {
      filtered = filtered.filter((a) => a.type === typeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.description.toLowerCase().includes(query) ||
          a.user.name.toLowerCase().includes(query) ||
          a.projectName?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activities, typeFilter, searchQuery]);

  const displayedActivities = filteredActivities.slice(0, displayedCount);
  const hasMore = displayedActivities.length < filteredActivities.length;

  const groupedActivities = displayedActivities.reduce(
    (groups, activity) => {
      const dateKey = formatDate(activity.timestamp);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(activity);
      return groups;
    },
    {} as Record<string, ActivityEntry[]>
  );

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <CardTitle>Activity Feed</CardTitle>
            <CardDescription>Recent team activity and updates</CardDescription>
          </div>
          <div className="flex flex-col flex-wrap gap-2 md:flex-row">
            {showSearch && (
              <InputGroup className="flex-1">
                <InputGroupAddon>
                  <Search className="size-4" />
                </InputGroupAddon>
                <InputGroupInput
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  placeholder="Search activities…"
                  type="search"
                  value={searchQuery}
                />
              </InputGroup>
            )}
            {showFilters && (
              <Select onValueChange={setTypeFilter} value={typeFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="member_joined">Member joined</SelectItem>
                  <SelectItem value="ai_session_created">
                    AI sessions
                  </SelectItem>
                  <SelectItem value="file_uploaded">File uploads</SelectItem>
                  <SelectItem value="note_created">Notes</SelectItem>
                  <SelectItem value="project_created">Projects</SelectItem>
                  <SelectItem value="chat_message">Chat messages</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {displayedActivities.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Activity className="size-6" />
              </EmptyMedia>
              <EmptyTitle>
                {searchQuery || typeFilter !== "all"
                  ? "No activities found"
                  : "No activities yet"}
              </EmptyTitle>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="flex flex-col gap-6">
            {Object.entries(groupedActivities).map(
              ([dateKey, dateActivities]) => (
                <div key={dateKey}>
                  <div className="relative mb-8">
                    <Separator />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-background px-2 text-muted-foreground text-xs">
                        {dateKey}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    {dateActivities.map((activity) => {
                      const Icon = getActivityIcon(activity.type);
                      return (
                        <div
                          className="flex items-start gap-3"
                          key={activity.id}
                        >
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
                              <div
                                className={cn(
                                  "flex size-4 items-center justify-center rounded-full",
                                  getActivityColor(activity.type)
                                )}
                              >
                                <Icon className="size-3" />
                              </div>
                              {activity.projectName && (
                                <Badge className="text-xs" variant="outline">
                                  {activity.projectName}
                                </Badge>
                              )}
                            </div>
                            <p className="wrap-break-word text-sm">
                              {activity.description}
                            </p>
                            <span className="text-muted-foreground text-xs">
                              {formatRelativeTime(activity.timestamp)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            )}
            {hasMore && (
              <Button
                className="w-full"
                onClick={() => setDisplayedCount((prev) => prev + itemsPerPage)}
                type="button"
                variant="outline"
              >
                Load More
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

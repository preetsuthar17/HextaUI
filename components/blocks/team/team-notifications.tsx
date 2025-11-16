"use client";

import {
  Bell,
  Check,
  CheckCheck,
  MessageSquare,
  MoreVertical,
  X,
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
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type NotificationType =
  | "mention"
  | "ai_event"
  | "member_joined"
  | "file_shared"
  | "note_updated"
  | "project_updated"
  | "system";

export interface TeamNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  link?: string;
  read: boolean;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface TeamNotificationsProps {
  notifications?: TeamNotification[];
  onMarkAsRead?: (notificationId: string) => Promise<void>;
  onMarkAllAsRead?: () => Promise<void>;
  onDelete?: (notificationId: string) => Promise<void>;
  onClearAll?: () => Promise<void>;
  className?: string;
  showFilters?: boolean;
  unreadCount?: number;
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
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "mention":
      return MessageSquare;
    case "ai_event":
      return Bell;
    default:
      return Bell;
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

export default function TeamNotifications({
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onClearAll,
  className,
  showFilters = true,
  unreadCount,
}: TeamNotificationsProps) {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredNotifications = notifications.filter((notification) => {
    const matchesType =
      typeFilter === "all" || notification.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "unread" && !notification.read) ||
      (statusFilter === "read" && notification.read);
    return matchesType && matchesStatus;
  });

  const unreadNotifications = filteredNotifications.filter((n) => !n.read);
  const displayUnreadCount = unreadCount ?? unreadNotifications.length;

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col flex-wrap gap-3 md:flex-row md:items-start md:justify-between">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                {displayUnreadCount > 0 && (
                  <span className="text-primary">
                    {displayUnreadCount} unread
                  </span>
                )}
                {displayUnreadCount === 0 && "All caught up!"}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {onMarkAllAsRead && displayUnreadCount > 0 && (
                <Button
                  onClick={onMarkAllAsRead}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  <CheckCheck className="size-4" />
                  Mark all read
                </Button>
              )}
              {onClearAll && (
                <Button
                  onClick={onClearAll}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  <X className="size-4" />
                  Clear all
                </Button>
              )}
            </div>
          </div>
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              <Select onValueChange={setTypeFilter} value={typeFilter || "all"}>
                <SelectTrigger className="w-full md:w-[140px]">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="mention">Mentions</SelectItem>
                  <SelectItem value="ai_event">AI Events</SelectItem>
                  <SelectItem value="member_joined">Members</SelectItem>
                  <SelectItem value="file_shared">Files</SelectItem>
                  <SelectItem value="note_updated">Notes</SelectItem>
                  <SelectItem value="project_updated">Projects</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Select
                onValueChange={setStatusFilter}
                value={statusFilter || "all"}
              >
                <SelectTrigger className="w-full md:w-[140px]">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {filteredNotifications.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Bell className="size-6" />
              </EmptyMedia>
              <EmptyTitle>
                {typeFilter !== "all" || statusFilter !== "all"
                  ? "No notifications match your filters"
                  : "No notifications yet"}
              </EmptyTitle>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="flex flex-col gap-0">
            {filteredNotifications.map((notification, idx) => {
              const Icon = getNotificationIcon(notification.type);
              const isFirst = idx === 0;
              const isLast = idx === filteredNotifications.length - 1;
              return (
                <div key={notification.id}>
                  <div
                    className={cn(
                      "flex items-start gap-4 p-4 transition-colors",
                      !notification.read && "bg-primary/5",
                      "hover:bg-muted/50",
                      isFirst && "rounded-t-lg",
                      isLast && "rounded-b-lg"
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-full",
                        notification.read
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      {notification.user ? (
                        <Avatar className="size-10">
                          <AvatarImage
                            alt={notification.user.name}
                            src={notification.user.avatar}
                          />
                          <AvatarFallback>
                            {getInitials(notification.user.name)}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <Icon className="size-5" />
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="font-medium text-sm">
                          {notification.title}
                        </span>
                        {!notification.read && (
                          <div className="size-2 shrink-0 rounded-full bg-primary" />
                        )}
                        <Badge className="text-xs" variant="outline">
                          {notification.type}
                        </Badge>
                      </div>
                      <p className="wrap-break-word text-muted-foreground text-sm">
                        {notification.message}
                      </p>
                      <span className="text-muted-foreground text-xs">
                        {formatRelativeTime(notification.timestamp)}
                      </span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-label="More options"
                          size="icon-sm"
                          type="button"
                          variant="ghost"
                        >
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {!notification.read && onMarkAsRead && (
                          <DropdownMenuItem
                            onClick={() => onMarkAsRead(notification.id)}
                          >
                            <Check className="size-4" />
                            Mark as read
                          </DropdownMenuItem>
                        )}
                        {notification.link && (
                          <DropdownMenuItem asChild>
                            <a href={notification.link}>
                              <MessageSquare className="size-4" />
                              View
                            </a>
                          </DropdownMenuItem>
                        )}
                        {onDelete && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onSelect={() => onDelete(notification.id)}
                              variant="destructive"
                            >
                              <X className="size-4" />
                              Delete
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {idx < filteredNotifications.length - 1 && <Separator />}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import {
  Archive,
  MessageSquare,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/new-york/ui/input-group";
import { Separator } from "@/registry/new-york/ui/separator";

export interface Conversation {
  id: string;
  title: string;
  lastMessage?: string;
  lastMessageAt?: Date;
  messageCount?: number;
  isArchived?: boolean;
  isActive?: boolean;
}

export interface AIChatHistoryProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onSelect?: (conversationId: string) => void;
  onNewConversation?: () => void;
  onRename?: (conversationId: string, newTitle: string) => Promise<void>;
  onDelete?: (conversationId: string) => Promise<void>;
  onArchive?: (conversationId: string) => Promise<void>;
  onUnarchive?: (conversationId: string) => Promise<void>;
  className?: string;
  showSearch?: boolean;
  showNewButton?: boolean;
}

function formatDate(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const thisWeek = new Date(today);
  thisWeek.setDate(thisWeek.getDate() - 7);

  const dateOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  if (dateOnly.getTime() === today.getTime()) {
    return "Today";
  }
  if (dateOnly.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }
  if (dateOnly.getTime() >= thisWeek.getTime()) {
    return "This Week";
  }

  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  const currentYear = now.getFullYear();

  if (year === currentYear) {
    return `${month} ${day}`;
  }
  return `${month} ${day}, ${year}`;
}

function groupConversationsByDate(conversations: Conversation[]): {
  label: string;
  conversations: Conversation[];
}[] {
  const groups: Record<string, Conversation[]> = {};

  conversations.forEach((conv) => {
    if (!conv.lastMessageAt) {
      if (!groups["Older"]) {
        groups["Older"] = [];
      }
      groups["Older"].push(conv);
      return;
    }

    const label = formatDate(conv.lastMessageAt);
    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(conv);
  });

  const orderedLabels = ["Today", "Yesterday", "This Week"];
  const result: { label: string; conversations: Conversation[] }[] = [];

  orderedLabels.forEach((label) => {
    if (groups[label]) {
      result.push({ label, conversations: groups[label] });
      delete groups[label];
    }
  });

  Object.keys(groups)
    .sort()
    .forEach((label) => {
      result.push({ label, conversations: groups[label] });
    });

  if (groups["Older"]) {
    result.push({ label: "Older", conversations: groups["Older"] });
  }

  return result;
}

export default function AIChatHistory({
  conversations,
  activeConversationId,
  onSelect,
  onNewConversation,
  onRename,
  onDelete,
  onArchive,
  onUnarchive,
  className,
  showSearch = true,
  showNewButton = true,
}: AIChatHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;

    const query = searchQuery.toLowerCase();
    return conversations.filter(
      (conv) =>
        conv.title.toLowerCase().includes(query) ||
        conv.lastMessage?.toLowerCase().includes(query)
    );
  }, [conversations, searchQuery]);

  const groupedConversations = useMemo(
    () => groupConversationsByDate(filteredConversations),
    [filteredConversations]
  );

  const handleRenameStart = (conversation: Conversation) => {
    setEditingId(conversation.id);
    setEditValue(conversation.title);
  };

  const handleRenameSubmit = async (conversationId: string) => {
    if (!(onRename && editValue.trim())) {
      setEditingId(null);
      return;
    }

    await onRename(conversationId, editValue.trim());
    setEditingId(null);
  };

  const handleRenameCancel = () => {
    setEditingId(null);
    setEditValue("");
  };

  return (
    <Card className={cn("flex h-fit flex-col shadow-xs", className)}>
      <CardHeader className="shrink-0">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <CardTitle>Conversations</CardTitle>
              <CardDescription>
                {conversations.length} conversation
                {conversations.length !== 1 ? "s" : ""}
              </CardDescription>
            </div>
            {showNewButton && onNewConversation && (
              <Button
                className="w-full shrink-0"
                onClick={onNewConversation}
                type="button"
              >
                <Plus className="size-4" />
                <span className="whitespace-nowrap">New Chat</span>
              </Button>
            )}
          </div>
          {showSearch && (
            <InputGroup>
              <InputGroupAddon>
                <Search className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations…"
                type="search"
                value={searchQuery}
              />
              {searchQuery && (
                <Button
                  aria-label="Clear search"
                  className="-translate-y-1/2 absolute top-1/2 right-2"
                  onClick={() => setSearchQuery("")}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <X className="size-4" />
                </Button>
              )}
            </InputGroup>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-0 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <MessageSquare className="size-6 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-sm">
                {searchQuery ? "No conversations found" : "No conversations"}
              </p>
              <p className="text-muted-foreground text-sm">
                {searchQuery
                  ? "Try a different search term"
                  : "Start a new conversation to get started"}
              </p>
            </div>
            {!searchQuery && showNewButton && onNewConversation && (
              <Button
                onClick={onNewConversation}
                type="button"
                variant="outline"
              >
                <Plus className="size-4" />
                New Conversation
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {groupedConversations.map((group, groupIdx) => (
              <div key={group.label}>
                <div className="sticky top-0 z-10 bg-card py-2">
                  <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                    {group.label}
                  </h3>
                </div>
                <div className="flex flex-col gap-1">
                  {group.conversations.map((conversation, idx) => {
                    const isActive = conversation.id === activeConversationId;
                    const isEditing = editingId === conversation.id;

                    return (
                      <div
                        className={cn(
                          "group relative flex flex-col gap-2 rounded-lg border p-3 transition-colors",
                          isActive
                            ? "border-primary bg-primary/5"
                            : "border-transparent bg-card hover:border-border hover:bg-muted/50"
                        )}
                        key={conversation.id}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            aria-label={`Select conversation ${conversation.title}`}
                            className="flex min-w-0 flex-1 flex-col gap-1 text-left"
                            onClick={() => onSelect?.(conversation.id)}
                            type="button"
                          >
                            {isEditing ? (
                              <input
                                autoFocus
                                className="w-full rounded-md border bg-background px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                onBlur={() =>
                                  handleRenameSubmit(conversation.id)
                                }
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleRenameSubmit(conversation.id);
                                  } else if (e.key === "Escape") {
                                    handleRenameCancel();
                                  }
                                }}
                                value={editValue}
                              />
                            ) : (
                              <>
                                <div className="flex flex-wrap items-center gap-2">
                                  <h4 className="wrap-break-word min-w-0 font-medium text-sm">
                                    {conversation.title}
                                  </h4>
                                </div>
                                {conversation.lastMessage && (
                                  <p className="wrap-break-word line-clamp-2 min-w-0 text-muted-foreground text-xs">
                                    {conversation.lastMessage}
                                  </p>
                                )}
                                <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
                                  {conversation.lastMessageAt && (
                                    <span className="whitespace-nowrap">
                                      {formatDate(conversation.lastMessageAt)}
                                    </span>
                                  )}
                                  {conversation.messageCount !== undefined && (
                                    <>
                                      <span
                                        aria-hidden="true"
                                        className="shrink-0"
                                      >
                                        •
                                      </span>
                                      <span className="whitespace-nowrap">
                                        {conversation.messageCount} message
                                        {conversation.messageCount !== 1
                                          ? "s"
                                          : ""}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </>
                            )}
                          </button>
                          {!isEditing && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-label={`More options for ${conversation.title}`}
                                  className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                                  size="icon"
                                  type="button"
                                  variant="ghost"
                                >
                                  <MoreVertical className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {onRename && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleRenameStart(conversation)
                                    }
                                  >
                                    <Pencil className="size-4" />
                                    Rename
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                {conversation.isArchived
                                  ? onUnarchive && (
                                      <DropdownMenuItem
                                        onClick={() =>
                                          onUnarchive(conversation.id)
                                        }
                                      >
                                        <Archive className="size-4" />
                                        Unarchive
                                      </DropdownMenuItem>
                                    )
                                  : onArchive && (
                                      <DropdownMenuItem
                                        onClick={() =>
                                          onArchive(conversation.id)
                                        }
                                      >
                                        <Archive className="size-4" />
                                        Archive
                                      </DropdownMenuItem>
                                    )}
                                {onDelete && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={() => onDelete(conversation.id)}
                                      variant="destructive"
                                    >
                                      <Trash2 className="size-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {groupIdx < groupedConversations.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

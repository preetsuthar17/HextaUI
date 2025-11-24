"use client";

import {
  Archive,
  Loader2,
  MessageSquare,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/registry/new-york/ui/alert-dialog";

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

interface EmptyStateProps {
  searchQuery: string;
  showNewButton: boolean;
  onNewConversation?: () => void;
}

function EmptyState({
  searchQuery,
  showNewButton,
  onNewConversation,
}: EmptyStateProps) {
  return (
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
          className="min-h-[44px]"
        >
          <Plus className="size-4" />
          New Conversation
        </Button>
      )}
    </div>
  );
}

interface ConversationHeaderProps {
  conversationsCount: number;
  showNewButton: boolean;
  onNewConversation?: () => void;
}

function ConversationHeader({
  conversationsCount,
  showNewButton,
  onNewConversation,
}: ConversationHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <CardTitle>Conversations</CardTitle>
          <CardDescription>
            {conversationsCount} conversation
            {conversationsCount !== 1 ? "s" : ""}
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
    </div>
  );
}

interface ConversationSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function ConversationSearch({
  value,
  onChange,
  placeholder = "Search conversations…",
}: ConversationSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key === "k" &&
        !e.shiftKey &&
        document.activeElement !== inputRef.current
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <InputGroup>
      <InputGroupAddon>
        <Search className="size-4" />
      </InputGroupAddon>
      <InputGroupInput
        ref={inputRef}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onChange("");
            inputRef.current?.blur();
          }
        }}
        placeholder={placeholder}
        type="search"
        value={value}
        aria-label="Search conversations"
      />
    </InputGroup>
  );
}

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  isEditing: boolean;
  editValue: string;
  onSelect: () => void;
  onRenameStart: () => void;
  onRenameSubmit: () => void;
  onRenameCancel: () => void;
  onEditValueChange: (value: string) => void;
  onRename?: (conversationId: string, newTitle: string) => Promise<void>;
  onDelete?: (conversationId: string) => Promise<void>;
  onArchive?: (conversationId: string) => Promise<void>;
  onUnarchive?: (conversationId: string) => Promise<void>;
  isLoading?: boolean;
}

function ConversationItem({
  conversation,
  isActive,
  isEditing,
  editValue,
  onSelect,
  onRenameStart,
  onRenameSubmit,
  onRenameCancel,
  onEditValueChange,
  onRename,
  onDelete,
  onArchive,
  onUnarchive,
  isLoading = false,
}: ConversationItemProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDelete = useCallback(async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    try {
      await onDelete(conversation.id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    } finally {
      setIsDeleting(false);
    }
  }, [conversation.id, onDelete]);

  return (
    <>
      <div
        className={cn(
          "group relative flex flex-col gap-2 rounded-lg border p-3 transition-colors",
          "min-h-[60px] touch-manipulation",
          isActive
            ? "border-primary bg-primary/5 shadow-xs"
            : "border-transparent bg-card hover:border-border hover:bg-muted/50 focus-within:border-border focus-within:bg-muted/50",
          isLoading && "opacity-50 pointer-events-none"
        )}
        role="listitem"
      >
        <div className="flex items-start gap-3">
          <button
            aria-label={`Select conversation ${conversation.title}`}
            className="flex min-w-0 flex-1 flex-col gap-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            onClick={onSelect}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect();
              }
            }}
            type="button"
            disabled={isLoading}
          >
            {isEditing ? (
              <input
                ref={inputRef}
                className="w-full rounded-md border bg-background px-2 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 min-h-[32px]"
                onBlur={onRenameSubmit}
                onChange={(e) => onEditValueChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onRenameSubmit();
                  } else if (e.key === "Escape") {
                    e.preventDefault();
                    onRenameCancel();
                  }
                }}
                value={editValue}
                aria-label="Edit conversation title"
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
                    <span className="whitespace-nowrap tabular-nums">
                      {formatDate(conversation.lastMessageAt)}
                    </span>
                  )}
                  {conversation.messageCount !== undefined && (
                    <>
                      <span aria-hidden="true" className="shrink-0">
                        •
                      </span>
                      <span className="whitespace-nowrap tabular-nums">
                        {conversation.messageCount} message
                        {conversation.messageCount !== 1 ? "s" : ""}
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
                  className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 min-h-[32px] min-w-[32px]"
                  size="icon"
                  type="button"
                  variant="ghost"
                  disabled={isLoading}
                >
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onRename && (
                  <DropdownMenuItem
                    onClick={onRenameStart}
                    disabled={isLoading}
                  >
                    <Pencil className="size-4" />
                    Rename
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                {conversation.isArchived
                  ? onUnarchive && (
                      <DropdownMenuItem
                        onClick={() => onUnarchive(conversation.id)}
                        disabled={isLoading}
                      >
                        <Archive className="size-4" />
                        Unarchive
                      </DropdownMenuItem>
                    )
                  : onArchive && (
                      <DropdownMenuItem
                        onClick={() => onArchive(conversation.id)}
                        disabled={isLoading}
                      >
                        <Archive className="size-4" />
                        Archive
                      </DropdownMenuItem>
                    )}
                {onDelete && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setShowDeleteDialog(true)}
                      disabled={isLoading}
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

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete conversation?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{conversation.title}"? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Deleting…
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

interface ConversationGroupProps {
  label: string;
  conversations: Conversation[];
  activeConversationId?: string;
  editingId: string | null;
  editValue: string;
  onSelect: (conversationId: string) => void;
  onRenameStart: (conversation: Conversation) => void;
  onRenameSubmit: (conversationId: string) => void;
  onRenameCancel: () => void;
  onEditValueChange: (value: string) => void;
  onRename?: (conversationId: string, newTitle: string) => Promise<void>;
  onDelete?: (conversationId: string) => Promise<void>;
  onArchive?: (conversationId: string) => Promise<void>;
  onUnarchive?: (conversationId: string) => Promise<void>;
  isLoading?: Record<string, boolean>;
}

function ConversationGroup({
  label,
  conversations,
  activeConversationId,
  editingId,
  editValue,
  onSelect,
  onRenameStart,
  onRenameSubmit,
  onRenameCancel,
  onEditValueChange,
  onRename,
  onDelete,
  onArchive,
  onUnarchive,
  isLoading = {},
}: ConversationGroupProps) {
  return (
    <div>
      <div className="sticky top-0 z-10 bg-card py-2">
        <h3 className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
          {label}
        </h3>
      </div>
      <div className="flex flex-col gap-1" role="list">
        {conversations.map((conversation) => {
          const isActive = conversation.id === activeConversationId;
          const isEditing = editingId === conversation.id;

          return (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={isActive}
              isEditing={isEditing}
              editValue={editValue}
              onSelect={() => onSelect(conversation.id)}
              onRenameStart={() => onRenameStart(conversation)}
              onRenameSubmit={() => onRenameSubmit(conversation.id)}
              onRenameCancel={onRenameCancel}
              onEditValueChange={onEditValueChange}
              onRename={onRename}
              onDelete={onDelete}
              onArchive={onArchive}
              onUnarchive={onUnarchive}
              isLoading={isLoading[conversation.id]}
            />
          );
        })}
      </div>
    </div>
  );
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
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;

    const query = searchQuery.toLowerCase().trim();
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

  const handleRenameStart = useCallback((conversation: Conversation) => {
    setEditingId(conversation.id);
    setEditValue(conversation.title);
  }, []);

  const handleRenameSubmit = useCallback(
    async (conversationId: string) => {
      if (!onRename || !editValue.trim()) {
        setEditingId(null);
        return;
      }

      const trimmedValue = editValue.trim();
      if (
        trimmedValue ===
        conversations.find((c) => c.id === conversationId)?.title
      ) {
        setEditingId(null);
        return;
      }

      setLoadingStates((prev) => ({ ...prev, [conversationId]: true }));
      try {
        await onRename(conversationId, trimmedValue);
        setEditingId(null);
      } catch (error) {
        console.error("Failed to rename conversation:", error);
      } finally {
        setLoadingStates((prev) => {
          const next = { ...prev };
          delete next[conversationId];
          return next;
        });
      }
    },
    [onRename, editValue, conversations]
  );

  const handleRenameCancel = useCallback(() => {
    setEditingId(null);
    setEditValue("");
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const items = containerRef.current?.querySelectorAll<HTMLElement>(
          '[role="listitem"] button'
        );
        if (!items || items.length === 0) return;

        const currentIndex = Array.from(items).findIndex(
          (item) => item === document.activeElement
        );
        const nextIndex =
          e.key === "ArrowDown"
            ? (currentIndex + 1) % items.length
            : currentIndex === -1
              ? items.length - 1
              : (currentIndex - 1 + items.length) % items.length;

        items[nextIndex]?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Card
      className={cn("flex h-fit flex-col shadow-xs max-w-sm w-full", className)}
    >
      <CardHeader className="shrink-0">
        <div className="flex flex-col gap-4">
          <ConversationHeader
            conversationsCount={conversations.length}
            onNewConversation={onNewConversation}
            showNewButton={showNewButton}
          />
          {showSearch && (
            <ConversationSearch onChange={setSearchQuery} value={searchQuery} />
          )}
        </div>
      </CardHeader>
      <CardContent
        className="flex min-h-0 flex-1 flex-col gap-0 overflow-y-auto overscroll-contain"
        ref={containerRef}
      >
        {filteredConversations.length === 0 ? (
          <EmptyState
            onNewConversation={onNewConversation}
            searchQuery={searchQuery}
            showNewButton={showNewButton}
          />
        ) : (
          <div className="flex flex-col gap-4">
            {groupedConversations.map((group, groupIdx) => (
              <div key={group.label}>
                <ConversationGroup
                  activeConversationId={activeConversationId}
                  conversations={group.conversations}
                  editValue={editValue}
                  editingId={editingId}
                  isLoading={loadingStates}
                  label={group.label}
                  onArchive={onArchive}
                  onDelete={onDelete}
                  onEditValueChange={setEditValue}
                  onRename={onRename}
                  onRenameCancel={handleRenameCancel}
                  onRenameStart={handleRenameStart}
                  onRenameSubmit={handleRenameSubmit}
                  onSelect={onSelect || (() => {})}
                  onUnarchive={onUnarchive}
                />
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

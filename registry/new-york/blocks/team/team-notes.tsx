"use client";

import {
  Edit,
  Loader2,
  MoreVertical,
  Plus,
  Search,
  Sparkles,
  Trash2,
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
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/new-york/ui/empty";
import { Field, FieldContent, FieldLabel } from "@/registry/new-york/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/new-york/ui/input-group";
import { Textarea } from "@/registry/new-york/ui/textarea";

export interface TeamNote {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  tags?: string[];
  aiSummary?: string;
  createdAt: Date;
  updatedAt: Date;
  lastEditedBy?: {
    id: string;
    name: string;
  };
  participants?: {
    id: string;
    name: string;
    avatar?: string;
  }[];
}

export interface TeamNotesProps {
  notes?: TeamNote[];
  currentUserId?: string;
  onCreate?: (data: {
    title: string;
    content: string;
    tags?: string[];
  }) => Promise<TeamNote>;
  onUpdate?: (
    noteId: string,
    data: { title?: string; content?: string; tags?: string[] }
  ) => Promise<void>;
  onDelete?: (noteId: string) => Promise<void>;
  onSummarize?: (noteId: string) => Promise<string>;
  className?: string;
  showSearch?: boolean;
  showTags?: boolean;
}

function formatDate(date: Date): string {
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

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TeamNotes({
  notes = [],
  currentUserId,
  onCreate,
  onUpdate,
  onDelete,
  onSummarize,
  className,
  showSearch = true,
  showTags = true,
}: TeamNotesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
    tags: [] as string[],
  });

  const filteredNotes = notes.filter((note) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  const handleCreate = async () => {
    if (!(noteData.title.trim() && onCreate)) return;

    setIsCreating(true);
    try {
      await onCreate(noteData);
      setNoteData({ title: "", content: "", tags: [] });
      setCreateDialogOpen(false);
    } finally {
      setIsCreating(false);
    }
  };

  const handleSummarize = async (noteId: string) => {
    if (!onSummarize) return;
    setIsSummarizing(noteId);
    try {
      await onSummarize(noteId);
    } finally {
      setIsSummarizing(null);
    }
  };

  const handleAction = async (action: () => Promise<void>, noteId: string) => {
    setActionLoading(noteId);
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
          <div className="flex flex-col flex-wrap gap-3 md:flex-row md:items-start md:justify-between">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <CardTitle>Team Notes</CardTitle>
              <CardDescription>
                {notes.length} note{notes.length !== 1 ? "s" : ""} shared with
                your team
              </CardDescription>
            </div>
            {onCreate && (
              <Dialog
                onOpenChange={setCreateDialogOpen}
                open={createDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="w-full shrink-0 md:w-auto" type="button">
                    <Plus className="size-4" />
                    New Note
                  </Button>
                </DialogTrigger>
                <DialogContent className="md:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create Note</DialogTitle>
                    <DialogDescription>
                      Create a new collaborative note
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-4">
                    <Field>
                      <FieldLabel htmlFor="note-title">Title</FieldLabel>
                      <FieldContent>
                        <InputGroup>
                          <InputGroupInput
                            id="note-title"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setNoteData((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                            placeholder="Note title…"
                            type="text"
                            value={noteData.title}
                          />
                        </InputGroup>
                      </FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="note-content">Content</FieldLabel>
                      <FieldContent>
                        <Textarea
                          id="note-content"
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) =>
                            setNoteData((prev) => ({
                              ...prev,
                              content: e.target.value,
                            }))
                          }
                          placeholder="Write your note…"
                          rows={8}
                          value={noteData.content}
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
                      disabled={!noteData.title.trim()}
                      onClick={handleCreate}
                      type="button"
                    >
                      {isCreating ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Creating…
                        </>
                      ) : (
                        "Create Note"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
          {showSearch && (
            <InputGroup>
              <InputGroupAddon>
                <Search className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Search notes…"
                type="search"
                value={searchQuery}
              />
            </InputGroup>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {filteredNotes.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Edit className="size-6" />
              </EmptyMedia>
              <EmptyTitle>
                {searchQuery ? "No notes found" : "No notes yet"}
              </EmptyTitle>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredNotes.map((note) => (
              <div
                className="group flex flex-col gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-primary hover:shadow-sm"
                key={note.id}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="wrap-break-word font-semibold text-base leading-tight">
                    {note.title}
                  </h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-label={`More options for ${note.title}`}
                        size="icon-sm"
                        type="button"
                        variant="ghost"
                      >
                        {actionLoading === note.id ? (
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
                      {onSummarize && (
                        <DropdownMenuItem
                          disabled={isSummarizing === note.id}
                          onSelect={() => handleSummarize(note.id)}
                        >
                          {isSummarizing === note.id ? (
                            <>
                              <Loader2 className="size-4 animate-spin" />
                              Summarizing…
                            </>
                          ) : (
                            <>
                              <Sparkles className="size-4" />
                              Summarize with AI
                            </>
                          )}
                        </DropdownMenuItem>
                      )}
                      {onUpdate && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onSelect={() => setEditingNote(note.id)}
                          >
                            <Edit className="size-4" />
                            Edit
                          </DropdownMenuItem>
                        </>
                      )}
                      {onDelete && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onSelect={() =>
                              handleAction(() => onDelete(note.id), note.id)
                            }
                            variant="destructive"
                          >
                            <Trash2 className="size-4" />
                            Delete
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="wrap-break-word line-clamp-3 text-muted-foreground text-sm">
                  {note.content}
                </p>
                {note.aiSummary && (
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <Sparkles className="size-3 text-primary" />
                      <span className="font-medium text-xs">AI Summary</span>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      {note.aiSummary}
                    </p>
                  </div>
                )}
                {showTags && note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {note.tags.map((tag) => (
                      <Badge className="text-xs" key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage
                        alt={note.author.name}
                        src={note.author.avatar}
                      />
                      <AvatarFallback className="text-xs">
                        {getInitials(note.author.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-muted-foreground text-xs">
                      {note.author.name}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    {formatRelativeTime(note.updatedAt)}
                  </span>
                </div>
                {note.participants && note.participants.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="-space-x-2 flex">
                      {note.participants.slice(0, 3).map((participant) => (
                        <Avatar
                          className="size-6 border-2 border-background"
                          key={participant.id}
                        >
                          <AvatarImage
                            alt={participant.name}
                            src={participant.avatar}
                          />
                          <AvatarFallback className="text-xs">
                            {getInitials(participant.name)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    {note.participants.length > 3 && (
                      <span className="text-muted-foreground text-xs">
                        +{note.participants.length - 3} more
                      </span>
                    )}
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

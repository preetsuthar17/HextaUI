"use client";

import {
  BookOpen,
  Heart,
  Loader2,
  MoreVertical,
  Plus,
  Search,
  Sparkles,
  Star,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import { Separator } from "@/registry/new-york/ui/separator";
import { Textarea } from "@/registry/new-york/ui/textarea";

export interface TeamPrompt {
  id: string;
  title: string;
  prompt: string;
  description?: string;
  category?: string;
  tags?: string[];
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  isFavorite?: boolean;
  rating?: number;
  usageCount?: number;
  bestModel?: string;
  tone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamPromptLibraryProps {
  prompts?: TeamPrompt[];
  currentUserId?: string;
  onCreate?: (data: {
    title: string;
    prompt: string;
    description?: string;
    category?: string;
    tags?: string[];
    bestModel?: string;
    tone?: string;
  }) => Promise<TeamPrompt>;
  onUpdate?: (promptId: string, data: Partial<TeamPrompt>) => Promise<void>;
  onDelete?: (promptId: string) => Promise<void>;
  onFavorite?: (promptId: string, isFavorite: boolean) => Promise<void>;
  onUse?: (prompt: TeamPrompt) => void;
  className?: string;
  showSearch?: boolean;
  showCategories?: boolean;
}

const defaultCategories = [
  "All",
  "Writing",
  "Code",
  "Analysis",
  "Creative",
  "Research",
  "Business",
];

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TeamPromptLibrary({
  prompts = [],
  currentUserId,
  onCreate,
  onUpdate,
  onDelete,
  onFavorite,
  onUse,
  className,
  showSearch = true,
  showCategories = true,
}: TeamPromptLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [promptData, setPromptData] = useState({
    title: "",
    prompt: "",
    description: "",
    category: "",
    tags: [] as string[],
    bestModel: "",
    tone: "",
  });

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesCategory =
      selectedCategory === "All" || prompt.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const handleCreate = async () => {
    if (!(promptData.title.trim() && promptData.prompt.trim() && onCreate))
      return;

    setIsCreating(true);
    try {
      await onCreate(promptData);
      setPromptData({
        title: "",
        prompt: "",
        description: "",
        category: "",
        tags: [],
        bestModel: "",
        tone: "",
      });
      setCreateDialogOpen(false);
    } finally {
      setIsCreating(false);
    }
  };

  const handleAction = async (
    action: () => Promise<void>,
    promptId: string
  ) => {
    setActionLoading(promptId);
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
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <CardTitle>Prompt Library</CardTitle>
              <CardDescription>
                {prompts.length} prompt{prompts.length !== 1 ? "s" : ""} shared
                with your team
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
                    Add Prompt
                  </Button>
                </DialogTrigger>
                <DialogContent className="md:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add Prompt to Library</DialogTitle>
                    <DialogDescription>
                      Share a prompt with your team
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-4">
                    <Field>
                      <FieldLabel htmlFor="prompt-title">Title</FieldLabel>
                      <FieldContent>
                        <InputGroup>
                          <InputGroupInput
                            id="prompt-title"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setPromptData((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                            placeholder="Prompt title…"
                            type="text"
                            value={promptData.title}
                          />
                        </InputGroup>
                      </FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="prompt-content">Prompt</FieldLabel>
                      <FieldContent>
                        <Textarea
                          id="prompt-content"
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) =>
                            setPromptData((prev) => ({
                              ...prev,
                              prompt: e.target.value,
                            }))
                          }
                          placeholder="Enter the prompt text…"
                          rows={6}
                          value={promptData.prompt}
                        />
                      </FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="prompt-description">
                        Description
                      </FieldLabel>
                      <FieldContent>
                        <Textarea
                          id="prompt-description"
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) =>
                            setPromptData((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          placeholder="What is this prompt best used for?"
                          rows={2}
                          value={promptData.description}
                        />
                      </FieldContent>
                    </Field>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="prompt-category">
                          Category
                        </FieldLabel>
                        <FieldContent>
                          <Select
                            onValueChange={(value: string) =>
                              setPromptData((prev) => ({
                                ...prev,
                                category: value,
                              }))
                            }
                            value={promptData.category}
                          >
                            <SelectTrigger id="prompt-category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {defaultCategories
                                .filter((c) => c !== "All")
                                .map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FieldContent>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="prompt-model">
                          Best Model
                        </FieldLabel>
                        <FieldContent>
                          <InputGroup>
                            <InputGroupInput
                              id="prompt-model"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setPromptData((prev) => ({
                                  ...prev,
                                  bestModel: e.target.value,
                                }))
                              }
                              placeholder="gpt-4, claude-3, etc."
                              type="text"
                              value={promptData.bestModel}
                            />
                          </InputGroup>
                        </FieldContent>
                      </Field>
                    </div>
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
                      disabled={
                        !(promptData.title.trim() && promptData.prompt.trim())
                      }
                      onClick={handleCreate}
                      type="button"
                    >
                      {isCreating ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Adding…
                        </>
                      ) : (
                        "Add Prompt"
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
                placeholder="Search prompts…"
                type="search"
                value={searchQuery}
              />
            </InputGroup>
          )}
          {showCategories && (
            <div className="flex flex-wrap gap-2">
              {defaultCategories.map((category) => (
                <Button
                  className={cn(
                    "h-auto gap-2 px-3 py-1.5",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  type="button"
                  variant="ghost"
                >
                  {category !== "All" && <Sparkles className="size-3.5" />}
                  <span className="text-xs">{category}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {filteredPrompts.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <BookOpen className="size-6" />
              </EmptyMedia>
              <EmptyTitle>
                {searchQuery || selectedCategory !== "All"
                  ? "No prompts found"
                  : "No prompts yet"}
              </EmptyTitle>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredPrompts.map((prompt) => (
              <div
                className="group flex flex-col gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-primary hover:shadow-sm"
                key={prompt.id}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <h3 className="wrap-break-word font-semibold text-base leading-tight">
                      {prompt.title}
                    </h3>
                    {prompt.description && (
                      <p className="wrap-break-word line-clamp-2 text-muted-foreground text-sm">
                        {prompt.description}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                      {prompt.category && (
                        <Badge className="text-xs" variant="outline">
                          {prompt.category}
                        </Badge>
                      )}
                      {prompt.bestModel && (
                        <Badge className="text-xs" variant="secondary">
                          {prompt.bestModel}
                        </Badge>
                      )}
                      {prompt.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="size-3 fill-yellow-500 text-yellow-500" />
                          <span className="text-muted-foreground text-xs">
                            {prompt.rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                      {prompt.usageCount !== undefined && (
                        <span className="text-muted-foreground text-xs">
                          {prompt.usageCount} use
                          {prompt.usageCount !== 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-label={`More options for ${prompt.title}`}
                        size="icon-sm"
                        type="button"
                        variant="ghost"
                      >
                        {actionLoading === prompt.id ? (
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
                      {onUse && (
                        <DropdownMenuItem onSelect={() => onUse(prompt)}>
                          <Sparkles className="size-4" />
                          Use Prompt
                        </DropdownMenuItem>
                      )}
                      {onFavorite && (
                        <DropdownMenuItem
                          onSelect={() =>
                            handleAction(
                              () => onFavorite(prompt.id, !prompt.isFavorite),
                              prompt.id
                            )
                          }
                        >
                          <Heart
                            className={cn(
                              "size-4",
                              prompt.isFavorite && "fill-red-500 text-red-500"
                            )}
                          />
                          {prompt.isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"}
                        </DropdownMenuItem>
                      )}
                      {onDelete && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onSelect={() =>
                              handleAction(() => onDelete(prompt.id), prompt.id)
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
                {prompt.tags && prompt.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {prompt.tags.map((tag) => (
                      <Badge className="text-xs" key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage
                        alt={prompt.author.name}
                        src={prompt.author.avatar}
                      />
                      <AvatarFallback className="text-xs">
                        {getInitials(prompt.author.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-muted-foreground text-xs">
                      {prompt.author.name}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    {formatDate(prompt.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

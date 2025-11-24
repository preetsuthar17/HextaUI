"use client";

import {
  Folder,
  FolderOpen,
  Loader2,
  MoreVertical,
  Plus,
  Search,
  Settings,
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

export interface TeamProject {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  members: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  defaultModel?: string;
  aiUsage?: {
    tokens: number;
    sessions: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamProjectsProps {
  projects?: TeamProject[];
  currentUserId?: string;
  onCreate?: (data: {
    name: string;
    description?: string;
    color?: string;
    defaultModel?: string;
  }) => Promise<TeamProject>;
  onUpdate?: (projectId: string, data: Partial<TeamProject>) => Promise<void>;
  onDelete?: (projectId: string) => Promise<void>;
  onSelect?: (projectId: string) => void;
  className?: string;
  showSearch?: boolean;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
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

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TeamProjects({
  projects = [],
  currentUserId,
  onCreate,
  onUpdate,
  onDelete,
  onSelect,
  className,
  showSearch = true,
}: TeamProjectsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    color: "#3b82f6",
    defaultModel: "",
  });

  const filteredProjects = projects.filter((project) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      project.name.toLowerCase().includes(query) ||
      project.description?.toLowerCase().includes(query)
    );
  });

  const handleCreate = async () => {
    if (!(projectData.name.trim() && onCreate)) return;

    setIsCreating(true);
    try {
      await onCreate(projectData);
      setProjectData({
        name: "",
        description: "",
        color: "#3b82f6",
        defaultModel: "",
      });
      setCreateDialogOpen(false);
    } finally {
      setIsCreating(false);
    }
  };

  const handleAction = async (
    action: () => Promise<void>,
    projectId: string
  ) => {
    setActionLoading(projectId);
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
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                {projects.length} project{projects.length !== 1 ? "s" : ""} in
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
                    New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="md:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>
                      Create a new team project workspace
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-4">
                    <Field>
                      <FieldLabel htmlFor="project-name">Name</FieldLabel>
                      <FieldContent>
                        <InputGroup>
                          <InputGroupInput
                            id="project-name"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setProjectData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            placeholder="Project name…"
                            type="text"
                            value={projectData.name}
                          />
                        </InputGroup>
                      </FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="project-description">
                        Description
                      </FieldLabel>
                      <FieldContent>
                        <Textarea
                          id="project-description"
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) =>
                            setProjectData((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          placeholder="What is this project about?"
                          rows={3}
                          value={projectData.description}
                        />
                      </FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="project-color">Color</FieldLabel>
                      <FieldContent>
                        <div className="flex items-center gap-3">
                          <input
                            className="size-10 rounded border"
                            id="project-color"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setProjectData((prev) => ({
                                ...prev,
                                color: e.target.value,
                              }))
                            }
                            type="color"
                            value={projectData.color}
                          />
                          <InputGroup className="flex-1">
                            <InputGroupInput
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setProjectData((prev) => ({
                                  ...prev,
                                  color: e.target.value,
                                }))
                              }
                              placeholder="#3b82f6"
                              type="text"
                              value={projectData.color}
                            />
                          </InputGroup>
                        </div>
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
                      disabled={!projectData.name.trim()}
                      onClick={handleCreate}
                      type="button"
                    >
                      {isCreating ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Creating…
                        </>
                      ) : (
                        "Create Project"
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
                placeholder="Search projects…"
                type="search"
                value={searchQuery}
              />
            </InputGroup>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {filteredProjects.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Folder className="size-6" />
              </EmptyMedia>
              <EmptyTitle>
                {searchQuery ? "No projects found" : "No projects yet"}
              </EmptyTitle>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                className="group flex flex-col justify-between gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-primary hover:shadow-sm"
                key={project.id}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex size-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${project.color}20` }}
                    >
                      {project.icon ? (
                        <span className="text-lg">{project.icon}</span>
                      ) : (
                        <Folder
                          className="size-5"
                          style={{ color: project.color }}
                        />
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <h3 className="wrap-break-word font-semibold text-base leading-tight">
                        {project.name}
                      </h3>
                      {project.defaultModel && (
                        <Badge className="w-fit text-xs" variant="outline">
                          {project.defaultModel}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-label={`More options for ${project.name}`}
                        size="icon-sm"
                        type="button"
                        variant="ghost"
                      >
                        {actionLoading === project.id ? (
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
                      {onSelect && (
                        <DropdownMenuItem onSelect={() => onSelect(project.id)}>
                          <FolderOpen className="size-4" />
                          Open
                        </DropdownMenuItem>
                      )}
                      {onUpdate && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onSelect={() => onUpdate(project.id, {})}
                          >
                            <Settings className="size-4" />
                            Settings
                          </DropdownMenuItem>
                        </>
                      )}
                      {onDelete && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onSelect={() =>
                              handleAction(
                                () => onDelete(project.id),
                                project.id
                              )
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
                {project.description && (
                  <p className="wrap-break-word line-clamp-2 text-muted-foreground text-sm">
                    {project.description}
                  </p>
                )}
                {project.aiUsage && (
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <span>{formatNumber(project.aiUsage.tokens)} tokens</span>
                    <span aria-hidden="true">•</span>
                    <span>
                      {project.aiUsage.sessions} session
                      {project.aiUsage.sessions !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="-space-x-2 flex">
                    {project.members.slice(0, 3).map((member) => (
                      <Avatar
                        className="size-6 border-2 border-background"
                        key={member.id}
                      >
                        <AvatarImage alt={member.name} src={member.avatar} />
                        <AvatarFallback className="text-xs">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.members.length > 3 && (
                      <div className="flex size-6 items-center justify-center rounded-full border-2 border-background bg-muted">
                        <span className="text-muted-foreground text-xs">
                          +{project.members.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-muted-foreground text-xs">
                    Updated {formatDate(project.updatedAt)}
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

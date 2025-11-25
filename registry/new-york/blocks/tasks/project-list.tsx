"use client";

import {
  Archive,
  Calendar,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
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
import { Progress } from "@/registry/new-york/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";

export type ProjectStatus = "active" | "archived" | "completed";

export interface ProjectMember {
  id: string;
  name: string;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  progress: number;
  thumbnail?: string;
  color?: string;
  members: ProjectMember[];
  taskCount?: number;
  completedTaskCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectListProps {
  projects?: Project[];
  onProjectSelect?: (projectId: string) => void;
  onProjectCreate?: () => void;
  onProjectArchive?: (projectId: string) => Promise<void>;
  onProjectDelete?: (projectId: string) => Promise<void>;
  className?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  layout?: "grid" | "list";
}

function formatDate(date: Date): string {
  const now = new Date();
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  const currentYear = now.getFullYear();

  if (year === currentYear) {
    return `${month} ${day}`;
  }
  return `${month} ${day}, ${year}`;
}

function getStatusBadgeVariant(status: ProjectStatus) {
  switch (status) {
    case "active":
      return "default";
    case "completed":
      return "secondary";
    case "archived":
      return "outline";
  }
}

function getStatusLabel(status: ProjectStatus): string {
  switch (status) {
    case "active":
      return "Active";
    case "completed":
      return "Completed";
    case "archived":
      return "Archived";
  }
}

interface ProjectCardProps {
  project: Project;
  layout: "grid" | "list";
  onProjectClick: (projectId: string) => void;
  onArchive: (projectId: string) => void;
  onDelete: (projectId: string) => void;
}

function ProjectCard({
  project,
  layout,
  onProjectClick,
  onArchive,
  onDelete,
}: ProjectCardProps) {
  if (layout === "list") {
    return (
      <div
        className="group flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
        onClick={() => onProjectClick(project.id)}
        role="button"
        tabIndex={0}
      >
        {project.thumbnail ? (
          <Image
            alt={project.name}
            className="size-12 rounded-lg object-cover"
            height={48}
            src={project.thumbnail}
            width={48}
          />
        ) : (
          <div
            className="flex size-12 items-center justify-center rounded-lg font-semibold text-lg text-white"
            style={{
              backgroundColor: project.color || "hsl(var(--primary))",
            }}
          >
            {project.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-center gap-2">
            <h3 className="wrap-break-word font-semibold text-base">
              {project.name}
            </h3>
            <Badge variant={getStatusBadgeVariant(project.status)}>
              {getStatusLabel(project.status)}
            </Badge>
          </div>
          {project.description && (
            <p className="line-clamp-1 text-muted-foreground text-sm">
              {project.description}
            </p>
          )}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="size-3 text-muted-foreground" />
              <span className="text-muted-foreground text-xs">
                {project.members.length} member
                {project.members.length !== 1 ? "s" : ""}
              </span>
            </div>
            {project.taskCount !== undefined && (
              <span className="text-muted-foreground text-xs">
                {project.completedTaskCount || 0} / {project.taskCount} tasks
              </span>
            )}
            <span className="text-muted-foreground text-xs">
              Updated {formatDate(project.updatedAt)}
            </span>
          </div>
          <Progress className="h-1.5" value={project.progress} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label={`More options for ${project.name}`}
              className="opacity-0 transition-opacity group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
              size="icon"
              type="button"
              variant="ghost"
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onArchive(project.id)}>
              <Archive className="size-4" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(project.id)}
              variant="destructive"
            >
              <Trash2 className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div
      className="group flex flex-col gap-3 rounded-lg border bg-card p-4 transition-all hover:shadow-md"
      onClick={() => onProjectClick(project.id)}
      role="button"
      tabIndex={0}
    >
      {project.thumbnail ? (
        <Image
          alt={project.name}
          className="h-32 w-full rounded-lg object-cover"
          height={128}
          src={project.thumbnail}
          width={256}
        />
      ) : (
        <div
          className="flex h-32 items-center justify-center rounded-lg font-semibold text-2xl text-white"
          style={{
            backgroundColor: project.color || "hsl(var(--primary))",
          }}
        >
          {project.name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="wrap-break-word font-semibold text-base">
            {project.name}
          </h3>
          <Badge variant={getStatusBadgeVariant(project.status)}>
            {getStatusLabel(project.status)}
          </Badge>
        </div>
        {project.description && (
          <p className="line-clamp-2 text-muted-foreground text-sm">
            {project.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="-space-x-2 flex">
            {project.members.slice(0, 4).map((member) => (
              <Avatar
                className="size-6 border-2 border-background"
                key={member.id}
              >
                <AvatarImage alt={member.name} src={member.avatar} />
                <AvatarFallback className="text-xs">
                  {member.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.members.length > 4 && (
              <div className="flex size-6 items-center justify-center rounded-full border-2 border-background bg-muted text-muted-foreground text-xs">
                +{project.members.length - 4}
              </div>
            )}
          </div>
          {project.taskCount !== undefined && (
            <span className="text-muted-foreground text-xs">
              {project.completedTaskCount || 0} / {project.taskCount}
            </span>
          )}
        </div>
        <Progress className="h-1.5" value={project.progress} />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">
            {project.progress}% complete
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label={`More options for ${project.name}`}
                className="opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => e.stopPropagation()}
                size="icon"
                type="button"
                variant="ghost"
              >
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onArchive(project.id)}>
                <Archive className="size-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(project.id)}
                variant="destructive"
              >
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default function ProjectList({
  projects = [],
  onProjectSelect,
  onProjectCreate,
  onProjectArchive,
  onProjectDelete,
  className,
  showSearch = true,
  showFilters = true,
  layout = "grid",
}: ProjectListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          project.description?.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter);
    }

    return filtered.sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  }, [projects, searchQuery, statusFilter]);

  const handleArchive = async (projectId: string) => {
    await onProjectArchive?.(projectId);
  };

  const handleDelete = async (projectId: string) => {
    await onProjectDelete?.(projectId);
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                {filteredProjects.length} project
                {filteredProjects.length !== 1 ? "s" : ""}
              </CardDescription>
            </div>
            {onProjectCreate && (
              <Button onClick={onProjectCreate} type="button">
                <Plus className="size-4" />
                New Project
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
                placeholder="Search projects…"
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
          {showFilters && (
            <Select onValueChange={setStatusFilter} value={statusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Calendar className="size-6 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-sm">
                {searchQuery || statusFilter !== "all"
                  ? "No projects match your filters"
                  : "No projects yet"}
              </p>
              <p className="text-muted-foreground text-sm">
                {onProjectCreate
                  ? "Create your first project to get started"
                  : "Projects will appear here"}
              </p>
            </div>
            {onProjectCreate && (
              <Button onClick={onProjectCreate} type="button" variant="outline">
                <Plus className="size-4" />
                Create Project
              </Button>
            )}
          </div>
        ) : (
          <div
            className={cn(
              "flex gap-4",
              layout === "grid"
                ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                : "flex-col"
            )}
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                layout={layout}
                onArchive={handleArchive}
                onDelete={handleDelete}
                onProjectClick={onProjectSelect || (() => {})}
                project={project}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

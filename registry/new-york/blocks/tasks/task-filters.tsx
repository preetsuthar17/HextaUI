"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
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
import type { TaskPriority, TaskStatus } from "./task-list";

export interface TaskFilter {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  assigneeIds?: string[];
  dueDateRange?: { start?: Date; end?: Date };
  tags?: string[];
  projectIds?: string[];
  search?: string;
}

export interface SavedFilter {
  id: string;
  name: string;
  filter: TaskFilter;
}

export interface TaskFiltersProps {
  onFilterChange?: (filter: TaskFilter) => void;
  savedFilters?: SavedFilter[];
  onSaveFilter?: (name: string, filter: TaskFilter) => Promise<void>;
  onLoadFilter?: (filterId: string) => void;
  onDeleteFilter?: (filterId: string) => Promise<void>;
  availableAssignees?: Array<{ id: string; name: string }>;
  availableProjects?: Array<{ id: string; name: string }>;
  availableTags?: string[];
  className?: string;
  showSavedFilters?: boolean;
}

export default function TaskFilters({
  onFilterChange,
  savedFilters = [],
  onSaveFilter,
  onLoadFilter,
  onDeleteFilter,
  availableAssignees = [],
  availableProjects = [],
  availableTags = [],
  className,
  showSavedFilters = true,
}: TaskFiltersProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string[]>([]);
  const [priority, setPriority] = useState<string[]>([]);
  const [assignees, setAssignees] = useState<string[]>([]);
  const [projects, setProjects] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [dueDateStart, setDueDateStart] = useState("");
  const [dueDateEnd, setDueDateEnd] = useState("");

  const activeFilters = useMemo(() => {
    const count =
      (status.length > 0 ? 1 : 0) +
      (priority.length > 0 ? 1 : 0) +
      (assignees.length > 0 ? 1 : 0) +
      (projects.length > 0 ? 1 : 0) +
      (tags.length > 0 ? 1 : 0) +
      (dueDateStart || dueDateEnd ? 1 : 0) +
      (search.trim() ? 1 : 0);
    return count;
  }, [
    status,
    priority,
    assignees,
    projects,
    tags,
    dueDateStart,
    dueDateEnd,
    search,
  ]);

  const currentFilter: TaskFilter = useMemo(
    () => ({
      status: status.length > 0 ? (status as TaskStatus[]) : undefined,
      priority: priority.length > 0 ? (priority as TaskPriority[]) : undefined,
      assigneeIds: assignees.length > 0 ? assignees : undefined,
      projectIds: projects.length > 0 ? projects : undefined,
      tags: tags.length > 0 ? tags : undefined,
      dueDateRange:
        dueDateStart || dueDateEnd
          ? {
              start: dueDateStart ? new Date(dueDateStart) : undefined,
              end: dueDateEnd ? new Date(dueDateEnd) : undefined,
            }
          : undefined,
      search: search.trim() || undefined,
    }),
    [
      status,
      priority,
      assignees,
      projects,
      tags,
      dueDateStart,
      dueDateEnd,
      search,
    ]
  );

  const handleFilterChange = () => {
    onFilterChange?.(currentFilter);
  };

  const handleClearAll = () => {
    setSearch("");
    setStatus([]);
    setPriority([]);
    setAssignees([]);
    setProjects([]);
    setTags([]);
    setDueDateStart("");
    setDueDateEnd("");
    onFilterChange?.({});
  };

  const toggleArrayItem = <T,>(
    array: T[],
    item: T,
    setter: (value: T[]) => void
  ) => {
    if (array.includes(item)) {
      setter(array.filter((i) => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            {activeFilters > 0
              ? `${activeFilters} active filter${activeFilters !== 1 ? "s" : ""}`
              : "No active filters"}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <InputGroup>
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              onChange={(e) => {
                setSearch(e.target.value);
                handleFilterChange();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleFilterChange();
                }
              }}
              placeholder="Search tasks…"
              type="search"
              value={search}
            />
            {search && (
              <Button
                aria-label="Clear search"
                className="absolute top-1/2 right-2 -translate-y-1/2"
                onClick={() => {
                  setSearch("");
                  handleFilterChange();
                }}
                size="icon"
                type="button"
                variant="ghost"
              >
                <X className="size-4" />
              </Button>
            )}
          </InputGroup>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-muted-foreground text-sm">Status</label>
              <div className="flex flex-wrap gap-2">
                {(
                  ["todo", "in_progress", "done", "cancelled"] as TaskStatus[]
                ).map((s) => (
                  <Button
                    key={s}
                    onClick={() => {
                      toggleArrayItem(status, s, setStatus);
                      handleFilterChange();
                    }}
                    size="sm"
                    type="button"
                    variant={status.includes(s) ? "default" : "outline"}
                  >
                    {s === "in_progress"
                      ? "In Progress"
                      : s.charAt(0).toUpperCase() + s.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-muted-foreground text-sm">Priority</label>
              <div className="flex flex-wrap gap-2">
                {(["low", "medium", "high", "urgent"] as TaskPriority[]).map(
                  (p) => (
                    <Button
                      key={p}
                      onClick={() => {
                        toggleArrayItem(priority, p, setPriority);
                        handleFilterChange();
                      }}
                      size="sm"
                      type="button"
                      variant={priority.includes(p) ? "default" : "outline"}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>

          {availableAssignees.length > 0 && (
            <div className="flex flex-col gap-2">
              <label className="text-muted-foreground text-sm">Assignees</label>
              <Select
                onValueChange={(value) => {
                  toggleArrayItem(assignees, value, setAssignees);
                  handleFilterChange();
                }}
                value=""
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select assignees" />
                </SelectTrigger>
                <SelectContent>
                  {availableAssignees.map((assignee) => (
                    <SelectItem key={assignee.id} value={assignee.id}>
                      {assignee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {assignees.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {assignees.map((id) => {
                    const assignee = availableAssignees.find(
                      (a) => a.id === id
                    );
                    return assignee ? (
                      <Badge
                        className="flex items-center gap-1"
                        key={id}
                        variant="secondary"
                      >
                        {assignee.name}
                        <button
                          aria-label={`Remove ${assignee.name}`}
                          onClick={() => {
                            setAssignees(assignees.filter((a) => a !== id));
                            handleFilterChange();
                          }}
                          type="button"
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          )}

          {availableProjects.length > 0 && (
            <div className="flex flex-col gap-2">
              <label className="text-muted-foreground text-sm">Projects</label>
              <Select
                onValueChange={(value) => {
                  toggleArrayItem(projects, value, setProjects);
                  handleFilterChange();
                }}
                value=""
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select projects" />
                </SelectTrigger>
                <SelectContent>
                  {availableProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {projects.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {projects.map((id) => {
                    const project = availableProjects.find((p) => p.id === id);
                    return project ? (
                      <Badge
                        className="flex items-center gap-1"
                        key={id}
                        variant="secondary"
                      >
                        {project.name}
                        <button
                          aria-label={`Remove ${project.name}`}
                          onClick={() => {
                            setProjects(projects.filter((p) => p !== id));
                            handleFilterChange();
                          }}
                          type="button"
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-muted-foreground text-sm">
                Due Date From
              </label>
              <InputGroup>
                <InputGroupInput
                  onChange={(e) => {
                    setDueDateStart(e.target.value);
                    handleFilterChange();
                  }}
                  type="date"
                  value={dueDateStart}
                />
              </InputGroup>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-muted-foreground text-sm">
                Due Date To
              </label>
              <InputGroup>
                <InputGroupInput
                  onChange={(e) => {
                    setDueDateEnd(e.target.value);
                    handleFilterChange();
                  }}
                  type="date"
                  value={dueDateEnd}
                />
              </InputGroup>
            </div>
          </div>

          {activeFilters > 0 && (
            <>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  {activeFilters} active filter{activeFilters !== 1 ? "s" : ""}
                </span>
                <Button
                  onClick={handleClearAll}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  <X className="size-4" />
                  Clear All
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

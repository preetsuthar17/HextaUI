"use client";

import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Filter,
  MoreVertical,
  Plus,
  Search,
  SortAsc,
  User,
  X,
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
import { Checkbox } from "@/registry/new-york/ui/checkbox";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import { Separator } from "@/registry/new-york/ui/separator";

export type TaskStatus = "todo" | "in_progress" | "done" | "cancelled";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface TaskAssignee {
  id: string;
  name: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignees?: TaskAssignee[];
  dueDate?: Date;
  tags?: string[];
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskListProps {
  tasks?: Task[];
  onTaskSelect?: (taskId: string) => void;
  onTaskUpdate?: (taskId: string, updates: Partial<Task>) => Promise<void>;
  onTaskDelete?: (taskId: string) => Promise<void>;
  onBulkAction?: (taskIds: string[], action: string) => Promise<void>;
  onCreateTask?: () => void;
  className?: string;
  showSearch?: boolean;
  showFilters?: boolean;
  showBulkActions?: boolean;
  itemsPerPage?: number;
}

function formatDate(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  if (dateOnly.getTime() === today.getTime()) {
    return "Today";
  }
  if (dateOnly.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  }

  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}`;
}

function getStatusIcon(status: TaskStatus) {
  switch (status) {
    case "done":
      return CheckCircle2;
    case "in_progress":
      return Clock;
    default:
      return Circle;
  }
}

function getStatusColor(status: TaskStatus): string {
  switch (status) {
    case "done":
      return "text-green-600";
    case "in_progress":
      return "text-blue-600";
    case "cancelled":
      return "text-muted-foreground";
    default:
      return "text-muted-foreground";
  }
}

function getPriorityColor(priority: TaskPriority): string {
  switch (priority) {
    case "urgent":
      return "bg-red-500";
    case "high":
      return "bg-orange-500";
    case "medium":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
}

function getPriorityLabel(priority: TaskPriority): string {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

function isOverdue(date?: Date): boolean {
  if (!date) return false;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const dueDate = new Date(date);
  dueDate.setHours(0, 0, 0, 0);
  return dueDate < now;
}

interface TaskItemProps {
  task: Task;
  isSelected: boolean;
  onSelect: (taskId: string, selected: boolean) => void;
  onTaskClick: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

function TaskItem({
  task,
  isSelected,
  onSelect,
  onTaskClick,
  onStatusChange,
  onDelete,
}: TaskItemProps) {
  const overdue = isOverdue(task.dueDate);

  return (
    <div
      className={cn(
        "group flex items-start gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent",
        isSelected && "border-primary bg-primary/5"
      )}
    >
      <Checkbox
        checked={isSelected}
        onCheckedChange={(checked) => onSelect(task.id, checked === true)}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <button
          className="flex min-w-0 flex-1 items-start gap-3 text-left"
          onClick={() => onTaskClick(task.id)}
          type="button"
        >
          {task.status === "done" ? (
            <CheckCircle2
              className={cn(
                "mt-0.5 size-5 shrink-0",
                getStatusColor(task.status)
              )}
            />
          ) : task.status === "in_progress" ? (
            <Clock
              className={cn(
                "mt-0.5 size-5 shrink-0",
                getStatusColor(task.status)
              )}
            />
          ) : (
            <Circle
              className={cn(
                "mt-0.5 size-5 shrink-0",
                getStatusColor(task.status)
              )}
            />
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <h4 className="wrap-break-word font-medium text-sm leading-tight">
              {task.title}
            </h4>
            {task.description && (
              <p className="line-clamp-2 text-muted-foreground text-xs">
                {task.description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <div
                className={cn(
                  "size-2 rounded-full",
                  getPriorityColor(task.priority)
                )}
                title={getPriorityLabel(task.priority)}
              />
              {task.assignees && task.assignees.length > 0 && (
                <div className="flex items-center gap-1">
                  <User className="size-3 text-muted-foreground" />
                  <div className="-space-x-2 flex">
                    {task.assignees.slice(0, 3).map((assignee) => (
                      <Avatar
                        className="size-5 border-2 border-background"
                        key={assignee.id}
                      >
                        <AvatarImage
                          alt={assignee.name}
                          src={assignee.avatar}
                        />
                        <AvatarFallback className="text-xs">
                          {assignee.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {task.assignees.length > 3 && (
                      <div className="flex size-5 items-center justify-center rounded-full border-2 border-background bg-muted text-muted-foreground text-xs">
                        +{task.assignees.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {task.dueDate && (
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs",
                    overdue ? "text-destructive" : "text-muted-foreground"
                  )}
                >
                  <Calendar className="size-3" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              )}
              {task.tags && task.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {task.tags.slice(0, 3).map((tag) => (
                    <Badge className="text-xs" key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                  {task.tags.length > 3 && (
                    <Badge className="text-xs" variant="outline">
                      +{task.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </button>
        <div className="flex shrink-0 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label={`More options for ${task.title}`}
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
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "todo")}>
                <Circle className="size-4" />
                Mark as To Do
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onStatusChange(task.id, "in_progress")}
              >
                <Clock className="size-4" />
                Mark as In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "done")}>
                <CheckCircle2 className="size-4" />
                Mark as Done
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(task.id)}
                variant="destructive"
              >
                <X className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default function TaskList({
  tasks = [],
  onTaskSelect,
  onTaskUpdate,
  onTaskDelete,
  onBulkAction,
  onCreateTask,
  className,
  showSearch = true,
  showFilters = true,
  showBulkActions = true,
  itemsPerPage = 20,
}: TaskListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("updated");
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query) ||
          task.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "priority": {
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return (
            (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
          );
        }
        case "dueDate":
          if (!(a.dueDate || b.dueDate)) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.getTime() - b.dueDate.getTime();
        case "updated":
        default:
          return b.updatedAt.getTime() - a.updatedAt.getTime();
      }
    });

    return filtered;
  }, [tasks, searchQuery, statusFilter, priorityFilter, sortBy]);

  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTasks.slice(start, start + itemsPerPage);
  }, [filteredTasks, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  const handleTaskSelect = (taskId: string, selected: boolean) => {
    setSelectedTasks((prev) => {
      const next = new Set(prev);
      if (selected) {
        next.add(taskId);
      } else {
        next.delete(taskId);
      }
      return next;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTasks(new Set(paginatedTasks.map((t) => t.id)));
    } else {
      setSelectedTasks(new Set());
    }
  };

  const handleStatusChange = async (taskId: string, status: TaskStatus) => {
    await onTaskUpdate?.(taskId, { status });
  };

  const handleDelete = async (taskId: string) => {
    await onTaskDelete?.(taskId);
    setSelectedTasks((prev) => {
      const next = new Set(prev);
      next.delete(taskId);
      return next;
    });
  };

  const handleBulkAction = async (action: string) => {
    if (selectedTasks.size === 0) return;
    await onBulkAction?.(Array.from(selectedTasks), action);
    setSelectedTasks(new Set());
  };

  const allSelected =
    paginatedTasks.length > 0 &&
    paginatedTasks.every((t) => selectedTasks.has(t.id));
  const someSelected = paginatedTasks.some((t) => selectedTasks.has(t.id));

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <CardTitle>Tasks</CardTitle>
              <CardDescription>
                {filteredTasks.length} task
                {filteredTasks.length !== 1 ? "s" : ""}
              </CardDescription>
            </div>
            {onCreateTask && (
              <Button onClick={onCreateTask} type="button">
                <Plus className="size-4" />
                New Task
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
                placeholder="Search tasks…"
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
            <div className="flex flex-wrap items-center gap-2">
              <Select onValueChange={setStatusFilter} value={statusFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <Filter className="size-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={setPriorityFilter} value={priorityFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={setSortBy} value={sortBy}>
                <SelectTrigger className="w-fit">
                  <SortAsc className="size-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="updated">Last Updated</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {showBulkActions && selectedTasks.size > 0 && (
            <div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-2">
              <span className="text-muted-foreground text-sm">
                {selectedTasks.size} selected
              </span>
              <Separator orientation="vertical" />
              <div className="flex gap-1">
                <Button
                  onClick={() => handleBulkAction("complete")}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  Complete
                </Button>
                <Button
                  onClick={() => handleBulkAction("delete")}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {paginatedTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Circle className="size-6 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-sm">
                {searchQuery ||
                statusFilter !== "all" ||
                priorityFilter !== "all"
                  ? "No tasks match your filters"
                  : "No tasks yet"}
              </p>
              <p className="text-muted-foreground text-sm">
                {onCreateTask
                  ? "Create your first task to get started"
                  : "Tasks will appear here"}
              </p>
            </div>
            {onCreateTask && (
              <Button onClick={onCreateTask} type="button" variant="outline">
                <Plus className="size-4" />
                Create Task
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {showBulkActions && (
              <div className="flex items-center gap-2 px-1">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-muted-foreground text-xs">
                  Select all
                </span>
              </div>
            )}
            {paginatedTasks.map((task) => (
              <TaskItem
                isSelected={selectedTasks.has(task.id)}
                key={task.id}
                onDelete={handleDelete}
                onSelect={handleTaskSelect}
                onStatusChange={handleStatusChange}
                onTaskClick={onTaskSelect || (() => {})}
                task={task}
              />
            ))}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <Button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  Previous
                </Button>
                <span className="text-muted-foreground text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

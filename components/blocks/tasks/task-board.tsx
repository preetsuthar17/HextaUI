"use client";

import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  MoreVertical,
  Plus,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
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
import { cn } from "@/lib/utils";
import type { Task, TaskPriority, TaskStatus } from "./task-list";

export interface TaskBoardProps {
  tasks?: Task[];
  columns?: Array<{
    id: TaskStatus;
    title: string;
    limit?: number;
  }>;
  onTaskMove?: (
    taskId: string,
    fromStatus: TaskStatus,
    toStatus: TaskStatus
  ) => Promise<void>;
  onTaskSelect?: (taskId: string) => void;
  onTaskCreate?: (status: TaskStatus) => void;
  onTaskUpdate?: (taskId: string, updates: Partial<Task>) => Promise<void>;
  onTaskDelete?: (taskId: string) => Promise<void>;
  className?: string;
  showColumnLimits?: boolean;
}

function formatDate(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dateOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  if (dateOnly.getTime() === today.getTime()) {
    return "Today";
  }

  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}`;
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

function isOverdue(date?: Date): boolean {
  if (!date) return false;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const dueDate = new Date(date);
  dueDate.setHours(0, 0, 0, 0);
  return dueDate < now;
}

interface TaskCardProps {
  task: Task;
  onTaskClick: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  isDragging?: boolean;
  onDragStart?: (taskId: string) => void;
  onDragEnd?: () => void;
}

function TaskCard({
  task,
  onTaskClick,
  onStatusChange,
  onDelete,
  isDragging = false,
  onDragStart,
  onDragEnd,
}: TaskCardProps) {
  const overdue = isOverdue(task.dueDate);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.setData("application/task-status", task.status);
    onDragStart?.(task.id);
  };

  const handleDragEnd = () => {
    onDragEnd?.();
  };

  return (
    <div
      className={cn(
        "group relative flex cursor-move flex-col gap-2 rounded-lg border bg-card p-3 shadow-xs transition-all hover:shadow-sm",
        isDragging && "opacity-50"
      )}
      draggable
      onClick={() => onTaskClick(task.id)}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="wrap-break-word min-w-0 flex-1 font-medium text-sm leading-tight">
          {task.title}
        </h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="absolute top-1 right-1">
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
              Move to To Do
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onStatusChange(task.id, "in_progress")}
            >
              <Clock className="size-4" />
              Move to In Progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(task.id, "done")}>
              <CheckCircle2 className="size-4" />
              Move to Done
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
      {task.description && (
        <p className="line-clamp-2 text-muted-foreground text-xs">
          {task.description}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <div
          className={cn("size-2 rounded-full", getPriorityColor(task.priority))}
          title={task.priority}
        />
        {task.assignees && task.assignees.length > 0 && (
          <div className="-space-x-1.5 flex">
            {task.assignees.slice(0, 3).map((assignee) => (
              <Avatar
                className="size-5 border-2 border-background"
                key={assignee.id}
              >
                <AvatarImage alt={assignee.name} src={assignee.avatar} />
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
          <Badge className="text-xs" variant="outline">
            {task.tags[0]}
            {task.tags.length > 1 && ` +${task.tags.length - 1}`}
          </Badge>
        )}
      </div>
    </div>
  );
}

interface ColumnProps {
  column: { id: TaskStatus; title: string; limit?: number };
  tasks: Task[];
  taskCount: number;
  onTaskClick: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onCreateTask?: () => void;
  showColumnLimits?: boolean;
  isDragOver?: boolean;
  draggingTaskId?: string | null;
  onDragOver?: (columnId: TaskStatus) => void;
  onDragLeave?: () => void;
  onTaskDragStart?: (taskId: string) => void;
  onTaskDragEnd?: () => void;
}

function Column({
  column,
  tasks,
  taskCount,
  onTaskClick,
  onStatusChange,
  onDelete,
  onCreateTask,
  showColumnLimits,
  isDragOver = false,
  draggingTaskId,
  onDragOver,
  onDragLeave,
  onTaskDragStart,
  onTaskDragEnd,
}: ColumnProps) {
  const isAtLimit = column.limit !== undefined && taskCount >= column.limit;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    onDragOver?.(column.id);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const taskId = e.dataTransfer.getData("text/plain");
    const fromStatus = e.dataTransfer.getData(
      "application/task-status"
    ) as TaskStatus;

    if (taskId && fromStatus !== column.id) {
      onStatusChange(taskId, column.id);
    }
    onDragLeave?.();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDragOver?.(column.id);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only clear if we're actually leaving the column
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      onDragLeave?.();
    }
  };

  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-3 rounded-lg transition-colors",
        isDragOver && "bg-primary/5 ring-2 ring-primary ring-offset-2"
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">{column.title}</h3>
          <Badge className="text-xs" variant="secondary">
            {taskCount}
            {column.limit !== undefined && ` / ${column.limit}`}
          </Badge>
        </div>
        {onCreateTask && (
          <Button
            onClick={onCreateTask}
            size="icon"
            type="button"
            variant="ghost"
          >
            <Plus className="size-4" />
          </Button>
        )}
      </div>
      {showColumnLimits && isAtLimit && (
        <div className="rounded-md border border-yellow-500/50 bg-yellow-500/10 p-2">
          <p className="text-xs text-yellow-700 dark:text-yellow-400">
            Column limit reached
          </p>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center">
            <Circle className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground text-xs">No tasks</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              isDragging={draggingTaskId === task.id}
              key={task.id}
              onDelete={onDelete}
              onDragEnd={onTaskDragEnd}
              onDragStart={onTaskDragStart}
              onStatusChange={onStatusChange}
              onTaskClick={onTaskClick}
              task={task}
            />
          ))
        )}
      </div>
    </div>
  );
}

const defaultColumns = [
  { id: "todo" as TaskStatus, title: "To Do" },
  { id: "in_progress" as TaskStatus, title: "In Progress" },
  { id: "done" as TaskStatus, title: "Done" },
];

export default function TaskBoard({
  tasks = [],
  columns = defaultColumns,
  onTaskMove,
  onTaskSelect,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
  className,
  showColumnLimits = false,
}: TaskBoardProps) {
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);

  const tasksByStatus = useMemo(() => {
    const grouped: Record<TaskStatus, Task[]> = {
      todo: [],
      in_progress: [],
      done: [],
      cancelled: [],
    };

    tasks.forEach((task) => {
      if (grouped[task.status]) {
        grouped[task.status].push(task);
      }
    });

    return grouped;
  }, [tasks]);

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    await onTaskMove?.(taskId, task.status, newStatus);
    await onTaskUpdate?.(taskId, { status: newStatus });
  };

  const handleDelete = async (taskId: string) => {
    await onTaskDelete?.(taskId);
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Task Board</CardTitle>
          <CardDescription>
            {tasks.length} task{tasks.length !== 1 ? "s" : ""} across{" "}
            {columns.length} columns
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {columns.map((column) => {
            const columnTasks = tasksByStatus[column.id] || [];
            return (
              <Column
                column={column}
                draggingTaskId={draggingTaskId}
                isDragOver={dragOverColumn === column.id}
                key={column.id}
                onCreateTask={
                  onTaskCreate ? () => onTaskCreate(column.id) : undefined
                }
                onDelete={handleDelete}
                onDragLeave={() => setDragOverColumn(null)}
                onDragOver={(columnId) => setDragOverColumn(columnId)}
                onStatusChange={handleStatusChange}
                onTaskClick={onTaskSelect || (() => {})}
                onTaskDragEnd={() => {
                  setDraggingTaskId(null);
                  setDragOverColumn(null);
                }}
                onTaskDragStart={(taskId) => setDraggingTaskId(taskId)}
                showColumnLimits={showColumnLimits}
                taskCount={columnTasks.length}
                tasks={columnTasks}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

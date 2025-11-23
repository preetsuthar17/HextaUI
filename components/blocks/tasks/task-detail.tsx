"use client";

import {
  Calendar,
  FileText,
  MessageSquare,
  MoreVertical,
  Paperclip,
  Plus,
} from "lucide-react";
import { parseAsStringEnum, useQueryState } from "nuqs";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Task, TaskAssignee, TaskPriority, TaskStatus } from "./task-list";
import { Checkbox } from "@/components/ui/checkbox";

export interface TaskComment {
  id: string;
  content: string;
  author: TaskAssignee;
  createdAt: Date;
  updatedAt?: Date;
}

export interface TaskAttachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedBy: TaskAssignee;
  uploadedAt: Date;
}

export interface TaskActivity {
  id: string;
  type: "created" | "updated" | "assigned" | "commented" | "completed";
  user: TaskAssignee;
  description: string;
  timestamp: Date;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
}

export interface TaskDetailProps {
  task?: Task | null;
  comments?: TaskComment[];
  attachments?: TaskAttachment[];
  activities?: TaskActivity[];
  subtasks?: Subtask[];
  onUpdate?: (updates: Partial<Task>) => Promise<void>;
  onDelete?: () => Promise<void>;
  onCommentAdd?: (content: string) => Promise<void>;
  onAttachmentUpload?: (file: File) => Promise<void>;
  onSubtaskToggle?: (subtaskId: string, completed: boolean) => Promise<void>;
  onSubtaskAdd?: (title: string) => Promise<void>;
  className?: string;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
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

function getStatusLabel(status: TaskStatus): string {
  switch (status) {
    case "todo":
      return "To Do";
    case "in_progress":
      return "In Progress";
    case "done":
      return "Done";
    case "cancelled":
      return "Cancelled";
  }
}

const tabValues = [
  "details",
  "subtasks",
  "comments",
  "attachments",
  "activity",
] as const;

const parseTab = parseAsStringEnum([...tabValues] as string[]).withDefault(
  "details"
);

export default function TaskDetail({
  task,
  comments = [],
  attachments = [],
  activities = [],
  subtasks = [],
  onUpdate,
  onDelete,
  onCommentAdd,
  onAttachmentUpload,
  onSubtaskToggle,
  onSubtaskAdd,
  className,
}: TaskDetailProps) {
  const [activeTab, setActiveTab] = useQueryState("tab", parseTab);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task?.title || "");
  const [editDescription, setEditDescription] = useState(
    task?.description || ""
  );
  const [commentText, setCommentText] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!task) {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardContent className="flex items-center justify-center p-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <FileText className="size-12 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              Select a task to view details
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleSave = async () => {
    await onUpdate?.({
      title: editTitle,
      description: editDescription,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setIsEditing(false);
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    await onCommentAdd?.(commentText);
    setCommentText("");
  };

  const completedSubtasks = subtasks.filter((s) => s.completed).length;
  const subtaskProgress =
    subtasks.length > 0 ? (completedSubtasks / subtasks.length) * 100 : 0;

  return (
    <>
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              {isEditing ? (
                <div className="flex flex-col gap-2">
                  <Input
                    className="w-full font-semibold text-base"
                    onChange={(e) => setEditTitle(e.target.value)}
                    value={editTitle}
                  />
                  <Textarea
                    className="min-h-[100px] resize-none"
                    onChange={(e) => setEditDescription(e.target.value)}
                    value={editDescription}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSave} size="sm" type="button">
                      Save
                    </Button>
                    <Button
                      onClick={handleCancel}
                      size="sm"
                      type="button"
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <CardTitle className="wrap-break-word">
                    {task.title}
                  </CardTitle>
                  {task.description && (
                    <CardDescription className="wrap-break-word">
                      {task.description}
                    </CardDescription>
                  )}
                </>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" type="button" variant="ghost">
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setShowDeleteDialog(true)}
                  variant="destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Status:</span>
                <Badge variant="outline">{getStatusLabel(task.status)}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Priority:</span>
                <div className="flex items-center gap-1.5">
                  <div
                    className={cn(
                      "size-2 rounded-full",
                      getPriorityColor(task.priority)
                    )}
                  />
                  <span className="text-sm capitalize">{task.priority}</span>
                </div>
              </div>
              {task.dueDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">
                    {formatDate(task.dueDate)}
                  </span>
                </div>
              )}
            </div>

            {task.assignees && task.assignees.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-muted-foreground text-sm">Assignees</span>
                <div className="flex flex-wrap gap-2">
                  {task.assignees.map((assignee) => (
                    <div
                      className="flex items-center gap-2 rounded-lg border bg-card p-2"
                      key={assignee.id}
                    >
                      <Avatar className="size-6">
                        <AvatarImage
                          alt={assignee.name}
                          src={assignee.avatar}
                        />
                        <AvatarFallback>
                          {assignee.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{assignee.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-muted-foreground text-sm">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Tabs
              className="flex w-full flex-col gap-4"
              onValueChange={setActiveTab}
              value={activeTab}
            >
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="subtasks">
                  Subtasks ({subtasks.length})
                </TabsTrigger>
                <TabsTrigger value="comments">
                  Comments ({comments.length})
                </TabsTrigger>
                <TabsTrigger value="attachments">
                  Attachments ({attachments.length})
                </TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <div>
                <TabsContent value="details">
                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="text-muted-foreground text-sm">
                        Created: {formatDateTime(task.createdAt)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm">
                        Updated: {formatDateTime(task.updatedAt)}
                      </span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="subtasks">
                  <div className="flex flex-col gap-4">
                    {subtasks.length > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary transition-all"
                            style={{ width: `${subtaskProgress}%` }}
                          />
                        </div>
                        <span className="text-muted-foreground text-sm">
                          {completedSubtasks} of {subtasks.length}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      {subtasks.map((subtask) => (
                        <div
                          className="flex items-center gap-2 rounded-lg border bg-card p-2"
                          key={subtask.id}
                        >
                          <label className="flex items-center gap-2 flex-1 cursor-pointer">
                            <Checkbox
                              aria-label={`Mark subtask '${subtask.title}' as complete`}
                              checked={subtask.completed}
                              className="size-4"
                              onCheckedChange={() =>
                                onSubtaskToggle?.(
                                  subtask.id,
                                  !subtask.completed
                                )
                              }
                              tabIndex={0}
                            />
                            <span
                              className={cn(
                                "flex-1 text-sm",
                                subtask.completed &&
                                  "text-muted-foreground line-through"
                              )}
                            >
                              {subtask.title}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                    {onSubtaskAdd && (
                      <Button
                        onClick={() => {
                          const title = prompt("Subtask title:");
                          if (title) onSubtaskAdd(title);
                        }}
                        size="sm"
                        type="button"
                        variant="outline"
                      >
                        <Plus className="size-4" />
                        Add Subtask
                      </Button>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="comments">
                  <div className="flex flex-col gap-4">
                    {comments.map((comment) => (
                      <div
                        className="flex gap-3 rounded-lg border bg-card p-3"
                        key={comment.id}
                      >
                        <Avatar className="size-8">
                          <AvatarImage
                            alt={comment.author.name}
                            src={comment.author.avatar}
                          />
                          <AvatarFallback>
                            {comment.author.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              {comment.author.name}
                            </span>
                            <span className="text-muted-foreground text-xs">
                              {formatDateTime(comment.createdAt)}
                            </span>
                          </div>
                          <p className="wrap-break-word text-sm">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    ))}
                    {onCommentAdd && (
                      <div className="flex flex-col gap-2">
                        <Textarea
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Add a comment…"
                          value={commentText}
                        />
                        <Button
                          onClick={handleCommentSubmit}
                          size="sm"
                          type="button"
                        >
                          <MessageSquare className="size-4" />
                          Post Comment
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="attachments">
                  <div className="flex flex-col gap-2">
                    {attachments.map((attachment) => (
                      <div
                        className="flex items-center justify-between rounded-lg border bg-card p-3"
                        key={attachment.id}
                      >
                        <div className="flex items-center gap-3">
                          <Paperclip className="size-4 text-muted-foreground" />
                          <div className="flex flex-col">
                            <span className="text-sm">{attachment.name}</span>
                            <span className="text-muted-foreground text-xs">
                              {formatDateTime(attachment.uploadedAt)}
                            </span>
                          </div>
                        </div>
                        <Button size="sm" type="button" variant="outline">
                          Download
                        </Button>
                      </div>
                    ))}
                    {onAttachmentUpload && (
                      <Button
                        onClick={() => {
                          const input = document.createElement("input");
                          input.type = "file";
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement)
                              .files?.[0];
                            if (file) onAttachmentUpload(file);
                          };
                          input.click();
                        }}
                        size="sm"
                        type="button"
                        variant="outline"
                      >
                        <Paperclip className="size-4" />
                        Upload Attachment
                      </Button>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="activity">
                  <div className="flex flex-col gap-3">
                    {activities.map((activity) => (
                      <div className="flex gap-3" key={activity.id}>
                        <Avatar className="size-8">
                          <AvatarImage
                            alt={activity.user.name}
                            src={activity.user.avatar}
                          />
                          <AvatarFallback>
                            {activity.user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">
                              {activity.user.name}
                            </span>{" "}
                            {activity.description}
                          </p>
                          <span className="text-muted-foreground text-xs">
                            {formatDateTime(activity.timestamp)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <Dialog onOpenChange={setShowDeleteDialog} open={showDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this task? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => setShowDeleteDialog(false)}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                await onDelete?.();
                setShowDeleteDialog(false);
              }}
              type="button"
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

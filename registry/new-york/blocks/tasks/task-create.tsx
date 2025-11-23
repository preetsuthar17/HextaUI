"use client";

import { Calendar, Loader2, Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { TaskPriority, TaskStatus } from "./task-list";

export interface TaskCreateProps {
  onSubmit?: (data: {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: Date;
    assigneeIds?: string[];
    tags?: string[];
    projectId?: string;
  }) => Promise<void>;
  onCancel?: () => void;
  className?: string;
  defaultStatus?: TaskStatus;
  defaultProjectId?: string;
  availableAssignees?: Array<{ id: string; name: string; avatar?: string }>;
  availableProjects?: Array<{ id: string; name: string }>;
  isLoading?: boolean;
}

export default function TaskCreate({
  onSubmit,
  onCancel,
  className,
  defaultStatus = "todo",
  defaultProjectId,
  availableAssignees = [],
  availableProjects = [],
  isLoading = false,
}: TaskCreateProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(defaultStatus);
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [projectId, setProjectId] = useState(defaultProjectId || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await onSubmit?.({
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      assigneeIds: selectedAssignees.length > 0 ? selectedAssignees : undefined,
      tags: tags.length > 0 ? tags : undefined,
      projectId: projectId || undefined,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setStatus(defaultStatus);
    setPriority("medium");
    setDueDate("");
    setSelectedAssignees([]);
    setTags([]);
    setTagInput("");
    setProjectId(defaultProjectId || "");
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleToggleAssignee = (assigneeId: string) => {
    setSelectedAssignees((prev) =>
      prev.includes(assigneeId)
        ? prev.filter((id) => id !== assigneeId)
        : [...prev, assigneeId]
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Create Task</CardTitle>
          <CardDescription>Add a new task to your project</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Field>
            <FieldLabel htmlFor="title">
              Title <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldContent>
              <InputGroup>
                <InputGroupInput
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task title…"
                  required
                  value={title}
                />
              </InputGroup>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <FieldContent>
              <Textarea
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description…"
                rows={4}
                value={description}
              />
            </FieldContent>
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <FieldContent>
                <Select
                  onValueChange={(value) => setStatus(value as TaskStatus)}
                  value={status}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="priority">Priority</FieldLabel>
              <FieldContent>
                <Select
                  onValueChange={(value) => setPriority(value as TaskPriority)}
                  value={priority}
                >
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="dueDate">Due Date</FieldLabel>
            <FieldContent>
              <InputGroup>
                <InputGroupAddon>
                  <Calendar className="size-4" />
                </InputGroupAddon>
                <InputGroupInput
                  id="dueDate"
                  onChange={(e) => setDueDate(e.target.value)}
                  type="date"
                  value={dueDate}
                />
              </InputGroup>
            </FieldContent>
          </Field>

          {availableProjects.length > 0 && (
            <Field>
              <FieldLabel htmlFor="project">Project</FieldLabel>
              <FieldContent>
                <Select
                  onValueChange={setProjectId}
                  value={projectId || undefined}
                >
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>
          )}

          {availableAssignees.length > 0 && (
            <Field>
              <FieldLabel>Assignees</FieldLabel>
              <FieldContent>
                <div className="flex flex-wrap gap-2">
                  {availableAssignees.map((assignee) => {
                    const isSelected = selectedAssignees.includes(assignee.id);
                    return (
                      <Button
                        key={assignee.id}
                        onClick={() => handleToggleAssignee(assignee.id)}
                        size="sm"
                        type="button"
                        variant={isSelected ? "default" : "outline"}
                      >
                        {assignee.name}
                      </Button>
                    );
                  })}
                </div>
              </FieldContent>
            </Field>
          )}

          <Field>
            <FieldLabel htmlFor="tags">Tags</FieldLabel>
            <FieldContent>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <InputGroup>
                    <InputGroupInput
                      id="tags"
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      placeholder="Add tag…"
                      value={tagInput}
                    />
                  </InputGroup>
                  <Button
                    onClick={handleAddTag}
                    size="icon"
                    type="button"
                    variant="outline"
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <div
                        className="flex items-center gap-1 rounded-full border bg-secondary px-2 py-1 text-sm"
                        key={tag}
                      >
                        <span>{tag}</span>
                        <button
                          aria-label={`Remove ${tag}`}
                          onClick={() => handleRemoveTag(tag)}
                          type="button"
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FieldContent>
          </Field>

          <Separator />

          <div className="flex justify-end gap-2">
            {onCancel && (
              <Button
                disabled={isLoading}
                onClick={onCancel}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
            )}
            <Button disabled={isLoading || !title.trim()} type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating…
                </>
              ) : (
                <>
                  <Plus className="size-4" />
                  Create Task
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

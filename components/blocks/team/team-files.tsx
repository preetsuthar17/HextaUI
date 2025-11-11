"use client";

import {
  Download,
  File,
  FileImage,
  FileText,
  MoreVertical,
  Search,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";
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
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

export interface TeamFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  uploadedAt: Date;
  tags?: string[];
  aiAccessible?: boolean;
  url?: string;
}

export interface TeamFilesProps {
  files?: TeamFile[];
  onUpload?: (files: File[]) => Promise<void>;
  onDelete?: (fileId: string) => Promise<void>;
  onDownload?: (fileId: string) => Promise<void>;
  onToggleAIAccess?: (fileId: string, enabled: boolean) => Promise<void>;
  className?: string;
  showSearch?: boolean;
  showTags?: boolean;
  maxSize?: number;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round((bytes / k ** i) * 100) / 100} ${sizes[i]}`;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getFileIcon(type: string) {
  if (type.startsWith("image/")) {
    return FileImage;
  }
  if (type.includes("pdf") || type.includes("document")) {
    return FileText;
  }
  return File;
}

function getFileTypeLabel(type: string): string {
  if (type.startsWith("image/")) {
    return "Image";
  }
  if (type.includes("pdf")) {
    return "PDF";
  }
  if (type.includes("text")) {
    return "Text";
  }
  return "File";
}

export default function TeamFiles({
  files = [],
  onUpload,
  onDelete,
  onDownload,
  onToggleAIAccess,
  className,
  showSearch = true,
  showTags = true,
  maxSize = 100 * 1024 * 1024, // 100MB default
}: TeamFilesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredFiles = files.filter((file) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      file.name.toLowerCase().includes(query) ||
      file.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter((file) => file.size <= maxSize);

    if (validFiles.length > 0) {
      await onUpload?.(validFiles);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter((file) => file.size <= maxSize);
    if (validFiles.length > 0) {
      await onUpload?.(validFiles);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <CardTitle>Team Files</CardTitle>
            <CardDescription>
              {files.length} file{files.length !== 1 ? "s" : ""} shared with
              your team
            </CardDescription>
          </div>
          {showSearch && (
            <InputGroup>
              <InputGroupAddon>
                <Search className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files…"
                type="search"
                value={searchQuery}
              />
            </InputGroup>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Upload Area */}
          {onUpload && (
            <div
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-8 transition-colors",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted bg-muted/30 hover:border-primary/50"
              )}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                <Upload className="size-6 text-primary" />
              </div>
              <div className="flex flex-col gap-2 text-center">
                <p className="font-medium text-sm">
                  Drag and drop files here, or{" "}
                  <button
                    className="text-primary underline"
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                  >
                    click to browse
                  </button>
                </p>
                <p className="text-muted-foreground text-xs">
                  Max file size: {formatBytes(maxSize)}
                </p>
              </div>
              <input
                accept="*/*"
                className="hidden"
                multiple
                onChange={handleFileSelect}
                ref={fileInputRef}
                type="file"
              />
            </div>
          )}

          {/* Files List */}
          {filteredFiles.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <File className="size-6" />
                </EmptyMedia>
                <EmptyTitle>
                  {searchQuery ? "No files found" : "No files yet"}
                </EmptyTitle>
              </EmptyHeader>
            </Empty>
          ) : (
            <div className="flex flex-col gap-2">
              {filteredFiles.map((file, idx) => {
                const Icon = getFileIcon(file.type);
                return (
                  <div
                    className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
                    key={file.id}
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
                      <Icon className="size-5 text-muted-foreground" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="wrap-break-word font-medium text-sm">
                          {file.name}
                        </span>
                        {file.aiAccessible && (
                          <Badge className="text-xs" variant="secondary">
                            AI Accessible
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
                        <span>{getFileTypeLabel(file.type)}</span>
                        <span aria-hidden="true">•</span>
                        <span>{formatBytes(file.size)}</span>
                        <span aria-hidden="true">•</span>
                        <span>
                          Uploaded by {file.uploadedBy.name} on{" "}
                          {formatDate(file.uploadedAt)}
                        </span>
                      </div>
                      {showTags && file.tags && file.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {file.tags.map((tag) => (
                            <Badge
                              className="text-xs"
                              key={tag}
                              variant="outline"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-label={`More options for ${file.name}`}
                          size="icon"
                          type="button"
                          variant="ghost"
                        >
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        collisionPadding={8}
                        sideOffset={4}
                      >
                        {onDownload && (
                          <DropdownMenuItem
                            onSelect={() => onDownload(file.id)}
                          >
                            <Download className="size-4" />
                            Download
                          </DropdownMenuItem>
                        )}
                        {onToggleAIAccess && (
                          <DropdownMenuItem
                            onSelect={() =>
                              onToggleAIAccess(file.id, !file.aiAccessible)
                            }
                          >
                            <Sparkles className="size-4" />
                            {file.aiAccessible
                              ? "Disable AI Access"
                              : "Enable AI Access"}
                          </DropdownMenuItem>
                        )}
                        {onDelete && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onSelect={() => onDelete(file.id)}
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
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

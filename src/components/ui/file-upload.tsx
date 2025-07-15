"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import {
  UploadCloud,
  File as FileIcon,
  Trash2,
  Loader,
  CheckCircle,
  X,
  Image as ImageIcon,
  FileText,
  Video,
  Music,
  Archive,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileWithPreview {
  id: string;
  preview?: string;
  progress: number;
  name: string;
  size: number;
  type: string;
  lastModified?: number;
  file?: File;
  status: "uploading" | "completed" | "error";
}

const fileUploadVariants = cva(
  "relative rounded-card border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 group w-full",
  {
    variants: {
      variant: {
        default:
          "border-border bg-card hover:border-primary/30 focus-visible:ring-ring",
        dashed:
          "border-dashed border-border bg-background hover:border-primary/50 hover:bg-accent focus-visible:ring-ring",
        ghost:
          "border-transparent bg-accent/50 hover:bg-accent focus-visible:ring-ring",
      },
      size: {
        sm: "p-4 min-h-[120px]",
        default: "p-6 min-h-[160px]",
        lg: "p-8 min-h-[200px]",
      },
      state: {
        idle: "",
        dragging: "border-primary bg-primary/5 scale-[1.02]",
        disabled: "opacity-50 pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "dashed",
      size: "default",
      state: "idle",
    },
  },
);

const fileItemVariants = cva(
  "flex items-start gap-3 p-4 rounded-ele transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-card border border-border",
        ghost: "bg-accent hover:bg-accent/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof fileUploadVariants> {
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  disabled?: boolean;
  onFilesChange?: (files: FileWithPreview[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
  showPreview?: boolean;
  itemVariant?: "default" | "ghost";
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      variant,
      size,
      state,
      accept = "image/*,application/pdf,video/*,audio/*,text/*,application/zip",
      multiple = true,
      maxFiles = 10,
      maxSize = 10 * 1024 * 1024, // 10MB
      disabled = false,
      onFilesChange,
      onUpload,
      showPreview = true,
      itemVariant = "default",
      children,
      ...props
    },
    ref,
  ) => {
    const [files, setFiles] = React.useState<FileWithPreview[]>([]);
    const [isDragging, setIsDragging] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const getFileIcon = (type: string) => {
      if (type.startsWith("image/")) return ImageIcon;
      if (type.startsWith("video/")) return Video;
      if (type.startsWith("audio/")) return Music;
      if (type.includes("pdf") || type.includes("document")) return FileText;
      if (type.includes("zip") || type.includes("archive")) return Archive;
      return FileIcon;
    };

    const formatFileSize = (bytes: number): string => {
      if (!bytes) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
    };

    const validateFile = (file: File): string | null => {
      if (file.size > maxSize) {
        return `File size exceeds ${formatFileSize(maxSize)}`;
      }
      return null;
    };

    const handleFiles = async (fileList: FileList) => {
      if (disabled) return;

      const newFiles = Array.from(fileList)
        .slice(0, maxFiles - files.length)
        .map((file) => {
          const error = validateFile(file);
          return {
            id: `${Date.now()}-${Math.random()}`,
            preview: file.type.startsWith("image/")
              ? URL.createObjectURL(file)
              : undefined,
            progress: 0,
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            file,
            status: error ? ("error" as const) : ("uploading" as const),
          };
        });

      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);

      // Simulate upload or call actual upload
      if (onUpload) {
        const validFiles = newFiles
          .filter((f) => f.status === "uploading")
          .map((f) => f.file!);
        try {
          await onUpload(validFiles);
          setFiles((prev) =>
            prev.map((f) =>
              newFiles.find((nf) => nf.id === f.id)
                ? { ...f, status: "completed" as const, progress: 100 }
                : f,
            ),
          );
        } catch (error) {
          setFiles((prev) =>
            prev.map((f) =>
              newFiles.find((nf) => nf.id === f.id)
                ? { ...f, status: "error" as const }
                : f,
            ),
          );
        }
      } else {
        // Simulate upload progress
        newFiles.forEach((fileItem) => {
          if (fileItem.status === "uploading") {
            simulateUpload(fileItem.id);
          }
        });
      }
    };

    const simulateUpload = (id: string) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, progress: Math.min(progress, 100) } : f,
          ),
        );
        if (progress >= 100) {
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === id ? { ...f, status: "completed" as const } : f,
            ),
          );
        }
      }, 200);
    };

    const removeFile = (id: string) => {
      const updatedFiles = files.filter((f) => f.id !== id);
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    };

    const clearAll = () => {
      setFiles([]);
      onFilesChange?.([]);
    };

    const onDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    };

    const onDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    };

    const onDragLeave = () => setIsDragging(false);

    const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) handleFiles(e.target.files);
    };

    const openFileDialog = () => {
      if (!disabled) inputRef.current?.click();
    };

    return (
      <div ref={ref} className="w-full space-y-4" {...props}>
        {/* Drop Zone */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={openFileDialog}
          className={cn(
            fileUploadVariants({
              variant,
              size,
              state: disabled ? "disabled" : isDragging ? "dragging" : "idle",
            }),
            "cursor-pointer",
            className,
          )}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="Upload files"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openFileDialog();
            }
          }}
        >
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <motion.div
              animate={{
                y: isDragging ? [-2, 0, -2] : 0,
                scale: isDragging ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 1.5,
                repeat: isDragging ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              <UploadCloud
                className={cn(
                  "w-12 h-12 transition-colors",
                  isDragging
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />
            </motion.div>

            <div className="space-y-1">
              <h3 className="text-lg font-medium text-foreground">
                {isDragging
                  ? "Drop files here"
                  : files.length
                    ? "Add more files"
                    : "Upload files"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isDragging ? (
                  <span className="text-primary font-medium">
                    Release to upload
                  </span>
                ) : (
                  <>
                    Drag and drop files here, or{" "}
                    <span className="text-primary font-medium">browse</span>
                  </>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                Max {maxFiles} files, up to {formatFileSize(maxSize)} each
              </p>
            </div>

            {children}
          </div>

          <input
            ref={inputRef}
            type="file"
            multiple={multiple}
            accept={accept}
            disabled={disabled}
            className="sr-only"
            onChange={onSelect}
            aria-describedby="file-upload-description"
          />
        </div>

        {/* Files List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-foreground">
                Files ({files.length})
              </h4>
              {files.length > 1 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                >
                  Clear all
                </button>
              )}{" "}
            </div>

            <div className="space-y-2">
              <AnimatePresence>
                <ScrollArea
                  className={cn(
                    "w-full rounded-md",
                    files.length > 3 ? "h-64" : "h-auto",
                  )}
                >
                  <div className="space-y-2 pe-3">
                    {files.map((file) => {
                      const IconComponent = getFileIcon(file.type);
                      return (
                        <motion.div
                          key={file.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={cn(
                            fileItemVariants({ variant: itemVariant }),
                          )}
                        >
                          {/* File Icon/Preview */}
                          <div className="flex-shrink-0 relative">
                            {showPreview && file.preview ? (
                              <img
                                src={file.preview}
                                alt={file.name}
                                className="w-10 h-10 rounded-md object-cover border border-border"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-md bg-accent flex items-center justify-center">
                                <IconComponent className="w-5 h-5 text-muted-foreground" />
                              </div>
                            )}
                            {file.status === "completed" && (
                              <div className="absolute -top-1 -end-1">
                                <CheckCircle className="w-4 h-4 text-primary bg-background rounded-full" />
                              </div>
                            )}
                          </div>

                          {/* File Info */}
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-medium text-foreground truncate">
                                {file.name}
                              </p>
                              <button
                                onClick={() => removeFile(file.id)}
                                className="flex-shrink-0 p-1 hover:bg-accent rounded-md transition-colors"
                                aria-label={`Remove ${file.name}`}
                              >
                                <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)}
                              </p>
                              <div className="flex items-center gap-2">
                                {file.status === "uploading" && (
                                  <>
                                    <span className="text-xs text-muted-foreground">
                                      {Math.round(file.progress)}%
                                    </span>
                                    <Loader className="w-3 h-3 animate-spin text-primary" />
                                  </>
                                )}
                                {file.status === "completed" && (
                                  <Badge variant="secondary" size="sm">
                                    Uploaded
                                  </Badge>
                                )}
                                {file.status === "error" && (
                                  <Badge variant="destructive" size="sm">
                                    Error
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {/* Progress Bar */}
                            {file.status === "uploading" && (
                              <div className="w-full h-1.5 bg-accent rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${file.progress}%` }}
                                  transition={{ duration: 0.3 }}
                                  className="h-full bg-primary rounded-full"
                                />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";

export { FileUpload, fileUploadVariants };
export type { FileWithPreview };

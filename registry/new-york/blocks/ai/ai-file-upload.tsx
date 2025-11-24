"use client";

import {
  Check,
  File,
  FileImage,
  FileText,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Progress } from "@/registry/new-york/ui/progress";

export interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  status: "uploading" | "processing" | "completed" | "error";
  progress?: number;
  error?: string;
}

export interface AIFileUploadProps {
  onFilesSelected?: (files: File[]) => void;
  onFileRemove?: (fileId: string) => void;
  uploadedFiles?: UploadedFile[];
  acceptedTypes?: string[];
  maxSize?: number;
  maxFiles?: number;
  className?: string;
  showPreview?: boolean;
  processingStatus?: Record<string, "processing" | "completed" | "error">;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round((bytes / k ** i) * 100) / 100} ${sizes[i]}`;
}

function getFileIcon(type: string) {
  if (type.startsWith("image/")) {
    return FileImage;
  }
  if (
    type.includes("text") ||
    type.includes("document") ||
    type.includes("pdf")
  ) {
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
  if (
    type.includes("code") ||
    type.includes("javascript") ||
    type.includes("typescript")
  ) {
    return "Code";
  }
  return "File";
}

interface FileUploadErrorProps {
  message: string;
  onDismiss?: () => void;
}

function FileUploadError({ message, onDismiss }: FileUploadErrorProps) {
  return (
    <div
      aria-live="polite"
      className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-3"
      role="alert"
    >
      <X
        aria-hidden="true"
        className="mt-0.5 size-4 shrink-0 text-destructive"
      />
      <p className="flex-1 text-destructive text-sm">{message}</p>
      {onDismiss && (
        <Button
          aria-label="Dismiss error"
          className="size-6 shrink-0"
          onClick={onDismiss}
          size="icon-sm"
          type="button"
          variant="ghost"
        >
          <X className="size-3" />
        </Button>
      )}
    </div>
  );
}

interface FileUploadDropzoneProps {
  acceptedTypes: string[];
  maxSize?: number;
  maxFiles?: number;
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onClick: () => void;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

function FileUploadDropzone({
  acceptedTypes,
  maxSize,
  maxFiles,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
  onFileInputChange,
  fileInputRef,
}: FileUploadDropzoneProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  return (
    <label
      aria-label="Upload files by clicking or dragging and dropping"
      className={cn(
        "relative flex min-h-[32px] min-w-[32px] cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-8 transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-muted bg-muted/30 hover:border-primary/50"
      )}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <input
        accept={acceptedTypes.join(",")}
        aria-label="File input"
        className="hidden"
        multiple={maxFiles ? maxFiles > 1 : true}
        onChange={onFileInputChange}
        ref={fileInputRef}
        type="file"
      />
      <div className="pointer-events-none flex size-12 items-center justify-center rounded-full bg-primary/10">
        <Upload aria-hidden="true" className="size-6 text-primary" />
      </div>
      <div className="pointer-events-none flex flex-col gap-2 text-center">
        <p className="font-medium text-sm">
          Drag and drop files here, or{" "}
          <span className="text-primary underline">click to browse</span>
        </p>
        <p className="text-muted-foreground text-xs">
          Accepted: {acceptedTypes.join(", ")}
          {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
          {maxFiles && ` • Max files: ${maxFiles}`}
        </p>
      </div>
    </label>
  );
}

interface FileUploadItemProps {
  uploadedFile: UploadedFile;
  showPreview: boolean;
  processingStatus?: Record<string, "processing" | "completed" | "error">;
  error?: string;
  onRemove?: (fileId: string) => void;
}

function FileUploadItem({
  uploadedFile,
  showPreview,
  processingStatus,
  error,
  onRemove,
}: FileUploadItemProps) {
  const Icon = getFileIcon(uploadedFile.file.type);
  const status = processingStatus?.[uploadedFile.id] || uploadedFile.status;
  const fileError = error || uploadedFile.error;
  const isUploading = status === "uploading";
  const isCompleted = status === "completed";
  const isError = status === "error";

  return (
    <div
      className="flex flex-col gap-2 rounded-lg border bg-card p-3"
      role="listitem"
    >
      <div className="flex items-center gap-3">
        {showPreview &&
        uploadedFile.preview &&
        uploadedFile.file.type.startsWith("image/") ? (
          <Image
            alt={uploadedFile.file.name}
            className="size-12 shrink-0 rounded-md object-cover"
            height={48}
            src={uploadedFile.preview}
            unoptimized
            width={48}
          />
        ) : (
          <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-muted">
            <Icon aria-hidden="true" className="size-6 text-muted-foreground" />
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="wrap-break-word font-medium text-sm">
                {uploadedFile.file.name}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
                <span>{getFileTypeLabel(uploadedFile.file.type)}</span>
                <span aria-hidden="true">•</span>
                <span>{formatFileSize(uploadedFile.file.size)}</span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {isUploading && (
                <Loader2
                  aria-label="Uploading"
                  className="size-4 animate-spin text-muted-foreground"
                  role="status"
                />
              )}
              {isCompleted && (
                <Check
                  aria-label="Upload completed"
                  className="size-4 text-green-600"
                />
              )}
              {isError && (
                <X
                  aria-label="Upload error"
                  className="size-4 text-destructive"
                />
              )}
              {onRemove && (
                <Button
                  aria-label={`Remove ${uploadedFile.file.name}`}
                  className="min-h-[32px] min-w-[32px]"
                  onClick={() => onRemove(uploadedFile.id)}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <X className="size-4" />
                </Button>
              )}
            </div>
          </div>
          {uploadedFile.progress !== undefined && isUploading && (
            <Progress
              aria-label={`Upload progress for ${uploadedFile.file.name}: ${uploadedFile.progress}%`}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={uploadedFile.progress}
              className="h-1.5"
              role="progressbar"
              value={uploadedFile.progress}
            />
          )}
          {fileError && (
            <p className="text-destructive text-xs" role="alert">
              {fileError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

interface FileUploadEmptyStateProps {
  maxFiles: number;
}

function FileUploadEmptyState({ maxFiles }: FileUploadEmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-12 text-center"
      role="status"
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <File aria-hidden="true" className="size-6 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground text-sm">
        Maximum files reached ({maxFiles})
      </p>
    </div>
  );
}

export default function AIFileUpload({
  onFilesSelected,
  onFileRemove,
  uploadedFiles = [],
  acceptedTypes = ["image/*", "application/pdf", "text/*"],
  maxSize = 10 * 1024 * 1024,
  maxFiles = 10,
  className,
  showPreview = true,
  processingStatus,
}: AIFileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const errorTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (maxSize && file.size > maxSize) {
        return `File size exceeds ${formatFileSize(maxSize)}`;
      }

      if (acceptedTypes.length > 0) {
        const isAccepted = acceptedTypes.some((type) => {
          if (type.endsWith("/*")) {
            return file.type.startsWith(type.slice(0, -2));
          }
          return file.type === type;
        });

        if (!isAccepted) {
          return `File type not supported. Accepted types: ${acceptedTypes.join(", ")}`;
        }
      }

      return null;
    },
    [maxSize, acceptedTypes]
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const fileArray = Array.from(files);
      const validFiles: File[] = [];
      const newErrors: Record<string, string> = {};

      fileArray.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          newErrors[file.name] = error;
        } else {
          validFiles.push(file);
        }
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        if (errorTimeoutRef.current) {
          clearTimeout(errorTimeoutRef.current);
        }
        errorTimeoutRef.current = setTimeout(() => {
          setErrors((prev) => {
            const next = { ...prev };
            delete next._general;
            return next;
          });
        }, 5000);
      }

      if (validFiles.length > 0) {
        const remainingSlots = maxFiles - uploadedFiles.length;
        const filesToAdd = validFiles.slice(0, remainingSlots);

        if (filesToAdd.length < validFiles.length) {
          const skipped = validFiles.length - filesToAdd.length;
          newErrors["_general"] =
            `${skipped} file${skipped !== 1 ? "s" : ""} skipped. Maximum ${maxFiles} files allowed.`;
          setErrors(newErrors);
        }

        onFilesSelected?.(filesToAdd);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [maxFiles, uploadedFiles.length, onFilesSelected, validateFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!e.currentTarget.contains(relatedTarget)) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (uploadedFiles.length >= maxFiles) {
        setErrors({
          _general: `Maximum ${maxFiles} files allowed`,
        });
        return;
      }

      handleFiles(e.dataTransfer.files);
    },
    [handleFiles, maxFiles, uploadedFiles.length]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
    },
    [handleFiles]
  );

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleDismissError = useCallback(() => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next._general;
      return next;
    });
  }, []);

  useEffect(
    () => () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    },
    []
  );

  const canAddMore = uploadedFiles.length < maxFiles;

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-2">
          <CardTitle>Upload Files</CardTitle>
          <CardDescription>
            Upload images, documents, or code files for AI analysis
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="-mt-4">
        <div className="flex flex-col gap-4">
          {canAddMore && (
            <FileUploadDropzone
              acceptedTypes={acceptedTypes}
              fileInputRef={fileInputRef}
              isDragging={isDragging}
              maxFiles={maxFiles}
              maxSize={maxSize}
              onClick={handleClick}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onFileInputChange={handleFileInputChange}
            />
          )}

          {errors._general && (
            <FileUploadError
              message={errors._general}
              onDismiss={handleDismissError}
            />
          )}

          {uploadedFiles.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">
                  Uploaded Files ({uploadedFiles.length}
                  {maxFiles && ` / ${maxFiles}`})
                </h3>
                {canAddMore && (
                  <Button
                    aria-label="Add more files"
                    className="min-h-[32px]"
                    onClick={handleClick}
                    size="sm"
                    type="button"
                    variant="outline"
                  >
                    <Upload aria-hidden="true" className="size-4" />
                    Add More
                  </Button>
                )}
              </div>
              <div className="flex flex-col gap-2" role="list">
                {uploadedFiles.map((uploadedFile) => (
                  <FileUploadItem
                    error={errors[uploadedFile.file.name]}
                    key={uploadedFile.id}
                    onRemove={onFileRemove}
                    processingStatus={processingStatus}
                    showPreview={showPreview}
                    uploadedFile={uploadedFile}
                  />
                ))}
              </div>
            </div>
          )}

          {uploadedFiles.length === 0 && !canAddMore && (
            <FileUploadEmptyState maxFiles={maxFiles} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

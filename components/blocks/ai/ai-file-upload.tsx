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
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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
      }

      if (validFiles.length > 0) {
        const remainingSlots = maxFiles - uploadedFiles.length;
        const filesToAdd = validFiles.slice(0, remainingSlots);

        if (filesToAdd.length < validFiles.length) {
          const skipped = validFiles.length - filesToAdd.length;
          newErrors["_general"] =
            `${skipped} file${skipped !== 1 ? "s" : ""} skipped. Maximum ${maxFiles} files allowed.`;
        }

        onFilesSelected?.(filesToAdd);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [
      acceptedTypes,
      maxSize,
      maxFiles,
      uploadedFiles.length,
      onFilesSelected,
      validateFile,
    ]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
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

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const canAddMore = uploadedFiles.length < maxFiles;

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Upload Files</CardTitle>
          <CardDescription>
            Upload images, documents, or code files for AI analysis
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {canAddMore && (
            <div
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-8 transition-colors",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted bg-muted/30 hover:border-primary/50"
              )}
              onClick={handleClick}
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
                  <span className="text-primary underline">
                    click to browse
                  </span>
                </p>
                <p className="text-muted-foreground text-xs">
                  Accepted: {acceptedTypes.join(", ")}
                  {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
                  {maxFiles && ` • Max files: ${maxFiles}`}
                </p>
              </div>
              <input
                accept={acceptedTypes.join(",")}
                className="hidden"
                multiple={maxFiles > 1}
                onChange={handleFileInputChange}
                ref={fileInputRef}
                type="file"
              />
            </div>
          )}

          {errors._general && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
              <p className="text-destructive text-sm">{errors._general}</p>
            </div>
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
                    onClick={handleClick}
                    size="sm"
                    type="button"
                    variant="outline"
                  >
                    <Upload className="size-4" />
                    Add More
                  </Button>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {uploadedFiles.map((uploadedFile) => {
                  const Icon = getFileIcon(uploadedFile.file.type);
                  const status =
                    processingStatus?.[uploadedFile.id] || uploadedFile.status;
                  const fileError =
                    errors[uploadedFile.file.name] || uploadedFile.error;

                  return (
                    <div
                      className="flex flex-col gap-2 rounded-lg border bg-card p-3"
                      key={uploadedFile.id}
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
                            <Icon className="size-6 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                              <p className="wrap-break-word font-medium text-sm">
                                {uploadedFile.file.name}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
                                <span>
                                  {getFileTypeLabel(uploadedFile.file.type)}
                                </span>
                                <span aria-hidden="true">•</span>
                                <span>
                                  {formatFileSize(uploadedFile.file.size)}
                                </span>
                              </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-2">
                              {status === "uploading" && (
                                <Loader2 className="size-4 animate-spin text-muted-foreground" />
                              )}
                              {status === "completed" && (
                                <Check className="size-4 text-green-600" />
                              )}
                              {status === "error" && (
                                <X className="size-4 text-destructive" />
                              )}
                              {onFileRemove && (
                                <Button
                                  aria-label={`Remove ${uploadedFile.file.name}`}
                                  onClick={() => onFileRemove(uploadedFile.id)}
                                  size="icon"
                                  type="button"
                                  variant="ghost"
                                >
                                  <X className="size-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                          {uploadedFile.progress !== undefined &&
                            status === "uploading" && (
                              <Progress
                                aria-label={`Upload progress for ${uploadedFile.file.name}`}
                                className="h-1.5"
                                value={uploadedFile.progress}
                              />
                            )}
                          {fileError && (
                            <p className="text-destructive text-xs">
                              {fileError}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {uploadedFiles.length === 0 && !canAddMore && (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <File className="size-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                Maximum files reached ({maxFiles})
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

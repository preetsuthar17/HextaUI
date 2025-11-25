"use client";

import { AlertCircle, Check, FileUp, Loader2, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
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
import { Field, FieldContent, FieldLabel } from "@/registry/new-york/ui/field";
import { Progress } from "@/registry/new-york/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/registry/new-york/ui/radio-group";
import { Separator } from "@/registry/new-york/ui/separator";

export interface ImportPreview {
  totalRecords: number;
  categories: Record<string, number>;
  conflicts: number;
  fields: string[];
}

export interface ImportJob {
  id: string;
  filename: string;
  format: "json" | "csv";
  status: "preview" | "dry-run" | "importing" | "completed" | "failed";
  progress?: number;
  preview?: ImportPreview;
  conflictResolution?: "skip" | "overwrite" | "merge";
  createdAt: Date;
  completedAt?: Date;
  error?: string;
  recordsImported?: number;
  recordsSkipped?: number;
  recordsFailed?: number;
}

export interface SettingsImportDataProps {
  importHistory?: ImportJob[];
  onUpload?: (file: File) => Promise<ImportPreview>;
  onImport?: (data: {
    file: File;
    conflictResolution: "skip" | "overwrite" | "merge";
    dryRun?: boolean;
  }) => Promise<ImportJob>;
  className?: string;
}

const conflictResolutionOptions = [
  {
    value: "skip",
    label: "Skip",
    description: "Skip conflicting records, keep existing data",
  },
  {
    value: "overwrite",
    label: "Overwrite",
    description: "Replace existing data with imported data",
  },
  {
    value: "merge",
    label: "Merge",
    description: "Combine existing and imported data",
  },
];

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round((bytes / k ** i) * 100) / 100} ${sizes[i]}`;
}

export default function SettingsImportData({
  importHistory = [],
  onUpload,
  onImport,
  className,
}: SettingsImportDataProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [conflictResolution, setConflictResolution] = useState<
    "skip" | "overwrite" | "merge"
  >("skip");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    async (file: File) => {
      setErrors({});

      if (!(file.name.endsWith(".json") || file.name.endsWith(".csv"))) {
        setErrors({
          file: "Please upload a JSON or CSV file",
        });
        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        setErrors({
          file: "File size must be less than 50MB",
        });
        return;
      }

      setUploadedFile(file);
      setIsUploading(true);

      try {
        const previewData = await onUpload?.(file);
        if (previewData) {
          setPreview(previewData);
        }
      } catch (error) {
        setErrors({
          file:
            error instanceof Error ? error.message : "Failed to process file",
        });
        setUploadedFile(null);
      } finally {
        setIsUploading(false);
      }
    },
    [onUpload]
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

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleImport = async (dryRun = false) => {
    if (!uploadedFile) return;

    setIsImporting(true);
    try {
      await onImport?.({
        file: uploadedFile,
        conflictResolution,
        dryRun,
      });

      if (!dryRun) {
        setUploadedFile(null);
        setPreview(null);
        setConflictResolution("skip");
      }
    } catch (error) {
      setErrors({
        import:
          error instanceof Error ? error.message : "Failed to import data",
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleRemove = () => {
    setUploadedFile(null);
    setPreview(null);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatDate = (date: Date): string =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);

  const getStatusBadge = (status: ImportJob["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="text-xs" variant="default">
            Completed
          </Badge>
        );
      case "importing":
        return (
          <Badge className="text-xs" variant="secondary">
            Importing
          </Badge>
        );
      case "dry-run":
        return (
          <Badge className="text-xs" variant="outline">
            Dry Run
          </Badge>
        );
      case "failed":
        return (
          <Badge className="text-xs" variant="destructive">
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <CardTitle className="wrap-break-word">Import Data</CardTitle>
            <CardDescription className="wrap-break-word">
              Import your data from a JSON or CSV file
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {/* File Upload */}
          <div className="flex flex-col gap-4">
            {uploadedFile ? (
              <div className="flex flex-col gap-4 rounded-lg border p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <FileUp className="size-5 text-primary" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <p className="wrap-break-word font-medium text-sm">
                        {uploadedFile.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatFileSize(uploadedFile.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    className="self-start sm:self-auto"
                    onClick={handleRemove}
                    size="icon-sm"
                    type="button"
                    variant="ghost"
                  >
                    <X className="size-4" />
                  </Button>
                </div>

                {preview && (
                  <>
                    <Separator />
                    <div className="flex flex-col gap-3">
                      <h4 className="font-medium text-sm">Preview</h4>
                      <div className="flex flex-col gap-2 rounded-lg bg-muted/30 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">
                            Total Records:
                          </span>
                          <span className="font-medium text-sm">
                            {preview.totalRecords}
                          </span>
                        </div>
                        {preview.conflicts > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm">
                              Conflicts:
                            </span>
                            <Badge className="text-xs" variant="destructive">
                              {preview.conflicts}
                            </Badge>
                          </div>
                        )}
                        {Object.keys(preview.categories).length > 0 && (
                          <div className="flex flex-col gap-1">
                            <span className="text-muted-foreground text-sm">
                              Categories:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {Object.entries(preview.categories).map(
                                ([category, count]) => (
                                  <Badge
                                    className="text-xs"
                                    key={category}
                                    variant="outline"
                                  >
                                    {category}: {count}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div
                className={cn(
                  "flex cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-8 transition-colors",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted bg-muted/30 hover:border-primary/50"
                )}
                onClick={() => fileInputRef.current?.click()}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {isUploading ? (
                  <Loader2 className="size-8 animate-spin text-primary" />
                ) : (
                  <Upload className="size-8 text-muted-foreground" />
                )}
                <div className="flex flex-col gap-2 text-center">
                  <p className="font-medium text-sm">
                    {isUploading
                      ? "Processing file…"
                      : "Drag and drop a file here, or click to browse"}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Supported formats: JSON, CSV • Max size: 50MB
                  </p>
                </div>
                <input
                  accept=".json,.csv"
                  className="hidden"
                  onChange={handleFileInputChange}
                  ref={fileInputRef}
                  type="file"
                />
              </div>
            )}

            {errors.file && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                <AlertCircle className="size-4 text-destructive" />
                <p className="text-destructive text-sm">{errors.file}</p>
              </div>
            )}
          </div>

          {/* Import Options */}
          {uploadedFile && preview && (
            <>
              <Separator />
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-base">Import Options</h3>
                <Field>
                  <FieldLabel>Conflict Resolution</FieldLabel>
                  <FieldContent>
                    <RadioGroup
                      onValueChange={(value: "skip" | "overwrite" | "merge") =>
                        setConflictResolution(value)
                      }
                      value={conflictResolution}
                    >
                      {conflictResolutionOptions.map((option) => (
                        <div
                          className="flex items-start gap-3 rounded-lg border p-3"
                          key={option.value}
                        >
                          <RadioGroupItem
                            id={`resolution-${option.value}`}
                            value={option.value}
                          />
                          <div className="flex flex-1 flex-col gap-1">
                            <label
                              className="cursor-pointer font-medium text-sm"
                              htmlFor={`resolution-${option.value}`}
                            >
                              {option.label}
                            </label>
                            <p className="text-muted-foreground text-xs">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </FieldContent>
                </Field>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    className="w-full sm:w-auto"
                    disabled={isImporting}
                    onClick={() => handleImport(true)}
                    type="button"
                    variant="outline"
                  >
                    <Check className="size-4" />
                    Dry Run
                  </Button>
                  <Button
                    className="w-full sm:w-auto"
                    disabled={isImporting}
                    onClick={() => handleImport(false)}
                    type="button"
                  >
                    {isImporting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Importing…
                      </>
                    ) : (
                      <>
                        <FileUp className="size-4" />
                        Import Data
                      </>
                    )}
                  </Button>
                </div>
                {errors.import && (
                  <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                    <AlertCircle className="size-4 text-destructive" />
                    <p className="text-destructive text-sm">{errors.import}</p>
                  </div>
                )}
              </div>
            </>
          )}

          <Separator />

          {/* Import History */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-base">Import History</h3>
            {importHistory.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No imports yet. Upload a file above to get started.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {importHistory.map((job) => (
                  <div
                    className="flex flex-col gap-3 rounded-lg border p-4"
                    key={job.id}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-sm">
                            {job.filename}
                          </span>
                          {getStatusBadge(job.status)}
                          <Badge
                            className="text-xs uppercase"
                            variant="outline"
                          >
                            {job.format}
                          </Badge>
                        </div>
                        {job.status === "importing" &&
                          job.progress !== undefined && (
                            <div className="flex flex-col gap-2">
                              <Progress value={job.progress} />
                              <p className="text-muted-foreground text-xs">
                                {job.progress}% complete
                              </p>
                            </div>
                          )}
                        {job.status === "completed" && (
                          <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-xs">
                            {job.recordsImported !== undefined && (
                              <span className="text-green-600">
                                {job.recordsImported} imported
                              </span>
                            )}
                            {job.recordsSkipped !== undefined &&
                              job.recordsSkipped > 0 && (
                                <span>{job.recordsSkipped} skipped</span>
                              )}
                            {job.recordsFailed !== undefined &&
                              job.recordsFailed > 0 && (
                                <span className="text-destructive">
                                  {job.recordsFailed} failed
                                </span>
                              )}
                          </div>
                        )}
                        <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-xs">
                          <span>Started: {formatDate(job.createdAt)}</span>
                          {job.completedAt && (
                            <span>
                              Completed: {formatDate(job.completedAt)}
                            </span>
                          )}
                        </div>
                        {job.error && (
                          <p className="text-destructive text-sm">
                            {job.error}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

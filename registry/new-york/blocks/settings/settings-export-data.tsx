"use client";

import { Download, FileDown, Loader2 } from "lucide-react";
import { useState } from "react";
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
import { Checkbox } from "@/registry/new-york/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/registry/new-york/ui/field";
import {
  InputGroup,
  InputGroupInput,
} from "@/registry/new-york/ui/input-group";
import { Progress } from "@/registry/new-york/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import { Separator } from "@/registry/new-york/ui/separator";

export interface ExportJob {
  id: string;
  format: "json" | "csv" | "pdf" | "zip";
  scope: string[];
  status: "pending" | "processing" | "completed" | "failed";
  progress?: number;
  createdAt: Date;
  completedAt?: Date;
  downloadUrl?: string;
  expiresAt?: Date;
  error?: string;
}

export interface SettingsExportDataProps {
  exportHistory?: ExportJob[];
  onExport?: (data: {
    format: "json" | "csv" | "pdf" | "zip";
    scope: string[];
    dateRange?: { start: Date; end: Date };
  }) => Promise<ExportJob>;
  onDownload?: (jobId: string) => Promise<void>;
  className?: string;
}

const exportFormats = [
  {
    value: "json",
    label: "JSON",
    description: "Machine-readable format, includes all data",
  },
  {
    value: "csv",
    label: "CSV",
    description: "Spreadsheet format, best for tabular data",
  },
  {
    value: "pdf",
    label: "PDF",
    description: "Human-readable document format",
  },
  {
    value: "zip",
    label: "ZIP",
    description: "Compressed archive with multiple formats",
  },
];

const dataCategories = [
  { id: "profile", label: "Profile Information" },
  { id: "activity", label: "Activity History" },
  { id: "messages", label: "Messages & Conversations" },
  { id: "files", label: "Uploaded Files" },
  { id: "settings", label: "Settings & Preferences" },
  { id: "billing", label: "Billing & Invoices" },
];

export default function SettingsExportData({
  exportHistory = [],
  onExport,
  onDownload,
  className,
}: SettingsExportDataProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<
    "json" | "csv" | "pdf" | "zip"
  >("json");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({
    enabled: false,
    start: "",
    end: "",
  });

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleExport = async () => {
    if (selectedCategories.length === 0) {
      return;
    }

    setIsExporting(true);
    try {
      const exportRange = dateRange.enabled
        ? {
            start: new Date(dateRange.start),
            end: new Date(dateRange.end),
          }
        : undefined;

      await onExport?.({
        format: selectedFormat,
        scope: selectedCategories,
        dateRange: exportRange,
      });

      setSelectedCategories([]);
      setDateRange({ enabled: false, start: "", end: "" });
    } finally {
      setIsExporting(false);
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

  const getStatusBadge = (status: ExportJob["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="text-xs" variant="default">
            Completed
          </Badge>
        );
      case "processing":
        return (
          <Badge className="text-xs" variant="secondary">
            Processing
          </Badge>
        );
      case "pending":
        return (
          <Badge className="text-xs" variant="outline">
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="text-xs" variant="destructive">
            Failed
          </Badge>
        );
    }
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <CardTitle className="wrap-break-word">Export Data</CardTitle>
            <CardDescription className="wrap-break-word">
              Download a copy of your data in various formats
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {/* Export Options */}
          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel htmlFor="export-format">Export Format</FieldLabel>
              <FieldContent>
                <Select
                  onValueChange={(value: "json" | "csv" | "pdf" | "zip") =>
                    setSelectedFormat(value)
                  }
                  value={selectedFormat}
                >
                  <SelectTrigger id="export-format">
                    <SelectValue>
                      {
                        exportFormats.find((f) => f.value === selectedFormat)
                          ?.label
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {exportFormats.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        <div className="flex flex-col">
                          <span>{format.label}</span>
                          <span className="text-muted-foreground text-xs">
                            {format.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Data Categories</FieldLabel>
              <FieldContent>
                <div className="flex flex-col gap-3">
                  {dataCategories.map((category) => (
                    <div
                      className="flex items-center gap-3 rounded-lg border p-3"
                      key={category.id}
                    >
                      <Checkbox
                        checked={selectedCategories.includes(category.id)}
                        id={`category-${category.id}`}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <label
                        className="flex-1 cursor-pointer font-medium text-sm"
                        htmlFor={`category-${category.id}`}
                      >
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
                <FieldDescription>
                  Select the data categories you want to export
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <FieldLabel htmlFor="date-range">
                    Date Range (Optional)
                  </FieldLabel>
                  <FieldDescription>
                    Limit export to a specific date range
                  </FieldDescription>
                </div>
                <Checkbox
                  checked={dateRange.enabled}
                  id="date-range"
                  onCheckedChange={(checked) =>
                    setDateRange((prev) => ({
                      ...prev,
                      enabled: checked === true,
                    }))
                  }
                />
              </div>
            </Field>

            {dateRange.enabled && (
              <div className="flex flex-col gap-4 rounded-lg border bg-muted/30 p-4">
                <Field>
                  <FieldLabel htmlFor="date-start">Start Date</FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="date-start"
                        onChange={(e) =>
                          setDateRange((prev) => ({
                            ...prev,
                            start: e.target.value,
                          }))
                        }
                        type="date"
                        value={dateRange.start}
                      />
                    </InputGroup>
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="date-end">End Date</FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        id="date-end"
                        onChange={(e) =>
                          setDateRange((prev) => ({
                            ...prev,
                            end: e.target.value,
                          }))
                        }
                        type="date"
                        value={dateRange.end}
                      />
                    </InputGroup>
                  </FieldContent>
                </Field>
              </div>
            )}

            <Button
              className="w-full sm:w-auto"
              disabled={isExporting || selectedCategories.length === 0}
              onClick={handleExport}
              type="button"
            >
              {isExporting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Exporting…
                </>
              ) : (
                <>
                  <FileDown className="size-4" />
                  Start Export
                </>
              )}
            </Button>
          </div>

          <Separator />

          {/* Export History */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-base">Export History</h3>
            {exportHistory.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No exports yet. Create your first export above.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {exportHistory.map((job) => (
                  <div
                    className="flex flex-col gap-3 rounded-lg border p-4"
                    key={job.id}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-sm">
                            {
                              exportFormats.find((f) => f.value === job.format)
                                ?.label
                            }
                          </span>
                          {getStatusBadge(job.status)}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {job.scope.map((category) => (
                            <Badge
                              className="text-xs"
                              key={category}
                              variant="outline"
                            >
                              {dataCategories.find((c) => c.id === category)
                                ?.label || category}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-xs">
                          <span>Created: {formatDate(job.createdAt)}</span>
                          {job.completedAt && (
                            <span>
                              Completed: {formatDate(job.completedAt)}
                            </span>
                          )}
                          {job.expiresAt && (
                            <span>Expires: {formatDate(job.expiresAt)}</span>
                          )}
                        </div>
                        {job.status === "processing" &&
                          job.progress !== undefined && (
                            <div className="flex flex-col gap-2">
                              <Progress value={job.progress} />
                              <p className="text-muted-foreground text-xs">
                                {job.progress}% complete
                              </p>
                            </div>
                          )}
                        {job.error && (
                          <p className="text-destructive text-sm">
                            {job.error}
                          </p>
                        )}
                      </div>
                      {job.status === "completed" && job.downloadUrl && (
                        <Button
                          className="w-full sm:w-auto"
                          onClick={() => onDownload?.(job.id)}
                          type="button"
                          variant="outline"
                        >
                          <Download className="size-4" />
                          Download
                        </Button>
                      )}
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

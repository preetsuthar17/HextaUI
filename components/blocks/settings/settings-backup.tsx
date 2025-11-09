"use client";

import {
  Calendar,
  Clock,
  HardDrive,
  Loader2,
  Play,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldDescription, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export interface Backup {
  id: string;
  name: string;
  type: "automatic" | "manual";
  status: "completed" | "in_progress" | "failed";
  size: number;
  createdAt: Date;
  completedAt?: Date;
  location: string;
  retentionDays?: number;
}

export interface SettingsBackupProps {
  backups?: Backup[];
  autoBackupEnabled?: boolean;
  autoBackupSchedule?: "daily" | "weekly" | "monthly";
  retentionDays?: number;
  storageLocation?: string;
  onCreateBackup?: () => Promise<Backup>;
  onRestore?: (backupId: string) => Promise<void>;
  onDelete?: (backupId: string) => Promise<void>;
  onUpdateSettings?: (settings: {
    enabled: boolean;
    schedule?: "daily" | "weekly" | "monthly";
    retentionDays?: number;
    storageLocation?: string;
  }) => Promise<void>;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round((bytes / k ** i) * 100) / 100} ${sizes[i]}`;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default function SettingsBackup({
  backups = [],
  autoBackupEnabled = false,
  autoBackupSchedule = "daily",
  retentionDays = 30,
  storageLocation = "cloud",
  onCreateBackup,
  onRestore,
  onDelete,
  onUpdateSettings,
  className,
}: SettingsBackupProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [localSettings, setLocalSettings] = useState({
    enabled: autoBackupEnabled,
    schedule: autoBackupSchedule,
    retentionDays,
    storageLocation,
  });

  const handleCreateBackup = async () => {
    setIsCreating(true);
    try {
      await onCreateBackup?.();
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateSettings = async () => {
    await onUpdateSettings?.(localSettings);
  };

  const getStatusBadge = (status: Backup["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="text-xs" variant="default">
            Completed
          </Badge>
        );
      case "in_progress":
        return (
          <Badge className="text-xs" variant="secondary">
            In Progress
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
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <CardTitle className="wrap-break-word">Backup & Restore</CardTitle>
            <CardDescription className="wrap-break-word">
              Manage automatic backups and restore your data
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {/* Backup Settings */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  <Calendar className="size-4" />
                </div>
                <FieldLabel className="mb-0">Automatic Backups</FieldLabel>
              </div>
              <div className="flex items-center justify-between">
                <FieldDescription>Enable automatic backups</FieldDescription>
                <Switch
                  checked={localSettings.enabled}
                  onCheckedChange={(checked) =>
                    setLocalSettings((prev) => ({ ...prev, enabled: checked }))
                  }
                />
              </div>
            </div>

            {localSettings.enabled && (
              <>
                <div className="flex flex-col gap-4 rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                      <Clock className="size-4" />
                    </div>
                    <FieldLabel className="mb-0" htmlFor="backup-schedule">
                      Schedule
                    </FieldLabel>
                  </div>
                  <Select
                    onValueChange={(value: "daily" | "weekly" | "monthly") =>
                      setLocalSettings((prev) => ({ ...prev, schedule: value }))
                    }
                    value={localSettings.schedule}
                  >
                    <SelectTrigger id="backup-schedule">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-4 rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                      <Calendar className="size-4" />
                    </div>
                    <FieldLabel className="mb-0" htmlFor="retention-days">
                      Retention (Days)
                    </FieldLabel>
                  </div>
                  <InputGroup>
                    <InputGroupInput
                      id="retention-days"
                      onChange={(e) =>
                        setLocalSettings((prev) => ({
                          ...prev,
                          retentionDays: Number.parseInt(e.target.value) || 30,
                        }))
                      }
                      type="number"
                      value={localSettings.retentionDays}
                    />
                  </InputGroup>
                </div>

                <div className="flex flex-col gap-4 rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                      <HardDrive className="size-4" />
                    </div>
                    <FieldLabel className="mb-0" htmlFor="storage-location">
                      Storage Location
                    </FieldLabel>
                  </div>
                  <Select
                    onValueChange={(value) =>
                      setLocalSettings((prev) => ({
                        ...prev,
                        storageLocation: value,
                      }))
                    }
                    value={localSettings.storageLocation}
                  >
                    <SelectTrigger id="storage-location">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cloud">Cloud Storage</SelectItem>
                      <SelectItem value="local">Local Storage</SelectItem>
                      <SelectItem value="s3">Amazon S3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              className="w-full sm:w-auto"
              onClick={handleUpdateSettings}
              type="button"
            >
              <Save className="size-4" />
              Save Settings
            </Button>
          </div>

          <Separator />

          {/* Manual Backup */}
          <div className="flex flex-col gap-4 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                <Play className="size-4" />
              </div>
              <FieldLabel className="mb-0">Manual Backup</FieldLabel>
            </div>
            <Button
              className="w-full sm:w-auto"
              disabled={isCreating}
              onClick={handleCreateBackup}
              type="button"
            >
              {isCreating ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating Backup…
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Create Backup Now
                </>
              )}
            </Button>
          </div>

          <Separator />

          {/* Backup History */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-base">Backup History</h3>
            {backups.length === 0 ? (
              <p className="text-muted-foreground text-sm">No backups yet</p>
            ) : (
              <div className="flex flex-col gap-3">
                {backups.map((backup) => (
                  <div
                    className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center"
                    key={backup.id}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <HardDrive className="size-5" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-sm">
                            {backup.name}
                          </span>
                          {getStatusBadge(backup.status)}
                          <Badge className="text-xs" variant="outline">
                            {backup.type}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
                          <span>{formatBytes(backup.size)}</span>
                          <span>•</span>
                          <span>{backup.location}</span>
                          <span>•</span>
                          <span>Created: {formatDate(backup.createdAt)}</span>
                          {backup.completedAt && (
                            <>
                              <span>•</span>
                              <span>
                                Completed: {formatDate(backup.completedAt)}
                              </span>
                            </>
                          )}
                        </div>
                        {backup.status === "in_progress" && (
                          <div className="flex flex-col gap-2">
                            <Progress value={50} />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-2">
                      {backup.status === "completed" && (
                        <Button
                          className="w-full sm:w-auto"
                          onClick={() => onRestore?.(backup.id)}
                          type="button"
                          variant="outline"
                        >
                          <RotateCcw className="size-4" />
                          Restore
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            className="w-full sm:w-auto"
                            type="button"
                            variant="destructive"
                          >
                            <Trash2 className="size-4" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Backup?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the backup{" "}
                              <strong>{backup.name}</strong>. This action cannot
                              be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete?.(backup.id)}
                            >
                              Delete Backup
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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

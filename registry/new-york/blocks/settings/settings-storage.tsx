"use client";

import {
  Database,
  Loader2,
  type LucideIcon,
  Trash2,
  TrendingDown,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
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
} from "@/registry/new-york/ui/alert-dialog";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { FieldDescription, FieldLabel } from "@/registry/new-york/ui/field";
import { Progress } from "@/registry/new-york/ui/progress";
import { Separator } from "@/registry/new-york/ui/separator";

export interface StorageCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  used: number;
  total?: number;
  color: string;
}

export interface SettingsStorageProps {
  totalUsed?: number;
  totalLimit?: number;
  categories?: StorageCategory[];
  onCleanup?: (categoryId?: string) => Promise<void>;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round((bytes / k ** i) * 100) / 100} ${sizes[i]}`;
}

export default function SettingsStorage({
  totalUsed = 0,
  totalLimit = 100 * 1024 * 1024 * 1024, // 100 GB default
  categories = [],
  onCleanup,
  className,
}: SettingsStorageProps) {
  const [isCleaning, setIsCleaning] = useState<string | null>(null);

  const usagePercentage = (totalUsed / totalLimit) * 100;
  const remaining = totalLimit - totalUsed;

  const handleCleanup = async (categoryId?: string) => {
    setIsCleaning(categoryId || "all");
    try {
      await onCleanup?.(categoryId);
    } finally {
      setIsCleaning(null);
    }
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <CardTitle className="wrap-break-word">Storage</CardTitle>
            <CardDescription className="wrap-break-word">
              Manage your storage usage and quotas
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {/* Overall Usage */}
          <div className="flex flex-col gap-4 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                <Database className="size-4" />
              </div>
              <FieldLabel className="mb-0">Storage Usage</FieldLabel>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  {formatBytes(totalUsed)} of {formatBytes(totalLimit)} used
                </span>
                <span className="font-medium text-sm">
                  {usagePercentage.toFixed(1)}%
                </span>
              </div>
              <Progress value={usagePercentage} />
              <p className="text-muted-foreground text-xs">
                {formatBytes(remaining)} remaining
              </p>
            </div>
          </div>

          <Separator />

          {/* Storage by Category */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-base">Storage by Category</h3>
            {categories.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No storage data available
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const categoryPercentage = category.total
                    ? (category.used / category.total) * 100
                    : 0;

                  return (
                    <div
                      className="flex flex-col gap-4 rounded-lg border p-4"
                      key={category.id}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "flex size-8 items-center justify-center rounded-lg",
                              category.color
                            )}
                          >
                            <Icon className="size-4" />
                          </div>
                          <FieldLabel className="mb-0">
                            {category.name}
                          </FieldLabel>
                        </div>
                        {category.total && (
                          <span className="font-medium text-sm">
                            {categoryPercentage.toFixed(1)}%
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-muted-foreground text-xs">
                          <span>{formatBytes(category.used)}</span>
                          {category.total && (
                            <span>of {formatBytes(category.total)}</span>
                          )}
                        </div>
                        {category.total && (
                          <Progress value={categoryPercentage} />
                        )}
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            className="w-full"
                            disabled={isCleaning === category.id}
                            type="button"
                            variant="outline"
                          >
                            {isCleaning === category.id ? (
                              <>
                                <Loader2 className="size-4 animate-spin" />
                                Cleaning…
                              </>
                            ) : (
                              <>
                                <Trash2 className="size-4" />
                                Clean Up
                              </>
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Clean Up {category.name}?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will delete old and unused files from{" "}
                              {category.name}. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleCleanup(category.id)}
                            >
                              Clean Up
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <Separator />

          {/* Cleanup Actions */}
          <div className="flex flex-col gap-4 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                <TrendingDown className="size-4" />
              </div>
              <FieldLabel className="mb-0">Storage Optimization</FieldLabel>
            </div>
            <div className="flex flex-col gap-3">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-full sm:w-auto"
                    disabled={isCleaning === "all"}
                    type="button"
                    variant="outline"
                  >
                    {isCleaning === "all" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Cleaning…
                      </>
                    ) : (
                      <>
                        <Trash2 className="size-4" />
                        Empty Trash
                      </>
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Empty Trash?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all files in your trash. This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleCleanup()}>
                      Empty Trash
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <FieldDescription>
                Remove old and unused files to free up storage space
              </FieldDescription>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

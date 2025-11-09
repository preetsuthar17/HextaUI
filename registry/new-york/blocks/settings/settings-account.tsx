"use client";

import {
  AlertTriangle,
  ArrowUpRight,
  Crown,
  Loader2,
  Trash2,
  Users,
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface AccountInfo {
  type: "free" | "pro" | "enterprise";
  status: "active" | "trial" | "suspended" | "cancelled";
  trialEndsAt?: Date;
  memberCount?: number;
  memberLimit?: number;
  storageUsed?: number;
  storageLimit?: number;
}

export interface SettingsAccountProps {
  account?: AccountInfo;
  onUpgrade?: () => Promise<void>;
  onDelete?: () => Promise<void>;
  onTransfer?: () => Promise<void>;
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
  }).format(date);
}

export default function SettingsAccount({
  account,
  onUpgrade,
  onDelete,
  onTransfer,
  className,
}: SettingsAccountProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!account) {
    return null;
  }

  const getStatusBadge = (status: AccountInfo["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="text-xs" variant="default">
            Active
          </Badge>
        );
      case "trial":
        return (
          <Badge className="text-xs" variant="secondary">
            Trial
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="text-xs" variant="destructive">
            Suspended
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="text-xs" variant="outline">
            Cancelled
          </Badge>
        );
    }
  };

  const getPlanBadge = (type: AccountInfo["type"]) => {
    switch (type) {
      case "free":
        return (
          <Badge className="text-xs" variant="outline">
            Free
          </Badge>
        );
      case "pro":
        return (
          <Badge className="text-xs" variant="default">
            Pro
          </Badge>
        );
      case "enterprise":
        return (
          <Badge className="flex items-center gap-1 text-xs" variant="default">
            <Crown className="size-3" />
            <span>Enterprise</span>
          </Badge>
        );
    }
  };

  const memberPercentage =
    account.memberLimit && account.memberCount
      ? (account.memberCount / account.memberLimit) * 100
      : 0;
  const storagePercentage =
    account.storageLimit && account.storageUsed
      ? (account.storageUsed / account.storageLimit) * 100
      : 0;

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <CardTitle className="wrap-break-word">Account</CardTitle>
            <CardDescription className="wrap-break-word">
              Manage your account settings and subscription
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {/* Account Overview */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  <Crown className="size-4" />
                </div>
                <FieldLabel className="mb-0">Plan</FieldLabel>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {getPlanBadge(account.type)}
                  {getStatusBadge(account.status)}
                </div>
                {account.status === "trial" && account.trialEndsAt && (
                  <p className="text-muted-foreground text-xs">
                    Trial ends on {formatDate(account.trialEndsAt)}
                  </p>
                )}
                {account.type !== "enterprise" && (
                  <Button
                    className="w-full sm:w-auto"
                    onClick={onUpgrade}
                    type="button"
                    variant="outline"
                  >
                    <ArrowUpRight className="size-4" />
                    Upgrade Plan
                  </Button>
                )}
              </div>
            </div>

            {account.memberLimit !== undefined && (
              <div className="flex flex-col gap-4 rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Users className="size-4" />
                  </div>
                  <FieldLabel className="mb-0">Team Members</FieldLabel>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      {account.memberCount || 0} / {account.memberLimit}
                    </span>
                    <span className="font-medium text-sm">
                      {memberPercentage.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={memberPercentage} />
                </div>
              </div>
            )}
          </div>

          {account.storageLimit !== undefined && (
            <>
              <Separator />
              <div className="flex flex-col gap-4 rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Crown className="size-4" />
                  </div>
                  <FieldLabel className="mb-0">Storage</FieldLabel>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      {formatBytes(account.storageUsed || 0)} /{" "}
                      {formatBytes(account.storageLimit)}
                    </span>
                    <span className="font-medium text-sm">
                      {storagePercentage.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={storagePercentage} />
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Account Actions */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  <Users className="size-4" />
                </div>
                <FieldLabel className="mb-0">Transfer Account</FieldLabel>
              </div>
              <FieldDescription>
                Transfer ownership of this account to another user
              </FieldDescription>
              <Button
                className="w-full sm:w-auto"
                onClick={onTransfer}
                type="button"
                variant="outline"
              >
                Transfer Ownership
              </Button>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border border-destructive/50 p-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-destructive/10">
                  <AlertTriangle className="size-4 text-destructive" />
                </div>
                <FieldLabel className="mb-0 text-destructive">
                  Danger Zone
                </FieldLabel>
              </div>
              <FieldDescription>
                Permanently delete your account and all associated data
              </FieldDescription>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-full sm:w-auto"
                    disabled={isDeleting}
                    type="button"
                    variant="destructive"
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Deleting…
                      </>
                    ) : (
                      <>
                        <Trash2 className="size-4" />
                        Delete Account
                      </>
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Account?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete your account and all
                      associated data. This action cannot be undone. Please type{" "}
                      <strong>DELETE</strong> to confirm.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={async () => {
                        setIsDeleting(true);
                        try {
                          await onDelete?.();
                        } finally {
                          setIsDeleting(false);
                        }
                      }}
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

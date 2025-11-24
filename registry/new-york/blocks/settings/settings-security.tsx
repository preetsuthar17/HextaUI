"use client";

import {
  AlertTriangle,
  Check,
  Clock,
  Eye,
  EyeOff,
  Key,
  Loader2,
  Lock,
  MapPin,
  Monitor,
  Shield,
  Smartphone,
  Trash2,
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
import { Badge } from "@/registry/new-york/ui/badge";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/new-york/ui/field";
import {
  InputGroup,
  InputGroupInput,
} from "@/registry/new-york/ui/input-group";
import { Separator } from "@/registry/new-york/ui/separator";

export interface SecuritySession {
  id: string;
  device: string;
  location: string;
  ipAddress: string;
  lastActive: Date;
  current: boolean;
}

export interface SecurityEvent {
  id: string;
  type: "login" | "password_change" | "2fa_enabled" | "2fa_disabled" | "logout";
  description: string;
  ipAddress: string;
  location: string;
  timestamp: Date;
  status: "success" | "failed" | "suspicious";
}

export interface SettingsSecurityProps {
  twoFactorEnabled?: boolean;
  sessions?: SecuritySession[];
  securityHistory?: SecurityEvent[];
  onPasswordChange?: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
  onEnable2FA?: () => Promise<void>;
  onDisable2FA?: () => Promise<void>;
  onRevokeSession?: (sessionId: string) => Promise<void>;
  onRevokeAllSessions?: () => Promise<void>;
  onGenerateBackupCodes?: () => Promise<string[]>;
  className?: string;
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

function formatRelativeTime(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
}

export default function SettingsSecurity({
  twoFactorEnabled = false,
  sessions = [],
  securityHistory = [],
  onPasswordChange,
  onEnable2FA,
  onDisable2FA,
  onRevokeSession,
  onRevokeAllSessions,
  onGenerateBackupCodes,
  className,
}: SettingsSecurityProps) {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isRevoking, setIsRevoking] = useState<string | null>(null);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [backupCodesDialogOpen, setBackupCodesDialogOpen] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handlePasswordChange = async () => {
    setErrors({});

    if (!passwordData.current.trim()) {
      setErrors({ current: "Current password is required" });
      return;
    }

    if (!passwordData.new.trim()) {
      setErrors({ new: "New password is required" });
      return;
    }

    if (passwordData.new.length < 8) {
      setErrors({ new: "Password must be at least 8 characters" });
      return;
    }

    if (passwordData.new !== passwordData.confirm) {
      setErrors({ confirm: "Passwords do not match" });
      return;
    }

    setIsChangingPassword(true);
    try {
      await onPasswordChange?.(passwordData.current, passwordData.new);
      setPasswordData({ current: "", new: "", confirm: "" });
      setPasswordDialogOpen(false);
    } catch (error) {
      setErrors({
        _general:
          error instanceof Error ? error.message : "Failed to change password",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleGenerateBackupCodes = async () => {
    try {
      const codes = await onGenerateBackupCodes?.();
      if (codes) {
        setBackupCodes(codes);
        setBackupCodesDialogOpen(true);
      }
    } catch (error) {
      setErrors({
        backupCodes:
          error instanceof Error
            ? error.message
            : "Failed to generate backup codes",
      });
    }
  };

  const getEventIcon = (type: SecurityEvent["type"]) => {
    switch (type) {
      case "login":
        return Lock;
      case "password_change":
        return Key;
      case "2fa_enabled":
      case "2fa_disabled":
        return Shield;
      default:
        return Clock;
    }
  };

  const getStatusBadge = (status: SecurityEvent["status"]) => {
    switch (status) {
      case "success":
        return (
          <Badge className="text-xs" variant="default">
            Success
          </Badge>
        );
      case "failed":
        return (
          <Badge className="text-xs" variant="destructive">
            Failed
          </Badge>
        );
      case "suspicious":
        return (
          <Badge
            className="flex items-center gap-1 text-xs"
            variant="destructive"
          >
            <AlertTriangle className="size-3" />
            <span>Suspicious</span>
          </Badge>
        );
    }
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <CardTitle className="wrap-break-word">Security</CardTitle>
            <CardDescription className="wrap-break-word">
              Manage your account security and authentication
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {/* Password & 2FA */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Password Change */}
            <div className="flex flex-col gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  <Key className="size-4" />
                </div>
                <FieldLabel className="mb-0">Password</FieldLabel>
              </div>
              <Dialog
                onOpenChange={setPasswordDialogOpen}
                open={passwordDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="w-full" type="button" variant="outline">
                    Change Password
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                      Enter your current password and choose a new one
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-4">
                    {errors._general && (
                      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                        <p className="text-destructive text-sm">
                          {errors._general}
                        </p>
                      </div>
                    )}

                    <Field>
                      <FieldLabel htmlFor="current-password">
                        Current Password{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <FieldContent>
                        <InputGroup>
                          <InputGroupInput
                            id="current-password"
                            onChange={(e) =>
                              setPasswordData((prev) => ({
                                ...prev,
                                current: e.target.value,
                              }))
                            }
                            type="password"
                            value={passwordData.current}
                          />
                        </InputGroup>
                        {errors.current && (
                          <FieldError>{errors.current}</FieldError>
                        )}
                      </FieldContent>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="new-password">
                        New Password <span className="text-destructive">*</span>
                      </FieldLabel>
                      <FieldContent>
                        <InputGroup>
                          <InputGroupInput
                            id="new-password"
                            onChange={(e) =>
                              setPasswordData((prev) => ({
                                ...prev,
                                new: e.target.value,
                              }))
                            }
                            type="password"
                            value={passwordData.new}
                          />
                        </InputGroup>
                        {errors.new && <FieldError>{errors.new}</FieldError>}
                        <FieldDescription>
                          Must be at least 8 characters long
                        </FieldDescription>
                      </FieldContent>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="confirm-password">
                        Confirm Password{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <FieldContent>
                        <InputGroup>
                          <InputGroupInput
                            id="confirm-password"
                            onChange={(e) =>
                              setPasswordData((prev) => ({
                                ...prev,
                                confirm: e.target.value,
                              }))
                            }
                            type="password"
                            value={passwordData.confirm}
                          />
                        </InputGroup>
                        {errors.confirm && (
                          <FieldError>{errors.confirm}</FieldError>
                        )}
                      </FieldContent>
                    </Field>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => setPasswordDialogOpen(false)}
                      type="button"
                      variant="outline"
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={isChangingPassword}
                      onClick={handlePasswordChange}
                      type="button"
                    >
                      {isChangingPassword ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Changing…
                        </>
                      ) : (
                        "Change Password"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Two-Factor Authentication */}
            <div className="flex flex-col gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  <Shield className="size-4" />
                </div>
                <FieldLabel className="mb-0">
                  Two-Factor Authentication
                </FieldLabel>
              </div>
              <div className="flex flex-col gap-3">
                {twoFactorEnabled ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Badge
                        className="flex items-center gap-1 text-xs"
                        variant="default"
                      >
                        <Check className="size-3" />
                        <span>Enabled</span>
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        className="w-full"
                        onClick={handleGenerateBackupCodes}
                        type="button"
                        variant="outline"
                      >
                        View Backup Codes
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            className="w-full"
                            type="button"
                            variant="destructive"
                          >
                            Disable 2FA
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Disable Two-Factor Authentication?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will reduce the security of your account. You
                              can re-enable it anytime.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onDisable2FA}>
                              Disable 2FA
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </>
                ) : (
                  <Button
                    className="w-full"
                    onClick={onEnable2FA}
                    type="button"
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="size-4" />
                      <span>Enable 2FA</span>
                    </div>
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Active Sessions */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Monitor className="size-5 text-muted-foreground" />
                <h3 className="font-semibold text-base">Active Sessions</h3>
              </div>
              {sessions.length > 1 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-full sm:w-auto"
                      type="button"
                      variant="outline"
                    >
                      Revoke All
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Revoke All Sessions?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will sign you out from all devices except this one.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={onRevokeAllSessions}>
                        Revoke All
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>

            {sessions.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No active sessions
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {sessions.map((session) => (
                  <div
                    className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center"
                    key={session.id}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        {session.device.includes("Mobile") ? (
                          <Smartphone className="size-5" />
                        ) : (
                          <Monitor className="size-5" />
                        )}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-sm">
                            {session.device}
                          </span>
                          {session.current && (
                            <Badge className="text-xs" variant="default">
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3" />
                            {session.location}
                          </span>
                          <span>•</span>
                          <span>{session.ipAddress}</span>
                          <span>•</span>
                          <span>
                            Active {formatRelativeTime(session.lastActive)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {!session.current && (
                      <Button
                        className="w-full sm:w-auto"
                        disabled={isRevoking === session.id}
                        onClick={() => {
                          setIsRevoking(session.id);
                          onRevokeSession?.(session.id).finally(() =>
                            setIsRevoking(null)
                          );
                        }}
                        type="button"
                        variant="outline"
                      >
                        {isRevoking === session.id ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            Revoking…
                          </>
                        ) : (
                          <>
                            <Trash2 className="size-4" />
                            Revoke
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Security History */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-muted-foreground" />
              <h3 className="font-semibold text-base">Security History</h3>
            </div>

            {securityHistory.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No security events
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {securityHistory.map((event) => {
                  const Icon = getEventIcon(event.type);
                  return (
                    <div
                      className="flex items-start gap-3 rounded-lg border p-4"
                      key={event.id}
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Icon className="size-4" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-sm">
                            {event.description}
                          </span>
                          {getStatusBadge(event.status)}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3" />
                            {event.location}
                          </span>
                          <span>•</span>
                          <span>{event.ipAddress}</span>
                          <span>•</span>
                          <span>{formatDate(event.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* Backup Codes Dialog */}
      <Dialog
        onOpenChange={setBackupCodesDialogOpen}
        open={backupCodesDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Backup Codes</DialogTitle>
            <DialogDescription>
              Save these codes in a safe place. You can use them to access your
              account if you lose access to your authenticator app.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2 rounded-lg border bg-muted/30 p-4">
              {backupCodes.map((code, index) => (
                <code className="font-medium font-mono text-sm" key={index}>
                  {showBackupCodes ? code : "•".repeat(8)}
                </code>
              ))}
            </div>
            <Button
              onClick={() => setShowBackupCodes(!showBackupCodes)}
              type="button"
              variant="outline"
            >
              {showBackupCodes ? (
                <div className="flex items-center gap-2">
                  <EyeOff className="size-4" />
                  <span>Hide Codes</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Eye className="size-4" />
                  <span>Show Codes</span>
                </div>
              )}
            </Button>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setBackupCodesDialogOpen(false)}
              type="button"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

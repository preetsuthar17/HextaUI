"use client";

import {
  AlertTriangle,
  Globe,
  Loader2,
  LogOut,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import { useCallback, useState } from "react";
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
import { Separator } from "@/registry/new-york/ui/separator";

export type DeviceType = "desktop" | "mobile" | "tablet" | "unknown";

export interface Session {
  id: string;
  deviceName: string;
  deviceType: DeviceType;
  browser?: string;
  os?: string;
  ipAddress?: string;
  location?: string;
  lastActive: Date;
  isCurrent: boolean;
}

export interface AuthSessionManagerProps {
  sessions?: Session[];
  onRevoke?: (sessionId: string) => void;
  onRevokeAll?: () => void;
  className?: string;
  isLoading?: boolean;
  errors?: {
    general?: string;
  };
}

const DEVICE_ICONS: Record<
  DeviceType,
  React.ComponentType<{ className?: string }>
> = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
  unknown: Globe,
};

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

function formatLastActive(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
}

interface ErrorAlertProps {
  message: string;
}

function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div
      aria-live="polite"
      className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-destructive text-sm"
      role="alert"
    >
      <AlertTriangle aria-hidden="true" className="size-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

interface EmptyStateProps {
  message?: string;
}

function EmptyState({ message = "No active sessions found" }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
}

interface RevokeSessionDialogProps {
  deviceName: string;
  isLoading: boolean;
  onRevoke: (sessionId: string) => void;
  sessionId: string;
}

function RevokeSessionDialog({
  deviceName,
  isLoading,
  onRevoke,
  sessionId,
}: RevokeSessionDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          aria-label={`Revoke session on ${deviceName}`}
          className="min-h-[32px] min-w-[32px] touch-manipulation"
          disabled={isLoading}
          size="icon"
          type="button"
          variant="ghost"
        >
          <LogOut aria-hidden="true" className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke session?</AlertDialogTitle>
          <AlertDialogDescription>
            This will sign out the session on {deviceName}. The user will need
            to sign in again to access their account from this device.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => onRevoke(sessionId)}
          >
            Revoke session
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface SessionItemProps {
  isLoading: boolean;
  onRevoke?: (sessionId: string) => void;
  session: Session;
}

function SessionItem({ session, onRevoke, isLoading }: SessionItemProps) {
  const DeviceIcon = DEVICE_ICONS[session.deviceType] || DEVICE_ICONS.unknown;

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-start sm:gap-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <DeviceIcon
          aria-hidden="true"
          className="size-5 text-muted-foreground"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-medium text-sm">{session.deviceName}</h4>
          {session.isCurrent && (
            <Badge className="text-xs" variant="secondary">
              Current session
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
          {session.browser && (
            <>
              <span>{session.browser}</span>
              {session.os && <span aria-hidden="true">•</span>}
            </>
          )}
          {session.os && <span>{session.os}</span>}
          {(session.browser || session.os) && session.location && (
            <span aria-hidden="true">•</span>
          )}
          {session.location && <span>{session.location}</span>}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
          <span>Last active: {formatLastActive(session.lastActive)}</span>
          {session.ipAddress && (
            <>
              <span aria-hidden="true">•</span>
              <span>IP: {session.ipAddress}</span>
            </>
          )}
        </div>
      </div>
      {!session.isCurrent && onRevoke && (
        <RevokeSessionDialog
          deviceName={session.deviceName}
          isLoading={isLoading}
          onRevoke={onRevoke}
          sessionId={session.id}
        />
      )}
    </div>
  );
}

interface RevokeAllDialogProps {
  isLoading: boolean;
  onRevokeAll: () => void;
  revokingAll: boolean;
}

function RevokeAllDialog({
  isLoading,
  onRevokeAll,
  revokingAll,
}: RevokeAllDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          aria-label="Revoke all other sessions"
          className="min-h-[44px] w-full touch-manipulation sm:w-auto"
          disabled={isLoading || revokingAll}
          type="button"
          variant="outline"
        >
          {revokingAll ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Revoking…
            </>
          ) : (
            <>
              <LogOut aria-hidden="true" className="size-4" />
              Revoke all
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke all other sessions?</AlertDialogTitle>
          <AlertDialogDescription>
            This will sign out all other devices except this one. You will
            remain signed in on this device, but all other active sessions will
            be terminated.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={onRevokeAll}
          >
            Revoke all sessions
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface CurrentSessionSectionProps {
  isLoading: boolean;
  onRevoke?: (sessionId: string) => void;
  session: Session;
}

function CurrentSessionSection({
  session,
  onRevoke,
  isLoading,
}: CurrentSessionSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium text-sm">Current session</h3>
      <SessionItem
        isLoading={isLoading}
        onRevoke={onRevoke}
        session={session}
      />
    </div>
  );
}

interface OtherSessionsSectionProps {
  isLoading: boolean;
  onRevoke?: (sessionId: string) => void;
  sessions: Session[];
}

function OtherSessionsSection({
  sessions,
  onRevoke,
  isLoading,
}: OtherSessionsSectionProps) {
  if (sessions.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium text-sm">
        Other active sessions ({sessions.length})
      </h3>
      <div className="flex flex-col gap-3">
        {sessions.map((session) => (
          <SessionItem
            isLoading={isLoading}
            key={session.id}
            onRevoke={onRevoke}
            session={session}
          />
        ))}
      </div>
    </div>
  );
}

export default function AuthSessionManager({
  sessions = [],
  onRevoke,
  onRevokeAll,
  className,
  isLoading = false,
  errors,
}: AuthSessionManagerProps) {
  const [revokingAll, setRevokingAll] = useState(false);

  const handleRevokeAll = useCallback(async () => {
    setRevokingAll(true);
    try {
      await onRevokeAll?.();
    } finally {
      setRevokingAll(false);
    }
  }, [onRevokeAll]);

  const otherSessions = sessions.filter((s) => !s.isCurrent);
  const currentSession = sessions.find((s) => s.isCurrent);

  return (
    <Card className={cn("w-full max-w-sm shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Active sessions</CardTitle>
            <CardDescription>
              Manage devices that are signed in to your account
            </CardDescription>
          </div>
          {otherSessions.length > 0 && onRevokeAll && (
            <RevokeAllDialog
              isLoading={isLoading}
              onRevokeAll={handleRevokeAll}
              revokingAll={revokingAll}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {errors?.general && <ErrorAlert message={errors.general} />}

          {sessions.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-4">
              {currentSession && (
                <>
                  <CurrentSessionSection
                    isLoading={isLoading}
                    onRevoke={onRevoke}
                    session={currentSession}
                  />
                  {otherSessions.length > 0 && <Separator />}
                </>
              )}

              <OtherSessionsSection
                isLoading={isLoading}
                onRevoke={onRevoke}
                sessions={otherSessions}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

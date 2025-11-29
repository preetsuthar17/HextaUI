"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Download,
  Eye,
  EyeOff,
  Loader2,
  RefreshCw,
  Shield,
} from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/new-york/ui/alert";
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

export interface AuthRecoveryCodesProps {
  codes?: string[];
  onGenerate?: () => void;
  onRegenerate?: () => void;
  className?: string;
  isLoading?: boolean;
  errors?: {
    general?: string;
  };
}

function downloadCodes(codes: string[]): void {
  if (codes.length === 0) return;
  const content = codes.join("\n");
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "recovery-codes.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

interface ErrorAlertProps {
  message: string;
}

function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div
      aria-live="polite"
      className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-destructive text-sm"
      role="alert"
    >
      {message}
    </div>
  );
}

interface EmptyStateProps {
  className?: string;
}

function EmptyState({ className }: EmptyStateProps) {
  return (
    <Card className={cn("w-full max-w-sm shadow-xs", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield aria-hidden="true" className="size-5" />
          Recovery codes
        </CardTitle>
        <CardDescription>
          Backup codes for two-factor authentication
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-muted-foreground text-sm">
            No recovery codes available. Generate codes to get started.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

interface EmptyStateWithGenerateProps {
  isLoading: boolean;
  onGenerate?: () => void;
}

function EmptyStateWithGenerate({
  isLoading,
  onGenerate,
}: EmptyStateWithGenerateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-muted/50 p-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Shield aria-hidden="true" className="size-6 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium text-sm">No recovery codes generated</p>
        <p className="text-muted-foreground text-xs">
          Generate recovery codes to use as a backup for two-factor
          authentication
        </p>
      </div>
      {onGenerate && (
        <Button
          aria-busy={isLoading}
          className="min-h-[44px] touch-manipulation"
          data-loading={isLoading}
          disabled={isLoading}
          onClick={onGenerate}
          type="button"
        >
          {isLoading ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <RefreshCw aria-hidden="true" className="size-4" />
              Generate recovery codes
            </>
          )}
        </Button>
      )}
    </div>
  );
}

interface RecoveryCodeItemProps {
  code: string;
  copied: boolean;
  index: number;
  onCopy: (code: string, index: number) => void;
  showCode: boolean;
}

function RecoveryCodeItem({
  code,
  copied,
  index,
  onCopy,
  showCode,
}: RecoveryCodeItemProps) {
  if (showCode) {
    return (
      <div className="flex items-center justify-between gap-2 rounded-md border bg-muted/50 pl-2 py-0.5  font-mono text-sm">
        <span className="flex-1">{code}</span>
        <Button
          aria-label={`Copy recovery code ${index + 1}`}
          className="min-h-[10px] min-w-[10px] touch-manipulation"
          onClick={() => onCopy(code, index)}
          size="icon-sm"
          type="button"
          variant="ghost"
        >
          {copied ? (
            <CheckCircle2
              aria-hidden="true"
              className="size-3.5 text-primary"
            />
          ) : (
            <Copy aria-hidden="true" className="size-3.5" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-md border bg-muted/50 p-2">
      <span className="font-mono text-sm">
        {Array.from({ length: 8 })
          .map(() => "•")
          .join("")}
      </span>
      <Copy aria-hidden="true" className="size-3.5 text-muted-foreground" />
    </div>
  );
}

interface RecoveryCodesListProps {
  codes: string[];
  copiedIndex: number | null;
  onCopyCode: (code: string, index: number) => void;
  showCodes: boolean;
}

function RecoveryCodesList({
  codes,
  copiedIndex,
  onCopyCode,
  showCodes,
}: RecoveryCodesListProps) {
  return (
    <div className="grid grid-cols-1 gap-2 rounded-lg border bg-background p-4 sm:grid-cols-2">
      {codes.map((code, index) => (
        <RecoveryCodeItem
          code={code}
          copied={copiedIndex === index}
          index={index}
          key={index}
          onCopy={onCopyCode}
          showCode={showCodes}
        />
      ))}
    </div>
  );
}

interface RecoveryCodesActionsProps {
  codes: string[];
  isRegenerating: boolean;
  onCopyAll: () => void;
  onDownload: () => void;
  onRegenerate?: () => void;
}

function RecoveryCodesActions({
  codes,
  isRegenerating,
  onCopyAll,
  onDownload,
  onRegenerate,
}: RecoveryCodesActionsProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      <Button
        className="min-h-[44px] w-full touch-manipulation sm:w-auto"
        onClick={onCopyAll}
        type="button"
        variant="outline"
      >
        <Copy aria-hidden="true" className="size-4" />
        Copy all codes
      </Button>
      <Button
        className="min-h-[44px] w-full touch-manipulation sm:w-auto"
        onClick={onDownload}
        type="button"
        variant="outline"
      >
        <Download aria-hidden="true" className="size-4" />
        Download codes
      </Button>
      {onRegenerate && (
        <RegenerateDialog
          isRegenerating={isRegenerating}
          onRegenerate={onRegenerate}
        />
      )}
    </div>
  );
}

interface RegenerateDialogProps {
  isRegenerating: boolean;
  onRegenerate: () => void;
}

function RegenerateDialog({
  isRegenerating,
  onRegenerate,
}: RegenerateDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          aria-busy={isRegenerating}
          className="min-h-[44px] w-full touch-manipulation sm:w-auto"
          data-loading={isRegenerating}
          disabled={isRegenerating}
          type="button"
          variant="outline"
        >
          {isRegenerating ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Regenerating…
            </>
          ) : (
            <>
              <RefreshCw aria-hidden="true" className="size-4" />
              Regenerate codes
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Regenerate recovery codes?</AlertDialogTitle>
          <AlertDialogDescription>
            This will invalidate all existing recovery codes and generate new
            ones. Make sure to save the new codes in a secure location. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={onRegenerate}
          >
            Regenerate codes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function AuthRecoveryCodes({
  codes = [],
  onGenerate,
  onRegenerate,
  className,
  isLoading = false,
  errors,
}: AuthRecoveryCodesProps) {
  const [showCodes, setShowCodes] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleCopyCode = useCallback(async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {}
  }, []);

  const handleCopyAll = useCallback(async () => {
    if (codes.length === 0) return;
    try {
      await navigator.clipboard.writeText(codes.join("\n"));
    } catch {}
  }, [codes]);

  const handleDownload = useCallback(() => {
    downloadCodes(codes);
  }, [codes]);

  const handleRegenerate = useCallback(async () => {
    setIsRegenerating(true);
    try {
      await onRegenerate?.();
      setShowCodes(true);
    } finally {
      setIsRegenerating(false);
    }
  }, [onRegenerate]);

  const handleToggleShowCodes = useCallback(() => {
    setShowCodes((prev) => !prev);
  }, []);

  const generalError = errors?.general;

  if (codes.length === 0 && !onGenerate) {
    return <EmptyState className={className} />;
  }

  return (
    <Card className={cn("w-full max-w-sm shadow-xs", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle className="flex items-center gap-2">
              <Shield aria-hidden="true" className="size-5" />
              Recovery codes
            </CardTitle>
            <CardDescription>
              Save these codes in a safe place. You can use them to access your
              account if you lose your authenticator device.
            </CardDescription>
          </div>
          {codes.length === 0 && onGenerate && (
            <Button
              aria-busy={isLoading}
              className="min-h-[44px] touch-manipulation"
              data-loading={isLoading}
              disabled={isLoading}
              onClick={onGenerate}
              type="button"
            >
              {isLoading ? (
                <>
                  <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <RefreshCw aria-hidden="true" className="size-4" />
                  Generate codes
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {generalError && <ErrorAlert message={generalError} />}

          {codes.length > 0 ? (
            <>
              <Alert variant="destructive">
                <AlertTriangle aria-hidden="true" />
                <AlertTitle>Save your recovery codes</AlertTitle>
                <AlertDescription>
                  Keep these codes somewhere safe. Each code works only once.
                </AlertDescription>
              </Alert>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-medium text-sm">Your recovery codes</h3>
                  <Button
                    className="min-h-[44px] w-full touch-manipulation sm:w-auto flex items-center"
                    onClick={handleToggleShowCodes}
                    type="button"
                    variant="ghost"
                  >
                    {showCodes ? (
                      <>
                        <EyeOff aria-hidden="true" className="size-4" />
                        Hide codes
                      </>
                    ) : (
                      <>
                        <Eye aria-hidden="true" className="size-4" />
                        Show codes
                      </>
                    )}
                  </Button>
                </div>

                <RecoveryCodesList
                  codes={codes}
                  copiedIndex={copiedIndex}
                  onCopyCode={handleCopyCode}
                  showCodes={showCodes}
                />

                <RecoveryCodesActions
                  codes={codes}
                  isRegenerating={isRegenerating}
                  onCopyAll={handleCopyAll}
                  onDownload={handleDownload}
                  onRegenerate={onRegenerate ? handleRegenerate : undefined}
                />
              </div>
            </>
          ) : (
            <EmptyStateWithGenerate
              isLoading={isLoading}
              onGenerate={onGenerate}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { AlertTriangle, Loader2, RefreshCw, X } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/new-york/ui/alert";
import { Button } from "@/registry/new-york/ui/button";

export interface AIErrorHandlerProps {
  error?: string | Error | null;
  title?: string;
  onRetry?: () => Promise<void> | void;
  onDismiss?: () => void;
  className?: string;
}

function getErrorMessage(error: string | Error | null | undefined): string {
  if (!error) return "";
  if (typeof error === "string") return error;
  return error.message || "An error occurred";
}

export default function AIErrorHandler({
  error,
  title = "An Error Occurred",
  onRetry,
  onDismiss,
  className,
}: AIErrorHandlerProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const message = getErrorMessage(error);

  const handleRetry = useCallback(async () => {
    if (!onRetry) return;

    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  }, [onRetry]);

  if (!(error && message)) return null;

  return (
    <Alert
      className={cn("w-full", className)}
      live="assertive"
      variant="destructive"
    >
      <AlertTriangle aria-hidden="true" className="size-4" />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <AlertTitle className="wrap-break-word font-medium text-base">
              {title}
            </AlertTitle>
            <AlertDescription className="wrap-break-word">
              {message}
            </AlertDescription>
          </div>
          {onDismiss && (
            <Button
              aria-label="Dismiss error"
              className="min-h-[32px] min-w-[32px] shrink-0 touch-manipulation"
              onClick={onDismiss}
              size="icon-sm"
              type="button"
              variant="ghost"
            >
              <X aria-hidden="true" className="size-4" />
            </Button>
          )}
        </div>

        {onRetry && (
          <Button
            aria-busy={isRetrying}
            className="ml-auto min-h-[32px] w-fit touch-manipulation sm:ml-0"
            data-loading={isRetrying}
            disabled={isRetrying}
            onClick={handleRetry}
            type="button"
            variant={"secondary"}
          >
            {isRetrying ? (
              <>
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                <span>Retrying…</span>
              </>
            ) : (
              <>
                <RefreshCw aria-hidden="true" className="size-4" />
                <span>Retry</span>
              </>
            )}
          </Button>
        )}
      </div>
    </Alert>
  );
}

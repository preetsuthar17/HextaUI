"use client";

import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Loader2,
  Mail,
  RefreshCw,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/new-york/ui/alert";
import { Badge } from "@/registry/new-york/ui/badge";
import { Button } from "@/registry/new-york/ui/button";
import { Separator } from "@/registry/new-york/ui/separator";

export interface AIError {
  id: string;
  type:
    | "rate_limit"
    | "network"
    | "api_error"
    | "authentication"
    | "quota_exceeded"
    | "invalid_request"
    | "server_error"
    | "timeout"
    | "unknown";
  message: string;
  details?: string;
  errorCode?: string;
  timestamp: Date;
  retryable?: boolean;
  retryCount?: number;
  maxRetries?: number;
  retryAfter?: Date;
  suggestedActions?: string[];
}

export interface AIErrorHandlerProps {
  error?: AIError | null;
  onRetry?: () => Promise<void>;
  onDismiss?: () => void;
  onContactSupport?: () => void;
  className?: string;
  showDetails?: boolean;
  autoRetry?: boolean;
  autoRetryDelay?: number;
}

function getErrorConfig(type: AIError["type"]) {
  switch (type) {
    case "rate_limit":
      return {
        title: "Rate Limit Exceeded",
        icon: AlertTriangle,
        variant: "destructive" as const,
        suggestedActions: [
          "Wait a few moments before trying again",
          "Reduce the frequency of your requests",
          "Upgrade your plan for higher rate limits",
        ],
      };
    case "network":
      return {
        title: "Network Error",
        icon: AlertTriangle,
        variant: "destructive" as const,
        suggestedActions: [
          "Check your internet connection",
          "Try again in a moment",
          "Verify your network settings",
        ],
      };
    case "api_error":
      return {
        title: "API Error",
        icon: AlertTriangle,
        variant: "destructive" as const,
        suggestedActions: [
          "Try again in a moment",
          "Check if the service is available",
          "Contact support if the issue persists",
        ],
      };
    case "authentication":
      return {
        title: "Authentication Error",
        icon: AlertTriangle,
        variant: "destructive" as const,
        suggestedActions: [
          "Check your API key",
          "Verify your authentication credentials",
          "Re-authenticate if needed",
        ],
      };
    case "quota_exceeded":
      return {
        title: "Quota Exceeded",
        icon: AlertTriangle,
        variant: "destructive" as const,
        suggestedActions: [
          "Upgrade your plan for more quota",
          "Wait until your quota resets",
          "Contact support for assistance",
        ],
      };
    case "invalid_request":
      return {
        title: "Invalid Request",
        icon: AlertTriangle,
        variant: "destructive" as const,
        suggestedActions: [
          "Check your input parameters",
          "Verify the request format",
          "Review the API documentation",
        ],
      };
    case "server_error":
      return {
        title: "Server Error",
        icon: AlertTriangle,
        variant: "destructive" as const,
        suggestedActions: [
          "Try again in a moment",
          "The issue may be temporary",
          "Contact support if it persists",
        ],
      };
    case "timeout":
      return {
        title: "Request Timeout",
        icon: AlertTriangle,
        variant: "destructive" as const,
        suggestedActions: [
          "Try again with a shorter request",
          "Check your network connection",
          "Reduce the complexity of your query",
        ],
      };
    case "unknown":
    default:
      return {
        title: "An Error Occurred",
        icon: AlertTriangle,
        variant: "destructive" as const,
        suggestedActions: [
          "Try again in a moment",
          "Contact support if the issue persists",
        ],
      };
  }
}

function formatTimeUntil(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  if (diff <= 0) return "now";

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) return `${hours} hour${hours !== 1 ? "s" : ""}`;
  if (minutes > 0) return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  return `${seconds} second${seconds !== 1 ? "s" : ""}`;
}

export default function AIErrorHandler({
  error,
  onRetry,
  onDismiss,
  onContactSupport,
  className,
  showDetails = true,
  autoRetry = false,
  autoRetryDelay = 5000,
}: AIErrorHandlerProps) {
  const [isRetrying, setIsRetrying] = useState(false);
  const [showErrorDetails, setShowErrorDetails] = useState(false);

  if (!error) return null;

  const errorConfig = getErrorConfig(error.type);
  const ErrorIcon = errorConfig.icon;
  const canRetry = error.retryable !== false && onRetry;
  const retryAfterText = error.retryAfter
    ? formatTimeUntil(error.retryAfter)
    : null;

  const handleRetry = async () => {
    if (!onRetry) return;

    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <Alert
      className={cn("w-full", className)}
      live="assertive"
      variant={errorConfig.variant}
    >
      <ErrorIcon className="size-4" />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <AlertTitle className="wrap-break-word">
              {errorConfig.title}
            </AlertTitle>
            <AlertDescription className="wrap-break-word">
              {error.message}
            </AlertDescription>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {error.errorCode && (
              <Badge className="shrink-0 text-xs" variant="secondary">
                {error.errorCode}
              </Badge>
            )}
            {onDismiss && (
              <Button
                aria-label="Dismiss error"
                onClick={onDismiss}
                size="icon"
                type="button"
                variant="ghost"
              >
                <X className="size-4" />
              </Button>
            )}
          </div>
        </div>

        {showDetails &&
          (error.details ||
            error.errorCode ||
            error.suggestedActions ||
            errorConfig.suggestedActions) && (
            <>
              <Separator />
              <div className="flex flex-col gap-3">
                <button
                  aria-expanded={showErrorDetails}
                  className="flex items-center justify-between text-muted-foreground text-sm hover:text-foreground"
                  onClick={() => setShowErrorDetails(!showErrorDetails)}
                  type="button"
                >
                  <span>Error Details</span>
                  {showErrorDetails ? (
                    <ChevronUp className="size-4" />
                  ) : (
                    <ChevronDown className="size-4" />
                  )}
                </button>

                {showErrorDetails && (
                  <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-3">
                    {error.details && (
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-muted-foreground text-xs">
                          Details
                        </span>
                        <p className="wrap-break-word text-sm">
                          {error.details}
                        </p>
                      </div>
                    )}

                    {error.errorCode && (
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-muted-foreground text-xs">
                          Error Code
                        </span>
                        <code className="rounded bg-background px-2 py-1 text-xs">
                          {error.errorCode}
                        </code>
                      </div>
                    )}

                    {(error.suggestedActions ||
                      errorConfig.suggestedActions) && (
                      <div className="flex flex-col gap-2">
                        <span className="font-medium text-muted-foreground text-xs">
                          Suggested Actions
                        </span>
                        <ul className="flex flex-col gap-1.5 pl-4">
                          {(
                            error.suggestedActions ||
                            errorConfig.suggestedActions
                          )?.map((action, idx) => (
                            <li
                              className="before:-ml-4 text-muted-foreground text-sm before:absolute before:content-['•']"
                              key={idx}
                            >
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {error.retryCount !== undefined &&
                      error.maxRetries !== undefined && (
                        <div className="flex flex-col gap-1">
                          <span className="font-medium text-muted-foreground text-xs">
                            Retry Attempts
                          </span>
                          <p className="text-sm">
                            {error.retryCount} / {error.maxRetries}
                          </p>
                        </div>
                      )}

                    {error.retryAfter && (
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-muted-foreground text-xs">
                          Retry Available
                        </span>
                        <p className="text-sm">In {retryAfterText}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

        <Separator />

        <div className="flex flex-col gap-2 sm:flex-row">
          {canRetry && (
            <Button
              aria-busy={isRetrying}
              className="w-full sm:w-auto"
              data-loading={isRetrying}
              disabled={
                isRetrying ||
                (error.retryAfter && error.retryAfter > new Date())
              }
              onClick={handleRetry}
              type="button"
            >
              {isRetrying ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Retrying…
                </>
              ) : (
                <>
                  <RefreshCw className="size-4" />
                  Retry
                </>
              )}
            </Button>
          )}
          {onContactSupport && (
            <Button
              className="w-full sm:w-auto"
              onClick={onContactSupport}
              type="button"
              variant="outline"
            >
              <Mail className="size-4" />
              Contact Support
            </Button>
          )}
        </div>
      </div>
    </Alert>
  );
}

"use client";

import {
  CheckCircle2,
  ExternalLink,
  Github,
  Loader2,
  Unlink,
  XCircle,
} from "lucide-react";
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

export type SocialProvider =
  | "google"
  | "github"
  | "apple"
  | "microsoft"
  | "twitter";

export interface SocialAccount {
  provider: SocialProvider;
  email?: string;
  name?: string;
  isConnected: boolean;
  isVerified?: boolean;
  isPrimary?: boolean;
  connectedAt?: Date;
}

function formatConnectedDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

export interface AuthSocialAccountsProps {
  accounts?: SocialAccount[];
  onConnect?: (provider: SocialProvider) => void;
  onDisconnect?: (provider: SocialProvider) => void;
  onSetPrimary?: (provider: SocialProvider) => void;
  className?: string;
  isLoading?: boolean;
  errors?: {
    general?: string;
  };
}

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1-1.265.06a6 6 0 1 0 2.103 6.836l.001-.004h-3.66a1 1 0 0 1-.992-.883L13 13v-2a1 1 0 0 1 1-1h6.945a1 1 0 0 1 .994.89q.06.55.061 1.11c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2"
      fill="currentColor"
    />
  </svg>
);

const PROVIDER_CONFIG: Record<
  SocialProvider,
  {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }
> = {
  google: {
    name: "Google",
    icon: GoogleIcon,
    color: "text-blue-600",
  },
  github: {
    name: "GitHub",
    icon: Github,
    color: "text-foreground",
  },
  apple: {
    name: "Apple",
    icon: ({ className }: { className?: string }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.08-1.85 3.8-3.74 4.25z"
          fill="currentColor"
        />
      </svg>
    ),
    color: "text-foreground",
  },
  microsoft: {
    name: "Microsoft",
    icon: ({ className }: { className?: string }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1h10v10H1z" fill="#f25022" />
        <path d="M13 1h10v10H13z" fill="#00a4ef" />
        <path d="M1 13h10v10H1z" fill="#7fba00" />
        <path d="M13 13h10v10H13z" fill="#ffb900" />
      </svg>
    ),
    color: "text-foreground",
  },
  twitter: {
    name: "Twitter",
    icon: ({ className }: { className?: string }) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          fill="currentColor"
        />
      </svg>
    ),
    color: "text-blue-500",
  },
};

function SocialAccountItem({
  account,
  onConnect,
  onDisconnect,
  onSetPrimary,
  isLoading,
}: {
  account: SocialAccount;
  onConnect?: (provider: SocialProvider) => void;
  onDisconnect?: (provider: SocialProvider) => void;
  onSetPrimary?: (provider: SocialProvider) => void;
  isLoading?: boolean;
}) {
  const config = PROVIDER_CONFIG[account.provider];
  const Icon = config.icon;

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            account.isConnected ? "bg-muted" : "bg-muted/50"
          )}
        >
          <Icon className={cn("size-5", config.color)} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-medium text-sm">{config.name}</h4>
            {account.isPrimary && (
              <Badge className="text-xs" variant="secondary">
                Primary
              </Badge>
            )}
            {account.isVerified && account.isConnected && (
              <CheckCircle2 className="size-3.5 text-primary" />
            )}
            {account.isConnected && !account.isVerified && (
              <XCircle className="size-3.5 text-yellow-500" />
            )}
          </div>
          {account.email && (
            <p className="text-muted-foreground text-xs">{account.email}</p>
          )}
          {account.connectedAt && (
            <p className="text-muted-foreground text-xs">
              Connected {formatConnectedDate(account.connectedAt)}
            </p>
          )}
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
        {account.isConnected ? (
          <>
            {!account.isPrimary && onSetPrimary && (
              <Button
                aria-label={`Set ${config.name} as primary`}
                className="w-full sm:w-auto"
                disabled={isLoading}
                onClick={() => onSetPrimary(account.provider)}
                type="button"
                variant="outline"
              >
                Set primary
              </Button>
            )}
            {onDisconnect && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    aria-label={`Disconnect ${config.name}`}
                    disabled={isLoading}
                    size="icon"
                    type="button"
                    variant="ghost"
                  >
                    <Unlink className="size-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Disconnect {config.name}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will disconnect your {config.name} account.
                      You&apos;ll need to reconnect it to use it for sign-in
                      again.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={() => onDisconnect(account.provider)}
                    >
                      Disconnect
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </>
        ) : (
          onConnect && (
            <Button
              aria-label={`Connect ${config.name}`}
              className="w-full sm:w-auto"
              disabled={isLoading}
              onClick={() => onConnect(account.provider)}
              type="button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Connecting…
                </>
              ) : (
                <>
                  <ExternalLink className="size-4" />
                  Connect
                </>
              )}
            </Button>
          )
        )}
      </div>
    </div>
  );
}

export default function AuthSocialAccounts({
  accounts = [],
  onConnect,
  onDisconnect,
  onSetPrimary,
  className,
  isLoading = false,
  errors,
}: AuthSocialAccountsProps) {
  // Default accounts if none provided
  const defaultAccounts: SocialAccount[] = [
    { provider: "google", isConnected: false },
    { provider: "github", isConnected: false },
    { provider: "apple", isConnected: false },
    { provider: "microsoft", isConnected: false },
  ];

  const displayAccounts =
    accounts.length > 0
      ? accounts
      : defaultAccounts.filter(
          (acc) => !accounts.some((a) => a.provider === acc.provider)
        );

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <CardTitle>Connected accounts</CardTitle>
        <CardDescription>
          Manage your social account connections for sign-in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {errors?.general && (
            <div
              aria-live="polite"
              className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-destructive text-sm"
              role="alert"
            >
              {errors.general}
            </div>
          )}

          {displayAccounts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground text-sm">
                No social accounts available
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {displayAccounts.map((account) => (
                <SocialAccountItem
                  account={account}
                  isLoading={isLoading}
                  key={account.provider}
                  onConnect={onConnect}
                  onDisconnect={onDisconnect}
                  onSetPrimary={onSetPrimary}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

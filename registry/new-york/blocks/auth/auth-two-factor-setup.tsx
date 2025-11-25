"use client";

import {
  CheckCircle2,
  Copy,
  Download,
  Eye,
  EyeOff,
  Loader2,
  QrCode,
  RefreshCw,
  Shield,
  ShieldCheck,
  ShieldOff,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/new-york/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/new-york/ui/input-group";
import { Separator } from "@/registry/new-york/ui/separator";
import { Switch } from "@/registry/new-york/ui/switch";

export interface AuthTwoFactorSetupProps {
  isEnabled?: boolean;
  qrCodeUrl?: string;
  secretKey?: string;
  backupCodes?: string[];
  onEnable?: () => void;
  onDisable?: (password: string) => void;
  onGenerateBackupCodes?: () => void;
  onRegenerateSecret?: () => void;
  className?: string;
  isLoading?: boolean;
  errors?: {
    password?: string;
    general?: string;
  };
}

export default function AuthTwoFactorSetup({
  isEnabled = false,
  qrCodeUrl,
  secretKey,
  backupCodes = [],
  onEnable,
  onDisable,
  onGenerateBackupCodes,
  onRegenerateSecret,
  className,
  isLoading = false,
  errors,
}: AuthTwoFactorSetupProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCode = useCallback(async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {}
  }, []);

  const handleCopySecret = useCallback(async () => {
    if (secretKey) {
      try {
        await navigator.clipboard.writeText(secretKey);
      } catch {}
    }
  }, [secretKey]);

  const handleDisable = useCallback(() => {
    if (!password.trim()) return;
    onDisable?.(password);
    setPassword("");
  }, [password, onDisable]);

  const handleDownloadBackupCodes = useCallback(() => {
    if (backupCodes.length === 0) return;
    const content = backupCodes.join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "backup-codes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [backupCodes]);

  if (isEnabled) {
    return (
      <Card className={cn("w-full max-w-full shadow-xs", className)}>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <CardTitle className="flex flex-wrap items-center gap-2">
                <ShieldCheck className="size-5 shrink-0 text-primary" />
                <span className="wrap-break-word">
                  Two-factor authentication
                </span>
              </CardTitle>
              <CardDescription className="wrap-break-word">
                Your account is protected with 2FA
              </CardDescription>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="whitespace-nowrap text-muted-foreground text-sm">
                Enabled
              </span>
              <Switch checked={true} disabled />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {errors?.general && (
              <div
                aria-live="polite"
                className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-destructive text-sm"
                role="alert"
              >
                {errors.general}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="size-5 shrink-0 text-primary" />
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <p className="wrap-break-word font-medium text-sm">
                      2FA is active
                    </p>
                    <p className="wrap-break-word text-muted-foreground text-xs">
                      Your account is protected with two-factor authentication.
                      You&apos;ll need to enter a code from your authenticator
                      app when signing in.
                    </p>
                  </div>
                </div>
              </div>

              {backupCodes.length > 0 && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="wrap-break-word font-medium text-sm">
                        Backup codes
                      </h3>
                      <p className="wrap-break-word text-muted-foreground text-xs">
                        Save these codes in a safe place. You can use them to
                        access your account if you lose your device.
                      </p>
                    </div>
                    <Button
                      className="w-full sm:w-auto"
                      onClick={() => setShowBackupCodes(!showBackupCodes)}
                      type="button"
                      variant="outline"
                    >
                      {showBackupCodes ? "Hide" : "Show"} codes
                    </Button>
                  </div>
                  {showBackupCodes && (
                    <div className="grid grid-cols-1 gap-2 rounded-lg border bg-background p-4 sm:grid-cols-2">
                      {backupCodes.map((code, index) => (
                        <div
                          className="flex min-w-0 items-center justify-between gap-2 font-mono text-sm"
                          key={index}
                        >
                          <span className="min-w-0 break-all">{code}</span>
                          <Button
                            aria-label={`Copy backup code ${index + 1}`}
                            className="shrink-0"
                            onClick={() => handleCopyCode(code, index)}
                            size="icon-sm"
                            type="button"
                            variant="ghost"
                          >
                            {copiedIndex === index ? (
                              <CheckCircle2 className="size-3.5 text-primary" />
                            ) : (
                              <Copy className="size-3.5" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button
                      className="w-full sm:w-auto"
                      onClick={handleDownloadBackupCodes}
                      type="button"
                      variant="outline"
                    >
                      <Download className="size-4" />
                      Download codes
                    </Button>
                    {onGenerateBackupCodes && (
                      <Button
                        className="w-full sm:w-auto"
                        onClick={onGenerateBackupCodes}
                        type="button"
                        variant="outline"
                      >
                        <RefreshCw className="size-4" />
                        Regenerate codes
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <Separator />

              <div className="flex flex-col gap-4">
                <div className="min-w-0">
                  <h3 className="wrap-break-word font-medium text-destructive text-sm">
                    Disable two-factor authentication
                  </h3>
                  <p className="wrap-break-word text-muted-foreground text-xs">
                    You&apos;ll need to enter your password to disable 2FA.
                  </p>
                </div>
                <Field data-invalid={!!errors?.password}>
                  <FieldLabel htmlFor="disable-2fa-password">
                    Password
                    <span aria-label="required" className="text-destructive">
                      *
                    </span>
                  </FieldLabel>
                  <FieldContent>
                    <InputGroup aria-invalid={!!errors?.password}>
                      <InputGroupAddon>
                        <Shield className="size-4" />
                      </InputGroupAddon>
                      <InputGroupInput
                        aria-describedby={
                          errors?.password
                            ? "disable-2fa-password-error"
                            : undefined
                        }
                        aria-invalid={!!errors?.password}
                        autoComplete="current-password"
                        id="disable-2fa-password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        type={showPassword ? "text" : "password"}
                        value={password}
                      />
                      <InputGroupButton
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPassword((prev) => !prev);
                        }}
                        type="button"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </InputGroupButton>
                    </InputGroup>
                    {errors?.password && (
                      <FieldError id="disable-2fa-password-error">
                        {errors.password}
                      </FieldError>
                    )}
                  </FieldContent>
                </Field>
                <Button
                  aria-busy={isLoading}
                  className="w-full"
                  data-loading={isLoading}
                  disabled={isLoading || !password.trim()}
                  onClick={handleDisable}
                  type="button"
                  variant="destructive"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Disabling…
                    </>
                  ) : (
                    <>
                      <ShieldOff className="size-4" />
                      Disable 2FA
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full max-w-full shadow-xs", className)}>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <Shield className="size-5 shrink-0" />
          <span className="wrap-break-word">
            Set up two-factor authentication
          </span>
        </CardTitle>
        <CardDescription className="wrap-break-word">
          Add an extra layer of security to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {errors?.general && (
            <div
              aria-live="polite"
              className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-destructive text-sm"
              role="alert"
            >
              {errors.general}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="wrap-break-word text-muted-foreground text-sm">
                Scan the QR code with your authenticator app (like Google
                Authenticator, Authy, or 1Password) to set up two-factor
                authentication.
              </p>
            </div>

            {qrCodeUrl && (
              <div className="flex flex-col items-center gap-4 rounded-lg border bg-background p-4 sm:p-6">
                <div className="relative aspect-square w-full max-w-[192px] rounded-lg border bg-white p-3 sm:size-48 sm:p-4">
                  <Image
                    alt="QR code for two-factor authentication"
                    className="object-contain p-4"
                    fill
                    sizes="(max-width: 640px) 192px, 192px"
                    src={qrCodeUrl}
                  />
                </div>
                <p className="text-center text-muted-foreground text-xs">
                  Scan this QR code with your authenticator app
                </p>
              </div>
            )}

            {secretKey && (
              <Field>
                <FieldLabel>Manual entry key</FieldLabel>
                <FieldContent>
                  <InputGroup>
                    <InputGroupAddon>
                      <QrCode className="size-4" />
                    </InputGroupAddon>
                    <InputGroupInput readOnly type="text" value={secretKey} />
                    <InputGroupButton
                      aria-label="Copy secret key"
                      onClick={handleCopySecret}
                      type="button"
                    >
                      <Copy className="size-4" />
                    </InputGroupButton>
                  </InputGroup>
                  <FieldDescription>
                    If you can&apos;t scan the QR code, enter this key manually
                    in your authenticator app
                  </FieldDescription>
                </FieldContent>
              </Field>
            )}

            {onRegenerateSecret && (
              <Button
                className="w-full sm:w-auto"
                onClick={onRegenerateSecret}
                type="button"
                variant="outline"
              >
                <RefreshCw className="size-4" />
                Generate new QR code
              </Button>
            )}

            <Separator />

            <div className="flex flex-col gap-2">
              <Button
                aria-busy={isLoading}
                className="w-full"
                data-loading={isLoading}
                disabled={isLoading}
                onClick={onEnable}
                type="button"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Enabling 2FA…
                  </>
                ) : (
                  <>
                    <ShieldCheck className="size-4" />
                    Enable 2FA
                  </>
                )}
              </Button>
              <p className="text-center text-muted-foreground text-xs">
                After enabling, you&apos;ll need to verify with a code from your
                authenticator app
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

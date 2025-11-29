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

interface EnabledStateHeaderProps {
  className?: string;
}

function EnabledStateHeader({ className }: EnabledStateHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="min-w-0 flex-1">
        <CardTitle className="flex flex-wrap items-center gap-2">
          <ShieldCheck
            aria-hidden="true"
            className="size-5 shrink-0 text-primary"
          />
          <span className="wrap-break-word">Two-factor authentication</span>
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
  );
}

function ActiveStatusCard() {
  return (
    <div className="rounded-lg border bg-muted/50 p-4">
      <div className="flex items-start gap-3">
        <ShieldCheck
          aria-hidden="true"
          className="size-5 shrink-0 text-primary"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="wrap-break-word font-medium text-sm">2FA is active</p>
          <p className="wrap-break-word text-muted-foreground text-xs">
            Your account is protected with two-factor authentication.
            You&apos;ll need to enter a code from your authenticator app when
            signing in.
          </p>
        </div>
      </div>
    </div>
  );
}

interface BackupCodeItemProps {
  code: string;
  index: number;
  copiedIndex: number | null;
  onCopy: (code: string, index: number) => void;
}

function BackupCodeItem({
  code,
  index,
  copiedIndex,
  onCopy,
}: BackupCodeItemProps) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-2 font-mono text-sm">
      <span className="min-w-0 break-all">{code}</span>
      <Button
        aria-label={`Copy backup code ${index + 1}`}
        className="min-h-[32px] min-w-[32px] shrink-0 touch-manipulation"
        onClick={() => onCopy(code, index)}
        size="icon-sm"
        type="button"
        variant="ghost"
      >
        {copiedIndex === index ? (
          <CheckCircle2 aria-hidden="true" className="size-3.5 text-primary" />
        ) : (
          <Copy aria-hidden="true" className="size-3.5" />
        )}
      </Button>
    </div>
  );
}

interface BackupCodesListProps {
  codes: string[];
  copiedIndex: number | null;
  onCopy: (code: string, index: number) => void;
}

function BackupCodesList({ codes, copiedIndex, onCopy }: BackupCodesListProps) {
  return (
    <div className="grid grid-cols-1 gap-2 rounded-lg border bg-background p-4 sm:grid-cols-2">
      {codes.map((code, index) => (
        <BackupCodeItem
          code={code}
          copiedIndex={copiedIndex}
          index={index}
          key={index}
          onCopy={onCopy}
        />
      ))}
    </div>
  );
}

interface BackupCodesActionsProps {
  onDownload: () => void;
  onRegenerate?: () => void;
}

function BackupCodesActions({
  onDownload,
  onRegenerate,
}: BackupCodesActionsProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button
        className="min-h-[44px] w-full touch-manipulation sm:min-h-[32px] sm:w-auto"
        onClick={onDownload}
        type="button"
        variant="outline"
      >
        <Download aria-hidden="true" className="size-4" />
        Download codes
      </Button>
      {onRegenerate && (
        <Button
          className="min-h-[44px] w-full touch-manipulation sm:min-h-[32px] sm:w-auto"
          onClick={onRegenerate}
          type="button"
          variant="outline"
        >
          <RefreshCw aria-hidden="true" className="size-4" />
          Regenerate codes
        </Button>
      )}
    </div>
  );
}

interface BackupCodesSectionProps {
  codes: string[];
  showCodes: boolean;
  onToggleShow: () => void;
  copiedIndex: number | null;
  onCopy: (code: string, index: number) => void;
  onDownload: () => void;
  onRegenerate?: () => void;
}

function BackupCodesSection({
  codes,
  showCodes,
  onToggleShow,
  copiedIndex,
  onCopy,
  onDownload,
  onRegenerate,
}: BackupCodesSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="wrap-break-word font-medium text-sm">Backup codes</h3>
          <p className="wrap-break-word text-muted-foreground text-xs">
            Save these codes in a safe place. You can use them to access your
            account if you lose your device.
          </p>
        </div>
        <Button
          className="min-h-[44px] w-full touch-manipulation sm:min-h-[32px] sm:w-auto"
          onClick={onToggleShow}
          type="button"
          variant="outline"
        >
          {showCodes ? "Hide" : "Show"} codes
        </Button>
      </div>
      {showCodes && (
        <BackupCodesList
          codes={codes}
          copiedIndex={copiedIndex}
          onCopy={onCopy}
        />
      )}
      <BackupCodesActions onDownload={onDownload} onRegenerate={onRegenerate} />
    </div>
  );
}

interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  onToggleShow: () => void;
  error?: string;
}

function PasswordField({
  value,
  onChange,
  showPassword,
  onToggleShow,
  error,
}: PasswordFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor="disable-2fa-password">
        Password
        <span aria-label="required" className="text-destructive">
          *
        </span>
      </FieldLabel>
      <FieldContent>
        <InputGroup aria-invalid={!!error}>
          <InputGroupAddon>
            <Shield aria-hidden="true" className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            aria-describedby={error ? "disable-2fa-password-error" : undefined}
            aria-invalid={!!error}
            autoComplete="current-password"
            id="disable-2fa-password"
            name="password"
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your password…"
            required
            type={showPassword ? "text" : "password"}
            value={value}
          />
          <InputGroupButton
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="min-h-[32px] min-w-[32px] touch-manipulation"
            onClick={(e) => {
              e.preventDefault();
              onToggleShow();
            }}
            type="button"
          >
            {showPassword ? (
              <EyeOff aria-hidden="true" className="size-4" />
            ) : (
              <Eye aria-hidden="true" className="size-4" />
            )}
          </InputGroupButton>
        </InputGroup>
        {error && (
          <FieldError id="disable-2fa-password-error">{error}</FieldError>
        )}
      </FieldContent>
    </Field>
  );
}

interface DisableButtonProps {
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
}

function DisableButton({ isLoading, disabled, onClick }: DisableButtonProps) {
  return (
    <Button
      aria-busy={isLoading}
      className="min-h-[44px] w-full touch-manipulation sm:min-h-[32px]"
      data-loading={isLoading}
      disabled={disabled}
      onClick={onClick}
      type="button"
      variant="destructive"
    >
      {isLoading ? (
        <>
          <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          Disabling…
        </>
      ) : (
        <>
          <ShieldOff aria-hidden="true" className="size-4" />
          Disable 2FA
        </>
      )}
    </Button>
  );
}

interface DisableSectionProps {
  password: string;
  onPasswordChange: (value: string) => void;
  showPassword: boolean;
  onToggleShowPassword: () => void;
  error?: string;
  isLoading: boolean;
  onDisable: () => void;
}

function DisableSection({
  password,
  onPasswordChange,
  showPassword,
  onToggleShowPassword,
  error,
  isLoading,
  onDisable,
}: DisableSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="min-w-0">
        <h3 className="wrap-break-word font-medium text-destructive text-sm">
          Disable two-factor authentication
        </h3>
        <p className="wrap-break-word text-muted-foreground text-xs">
          You&apos;ll need to enter your password to disable 2FA.
        </p>
      </div>
      <PasswordField
        error={error}
        onChange={onPasswordChange}
        onToggleShow={onToggleShowPassword}
        showPassword={showPassword}
        value={password}
      />
      <DisableButton
        disabled={isLoading || !password.trim()}
        isLoading={isLoading}
        onClick={onDisable}
      />
    </div>
  );
}

function SetupHeader() {
  return (
    <>
      <CardTitle className="flex flex-wrap items-center gap-2">
        <Shield aria-hidden="true" className="size-5 shrink-0" />
        <span className="wrap-break-word">
          Set up two-factor authentication
        </span>
      </CardTitle>
      <CardDescription className="wrap-break-word">
        Add an extra layer of security to your account
      </CardDescription>
    </>
  );
}

function SetupInstructions() {
  return (
    <div className="rounded-lg border bg-muted/50 p-4">
      <p className="wrap-break-word text-muted-foreground text-sm">
        Scan the QR code with your authenticator app (like Google Authenticator,
        Authy, or 1Password) to set up two-factor authentication.
      </p>
    </div>
  );
}

interface QRCodeDisplayProps {
  qrCodeUrl: string;
}

function QRCodeDisplay({ qrCodeUrl }: QRCodeDisplayProps) {
  return (
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
  );
}

interface SecretKeyFieldProps {
  secretKey: string;
  onCopy: () => void;
}

function SecretKeyField({ secretKey, onCopy }: SecretKeyFieldProps) {
  return (
    <Field>
      <FieldLabel>Manual entry key</FieldLabel>
      <FieldContent>
        <InputGroup>
          <InputGroupAddon>
            <QrCode aria-hidden="true" className="size-4" />
          </InputGroupAddon>
          <InputGroupInput readOnly type="text" value={secretKey} />
          <InputGroupButton
            aria-label="Copy secret key"
            className="min-h-[32px] min-w-[32px] touch-manipulation"
            onClick={onCopy}
            type="button"
          >
            <Copy aria-hidden="true" className="size-4" />
          </InputGroupButton>
        </InputGroup>
        <FieldDescription>
          If you can&apos;t scan the QR code, enter this key manually in your
          authenticator app
        </FieldDescription>
      </FieldContent>
    </Field>
  );
}

interface RegenerateButtonProps {
  onRegenerate: () => void;
}

function RegenerateButton({ onRegenerate }: RegenerateButtonProps) {
  return (
    <Button
      className="min-h-[44px] w-full touch-manipulation sm:min-h-[32px] sm:w-auto"
      onClick={onRegenerate}
      type="button"
      variant="outline"
    >
      <RefreshCw aria-hidden="true" className="size-4" />
      Generate new QR code
    </Button>
  );
}

interface EnableButtonProps {
  isLoading: boolean;
  onClick?: () => void;
}

function EnableButton({ isLoading, onClick }: EnableButtonProps) {
  return (
    <div className="flex flex-col gap-2">
      <Button
        aria-busy={isLoading}
        className="min-h-[44px] w-full touch-manipulation sm:min-h-[32px]"
        data-loading={isLoading}
        disabled={isLoading}
        onClick={onClick}
        type="button"
      >
        {isLoading ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Enabling 2FA…
          </>
        ) : (
          <>
            <ShieldCheck aria-hidden="true" className="size-4" />
            Enable 2FA
          </>
        )}
      </Button>
      <p className="text-center text-muted-foreground text-xs">
        After enabling, you&apos;ll need to verify with a code from your
        authenticator app
      </p>
    </div>
  );
}

function downloadBackupCodes(codes: string[]): void {
  if (codes.length === 0) return;
  const content = codes.join("\n");
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "backup-codes.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

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
    downloadBackupCodes(backupCodes);
  }, [backupCodes]);

  const handleToggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleToggleShowBackupCodes = useCallback(() => {
    setShowBackupCodes((prev) => !prev);
  }, []);

  if (isEnabled) {
    return (
      <Card className={cn("w-full max-w-sm shadow-xs", className)}>
        <CardHeader>
          <EnabledStateHeader />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {errors?.general && <ErrorAlert message={errors.general} />}

            <div className="flex flex-col gap-4">
              <ActiveStatusCard />

              {backupCodes.length > 0 && (
                <BackupCodesSection
                  codes={backupCodes}
                  copiedIndex={copiedIndex}
                  onCopy={handleCopyCode}
                  onDownload={handleDownloadBackupCodes}
                  onRegenerate={onGenerateBackupCodes}
                  onToggleShow={handleToggleShowBackupCodes}
                  showCodes={showBackupCodes}
                />
              )}

              <Separator />

              <DisableSection
                error={errors?.password}
                isLoading={isLoading}
                onDisable={handleDisable}
                onPasswordChange={setPassword}
                onToggleShowPassword={handleToggleShowPassword}
                password={password}
                showPassword={showPassword}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full max-w-sm shadow-xs", className)}>
      <CardHeader>
        <SetupHeader />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {errors?.general && <ErrorAlert message={errors.general} />}

          <div className="flex flex-col gap-4">
            <SetupInstructions />

            {qrCodeUrl && <QRCodeDisplay qrCodeUrl={qrCodeUrl} />}

            {secretKey && (
              <SecretKeyField onCopy={handleCopySecret} secretKey={secretKey} />
            )}

            {onRegenerateSecret && (
              <RegenerateButton onRegenerate={onRegenerateSecret} />
            )}

            <Separator />

            <EnableButton isLoading={isLoading} onClick={onEnable} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

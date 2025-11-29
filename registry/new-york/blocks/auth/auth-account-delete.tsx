"use client";

import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
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
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Checkbox } from "@/registry/new-york/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/registry/new-york/ui/field";
import {
  InputGroup,
  InputGroupInput,
} from "@/registry/new-york/ui/input-group";

export interface AuthAccountDeleteProps {
  onDelete?: (data: { confirmText: string }) => void;
  className?: string;
  isLoading?: boolean;
  errors?: {
    confirmText?: string;
    general?: string;
  };
  confirmText?: string;
  dataSummary?: {
    projects?: number;
    files?: number;
    storage?: string;
  };
}

interface WarningBannerProps {
  className?: string;
}

function WarningBanner({ className }: WarningBannerProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/5 p-4",
        className
      )}
    >
      <AlertTriangle
        aria-hidden="true"
        className="size-5 shrink-0 text-destructive"
      />
      <div className="flex flex-1 flex-col gap-2">
        <p className="font-medium text-destructive text-sm">
          This action cannot be undone
        </p>
        <p className="text-muted-foreground text-xs">
          This will permanently delete your account and remove all of your data
          from our servers. This action is irreversible.
        </p>
      </div>
    </div>
  );
}

interface DataSummaryProps {
  dataSummary: {
    projects?: number;
    files?: number;
    storage?: string;
  };
}

function DataSummary({ dataSummary }: DataSummaryProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-muted/50 p-4">
      <h3 className="font-medium text-sm">Data that will be deleted:</h3>
      <ul className="flex flex-col gap-1 text-muted-foreground text-xs">
        {dataSummary.projects !== undefined && (
          <li>
            •{" "}
            <span className="tabular-nums">
              {dataSummary.projects} project
              {dataSummary.projects !== 1 ? "s" : ""}
            </span>
          </li>
        )}
        {dataSummary.files !== undefined && (
          <li>
            •{" "}
            <span className="tabular-nums">
              {dataSummary.files} file{dataSummary.files !== 1 ? "s" : ""}
            </span>
          </li>
        )}
        {dataSummary.storage && <li>• {dataSummary.storage} of storage</li>}
        <li>• All account settings and preferences</li>
        <li>• All personal information</li>
      </ul>
    </div>
  );
}

interface ConfirmTextFieldProps {
  id: string;
  value: string;
  error?: string;
  confirmText: string;
  onChange: (value: string) => void;
}

function ConfirmTextField({
  id,
  value,
  error,
  confirmText,
  onChange,
}: ConfirmTextFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>
        Type <span className="font-mono">{confirmText}</span> to confirm
        <span aria-label="required" className="text-destructive">
          {" "}
          *
        </span>
      </FieldLabel>
      <FieldContent>
        <InputGroup aria-invalid={!!error}>
          <InputGroupInput
            aria-describedby={error ? `${id}-error` : undefined}
            aria-invalid={!!error}
            id={id}
            name="confirmText"
            onChange={(e) => onChange(e.target.value)}
            placeholder={`${confirmText}…`}
            required
            style={{ fontSize: "16px" }}
            type="text"
            value={value}
          />
        </InputGroup>
        {error && (
          <FieldError id={`${id}-error`} role="alert">
            {error}
          </FieldError>
        )}
      </FieldContent>
    </Field>
  );
}

interface AcknowledgmentCheckboxProps {
  id: string;
  checked: boolean;
  label: string;
  onCheckedChange: (checked: boolean) => void;
}

function AcknowledgmentCheckbox({
  id,
  checked,
  label,
  onCheckedChange,
}: AcknowledgmentCheckboxProps) {
  return (
    <div className="flex items-start gap-2">
      <Checkbox
        checked={checked}
        id={id}
        onCheckedChange={(checked) => onCheckedChange(checked === true)}
      />
      <label
        className="cursor-pointer text-sm leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}

interface DeleteConfirmationDialogProps {
  onOpenChange: (open: boolean) => void;
  typedConfirm: string;
  acknowledgeDataLoss: boolean;
  acknowledgeIrreversible: boolean;
  confirmText: string;
  isLoading: boolean;
  isFormValid: boolean;
  confirmTextError?: string;
  onTypedConfirmChange: (value: string) => void;
  onAcknowledgeDataLossChange: (checked: boolean) => void;
  onAcknowledgeIrreversibleChange: (checked: boolean) => void;
  onDelete: () => void;
  onReset: () => void;
}

function DeleteConfirmationDialog({
  onOpenChange,
  typedConfirm,
  acknowledgeDataLoss,
  acknowledgeIrreversible,
  confirmText,
  isLoading,
  isFormValid,
  confirmTextError,
  onTypedConfirmChange,
  onAcknowledgeDataLossChange,
  onAcknowledgeIrreversibleChange,
  onDelete,
  onReset,
}: DeleteConfirmationDialogProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && isFormValid && !isLoading) {
        e.preventDefault();
        onDelete();
      }
      if (e.key === "Escape" && !isLoading) {
        onOpenChange(false);
        onReset();
      }
    },
    [isFormValid, isLoading, onDelete, onOpenChange, onReset]
  );

  const completedSteps = [
    typedConfirm === confirmText,
    acknowledgeDataLoss,
    acknowledgeIrreversible,
  ].filter(Boolean).length;

  return (
    <AlertDialogContent
      className="max-w-md"
      onKeyDown={handleKeyDown}
      style={{ overscrollBehavior: "contain" }}
    >
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-center gap-2">
          <AlertTriangle
            aria-hidden="true"
            className="size-5 text-destructive"
          />
          Confirm account deletion
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action is permanent and cannot be undone. Please confirm by
          typing <span className="font-mono font-semibold">{confirmText}</span>{" "}
          below.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <div className="flex flex-col gap-4 py-4">
        <ConfirmTextField
          confirmText={confirmText}
          error={confirmTextError}
          id="delete-account-confirm"
          onChange={onTypedConfirmChange}
          value={typedConfirm}
        />

        <div className="flex flex-col gap-3">
          <AcknowledgmentCheckbox
            checked={acknowledgeDataLoss}
            id="acknowledge-data-loss"
            label="I understand that all my data will be permanently deleted and cannot be recovered"
            onCheckedChange={onAcknowledgeDataLossChange}
          />

          <AcknowledgmentCheckbox
            checked={acknowledgeIrreversible}
            id="acknowledge-irreversible"
            label="I understand this action is irreversible"
            onCheckedChange={onAcknowledgeIrreversibleChange}
          />
        </div>
      </div>

      <AlertDialogFooter>
        <AlertDialogCancel
          className="min-h-[32px] min-w-[32px] touch-manipulation"
          onClick={onReset}
        >
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          aria-busy={isLoading}
          className="min-h-[32px] min-w-[32px] touch-manipulation bg-destructive text-destructive-foreground hover:bg-destructive/90"
          data-loading={isLoading}
          disabled={!isFormValid || isLoading}
          onClick={onDelete}
        >
          {isLoading ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Deleting…
            </>
          ) : (
            <>
              <Trash2 aria-hidden="true" className="size-4" />
              Delete account permanently
            </>
          )}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

export default function AuthAccountDelete({
  onDelete,
  className,
  isLoading = false,
  errors,
  confirmText = "DELETE",
  dataSummary,
}: AuthAccountDeleteProps) {
  const [typedConfirm, setTypedConfirm] = useState("");
  const [acknowledgeDataLoss, setAcknowledgeDataLoss] = useState(false);
  const [acknowledgeIrreversible, setAcknowledgeIrreversible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isFormValid =
    typedConfirm === confirmText &&
    acknowledgeDataLoss &&
    acknowledgeIrreversible;

  const handleDelete = useCallback(() => {
    if (!isFormValid) {
      return;
    }
    onDelete?.({
      confirmText: typedConfirm,
    });
  }, [isFormValid, typedConfirm, onDelete]);

  const handleReset = useCallback(() => {
    setTypedConfirm("");
    setAcknowledgeDataLoss(false);
    setAcknowledgeIrreversible(false);
  }, []);

  const handleDialogOpenChange = useCallback(
    (open: boolean) => {
      setIsDialogOpen(open);
      if (!open) {
        handleReset();
      }
    },
    [handleReset]
  );

  const confirmTextError = errors?.confirmText;
  const generalError = errors?.general;

  return (
    <Card
      className={cn(
        "w-full max-w-sm border-destructive/50 shadow-xs",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <Trash2 aria-hidden="true" className="size-5" />
          Delete account
        </CardTitle>
        <CardDescription>
          Permanently delete your account and all associated data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {generalError && (
            <div
              aria-live="polite"
              className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-destructive text-sm"
              role="alert"
            >
              {generalError}
            </div>
          )}

          <WarningBanner />

          {dataSummary && <DataSummary dataSummary={dataSummary} />}

          <AlertDialog
            onOpenChange={handleDialogOpenChange}
            open={isDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button
                className="min-h-[32px] w-full touch-manipulation"
                type="button"
                variant="destructive"
              >
                <Trash2 aria-hidden="true" className="size-4" />
                Delete my account
              </Button>
            </AlertDialogTrigger>
            <DeleteConfirmationDialog
              acknowledgeDataLoss={acknowledgeDataLoss}
              acknowledgeIrreversible={acknowledgeIrreversible}
              confirmText={confirmText}
              confirmTextError={confirmTextError}
              isFormValid={isFormValid}
              isLoading={isLoading}
              onAcknowledgeDataLossChange={setAcknowledgeDataLoss}
              onAcknowledgeIrreversibleChange={setAcknowledgeIrreversible}
              onDelete={handleDelete}
              onOpenChange={handleDialogOpenChange}
              onReset={handleReset}
              onTypedConfirmChange={setTypedConfirm}
              typedConfirm={typedConfirm}
            />
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}

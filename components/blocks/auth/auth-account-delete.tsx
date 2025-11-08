"use client";

import {
  AlertTriangle,
  Eye,
  EyeOff,
  Loader2,
  Shield,
  Trash2,
} from "lucide-react";
import { useCallback, useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

export interface AuthAccountDeleteProps {
  onDelete?: (data: { password: string; confirmText: string }) => void;
  className?: string;
  isLoading?: boolean;
  errors?: {
    password?: string;
    confirmText?: string;
    general?: string;
  };
  confirmText?: string; // Text user must type to confirm (e.g., "DELETE")
  dataSummary?: {
    projects?: number;
    files?: number;
    storage?: string;
  };
}

export default function AuthAccountDelete({
  onDelete,
  className,
  isLoading = false,
  errors,
  confirmText = "DELETE",
  dataSummary,
}: AuthAccountDeleteProps) {
  const [password, setPassword] = useState("");
  const [typedConfirm, setTypedConfirm] = useState("");
  const [acknowledgeDataLoss, setAcknowledgeDataLoss] = useState(false);
  const [acknowledgeIrreversible, setAcknowledgeIrreversible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = useCallback(() => {
    if (
      !password.trim() ||
      typedConfirm !== confirmText ||
      !acknowledgeDataLoss ||
      !acknowledgeIrreversible
    ) {
      return;
    }
    onDelete?.({
      password,
      confirmText: typedConfirm,
    });
  }, [
    password,
    typedConfirm,
    confirmText,
    acknowledgeDataLoss,
    acknowledgeIrreversible,
    onDelete,
  ]);

  const isFormValid =
    password.trim() &&
    typedConfirm === confirmText &&
    acknowledgeDataLoss &&
    acknowledgeIrreversible;

  const passwordError = errors?.password;
  const confirmTextError = errors?.confirmText;
  const generalError = errors?.general;

  return (
    <Card className={cn("w-full border-destructive/50 shadow-xs", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <Trash2 className="size-5" />
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

          <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="size-5 shrink-0 text-destructive" />
              <div className="flex flex-1 flex-col gap-2">
                <p className="font-medium text-destructive text-sm">
                  This action cannot be undone
                </p>
                <p className="text-muted-foreground text-xs">
                  This will permanently delete your account and remove all of
                  your data from our servers. This action is irreversible.
                </p>
              </div>
            </div>
          </div>

          {dataSummary && (
            <div className="flex flex-col gap-2 rounded-lg border bg-muted/50 p-4">
              <h3 className="font-medium text-sm">
                Data that will be deleted:
              </h3>
              <ul className="flex flex-col gap-1 text-muted-foreground text-xs">
                {dataSummary.projects !== undefined && (
                  <li>• {dataSummary.projects} project(s)</li>
                )}
                {dataSummary.files !== undefined && (
                  <li>• {dataSummary.files} file(s)</li>
                )}
                {dataSummary.storage && (
                  <li>• {dataSummary.storage} of storage</li>
                )}
                <li>• All account settings and preferences</li>
                <li>• All personal information</li>
              </ul>
            </div>
          )}

          <AlertDialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button className="w-full" type="button" variant="destructive">
                <Trash2 className="size-4" />
                Delete my account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="size-5 text-destructive" />
                  Confirm account deletion
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action is permanent and cannot be undone. Please confirm
                  by entering your password and typing{" "}
                  <span className="font-mono font-semibold">{confirmText}</span>{" "}
                  below.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="flex flex-col gap-4 py-4">
                <Field data-invalid={!!passwordError}>
                  <FieldLabel htmlFor="delete-account-password">
                    Password
                    <span aria-label="required" className="text-destructive">
                      *
                    </span>
                  </FieldLabel>
                  <FieldContent>
                    <InputGroup aria-invalid={!!passwordError}>
                      <InputGroupAddon>
                        <Shield className="size-4" />
                      </InputGroupAddon>
                      <InputGroupInput
                        aria-describedby={
                          passwordError
                            ? "delete-account-password-error"
                            : undefined
                        }
                        aria-invalid={!!passwordError}
                        autoComplete="current-password"
                        id="delete-account-password"
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
                    {passwordError && (
                      <FieldError id="delete-account-password-error">
                        {passwordError}
                      </FieldError>
                    )}
                  </FieldContent>
                </Field>

                <Field data-invalid={!!confirmTextError}>
                  <FieldLabel htmlFor="delete-account-confirm">
                    Type <span className="font-mono">{confirmText}</span> to
                    confirm
                    <span aria-label="required" className="text-destructive">
                      *
                    </span>
                  </FieldLabel>
                  <FieldContent>
                    <InputGroup aria-invalid={!!confirmTextError}>
                      <InputGroupInput
                        aria-describedby={
                          confirmTextError
                            ? "delete-account-confirm-error"
                            : undefined
                        }
                        aria-invalid={!!confirmTextError}
                        id="delete-account-confirm"
                        name="confirmText"
                        onChange={(e) => setTypedConfirm(e.target.value)}
                        placeholder={confirmText}
                        required
                        type="text"
                        value={typedConfirm}
                      />
                    </InputGroup>
                    {confirmTextError && (
                      <FieldError id="delete-account-confirm-error">
                        {confirmTextError}
                      </FieldError>
                    )}
                  </FieldContent>
                </Field>

                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-2">
                    <Checkbox
                      checked={acknowledgeDataLoss}
                      id="acknowledge-data-loss"
                      onCheckedChange={(checked) =>
                        setAcknowledgeDataLoss(checked === true)
                      }
                    />
                    <label
                      className="cursor-pointer text-sm leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="acknowledge-data-loss"
                    >
                      I understand that all my data will be permanently deleted
                      and cannot be recovered
                    </label>
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      checked={acknowledgeIrreversible}
                      id="acknowledge-irreversible"
                      onCheckedChange={(checked) =>
                        setAcknowledgeIrreversible(checked === true)
                      }
                    />
                    <label
                      className="cursor-pointer text-sm leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="acknowledge-irreversible"
                    >
                      I understand this action is irreversible
                    </label>
                  </div>
                </div>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setPassword("");
                    setTypedConfirm("");
                    setAcknowledgeDataLoss(false);
                    setAcknowledgeIrreversible(false);
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  aria-busy={isLoading}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  data-loading={isLoading}
                  disabled={!isFormValid || isLoading}
                  onClick={handleDelete}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Deleting…
                    </>
                  ) : (
                    <>
                      <Trash2 className="size-4" />
                      Delete account permanently
                    </>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}

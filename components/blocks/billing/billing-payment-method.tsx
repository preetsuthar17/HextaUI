"use client";

import { CreditCard, Loader2, MoreVertical, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface PaymentMethod {
  id: string;
  type: "card" | "bank_account" | "paypal" | "other";
  last4?: string;
  brand?: "visa" | "mastercard" | "amex" | "discover" | "other";
  expiryMonth?: number;
  expiryYear?: number;
  holderName?: string;
  isDefault?: boolean;
  billingAddress?: {
    line1?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
}

export interface BillingPaymentMethodProps {
  paymentMethods: PaymentMethod[];
  onAdd?: () => void;
  onEdit?: (methodId: string) => void;
  onDelete?: (methodId: string) => void;
  onSetDefault?: (methodId: string) => void;
  className?: string;
  allowMultiple?: boolean;
  isLoading?: boolean;
}

function getCardBrandIcon(brand?: PaymentMethod["brand"]) {
  switch (brand) {
    case "visa":
      return "💳";
    case "mastercard":
      return "💳";
    case "amex":
      return "💳";
    case "discover":
      return "💳";
    default:
      return "💳";
  }
}

function formatExpiry(month?: number, year?: number): string {
  if (!(month && year)) return "";
  const monthStr = month.toString().padStart(2, "0");
  const yearStr = year.toString().slice(-2);
  return `${monthStr}/${yearStr}`;
}

export default function BillingPaymentMethod({
  paymentMethods,
  onAdd,
  onEdit,
  onDelete,
  onSetDefault,
  className,
  allowMultiple = true,
  isLoading = false,
}: BillingPaymentMethodProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (methodId: string) => {
    setDeletingId(methodId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (deletingId) {
      await onDelete?.(deletingId);
      setDeletingId(null);
    }
    setDeleteDialogOpen(false);
  };

  if (paymentMethods.length === 0) {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle>Payment methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </div>
            {onAdd && (
              <Button
                className="w-full sm:w-auto"
                onClick={onAdd}
                type="button"
              >
                <Plus className="size-4" />
                Add payment method
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <CreditCard className="size-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">
              No payment methods added yet
            </p>
            {onAdd && (
              <Button onClick={onAdd} type="button" variant="outline">
                <Plus className="size-4" />
                Add payment method
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle>Payment methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </div>
            {onAdd && allowMultiple && (
              <Button
                className="w-full sm:w-auto"
                onClick={onAdd}
                type="button"
              >
                <Plus className="size-4" />
                Add payment method
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {paymentMethods.map((method) => (
              <div
                className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
                key={method.id}
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background text-xl">
                    {method.type === "card"
                      ? getCardBrandIcon(method.brand)
                      : method.type === "paypal"
                        ? "P"
                        : "🏦"}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-sm">
                        {method.type === "card"
                          ? `${method.brand ? method.brand.charAt(0).toUpperCase() + method.brand.slice(1) : "Card"} •••• ${method.last4 || "0000"}`
                          : method.type === "paypal"
                            ? "PayPal"
                            : method.type === "bank_account"
                              ? `Bank Account •••• ${method.last4 || "0000"}`
                              : "Other"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
                      {method.holderName && <span>{method.holderName}</span>}
                      {method.expiryMonth && method.expiryYear && (
                        <>
                          {method.holderName && (
                            <span aria-hidden="true">•</span>
                          )}
                          <span>
                            Expires{" "}
                            {formatExpiry(
                              method.expiryMonth,
                              method.expiryYear
                            )}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {method.isDefault && (
                    <Badge className="text-xs">Default</Badge>
                  )}
                  {!method.isDefault && onSetDefault && (
                    <Button
                      onClick={() => onSetDefault(method.id)}
                      type="button"
                      variant="outline"
                    >
                      Set default
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-label="Payment method options"
                        size="icon"
                        type="button"
                        variant="ghost"
                      >
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {onEdit && (
                        <DropdownMenuItem onClick={() => onEdit(method.id)}>
                          Edit
                        </DropdownMenuItem>
                      )}
                      {!method.isDefault && onSetDefault && (
                        <DropdownMenuItem
                          onClick={() => onSetDefault(method.id)}
                        >
                          Set as default
                        </DropdownMenuItem>
                      )}
                      {onDelete && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(method.id)}
                          >
                            <Trash2 className="size-4" />
                            Delete
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialog onOpenChange={setDeleteDialogOpen} open={deleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete payment method?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This payment method will be
              permanently removed from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmDelete}
            >
              {deletingId && isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Deleting…
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

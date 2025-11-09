"use client";

import { Download, Loader2, Printer } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface InvoiceDetails {
  id: string;
  invoiceNumber: string;
  date: Date;
  dueDate?: Date;
  amount: number;
  currency?: string;
  status: "paid" | "pending" | "failed" | "refunded" | "void";
  description?: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  tax?: {
    amount: number;
    rate?: number;
    label?: string;
  };
  discount?: {
    amount: number;
    code?: string;
    label?: string;
  };
  total: number;
  paymentMethod?: {
    type: string;
    last4?: string;
    brand?: string;
  };
  billingAddress?: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  downloadUrl?: string;
}

export interface BillingInvoiceDetailsProps {
  invoice: InvoiceDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload?: (invoiceId: string) => void;
  onPrint?: (invoiceId: string) => void;
  className?: string;
  currency?: string;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

function formatPrice(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function getStatusConfig(status: InvoiceDetails["status"]) {
  switch (status) {
    case "paid":
      return {
        label: "Paid",
        variant: "default" as const,
        className: "bg-green-500/10 text-green-600 border-green-500/20",
      };
    case "pending":
      return {
        label: "Pending",
        variant: "secondary" as const,
        className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      };
    case "failed":
      return {
        label: "Failed",
        variant: "destructive" as const,
        className: "bg-destructive/10 text-destructive border-destructive/20",
      };
    case "refunded":
      return {
        label: "Refunded",
        variant: "secondary" as const,
        className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      };
    case "void":
      return {
        label: "Void",
        variant: "secondary" as const,
        className: "",
      };
    default:
      return {
        label: "Unknown",
        variant: "secondary" as const,
        className: "",
      };
  }
}

export default function BillingInvoiceDetails({
  invoice,
  open,
  onOpenChange,
  onDownload,
  onPrint,
  className,
  currency = "USD",
}: BillingInvoiceDetailsProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  if (!invoice) return null;

  const statusConfig = getStatusConfig(invoice.status);
  const invoiceCurrency = invoice.currency || currency;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await onDownload?.(invoice.id);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = async () => {
    setIsPrinting(true);
    try {
      await onPrint?.(invoice.id);
      window.print();
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent
        className={cn(
          "flex flex-col gap-0 overflow-y-auto sm:max-w-2xl",
          className
        )}
      >
        <SheetHeader className="shrink-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <SheetTitle className="wrap-break-word">
                Invoice {invoice.invoiceNumber}
              </SheetTitle>
              <SheetDescription className="wrap-break-word">
                {invoice.description ||
                  `Invoice dated ${formatDate(invoice.date)}`}
              </SheetDescription>
            </div>
            <Badge
              className={cn("shrink-0 text-xs", statusConfig.className)}
              variant={statusConfig.variant}
            >
              {statusConfig.label}
            </Badge>
          </div>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="font-medium text-sm">Invoice Details</h3>
                <div className="flex flex-col gap-1 text-muted-foreground text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span>Date:</span>
                    <span className="text-foreground">
                      {formatDate(invoice.date)}
                    </span>
                  </div>
                  {invoice.dueDate && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span>Due Date:</span>
                      <span className="text-foreground">
                        {formatDate(invoice.dueDate)}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    <span>Status:</span>
                    <Badge
                      className={cn("text-xs", statusConfig.className)}
                      variant={statusConfig.variant}
                    >
                      {statusConfig.label}
                    </Badge>
                  </div>
                </div>
              </div>

              {invoice.billingAddress && (
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium text-sm">Billing Address</h3>
                  <div className="flex flex-col gap-1 text-muted-foreground text-sm">
                    <div className="wrap-break-word text-foreground">
                      {invoice.billingAddress.name}
                    </div>
                    <div className="wrap-break-word">
                      {invoice.billingAddress.line1}
                    </div>
                    {invoice.billingAddress.line2 && (
                      <div className="wrap-break-word">
                        {invoice.billingAddress.line2}
                      </div>
                    )}
                    <div className="wrap-break-word">
                      {invoice.billingAddress.city},{" "}
                      {invoice.billingAddress.state}{" "}
                      {invoice.billingAddress.zip}
                    </div>
                    <div className="wrap-break-word">
                      {invoice.billingAddress.country}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-sm">Line Items</h3>
              <div className="flex flex-col gap-0 overflow-hidden rounded-lg border">
                <div className="hidden grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b bg-muted/50 p-3 font-medium text-muted-foreground text-xs sm:grid">
                  <div>Description</div>
                  <div className="text-right">Quantity</div>
                  <div className="text-right">Unit Price</div>
                  <div className="text-right">Subtotal</div>
                </div>
                {invoice.lineItems.map((item, idx) => (
                  <div
                    className="flex flex-col gap-2 border-b p-3 last:border-b-0 sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr] sm:gap-4 sm:gap-y-0"
                    key={idx}
                  >
                    <div className="wrap-break-word font-medium text-sm">
                      {item.description}
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground text-sm sm:justify-end">
                      <span className="sm:hidden">Quantity:</span>
                      <span>{item.quantity}</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground text-sm sm:justify-end">
                      <span className="sm:hidden">Unit Price:</span>
                      <span>
                        {formatPrice(item.unitPrice, invoiceCurrency)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-medium text-sm sm:justify-end">
                      <span className="sm:hidden">Subtotal:</span>
                      <span>{formatPrice(item.subtotal, invoiceCurrency)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(invoice.subtotal, invoiceCurrency)}</span>
              </div>
              {invoice.discount && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Discount
                    {invoice.discount.label && ` (${invoice.discount.label})`}
                    {invoice.discount.code && ` - ${invoice.discount.code}`}
                  </span>
                  <span className="text-green-600">
                    -{formatPrice(invoice.discount.amount, invoiceCurrency)}
                  </span>
                </div>
              )}
              {invoice.tax && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Tax{invoice.tax.label && ` (${invoice.tax.label})`}
                    {invoice.tax.rate !== undefined &&
                      ` ${(invoice.tax.rate * 100).toFixed(1)}%`}
                  </span>
                  <span>
                    {formatPrice(invoice.tax.amount, invoiceCurrency)}
                  </span>
                </div>
              )}
              <Separator />
              <div className="flex items-center justify-between font-semibold text-base">
                <span>Total</span>
                <span>{formatPrice(invoice.total, invoiceCurrency)}</span>
              </div>
            </div>

            {invoice.paymentMethod && (
              <>
                <Separator />
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium text-sm">Payment Method</h3>
                  <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
                    <span className="capitalize">
                      {invoice.paymentMethod.type}
                    </span>
                    {invoice.paymentMethod.brand && (
                      <>
                        <span aria-hidden="true">•</span>
                        <span className="capitalize">
                          {invoice.paymentMethod.brand}
                        </span>
                      </>
                    )}
                    {invoice.paymentMethod.last4 && (
                      <>
                        <span aria-hidden="true">•</span>
                        <span>•••• {invoice.paymentMethod.last4}</span>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 border-t p-4 sm:flex-row sm:justify-end">
          {onPrint && (
            <Button
              aria-label="Print invoice"
              className="w-full sm:w-auto"
              onClick={handlePrint}
              type="button"
              variant="outline"
            >
              {isPrinting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Printing…
                </>
              ) : (
                <>
                  <Printer className="size-4" />
                  Print
                </>
              )}
            </Button>
          )}
          {onDownload && (
            <Button
              aria-label={`Download invoice ${invoice.invoiceNumber}`}
              className="w-full sm:w-auto"
              onClick={handleDownload}
              type="button"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Downloading…
                </>
              ) : (
                <>
                  <Download className="size-4" />
                  Download PDF
                </>
              )}
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

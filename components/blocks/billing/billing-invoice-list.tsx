"use client";

import { Download, FileText, Search } from "lucide-react";
import { useMemo, useState } from "react";
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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: Date;
  amount: number;
  currency?: string;
  status: "paid" | "pending" | "failed" | "refunded" | "void";
  description?: string;
  downloadUrl?: string;
  items?: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity?: number;
  amount: number;
}

export interface BillingInvoiceListProps {
  invoices: Invoice[];
  onDownload?: (invoiceId: string) => void;
  onViewDetails?: (invoiceId: string) => void;
  className?: string;
  showFilters?: boolean;
  showSearch?: boolean;
  itemsPerPage?: number;
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

function getStatusConfig(status: Invoice["status"]) {
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

export default function BillingInvoiceList({
  invoices,
  onDownload,
  onViewDetails,
  className,
  showFilters = true,
  showSearch = true,
  itemsPerPage = 10,
  currency = "USD",
}: BillingInvoiceListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredInvoices = useMemo(() => {
    let filtered = invoices;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (invoice) =>
          invoice.invoiceNumber.toLowerCase().includes(query) ||
          invoice.description?.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((invoice) => invoice.status === statusFilter);
    }

    return filtered;
  }, [invoices, searchQuery, statusFilter]);

  const paginatedInvoices = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredInvoices.slice(start, end);
  }, [filteredInvoices, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

  if (invoices.length === 0) {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Your invoice history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <FileText className="size-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">No invoices found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>Invoices</CardTitle>
            <CardDescription>
              View and download your invoice history
            </CardDescription>
          </div>
          <div className="text-muted-foreground text-sm">
            {filteredInvoices.length} invoice
            {filteredInvoices.length !== 1 ? "s" : ""}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {(showSearch || showFilters) && (
            <div className="flex flex-col gap-4 sm:flex-row">
              {showSearch && (
                <div className="flex-1">
                  <InputGroup>
                    <InputGroupAddon>
                      <Search className="size-4" />
                    </InputGroupAddon>
                    <InputGroupInput
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="Search by invoice number…"
                      type="search"
                      value={searchQuery}
                    />
                  </InputGroup>
                </div>
              )}
              {showFilters && (
                <Select
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    setCurrentPage(1);
                  }}
                  value={statusFilter}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                    <SelectItem value="void">Void</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          {paginatedInvoices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground text-sm">
                No invoices match your filters
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                {paginatedInvoices.map((invoice) => {
                  const statusConfig = getStatusConfig(invoice.status);
                  return (
                    <div
                      className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
                      key={invoice.id}
                    >
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-sm">
                            {invoice.invoiceNumber}
                          </span>
                          <Badge
                            className={cn("text-xs", statusConfig.className)}
                            variant={statusConfig.variant}
                          >
                            {statusConfig.label}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
                          <span>{formatDate(invoice.date)}</span>
                          {invoice.description && (
                            <>
                              <span aria-hidden="true">•</span>
                              <span className="wrap-break-word">
                                {invoice.description}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="font-medium text-sm">
                          {formatPrice(
                            invoice.amount,
                            invoice.currency || currency
                          )}
                        </span>
                        <div className="flex gap-2">
                          {onViewDetails && (
                            <Button
                              onClick={() => onViewDetails(invoice.id)}
                              type="button"
                              variant="ghost"
                            >
                              View
                            </Button>
                          )}
                          {onDownload && (
                            <Button
                              aria-label={`Download invoice ${invoice.invoiceNumber}`}
                              onClick={() => onDownload(invoice.id)}
                              size="icon"
                              type="button"
                              variant="ghost"
                            >
                              <Download className="size-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">
                      Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        type="button"
                        variant="outline"
                      >
                        Previous
                      </Button>
                      <Button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        type="button"
                        variant="outline"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

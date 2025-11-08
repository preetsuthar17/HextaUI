"use client";

import { ArrowDown, ArrowUp, Download, FileText, Search } from "lucide-react";
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

export interface BillingTransaction {
  id: string;
  date: Date;
  type: "charge" | "refund" | "credit" | "adjustment" | "subscription";
  amount: number;
  currency?: string;
  description: string;
  status: "completed" | "pending" | "failed";
  invoiceId?: string;
  paymentMethod?: string;
  metadata?: Record<string, unknown>;
}

export interface BillingBillingHistoryProps {
  transactions: BillingTransaction[];
  onViewDetails?: (transactionId: string) => void;
  onExport?: () => void;
  className?: string;
  showFilters?: boolean;
  showSearch?: boolean;
  showSummary?: boolean;
  currency?: string;
  itemsPerPage?: number;
  groupBy?: "none" | "month" | "year";
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

function formatPrice(amount: number, currency = "USD"): string {
  const sign = amount >= 0 ? "" : "-";
  return `${sign}${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount))}`;
}

function getTypeConfig(type: BillingTransaction["type"]) {
  switch (type) {
    case "charge":
      return { label: "Charge", icon: ArrowDown, className: "text-green-600" };
    case "refund":
      return { label: "Refund", icon: ArrowUp, className: "text-blue-600" };
    case "credit":
      return { label: "Credit", icon: ArrowUp, className: "text-blue-600" };
    case "adjustment":
      return {
        label: "Adjustment",
        icon: ArrowUp,
        className: "text-yellow-600",
      };
    case "subscription":
      return {
        label: "Subscription",
        icon: ArrowDown,
        className: "text-primary",
      };
    default:
      return { label: "Transaction", icon: FileText, className: "" };
  }
}

function getStatusConfig(status: BillingTransaction["status"]) {
  switch (status) {
    case "completed":
      return {
        label: "Completed",
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
    default:
      return {
        label: "Unknown",
        variant: "secondary" as const,
        className: "",
      };
  }
}

export default function BillingBillingHistory({
  transactions,
  onViewDetails,
  onExport,
  className,
  showFilters = true,
  showSearch = true,
  showSummary = true,
  currency = "USD",
  itemsPerPage = 10,
  groupBy = "none",
}: BillingBillingHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tx) =>
          tx.description.toLowerCase().includes(query) ||
          tx.id.toLowerCase().includes(query) ||
          tx.invoiceId?.toLowerCase().includes(query) ||
          formatPrice(tx.amount, tx.currency || currency)
            .toLowerCase()
            .includes(query)
      );
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((tx) => tx.type === typeFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((tx) => tx.status === statusFilter);
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "date") {
        comparison = a.date.getTime() - b.date.getTime();
      } else {
        comparison = a.amount - b.amount;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [
    transactions,
    searchQuery,
    typeFilter,
    statusFilter,
    sortBy,
    sortOrder,
    currency,
  ]);

  const summary = useMemo(() => {
    const charges = filteredTransactions
      .filter((tx) => tx.type === "charge" && tx.status === "completed")
      .reduce((sum, tx) => sum + tx.amount, 0);
    const refunds = filteredTransactions
      .filter((tx) => tx.type === "refund" && tx.status === "completed")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    const credits = filteredTransactions
      .filter((tx) => tx.type === "credit" && tx.status === "completed")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    return { charges, refunds, credits, net: charges - refunds - credits };
  }, [filteredTransactions]);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredTransactions.slice(start, end);
  }, [filteredTransactions, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  if (transactions.length === 0) {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <CardTitle>Billing history</CardTitle>
          <CardDescription>Your transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <FileText className="size-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">
              No transactions found
            </p>
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
            <CardTitle>Billing history</CardTitle>
            <CardDescription>View all your transactions</CardDescription>
          </div>
          {onExport && (
            <Button
              className="w-full sm:w-auto"
              onClick={onExport}
              type="button"
              variant="outline"
            >
              <Download className="size-4" />
              Export CSV
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {showSummary && (
            <div className="grid grid-cols-2 gap-4 rounded-lg border bg-muted/50 p-4 sm:grid-cols-4">
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs">
                  Total charges
                </span>
                <span className="font-semibold text-sm">
                  {formatPrice(summary.charges, currency)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs">Refunds</span>
                <span className="font-semibold text-sm">
                  {formatPrice(summary.refunds, currency)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs">Credits</span>
                <span className="font-semibold text-sm">
                  {formatPrice(summary.credits, currency)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs">Net total</span>
                <span className="font-semibold text-sm">
                  {formatPrice(summary.net, currency)}
                </span>
              </div>
            </div>
          )}

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
                      placeholder="Search transactions…"
                      type="search"
                      value={searchQuery}
                    />
                  </InputGroup>
                </div>
              )}
              {showFilters && (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Select
                    onValueChange={(value) => {
                      setTypeFilter(value);
                      setCurrentPage(1);
                    }}
                    value={typeFilter}
                  >
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="charge">Charges</SelectItem>
                      <SelectItem value="refund">Refunds</SelectItem>
                      <SelectItem value="credit">Credits</SelectItem>
                      <SelectItem value="adjustment">Adjustments</SelectItem>
                      <SelectItem value="subscription">
                        Subscriptions
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(value) => {
                      setStatusFilter(value);
                      setCurrentPage(1);
                    }}
                    value={statusFilter}
                  >
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(value) => {
                      const [by, order] = value.split("-") as [
                        "date" | "amount",
                        "asc" | "desc",
                      ];
                      setSortBy(by);
                      setSortOrder(order);
                      setCurrentPage(1);
                    }}
                    value={`${sortBy}-${sortOrder}`}
                  >
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-desc">Newest first</SelectItem>
                      <SelectItem value="date-asc">Oldest first</SelectItem>
                      <SelectItem value="amount-desc">
                        Amount: High to Low
                      </SelectItem>
                      <SelectItem value="amount-asc">
                        Amount: Low to High
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          {paginatedTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground text-sm">
                No transactions match your filters
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                {paginatedTransactions.map((transaction) => {
                  const typeConfig = getTypeConfig(transaction.type);
                  const statusConfig = getStatusConfig(transaction.status);
                  const TypeIcon = typeConfig.icon;
                  return (
                    <div
                      className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
                      key={transaction.id}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-lg border",
                            typeConfig.className
                          )}
                        >
                          <TypeIcon className="size-4" />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="wrap-break-word font-medium text-sm">
                              {transaction.description}
                            </span>
                            <Badge
                              className={cn("text-xs", statusConfig.className)}
                              variant={statusConfig.variant}
                            >
                              {statusConfig.label}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
                            <span>{formatDate(transaction.date)}</span>
                            {transaction.invoiceId && (
                              <>
                                <span aria-hidden="true">•</span>
                                <span>{transaction.invoiceId}</span>
                              </>
                            )}
                            {transaction.paymentMethod && (
                              <>
                                <span aria-hidden="true">•</span>
                                <span>{transaction.paymentMethod}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span
                          className={cn(
                            "font-medium text-sm",
                            transaction.amount < 0 && "text-green-600",
                            transaction.amount > 0 && "text-foreground"
                          )}
                        >
                          {formatPrice(
                            transaction.amount,
                            transaction.currency || currency
                          )}
                        </span>
                        {onViewDetails && (
                          <Button
                            onClick={() => onViewDetails(transaction.id)}
                            type="button"
                            variant="ghost"
                          >
                            View
                          </Button>
                        )}
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

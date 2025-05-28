"use client";

import React, { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export type DataTableColumn<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
};

export type DataTableProps<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  className?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  itemsPerPage?: number;
  showPagination?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T, index: number) => void;
};

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  className,
  searchable = true,
  searchPlaceholder = "Search...",
  itemsPerPage = 10,
  showPagination = true,
  striped = false,
  hoverable = true,
  bordered = true,
  compact = false,
  loading = false,
  emptyMessage = "No data available",
  onRowClick,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>(
    {}
  );

  // Filter data based on search and column filters
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Global search
    if (search) {
      filtered = filtered.filter((row) =>
        columns.some((column) => {
          const value = row[column.key];
          return value?.toString().toLowerCase().includes(search.toLowerCase());
        })
      );
    }

    // Column filters
    Object.entries(columnFilters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((row) => {
          const rowValue = row[key as keyof T];
          return rowValue
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        });
      }
    });

    return filtered;
  }, [data, search, columnFilters, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const paginatedData = useMemo(() => {
    if (!showPagination) return sortedData;

    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage, showPagination]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key: keyof T) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleColumnFilter = (key: string, value: string) => {
    setColumnFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const clearColumnFilter = (key: string) => {
    setColumnFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };
  if (loading) {
    return (
      <div className={cn("w-full bg-white rounded-lg ", className)}>
        <div className="animate-pulse p-6">
          {/* Search skeleton */}
          {searchable && <div className="mb-6 h-11 bg-muted rounded-lg"></div>}
          {/* Table skeleton */}
          <div className="border border-border  overflow-hidden">
            <div className="bg-muted/30 h-14"></div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-14 border-t border-border bg-white"
              ></div>
            ))}
          </div>
          {/* Pagination skeleton */}
          <div className="mt-6 flex justify-between items-center">
            <div className="h-4 bg-muted rounded w-48"></div>
            <div className="flex space-x-2">
              <div className="h-9 w-20 bg-muted rounded-lg"></div>
              <div className="h-9 w-9 bg-muted rounded-lg"></div>
              <div className="h-9 w-9 bg-muted rounded-lg"></div>
              <div className="h-9 w-16 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={cn("w-full space-y-6 bg-white rounded-lg", className)}>
      {/* Search and Filters */}
      {searchable && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
          <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            />
          </div>
        </div>
      )}
      {/* Table */}
      <div
        className={cn(
          "overflow-hidden bg-white",
          bordered && "border border-border "
        )}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="bg-muted/30">
              <tr>
                {" "}
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={cn(
                      "text-left font-medium text-muted-foreground bg-muted/30",
                      compact ? "px-4 py-3" : "px-6 py-4",
                      column.sortable &&
                        "cursor-pointer hover:bg-muted/50 transition-colors",
                      column.width && `w-[${column.width}]`
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                    style={column.width ? { width: column.width } : undefined}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold">
                          {column.header}
                        </span>
                        {column.sortable && (
                          <div className="flex flex-col">
                            <ChevronUp
                              className={cn(
                                "h-3 w-3",
                                sortConfig.key === column.key &&
                                  sortConfig.direction === "asc"
                                  ? "text-primary"
                                  : "text-muted-foreground/40"
                              )}
                            />
                            <ChevronDown
                              className={cn(
                                "h-3 w-3 -mt-1",
                                sortConfig.key === column.key &&
                                  sortConfig.direction === "desc"
                                  ? "text-primary"
                                  : "text-muted-foreground/40"
                              )}
                            />
                          </div>
                        )}
                      </div>
                      {column.filterable && (
                        <div className="relative">
                          <Filter className="h-3 w-3 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>
                    {/* Column Filter */}
                    {column.filterable && (
                      <div className="mt-3">
                        <input
                          type="text"
                          placeholder="Filter..."
                          value={columnFilters[String(column.key)] || ""}
                          onChange={(e) =>
                            handleColumnFilter(
                              String(column.key),
                              e.target.value
                            )
                          }
                          onClick={(e) => e.stopPropagation()}
                          className="w-full px-3 py-1.5 text-xs border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                        />
                        {columnFilters[String(column.key)] && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              clearColumnFilter(String(column.key));
                            }}
                            className="absolute right-2 top-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>{" "}
            <tbody className="bg-white">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className={cn(
                      "text-center text-muted-foreground bg-white",
                      compact ? "px-4 py-12" : "px-6 py-16"
                    )}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="text-4xl">📊</div>
                      <div className="font-medium">{emptyMessage}</div>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => (
                  <tr
                    key={index}
                    className={cn(
                      "border-t border-border bg-white transition-colors",
                      striped && index % 2 === 0 && "bg-muted/20",
                      hoverable && "hover:bg-muted/30",
                      onRowClick && "cursor-pointer"
                    )}
                    onClick={() => onRowClick?.(row, index)}
                  >
                    {columns.map((column) => (
                      <td
                        key={String(column.key)}
                        className={cn(
                          "text-sm text-foreground",
                          compact ? "px-4 py-3" : "px-6 py-4"
                        )}
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : String(row[column.key] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>{" "}
      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border-t border-border">
          <div className="text-sm text-muted-foreground order-2 sm:order-1">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, sortedData.length)} of{" "}
            {sortedData.length} results
          </div>
          <div className="flex items-center space-x-2 order-1 sm:order-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm border border-input rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <div className="hidden sm:flex items-center space-x-1">
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                const pageNumber =
                  currentPage <= 3
                    ? i + 1
                    : currentPage >= totalPages - 2
                    ? totalPages - 4 + i
                    : currentPage - 2 + i;

                if (pageNumber < 1 || pageNumber > totalPages) return null;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={cn(
                      "px-3 py-2 text-sm border border-input rounded-lg hover:bg-muted transition-colors",
                      currentPage === pageNumber &&
                        "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                    )}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm border border-input rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Example components for documentation
export const BasicDataTableDemo = () => {
  const sampleData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "Moderator",
      status: "Active",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "User",
      status: "Pending",
    },
  ];

  const columns: DataTableColumn<(typeof sampleData)[0]>[] = [
    { key: "id", header: "ID", sortable: true, width: "80px" },
    { key: "name", header: "Name", sortable: true, filterable: true },
    { key: "email", header: "Email", sortable: true, filterable: true },
    { key: "role", header: "Role", sortable: true, filterable: true },
    {
      key: "status",
      header: "Status",
      sortable: true,
      filterable: true,
      render: (value) => (
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            value === "Active" && "bg-green-100 text-green-800",
            value === "Inactive" && "bg-red-100 text-red-800",
            value === "Pending" && "bg-yellow-100 text-yellow-800"
          )}
        >
          {value}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      data={sampleData}
      columns={columns}
      className="max-w-4xl"
      itemsPerPage={5}
    />
  );
};

export const CompactDataTableDemo = () => {
  const sampleData = [
    { product: "MacBook Pro", category: "Laptops", price: 1999, stock: 15 },
    { product: "iPhone 15", category: "Phones", price: 999, stock: 25 },
    { product: "iPad Air", category: "Tablets", price: 599, stock: 12 },
    { product: "AirPods Pro", category: "Audio", price: 249, stock: 45 },
  ];

  const columns: DataTableColumn<(typeof sampleData)[0]>[] = [
    { key: "product", header: "Product", sortable: true },
    { key: "category", header: "Category", sortable: true },
    {
      key: "price",
      header: "Price",
      sortable: true,
      render: (value) => `$${value}`,
    },
    { key: "stock", header: "Stock", sortable: true },
  ];

  return (
    <DataTable
      data={sampleData}
      columns={columns}
      compact
      striped
      bordered={false}
      showPagination={false}
      searchPlaceholder="Search products..."
    />
  );
};

export const CustomRenderDemo = () => {
  const sampleData = [
    {
      name: "Alice",
      avatar: "A",
      score: 95,
      progress: 0.95,
      lastActive: "2 hours ago",
    },
    {
      name: "Bob",
      avatar: "B",
      score: 87,
      progress: 0.87,
      lastActive: "1 day ago",
    },
    {
      name: "Charlie",
      avatar: "C",
      score: 92,
      progress: 0.92,
      lastActive: "3 hours ago",
    },
  ];

  const columns: DataTableColumn<(typeof sampleData)[0]>[] = [
    {
      key: "avatar",
      header: "User",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
            {value}
          </div>
          <span className="font-medium">{row.name}</span>
        </div>
      ),
    },
    {
      key: "score",
      header: "Score",
      sortable: true,
      render: (value) => <span className="font-mono text-sm">{value}/100</span>,
    },
    {
      key: "progress",
      header: "Progress",
      sortable: true,
      render: (value) => (
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${value * 100}%` }}
          />
        </div>
      ),
    },
    { key: "lastActive", header: "Last Active" },
  ];

  return (
    <DataTable
      data={sampleData}
      columns={columns}
      showPagination={false}
      searchable={false}
      onRowClick={(row) => alert(`Clicked on ${row.name}`)}
    />
  );
};

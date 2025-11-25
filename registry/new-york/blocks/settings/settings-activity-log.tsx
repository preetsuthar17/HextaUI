"use client";

import {
  Calendar,
  Download,
  Filter,
  Loader2,
  MapPin,
  Search,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/registry/new-york/ui/badge";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { FieldLabel } from "@/registry/new-york/ui/field";
import {
  InputGroup,
  InputGroupInput,
} from "@/registry/new-york/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import { Separator } from "@/registry/new-york/ui/separator";

export interface ActivityLogEntry {
  id: string;
  action: string;
  type:
    | "login"
    | "logout"
    | "password_change"
    | "profile_update"
    | "settings_change"
    | "export"
    | "delete"
    | "create"
    | "update";
  description: string;
  ipAddress: string;
  location: string;
  device: string;
  timestamp: Date;
  status: "success" | "failed";
}

export interface SettingsActivityLogProps {
  entries?: ActivityLogEntry[];
  onExport?: (filters: {
    dateRange?: { start: Date; end: Date };
    type?: string;
    search?: string;
  }) => Promise<void>;
  className?: string;
}

const actionTypes = [
  { value: "all", label: "All Actions" },
  { value: "login", label: "Logins" },
  { value: "logout", label: "Logouts" },
  { value: "password_change", label: "Password Changes" },
  { value: "profile_update", label: "Profile Updates" },
  { value: "settings_change", label: "Settings Changes" },
  { value: "export", label: "Exports" },
  { value: "delete", label: "Deletions" },
];

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatRelativeTime(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
}

export default function SettingsActivityLog({
  entries = [],
  onExport,
  className,
}: SettingsActivityLogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const [isExporting, setIsExporting] = useState(false);

  const filteredEntries = entries.filter((entry) => {
    if (selectedType !== "all" && entry.type !== selectedType) return false;
    if (
      searchQuery &&
      !entry.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !entry.ipAddress.includes(searchQuery) &&
      !entry.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const exportRange =
        dateRange.start && dateRange.end
          ? {
              start: new Date(dateRange.start),
              end: new Date(dateRange.end),
            }
          : undefined;

      await onExport?.({
        dateRange: exportRange,
        type: selectedType !== "all" ? selectedType : undefined,
        search: searchQuery || undefined,
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <CardTitle className="wrap-break-word">Activity Log</CardTitle>
            <CardDescription className="wrap-break-word">
              View your account activity and audit trail
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {/* Filters */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  <Search className="size-4" />
                </div>
                <FieldLabel className="mb-0">Search</FieldLabel>
              </div>
              <InputGroup>
                <InputGroupInput
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by description, IP, or location..."
                  value={searchQuery}
                />
              </InputGroup>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  <Filter className="size-4" />
                </div>
                <FieldLabel className="mb-0" htmlFor="action-type">
                  Action Type
                </FieldLabel>
              </div>
              <Select onValueChange={setSelectedType} value={selectedType}>
                <SelectTrigger id="action-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {actionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  <Calendar className="size-4" />
                </div>
                <FieldLabel className="mb-0" htmlFor="date-start">
                  Start Date
                </FieldLabel>
              </div>
              <InputGroup>
                <InputGroupInput
                  id="date-start"
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, start: e.target.value }))
                  }
                  type="date"
                  value={dateRange.start}
                />
              </InputGroup>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  <Calendar className="size-4" />
                </div>
                <FieldLabel className="mb-0" htmlFor="date-end">
                  End Date
                </FieldLabel>
              </div>
              <InputGroup>
                <InputGroupInput
                  id="date-end"
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, end: e.target.value }))
                  }
                  type="date"
                  value={dateRange.end}
                />
              </InputGroup>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted-foreground text-sm">
              {filteredEntries.length}{" "}
              {filteredEntries.length === 1 ? "entry" : "entries"}
            </p>
            <Button
              className="w-full sm:w-auto"
              disabled={isExporting}
              onClick={handleExport}
              type="button"
              variant="outline"
            >
              {isExporting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Exporting…
                </>
              ) : (
                <>
                  <Download className="size-4" />
                  Export Log
                </>
              )}
            </Button>
          </div>

          <Separator />

          {/* Activity Entries */}
          {filteredEntries.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <Search className="size-6 text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium text-sm">No activity found</p>
                <p className="text-muted-foreground text-sm">
                  {searchQuery || selectedType !== "all"
                    ? "Try adjusting your filters"
                    : "Your activity will appear here"}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredEntries.map((entry) => (
                <div
                  className="flex items-start gap-3 rounded-lg border p-4"
                  key={entry.id}
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Calendar className="size-4" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-sm">
                        {entry.description}
                      </span>
                      <Badge
                        className="text-xs"
                        variant={
                          entry.status === "success" ? "default" : "destructive"
                        }
                      >
                        {entry.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3" />
                        {entry.location}
                      </span>
                      <span>•</span>
                      <span>{entry.ipAddress}</span>
                      <span>•</span>
                      <span>{entry.device}</span>
                      <span>•</span>
                      <span>{formatRelativeTime(entry.timestamp)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

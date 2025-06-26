"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuGroup,
} from "@/components/ui/DropdownMenu";
import {
  Calendar,
  Bell,
  Settings,
  Filter,
  Search,
  Download,
  Share2,
  RefreshCw,
  Maximize2,
  MoreHorizontal,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  time: string;
  read: boolean;
}

interface FilterOption {
  id: string;
  label: string;
  value: string;
  icon?: React.ElementType;
}

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedPeriod: string;
  setSelectedPeriod: (value: string) => void;
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
  showFilters: boolean;
  showNotifications: boolean;
  refreshing: boolean;
  handleRefresh: () => void;
  unreadCount: number;
  notifications: Notification[];
  handleNotificationRead: (id: string) => void;
  handleExport: () => void;
  filterOptions: FilterOption[];
}

export function DashboardHeader({
  title,
  subtitle,
  searchQuery,
  setSearchQuery,
  selectedPeriod,
  setSelectedPeriod,
  selectedFilter,
  setSelectedFilter,
  showFilters,
  showNotifications,
  refreshing,
  handleRefresh,
  unreadCount,
  notifications,
  handleNotificationRead,
  handleExport,
  filterOptions,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {/* Enhanced Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
        {/* Search Bar */}
        <div className="relative w-full sm:min-w-[200px] sm:max-w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 max-sm:flex-wrap justify-start">
          {/* Time Period Selector */}
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[120px]" icon={Calendar}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter Dropdown */}
          {showFilters && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel icon={Filter}>
                  Filter Options
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={selectedFilter}
                  onValueChange={setSelectedFilter}
                >
                  {filterOptions.map((option) => (
                    <DropdownMenuRadioItem key={option.id} value={option.value}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
          </Button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <Badge
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-ele p-0 text-[10px] flex items-center justify-center"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80">
                <DropdownMenuLabel icon={Bell}>
                  <div className="flex items-center justify-between w-full">
                    <span>Notifications</span>
                    <Badge variant="secondary" size="sm">
                      {unreadCount} new
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="flex-col items-start space-y-1 p-3"
                      onClick={() => handleNotificationRead(notification.id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <p className="text-sm font-medium">
                          {notification.title}
                        </p>
                        <Badge
                          variant={
                            notification.type === "error"
                              ? "destructive"
                              : "outline"
                          }
                          size="sm"
                        >
                          {notification.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem icon={Download} onClick={handleExport}>
                  Export Data
                </DropdownMenuItem>
                <DropdownMenuItem icon={Share2}>
                  Share Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem icon={Maximize2}>
                  Full Screen
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon={Settings}>
                Dashboard Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

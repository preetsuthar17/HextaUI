"use client";

import * as React from "react";
import {
  DashboardHeader,
  StatsGrid,
  RecentActivitySection,
  QuickActionsSection,
  ProgressMetricsSection,
  FooterActions,
  defaultStats,
  defaultActivities,
  defaultQuickActions,
  defaultProgressMetrics,
  filterOptions,
  defaultNotifications,
  type DashboardBlockProps,
  type DashboardSettings,
  type ActivityItem,
} from "./";

/**
 * Enhanced DashboardBlock Component
 *
 * A comprehensive, responsive dashboard block with advanced features:
 * - Interactive filters and time period selection
 * - Working dropdowns with various options
 * - Modal dialogs for detailed views and settings
 * - Real-time notifications system
 * - Advanced statistics with mini progress indicators
 * - Activity feed with user avatars and status indicators
 * - Customizable quick actions with keyboard shortcuts
 * - Progress metrics with trend indicators
 * - Export and sharing capabilities
 * - Responsive grid layout that adapts to all screen sizes
 * - Fully accessible with ARIA attributes and keyboard navigation
 */
export default function DashboardBlock({
  stats = defaultStats,
  activities = defaultActivities,
  quickActions = defaultQuickActions,
  progressMetrics = defaultProgressMetrics,
  title = "Dashboard Overview",
  subtitle = "Monitor your key metrics and recent activities",
  className,
  showFilters = true,
  showSettings = true,
  showNotifications = true,
  enableExport = true,
  compact = false,
}: DashboardBlockProps) {
  // State management
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedPeriod, setSelectedPeriod] = React.useState("24h");
  const [selectedFilter, setSelectedFilter] = React.useState("all");
  const [isLoading, setIsLoading] = React.useState(false);
  const [notifications, setNotifications] =
    React.useState(defaultNotifications);
  const [settings, setSettings] = React.useState<DashboardSettings>({
    autoRefresh: true,
    notifications: true,
    theme: "system",
    layout: "default",
    refreshInterval: 30,
    darkMode: false,
  });

  // Activity filtering logic
  const filteredActivities = React.useMemo(() => {
    let filtered = activities; // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (activity) =>
          activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (activity.user?.name || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by type
    if (selectedFilter !== "all") {
      filtered = filtered.filter(
        (activity) => activity.status === selectedFilter,
      );
    }

    return filtered;
  }, [activities, searchQuery, selectedFilter]); // Utility functions
  const getStatusBadge = React.useCallback(
    (
      status: ActivityItem["status"],
    ): "default" | "destructive" | "secondary" | "outline" | "ghost" => {
      switch (status) {
        case "success":
          return "secondary";
        case "warning":
          return "outline";
        case "error":
          return "destructive";
        case "info":
        default:
          return "default";
      }
    },
    [],
  );

  const formatProgress = React.useCallback(
    (value: number, target: number): number => {
      return Math.round((value / target) * 100);
    },
    [],
  );

  // Event handlers
  const handleRefresh = React.useCallback(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleExport = React.useCallback(() => {
    // Export logic here
    console.log("Exporting dashboard data...");
  }, []);

  const handleNotificationRead = React.useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const handleSettingsChange = React.useCallback(
    (key: keyof DashboardSettings, value: any) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <div
      className={`
        space-y-6 bg-background text-foreground
        ${compact ? "space-y-4 p-3 sm:p-4" : ""} 
        ${className || ""}
      `}
    >
      {" "}
      {/* Header Section */}
      <DashboardHeader
        title={title}
        subtitle={subtitle}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        filterOptions={filterOptions}
        refreshing={isLoading}
        handleRefresh={handleRefresh}
        unreadCount={notifications.filter((n) => !n.read).length}
        notifications={notifications}
        handleNotificationRead={handleNotificationRead}
        showFilters={showFilters}
        showNotifications={showNotifications}
        handleExport={handleExport}
      />
      {/* Stats Grid */}
      <StatsGrid stats={stats} />
      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity Section */}
        <RecentActivitySection
          filteredActivities={filteredActivities}
          getStatusBadge={getStatusBadge}
        />

        <div className="space-y-6 flex flex-col">
          {/* Quick Actions Section */}
          <QuickActionsSection quickActions={quickActions} />

          {/* Progress Metrics Section */}
          <ProgressMetricsSection
            progressMetrics={progressMetrics}
            formatProgress={formatProgress}
            settings={settings}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
      </div>
      {/* Footer Actions */}
      <FooterActions
        enableExport={enableExport}
        handleExport={handleExport}
        showSettings={showSettings}
        settings={settings}
        handleSettingsChange={handleSettingsChange}
      />
    </div>
  );
}

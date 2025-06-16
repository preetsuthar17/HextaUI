// Shared types for Dashboard components

export interface DashboardStat {
  id: string;
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  trend: "up" | "down";
  color?: "default" | "destructive" | "secondary";
  subtitle?: string;
  target?: number;
  current?: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  status: "success" | "warning" | "error" | "info";
  badge?: string;
  user?: {
    name: string;
    avatar?: string;
    initials?: string;
    isOnline?: boolean;
  };
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  variant?: "default" | "outline" | "secondary" | "destructive";
  shortcut?: string;
}

export interface ProgressMetric {
  id: string;
  label: string;
  value: number;
  target: number;
  color?: "default" | "destructive" | "secondary";
  trend?: "up" | "down";
  change?: number;
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  icon?: React.ElementType;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  time: string;
  read: boolean;
}

export interface DashboardSettings {
  refreshInterval: number;
  autoRefresh: boolean;
  notifications: boolean;
  darkMode: boolean;
  layout: "compact" | "default" | "spacious";
  theme: "light" | "dark" | "system";
}

export interface DashboardBlockProps {
  stats?: DashboardStat[];
  activities?: ActivityItem[];
  quickActions?: QuickAction[];
  progressMetrics?: ProgressMetric[];
  title?: string;
  subtitle?: string;
  className?: string;
  showFilters?: boolean;
  showSettings?: boolean;
  showNotifications?: boolean;
  enableExport?: boolean;
  compact?: boolean;
}

import {
  DollarSign,
  Users,
  ShoppingCart,
  Eye,
  Plus,
  BarChart3,
  Download,
  Globe,
  Calendar,
} from "lucide-react";
import type {
  DashboardStat,
  ActivityItem,
  QuickAction,
  ProgressMetric,
  FilterOption,
  Notification,
} from "./types";

// Default Data
export const defaultStats: DashboardStat[] = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: "$45,231.89",
    change: 20.1,
    icon: DollarSign,
    trend: "up",
    subtitle: "vs last month",
    target: 50000,
    current: 45231,
  },
  {
    id: "users",
    title: "Active Users",
    value: "2,350",
    change: 12.5,
    icon: Users,
    trend: "up",
    subtitle: "unique visitors",
    target: 3000,
    current: 2350,
  },
  {
    id: "orders",
    title: "Orders",
    value: "1,234",
    change: -4.3,
    icon: ShoppingCart,
    trend: "down",
    color: "destructive",
    subtitle: "this week",
    target: 1500,
    current: 1234,
  },
  {
    id: "views",
    title: "Page Views",
    value: "89,432",
    change: 8.7,
    icon: Eye,
    trend: "up",
    subtitle: "total impressions",
    target: 100000,
    current: 89432,
  },
];

export const defaultActivities: ActivityItem[] = [
  {
    id: "1",
    title: "New order received",
    description: "Order #12345 from Enterprise Corp - $25,000",
    time: "2 minutes ago",
    status: "success",
    badge: "High Value",
    user: {
      name: "John Doe",
      initials: "JD",
      isOnline: true,
    },
  },
  {
    id: "2",
    title: "Payment processed",
    description: "Stripe payment of $1,234.56 completed successfully",
    time: "5 minutes ago",
    status: "info",
    user: {
      name: "Jane Smith",
      initials: "JS",
      isOnline: true,
    },
  },
  {
    id: "3",
    title: "User registration",
    description: "New premium user: alice@company.com",
    time: "10 minutes ago",
    status: "success",
    badge: "Premium",
    user: {
      name: "Alice Wilson",
      initials: "AW",
      isOnline: false,
    },
  },
];

export const defaultQuickActions: QuickAction[] = [
  {
    id: "new-order",
    title: "Create Order",
    description: "Add a new order to the system",
    icon: Plus,
    shortcut: "⌘+N",
  },
  {
    id: "view-reports",
    title: "Analytics",
    description: "View detailed performance reports",
    icon: BarChart3,
    variant: "outline",
    shortcut: "⌘+R",
  },
  {
    id: "manage-users",
    title: "User Management",
    description: "Manage user accounts and permissions",
    icon: Users,
    variant: "secondary",
    shortcut: "⌘+U",
  },
  {
    id: "export-data",
    title: "Export Data",
    description: "Download reports and analytics",
    icon: Download,
    variant: "outline",
    shortcut: "⌘+E",
  },
];

export const defaultProgressMetrics: ProgressMetric[] = [
  {
    id: "sales-target",
    label: "Sales Target",
    value: 75,
    target: 100,
    trend: "up",
    change: 5.2,
  },
  {
    id: "user-growth",
    label: "User Growth",
    value: 60,
    target: 100,
    trend: "up",
    change: 12.3,
  },
  {
    id: "server-usage",
    label: "Server Usage",
    value: 85,
    target: 100,
    color: "destructive",
    trend: "down",
    change: -2.1,
  },
  {
    id: "satisfaction",
    label: "Customer Satisfaction",
    value: 92,
    target: 100,
    color: "secondary",
    trend: "up",
    change: 3.5,
  },
];

export const filterOptions: FilterOption[] = [
  { id: "all", label: "All Time", value: "all", icon: Globe },
  { id: "today", label: "Today", value: "today", icon: Calendar },
  { id: "week", label: "This Week", value: "week", icon: Calendar },
  { id: "month", label: "This Month", value: "month", icon: Calendar },
  { id: "quarter", label: "This Quarter", value: "quarter", icon: Calendar },
  { id: "year", label: "This Year", value: "year", icon: Calendar },
];

export const defaultNotifications: Notification[] = [
  {
    id: "1",
    title: "System Update",
    message: "New features are now available",
    type: "info",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: "2",
    title: "Payment Received",
    message: "Payment of $2,500 has been processed",
    type: "success",
    time: "15 minutes ago",
    read: false,
  },
  {
    id: "3",
    title: "Server Alert",
    message: "High CPU usage detected on server-01",
    type: "warning",
    time: "1 hour ago",
    read: true,
  },
];

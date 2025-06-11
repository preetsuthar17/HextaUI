import { DashboardBlock } from "@/components/blocks/Dashboard";
import {
  TrendingUp,
  Users,
  DollarSign,
  Package,
  Star,
  MessageSquare,
} from "lucide-react";

// Example of how to use the DashboardBlock component with custom data

export default function DashboardExample() {
  // Custom stats data
  const customStats = [
    {
      id: "sales",
      title: "Total Sales",
      value: "$124,532",
      change: 15.3,
      icon: DollarSign,
      trend: "up" as const,
    },
    {
      id: "customers",
      title: "New Customers",
      value: "1,847",
      change: 8.2,
      icon: Users,
      trend: "up" as const,
    },
    {
      id: "products",
      title: "Products Sold",
      value: "3,421",
      change: -2.1,
      icon: Package,
      trend: "down" as const,
      color: "destructive" as const,
    },
    {
      id: "reviews",
      title: "Customer Reviews",
      value: "847",
      change: 12.7,
      icon: Star,
      trend: "up" as const,
    },
  ];

  // Custom activities
  const customActivities = [
    {
      id: "1",
      title: "Large order completed",
      description: "Enterprise customer order worth $25,000",
      time: "5 minutes ago",
      status: "success" as const,
      badge: "High Value",
    },
    {
      id: "2",
      title: "Product review received",
      description: "5-star review for Premium Package",
      time: "15 minutes ago",
      status: "info" as const,
    },
    {
      id: "3",
      title: "Inventory alert",
      description: "Low stock warning for popular items",
      time: "30 minutes ago",
      status: "warning" as const,
      badge: "Action Required",
    },
  ];

  // Custom quick actions
  const customQuickActions = [
    {
      id: "new-product",
      title: "Add Product",
      description: "Create a new product listing",
      icon: Package,
    },
    {
      id: "customer-support",
      title: "Support Tickets",
      description: "Manage customer inquiries",
      icon: MessageSquare,
      variant: "outline" as const,
    },
    {
      id: "analytics",
      title: "View Analytics",
      description: "Detailed performance metrics",
      icon: TrendingUp,
      variant: "secondary" as const,
    },
  ];

  // Custom progress metrics
  const customProgressMetrics = [
    {
      id: "monthly-goal",
      label: "Monthly Sales Goal",
      value: 82,
      target: 100,
    },
    {
      id: "customer-satisfaction",
      label: "Customer Satisfaction",
      value: 94,
      target: 100,
    },
    {
      id: "inventory-turnover",
      label: "Inventory Turnover",
      value: 67,
      target: 100,
      color: "secondary" as const,
    },
  ];

  return (
    <div className="container">
      <DashboardBlock />

      <div className="my-12" />

      {/* Custom Dashboard */}
      <DashboardBlock
        title="E-commerce Dashboard"
        subtitle="Track your online store performance and customer engagement"
        stats={customStats}
        activities={customActivities}
        quickActions={customQuickActions}
        progressMetrics={customProgressMetrics}
      />
    </div>
  );
}

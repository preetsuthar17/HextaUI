"use client";

import React from "react";
import { DataTable, DataTableColumn } from "../table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Download,
  Eye,
} from "lucide-react";

// Types for our example data
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  avatar?: string;
  phone?: string;
  department?: string;
  lastLogin?: string;
  projects?: number;
  rating?: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
  rating: number;
  sales: number;
  image?: string;
}

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: "pending" | "completed" | "cancelled" | "processing";
  date: string;
  paymentMethod: string;
}

// Sample data
const usersData: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2024-01-15",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    lastLogin: "2024-06-08",
    projects: 5,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Manager",
    status: "active",
    joinDate: "2024-02-20",
    phone: "+1 (555) 987-6543",
    department: "Marketing",
    lastLogin: "2024-06-07",
    projects: 8,
    rating: 4.9,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Developer",
    status: "inactive",
    joinDate: "2024-03-10",
    phone: "+1 (555) 456-7890",
    department: "Engineering",
    lastLogin: "2024-05-20",
    projects: 3,
    rating: 4.5,
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "Designer",
    status: "pending",
    joinDate: "2024-06-01",
    phone: "+1 (555) 321-9876",
    department: "Design",
    lastLogin: "Never",
    projects: 0,
    rating: 0,
  },
  {
    id: "5",
    name: "Alex Brown",
    email: "alex@example.com",
    role: "Developer",
    status: "active",
    joinDate: "2024-04-05",
    phone: "+1 (555) 654-3210",
    department: "Engineering",
    lastLogin: "2024-06-09",
    projects: 7,
    rating: 4.7,
  },
];

const productsData: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 199.99,
    stock: 45,
    status: "in-stock",
    rating: 4.5,
    sales: 234,
  },
  {
    id: "2",
    name: "Smart Watch",
    category: "Electronics",
    price: 299.99,
    stock: 5,
    status: "low-stock",
    rating: 4.8,
    sales: 156,
  },
  {
    id: "3",
    name: "Laptop Stand",
    category: "Accessories",
    price: 49.99,
    stock: 0,
    status: "out-of-stock",
    rating: 4.2,
    sales: 89,
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 129.99,
    stock: 23,
    status: "in-stock",
    rating: 4.7,
    sales: 178,
  },
  {
    id: "5",
    name: "Desk Lamp",
    category: "Home & Office",
    price: 79.99,
    stock: 12,
    status: "in-stock",
    rating: 4.3,
    sales: 67,
  },
];

const ordersData: Order[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    product: "Wireless Headphones",
    amount: 199.99,
    status: "completed",
    date: "2024-06-08",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    product: "Smart Watch",
    amount: 299.99,
    status: "processing",
    date: "2024-06-09",
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    product: "Laptop Stand",
    amount: 49.99,
    status: "pending",
    date: "2024-06-07",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    product: "Mechanical Keyboard",
    amount: 129.99,
    status: "cancelled",
    date: "2024-06-06",
    paymentMethod: "Bank Transfer",
  },
];

// Basic Table Example
export function BasicTable() {
  const columns: DataTableColumn<User>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      filterable: true,
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
      filterable: true,
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      filterable: true,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (value) => {
        const variants = {
          active: "default",
          inactive: "secondary",
          pending: "outline",
        } as const;

        return (
          <Badge variant={variants[value as keyof typeof variants]}>
            {value}
          </Badge>
        );
      },
    },
    {
      key: "joinDate",
      header: "Join Date",
      sortable: true,
    },
  ];

  return (
    <DataTable
      data={usersData}
      columns={columns}
      searchPlaceholder="Search users..."
      itemsPerPage={5}
    />
  );
}

// Advanced Table with Custom Renders
export function AdvancedTable() {
  const columns: DataTableColumn<User>[] = [
    {
      key: "name",
      header: "User",
      sortable: true,
      filterable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <div className="flex items-center justify-center w-full h-full bg-primary text-primary-foreground text-xs font-medium">
              {value.charAt(0)}
            </div>
          </Avatar>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-xs text-muted-foreground">
              {row.department}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      header: "Contact",
      render: (value, row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-3 w-3 text-muted-foreground" />
            {value}
          </div>
          {row.phone && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Phone className="h-3 w-3" />
              {row.phone}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      filterable: true,
      render: (value) => <Badge variant="outline">{value}</Badge>,
    },
    {
      key: "projects",
      header: "Projects",
      sortable: true,
      align: "center",
      render: (value) => <div className="font-medium">{value}</div>,
    },
    {
      key: "rating",
      header: "Rating",
      sortable: true,
      align: "center",
      render: (value) => (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      filterable: true,
      render: (value) => {
        const config = {
          active: {
            variant: "default" as const,
            icon: CheckCircle,
            color: "text-green-600",
          },
          inactive: {
            variant: "secondary" as const,
            icon: XCircle,
            color: "text-gray-500",
          },
          pending: {
            variant: "outline" as const,
            icon: Clock,
            color: "text-yellow-600",
          },
        };

        const {
          variant,
          icon: Icon,
          color,
        } = config[value as keyof typeof config];

        return (
          <Badge variant={variant} className="gap-1">
            <Icon className={`h-3 w-3 ${color}`} />
            {value}
          </Badge>
        );
      },
    },
    {
      key: "id",
      header: "Actions",
      align: "right",
      render: (value, row) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={usersData}
      columns={columns}
      searchPlaceholder="Search users..."
      itemsPerPage={10}
      hoverable
      onRowClick={(row) => console.log("Clicked user:", row.name)}
    />
  );
}

// Products Table
export function ProductsTable() {
  const columns: DataTableColumn<Product>[] = [
    {
      key: "name",
      header: "Product",
      sortable: true,
      filterable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-xs text-muted-foreground">{row.category}</div>
        </div>
      ),
    },
    {
      key: "price",
      header: "Price",
      sortable: true,
      align: "right",
      render: (value) => <div className="font-medium">${value.toFixed(2)}</div>,
    },
    {
      key: "stock",
      header: "Stock",
      sortable: true,
      align: "center",
      render: (value, row) => (
        <div
          className={`font-medium ${
            row.status === "out-of-stock"
              ? "text-red-600"
              : row.status === "low-stock"
                ? "text-yellow-600"
                : "text-green-600"
          }`}
        >
          {value}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      filterable: true,
      render: (value) => {
        const config = {
          "in-stock": {
            variant: "default" as const,
            color: "bg-green-100 text-green-800",
          },
          "low-stock": {
            variant: "outline" as const,
            color: "bg-yellow-100 text-yellow-800",
          },
          "out-of-stock": {
            variant: "secondary" as const,
            color: "bg-red-100 text-red-800",
          },
        };

        const { variant } = config[value as keyof typeof config];

        return <Badge variant={variant}>{value.replace("-", " ")}</Badge>;
      },
    },
    {
      key: "rating",
      header: "Rating",
      sortable: true,
      align: "center",
      render: (value) => (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "sales",
      header: "Sales",
      sortable: true,
      align: "center",
    },
  ];

  return (
    <DataTable
      data={productsData}
      columns={columns}
      searchPlaceholder="Search products..."
      itemsPerPage={8}
      striped
    />
  );
}

// Compact Table
export function CompactTable() {
  const columns: DataTableColumn<Order>[] = [
    {
      key: "id",
      header: "Order ID",
      sortable: true,
    },
    {
      key: "customer",
      header: "Customer",
      sortable: true,
      filterable: true,
    },
    {
      key: "amount",
      header: "Amount",
      sortable: true,
      align: "right",
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      filterable: true,
      render: (value) => {
        const variants = {
          pending: "outline",
          processing: "default",
          completed: "default",
          cancelled: "secondary",
        } as const;

        return (
          <Badge
            variant={variants[value as keyof typeof variants]}
            className="text-xs"
          >
            {value}
          </Badge>
        );
      },
    },
    {
      key: "date",
      header: "Date",
      sortable: true,
    },
  ];

  return (
    <DataTable
      data={ordersData}
      columns={columns}
      size="sm"
      compact
      searchPlaceholder="Search orders..."
      itemsPerPage={5}
      showPagination={false}
    />
  );
}

// Minimal Table
export function MinimalTable() {
  const columns: DataTableColumn<User>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "active"
              ? "bg-green-100 text-green-800"
              : value === "inactive"
                ? "bg-gray-100 text-gray-800"
                : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      data={usersData.slice(0, 3)}
      columns={columns}
      variant="minimal"
      searchable={false}
      showPagination={false}
      hoverable
    />
  );
}

// Loading State
export function LoadingTable() {
  return (
    <DataTable
      data={[]}
      columns={[]}
      loading={true}
      searchPlaceholder="Search..."
    />
  );
}

// Empty State
export function EmptyTable() {
  const columns: DataTableColumn<User>[] = [
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email", sortable: true },
    { key: "role", header: "Role", sortable: true },
    { key: "status", header: "Status" },
  ];

  return (
    <DataTable
      data={[]}
      columns={columns}
      emptyMessage="No users found"
      emptyIcon="👥"
      searchPlaceholder="Search users..."
    />
  );
}

"use client";

import { Check, Lock, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

export type PermissionAction =
  | "view"
  | "create"
  | "edit"
  | "delete"
  | "manage_members"
  | "manage_settings"
  | "manage_billing"
  | "view_analytics"
  | "manage_ai_rooms"
  | "manage_files"
  | "manage_projects";

export type PermissionRole = "owner" | "admin" | "member" | "viewer";

export interface Permission {
  action: PermissionAction;
  label: string;
  description?: string;
  category: string;
}

export interface RolePermissions {
  role: PermissionRole;
  permissions: Record<PermissionAction, boolean>;
}

export interface TeamPermissionsMatrixProps {
  permissions?: Permission[];
  rolePermissions?: RolePermissions[];
  onPermissionChange?: (
    role: PermissionRole,
    action: PermissionAction,
    enabled: boolean
  ) => Promise<void>;
  className?: string;
  showPresets?: boolean;
}

const DEFAULT_PERMISSIONS: Permission[] = [
  {
    action: "view",
    label: "View Content",
    description: "View team content and resources",
    category: "General",
  },
  {
    action: "create",
    label: "Create Content",
    description: "Create new content and resources",
    category: "General",
  },
  {
    action: "edit",
    label: "Edit Content",
    description: "Edit existing content",
    category: "General",
  },
  {
    action: "delete",
    label: "Delete Content",
    description: "Delete content and resources",
    category: "General",
  },
  {
    action: "manage_members",
    label: "Manage Members",
    description: "Invite, remove, and change member roles",
    category: "Team Management",
  },
  {
    action: "manage_settings",
    label: "Manage Settings",
    description: "Change team settings and configuration",
    category: "Team Management",
  },
  {
    action: "manage_billing",
    label: "Manage Billing",
    description: "View and manage billing information",
    category: "Team Management",
  },
  {
    action: "view_analytics",
    label: "View Analytics",
    description: "View team usage and analytics",
    category: "Analytics",
  },
  {
    action: "manage_ai_rooms",
    label: "Manage AI Rooms",
    description: "Create and manage shared AI workspaces",
    category: "AI Features",
  },
  {
    action: "manage_files",
    label: "Manage Files",
    description: "Upload, organize, and delete files",
    category: "Files",
  },
  {
    action: "manage_projects",
    label: "Manage Projects",
    description: "Create and manage team projects",
    category: "Projects",
  },
];

const DEFAULT_ROLE_PERMISSIONS: RolePermissions[] = [
  {
    role: "owner",
    permissions: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      manage_members: true,
      manage_settings: true,
      manage_billing: true,
      view_analytics: true,
      manage_ai_rooms: true,
      manage_files: true,
      manage_projects: true,
    },
  },
  {
    role: "admin",
    permissions: {
      view: true,
      create: true,
      edit: true,
      delete: true,
      manage_members: true,
      manage_settings: false,
      manage_billing: false,
      view_analytics: true,
      manage_ai_rooms: true,
      manage_files: true,
      manage_projects: true,
    },
  },
  {
    role: "member",
    permissions: {
      view: true,
      create: true,
      edit: true,
      delete: false,
      manage_members: false,
      manage_settings: false,
      manage_billing: false,
      view_analytics: false,
      manage_ai_rooms: true,
      manage_files: true,
      manage_projects: true,
    },
  },
  {
    role: "viewer",
    permissions: {
      view: true,
      create: false,
      edit: false,
      delete: false,
      manage_members: false,
      manage_settings: false,
      manage_billing: false,
      view_analytics: false,
      manage_ai_rooms: false,
      manage_files: false,
      manage_projects: false,
    },
  },
];

function getRoleLabel(role: PermissionRole): string {
  switch (role) {
    case "owner":
      return "Owner";
    case "admin":
      return "Admin";
    case "member":
      return "Member";
    case "viewer":
      return "Viewer";
  }
}

function getRoleBadgeVariant(role: PermissionRole) {
  switch (role) {
    case "owner":
      return "default";
    case "admin":
      return "secondary";
    default:
      return "outline";
  }
}

export default function TeamPermissionsMatrix({
  permissions = DEFAULT_PERMISSIONS,
  rolePermissions = DEFAULT_ROLE_PERMISSIONS,
  onPermissionChange,
  className,
  showPresets = true,
}: TeamPermissionsMatrixProps) {
  const [localRolePermissions, setLocalRolePermissions] =
    useState<RolePermissions[]>(rolePermissions);

  const groupedPermissions = permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    },
    {} as Record<string, Permission[]>
  );

  const handlePermissionToggle = async (
    role: PermissionRole,
    action: PermissionAction,
    currentValue: boolean
  ) => {
    // Owner role cannot be modified
    if (role === "owner") return;

    const newValue = !currentValue;
    setLocalRolePermissions((prev) =>
      prev.map((rp) => {
        if (rp.role === role) {
          return {
            ...rp,
            permissions: {
              ...rp.permissions,
              [action]: newValue,
            },
          };
        }
        return rp;
      })
    );

    try {
      await onPermissionChange?.(role, action, newValue);
    } catch {
      // Revert on error
      setLocalRolePermissions((prev) =>
        prev.map((rp) => {
          if (rp.role === role) {
            return {
              ...rp,
              permissions: {
                ...rp.permissions,
                [action]: currentValue,
              },
            };
          }
          return rp;
        })
      );
    }
  };

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Permissions Matrix</CardTitle>
          <CardDescription>
            Manage what each role can do in your team
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {Object.entries(groupedPermissions).map(([category, perms]) => (
            <div className="flex flex-col gap-3" key={category}>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-muted-foreground text-sm">
                  {category}
                </h3>
                <Separator className="flex-1" />
              </div>
              <div className="flex flex-col gap-2">
                {perms.map((permission) => (
                  <div
                    className="flex flex-col gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
                    key={permission.action}
                  >
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="wrap-break-word font-medium text-sm">
                        {permission.label}
                      </span>
                      {permission.description && (
                        <span className="wrap-break-word text-muted-foreground text-xs">
                          {permission.description}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      {localRolePermissions.map((rp) => {
                        const hasPermission = rp.permissions[permission.action];
                        const isOwner = rp.role === "owner";

                        return (
                          <div
                            className="flex items-center gap-2"
                            key={rp.role}
                          >
                            <Badge variant={getRoleBadgeVariant(rp.role)}>
                              {getRoleLabel(rp.role)}
                            </Badge>
                            {isOwner ? (
                              <div className="flex items-center justify-center">
                                <Lock className="size-4 text-muted-foreground" />
                              </div>
                            ) : (
                              <Toggle
                                aria-label={`${permission.label} for ${getRoleLabel(rp.role)}`}
                                aria-pressed={hasPermission}
                                onPressedChange={() =>
                                  handlePermissionToggle(
                                    rp.role,
                                    permission.action,
                                    hasPermission
                                  )
                                }
                                pressed={hasPermission}
                                size="sm"
                              >
                                {hasPermission ? (
                                  <Check className="size-4" />
                                ) : (
                                  <X className="size-4" />
                                )}
                              </Toggle>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

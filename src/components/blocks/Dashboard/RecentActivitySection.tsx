"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import {
  Eye,
  MoreHorizontal,
  ArrowUpRight,
  RefreshCw,
  Filter,
  Download,
  Settings,
  Activity,
  AlertTriangle,
  Copy,
  Share2,
} from "lucide-react";

interface ActivityItem {
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

interface RecentActivitySectionProps {
  filteredActivities: ActivityItem[];
  getStatusBadge: (
    status: ActivityItem["status"],
  ) => "default" | "destructive" | "secondary" | "outline" | "ghost";
}

export function RecentActivitySection({
  filteredActivities,
  getStatusBadge,
}: RecentActivitySectionProps) {
  return (
    <Card className="lg:col-span-2 border border-border/50 hover:border-border transition-colors duration-200 bg-card text-card-foreground p-0">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-foreground">
              Recent Activity
            </h3>
            <p className="text-sm text-muted-foreground">
              Latest updates and events from your system
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Badge variant="outline" className="font-medium text-xs px-2 py-1">
              {filteredActivities.length} items
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem icon={RefreshCw}>Refresh</DropdownMenuItem>
                <DropdownMenuItem icon={Filter}>
                  Filter Activities
                </DropdownMenuItem>
                <DropdownMenuItem icon={Download}>Export List</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon={Settings}>
                  Activity Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>{" "}
        <div className="space-y-3">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="group p-4 rounded-ele border border-border hover:border-border/80 bg-background hover:bg-accent/50 transition-colors duration-200"
            >
              <div className="flex items-start gap-3">
                {/* Simple Avatar */}
                {activity.user && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage
                      src={activity.user.avatar}
                      alt={activity.user.name}
                    />
                    <AvatarFallback className="text-xs">
                      {activity.user.initials}
                    </AvatarFallback>
                  </Avatar>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm text-foreground truncate">
                          {activity.title}
                        </h4>
                        {activity.badge && (
                          <Badge
                            variant={getStatusBadge(activity.status)}
                            className="text-xs px-2 py-0.5"
                          >
                            {activity.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {activity.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                          >
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem icon={Eye}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem icon={Copy}>
                            Copy Link
                          </DropdownMenuItem>
                          <DropdownMenuItem icon={Share2}>
                            Share
                          </DropdownMenuItem>
                          {activity.status === "error" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                icon={AlertTriangle}
                                variant="destructive"
                              >
                                Report Issue
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Simple Footer */}
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span>{activity.time}</span>
                      {activity.user && (
                        <>
                          <span>•</span>
                          <span>{activity.user.name}</span>
                        </>
                      )}
                    </div>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "warning"
                            ? "bg-yellow-500"
                            : activity.status === "error"
                              ? "bg-red-500"
                              : "bg-blue-500"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>{" "}
        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-muted rounded-ele flex items-center justify-center mx-auto mb-4">
              <Activity className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No activities found
            </h3>
            <p className="text-sm text-muted-foreground">
              No activities match your current filters.
            </p>
          </div>
        )}{" "}
        <div className="mt-6 pt-4 border-t">
          <Button variant="outline" className="w-full">
            View All Activities
            <ArrowUpRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

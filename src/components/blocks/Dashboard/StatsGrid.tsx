"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";

interface DashboardStat {
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

interface StatsGridProps {
  stats: DashboardStat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;

        return (
          <Card
            key={stat.id}
            className="p-6 hover: transition-shadow duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-muted rounded-lg">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>View Trends</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <p className="text-2xl font-bold">{stat.value}</p>

              {/* Trend */}
              <div className="flex items-center gap-2 text-sm">
                <div
                  className={`flex items-center gap-1 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <TrendIcon className="h-3 w-3" />
                  <span>{Math.abs(stat.change)}%</span>
                </div>
                <span className="text-muted-foreground text-xs">
                  vs last month
                </span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

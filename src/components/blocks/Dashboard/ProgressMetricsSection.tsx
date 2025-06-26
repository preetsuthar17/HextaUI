"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import {
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  BarChart3,
  PieChart,
  Download,
  Settings,
} from "lucide-react";

interface ProgressMetric {
  id: string;
  label: string;
  value: number;
  target: number;
  color?: "default" | "destructive" | "secondary";
  trend?: "up" | "down";
  change?: number;
}

interface DashboardSettings {
  refreshInterval: number;
  autoRefresh: boolean;
  notifications: boolean;
  darkMode: boolean;
  layout: "compact" | "default" | "spacious";
  theme: "light" | "dark" | "system";
}

interface ProgressMetricsSectionProps {
  progressMetrics: ProgressMetric[];
  formatProgress: (value: number, target: number) => number;
  settings: DashboardSettings;
  handleSettingsChange: (key: keyof DashboardSettings, value: any) => void;
}

export function ProgressMetricsSection({
  progressMetrics,
  formatProgress,
  settings,
  handleSettingsChange,
}: ProgressMetricsSectionProps) {
  return (
    <Card className="p-4 sm:p-6 flex flex-col grow bg-card text-card-foreground">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Key Metrics</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem icon={BarChart3}>View Charts</DropdownMenuItem>
            <DropdownMenuItem icon={PieChart}>Analytics</DropdownMenuItem>
            <DropdownMenuItem icon={Download}>Export Metrics</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={Settings}>
              Configure Metrics
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4">
        {progressMetrics.map((metric) => (
          <div key={metric.id} className="space-y-2 group">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">
                {metric.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {formatProgress(metric.value, metric.target)}%
                </span>
                {metric.trend && (
                  <div className="flex items-center gap-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                    <span
                      className={`text-xs ${
                        metric.trend === "up"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {metric.change}%
                    </span>
                  </div>
                )}
              </div>
            </div>
            <Progress
              value={formatProgress(metric.value, metric.target)}
              variant={metric.color}
              className="h-2 transition-all"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                {metric.value} / {metric.target}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Settings Toggle */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Auto-refresh metrics</span>
          <Switch
            checked={settings.autoRefresh}
            onCheckedChange={(checked) =>
              handleSettingsChange("autoRefresh", checked)
            }
            size="sm"
          />
        </div>
      </div>
    </Card>
  );
}

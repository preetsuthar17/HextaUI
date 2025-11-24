"use client";

import { CheckCircle2, Target, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Progress } from "@/registry/new-york/ui/progress";
import type { Task } from "./task-list";

export interface TaskProgressProps {
  tasks?: Task[];
  goal?: number;
  period?: "day" | "week" | "month" | "all";
  className?: string;
  showBreakdown?: boolean;
  showTrend?: boolean;
}

export default function TaskProgress({
  tasks = [],
  goal,
  period = "all",
  className,
  showBreakdown = true,
  showTrend = true,
}: TaskProgressProps) {
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "done").length;
    const inProgress = tasks.filter((t) => t.status === "in_progress").length;
    const todo = tasks.filter((t) => t.status === "todo").length;
    const cancelled = tasks.filter((t) => t.status === "cancelled").length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    return {
      total,
      completed,
      inProgress,
      todo,
      cancelled,
      completionRate,
    };
  }, [tasks]);

  const progressPercentage = goal
    ? Math.min((stats.completed / goal) * 100, 100)
    : stats.completionRate;

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Progress Overview</CardTitle>
          <CardDescription>
            {stats.completed} of {stats.total} tasks completed
            {goal && ` (Goal: ${goal})`}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                Overall Progress
              </span>
              <span className="font-semibold text-sm">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <Progress className="h-2" value={progressPercentage} />
            {goal && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {stats.completed} / {goal} completed
                </span>
                {stats.completed >= goal && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Target className="size-3" />
                    Goal achieved!
                  </div>
                )}
              </div>
            )}
          </div>

          {showBreakdown && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-2 rounded-lg border bg-card p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-600" />
                  <span className="text-muted-foreground text-xs">
                    Completed
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-semibold text-2xl">
                    {stats.completed}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    ({Math.round((stats.completed / stats.total) * 100) || 0}%)
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 rounded-lg border bg-card p-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-blue-600" />
                  <span className="text-muted-foreground text-xs">
                    In Progress
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-semibold text-2xl">
                    {stats.inProgress}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    ({Math.round((stats.inProgress / stats.total) * 100) || 0}%)
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 rounded-lg border bg-card p-3">
                <div className="flex items-center gap-2">
                  <Target className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-xs">To Do</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-semibold text-2xl">{stats.todo}</span>
                  <span className="text-muted-foreground text-xs">
                    ({Math.round((stats.todo / stats.total) * 100) || 0}%)
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 rounded-lg border bg-card p-3">
                <div className="flex items-center gap-2">
                  <Target className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-xs">Total</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-semibold text-2xl">{stats.total}</span>
                  <span className="text-muted-foreground text-xs">tasks</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

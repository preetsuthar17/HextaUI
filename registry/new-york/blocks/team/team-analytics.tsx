"use client";

import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar";
import { Badge } from "@/registry/new-york/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Progress } from "@/registry/new-york/ui/progress";
import { Separator } from "@/registry/new-york/ui/separator";

export interface AnalyticsDataPoint {
  date: Date;
  value: number;
  category?: string;
}

export interface MemberUsage {
  id: string;
  name: string;
  avatar?: string;
  tokens: number;
  sessions: number;
  files: number;
}

export interface TeamAnalyticsProps {
  period?: "7d" | "30d" | "90d" | "all";
  tokenUsage?: {
    current: number;
    previous: number;
    dataPoints?: AnalyticsDataPoint[];
  };
  sessionCount?: {
    current: number;
    previous: number;
    dataPoints?: AnalyticsDataPoint[];
  };
  memberUsage?: MemberUsage[];
  topProjects?: {
    id: string;
    name: string;
    usage: number;
  }[];
  className?: string;
}

function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

function calculateChange(
  current: number,
  previous: number
): {
  percentage: number;
  isIncrease: boolean;
} {
  if (previous === 0) {
    return { percentage: current > 0 ? 100 : 0, isIncrease: current > 0 };
  }
  const change = ((current - previous) / previous) * 100;
  return {
    percentage: Math.abs(change),
    isIncrease: change > 0,
  };
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TeamAnalytics({
  period = "30d",
  tokenUsage,
  sessionCount,
  memberUsage = [],
  topProjects = [],
  className,
}: TeamAnalyticsProps) {
  const tokenChange = tokenUsage
    ? calculateChange(tokenUsage.current, tokenUsage.previous)
    : null;

  const sessionChange = sessionCount
    ? calculateChange(sessionCount.current, sessionCount.previous)
    : null;

  const sortedMemberUsage = [...memberUsage]
    .sort((a, b) => b.tokens - a.tokens)
    .slice(0, 5);

  const sortedProjects = [...topProjects]
    .sort((a, b) => b.usage - a.usage)
    .slice(0, 5);

  const maxMemberTokens = Math.max(...memberUsage.map((m) => m.tokens), 1);

  return (
    <div className={cn("flex w-full flex-col gap-6", className)}>
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {tokenUsage && (
          <Card className="gap-4 shadow-xs">
            <CardHeader>
              <CardTitle className="font-medium text-sm">AI Tokens</CardTitle>
              <CardDescription className="text-muted-foreground">
                Total AI tokens used
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-2xl">
                  {formatNumber(tokenUsage.current)}
                </span>
                {tokenChange && (
                  <div
                    className={cn(
                      "flex items-center gap-1 text-xs",
                      tokenChange.isIncrease ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {tokenChange.isIncrease ? (
                      <ArrowUp className="size-3" />
                    ) : (
                      <ArrowDown className="size-3" />
                    )}
                    {tokenChange.percentage.toFixed(1)}%
                  </div>
                )}
              </div>
              <p className="text-muted-foreground text-xs">
                vs previous period
              </p>
            </CardContent>
          </Card>
        )}

        {sessionCount && (
          <Card className="gap-4 shadow-xs">
            <CardHeader>
              <CardTitle className="font-medium text-sm">AI Sessions</CardTitle>
              <CardDescription className="text-muted-foreground">
                Total AI sessions used
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-2xl">
                  {sessionCount.current}
                </span>
                {sessionChange && (
                  <div
                    className={cn(
                      "flex items-center gap-1 text-xs",
                      sessionChange.isIncrease
                        ? "text-green-600"
                        : "text-red-600"
                    )}
                  >
                    {sessionChange.isIncrease ? (
                      <ArrowUp className="size-3" />
                    ) : (
                      <ArrowDown className="size-3" />
                    )}
                    {sessionChange.percentage.toFixed(1)}%
                  </div>
                )}
              </div>
              <p className="text-muted-foreground text-xs">
                vs previous period
              </p>
            </CardContent>
          </Card>
        )}

        <Card className="gap-4 shadow-xs">
          <CardHeader>
            <CardTitle className="font-medium text-sm">
              Active Members
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Total active members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-2xl">
                {memberUsage.length}
              </span>
            </div>
            <p className="text-muted-foreground text-xs">
              Members with activity
            </p>
          </CardContent>
        </Card>

        <Card className="gap-4 shadow-xs">
          <CardHeader>
            <CardTitle className="font-medium text-sm">Projects</CardTitle>
            <CardDescription className="text-muted-foreground">
              Total projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-2xl">
                {topProjects.length}
              </span>
            </div>
            <p className="text-muted-foreground text-xs">Active projects</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Members */}
        {sortedMemberUsage.length > 0 && (
          <Card className="gap-4 shadow-xs">
            <CardHeader>
              <CardTitle>Top Members by Usage</CardTitle>
              <CardDescription>Most active team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {sortedMemberUsage.map((member) => {
                  const percentage = (member.tokens / maxMemberTokens) * 100;
                  return (
                    <div className="flex flex-col gap-2" key={member.id}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="size-8">
                            <AvatarImage
                              alt={member.name}
                              src={member.avatar}
                            />
                            <AvatarFallback className="text-xs">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">
                              {member.name}
                            </span>
                            <span className="text-muted-foreground text-xs">
                              {member.sessions} session
                              {member.sessions !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-medium text-sm">
                            {formatNumber(member.tokens)}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            tokens
                          </span>
                        </div>
                      </div>
                      <Progress value={percentage} />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top Projects */}
        {sortedProjects.length > 0 && (
          <Card className="shadow-xs">
            <CardHeader>
              <CardTitle>Top Projects</CardTitle>
              <CardDescription>Most active projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {sortedProjects.map((project, idx) => {
                  const maxUsage = Math.max(
                    ...sortedProjects.map((p) => p.usage),
                    1
                  );
                  const percentage = (project.usage / maxUsage) * 100;
                  return (
                    <div key={project.id}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                            <TrendingUp className="size-4 text-primary" />
                          </div>
                          <span className="font-medium text-sm">
                            {project.name}
                          </span>
                        </div>
                        <Badge variant="secondary">
                          {formatNumber(project.usage)} tokens
                        </Badge>
                      </div>
                      {idx < sortedProjects.length - 1 && (
                        <Separator className="mt-3" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

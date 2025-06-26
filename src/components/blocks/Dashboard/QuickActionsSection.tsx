"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Plus, Edit, Settings } from "lucide-react";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  variant?: "default" | "outline" | "secondary" | "destructive";
  shortcut?: string;
}

interface QuickActionsSectionProps {
  quickActions: QuickAction[];
}

export function QuickActionsSection({
  quickActions,
}: QuickActionsSectionProps) {
  return (
    <Card className="p-4 sm:p-6 grow bg-card text-card-foreground">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem icon={Plus}>Add Action</DropdownMenuItem>
            <DropdownMenuItem icon={Edit}>Customize</DropdownMenuItem>
            <DropdownMenuItem icon={Settings}>Manage Actions</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.id}
              variant={action.variant || "outline"}
              className="h-auto p-3 justify-start group hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center gap-3 w-full">
                <Icon className="h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-left flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">
                    {action.title}
                  </div>
                  <div className="text-xs opacity-70 line-clamp-1">
                    {action.description}
                  </div>
                </div>
                {action.shortcut && (
                  <Badge
                    variant="ghost"
                    size="sm"
                    className="text-xs flex-shrink-0 hidden sm:inline-flex"
                  >
                    {action.shortcut}
                  </Badge>
                )}
              </div>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}

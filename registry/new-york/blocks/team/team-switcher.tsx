"use client";

import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar";
import { Badge } from "@/registry/new-york/ui/badge";
import { Button } from "@/registry/new-york/ui/button";
import {
  CommandMenuEmpty,
  CommandMenuInput,
  CommandMenuItem,
  CommandMenuList,
  CommandMenuProvider,
  CommandMenuSeparator,
} from "@/registry/new-york/ui/command-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover";

export interface Team {
  id: string;
  name: string;
  avatar?: string;
  plan?: "free" | "pro" | "enterprise";
  memberCount?: number;
  isPersonal?: boolean;
}

export interface TeamSwitcherProps {
  teams?: Team[];
  currentTeamId?: string;
  onTeamSelect?: (teamId: string) => void;
  onCreateTeam?: () => void;
  className?: string;
  showPlan?: boolean;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getPlanBadgeVariant(plan?: Team["plan"]) {
  switch (plan) {
    case "enterprise":
      return "default";
    case "pro":
      return "secondary";
    default:
      return "outline";
  }
}

export default function TeamSwitcher({
  teams = [],
  currentTeamId,
  onTeamSelect,
  onCreateTeam,
  className,
  showPlan = true,
}: TeamSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentTeam = teams.find((t) => t.id === currentTeamId) || teams[0];
  const otherTeams = teams.filter((t) => t.id !== currentTeamId);

  const filteredTeams = otherTeams.filter((team) => {
    if (!searchValue.trim()) return true;
    const query = searchValue.toLowerCase();
    return team.name.toLowerCase().includes(query);
  });

  const handleSelect = (teamId: string) => {
    onTeamSelect?.(teamId);
    setOpen(false);
    setSearchValue("");
  };

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-label="Switch team"
          className={cn("justify-between gap-2", className)}
          type="button"
          variant="outline"
        >
          <div className="flex items-center gap-2">
            <Avatar className="size-5">
              <AvatarImage alt={currentTeam?.name} src={currentTeam?.avatar} />
              <AvatarFallback className="text-xs">
                {currentTeam ? getInitials(currentTeam.name) : "T"}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">
              {currentTeam?.name || "Select team"}
            </span>
            {showPlan && currentTeam?.plan && (
              <Badge
                className="text-xs"
                variant={getPlanBadgeVariant(currentTeam.plan)}
              >
                {currentTeam.plan}
              </Badge>
            )}
          </div>
          <ChevronsUpDown className="size-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[280px] p-0">
        <CommandMenuProvider
          scrollHideDelay={600}
          scrollType="hover"
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setValue={setSearchValue}
          value={searchValue}
        >
          <CommandMenuInput placeholder="Search teams…" />
          <CommandMenuList>
            {currentTeam && (
              <>
                <CommandMenuItem
                  className="rounded"
                  index={0}
                  onSelect={() => handleSelect(currentTeam.id)}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage
                        alt={currentTeam.name}
                        src={currentTeam.avatar}
                      />
                      <AvatarFallback className="text-xs">
                        {getInitials(currentTeam.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="font-medium text-sm">
                        {currentTeam.name}
                      </span>
                      {currentTeam.memberCount !== undefined && (
                        <span className="text-muted-foreground text-xs">
                          {currentTeam.memberCount} member
                          {currentTeam.memberCount !== 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    <Check className="size-4 text-primary" />
                  </div>
                </CommandMenuItem>
                {otherTeams.length > 0 && <CommandMenuSeparator />}
              </>
            )}
            {filteredTeams.length === 0 ? (
              <CommandMenuEmpty>No teams found</CommandMenuEmpty>
            ) : (
              filteredTeams.map((team, index) => (
                <CommandMenuItem
                  className="rounded"
                  index={index}
                  key={team.id}
                  onSelect={() => handleSelect(team.id)}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage alt={team.name} src={team.avatar} />
                      <AvatarFallback className="text-xs">
                        {getInitials(team.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="font-medium text-sm">{team.name}</span>
                      {team.memberCount !== undefined && (
                        <span className="text-muted-foreground text-xs">
                          {team.memberCount} member
                          {team.memberCount !== 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    {showPlan && team.plan && (
                      <Badge
                        className="text-xs"
                        variant={getPlanBadgeVariant(team.plan)}
                      >
                        {team.plan}
                      </Badge>
                    )}
                  </div>
                </CommandMenuItem>
              ))
            )}
            {onCreateTeam && (
              <>
                <CommandMenuSeparator />
                <CommandMenuItem
                  icon={<Plus className="size-4" />}
                  index={filteredTeams.length}
                  onSelect={onCreateTeam}
                >
                  Create new team
                </CommandMenuItem>
              </>
            )}
          </CommandMenuList>
        </CommandMenuProvider>
      </PopoverContent>
    </Popover>
  );
}

"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarText,
} from "./sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../DropdownMenu";
import { Badge } from "../badge";
import { Button } from "../button";
import { Avatar, AvatarImage, AvatarFallback } from "../avatar";
import { cn } from "@/lib/utils";
import {
  Home,
  Search,
  Settings,
  User,
  Bell,
  FileText,
  Folder,
  Plus,
  ChevronDown,
  LogOut,
  Users,
  Briefcase,
  BarChart3,
  Calendar,
  Mail,
  Shield,
  HelpCircle,
  Moon,
  CheckCircle,
  Archive,
} from "lucide-react";

// Basic Sidebar Example
export function SidebarBasic() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="relative h-[40rem] w-full flex overflow-hidden rounded-ele border border-border">
      <Sidebar
        position="relative"
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      >
        <SidebarHeader>
          <img
            className="rounded-ele bg-background border border-border shrink-0"
            src="https://api.dicebear.com/9.x/glass/svg?seed=Sara"
            width={35}
            height={35}
          />
          <SidebarText className="font-semibold text-lg">HextaUI</SidebarText>
        </SidebarHeader>

        <SidebarBody>
          <SidebarItem id="home" label="Home" icon={Home} />
          <SidebarItem id="search" label="Search" icon={Search} />
          <SidebarItem id="documents" label="Documents" icon={FileText} />
          <SidebarItem id="settings" label="Settings" icon={Settings} />
        </SidebarBody>
      </Sidebar>

      <SidebarContent
        sidebarCollapsed={collapsed}
        position="relative"
        className="p-6"
      >
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Welcome to HextaUI</h1>
          <p className="text-muted-foreground">
            This is the main content area. The sidebar will affect the width of
            this content.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-ele bg-accent">
              <h3 className="font-medium">Card 1</h3>
              <p className="text-sm text-muted-foreground">Some content here</p>
            </div>
            <div className="p-4 rounded-ele bg-accent">
              <h3 className="font-medium">Card 2</h3>
              <p className="text-sm text-muted-foreground">Some content here</p>
            </div>
          </div>
        </div>
      </SidebarContent>
    </div>
  );
}

// Sidebar with Profile and Dropdown
export function SidebarWithProfile() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="relative h-[40rem] w-full flex overflow-hidden rounded-ele border border-border">
      <Sidebar
        position="relative"
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      >
        <SidebarHeader>
          <img
            className="rounded-ele bg-background border border-border shrink-0"
            src="https://api.dicebear.com/9.x/glass/svg?seed=Sara"
            width={35}
            height={35}
          />
          <SidebarText className="font-semibold text-lg">HextaUI</SidebarText>
        </SidebarHeader>

        <SidebarBody>
          <SidebarItem id="dashboard" label="Dashboard" icon={Home} />
          <SidebarItem
            id="projects"
            label="Projects"
            icon={Folder}
            badge={
              <Badge variant="secondary" size="sm">
                12
              </Badge>
            }
          />
          <SidebarItem id="analytics" label="Analytics" icon={BarChart3} />
          <SidebarItem id="calendar" label="Calendar" icon={Calendar} />
          <SidebarItem
            id="mail"
            label="Mail"
            icon={Mail}
            badge={
              <Badge variant="destructive" size="sm">
                3
              </Badge>
            }
          />
        </SidebarBody>

        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full gap-2",
                  collapsed
                    ? "h-10 w-10 p-0 justify-center"
                    : "justify-start p-2",
                )}
              >
                <Avatar className="h-6 w-6 shrink-0">
                  <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=Sara" />
                  <AvatarFallback>MI</AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <>
                    <div className="flex flex-col items-start flex-1 min-w-0 overflow-hidden">
                      <span className="text-sm font-medium truncate">
                        Micah Smith
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        micah@example.com
                      </span>
                    </div>
                    <ChevronDown size={14} className="shrink-0" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon={User}>Profile</DropdownMenuItem>
              <DropdownMenuItem icon={Settings}>Settings</DropdownMenuItem>
              <DropdownMenuItem icon={Bell}>Notifications</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon={LogOut} variant="destructive">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarContent
        sidebarCollapsed={collapsed}
        position="relative"
        className="p-6"
      >
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your dashboard overview.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-ele bg-accent">
              <h3 className="font-medium">Projects</h3>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="p-4 rounded-ele bg-accent">
              <h3 className="font-medium">Tasks</h3>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </div>
      </SidebarContent>
    </div>
  );
}

// Sidebar with Team/Project Selector
export function SidebarWithTeamSelector() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState("HextaUI");

  const teams = [
    { id: "Personal", name: "Personal", role: "Owner" },
    { id: "HextaStudio", name: "HextaStudio", role: "Member" },
    { id: "HextaUI", name: "HextaUI", role: "Admin" },
  ];

  return (
    <div className="relative h-[40rem] w-full flex overflow-hidden rounded-ele border border-border">
      <Sidebar
        position="relative"
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      >
        <SidebarHeader>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full gap-2",
                  collapsed
                    ? "h-10 w-10 p-0 justify-center"
                    : "justify-start p-2",
                )}
              >
                <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
                  {teams.find((t) => t.id === selectedTeam)?.name.charAt(0)}
                </div>
                {!collapsed && (
                  <>
                    <SidebarText className="font-semibold text-lg flex-1 text-left">
                      {teams.find((t) => t.id === selectedTeam)?.name}
                    </SidebarText>
                    <ChevronDown size={14} className="shrink-0" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Switch Team</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {teams.map((team) => (
                <DropdownMenuItem
                  key={team.id}
                  onClick={() => setSelectedTeam(team.id)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="h-6 w-6 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                      {team.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{team.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {team.role}
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem icon={Plus}>Create Team</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarHeader>

        <SidebarBody>
          <SidebarItem id="overview" label="Overview" icon={Home} />
          <SidebarItem id="projects" label="Projects" icon={Folder}>
            <SidebarItem
              id="active-projects"
              label="Active"
              icon={CheckCircle}
            />
            <SidebarItem
              id="archived-projects"
              label="Archived"
              icon={Archive}
            />
            <SidebarItem id="draft-projects" label="Drafts" icon={FileText} />
          </SidebarItem>
          <SidebarItem id="team" label="Team" icon={Users} />
          <SidebarItem id="analytics" label="Analytics" icon={BarChart3} />
        </SidebarBody>
      </Sidebar>

      <SidebarContent
        sidebarCollapsed={collapsed}
        position="relative"
        className="p-6"
      >
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">
            {teams.find((t) => t.id === selectedTeam)?.name} Overview
          </h1>
          <p className="text-muted-foreground">
            Manage your team projects and settings.
          </p>
        </div>
      </SidebarContent>
    </div>
  );
}

// Advanced Sidebar with All Features
export function SidebarAdvanced() {
  const [collapsed, setCollapsed] = React.useState(false);

  const adminItems = [
    { id: "admin", label: "Admin", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ];

  return (
    <div className="relative h-[40rem] w-full flex overflow-hidden rounded-ele border border-border">
      <Sidebar
        position="relative"
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      >
        <SidebarHeader>
          <img
            className="rounded-ele bg-background border border-border shrink-0"
            src="https://api.dicebear.com/9.x/glass/svg?seed=Sara"
            width={35}
            height={35}
          />
          <SidebarText className="font-semibold text-lg">HextaUI</SidebarText>
        </SidebarHeader>

        <SidebarBody>
          <SidebarItem id="dashboard" label="Dashboard" icon={Home} />
          <SidebarItem id="workspace" label="Workspace" icon={Briefcase}>
            <SidebarItem
              id="projects"
              label="Projects"
              icon={Folder}
              badge={
                <Badge variant="secondary" size="sm">
                  8
                </Badge>
              }
            />
            <SidebarItem
              id="tasks"
              label="Tasks"
              icon={CheckCircle}
              badge={
                <Badge variant="destructive" size="sm">
                  3
                </Badge>
              }
            />
            <SidebarItem id="documents" label="Documents" icon={FileText} />
          </SidebarItem>
          <SidebarItem id="analytics" label="Analytics" icon={BarChart3} />
          <SidebarItem id="team" label="Team" icon={Users} />
        </SidebarBody>

        <SidebarFooter>
          <div
            className={cn(
              collapsed
                ? "flex flex-col items-center"
                : "flex flex-col items-start",
            )}
          >
            {adminItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-full gap-2",
                    collapsed
                      ? "h-8 w-8 p-0 justify-center"
                      : "justify-start px-3",
                  )}
                >
                  {Icon && <Icon size={16} className="shrink-0" />}
                  <SidebarText>{item.label}</SidebarText>
                </Button>
              );
            })}
          </div>
          <SidebarSeparator />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full gap-2",
                  collapsed
                    ? "h-10 w-10 p-0 justify-center"
                    : "justify-start p-2",
                )}
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=Sara" />
                  <AvatarFallback>MI</AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <>
                    <div className="flex flex-col items-start flex-1 min-w-0 overflow-hidden">
                      <span className="text-sm font-medium truncate">
                        Micah Smith
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        micah@example.com
                      </span>
                    </div>
                    <ChevronDown size={14} className="shrink-0" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon={User}>Profile</DropdownMenuItem>
              <DropdownMenuItem icon={Settings}>Settings</DropdownMenuItem>
              <DropdownMenuItem icon={Bell}>Notifications</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon={Moon}>Dark Mode</DropdownMenuItem>
              <DropdownMenuItem icon={HelpCircle}>Help</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon={LogOut} variant="destructive">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarContent
        sidebarCollapsed={collapsed}
        position="relative"
        className="p-6"
      >
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Advanced Dashboard</h1>
            <p className="text-muted-foreground">
              A comprehensive workspace with team management and analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-ele bg-accent border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Folder size={16} />
                <h3 className="font-medium">Projects</h3>
              </div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">+2 this week</p>
            </div>

            <div className="p-4 rounded-ele bg-accent border border-border">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={16} />
                <h3 className="font-medium">Tasks</h3>
              </div>
              <p className="text-2xl font-bold">48</p>
              <p className="text-xs text-muted-foreground">12 pending</p>
            </div>

            <div className="p-4 rounded-ele bg-accent border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} />
                <h3 className="font-medium">Team</h3>
              </div>
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs text-muted-foreground">members</p>
            </div>
          </div>
        </div>
      </SidebarContent>
    </div>
  );
}

// Mobile Responsive Sidebar
export function SidebarMobile() {
  const [collapsed, setCollapsed] = React.useState(true);

  return (
    <div className="relative h-[40rem] w-full flex overflow-hidden rounded-ele border border-border">
      <Sidebar
        position="relative"
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        overlay={true}
        onOverlayClick={() => setCollapsed(true)}
      >
        <SidebarHeader>
          <img
            className="rounded-ele bg-background border border-border shrink-0"
            src="https://api.dicebear.com/9.x/glass/svg?seed=Sara"
            width={35}
            height={35}
          />
          <SidebarText className="font-semibold text-lg">HextaUI</SidebarText>
        </SidebarHeader>

        <SidebarBody>
          <SidebarItem id="home" label="Home" icon={Home} />
          <SidebarItem id="search" label="Search" icon={Search} />
          <SidebarItem
            id="notifications"
            label="Notifications"
            icon={Bell}
            badge={
              <Badge variant="destructive" size="sm">
                5
              </Badge>
            }
          />
          <SidebarItem id="profile" label="Profile" icon={User} />
          <SidebarItem id="settings" label="Settings" icon={Settings} />
        </SidebarBody>
      </Sidebar>

      <SidebarContent
        sidebarCollapsed={collapsed}
        position="relative"
        className="p-6"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Mobile Layout</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCollapsed(false)}
            >
              Open Menu
            </Button>
          </div>
          <p className="text-muted-foreground">
            This layout is optimized for mobile devices with overlay sidebar.
          </p>
        </div>
      </SidebarContent>
    </div>
  );
}

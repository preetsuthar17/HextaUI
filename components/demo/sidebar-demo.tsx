"use client";

import {
  Calendar,
  FileText,
  Folder,
  Home,
  Inbox,
  Search,
  Settings,
  User,
} from "lucide-react";
import { Logo } from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/new-york/ui/sidebar";

const menuItems = [
  {
    title: "Home",
    icon: Home,
    url: "#",
  },
  {
    title: "Inbox",
    icon: Inbox,
    url: "#",
  },
  {
    title: "Calendar",
    icon: Calendar,
    url: "#",
  },
  {
    title: "Search",
    icon: Search,
    url: "#",
  },
];

const secondaryItems = [
  {
    title: "Documents",
    icon: FileText,
    url: "#",
  },
  {
    title: "Folders",
    icon: Folder,
    url: "#",
  },
];

export function SidebarDemo() {
  return (
    <div className="**:data-[slot=sidebar-container]:absolute! relative h-[600px] w-full overflow-hidden rounded-lg border **:data-[slot=sidebar-container]:inset-y-0! **:data-[slot=sidebar-container]:h-full!">
      <SidebarProvider>
        <Sidebar className="relative" collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-2 p-1.5">
              <Logo className="shrink-0" size={20} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">HextaUI</span>
                <span className="truncate text-sidebar-foreground/70 text-xs">
                  Component Library
                </span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Secondary</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {secondaryItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Settings />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <User />
                    <span>Profile</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex flex-1 items-center gap-2">
              <SidebarInput placeholder="Search..." />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="flex-1 rounded-xl bg-muted/50" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

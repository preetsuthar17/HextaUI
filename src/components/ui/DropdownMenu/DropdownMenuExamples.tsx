"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../dropdown-menu";
import {
  User,
  Settings,
  CreditCard,
  LogOut,
  Mail,
  MessageSquare,
  PlusCircle,
  Github,
  LifeBuoy,
  Cloud,
  Keyboard,
  Plus,
  UserPlus,
  Users,
  Edit,
  Trash,
  Copy,
  Archive,
  MoreHorizontal,
  Bell,
  Shield,
  Palette,
  Monitor,
  Sun,
  Moon,
  Star,
  type LucideIcon,
} from "lucide-react";
import { Button } from "../button";
import { Badge } from "../badge";
import { Avatar, AvatarImage, AvatarFallback } from "../avatar";

// Example dropdown with various items
export function DropdownMenuDemo() {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>{" "}
      <DropdownMenuContent className="w-[95vw] max-w-56 sm:w-56">
        <DropdownMenuLabel icon={User}>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem icon={User} shortcut="⇧⌘P">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem icon={CreditCard} shortcut="⌘B">
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem icon={Settings} shortcut="⌘S">
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem icon={Keyboard} shortcut="⌘K">
            Keyboard shortcuts
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem icon={Users}>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger icon={UserPlus}>
              Invite users
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem icon={Mail}>Email</DropdownMenuItem>
              <DropdownMenuItem icon={MessageSquare}>Message</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon={PlusCircle}>More...</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem icon={Plus} shortcut="⌘+T">
            New Team
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={Github}>GitHub</DropdownMenuItem>
        <DropdownMenuItem icon={LifeBuoy}>Support</DropdownMenuItem>
        <DropdownMenuItem disabled icon={Cloud}>
          API
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={LogOut} variant="destructive" shortcut="⇧⌘Q">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Simple dropdown example
export function DropdownMenuSimple() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem icon={Edit}>Edit</DropdownMenuItem>
        <DropdownMenuItem icon={Copy}>Copy</DropdownMenuItem>
        <DropdownMenuItem icon={Archive}>Archive</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={Trash} variant="destructive">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Dropdown with checkboxes
export function DropdownMenuCheckboxes() {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">View</Button>
      </DropdownMenuTrigger>{" "}
      <DropdownMenuContent className="w-[95vw] max-w-56 sm:w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Dropdown with radio groups
export function DropdownMenuRadioGroupDemo() {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Panel Position</Button>
      </DropdownMenuTrigger>{" "}
      <DropdownMenuContent className="w-[95vw] max-w-56 sm:w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Theme selector dropdown
export function DropdownMenuTheme() {
  const [theme, setTheme] = React.useState("system");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Palette className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel icon={Palette}>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light" icon={Sun}>
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" icon={Moon}>
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system" icon={Monitor}>
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// More actions dropdown
export function DropdownMenuMore() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem icon={Edit}>Edit</DropdownMenuItem>
        <DropdownMenuItem icon={Copy}>Make a copy</DropdownMenuItem>
        <DropdownMenuItem icon={Star}>Add to favorites</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={Archive}>Archive</DropdownMenuItem>
        <DropdownMenuItem icon={Trash} variant="destructive">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Profile dropdown
export function DropdownMenuProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
          <Avatar size="sm">
            <AvatarImage
              src="https://github.com/preetsuthar17.png"
              alt="@preetsuthar17"
            />
            <AvatarFallback>PS</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>{" "}
      <DropdownMenuContent className="w-[95vw] max-w-56 sm:w-56" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Preet Suthar</p>
            <p className="text-xs leading-none text-muted-foreground">
              preet@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem icon={User}>Profile</DropdownMenuItem>
          <DropdownMenuItem icon={Settings}>Settings</DropdownMenuItem>
          <DropdownMenuItem icon={Bell}>Notifications</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={LogOut} variant="destructive">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Notification dropdown
export function DropdownMenuNotifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <Badge
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center"
          >
            3
          </Badge>
        </Button>
      </DropdownMenuTrigger>{" "}
      <DropdownMenuContent className="w-[95vw] max-w-80 sm:w-80">
        <DropdownMenuLabel icon={Bell}>
          <div className="flex items-center justify-between w-full">
            <span>Notifications</span>
            <Badge variant="secondary" size="sm">
              3 new
            </Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[60vh] sm:max-h-[300px] overflow-y-auto">
          <DropdownMenuItem>
            <div className="flex flex-col space-y-1 w-full">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium leading-tight">
                  New message received
                </p>
                <Badge variant="default" size="sm" className="shrink-0">
                  New
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex flex-col space-y-1 w-full">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium leading-tight">
                  Project deployment successful
                </p>
                <Badge variant="outline" size="sm" className="shrink-0">
                  Success
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex flex-col space-y-1 w-full">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium leading-tight">
                  System maintenance scheduled
                </p>
                <Badge variant="secondary" size="sm" className="shrink-0">
                  Info
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">3 hours ago</p>
            </div>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

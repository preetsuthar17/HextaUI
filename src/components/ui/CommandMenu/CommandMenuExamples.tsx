"use client";

import * as React from "react";
import {
  CommandMenu,
  CommandMenuTrigger,
  CommandMenuContent,
  CommandMenuInput,
  CommandMenuList,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuItem,
  CommandMenuSeparator,
  useCommandMenuShortcut,
} from "../command-menu";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Search,
  Settings,
  User,
  Home,
  Calendar,
  Mail,
  FileText,
  Download,
  Upload,
  Trash2,
  Edit,
  Copy,
  Star,
  Heart,
  Command,
  Plus,
  Minus,
  RotateCcw,
  Archive,
  Share,
  ExternalLink,
  Bookmark,
  Clock,
} from "lucide-react";

// Utility function to detect OS and return appropriate modifier key
const getModifierKey = () => {
  if (typeof navigator === "undefined") return { key: "Ctrl", symbol: "Ctrl" };

  const isMac =
    navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
    navigator.userAgent.toUpperCase().indexOf("MAC") >= 0;

  return isMac ? { key: "cmd", symbol: "⌘" } : { key: "ctrl", symbol: "Ctrl" };
};

// Basic Command Menu Example
export const BasicCommandMenu = () => {
  const [open, setOpen] = React.useState(false);

  useCommandMenuShortcut(() => setOpen(true));

  return (
    <CommandMenu open={open} onOpenChange={setOpen}>
      {" "}
      <CommandMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Command size={16} />
          Open Command Menu
          <div className="ml-auto flex items-center gap-1">
            <Kbd size="xs">{getModifierKey().symbol}</Kbd>
            <Kbd size="xs">K</Kbd>
          </div>
        </Button>
      </CommandMenuTrigger>
      <CommandMenuContent>
        <CommandMenuInput placeholder="Type a command or search..." />
        <CommandMenuList>
          <CommandMenuGroup heading="Suggestions">
            <CommandMenuItem icon={<Calendar />} index={0}>
              Calendar
            </CommandMenuItem>
            <CommandMenuItem icon={<User />} index={1}>
              Search Users
            </CommandMenuItem>
            <CommandMenuItem icon={<Settings />} index={2}>
              Settings
            </CommandMenuItem>
          </CommandMenuGroup>
          <CommandMenuSeparator />
          <CommandMenuGroup heading="Actions">
            <CommandMenuItem icon={<Plus />} index={3} shortcut="cmd+n">
              Create New
            </CommandMenuItem>
            <CommandMenuItem icon={<Upload />} index={4} shortcut="cmd+u">
              Upload File
            </CommandMenuItem>
            <CommandMenuItem icon={<Download />} index={5} shortcut="cmd+d">
              Download
            </CommandMenuItem>
          </CommandMenuGroup>
        </CommandMenuList>
      </CommandMenuContent>
    </CommandMenu>
  );
};

// Search Command Menu Example
export const SearchCommandMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const searchResults = [
    { id: 1, name: "Dashboard", type: "page", icon: <Home /> },
    { id: 2, name: "User Profile", type: "page", icon: <User /> },
    { id: 3, name: "Settings", type: "page", icon: <Settings /> },
    { id: 4, name: "John Doe", type: "user", icon: <User /> },
    { id: 5, name: "Jane Smith", type: "user", icon: <User /> },
    { id: 6, name: "Project Alpha", type: "project", icon: <FileText /> },
    { id: 7, name: "Team Meeting Notes", type: "document", icon: <FileText /> },
  ];

  const filteredResults = searchResults.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <CommandMenu open={open} onOpenChange={setOpen}>
      <CommandMenuTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <Search size={16} />
          Search Everything
        </Button>
      </CommandMenuTrigger>
      <CommandMenuContent>
        <CommandMenuInput
          placeholder="Search pages, users, projects..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <CommandMenuList>
          {filteredResults.length === 0 ? (
            <CommandMenuEmpty>
              No results found for "{searchValue}"
            </CommandMenuEmpty>
          ) : (
            <>
              <CommandMenuGroup heading="Results">
                {filteredResults.map((item, index) => (
                  <CommandMenuItem
                    key={item.id}
                    icon={item.icon}
                    index={index}
                    onSelect={() => {
                      console.log(`Selected: ${item.name}`);
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {item.type}
                      </span>
                    </div>
                  </CommandMenuItem>
                ))}
              </CommandMenuGroup>
            </>
          )}
        </CommandMenuList>
      </CommandMenuContent>
    </CommandMenu>
  );
};

// Actions Command Menu Example
export const ActionsCommandMenu = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <CommandMenu open={open} onOpenChange={setOpen}>
      <CommandMenuTrigger asChild>
        <Button variant="outline">Quick Actions</Button>
      </CommandMenuTrigger>
      <CommandMenuContent>
        <CommandMenuInput placeholder="Choose an action..." />
        <CommandMenuList>
          <CommandMenuGroup heading="File Actions">
            <CommandMenuItem icon={<Plus />} index={0} shortcut="cmd+n">
              New File
            </CommandMenuItem>
            <CommandMenuItem icon={<Upload />} index={1} shortcut="cmd+u">
              Upload File
            </CommandMenuItem>
            <CommandMenuItem icon={<Download />} index={2} shortcut="cmd+d">
              Download All
            </CommandMenuItem>
            <CommandMenuItem icon={<Copy />} index={3} shortcut="cmd+c">
              Copy Link
            </CommandMenuItem>
          </CommandMenuGroup>
          <CommandMenuSeparator />
          <CommandMenuGroup heading="Edit Actions">
            <CommandMenuItem icon={<Edit />} index={4} shortcut="cmd+e">
              Edit Document
            </CommandMenuItem>
            <CommandMenuItem icon={<RotateCcw />} index={5} shortcut="cmd+z">
              Undo Changes
            </CommandMenuItem>
            <CommandMenuItem icon={<Archive />} index={6}>
              Archive Item
            </CommandMenuItem>
            <CommandMenuItem icon={<Trash2 />} index={7} shortcut="del">
              Delete Item
            </CommandMenuItem>
          </CommandMenuGroup>
          <CommandMenuSeparator />
          <CommandMenuGroup heading="Share & Export">
            <CommandMenuItem icon={<Share />} index={8} shortcut="cmd+shift+s">
              Share
            </CommandMenuItem>
            <CommandMenuItem icon={<ExternalLink />} index={9}>
              Open in New Tab
            </CommandMenuItem>
            <CommandMenuItem icon={<Bookmark />} index={10} shortcut="cmd+b">
              Bookmark
            </CommandMenuItem>
          </CommandMenuGroup>
        </CommandMenuList>
      </CommandMenuContent>
    </CommandMenu>
  );
};

// Navigation Command Menu Example
export const NavigationCommandMenu = () => {
  const [open, setOpen] = React.useState(false);

  useCommandMenuShortcut(() => setOpen(true));

  const navigationItems = [
    { name: "Dashboard", href: "/dashboard", icon: <Home />, shortcut: "g+d" },
    {
      name: "Calendar",
      href: "/calendar",
      icon: <Calendar />,
      shortcut: "g+c",
    },
    { name: "Messages", href: "/messages", icon: <Mail />, shortcut: "g+m" },
    {
      name: "Documents",
      href: "/documents",
      icon: <FileText />,
      shortcut: "g+f",
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings />,
      shortcut: "g+s",
    },
    { name: "Profile", href: "/profile", icon: <User />, shortcut: "g+p" },
  ];

  return (
    <CommandMenu open={open} onOpenChange={setOpen}>
      <CommandMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Command size={14} />
          Navigate
        </Button>
      </CommandMenuTrigger>
      <CommandMenuContent>
        <CommandMenuInput placeholder="Where would you like to go?" />
        <CommandMenuList>
          <CommandMenuGroup heading="Quick Navigation">
            {navigationItems.map((item, index) => (
              <CommandMenuItem
                key={item.name}
                icon={item.icon}
                index={index}
                shortcut={item.shortcut}
                onSelect={() => {
                  console.log(`Navigating to: ${item.href}`);
                  setOpen(false);
                }}
              >
                {item.name}
              </CommandMenuItem>
            ))}
          </CommandMenuGroup>
          <CommandMenuSeparator />
          <CommandMenuGroup heading="Recent">
            <CommandMenuItem icon={<Clock />} index={6}>
              Recently Viewed
            </CommandMenuItem>
            <CommandMenuItem icon={<Star />} index={7}>
              Favorites
            </CommandMenuItem>
            <CommandMenuItem icon={<Heart />} index={8}>
              Bookmarked Pages
            </CommandMenuItem>
          </CommandMenuGroup>
        </CommandMenuList>
      </CommandMenuContent>
    </CommandMenu>
  );
};

// Complex Command Menu with filtering
export const ComplexCommandMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useCommandMenuShortcut(() => setOpen(true));

  const allItems = [
    // Pages
    { type: "page", name: "Dashboard", icon: <Home />, shortcut: "g+d" },
    { type: "page", name: "Analytics", icon: <Settings />, shortcut: "g+a" },
    { type: "page", name: "Calendar", icon: <Calendar />, shortcut: "g+c" },

    // Actions
    {
      type: "action",
      name: "Create New Project",
      icon: <Plus />,
      shortcut: "cmd+n",
    },
    {
      type: "action",
      name: "Upload Files",
      icon: <Upload />,
      shortcut: "cmd+u",
    },
    {
      type: "action",
      name: "Export Data",
      icon: <Download />,
      shortcut: "cmd+e",
    },

    // Users
    { type: "user", name: "John Doe", icon: <User /> },
    { type: "user", name: "Jane Smith", icon: <User /> },
    { type: "user", name: "Mike Johnson", icon: <User /> },

    // Documents
    { type: "document", name: "Project Proposal.pdf", icon: <FileText /> },
    { type: "document", name: "Meeting Notes", icon: <FileText /> },
    { type: "document", name: "Budget Spreadsheet", icon: <FileText /> },
  ];

  const filteredItems = React.useMemo(() => {
    if (!value) return allItems;
    return allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.type.toLowerCase().includes(value.toLowerCase()),
    );
  }, [value]);

  const groupedItems = React.useMemo(() => {
    const groups: Record<string, typeof allItems> = {};
    filteredItems.forEach((item) => {
      if (!groups[item.type]) groups[item.type] = [];
      groups[item.type].push(item);
    });
    return groups;
  }, [filteredItems]);

  const getGroupTitle = (type: string) => {
    switch (type) {
      case "page":
        return "Pages";
      case "action":
        return "Actions";
      case "user":
        return "Users";
      case "document":
        return "Documents";
      default:
        return type;
    }
  };

  let globalIndex = 0;

  return (
    <CommandMenu open={open} onOpenChange={setOpen}>
      <CommandMenuTrigger asChild>
        <Button className="gap-2">
          <Search size={16} />
          Command Palette
          <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 ml-auto flex">
            ⌘K
          </kbd>
        </Button>
      </CommandMenuTrigger>
      <CommandMenuContent>
        <CommandMenuInput
          placeholder="Type to search pages, actions, users, documents..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <CommandMenuList maxHeight="400px">
          {Object.keys(groupedItems).length === 0 ? (
            <CommandMenuEmpty>No results found for "{value}"</CommandMenuEmpty>
          ) : (
            Object.entries(groupedItems).map(([type, items], groupIndex) => (
              <React.Fragment key={type}>
                {groupIndex > 0 && <CommandMenuSeparator />}
                <CommandMenuGroup heading={getGroupTitle(type)}>
                  {items.map((item, index) => {
                    const currentIndex = globalIndex++;
                    return (
                      <CommandMenuItem
                        key={`${type}-${index}`}
                        icon={item.icon}
                        index={currentIndex}
                        shortcut={item.shortcut}
                        onSelect={() => {
                          console.log(`Selected ${type}: ${item.name}`);
                          setOpen(false);
                          setValue("");
                        }}
                      >
                        {item.name}
                      </CommandMenuItem>
                    );
                  })}
                </CommandMenuGroup>
              </React.Fragment>
            ))
          )}
        </CommandMenuList>
      </CommandMenuContent>
    </CommandMenu>
  );
};

// Minimal Command Menu
export const MinimalCommandMenu = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <CommandMenu open={open} onOpenChange={setOpen}>
      <CommandMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Command size={16} />
        </Button>
      </CommandMenuTrigger>
      <CommandMenuContent showShortcut={false}>
        <CommandMenuInput placeholder="Quick search..." />
        <CommandMenuList>
          <CommandMenuItem icon={<Home />} index={0}>
            Home
          </CommandMenuItem>
          <CommandMenuItem icon={<Settings />} index={1}>
            Settings
          </CommandMenuItem>
          <CommandMenuItem icon={<User />} index={2}>
            Profile
          </CommandMenuItem>
        </CommandMenuList>
      </CommandMenuContent>
    </CommandMenu>
  );
};

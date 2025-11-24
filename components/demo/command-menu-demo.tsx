"use client";

import {
  Calendar,
  Command as CommandIcon,
  Download,
  Home,
  Plus,
  Settings,
  Upload,
  User,
} from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/new-york/ui/button";
import {
  CommandMenu,
  CommandMenuContent,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuInput,
  CommandMenuItem,
  CommandMenuList,
  CommandMenuSeparator,
  CommandMenuTrigger,
  useCommandMenuShortcut,
} from "@/registry/new-york/ui/command-menu";

const menuItems = [
  {
    group: "General",
    items: [
      { icon: <Home />, label: "Home" },
      { icon: <Calendar />, label: "Calendar" },
      { icon: <User />, label: "Users" },
      { icon: <Settings />, label: "Settings" },
    ],
  },
  {
    group: "Actions",
    items: [
      { icon: <Plus />, label: "Create New", shortcut: "cmd+n" },
      { icon: <Upload />, label: "Upload File", shortcut: "cmd+u" },
      { icon: <Download />, label: "Download", shortcut: "cmd+d" },
    ],
  },
];

export const CommandMenuDemo = () => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  useCommandMenuShortcut(() => setOpen(true));

  const filteredGroups = menuItems
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  const flatItems: { group: string; item: any }[] = [];
  filteredGroups.forEach((group) => {
    group.items.forEach((item) => {
      flatItems.push({ group: group.group, item });
    });
  });

  return (
    <CommandMenu onOpenChange={setOpen} open={open}>
      <CommandMenuTrigger asChild>
        <Button className="gap-2" variant="outline">
          <CommandIcon size={16} />
          Command Menu
        </Button>
      </CommandMenuTrigger>
      <CommandMenuContent>
        <CommandMenuInput
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type a command or search..."
          value={search}
        />
        <CommandMenuList>
          {flatItems.length === 0 ? (
            <CommandMenuEmpty>
              No results found{search && ` for "${search}"`}
            </CommandMenuEmpty>
          ) : (
            (() => {
              let currIndex = 0;
              return filteredGroups.map((group, groupIndex) => (
                <React.Fragment key={group.group}>
                  {groupIndex > 0 && <CommandMenuSeparator />}
                  <CommandMenuGroup heading={group.group}>
                    {group.items.map((item) => {
                      const rendered = (
                        <CommandMenuItem
                          icon={item.icon}
                          index={currIndex}
                          key={item.label}
                          onSelect={() => setOpen(false)}
                        >
                          {item.label}
                        </CommandMenuItem>
                      );
                      currIndex++;
                      return rendered;
                    })}
                  </CommandMenuGroup>
                </React.Fragment>
              ));
            })()
          )}
        </CommandMenuList>
      </CommandMenuContent>
    </CommandMenu>
  );
};

export default CommandMenuDemo;

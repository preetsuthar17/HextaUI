"use client";

import { Plus, Settings } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const DEMO_GROUPS = [
  {
    id: "g1",
    name: "HextaUI Team",
    avatar: "https://hextaui.com/favicon.ico",
    lastMessage: "Release v2.0 is live!",
    unread: 2,
  },
  {
    id: "g2",
    name: "Designers",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=designers",
    lastMessage: "Check the new Figma file.",
    unread: 0,
  },
];

type StatusType = "online" | "dnd" | "offline";
const DEMO_PEOPLE = [
  {
    id: "u1",
    name: "Alice",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=alice",
    lastMessage: "Let me know if you need help.",
    unread: 1,
    status: "online" as StatusType,
  },
  {
    id: "u2",
    name: "Bob",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=bob",
    lastMessage: "Thanks for the info!",
    unread: 0,
    status: "dnd" as StatusType,
  },
  {
    id: "u3",
    name: "Charlie",
    avatar: "https://api.dicebear.com/9.x/glass/svg?seed=charlie",
    lastMessage: "See you at 5pm.",
    unread: 3,
    status: "offline" as StatusType,
  },
];

const STATUS_COLORS: Record<StatusType, string> = {
  online: "bg-green-500",
  dnd: "bg-red-500",
  offline: "bg-gray-400",
};

function StatusDot({ status }: { status: StatusType }) {
  return (
    <span
      aria-label={status}
      className={cn(
        "inline-block size-3 rounded-full border-2 border-background",
        STATUS_COLORS[status]
      )}
      title={status.charAt(0).toUpperCase() + status.slice(1)}
    />
  );
}

export default function PeopleList({
  className,
  onPersonClick,
}: {
  className?: string;
  onPersonClick?: () => void;
}) {
  const [search, setSearch] = useState("");
  const filteredGroups = DEMO_GROUPS.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredPeople = DEMO_PEOPLE.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside
      aria-label="Chat People List"
      className={cn(
        "flex h-fit w-full flex-col gap-6 overflow-hidden rounded-card rounded-xl border bg-background",
        className
      )}
      role="complementary"
    >
      <header className="flex items-center justify-between border-b px-4 py-2">
        <h2 className="select-none font-semibold text-lg">Chats</h2>
        <nav aria-label="Chat Actions">
          <div className="flex gap-2">
            <Button
              aria-label="Start a new chat"
              size="icon"
              type="button"
              variant="ghost"
            >
              <Plus aria-hidden="true" className="size-5" focusable="false" />
            </Button>
            <Button
              aria-label="Open chat settings"
              size="icon"
              type="button"
              variant="ghost"
            >
              <Settings
                aria-hidden="true"
                className="size-5"
                focusable="false"
              />
            </Button>
          </div>
        </nav>
      </header>

      <div className="flex flex-col gap-3 px-4">
        <Input
          aria-label="Search people or groups"
          autoComplete="off"
          className="h-10 w-full text-sm"
          inputMode="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search people or groups…"
          spellCheck={false}
          type="search"
          value={search}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
        <section
          aria-labelledby="group-chats-label"
          className="flex flex-col gap-1"
        >
          <h3
            className="flex items-center px-4 font-semibold text-muted-foreground text-xs"
            id="group-chats-label"
          >
            Groups
          </h3>
          <ul className="flex flex-col gap-0.5">
            {filteredGroups.length === 0 ? (
              <li className="px-4 py-2 text-muted-foreground text-sm">
                No groups found.
              </li>
            ) : (
              filteredGroups.map((group) => (
                <li className="px-0" key={group.id}>
                  <button
                    aria-label={`Open group chat: ${group.name}`}
                    className={cn(
                      "group flex w-full items-center gap-4 px-4 py-2 text-left hover:bg-accent focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    )}
                    onClick={onPersonClick}
                    type="button"
                  >
                    <Avatar className="size-7 flex-shrink-0">
                      <AvatarImage alt={group.name} src={group.avatar} />
                      <AvatarFallback>{group.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="truncate font-medium">{group.name}</span>
                      <span className="truncate text-muted-foreground text-xs">
                        {group.lastMessage}
                      </span>
                    </div>
                    {group.unread > 0 ? (
                      <Badge
                        aria-label={`${group.unread} unread messages`}
                        className="ml-auto"
                        variant="secondary"
                      >
                        {group.unread}
                      </Badge>
                    ) : null}
                  </button>
                </li>
              ))
            )}
          </ul>
        </section>

        <section
          aria-labelledby="direct-messages-label"
          className="flex flex-col gap-1"
        >
          <h3
            className="flex items-center px-4 font-semibold text-muted-foreground text-xs"
            id="direct-messages-label"
          >
            Direct Messages
          </h3>
          <ul className="flex flex-col gap-0.5">
            {filteredPeople.length === 0 ? (
              <li className="px-4 py-2 text-muted-foreground text-sm">
                No people found.
              </li>
            ) : (
              filteredPeople.map((person) => (
                <li className="px-0" key={person.id}>
                  <button
                    aria-label={`Open direct message with ${person.name}`}
                    className={cn(
                      "group flex w-full items-center gap-4 px-4 py-2 text-left hover:bg-accent focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    )}
                    onClick={onPersonClick}
                    type="button"
                  >
                    <div className="relative flex flex-shrink-0 items-end">
                      <Avatar className="size-8">
                        <AvatarImage alt={person.name} src={person.avatar} />
                        <AvatarFallback>{person.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="-bottom-0 absolute right-0 flex items-center">
                        <StatusDot status={person.status} />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="truncate font-medium">
                        {person.name}
                      </span>
                      <span className="truncate text-muted-foreground text-xs">
                        {person.lastMessage}
                      </span>
                    </div>
                    {person.unread > 0 ? (
                      <Badge
                        aria-label={`${person.unread} unread messages`}
                        className="ml-auto"
                        variant="secondary"
                      >
                        {person.unread}
                      </Badge>
                    ) : null}
                  </button>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </aside>
  );
}

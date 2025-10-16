"use client";

import {
  Copy,
  Flag,
  MoreHorizontal,
  MoreVertical,
  Reply,
  Trash2,
  UserMinus2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const DEMO_USER = {
  id: "user-123",
  name: "You",
  avatar: "https://api.dicebear.com/9.x/glass/svg?seed=you",
};

type StatusType = "online" | "dnd" | "offline";
const DEMO_OTHER = {
  id: "user-456",
  name: "Alice",
  avatar: "https://api.dicebear.com/9.x/glass/svg?seed=alice",
  status: "online" as StatusType,
};

const STATUS_COLORS: Record<StatusType, string> = {
  online: "bg-green-500",
  dnd: "bg-red-500",
  offline: "bg-gray-400",
};

function StatusBadge({ status }: { status: StatusType }) {
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

const DEMO_MESSAGES = [
  { id: 1, text: "Hey there! 👋", sender: DEMO_OTHER, time: "09:00" },
  { id: 2, text: "Hi Alice! How are you?", sender: DEMO_USER, time: "09:01" },
  {
    id: 3,
    text: "I'm good, thanks! Have you checked out hextaui.com?",
    sender: DEMO_OTHER,
    time: "09:02",
  },
  { id: 4, text: "Not yet! What is it?", sender: DEMO_USER, time: "09:03" },
  {
    id: 5,
    text: "It's a modern UI component library. Super easy to use!",
    sender: DEMO_OTHER,
    time: "09:04",
  },
  {
    id: 6,
    text: "That sounds cool. Does it have ready-made blocks?",
    sender: DEMO_USER,
    time: "09:05",
  },
  {
    id: 7,
    text: "Yes! Tons of blocks and beautiful primitives. You can just copy and paste.",
    sender: DEMO_OTHER,
    time: "09:06",
  },
  { id: 8, text: "Is it customizable?", sender: DEMO_USER, time: "09:07" },
  {
    id: 9,
    text: "Absolutely. You can theme everything with Tailwind and CSS variables.",
    sender: DEMO_OTHER,
    time: "09:08",
  },
  {
    id: 10,
    text: "Nice! Is there a CLI for installing components?",
    sender: DEMO_USER,
    time: "09:09",
  },
  {
    id: 11,
    text: "Yep, just run 'npx hextaui@latest add button' and you're set.",
    sender: DEMO_OTHER,
    time: "09:10",
  },
  {
    id: 12,
    text: "Thanks for the info! I'll try it out today.",
    sender: DEMO_USER,
    time: "09:11",
  },
  {
    id: 13,
    text: "Let me know if you need help. The docs are great too!",
    sender: DEMO_OTHER,
    time: "09:12",
  },
];

// Redesigned user actions block (for conversation - header)
function UserActionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="User actions"
          className="border-muted-foreground/30"
          size="icon"
          type="button"
          variant="outline"
        >
          <MoreVertical
            aria-hidden="true"
            className="size-4"
            focusable="false"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-36 rounded-lg bg-popover p-1 shadow-xl">
        <div className="flex flex-col gap-1">
          <Button
            className="w-full justify-start gap-2 rounded bg-transparent text-rose-600 hover:bg-accent"
            size="sm"
            type="button"
            variant="ghost"
          >
            <UserMinus2
              aria-hidden="true"
              className="size-4"
              focusable="false"
            />
            <span className="font-medium text-xs">Block User</span>
          </Button>
          <Button
            className="w-full justify-start gap-2 rounded bg-transparent text-destructive hover:bg-accent"
            size="sm"
            type="button"
            variant="ghost"
          >
            <Trash2 aria-hidden="true" className="size-4" focusable="false" />
            <span className="font-medium text-xs">Delete Conversation</span>
          </Button>
          <Button
            className="w-full justify-start gap-2 rounded bg-transparent text-yellow-600 hover:bg-accent"
            size="sm"
            type="button"
            variant="ghost"
          >
            <Flag aria-hidden="true" className="size-4" focusable="false" />
            <span className="font-medium text-xs">Report User</span>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Redesigned message actions block (for single message, on hover)
function MessageActions({ isMe }: { isMe: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Message actions"
          className="size-7 rounded bg-background hover:bg-accent"
          size="icon"
          type="button"
          variant="ghost"
        >
          <MoreHorizontal
            aria-hidden="true"
            className="size-3.5"
            focusable="false"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-40 rounded-lg bg-popover p-1 shadow-xl"
      >
        <div className="flex flex-col gap-1">
          <Button
            aria-label="Reply"
            className="w-full justify-start gap-2 rounded px-2 py-1 text-xs"
            size="sm"
            type="button"
            variant="ghost"
          >
            <Reply aria-hidden="true" className="size-3" focusable="false" />
            <span>Reply</span>
          </Button>
          <Button
            aria-label="Copy"
            className="w-full justify-start gap-2 rounded px-2 py-1 text-xs"
            size="sm"
            type="button"
            variant="ghost"
          >
            <Copy aria-hidden="true" className="size-3" focusable="false" />
            <span>Copy</span>
          </Button>
          {isMe ? (
            <Button
              aria-label="Delete"
              className="w-full justify-start gap-2 rounded px-2 py-1 text-destructive text-xs"
              size="sm"
              type="button"
              variant="ghost"
            >
              <Trash2 aria-hidden="true" className="size-3" focusable="false" />
              <span>Delete</span>
            </Button>
          ) : null}
          <Button
            aria-label="Report"
            className="w-full justify-start gap-2 rounded px-2 py-1 text-xs text-yellow-600"
            size="sm"
            type="button"
            variant="ghost"
          >
            <Flag aria-hidden="true" className="size-3" focusable="false" />
            <span>Report</span>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function MessageConversation({
  className,
}: {
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "mx-auto flex h-full min-h-0 w-full grow flex-col overflow-hidden shadow-none",
        className
      )}
    >
      {/* Header */}
      <CardHeader className="sticky top-0 z-10 flex flex-row items-center justify-between gap-2 border-b bg-background px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar>
              <AvatarImage alt={DEMO_OTHER.name} src={DEMO_OTHER.avatar} />
              <AvatarFallback>{DEMO_OTHER.name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-base">{DEMO_OTHER.name}</div>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <StatusBadge status={DEMO_OTHER.status} /> {DEMO_OTHER.status}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <UserActionsMenu />
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="min-h-0 flex-1 p-0">
        <ScrollArea
          aria-label="Conversation transcript"
          className="flex h-full max-h-full flex-col gap-6 bg-background p-4"
          role="log"
        >
          {DEMO_MESSAGES.map((msg) => {
            const isMe = msg.sender.id === DEMO_USER.id;
            return (
              <div
                className={cn(
                  "group my-4 flex gap-2",
                  isMe ? "justify-end" : "justify-start"
                )}
                key={msg.id}
              >
                <div
                  className={cn(
                    "flex max-w-[80%] items-start gap-2",
                    isMe ? "flex-row-reverse" : undefined
                  )}
                >
                  <Avatar className="size-8">
                    <AvatarImage
                      alt={msg.sender.name}
                      src={msg.sender.avatar}
                    />
                    <AvatarFallback>{msg.sender.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div
                      className={cn(
                        "rounded-md px-3 py-2 text-sm",
                        isMe
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-foreground"
                      )}
                    >
                      {msg.text}
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <time
                        aria-label={`Sent at ${msg.time}`}
                        className="text-muted-foreground text-xs"
                        dateTime={msg.time}
                      >
                        {msg.time}
                      </time>
                      <div className="opacity-0 transition-all group-hover:opacity-100">
                        <MessageActions isMe={isMe} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

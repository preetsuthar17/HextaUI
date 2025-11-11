"use client";

import { Bot, Loader2, Paperclip, Send } from "lucide-react";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  mentions?: string[];
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
  isAIMention?: boolean;
}

export interface TeamChatProps {
  messages?: ChatMessage[];
  currentUserId?: string;
  onSendMessage?: (content: string, mentions?: string[]) => Promise<void>;
  onMentionAI?: () => void;
  onUploadFile?: (file: File) => Promise<string>;
  className?: string;
  placeholder?: string;
  showAIButton?: boolean;
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatDate(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TeamChat({
  messages = [],
  currentUserId,
  onSendMessage,
  onMentionAI,
  onUploadFile,
  className,
  placeholder = "Type a message…",
  showAIButton = true,
}: TeamChatProps) {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!input.trim() || isSending) return;

    const content = input.trim();
    setInput("");
    setIsSending(true);

    try {
      // Extract mentions (e.g., @username or @ai)
      const mentionRegex = /@(\w+)/g;
      const mentions: string[] = [];
      let match;
      while ((match = mentionRegex.exec(content)) !== null) {
        mentions.push(match[1]);
      }

      await onSendMessage?.(content, mentions);
    } catch (error) {
      // Restore input on error
      setInput(content);
    } finally {
      setIsSending(false);
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const groupedMessages = messages.reduce(
    (groups, message) => {
      const dateKey = formatDate(message.timestamp);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
      return groups;
    },
    {} as Record<string, ChatMessage[]>
  );

  return (
    <Card className={cn("flex h-[600px] flex-col shadow-xs", className)}>
      <CardHeader className="shrink-0">
        <div className="flex flex-col gap-1">
          <CardTitle>Team Chat</CardTitle>
          <CardDescription>
            Chat with your team members in real-time
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-0 overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4">
          {messages.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Send className="size-6" />
                </EmptyMedia>
                <EmptyTitle>No messages yet</EmptyTitle>
                <EmptyDescription>Start the conversation!</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <div className="flex flex-col gap-6">
              {Object.entries(groupedMessages).map(
                ([dateKey, dateMessages]) => (
                  <div key={dateKey}>
                    <div className="relative mb-4">
                      <Separator />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-background px-2 text-muted-foreground text-xs">
                          {dateKey}
                        </span>
                      </div>
                    </div>
                    {dateMessages.map((message, idx) => {
                      const isCurrentUser = message.author.id === currentUserId;
                      const showAvatar =
                        idx === 0 ||
                        dateMessages[idx - 1].author.id !== message.author.id;

                      return (
                        <div
                          className={cn(
                            "my-8 flex gap-3",
                            isCurrentUser && "flex-row-reverse"
                          )}
                          key={message.id}
                        >
                          {showAvatar ? (
                            <Avatar className="size-8 shrink-0">
                              <AvatarImage
                                alt={message.author.name}
                                src={message.author.avatar}
                              />
                              <AvatarFallback className="text-xs">
                                {getInitials(message.author.name)}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="w-8" />
                          )}
                          <div
                            className={cn(
                              "flex min-w-0 flex-1 flex-col gap-1",
                              isCurrentUser && "items-end"
                            )}
                          >
                            {showAvatar && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">
                                  {message.author.name}
                                </span>
                                <span className="text-muted-foreground text-xs">
                                  {formatTime(message.timestamp)}
                                </span>
                              </div>
                            )}
                            <div
                              className={cn(
                                "max-w-[80%] rounded-lg px-3 py-2",
                                isCurrentUser
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted",
                                !showAvatar && "ml-11"
                              )}
                            >
                              <p className="wrap-break-word whitespace-pre-wrap text-sm">
                                {message.content}
                              </p>
                              {message.isAIMention && (
                                <div className="mt-2 flex items-center gap-2 rounded bg-background/20 px-2 py-1">
                                  <Bot className="size-3" />
                                  <span className="text-xs">AI mentioned</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="shrink-0 rounded-lg bg-muted/30 p-4">
          <div className="flex items-center">
            <div className="flex shrink-0 items-center gap-1">
              {onUploadFile && (
                <Button
                  aria-label="Attach file"
                  className="size-9"
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <Paperclip className="size-4" />
                </Button>
              )}
              {showAIButton && onMentionAI && (
                <Button
                  aria-label="Mention AI"
                  className="size-9"
                  onClick={onMentionAI}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <Bot className="size-4" />
                </Button>
              )}
            </div>
            <div className="relative flex min-w-0 flex-1 flex-col gap-1.5">
              <InputGroup>
                <InputGroupTextarea
                  className="min-h-[52px] resize-none pr-12"
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  ref={textareaRef}
                  rows={1}
                  value={input}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    aria-busy={isSending}
                    className="size-9"
                    data-loading={isSending}
                    disabled={!input.trim() || isSending}
                    onClick={handleSend}
                    type="button"
                  >
                    {isSending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Send className="size-4" />
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              <div className="flex items-center justify-between px-1">
                <span className="text-muted-foreground text-xs">
                  ⌘ + Enter to send
                </span>
                {input.trim() && (
                  <span className="text-muted-foreground text-xs">
                    {input.length} character{input.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

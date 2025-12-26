"use client";

import { Bot, Loader2, Send, Users } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import AIMessageComponent from "@/registry/new-york/blocks/ai/ai-message";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar";
import { Badge } from "@/registry/new-york/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/new-york/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/registry/new-york/ui/input-group";

export interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isTyping?: boolean;
  cursorPosition?: number;
}

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  author?: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
}

export interface TeamAIRoomProps {
  roomName?: string;
  participants?: Participant[];
  messages?: AIMessage[];
  currentUserId?: string;
  onSendMessage?: (content: string) => Promise<void>;
  onTyping?: (isTyping: boolean) => void;
  className?: string;
  isStreaming?: boolean;
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
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

export default function TeamAIRoom({
  roomName = "Shared AI Workspace",
  participants = [],
  messages = [],
  currentUserId,
  onSendMessage,
  onTyping,
  className,
  isStreaming = false,
}: TeamAIRoomProps) {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!input.trim() || isSending) return;

    const content = input.trim();
    setInput("");
    setIsSending(true);

    try {
      await onSendMessage?.(content);
    } catch (error) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    onTyping?.(e.target.value.length > 0);
  };

  const typingParticipants = participants.filter((p) => p.isTyping);

  return (
    <Card className={cn("flex h-[700px] flex-col shadow-xs", className)}>
      <CardHeader className="shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <CardTitle>{roomName}</CardTitle>
            <CardDescription>
              Collaborative AI workspace with shared context
            </CardDescription>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <div className="flex -space-x-2">
              {participants.slice(0, 3).map((participant) => (
                <Avatar
                  className="size-8 border-2 border-background"
                  key={participant.id}
                >
                  <AvatarImage
                    alt={participant.name}
                    src={participant.avatar}
                  />
                  <AvatarFallback className="text-xs">
                    {getInitials(participant.name)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {participants.length > 3 && (
                <div className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-muted">
                  <span className="text-muted-foreground text-xs">
                    +{participants.length - 3}
                  </span>
                </div>
              )}
            </div>
            <Badge variant="secondary">
              <Users className="mr-1 size-3" />
              {participants.length}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-0 overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4">
          {messages.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Bot className="size-6" />
                </EmptyMedia>
                <EmptyTitle>Start collaborating</EmptyTitle>
                <EmptyDescription>
                  Ask questions and work together with AI
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <div className="flex flex-col gap-6">
              {messages.map((message) => {
                if (message.role === "user") {
                  return (
                    <div className="flex items-start gap-3" key={message.id}>
                      <Avatar className="size-8 shrink-0">
                        <AvatarImage
                          alt={message.author?.name || "User"}
                          src={message.author?.avatar}
                        />
                        <AvatarFallback className="text-xs">
                          {message.author
                            ? getInitials(message.author.name)
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {message.author?.name || "User"}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <div className="max-w-[80%] rounded-lg bg-muted px-3 py-2">
                          <p className="wrap-break-word whitespace-pre-wrap text-sm">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="flex items-start gap-3" key={message.id}>
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Bot className="size-4 text-primary" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="rounded-lg border bg-card p-4">
                        <AIMessageComponent
                          className="shadow-none"
                          content={message.content}
                          isStreaming={
                            isStreaming &&
                            message.id === messages[messages.length - 1]?.id
                          }
                        />
                      </div>
                      <span className="text-muted-foreground text-xs">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                );
              })}
              {typingParticipants.length > 0 && (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Loader2 className="size-4 animate-spin" />
                  <span>
                    {typingParticipants.map((p) => p.name).join(", ")} typing…
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="shrink-0 rounded-lg bg-muted/30 p-4">
          <div className="flex items-center">
            <div className="relative flex min-w-0 flex-1 flex-col gap-2.5">
              <InputGroup>
                <InputGroupTextarea
                  className="min-h-[52px] resize-none pr-12"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask AI anything…"
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

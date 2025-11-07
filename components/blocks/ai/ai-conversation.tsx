"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import AIMessage from "./ai-message";
import AIThinking from "./ai-thinking";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

interface AIConversationProps {
  messages?: Message[];
  isThinking?: boolean;
  isStreaming?: boolean;
  onRegenerate?: (messageId: string) => void;
  onEdit?: (messageId: string) => void;
  className?: string;
  maxHeight?: string;
}

function useAutoScroll(
  messages: Message[],
  isThinking: boolean,
  isStreaming: boolean
) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef(true);

  useEffect(() => {
    if (!viewportRef.current) return;

    const container = viewportRef.current;
    const isAtBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 100;

    shouldScrollRef.current = isAtBottom;
  }, [messages]);

  useEffect(() => {
    if (!(viewportRef.current && shouldScrollRef.current)) return;

    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: scrollBehavior,
      });
    } else {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages, isThinking, isStreaming]);

  return viewportRef;
}

interface UserMessageProps {
  content: string;
}

function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-lg rounded-tr-none bg-primary px-4 py-2 text-primary-foreground">
        <p className="wrap-break-word whitespace-pre-wrap text-sm">{content}</p>
      </div>
    </div>
  );
}

interface MessageListProps {
  messages: Message[];
  isStreaming: boolean;
  onRegenerate?: (messageId: string) => void;
  onEdit?: (messageId: string) => void;
}

function MessageList({
  messages,
  isStreaming,
  onRegenerate,
  onEdit,
}: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-center text-muted-foreground text-sm">
          Start a conversation by typing a message below.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      {messages.map((message, index) => {
        const isLastMessage = index === messages.length - 1;
        const isLastAI = isLastMessage && message.role === "assistant";

        if (message.role === "user") {
          return <UserMessage content={message.content} key={message.id} />;
        }

        return (
          <div className="rounded-lg border bg-card p-6" key={message.id}>
            <AIMessage
              content={message.content}
              isStreaming={isStreaming && isLastAI}
              onEdit={onEdit ? () => onEdit(message.id) : undefined}
              onRegenerate={
                onRegenerate ? () => onRegenerate(message.id) : undefined
              }
            />
          </div>
        );
      })}
    </div>
  );
}

export default function AIConversation({
  messages: initialMessages = [],
  isThinking = false,
  isStreaming = false,
  onRegenerate,
  onEdit,
  className,
  maxHeight = "600px",
}: AIConversationProps) {
  const [messages, setMessages] = useState<Message[]>(() => initialMessages);
  const scrollRef = useAutoScroll(messages, isThinking, isStreaming);
  const prevInitialMessagesRef = useRef(initialMessages);

  useEffect(() => {
    if (
      prevInitialMessagesRef.current !== initialMessages &&
      initialMessages.length > 0
    ) {
      prevInitialMessagesRef.current = initialMessages;
      const timeoutId = setTimeout(() => {
        setMessages(initialMessages);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [initialMessages]);

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border bg-background shadow-xs",
        className
      )}
    >
      <div
        className="flex-1 overflow-y-auto"
        ref={scrollRef}
        style={{ maxHeight }}
      >
        <MessageList
          isStreaming={isStreaming}
          messages={messages}
          onEdit={onEdit}
          onRegenerate={onRegenerate}
        />
        {isThinking && (
          <div className="px-4 pb-4">
            <AIThinking />
          </div>
        )}
      </div>
    </div>
  );
}

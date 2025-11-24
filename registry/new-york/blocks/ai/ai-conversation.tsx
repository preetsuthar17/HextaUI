"use client";

import { MessageCircle, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";
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
  onNewMessage?: () => void;
  className?: string;
  maxHeight?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
}

const SCROLL_THRESHOLD = 100;
const SCROLL_DEBOUNCE_MS = 150;

function useAutoScroll(
  messages: Message[],
  isThinking: boolean,
  isStreaming: boolean,
  containerRef: React.RefObject<HTMLDivElement | null>
) {
  const shouldScrollRef = useRef(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const isAtBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + SCROLL_THRESHOLD;

    shouldScrollRef.current = isAtBottom;
  }, [messages, containerRef]);

  useEffect(() => {
    if (!(containerRef.current && shouldScrollRef.current)) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (!containerRef.current) return;

      if (typeof window !== "undefined") {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: scrollBehavior,
        });
      } else {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, SCROLL_DEBOUNCE_MS);

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [messages, isThinking, isStreaming, containerRef]);
}

function useKeyboardNavigation(
  messages: Message[],
  containerRef: React.RefObject<HTMLDivElement | null>
) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    messageRefs.current = messageRefs.current.slice(0, messages.length);
  }, [messages.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (
        !(
          containerRef.current &&
          containerRef.current.contains(document.activeElement)
        )
      ) {
        return;
      }

      const target = e.target as HTMLElement;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          if (focusedIndex === null) {
            setFocusedIndex(0);
            messageRefs.current[0]?.focus();
          } else if (focusedIndex < messages.length - 1) {
            const nextIndex = focusedIndex + 1;
            setFocusedIndex(nextIndex);
            messageRefs.current[nextIndex]?.focus();
            messageRefs.current[nextIndex]?.scrollIntoView({
              block: "nearest",
              behavior: "smooth",
            });
          }
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          if (focusedIndex !== null && focusedIndex > 0) {
            const prevIndex = focusedIndex - 1;
            setFocusedIndex(prevIndex);
            messageRefs.current[prevIndex]?.focus();
            messageRefs.current[prevIndex]?.scrollIntoView({
              block: "nearest",
              behavior: "smooth",
            });
          } else {
            setFocusedIndex(null);
            containerRef.current?.focus();
          }
          break;
        }
        case "Home": {
          e.preventDefault();
          if (messages.length > 0) {
            setFocusedIndex(0);
            messageRefs.current[0]?.focus();
            messageRefs.current[0]?.scrollIntoView({
              block: "start",
              behavior: "smooth",
            });
          }
          break;
        }
        case "End": {
          e.preventDefault();
          if (messages.length > 0) {
            const lastIndex = messages.length - 1;
            setFocusedIndex(lastIndex);
            messageRefs.current[lastIndex]?.focus();
            messageRefs.current[lastIndex]?.scrollIntoView({
              block: "end",
              behavior: "smooth",
            });
          }
          break;
        }
        case "Escape": {
          e.preventDefault();
          setFocusedIndex(null);
          containerRef.current?.focus();
          break;
        }
      }
    },
    [focusedIndex, messages.length, containerRef]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return { messageRefs, focusedIndex, setFocusedIndex };
}

interface EmptyStateProps {
  title?: string;
  description?: string;
  onNewMessage?: () => void;
}

function EmptyState({
  title = "Start a conversation",
  description = "Type a message below to begin chatting with the AI assistant.",
  onNewMessage,
}: EmptyStateProps) {
  return (
    <div
      aria-live="polite"
      className="flex flex-1 flex-col items-center justify-center gap-4 p-8"
      role="status"
    >
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <MessageCircle
          aria-hidden="true"
          className="size-8 text-muted-foreground"
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="font-semibold text-foreground text-lg">{title}</h2>
        <p className="max-w-md text-muted-foreground text-sm">{description}</p>
      </div>
      {onNewMessage && (
        <Button
          aria-label="Start new conversation"
          className="min-h-[44px] min-w-[44px]"
          onClick={onNewMessage}
          size="lg"
        >
          <Sparkles aria-hidden="true" className="size-4" />
          New Message
        </Button>
      )}
    </div>
  );
}

interface UserMessageProps {
  content: string;
  messageId: string;
  index: number;
  isFocused: boolean;
  messageRef: (el: HTMLDivElement | null) => void;
}

function UserMessage({
  content,
  messageId,
  index,
  isFocused,
  messageRef,
}: UserMessageProps) {
  return (
    <div
      id={`user-message-${messageId}`}
      aria-label={`User message ${messageId}`}
      className={cn(
        "flex justify-end rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isFocused && "ring-2 ring-ring ring-offset-2"
      )}
      ref={messageRef}
      role="article"
      tabIndex={0}
    >
      <div className="flex min-h-[44px] max-w-[80%] items-center rounded-lg rounded-tr-none bg-primary px-4 py-3 text-primary-foreground">
        <p className="wrap-break-word whitespace-pre-wrap text-sm leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}

interface AssistantMessageProps {
  message: Message;
  index: number;
  isLastMessage: boolean;
  isStreaming: boolean;
  isFocused: boolean;
  messageRef: (el: HTMLDivElement | null) => void;
  onRegenerate?: (messageId: string) => void;
  onEdit?: (messageId: string) => void;
}

function AssistantMessage({
  message,
  index,
  isLastMessage,
  isStreaming,
  isFocused,
  messageRef,
  onRegenerate,
  onEdit,
}: AssistantMessageProps) {
  const isLastAI = isLastMessage && message.role === "assistant";

  return (
    <div
      aria-label={`Assistant message ${index + 1}${isStreaming && isLastAI ? ", streaming" : ""}`}
      aria-live={isStreaming && isLastAI ? "polite" : "off"}
      className={cn(
        "min-h-[44px] rounded-lg border bg-card p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-sm",
        isFocused && "ring-2 ring-ring ring-offset-2"
      )}
      ref={messageRef}
      role="article"
      tabIndex={0}
    >
      <AIMessage
        className="shadow-none"
        content={message.content}
        isStreaming={isStreaming && isLastAI}
        onEdit={onEdit ? () => onEdit(message.id) : undefined}
        onRegenerate={onRegenerate ? () => onRegenerate(message.id) : undefined}
      />
    </div>
  );
}

interface MessageListProps {
  messages: Message[];
  isStreaming: boolean;
  messageRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  focusedIndex: number | null;
  onRegenerate?: (messageId: string) => void;
  onEdit?: (messageId: string) => void;
}

function MessageList({
  messages,
  isStreaming,
  messageRefs,
  focusedIndex,
  onRegenerate,
  onEdit,
}: MessageListProps) {
  return (
    <div
      aria-label="Conversation messages"
      aria-live="polite"
      className="flex flex-col gap-6 p-4"
      role="log"
    >
      {messages.map((message, index) => {
        const isLastMessage = index === messages.length - 1;
        const isFocused = focusedIndex === index;

        if (message.role === "user") {
          return (
            <UserMessage
              content={message.content}
              index={index}
              isFocused={isFocused}
              key={message.id}
              messageId={message.id}
              messageRef={(el) => {
                messageRefs.current[index] = el;
              }}
            />
          );
        }

        return (
          <AssistantMessage
            index={index}
            isFocused={isFocused}
            isLastMessage={isLastMessage}
            isStreaming={isStreaming}
            key={message.id}
            message={message}
            messageRef={(el) => {
              messageRefs.current[index] = el;
            }}
            onEdit={onEdit}
            onRegenerate={onRegenerate}
          />
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
  onNewMessage,
  className,
  maxHeight = "600px",
  emptyStateTitle,
  emptyStateDescription,
}: AIConversationProps) {
  const [messages, setMessages] = useState<Message[]>(() => initialMessages);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevInitialMessagesRef = useRef(initialMessages);
  const { messageRefs, focusedIndex, setFocusedIndex } = useKeyboardNavigation(
    messages,
    containerRef
  );

  useAutoScroll(messages, isThinking, isStreaming, containerRef);

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

  const handleContainerFocus = useCallback(() => {
    setFocusedIndex(null);
  }, [setFocusedIndex]);

  return (
    <div
      aria-label="AI conversation"
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border bg-background shadow-xs",
        className
      )}
      role="region"
    >
      <div
        className="flex-1 overflow-y-auto overscroll-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onFocus={handleContainerFocus}
        ref={containerRef}
        style={{ maxHeight }}
        tabIndex={0}
      >
        {messages.length === 0 ? (
          <EmptyState
            description={emptyStateDescription}
            onNewMessage={onNewMessage}
            title={emptyStateTitle}
          />
        ) : (
          <MessageList
            focusedIndex={focusedIndex}
            isStreaming={isStreaming}
            messageRefs={messageRefs}
            messages={messages}
            onEdit={onEdit}
            onRegenerate={onRegenerate}
          />
        )}
        {isThinking && (
          <div aria-live="polite" className="px-4 pb-4" role="status">
            <AIThinking />
          </div>
        )}
      </div>
    </div>
  );
}

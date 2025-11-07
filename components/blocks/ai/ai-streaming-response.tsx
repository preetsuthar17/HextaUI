"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import AIMessage from "./ai-message";

const STREAMING_CONFIG = {
  TOKEN_DELAY: 30,
  PAUSE_AFTER_PERIOD: 200,
  PAUSE_AFTER_COMMA: 100,
  PAUSE_AFTER_PARAGRAPH: 300,
} as const;

interface AIStreamingResponseProps {
  content: string;
  onComplete?: () => void;
  autoStart?: boolean;
  className?: string;
}

function useTokens(content: string): string[] {
  const tokens = useMemo(() => {
    const tokenRegex = /(\S+|\s+)/g;
    return content.match(tokenRegex) || [];
  }, [content]);

  return tokens;
}

function useStreaming(
  tokens: string[],
  autoStart: boolean,
  onComplete?: () => void
) {
  const [displayedTokens, setDisplayedTokens] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(!autoStart);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    if (tokens.length === 0) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const timeoutId = setTimeout(() => {
      setDisplayedTokens([]);
      setIsComplete(false);
      setIsPaused(!autoStart);
    }, 0);
    currentIndexRef.current = 0;

    return () => clearTimeout(timeoutId);
  }, [tokens, autoStart]);

  useEffect(() => {
    if (tokens.length === 0) return;
    if (isPaused || isComplete || currentIndexRef.current >= tokens.length) {
      return;
    }

    const streamNext = () => {
      if (currentIndexRef.current >= tokens.length) {
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
        return;
      }

      const token = tokens[currentIndexRef.current];
      setDisplayedTokens((prev) => [...prev, token]);
      currentIndexRef.current += 1;

      const trimmedToken = token.trim();

      let delay = STREAMING_CONFIG.TOKEN_DELAY;

      if (
        trimmedToken.endsWith(".") ||
        trimmedToken.endsWith("!") ||
        trimmedToken.endsWith("?")
      ) {
        delay += STREAMING_CONFIG.PAUSE_AFTER_PERIOD;
      } else if (
        trimmedToken.endsWith(",") ||
        trimmedToken.endsWith(";") ||
        trimmedToken.endsWith(":")
      ) {
        delay += STREAMING_CONFIG.PAUSE_AFTER_COMMA;
      } else if (token.includes("\n\n")) {
        delay += STREAMING_CONFIG.PAUSE_AFTER_PARAGRAPH;
      }

      if (typeof window !== "undefined") {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
          const remainingTokens = tokens.slice(currentIndexRef.current);
          setDisplayedTokens((prev) => [...prev, ...remainingTokens]);
          currentIndexRef.current = tokens.length;
          setIsComplete(true);
          if (onComplete) {
            onComplete();
          }
          return;
        }
      }

      timeoutRef.current = setTimeout(streamNext, delay);
    };

    streamNext();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [tokens, isPaused, isComplete, onComplete]);

  const pause = () => {
    setIsPaused(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const resume = () => {
    if (isComplete) return;
    setIsPaused(false);
  };

  return {
    displayedText: displayedTokens.join(""),
    isPaused,
    isComplete,
  };
}

export default function AIStreamingResponse({
  content,
  onComplete,
  autoStart = true,
  className,
}: AIStreamingResponseProps) {
  const tokens = useTokens(content);
  const { displayedText, isPaused, isComplete } = useStreaming(
    tokens,
    autoStart,
    onComplete
  );

  return (
    <div className={cn("relative", className)}>
      <AIMessage
        className="shadow-none"
        content={displayedText}
        isStreaming={false}
        skipCodeHighlighting={!isComplete}
      />
      {!(isComplete || isPaused) && (
        <span
          aria-hidden="true"
          className="inline-block h-4 w-0.5 bg-foreground motion-safe:animate-pulse"
        />
      )}
    </div>
  );
}

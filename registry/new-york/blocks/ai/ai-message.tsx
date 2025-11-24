"use client";

import { Copy, Edit, MoreVertical, RotateCcw } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { type BundledLanguage, codeToHtml } from "shiki";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu";

const STREAMING_CONFIG = {
  CHAR_DELAY: 20,
  BATCH_SIZE: 3,
} as const;

const COPY_FEEDBACK_DURATION = 2000;

interface AIMessageProps {
  content: string;
  isStreaming?: boolean;
  onRegenerate?: () => void;
  onEdit?: () => void;
  className?: string;
  skipCodeHighlighting?: boolean;
}

function useStreamingText(fullText: string, isStreaming: boolean): string {
  const [displayedText, setDisplayedText] = useState(() =>
    isStreaming ? "" : fullText
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let initialTimeoutId: NodeJS.Timeout | null = null;

    if (!isStreaming) {
      initialTimeoutId = setTimeout(() => {
        setDisplayedText(fullText);
      }, 0);
      return () => {
        if (initialTimeoutId) {
          clearTimeout(initialTimeoutId);
        }
      };
    }

    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        initialTimeoutId = setTimeout(() => {
          setDisplayedText(fullText);
        }, 0);
        return () => {
          if (initialTimeoutId) {
            clearTimeout(initialTimeoutId);
          }
        };
      }
    }

    initialTimeoutId = setTimeout(() => {
      setDisplayedText("");
    }, 0);
    let currentIndex = 0;

    const streamNext = () => {
      if (currentIndex >= fullText.length) {
        return;
      }

      const nextIndex = Math.min(
        currentIndex + STREAMING_CONFIG.BATCH_SIZE,
        fullText.length
      );
      setDisplayedText(fullText.slice(0, nextIndex));
      currentIndex = nextIndex;

      timeoutRef.current = setTimeout(streamNext, STREAMING_CONFIG.CHAR_DELAY);
    };

    streamNext();

    return () => {
      if (initialTimeoutId) {
        clearTimeout(initialTimeoutId);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [fullText, isStreaming]);

  return displayedText;
}

interface MessageActionsProps {
  onCopy: () => void;
  onRegenerate?: () => void;
  onEdit?: () => void;
  copied: boolean;
}

function MessageActions({
  onCopy,
  onRegenerate,
  onEdit,
  copied,
}: MessageActionsProps) {
  const hasActions = onRegenerate || onEdit;

  if (!hasActions) {
    return (
      <Button
        aria-label="Copy message"
        className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        onClick={onCopy}
        variant="ghost"
      >
        {copied ? (
          <>
            <Copy className="size-4" />
            <span className="text-xs">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="size-4" />
            <span className="text-xs">Copy</span>
          </>
        )}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Message actions"
          className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          size="icon"
          variant="ghost"
        >
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onCopy}>
          <Copy className="size-4" />
          {copied ? "Copied!" : "Copy"}
        </DropdownMenuItem>
        {onRegenerate && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onRegenerate}>
              <RotateCcw className="size-4" />
              Regenerate
            </DropdownMenuItem>
          </>
        )}
        {onEdit && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onEdit}>
              <Edit className="size-4" />
              Edit
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface HighlightedCodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  skipHighlighting?: boolean;
}

function HighlightedCodeBlock({
  code,
  language,
  filename,
  skipHighlighting = false,
}: HighlightedCodeBlockProps) {
  const { theme: websiteTheme } = useTheme();
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const theme = websiteTheme === "dark" ? "github-dark" : "github-light";
  const lang = (language || "text") as BundledLanguage;

  useEffect(() => {
    if (skipHighlighting) {
      setHighlightedCode("");
      setLoading(false);
      return;
    }

    let mounted = true;
    setLoading(true);

    const highlightCode = async () => {
      try {
        const html = await codeToHtml(code, {
          lang,
          theme,
        });
        if (mounted) {
          setHighlightedCode(html);
          setLoading(false);
        }
      } catch {
        if (mounted) {
          setHighlightedCode("");
          setLoading(false);
        }
      }
    };

    highlightCode();

    return () => {
      mounted = false;
    };
  }, [code, lang, theme, skipHighlighting]);

  if (skipHighlighting) {
    return (
      <div className="rounded-lg border border-border bg-background">
        {filename && (
          <div className="flex items-center border-border border-b bg-background px-4 py-2">
            <span className="font-mono text-muted-foreground text-sm">
              {filename}
            </span>
          </div>
        )}
        <pre className="overflow-x-auto p-4">
          <code className="wrap-break-word whitespace-pre-wrap font-mono text-sm">
            {code}
          </code>
        </pre>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-background">
        {filename && (
          <div className="flex items-center border-border border-b bg-background px-4 py-2">
            <span className="font-mono text-muted-foreground text-sm">
              {filename}
            </span>
          </div>
        )}
        <div className="p-4">
          <div className="flex animate-pulse flex-col gap-2">
            <div className="h-4 rounded bg-muted" />
            <div className="h-4 w-3/4 rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (!highlightedCode) {
    return (
      <div className="rounded-lg border border-border bg-background">
        {filename && (
          <div className="flex items-center border-border border-b bg-background px-4 py-2">
            <span className="font-mono text-muted-foreground text-sm">
              {filename}
            </span>
          </div>
        )}
        <pre className="overflow-x-auto p-4">
          <code className="font-mono text-sm">{code}</code>
        </pre>
      </div>
    );
  }

  function parseInlineStyle(styleText: string): React.CSSProperties {
    const styleObject: React.CSSProperties = {};
    for (const declaration of styleText.split(";")) {
      const [prop, value] = declaration.split(":").map((s) => s.trim());
      if (prop && value) {
        const camelProp = prop.replace(/-([a-z])/g, (_m, c) => c.toUpperCase());
        (styleObject as Record<string, string>)[camelProp] = value;
      }
    }
    return styleObject;
  }

  function domNodeToReact(
    node: ChildNode,
    key?: string | number
  ): React.ReactNode {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const el = node as HTMLElement;
    const tagName = el.tagName.toLowerCase();
    const isCodeBlock = tagName === "pre" || tagName === "code";

    const props: Record<string, any> = { key };

    if (el.className) {
      props.className = isCodeBlock
        ? `${el.className} whitespace-pre-wrap wrap-break-word`.trim()
        : el.className.trim();
    } else if (isCodeBlock) {
      props.className = "whitespace-pre-wrap wrap-break-word";
    }

    const styleAttr = el.getAttribute("style");
    if (styleAttr) {
      props.style = parseInlineStyle(styleAttr);
    }

    for (const attr of el.attributes) {
      if (attr.name.startsWith("data-")) {
        props[attr.name] = attr.value;
      }
    }

    const children = Array.from(el.childNodes).map((child, i) =>
      domNodeToReact(child, i)
    );

    return React.createElement(tagName, props, ...children);
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(highlightedCode, "text/html");
  const pre = doc.body.querySelector("pre");

  if (!pre) {
    return (
      <div className="rounded-lg border border-border bg-background">
        {filename && (
          <div className="flex items-center border-border border-b bg-background px-4 py-2">
            <span className="font-mono text-muted-foreground text-sm">
              {filename}
            </span>
          </div>
        )}
        <pre className="overflow-x-auto p-4">
          <code className="font-mono text-sm">{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-background">
      {filename && (
        <div className="flex items-center border-border border-b bg-background px-4 py-2">
          <span className="font-mono text-muted-foreground text-sm">
            {filename}
          </span>
        </div>
      )}
      <div className="overflow-x-auto">{domNodeToReact(pre)}</div>
    </div>
  );
}

interface MarkdownContentProps {
  content: string;
  skipCodeHighlighting?: boolean;
}

function MarkdownContent({
  content,
  skipCodeHighlighting = false,
}: MarkdownContentProps) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const codeString = String(children).replace(/\n$/, "");

            if (language) {
              return (
                <HighlightedCodeBlock
                  code={codeString}
                  language={language}
                  skipHighlighting={skipCodeHighlighting}
                />
              );
            }

            return (
              <code
                className={cn(
                  "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
                  className
                )}
                {...props}
              >
                {children}
              </code>
            );
          },
          a({ href, children, ...props }) {
            return (
              <a
                href={href}
                rel="noopener noreferrer"
                target="_blank"
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default function AIMessage({
  content,
  isStreaming = false,
  onRegenerate,
  onEdit,
  className,
  skipCodeHighlighting = false,
}: AIMessageProps) {
  const [copied, setCopied] = useState(false);
  const displayedContent = useStreamingText(content, isStreaming);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION);
    } catch {}
  };

  return (
    <div className={cn("group relative shadow-xs", className)}>
      <div className="absolute top-0 right-0 z-10">
        <MessageActions
          copied={copied}
          onCopy={handleCopy}
          onEdit={onEdit}
          onRegenerate={onRegenerate}
        />
      </div>

      <div>
        <MarkdownContent
          content={displayedContent}
          skipCodeHighlighting={skipCodeHighlighting}
        />
        {isStreaming && (
          <span
            aria-hidden="true"
            className="inline-block h-4 w-0.5 bg-foreground motion-safe:animate-pulse"
          />
        )}
      </div>
    </div>
  );
}

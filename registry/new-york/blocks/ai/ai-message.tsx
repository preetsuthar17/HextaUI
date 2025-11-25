"use client";

import { Copy, Edit, MoreVertical, RotateCcw } from "lucide-react";
import { useTheme } from "next-themes";
import React, {
  startTransition,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
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
  DropdownMenuShortcut,
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

interface CodeBlockHeaderProps {
  filename?: string;
}

function CodeBlockHeader({ filename }: CodeBlockHeaderProps) {
  if (!filename) return null;

  return (
    <div className="flex items-center border-border border-b bg-muted/30 px-4 py-2">
      <span className="font-mono text-muted-foreground text-sm">
        {filename}
      </span>
    </div>
  );
}

interface CodeBlockSkeletonProps {
  filename?: string;
}

function CodeBlockSkeleton({ filename }: CodeBlockSkeletonProps) {
  return (
    <div className="rounded-lg border border-border bg-background">
      <CodeBlockHeader filename={filename} />
      <div className="p-4">
        <div className="flex animate-pulse flex-col gap-2">
          <div className="h-4 rounded bg-muted" />
          <div className="h-4 w-3/4 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

interface CodeBlockFallbackProps {
  code: string;
  filename?: string;
}

function CodeBlockFallback({ code, filename }: CodeBlockFallbackProps) {
  return (
    <div className="rounded-lg border border-border bg-background">
      <CodeBlockHeader filename={filename} />
      <pre className="overflow-x-auto p-4">
        <code className="wrap-break-word whitespace-pre-wrap font-mono text-sm">
          {code}
        </code>
      </pre>
    </div>
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
  const [error, setError] = useState(false);

  const theme = useMemo(
    () => (websiteTheme === "dark" ? "github-dark" : "github-light"),
    [websiteTheme]
  );
  const lang = useMemo(
    () => (language || "text") as BundledLanguage,
    [language]
  );

  useEffect(() => {
    if (skipHighlighting) {
      startTransition(() => {
        setHighlightedCode("");
        setLoading(false);
        setError(false);
      });
      return;
    }

    let mounted = true;
    startTransition(() => {
      setLoading(true);
      setError(false);
    });

    const highlightCode = async () => {
      try {
        const html = await codeToHtml(code, {
          lang,
          theme,
        });
        if (mounted) {
          setHighlightedCode(html);
          setLoading(false);
          setError(false);
        }
      } catch {
        if (mounted) {
          setHighlightedCode("");
          setLoading(false);
          setError(true);
        }
      }
    };

    highlightCode();

    return () => {
      mounted = false;
    };
  }, [code, lang, theme, skipHighlighting]);

  if (skipHighlighting || error) {
    return <CodeBlockFallback code={code} filename={filename} />;
  }

  if (loading) {
    return <CodeBlockSkeleton filename={filename} />;
  }

  if (!highlightedCode) {
    return <CodeBlockFallback code={code} filename={filename} />;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(highlightedCode, "text/html");
  const pre = doc.body.querySelector("pre");

  if (!pre) {
    return <CodeBlockFallback code={code} filename={filename} />;
  }

  return (
    <div className="rounded-lg border border-border bg-background">
      <CodeBlockHeader filename={filename} />
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
  const codeComponent = useCallback(
    ({
      node,
      className,
      children,
      ...props
    }: {
      node?: any;
      className?: string;
      children?: React.ReactNode;
    }) => {
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
    [skipCodeHighlighting]
  );

  const linkComponent = useCallback(
    ({
      href,
      children,
      ...props
    }: {
      href?: string;
      children?: React.ReactNode;
    }) => (
      <a href={href} rel="noopener noreferrer" target="_blank" {...props}>
        {children}
      </a>
    ),
    []
  );

  const components = useMemo(
    () => ({
      code: codeComponent,
      a: linkComponent,
    }),
    [codeComponent, linkComponent]
  );

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

interface MessageActionsProps {
  onCopy: () => void;
  onRegenerate?: () => void;
  onEdit?: () => void;
  copied: boolean;
  messageId?: string;
}

function MessageActions({
  onCopy,
  onRegenerate,
  onEdit,
  copied,
  messageId,
}: MessageActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasActions = onRegenerate || onEdit;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!(isOpen && hasActions)) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      } else if ((e.metaKey || e.ctrlKey) && e.key === "c" && !e.shiftKey) {
        e.preventDefault();
        onCopy();
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, hasActions, onCopy]);

  const handleCopyClick = useCallback(() => {
    onCopy();
    if (isOpen) {
      setIsOpen(false);
    }
  }, [onCopy, isOpen]);

  if (!hasActions) {
    return (
      <div className="flex items-center" ref={containerRef}>
        <Button
          aria-label={copied ? "Message copied to clipboard" : "Copy message"}
          aria-live="polite"
          className="min-h-[32px] min-w-[32px] opacity-0 transition-opacity duration-200 focus-visible:opacity-100 group-focus-within:opacity-100 group-hover:opacity-100"
          onClick={handleCopyClick}
          variant="ghost"
        >
          <Copy aria-hidden="true" className="size-4" />
          <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
          <span aria-hidden="true" className="text-xs">
            {copied ? "Copied!" : "Copy"}
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center" ref={containerRef}>
      <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            aria-expanded={isOpen}
            aria-haspopup="menu"
            aria-label="Message actions menu"
            className="min-h-[32px] min-w-[32px] opacity-0 transition-opacity duration-200 focus-visible:opacity-100 group-focus-within:opacity-100 group-hover:opacity-100"
            size="icon"
            variant="ghost"
          >
            <MoreVertical aria-hidden="true" className="size-4" />
            <span className="sr-only">Open message actions menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          aria-label="Message actions"
          className="font-medium"
        >
          <DropdownMenuItem onClick={handleCopyClick}>
            <Copy aria-hidden="true" className="size-4" />
            <span>{copied ? "Copied!" : "Copy"}</span>
            <DropdownMenuShortcut>
              {typeof navigator !== "undefined" &&
              navigator.platform.includes("Mac")
                ? "⌘"
                : "Ctrl"}
              C
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          {onRegenerate && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onRegenerate}>
                <RotateCcw aria-hidden="true" className="size-4" />
                <span>Regenerate</span>
              </DropdownMenuItem>
            </>
          )}
          {onEdit && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onEdit}>
                <Edit aria-hidden="true" className="size-4" />
                <span>Edit</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface StreamingIndicatorProps {
  isStreaming: boolean;
}

function StreamingIndicator({ isStreaming }: StreamingIndicatorProps) {
  if (!isStreaming) return null;

  return (
    <span
      aria-hidden="true"
      aria-label="Streaming content"
      className="inline-block h-4 w-0.5 bg-foreground motion-safe:animate-pulse"
    />
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
  const [copyError, setCopyError] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  const messageId = useId();
  const displayedContent = useStreamingText(content, isStreaming);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => {
        setCopied(false);
      }, COPY_FEEDBACK_DURATION);
    } catch {
      setCopyError(true);
      setTimeout(() => {
        setCopyError(false);
      }, COPY_FEEDBACK_DURATION);
    }
  }, [content]);

  useEffect(() => {
    if (!messageRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "c" && !e.shiftKey) {
        const selection = window.getSelection()?.toString();
        if (
          !selection &&
          messageRef.current?.contains(document.activeElement)
        ) {
          e.preventDefault();
          handleCopy();
        }
      }
    };

    const element = messageRef.current;
    element.addEventListener("keydown", handleKeyDown);

    return () => {
      element.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCopy]);

  return (
    <div
      aria-atomic="false"
      aria-label="AI message"
      aria-live={isStreaming ? "polite" : "off"}
      className={cn("group relative", className)}
      ref={messageRef}
      role="article"
    >
      <div aria-label="Message actions" className="absolute top-0 right-0 z-10">
        <MessageActions
          copied={copied}
          messageId={messageId}
          onCopy={handleCopy}
          onEdit={onEdit}
          onRegenerate={onRegenerate}
        />
      </div>

      <div className="pr-12">
        <MarkdownContent
          content={displayedContent}
          skipCodeHighlighting={skipCodeHighlighting}
        />
        <StreamingIndicator isStreaming={isStreaming} />
      </div>

      {copyError && (
        <div aria-live="assertive" className="sr-only" role="alert">
          Failed to copy message to clipboard
        </div>
      )}
    </div>
  );
}

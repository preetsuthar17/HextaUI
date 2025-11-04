"use client";

import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { type BundledLanguage, codeToHtml } from "shiki";
import { Button } from "./ui/button";

type CodeBlockProps = {
  code: string;
  lang: BundledLanguage | "package-install";
  className?: string;
  filename?: string;
};

const PACKAGE_MANAGERS = {
  npm: { name: "npm", command: "npx" },
  pnpm: { name: "pnpm", command: "pnpm dlx" },
  yarn: { name: "yarn", command: "yarn" },
  bun: { name: "bun", command: "bunx --bun" },
} as const;

type PackageManager = keyof typeof PACKAGE_MANAGERS;

const PACKAGE_MANAGER_STORAGE_KEY = "last-used-package-manager";
const COPY_FEEDBACK_DURATION_MS = 2000;
const scrollbarClass =
  "scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground scrollbar-track-transparent";

// Transform `pnpm dlx` in code block to match selected package manager
function transformPackageInstallCode(
  code: string,
  packageManager: PackageManager
): string {
  return code.replace(/pnpm\s+dlx/g, PACKAGE_MANAGERS[packageManager].command);
}

export default function CodeBlock({
  code,
  lang,
  className = "",
  filename,
}: CodeBlockProps) {
  const { theme: websiteTheme } = useTheme();
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedPackageManager, setSelectedPackageManager] =
    useState<PackageManager>(() => {
      if (typeof window === "undefined") return "pnpm";
      const stored = window.localStorage.getItem(PACKAGE_MANAGER_STORAGE_KEY);
      if (stored && stored in PACKAGE_MANAGERS) {
        return stored as PackageManager;
      }
      return "pnpm";
    });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        PACKAGE_MANAGER_STORAGE_KEY,
        selectedPackageManager
      );
    }
  }, [selectedPackageManager]);

  const theme = websiteTheme === "dark" ? "github-dark" : "github-light";

  const isPackageInstall = lang === "package-install";
  const displayCode = isPackageInstall
    ? transformPackageInstallCode(code, selectedPackageManager)
    : code;

  const lineCount = displayCode.split("\n").length;
  const hasMultipleLines = lineCount > 1;

  useEffect(() => {
    let mounted = true;
    const highlightCode = async () => {
      try {
        const html = await codeToHtml(displayCode, {
          lang: isPackageInstall ? "bash" : lang,
          theme,
        });
        if (mounted) {
          setHighlightedCode(html);
          setLoading(false);
        }
      } catch {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    highlightCode();
    return () => {
      mounted = false;
    };
  }, [displayCode, lang, theme, isPackageInstall]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(displayCode);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION_MS);
    } catch {}
  };

  if (loading) {
    return (
      <div
        className={`rounded border border-border bg-background text-foreground ${className}`}
      >
        {filename && (
          <div className="flex items-center border-border border-b bg-background px-4 py-2">
            <span className="font-mono text-muted-foreground text-sm">
              {filename}
            </span>
          </div>
        )}
        <div className="p-4">
          <div className="animate-pulse space-y-2">
            <div className="h-4 rounded bg-muted" />
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-4 w-1/2 rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  function renderHighlightedCode() {
    if (!highlightedCode) {
      return null;
    }

    if (typeof window === "undefined") {
      // fallback - SSR
      return (
        <pre
          className={`wrap-break-word whitespace-pre-wrap bg-code font-mono ${scrollbarClass}`}
        >
          <code className="wrap-break-word whitespace-pre-wrap bg-code p-4 font-mono text-sm">
            {displayCode}
          </code>
        </pre>
      );
    }

    const parser = new window.DOMParser();
    const doc = parser.parseFromString(highlightedCode, "text/html");
    const pre = doc.body.querySelector("pre");
    if (!pre) {
      // fallback for highlight error
      return (
        <pre
          className={`wrap-break-word whitespace-pre-wrap bg-code ${scrollbarClass}`}
        >
          <code className="wrap-break-word whitespace-pre-wrap bg-code">
            {displayCode}
          </code>
        </pre>
      );
    }

    function parseInlineStyle(styleText: string): React.CSSProperties {
      const styleObject: React.CSSProperties = {};
      for (const declaration of styleText.split(";")) {
        const [prop, value] = declaration.split(":").map((s) => s.trim());
        if (prop && value) {
          const camelProp = prop.replace(/-([a-z])/g, (_m, c) =>
            c.toUpperCase()
          );
          // @ts-expect-error: dynamic style keys
          styleObject[camelProp] = value;
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
      const isCodeElement = tagName === "code";

      const props: Record<string, any> = { key };
      if (el.className) {
        props.className = isCodeBlock
          ? `${el.className} whitespace-pre-wrap wrap-break-word ${scrollbarClass}`.trim()
          : el.className;
      } else if (isCodeBlock) {
        props.className = `whitespace-pre-wrap wrap-break-word ${scrollbarClass}`;
      }

      // Add data attribute for multi-line code blocks
      if (isCodeElement && hasMultipleLines) {
        props["data-line-numbers"] = "true";
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

    return domNodeToReact(pre, "pre");
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-lg border border-border bg-background text-foreground ${className}`}
    >
      {isPackageInstall && (
        <div className="flex border-border border-b bg-background">
          <div className="flex w-full flex-wrap gap-1 p-2 sm:flex-nowrap">
            {Object.entries(PACKAGE_MANAGERS).map(([key, manager]) => (
              <Button
                className="h-6 p-2 text-sm"
                key={key}
                onClick={() => setSelectedPackageManager(key as PackageManager)}
                variant={selectedPackageManager === key ? "secondary" : "ghost"}
              >
                <span>{manager.name}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {filename && (
        <div className="flex items-center border-border border-b bg-background px-4 py-2">
          <span className="font-mono text-muted-foreground text-sm">
            {filename}
          </span>
        </div>
      )}

      {/* Changed: Only the code content is scrollable, not the filename or package manager bar. */}
      <div className="relative flex flex-col">
        <Button
          aria-label="Copy code"
          className="absolute top-3 right-3 z-10 flex items-center justify-center gap-2 rounded bg-secondary/90 px-2 py-1 text-secondary-foreground opacity-0 transition-opacity duration-150 hover:bg-secondary focus-visible:opacity-100 group-hover:opacity-100"
          onClick={copyToClipboard}
          size="sm"
          type="button"
          variant="secondary"
        >
          {copied ? (
            <>
              <Check size={12} />
              <span className="text-xs">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span className="text-xs">Copy</span>
            </>
          )}
        </Button>
        {/* Only code content should scroll. Use a max-h for code container, not at root. */}
        <div className="w-full bg-code" style={{ position: "relative" }}>
          <div className="max-h-96 overflow-auto">
            {renderHighlightedCode()}
          </div>
        </div>
      </div>
    </div>
  );
}

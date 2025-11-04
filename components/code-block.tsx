"use client";

import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { type BundledLanguage, type BundledTheme, codeToHtml } from "shiki";
import { Button } from "./ui/button";

type CodeBlockProps = {
  code: string;
  lang: BundledLanguage | "package-install";
  theme?: BundledTheme;
  showLineNumbers?: boolean;
  className?: string;
  filename?: string;
};

const PACKAGE_MANAGERS = {
  npm: {
    name: "npm",
    logo: "📦",
    command: "npx",
    color: "#cb3837",
  },
  pnpm: {
    name: "pnpm",
    logo: "📦",
    command: "pnpm dlx",
    color: "#f69220",
  },
  yarn: {
    name: "yarn",
    logo: "🧶",
    command: "yarn",
    color: "#2c8ebb",
  },
  bun: {
    name: "bun",
    logo: "🍞",
    command: "bunx --bun",
    color: "#fbf0df",
  },
} as const;

type PackageManager = keyof typeof PACKAGE_MANAGERS;

const PACKAGE_MANAGER_STORAGE_KEY = "last-used-package-manager";

function transformPackageInstallCode(
  code: string,
  packageManager: PackageManager
): string {
  const { command } = PACKAGE_MANAGERS[packageManager];
  return code.replace(/pnpm\s+dlx/g, command);
}

function getInitialPackageManager(): PackageManager {
  if (typeof window === "undefined") return "pnpm";
  const stored = window.localStorage.getItem(PACKAGE_MANAGER_STORAGE_KEY);
  if (
    stored &&
    typeof stored === "string" &&
    Object.keys(PACKAGE_MANAGERS).includes(stored)
  ) {
    return stored as PackageManager;
  }
  return "pnpm";
}

export default function CodeBlock({
  code,
  lang,
  theme: propTheme = "github-light",
  className = "",
  filename,
}: CodeBlockProps) {
  const { theme: websiteTheme } = useTheme();
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  // Use a state setter with lazy initialization for package manager (SSR-safe, late-read)
  const [selectedPackageManager, setSelectedPackageManager] =
    useState<PackageManager>(() => {
      if (typeof window !== "undefined") {
        const stored = window.localStorage.getItem(PACKAGE_MANAGER_STORAGE_KEY);
        if (stored && Object.keys(PACKAGE_MANAGERS).includes(stored)) {
          return stored as PackageManager;
        }
      }
      return "pnpm";
    });

  // Update selectedPackageManager with effect if user has changed localStorage (when navigating between tabs)
  useEffect(() => {
    function syncPackageManagerFromStorage(e: StorageEvent) {
      if (
        e.key === PACKAGE_MANAGER_STORAGE_KEY &&
        e.newValue &&
        Object.keys(PACKAGE_MANAGERS).includes(e.newValue)
      ) {
        setSelectedPackageManager(e.newValue as PackageManager);
      }
    }
    window.addEventListener("storage", syncPackageManagerFromStorage);
    return () =>
      window.removeEventListener("storage", syncPackageManagerFromStorage);
  }, []);

  // Save selectedPackageManager to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        PACKAGE_MANAGER_STORAGE_KEY,
        selectedPackageManager
      );
    }
  }, [selectedPackageManager]);

  // Determine the theme to use based on website theme
  const theme = websiteTheme === "dark" ? "github-dark" : "github-light";

  const isPackageInstall = lang === "package-install";
  const displayCode = isPackageInstall
    ? transformPackageInstallCode(code, selectedPackageManager)
    : code;

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

  const COPY_FEEDBACK_DURATION_MS = 2000;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(displayCode);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION_MS);
    } catch {}
  };

  const scrollbarClass =
    "scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground scrollbar-track-transparent";

  if (loading) {
    return (
      <div
        className={`rounded border border-border bg-background text-foreground ${className}`}
      >
        {filename && (
          <div className="flex items-center justify-between rounded-t-lg border-border border-b bg-background px-4 py-2">
            <span className="font-mono text-muted-foreground text-sm">
              {filename}
            </span>
          </div>
        )}
        <div className="p-4">
          <div className="animate-pulse">
            <div className="mb-2 h-4 rounded bg-muted" />
            <div className="mb-2 h-4 w-3/4 rounded bg-muted" />
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
      return (
        <pre
          className={`overflow-x-auto whitespace-pre bg-code font-mono ${scrollbarClass}`}
        >
          <code className="whitespace-pre bg-code p-4 font-mono text-sm">
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
          className={`overflow-x-auto whitespace-pre bg-code ${scrollbarClass}`}
        >
          <code className="whitespace-pre bg-code">{displayCode}</code>
        </pre>
      );
    }

    function parseInlineStyle(styleText: string): React.CSSProperties {
      const styleObject: React.CSSProperties = {};
      styleText.split(";").forEach((declaration) => {
        const [rawProp, rawValue] = declaration.split(":");
        if (!(rawProp && rawValue)) {
          return;
        }
        const prop = rawProp.trim();
        const value = rawValue.trim();
        if (!(prop && value)) {
          return;
        }
        const camelProp = prop.replace(/-([a-z])/g, (_m, c: string) =>
          c.toUpperCase()
        );
        // @ts-expect-error: dynamic style keys
        styleObject[camelProp] = value;
      });
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
      const children = Array.from(el.childNodes).map((child, i) =>
        domNodeToReact(child, i)
      );
      const props: any = { key };
      if (el.className) {
        props.className = el.className;
      }
      const styleAttr = el.getAttribute("style");
      if (styleAttr) {
        props.style = {
          ...parseInlineStyle(styleAttr),
        };
      }
      Array.from(el.attributes).forEach((attr) => {
        if (attr.name.startsWith("data-")) {
          props[attr.name] = attr.value;
        }
      });
      if (
        el.tagName.toLowerCase() === "pre" ||
        el.tagName.toLowerCase() === "code"
      ) {
        props.className =
          `${props.className || ""} whitespace-pre overflow-x-auto ${scrollbarClass}`.trim();
      }
      return React.createElement(el.tagName.toLowerCase(), props, ...children);
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
        <div className="flex items-center justify-between border-border border-b bg-background px-4 py-2">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-muted-foreground text-sm">
              {filename}
            </span>
          </div>
        </div>
      )}

      <div className="relative">
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
        <div className="overflow-x-auto bg-code">{renderHighlightedCode()}</div>
      </div>
    </div>
  );
}

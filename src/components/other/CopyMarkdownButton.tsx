"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

const cache = new Map<string, string>();

interface CopyMarkdownButtonProps {
  slug?: string[];
  className?: string;
}

export default function CopyMarkdownButton({
  slug,
  className,
}: CopyMarkdownButtonProps) {
  const [isLoading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyMarkdown = async () => {
    if (!slug || slug.length === 0) return;

    setLoading(true);
    try {
      const url = `/api/markdown/${slug.join("/")}`;
      const cached = cache.get(url);

      if (cached) {
        await navigator.clipboard.writeText(cached);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Try to fetch from a markdown endpoint or construct markdown from current page
        const response = await fetch(url);
        if (response.ok) {
          const content = await response.text();
          cache.set(url, content);
          await navigator.clipboard.writeText(content);
        } else {
          // Fallback: construct markdown from current page content
          const pageContent =
            document.querySelector("article")?.textContent || "";
          const markdownContent = `# ${document.title}\n\n${pageContent}`;
          await navigator.clipboard.writeText(markdownContent);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error("Failed to copy markdown:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={copyMarkdown}
      disabled={isLoading || !slug}
      variant={"secondary"}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? "Copied!" : "Copy as Markdown"}
    </Button>
  );
}

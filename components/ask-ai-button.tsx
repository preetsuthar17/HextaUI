"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AskAIButton = {
  componentId: string;
};

function useAskLinks(componentId: string) {
  return useMemo(() => {
    const base =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://hexta-ui.example";
    const componentUrl = `${base}/components/${componentId}`;
    const q = `I’m looking at this hextaui documentation page ${componentUrl}. Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`;
    const gpt = `https://chatgpt.com/?${new URLSearchParams({ hints: "search", q })}`;
    const claude = `https://claude.ai/new?${new URLSearchParams({ q })}`;
    const t3 = `https://t3.chat/new?${new URLSearchParams({ q })}`;
    const v0Url = `https://v0.dev/?${new URLSearchParams({ q })}`;
    return { gpt, claude, t3, v0Url };
  }, [componentId]);
}

export function AskAIButton({ componentId }: AskAIButton) {
  const { gpt, claude, t3, v0Url } = useAskLinks(componentId);

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Ask AI"
            className="h-8 gap-1 px-3"
            size="sm"
            type="button"
            variant="secondary"
          >
            Ask AI
            <ChevronDown className="size-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mt-1">
          <DropdownMenuItem asChild>
            <Link
              className="flex w-full items-center justify-start gap-2"
              href={v0Url}
              rel="noreferrer noopener"
              target="_blank"
            >
              <ExternalLink className="size-4" /> Open in v0
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="flex w-full items-center justify-start gap-2"
              href={gpt}
              rel="noreferrer noopener"
              target="_blank"
            >
              <ExternalLink className="size-4" /> Ask ChatGPT
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="flex w-full items-center justify-start gap-2"
              href={claude}
              rel="noreferrer noopener"
              target="_blank"
            >
              <ExternalLink className="size-4" /> Open in Claude
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="flex w-full items-center justify-start gap-2"
              href={t3}
              rel="noreferrer noopener"
              target="_blank"
            >
              <ExternalLink className="size-4" /> Open in T3 Chat
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

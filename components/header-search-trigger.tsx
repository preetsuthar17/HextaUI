"use client";

import { Search } from "lucide-react";

import { openCommandMenu } from "@/components/component-search";

export function HeaderSearchTrigger() {
  return (
    <button
      aria-label="Search components"
      className="flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-muted-foreground text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
      onClick={() => openCommandMenu()}
      type="button"
    >
      <Search className="size-4" />
      <span className="truncate">Search components…</span>
    </button>
  );
}

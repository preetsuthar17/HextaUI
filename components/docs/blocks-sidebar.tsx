"use client";

import {
  Bot,
  ChevronRight,
  CreditCard,
  Lock,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  type BlockCategory,
  blockCategories,
  blocksRegistry,
  categoryLabels,
} from "@/lib/blocks-registry";
import { cn } from "@/lib/utils";

const categoryIcons: Record<
  BlockCategory,
  React.ComponentType<{ className?: string }>
> = {
  ai: Bot,
  auth: Lock,
  billing: CreditCard,
  settings: Settings,
  team: Users,
};

export function BlocksSidebar({ currentId }: { currentId?: string }) {
  const [query, setQuery] = React.useState("");
  const [openCategories, setOpenCategories] = React.useState<
    Set<BlockCategory>
  >(new Set(blockCategories));

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return blocksRegistry;

    return blocksRegistry.filter((b) =>
      [b.title, b.id, b.description ?? "", categoryLabels[b.category]].some(
        (t) => t.toLowerCase().includes(q)
      )
    );
  }, [query]);

  const filteredByCategory = React.useMemo(() => {
    const grouped: Record<BlockCategory, typeof blocksRegistry> = {
      ai: [],
      auth: [],
      billing: [],
      settings: [],
      team: [],
    };

    filtered.forEach((block) => {
      grouped[block.category].push(block);
    });

    return grouped;
  }, [filtered]);

  // Get total counts for each category (from all blocks, not just filtered)
  const categoryCounts = React.useMemo(() => {
    const counts: Record<BlockCategory, number> = {
      ai: 0,
      auth: 0,
      billing: 0,
      settings: 0,
      team: 0,
    };

    blocksRegistry.forEach((block) => {
      counts[block.category]++;
    });

    return counts;
  }, []);

  const toggleCategory = (category: BlockCategory) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  return (
    <aside
      aria-label="Blocks navigation"
      className="sticky top-23 hidden h-[70dvh] max-h-[70dvh] w-full max-w-xs md:block"
      style={{ minWidth: 0 }}
    >
      <div className="flex h-full w-full flex-col overflow-hidden rounded-md border bg-card">
        <div className="shrink-0 border-0">
          <Label className="sr-only" htmlFor="blocks-search">
            Search blocks…
          </Label>
          <Input
            autoComplete="off"
            className="h-9 border-0"
            id="blocks-search"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blocks…"
            spellCheck={false}
            value={query}
          />
        </div>
        <Separator className="shrink-0" />
        <div className="flex min-h-0 flex-1 flex-col">
          <ScrollArea className="min-h-0 flex-1 p-2">
            {filtered.length === 0 ? (
              <div className="p-2 text-center text-muted-foreground text-sm">
                No results
              </div>
            ) : (
              <ul className="flex w-full flex-col gap-0.5">
                {blockCategories.map((category) => {
                  const categoryBlocks = filteredByCategory[category];
                  if (categoryBlocks.length === 0) return null;

                  const isOpen = openCategories.has(category);
                  const Icon = categoryIcons[category];
                  const totalCount = categoryCounts[category];
                  const filteredCount = categoryBlocks.length;

                  return (
                    <li className="w-full" key={category}>
                      <Collapsible
                        onOpenChange={() => toggleCategory(category)}
                        open={isOpen}
                      >
                        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-sm px-2 py-1.5 font-medium text-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring">
                          <div className="flex items-center gap-2">
                            <Icon className="size-4 shrink-0" />
                            <span>{categoryLabels[category]}</span>
                            <span className="text-muted-foreground text-xs">
                              (
                              {filteredCount === totalCount
                                ? totalCount
                                : `${filteredCount}/${totalCount}`}
                              )
                            </span>
                          </div>
                          <ChevronRight
                            aria-hidden="true"
                            className={cn(
                              "size-4 shrink-0 transition-transform",
                              isOpen && "rotate-90"
                            )}
                          />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <ul className="mt-0.5 ml-4 flex flex-col gap-0.5">
                            {categoryBlocks.map((block) => {
                              const isCurrent = currentId === block.id;
                              return (
                                <li className="w-full" key={block.id}>
                                  <Link
                                    aria-current={
                                      isCurrent ? "page" : undefined
                                    }
                                    className={cn(
                                      "block w-full truncate rounded-sm px-2 py-1 text-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",
                                      isCurrent && "bg-accent font-medium"
                                    )}
                                    href={`/blocks/${block.id}`}
                                    tabIndex={0}
                                  >
                                    {block.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    </li>
                  );
                })}
              </ul>
            )}
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
}

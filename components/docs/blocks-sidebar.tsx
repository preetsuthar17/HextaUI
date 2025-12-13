"use client";

import {
  Bot,
  ChevronRight,
  CreditCard,
  Kanban,
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
import { ScrollArea } from "@/components/ui/scroll-area";
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
  tasks: Kanban,
};

const SCROLL_POSITION_KEY = "blocks-sidebar-scroll";

export const BlocksSidebar = React.memo(function BlocksSidebar({
  currentId,
}: {
  currentId?: string;
}) {
  const [openCategories, setOpenCategories] = React.useState<
    Set<BlockCategory>
  >(new Set(blockCategories));
  const scrollAreaRef =
    React.useRef<React.ComponentRef<typeof ScrollArea>>(null);

  const groupedByCategory = React.useMemo(() => {
    const grouped: Record<BlockCategory, typeof blocksRegistry> = {
      ai: [],
      auth: [],
      billing: [],
      settings: [],
      team: [],
      tasks: [],
    };

    blocksRegistry.forEach((block) => {
      grouped[block.category].push(block);
    });

    return grouped;
  }, []);

  const categoryCounts = React.useMemo(() => {
    const counts: Record<BlockCategory, number> = {
      ai: 0,
      auth: 0,
      billing: 0,
      settings: 0,
      team: 0,
      tasks: 0,
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

  React.useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const findViewport = (): HTMLElement | null =>
      (scrollArea as HTMLElement).querySelector(
        '[data-slot="scroll-area-viewport"]'
      ) as HTMLElement | null;

    let cleanup: (() => void) | undefined;
    let frameId: number | undefined;
    let timeoutId: NodeJS.Timeout | undefined;

    const trySetup = () => {
      const viewport = findViewport();
      if (viewport) {
        cleanup = setupScrollHandling(viewport);
        return true;
      }
      return false;
    };

    if (!trySetup()) {
      frameId = requestAnimationFrame(() => {
        if (!trySetup()) {
          timeoutId = setTimeout(() => {
            trySetup();
          }, 50);
        }
      });
    }

    function setupScrollHandling(viewportElement: HTMLElement) {
      const savedScroll = sessionStorage.getItem(SCROLL_POSITION_KEY);
      if (savedScroll) {
        const scrollTop = Number.parseInt(savedScroll, 10);
        requestAnimationFrame(() => {
          viewportElement.scrollTop = scrollTop;
        });
      }

      const handleScroll = () => {
        sessionStorage.setItem(
          SCROLL_POSITION_KEY,
          String(viewportElement.scrollTop)
        );
      };

      viewportElement.addEventListener("scroll", handleScroll);
      return () => {
        viewportElement.removeEventListener("scroll", handleScroll);
      };
    }

    return () => {
      if (frameId !== undefined) {
        cancelAnimationFrame(frameId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      cleanup?.();
    };
  }, []);

  return (
    <aside
      aria-label="Blocks navigation"
      className="-translate-y-1/2 fixed inset-y-0 top-1/2 left-[2.5%] z-20 hidden h-[80dvh] w-full max-w-60 items-center md:flex"
      style={{ minWidth: 0 }}
    >
      <div className="flex h-full w-full flex-col overflow-hidden bg-transparent">
        <div className="relative flex min-h-0 flex-1 flex-col">
          <ScrollArea className="min-h-0 flex-1 p-2">
            <ul className="flex w-full flex-col gap-2">
              {blockCategories.map((category) => {
                const categoryBlocks = groupedByCategory[category];
                if (categoryBlocks.length === 0) return null;

                const isOpen = openCategories.has(category);
                const Icon = categoryIcons[category];
                const totalCount = categoryCounts[category];

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
                            ({totalCount})
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
                        <ul className="mt-0.5 ml-2 flex flex-col">
                          {categoryBlocks.map((block) => {
                            const isCurrent = currentId === block.id;
                            return (
                              <li className="w-full" key={block.id}>
                                <Link
                                  aria-current={isCurrent ? "page" : undefined}
                                  className={cn(
                                    "block w-full truncate rounded-sm px-4 py-2 text-sm opacity-50 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
                                    isCurrent &&
                                      "bg-muted font-medium opacity-100"
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
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
});

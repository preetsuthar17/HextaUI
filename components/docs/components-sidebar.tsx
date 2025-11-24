"use client";

import Link from "next/link";
import * as React from "react";
import { componentsRegistry } from "@/lib/components-registry";
import { cn } from "@/lib/utils";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { Separator } from "@/registry/new-york/ui/separator";

const SCROLL_POSITION_KEY = "components-sidebar-scroll";

export const ComponentsSidebar = React.memo(function ComponentsSidebar({
  currentId,
}: {
  currentId?: string;
}) {
  const [query, setQuery] = React.useState("");
  const scrollAreaRef =
    React.useRef<React.ComponentRef<typeof ScrollArea>>(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return (
      q
        ? componentsRegistry.filter((c) =>
            [c.title, c.id, c.description ?? ""].some((t) =>
              t.toLowerCase().includes(q)
            )
          )
        : componentsRegistry
    ).sort((a, b) => a.title.localeCompare(b.title));
  }, [query]);

  // Restore scroll position on mount and save on scroll
  React.useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    // Wait for the viewport to be available
    const findViewport = (): HTMLElement | null =>
      scrollArea.querySelector(
        '[data-slot="scroll-area-viewport"]'
      ) as HTMLElement | null;

    let cleanup: (() => void) | undefined;
    let frameId: number | undefined;
    let timeoutId: NodeJS.Timeout | undefined;

    // Try to find viewport, with retry mechanism
    const trySetup = () => {
      const viewport = findViewport();
      if (viewport) {
        cleanup = setupScrollHandling(viewport);
        return true;
      }
      return false;
    };

    // Try immediately
    if (!trySetup()) {
      // If not found, retry on next frame
      frameId = requestAnimationFrame(() => {
        if (!trySetup()) {
          // One more retry after a short delay
          timeoutId = setTimeout(() => {
            trySetup();
          }, 50);
        }
      });
    }

    function setupScrollHandling(viewportElement: HTMLElement) {
      // Restore saved scroll position
      const savedScroll = sessionStorage.getItem(SCROLL_POSITION_KEY);
      if (savedScroll) {
        const scrollTop = Number.parseInt(savedScroll, 10);
        // Use requestAnimationFrame to ensure the viewport is ready
        requestAnimationFrame(() => {
          viewportElement.scrollTop = scrollTop;
        });
      }

      // Save scroll position on scroll
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
      aria-label="Components navigation"
      className="sticky top-23 hidden h-[70dvh] max-h-[70dvh] w-full max-w-60 md:block"
      style={{ minWidth: 0 }}
    >
      <div className="flex h-full w-full max-w-3xl flex-col overflow-hidden rounded-md border bg-card">
        <div className="shrink-0 border-0">
          <Label className="sr-only" htmlFor="components-search">
            Search components…
          </Label>
          <Input
            autoComplete="off"
            className="h-9 border-0"
            id="components-search"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components…"
            spellCheck={false}
            value={query}
          />
        </div>
        <Separator className="shrink-0" />
        {/* ScrollArea must fill available space and allow scrolling of long content */}
        <div className="flex min-h-0 flex-1 flex-col">
          <ScrollArea className="min-h-0 flex-1 p-2" ref={scrollAreaRef}>
            {filtered.length === 0 ? (
              <div className="p-2 text-center text-muted-foreground text-sm">
                No results
              </div>
            ) : (
              <ul className="flex w-full flex-col gap-0.5">
                {filtered.map((c) => {
                  const isCurrent = currentId === c.id;
                  return (
                    <li className="w-full" key={c.id}>
                      <Link
                        aria-current={isCurrent ? "page" : undefined}
                        className={cn(
                          "block w-full truncate rounded-sm px-2 py-1 text-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",
                          isCurrent && "bg-accent font-medium"
                        )}
                        href={`/components/${c.id}`}
                        tabIndex={0}
                      >
                        {c.title}
                      </Link>
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
});

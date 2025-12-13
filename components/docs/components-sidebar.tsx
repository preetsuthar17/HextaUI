"use client";

import Link from "next/link";
import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { componentsRegistry } from "@/lib/components-registry";
import { cn } from "@/lib/utils";

const SCROLL_POSITION_KEY = "components-sidebar-scroll";

export const ComponentsSidebar = React.memo(function ComponentsSidebar({
  currentId,
}: {
  currentId?: string;
}) {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const sortedComponents = React.useMemo(
    () =>
      [...componentsRegistry].sort((a, b) => a.title.localeCompare(b.title)),
    []
  );

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
      aria-label="Components navigation"
      className="-translate-y-1/2 fixed inset-y-0 top-1/2 left-[2.5%] z-20 hidden h-[80dvh] w-full max-w-60 items-center md:flex"
      style={{ minWidth: 0 }}
    >
      <div className="flex h-full w-full max-w-3xl flex-col overflow-hidden bg-transparent">
        <div className="relative flex min-h-0 flex-1 flex-col">
          <ScrollArea className="min-h-0 flex-1 p-2">
            <ul className="flex w-full flex-col">
              {sortedComponents.map((c) => {
                const isCurrent = currentId === c.id;
                return (
                  <li className="w-full" key={c.id}>
                    <Link
                      aria-current={isCurrent ? "page" : undefined}
                      className={cn(
                        "block w-full truncate rounded-sm px-4 py-2 text-sm opacity-60 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
                        isCurrent && "bg-muted font-medium opacity-100"
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
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
});

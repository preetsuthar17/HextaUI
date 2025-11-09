"use client";

import Link from "next/link";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { componentsRegistry } from "@/lib/components-registry";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";

export function ComponentsSidebar({ currentId }: { currentId?: string }) {
  const [query, setQuery] = React.useState("");

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

  return (
    <aside
      aria-label="Components navigation"
      className="sticky top-23 hidden h-[70dvh] max-h-[70dvh] w-full max-w-xs md:block"
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
          <ScrollArea className="min-h-0 flex-1 p-2">
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
}

"use client";

import Link from "next/link";
import * as React from "react";
import { componentsRegistry } from "@/lib/components-registry";

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
      className="sticky top-16 hidden h-fit md:block"
    >
      <div className="w-full max-w-3xl border">
        <div className="border-b p-2">
          <label className="sr-only" htmlFor="components-search">
            Search components
          </label>
          <input
            autoComplete="off"
            className="h-9 w-full rounded-md bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
            id="components-search"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components…"
            spellCheck={false}
            value={query}
          />
        </div>
        <nav className="max-h-[70dvh] overflow-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-2 text-center text-muted-foreground text-sm">
              No results
            </div>
          ) : (
            <ul>
              {filtered.map((c) => {
                const isCurrent = currentId === c.id;
                return (
                  <li key={c.id}>
                    <Link
                      aria-current={isCurrent ? "page" : undefined}
                      className={`block truncate rounded-sm px-2 py-1 text-sm outline-none transition-colors hover:bg-accent ${
                        isCurrent ? "bg-accent font-medium" : ""
                      }`}
                      href={`/components/${c.id}`}
                    >
                      {c.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
      </div>
    </aside>
  );
}

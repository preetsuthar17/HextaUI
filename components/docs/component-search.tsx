"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { blocksRegistry } from "@/lib/blocks-registry";
import { componentsRegistry } from "@/lib/components-registry";

// Helper for programmatic open
export function openCommandMenu() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-command-menu"));
  }
}

type SearchItem = {
  id: string;
  title: string;
  description?: string;
  type: "component" | "block";
  category?: string;
};

function ComponentSearchList({
  onSelect,
  query,
}: {
  onSelect: (id: string, type: "component" | "block") => void;
  query: string;
}) {
  const items: SearchItem[] = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const allItems: SearchItem[] = [
      ...componentsRegistry.map((c) => ({
        id: c.id,
        title: c.title,
        description: c.description,
        type: "component" as const,
      })),
      ...blocksRegistry.map((b) => ({
        id: b.id,
        title: b.title,
        description: b.description,
        type: "block" as const,
        category: b.category,
      })),
    ];
    if (!q) return allItems;
    return allItems.filter((item) =>
      [item.title, item.id, item.description ?? "", item.category ?? ""].some(
        (t) => t.toLowerCase().includes(q)
      )
    );
  }, [query]);

  const components = items.filter((item) => item.type === "component");
  const blocks = items.filter((item) => item.type === "block");

  return (
    <CommandList>
      {components.length > 0 && (
        <CommandGroup heading="Components">
          {components.map((c) => (
            <CommandItem
              key={`component-${c.id}`}
              onSelect={() => onSelect(c.id, "component")}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <span className="flex items-center">
                  <span
                    aria-hidden="true"
                    className="inline-block size-3 shrink-0 rounded-full border border-border border-dashed bg-transparent"
                  />
                </span>
                <div className="flex flex-col items-start">
                  <span className="font-medium">{c.title}</span>
                  <span className="text-muted-foreground text-xs">{c.id}</span>
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      )}
      {blocks.length > 0 && (
        <CommandGroup heading="Blocks">
          {blocks.map((b) => (
            <CommandItem
              key={`block-${b.id}`}
              onSelect={() => onSelect(b.id, "block")}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <span className="flex items-center">
                  <span
                    aria-hidden="true"
                    className="inline-block size-3 shrink-0 rounded-full border border-border border-dashed bg-primary/50"
                  />
                </span>
                <div className="flex flex-col items-start">
                  <span className="font-medium">{b.title}</span>
                  <span className="text-muted-foreground text-xs">
                    {b.category ? `${b.category} • ` : ""}
                    {b.id}
                  </span>
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      )}
      {items.length === 0 && (
        <CommandEmpty>No components or blocks found.</CommandEmpty>
      )}
    </CommandList>
  );
}

export function ComponentSearch() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  // Keyboard shortcut: Cmd/Ctrl+K to toggle search
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  // Listen to custom event for open
  React.useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-command-menu", handler);
    return () => window.removeEventListener("open-command-menu", handler);
  }, []);

  // Reset query each time the dialog opens
  React.useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandInput
        autoFocus
        onValueChange={setQuery}
        placeholder="Search components and blocks…"
        value={query}
      />
      <ComponentSearchList
        onSelect={(id, type) => {
          setOpen(false);
          router.push(
            `/${type === "component" ? "components" : "blocks"}/${id}`
          );
        }}
        query={query}
      />
    </CommandDialog>
  );
}

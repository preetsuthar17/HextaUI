"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import {
  CommandMenu,
  CommandMenuContent,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuInput,
  CommandMenuItem,
  CommandMenuList,
  useCommandMenu,
  useCommandMenuShortcut,
} from "@/components/ui/command-menu";
import { blocksRegistry } from "@/lib/blocks-registry";
import { componentsRegistry } from "@/lib/components-registry";

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
}: {
  onSelect: (id: string, type: "component" | "block") => void;
}) {
  const { value } = useCommandMenu();
  const items = React.useMemo(() => {
    const q = value.trim().toLowerCase();
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
  }, [value]);

  const components = items.filter((item) => item.type === "component");
  const blocks = items.filter((item) => item.type === "block");
  let itemIndex = 0;

  return (
    <CommandMenuList>
      {components.length > 0 && (
        <CommandMenuGroup heading="Components">
          {components.map((c) => {
            const index = itemIndex++;
            return (
              <CommandMenuItem
                index={index}
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
                    <span className="text-muted-foreground text-xs">
                      {c.id}
                    </span>
                  </div>
                </div>
              </CommandMenuItem>
            );
          })}
        </CommandMenuGroup>
      )}
      {blocks.length > 0 && (
        <CommandMenuGroup heading="Blocks">
          {blocks.map((b) => {
            const index = itemIndex++;
            return (
              <CommandMenuItem
                index={index}
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
              </CommandMenuItem>
            );
          })}
        </CommandMenuGroup>
      )}
      {items.length === 0 && (
        <CommandMenuEmpty>No components or blocks found.</CommandMenuEmpty>
      )}
    </CommandMenuList>
  );
}

export function ComponentSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  useCommandMenuShortcut(() => setOpen(true));

  React.useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-command-menu", handler);
    return () => window.removeEventListener("open-command-menu", handler);
  }, []);

  return (
    <CommandMenu onOpenChange={setOpen} open={open}>
      <CommandMenuContent onEscapeKeyDown={() => setOpen(false)}>
        <CommandMenuInput
          autoFocus
          placeholder="Search components and blocks…"
        />
        <ComponentSearchList
          onSelect={(id, type) => {
            setOpen(false);
            router.push(
              `/${type === "component" ? "components" : "blocks"}/${id}`
            );
          }}
        />
      </CommandMenuContent>
    </CommandMenu>
  );
}

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
import { componentsRegistry } from "@/lib/components-registry";

function ComponentSearchList({ onSelect }: { onSelect: (id: string) => void }) {
  const { value } = useCommandMenu();
  const items = React.useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return componentsRegistry;
    return componentsRegistry.filter((c) =>
      [c.title, c.id, c.description ?? ""].some((t) =>
        t.toLowerCase().includes(q)
      )
    );
  }, [value]);

  return (
    <CommandMenuList>
      <CommandMenuGroup heading="Components">
        {items.length === 0 && (
          <CommandMenuEmpty>No components found.</CommandMenuEmpty>
        )}
        {items.map((c, i) => (
          <CommandMenuItem index={i} key={c.id} onSelect={() => onSelect(c.id)}>
            <div className="flex flex-col">
              <span className="font-medium">{c.title}</span>
              <span className="text-muted-foreground text-xs">{c.id}</span>
            </div>
          </CommandMenuItem>
        ))}
      </CommandMenuGroup>
    </CommandMenuList>
  );
}

export function ComponentSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  useCommandMenuShortcut(() => setOpen(true));

  return (
    <CommandMenu onOpenChange={setOpen} open={open}>
      <CommandMenuContent onEscapeKeyDown={() => setOpen(false)}>
        <CommandMenuInput autoFocus placeholder="Search components…" />
        <ComponentSearchList
          onSelect={(id) => {
            setOpen(false);
            router.push(`/components/${id}`);
          }}
        />
      </CommandMenuContent>
    </CommandMenu>
  );
}

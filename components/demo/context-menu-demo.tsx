"use client";

import * as React from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export function ContextMenuDemo() {
  const [showHidden, setShowHidden] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className="flex h-[160px] w-[330px] flex-col items-center justify-center rounded-lg border-2 border-dashboard/40 border-dashed bg-transparent text-center text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          tabIndex={0}
        >
          <span className="font-semibold text-base">Project Files</span>
          <span className="mt-1 text-muted-foreground text-xs">
            Right-click to manage your project files
          </span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem>
          Open
          <ContextMenuShortcut>⏎</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>Open With…</ContextMenuItem>
        <ContextMenuItem>
          Rename
          <ContextMenuShortcut>⇧F6</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Duplicate
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Send to</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Email</ContextMenuItem>
            <ContextMenuItem>External Drive</ContextMenuItem>
            <ContextMenuItem>Cloud Storage</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem
          checked={showHidden}
          onCheckedChange={setShowHidden}
        >
          Show Hidden Files
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup
          onValueChange={(v) => setViewMode(v as "list" | "grid")}
          value={viewMode}
        >
          <ContextMenuLabel inset>View Mode</ContextMenuLabel>
          <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
          <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

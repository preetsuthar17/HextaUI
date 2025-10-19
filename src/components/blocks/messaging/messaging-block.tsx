"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import MessageConversation from "./message-conversation";
import MessageInput from "./message-input";
import PeopleList from "./people-list";

export default function MessagingBlock({ className }: { className?: string }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div
      className={cn(
        "relative mx-auto flex h-[80dvh] min-h-0 w-full overflow-hidden rounded-xl border bg-background",
        className
      )}
    >
      <Drawer onOpenChange={setDrawerOpen} open={drawerOpen}>
        <div className="absolute top-2 right-2 z-20">
          <DrawerTrigger asChild>
            <Button
              aria-label="Open people list"
              className="md:hidden"
              size="icon"
              type="button"
              variant="ghost"
            >
              <Menu aria-hidden="true" className="size-6" focusable="false" />
            </Button>
          </DrawerTrigger>
        </div>
        <DrawerContent
          aria-label="People list drawer"
          className="h-full w-full rounded-t-xl bg-background p-0"
          role="dialog"
        >
          <PeopleList
            className="h-[80dvh] w-full rounded-none border-none"
            onPersonClick={() => setDrawerOpen(false)}
          />
          <DrawerClose aria-label="Close people list" />
        </DrawerContent>
      </Drawer>

      <div className="hidden h-full w-72 shrink-0 border-r bg-accent p-2 md:flex">
        <PeopleList className="h-full w-full" />
      </div>
      <div className="flex h-full min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-hidden bg-accent p-2">
          <MessageConversation className="h-full min-h-0" />
        </div>
        <div className="border-t bg-accent p-2">
          <MessageInput className="rounded-ele" />
        </div>
      </div>
    </div>
  );
}

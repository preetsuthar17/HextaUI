"use client";

import { IconMail } from "@tabler/icons-react";
import { Button } from "@/registry/new-york/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/new-york/ui/empty";

export function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconMail aria-hidden="true" size={32} />
        </EmptyMedia>
        <EmptyTitle>No Messages</EmptyTitle>
        <EmptyDescription>
          You have not received any messages yet. Send your first message or
          check back later.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex w-fit flex-row flex-wrap items-center justify-center gap-2">
        <Button>Send Message</Button>
        <Button variant="outline">Refresh</Button>
      </EmptyContent>
    </Empty>
  );
}

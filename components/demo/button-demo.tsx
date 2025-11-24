import { ArrowUpIcon } from "lucide-react";

import { Button } from "@/registry/new-york/ui/button";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Button</Button>
      <Button aria-label="Submit" size="icon" variant="outline">
        <ArrowUpIcon />
      </Button>
    </div>
  );
}

import { BookmarkIcon } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

export function ToggleDemo() {
  return (
    <Toggle
      aria-label="Toggle bookmark"
      className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
      size="sm"
      variant="outline"
    >
      <BookmarkIcon />
      Bookmark
    </Toggle>
  );
}

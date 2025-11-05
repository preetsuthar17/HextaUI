"use client";

import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BadgeDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 py-10">
      <div className="flex flex-wrap gap-3">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge
          aria-label="Verified"
          className="flex items-center gap-1 bg-blue-600 text-white"
        >
          <CheckCircle2 aria-hidden="true" className="size-4 text-white" />
          Verified
        </Badge>
        <Badge variant="destructive">3</Badge>
      </div>
    </div>
  );
}

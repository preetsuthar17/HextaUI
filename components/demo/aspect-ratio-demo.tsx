"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function AspectRatioDemo() {
  return (
    <AspectRatio
      className="h-full w-full overflow-hidden rounded-lg bg-muted"
      ratio={16 / 9}
    >
      <Image
        alt="A beautiful landscape"
        className="h-full w-full object-cover"
        fill
        priority
        sizes="(min-width: 640px) 800px, 100vw"
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
      />
    </AspectRatio>
  );
}

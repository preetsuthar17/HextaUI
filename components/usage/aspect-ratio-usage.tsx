import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export function AspectRatioDemo() {
  return (
    <AspectRatio className="rounded-lg bg-muted" ratio={16 / 9}>
      <Image
        alt="Photo by Drew Beamer"
        className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
        fill
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
      />
    </AspectRatio>
  );
}

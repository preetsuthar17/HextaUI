"use client";

import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

const PixelBlast = dynamic(() => import("@/components/pixel-blast").then(mod => ({ default: mod.PixelBlast })), {
  ssr: false,
  loading: () => <div className="size-64 sr-only" />,
});

export default function ShowcaseIndexPage() {
  return (
    <div className="flex h-full flex-col items-center justify-between gap-4 py-16 text-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <PixelBlast color="var(--primary)" />
        <h1 className="font-bold text-4xl">Showcase</h1>
        <p className="text-muted-foreground">
          Carefully designed and crafted projects using HextaUI design system.
        </p>
        <Button asChild>
          <Link
            href="https://www.ikiform.com/f/hextaui-showase-submission-j2e9pt"
            rel="noopener noreferrer"
            target="_blank"
          >
            Submit your project
            <ArrowUpRightIcon className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <p>Be the first to showcase your project!</p>
      </div>
    </div>
  );
}

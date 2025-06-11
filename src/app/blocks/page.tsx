import Link from "next/link";

import type { Metadata } from "next";
import { customMetaDataGenerator } from "@/lib/customMetaDataGenerator";
import { DashboardBlock } from "@/components/blocks/Dashboard";

export const metadata: Metadata = customMetaDataGenerator({
  title: "Blocks",
  description:
    "Modern, responsive, customizable UI components for Next.js. Copy, adapt, and personalize them.",
  ogImage: "/Banner.png",
  twitterCard: "summary_large_image",
  canonicalUrl: "https://hextaui.com/blocks",
});

export default function BlocksPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="flex flex-col px-4 gap-24 py-24">
        <div className="flex flex-col text-center items-center justify-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Blocks
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore the various blocks available for building your application.
          </p>
        </div>
        <div className="w-full">
          <DashboardBlock />
        </div>
      </div>
    </main>
  );
}

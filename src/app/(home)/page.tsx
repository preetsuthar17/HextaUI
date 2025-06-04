import Link from "next/link";

import type { Metadata } from "next";
import { customMetaDataGenerator } from "@/lib/customMetaDataGenerator";

export const metadata: Metadata = customMetaDataGenerator({
  title: "Build stunning websites effortlessly",
  description:
    "Modern, responsive, customizable UI components for Next.js. Copy, adapt, and personalize them.",
  ogImage: "/banner.png",
  twitterCard: "summary_large_image",
  canonicalUrl: "https://hextaui.com",
});

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">Hello World</h1>
      <p className="text-fd-muted-foreground">
        You can open{" "}
        <Link
          href="/docs"
          className="text-fd-foreground font-semibold underline"
        >
          /docs
        </Link>{" "}
        and see the documentation.
      </p>
    </main>
  );
}

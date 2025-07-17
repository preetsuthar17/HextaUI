import { customMetaDataGenerator } from "@/lib/customMetaDataGenerator";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = customMetaDataGenerator({
  title: "Build stunning websites effortlessly",
  description:
    "Modern, responsive, customizable UI components. Copy, adapt, and personalize them.",
  ogImage:
    "https://5xfmztgsig.ufs.sh/f/ZzCwT4wrsqrVmq9mO6tz0X6izIUFr2K3BjZsywEuengRkcYo",
  twitterCard: "summary_large_image",
  canonicalUrl: "https://hextaui.com",
});

export default function notFound() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center my-20 gap-4">
      <h1 className="text-4xl font-bold text-primary">404</h1>
      <p className="text-primary/70 text-lg">
        The page you're looking for could not be found.
      </p>
      <Link href="/" className="text-primary underline">
        Go back home
      </Link>
    </main>
  );
}

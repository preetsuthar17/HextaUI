import type { Metadata } from "next";
import { customMetaDataGenerator } from "@/lib/customMetaDataGenerator";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/home/Hero"));
const Features = dynamic(() => import("@/components/home/Features"));
const WallOfLove = dynamic(() => import("@/components/home/WallOfLove"));
const Contributors = dynamic(() => import("@/components/home/Contributors"));
const CTA = dynamic(() => import("@/components/home/CTA"));
const Footer = dynamic(() => import("@/components/home/Footer"));

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
    <main className="flex flex-1 flex-col justify-center text-center mt-20">
      <Hero />
      <Features />
      <WallOfLove />
      <Contributors />
      <CTA />
      <Footer />
    </main>
  );
}

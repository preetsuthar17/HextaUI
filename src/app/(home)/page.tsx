import type { Metadata } from "next";
import { customMetaDataGenerator } from "@/lib/customMetaDataGenerator";

import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Community from "@/components/home/Community";
import Footer from "@/components/home/Footer";
import ComponentShowcase from "@/components/home/ComponentShowcase";
import ProBlocksShowcase from "@/components/home/ProBlocksShowcase";
import Contributors from "@/components/home/Contributors";
import WallOfLove from "@/components/home/WallOfLove";
import Pricing from "../../components/home/Pricing";
import Sponsors from "@/components/home/Sponsors";

export const metadata: Metadata = customMetaDataGenerator({
  title: "Build stunning websites effortlessly",
  description:
    "Modern, responsive, customizable UI components. Copy, adapt, and personalize them.",
  ogImage: "/Banner.png",
  twitterCard: "summary_large_image",
  canonicalUrl: "https://hextaui.com",
});

export default function HomePage() {
  return (
    <main className="flex h-full flex-col justify-center text-center w-full max-w-5xl mx-auto border-l border-r">
      <Hero />
      <ComponentShowcase />
      <ProBlocksShowcase />
      <Pricing />
      <WallOfLove />
      <Features />
      <Sponsors />
      <Contributors />
      <Community />
      <Footer />
    </main>
  );
}

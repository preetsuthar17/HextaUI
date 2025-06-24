import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";

import type { Metadata } from "next";
import { customMetaDataGenerator } from "@/lib/customMetaDataGenerator";

export const metadata: Metadata = customMetaDataGenerator({
  title: "Themes",
  description: "Explore and customize themes for your application.",
  ogImage: "/Banner.png",
  twitterCard: "summary_large_image",
  canonicalUrl: "https://pro.hextaui.com/themes",
});

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        {
          text: "Docs",
          url: "/docs/ui/getting-started/introduction",
          secondary: false,
        },
        {
          text: "Components",
          url: "/docs/ui/foundation/components",
          secondary: false,
        },
        {
          text: "Blocks",
          url: "https://pro.hextaui.com/blocks",
          secondary: false,
        },
        {
          text: "Themes",
          url: "https://pro.hextaui.com/themes",
          secondary: false,
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}

import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        {
          text: "Docs",
          url: "/docs/getting-started/introduction",
          secondary: false,
        },
        {
          text: "Components",
          url: "/docs/components",
          secondary: false,
        },
        {
          text: "Blocks",
          url: "https://pro.hextaui.com/blocks",
          secondary: false,
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}

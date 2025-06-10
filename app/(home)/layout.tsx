import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";

import { LayoutPanelTop, Star } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { TbSparkles } from "react-icons/tb";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        {
          text: "HextaUI v2",
          url: "/docs/hexta-ui-v2",
        },
        {
          text: "Components",
          url: "/docs/animation/apple-hello-effect",
          active: "url",
          icon: <LayoutPanelTop />,
        },

        {
          text: "Showcase",
          url: "/showcase",
          active: "nested-url",
          icon: <TbSparkles />,
        },
        {
          text: "Sponsors",
          url: "/sponsors",
          active: "nested-url",
          icon: <Star />,
        },
        {
          text: "Discord",
          url: "https://t.co/H48AyU1HnG",
          active: "nested-url",
          icon: <FaDiscord />,
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}

import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import Image from "next/image";

import { LayoutPanelTop, Star } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { TbSparkles } from "react-icons/tb";

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */

export const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/preetsuthar17/HextaUI",
  nav: {
    title: (
      <div className="flex items-center justify-center gap-2 font-semibold text-sm">
        <Image src="/logo.svg" alt="HextaUI" width={17} height={17} />
        HextaUI
      </div>
    ),
    transparentMode: "top",
  },

  links: [
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
  ],
};

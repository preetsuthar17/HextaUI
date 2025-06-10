import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import Image from "next/image";

import { TbSparkles } from "react-icons/tb";

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
      text: "HextaUI v2",
      url: "/docs/hexta-ui-v2",
      icon: <TbSparkles />,
    },
  ],
};

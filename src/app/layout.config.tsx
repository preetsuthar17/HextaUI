import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/preetsuthar17/HextaUI",

  nav: {
    title: (
      <>
        <Image
          src="https://5xfmztgsig.ufs.sh/f/ZzCwT4wrsqrVtobqq9xNxCS7Zb4WiHRBPtFmL5aoKp6vgMA2"
          alt="HextaUI"
          width={17}
          height={17}
        />
        HextaUI
      </>
    ),
  },

  // see https://fumadocs.dev/docs/ui/navigation/links
};

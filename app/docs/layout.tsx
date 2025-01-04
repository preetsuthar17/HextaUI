import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";

import Image from "next/image";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions}
      sidebar={{
        defaultOpenLevel: 1,
      }}
      nav={{
        title: (
          <div className="flex items-center justify-center gap-2 font-medium text-sm">
            <Image src="/logo.svg" alt="PixelUI" width={17} height={17} />
            Pixel UI
          </div>
        ),
        transparentMode: "always",
      }}
    >
      {children}
    </DocsLayout>
  );
}

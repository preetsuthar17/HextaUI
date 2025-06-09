import { loader } from "fumadocs-core/source";
import { docs } from "@/.source";
import { createMDXSource } from "fumadocs-mdx";
import { icons } from "lucide-react";
import { createElement } from "react";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  pageTree: {
    attachFile(node, file) {
      if (!file) return node;

      const data = file.data.data as {
        new: boolean;
        pro: boolean;
        soon: boolean;
      };
      if (data.new)
        node.name = (
          <>
            {node.name}
            <span className="border-blue-600 border bg-blue-600 text-white text-xs py-0.2 px-2 rounded-md mx-[5px]">
              New
            </span>
          </>
        );
      else if (data.pro)
        node.name = (
          <>
            {node.name}
            <span className="border-orange-600 border bg-orange-600 text-white text-xs py-0.2 px-2 rounded-md mx-[5px]">
              Pro
            </span>
          </>
        );
      else if (data.soon)
        node.name = (
          <>
            {node.name}
            <span className="border-yellow-600 border bg-yellow-600 text-white text-xs py-0.2 px-2 rounded-md mx-[5px]">
              Soon
            </span>
          </>
        );

      return node;
    },
  },
  icon(icon) {
    if (icon && icon in icons)
      return createElement(icons[icon as keyof typeof icons]);
  },
});

import { docs, meta } from "@/.source";
import { createMDXSource } from "fumadocs-mdx";
import { loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { createElement } from "react";

export const source = loader({
  baseUrl: "/docs",
  source: createMDXSource(docs, meta),
  pageTree: {
    attachFile(node, file) {
      if (!file) return node;

      const data = file.data.data as {
        new: boolean;
        pro: boolean;
      };
      if (data.new)
        node.name = (
          <>
            {node.name}
            <div className="border-green-600 border bg-green-300 text-black text-xs py-0.2 px-2 rounded-md font-semibold">
              New
            </div>
          </>
        );
      else if (data.pro)
        node.name = (
          <>
            {node.name}
            <div className="border-yellow-600 border bg-yellow-300 text-black text-xs py-0.2 px-2 rounded-md font-semibold">
              Pro
            </div>
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

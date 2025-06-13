import { loader } from "fumadocs-core/source";
import { docs } from "@/.source";
import { createMDXSource } from "fumadocs-mdx";
import { icons } from "lucide-react";
import { createElement } from "react";
import { Badge } from "@/components/ui/badge";

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
            <Badge size="sm" variant="secondary">
              New
            </Badge>
          </>
        );
      else if (data.pro)
        node.name = (
          <>
            {node.name}
            <Badge size="sm" variant="secondary">
              Pro
            </Badge>
          </>
        );
      else if (data.soon)
        node.name = (
          <>
            {node.name}
            <Badge size="sm" variant="secondary">
              Soon
            </Badge>
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

import defaultComponents from "fumadocs-ui/mdx";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";

import type { MDXComponents } from "mdx/types";
import { createGenerator } from "fumadocs-typescript";
import { AutoTypeTable } from "fumadocs-typescript/ui";

const generator = createGenerator();

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    AutoTypeTable: (props) => (
      <AutoTypeTable {...props} generator={generator} />
    ),
    Tab,
    Tabs,
    ...components,
  };
}

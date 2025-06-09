import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";

import { remarkInstall } from "fumadocs-docgen";

import { z } from "zod";

export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema.extend({
      new: z.boolean().default(false),
      pro: z.boolean().default(false),
      soon: z.boolean().default(false),
    }),
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkInstall],
  },
  lastModifiedTime: "git",
});

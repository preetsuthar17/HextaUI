import { plugin as shadcn } from "@shadcn/lint"
import tsParser from "@typescript-eslint/parser"
import { defineConfig, globalIgnores } from "eslint/config"

const eslintConfig = defineConfig([
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { shadcn },
    rules: {
      "shadcn/no-restyle": [
        "error",
        {
          allow: ["layout"],
          contracts: [
            { pattern: "^AspectRatio$", allow: ["layout", "shape"] },
            { pattern: "^Skeleton", allow: ["layout", "shape"] },
            { pattern: "^ScrollArea$", allow: ["layout", "shape"] },
            { pattern: "^Attachment", allow: ["layout", "shape"] },
            { pattern: "^Avatar", allow: ["layout", "shape"] },
            { pattern: "^Badge", allow: ["layout", "shape"] },
            { pattern: "^Card(Header|Footer)$", allow: ["layout", "shape"] },
            {
              pattern: "^NumberFlow$",
              allow: ["layout", "shape", "typography"],
            },
            { pattern: "^Collapsible$", allow: ["layout", "spacing"] },
            {
              pattern: "^PopoverContent$",
              allow: ["layout", "spacing"],
            },
            {
              pattern: "^ContextMenuTrigger$",
              allow: ["layout", "shape", "spacing", "typography", "color"],
            },
            {
              pattern: "^CollapsibleContent$",
              allow: ["layout", "spacing", "typography", "color"],
            },
          ],
        },
      ],
      "shadcn/no-raw-colors": "error",
      "shadcn/no-arbitrary-values": ["error", { allow: ["layout"] }],
      "shadcn/no-inline-styles": "error",
      "shadcn/require-static-classes": "error",
      "shadcn/no-unknown-classes": "error",
    },
  },
  {
    files: ["components/ui/**"],
    rules: {
      "shadcn/no-restyle": "off",
      "shadcn/no-arbitrary-values": "off",
      "shadcn/require-static-classes": "off",
      "shadcn/no-inline-styles": [
        "error",
        { allow: ["--ratio", "--progress"] },
      ],
    },
  },
  {
    files: ["components/ui/chart.tsx"],
    rules: {
      "shadcn/no-inline-styles": "off",
    },
  },
  {
    files: ["{app,lib}/**/*{opengraph,twitter}-image.tsx"],
    rules: {
      "shadcn/no-inline-styles": "off",
      "shadcn/no-raw-colors": "off",
    },
  },
  {
    files: ["**/*.test.{ts,tsx}"],
    rules: {
      "shadcn/no-inline-styles": "off",
    },
  },
  globalIgnores([
    ".next/**",
    ".wrangler/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
])

export default eslintConfig

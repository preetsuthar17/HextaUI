"use client";

import { parseAsStringEnum, useQueryState } from "nuqs";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";
import CodeBlock from "./code-block";

const parseInstallationTab = parseAsStringEnum(["cli", "manual"]).withDefault(
  "cli"
);

export function ComponentInstallation({
  componentName,
  installCode,
  componentCode,
}: {
  componentName: string;
  installCode?: string;
  componentCode?: string | null;
}) {
  const [tab, setTab] = useQueryState("install", parseInstallationTab);

  return (
    <>
      <h2>Installation</h2>
      <Tabs
        className="w-full"
        onValueChange={(value) => setTab(value as "cli" | "manual")}
        value={tab}
      >
        <TabsList>
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>
        <TabsContent className="mt-4" value="cli">
          <CodeBlock
            code={
              installCode ??
              `pnpm dlx shadcn@latest add @hextaui/${componentName}`
            }
            lang="package-install"
          />
        </TabsContent>
        <TabsContent className="mt-4" value="manual">
          {componentCode ? (
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Copy and paste the following code into your project:
              </p>
              <CodeBlock code={componentCode} lang="tsx" />
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Component code not available.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}

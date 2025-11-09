import type * as React from "react";

import CodeBlock from "@/components/code-block";
import { getComponentMetaById } from "@/lib/components-registry";

type ComponentPreviewProps = {
  children: React.ReactNode;
  code?: string;
  lang?: Parameters<typeof CodeBlock>[0]["lang"];
  filename?: string;
  className?: string;
  autoCodeFrom?: React.ComponentType<any>;
  componentId?: string;
  codeKind?: "usage" | "demo";
};

export function ComponentPreview({
  children,
  code,
  lang = "tsx",
  filename,
  className = "",
  autoCodeFrom,
  componentId,
  codeKind = "demo",
}: ComponentPreviewProps) {
  function tryGenerateCodeFromComponent(
    comp?: React.ComponentType<any>
  ): string | null {
    if (!comp) return null;
    try {
      const fnStr = comp.toString();
      const match = fnStr.match(/return\s*(\([\s\S]*\));?/m);
      const body = match ? match[1] : null;
      const compName = (comp as any).displayName || comp.name || "Example";
      if (body) {
        return `export function ${compName}() {\n  return ${body}\n}`;
      }
      return null;
    } catch {
      return null;
    }
  }

  let resolvedCode = typeof code === "string" && code.length > 0 ? code : "";

  if (!resolvedCode && componentId) {
    const meta = getComponentMetaById(componentId);
    if (meta) {
      resolvedCode =
        (codeKind === "usage" ? meta.usageCode : meta.demoCode) || "";
      if (!filename) {
        filename = `${componentId}-${codeKind}.tsx`;
      }
    }
  }

  if (!resolvedCode) {
    resolvedCode = tryGenerateCodeFromComponent(autoCodeFrom) ?? "";
  }

  return (
    <div className={"rounded-lg border bg-card"}>
      <div className="p-4">
        <div
          className={`flex min-h-84 items-center justify-center rounded-md bg-transparent p-4 ${className}`}
        >
          {children}
        </div>
      </div>

      {resolvedCode ? (
        <div>
          <CodeBlock
            className="max-h-120 overflow-y-auto rounded-t-none rounded-b-lg border-0 border-t bg-code"
            code={resolvedCode}
            filename={filename}
            lang={lang}
          />
        </div>
      ) : null}
    </div>
  );
}

export default ComponentPreview;

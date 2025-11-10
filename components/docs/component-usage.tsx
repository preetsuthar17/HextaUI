import CodeBlock from "@/components/docs/code-block";

type ComponentUsageProps = {
  imports?: string | null;
  code?: string | null;
};

export function ComponentUsage({ imports, code }: ComponentUsageProps) {
  const hasImports = typeof imports === "string" && imports.length > 0;
  const hasCode = typeof code === "string" && code.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <h2>Example Usage</h2>
      {hasImports ? <CodeBlock code={imports as string} lang="tsx" /> : null}
      {hasCode ? <CodeBlock code={code as string} lang="tsx" /> : null}
    </div>
  );
}

export default ComponentUsage;

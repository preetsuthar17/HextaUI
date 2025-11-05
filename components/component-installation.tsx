import CodeBlock from "./code-block";

export function ComponentInstallation({
  componentName,
  installCode,
}: {
  componentName: string;
  installCode?: string;
}) {
  return (
    <>
      <h2>Installation using CLI</h2>
      <CodeBlock
        code={
          installCode ??
          `pnpm dlx shadcn@latest add https://hextaui.com/r/${componentName}.json`
        }
        lang="package-install"
      />
    </>
  );
}

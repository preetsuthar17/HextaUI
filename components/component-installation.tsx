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
          installCode ?? `pnpm dlx shadcn@latest add @hextaui/${componentName}`
        }
        lang="package-install"
      />
    </>
  );
}

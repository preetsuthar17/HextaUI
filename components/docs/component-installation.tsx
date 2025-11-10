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
      {/* <h2>Add HextaUI to components.json</h2>
      <p>Add the following to your <code>components.json</code> file:</p>
      <CodeBlock
        code={`{
  "registries": {
    "@hextaui": "https://hextaui.com/r/{name}.json"
  }
}`}
        lang="json"
      /> */}
      <h2>Installation using CLI</h2>
      <CodeBlock
        code={
          installCode ??
          `pnpm dlx shadcn@latest add @hextaui/${componentName}`
        }
        lang="package-install"
      />
    </>
  );
}

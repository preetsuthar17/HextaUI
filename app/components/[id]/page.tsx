import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { AskAIButton } from "@/components/ask-ai-button";
import ComponentHeaderActions from "@/components/component-header-actions";
import { ComponentInstallation } from "@/components/component-installation";
import { ComponentPrevNext } from "@/components/component-prev-next";
import { ComponentPreview } from "@/components/component-preview";
import { ComponentSection } from "@/components/component-section";
import ComponentUsage from "@/components/component-usage";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getComponentMetaById } from "@/lib/components-registry";

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const resolved = await params;
  const id = (resolved.id ?? "").trim();
  const meta = id ? getComponentMetaById(id) : undefined;

  if (!meta) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8">
        <h1 className="font-semibold text-2xl tracking-tight">
          Component not found
        </h1>
        <p className="text-muted-foreground">No component with id “{id}”.</p>
        <div>
          <Button asChild variant="secondary">
            <Link href="/components">Back to Components</Link>
          </Button>
        </div>
      </div>
    );
  }

  const Demo = meta.Demo;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-14 font-sans">
      <header className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-3xl tracking-tight">
            {meta.title}
          </h1>
          {meta.description && (
            <p className="text-muted-foreground">{meta.description}</p>
          )}
          {(meta.api_ref || meta.docs_ref) && (
            <div className="flex items-center gap-3">
              {meta.docs_ref && (
                <Button asChild size="sm" variant="secondary">
                  <Link href={meta.docs_ref} target="_blank">
                    Docs <ExternalLink className="size-3" />
                  </Link>
                </Button>
              )}
              {meta.api_ref && (
                <Button asChild size="sm" variant="secondary">
                  <Link href={meta.api_ref} target="_blank">
                    API Reference <ExternalLink className="size-3" />
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <AskAIButton componentId={meta.id} />
          <ComponentHeaderActions componentId={meta.id} />
        </div>
      </header>

      {/* Demo first */}
      <ComponentSection id="demo">
        <ComponentPreview
          autoCodeFrom={meta.demoCode ? undefined : Demo}
          codeKind="demo"
          componentId={meta.id}
        >
          <Demo />
        </ComponentPreview>
      </ComponentSection>

      {/* Installation second */}
      <ComponentSection id="installation">
        <ComponentInstallation
          componentName={meta.id}
          installCode={meta.installCode}
        />
      </ComponentSection>

      <ComponentSection id="usage">
        <ComponentUsage code={meta.usageCode} imports={meta.usageImports} />
      </ComponentSection>
      <Separator />
      <ComponentPrevNext currentId={meta.id} />
    </div>
  );
}

import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AskAIButton } from "@/components/docs/ask-ai-button";
import ComponentHeaderActions from "@/components/docs/component-header-actions";
import { ComponentPrevNext } from "@/components/docs/component-prev-next";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentSection } from "@/components/docs/component-section";
import ComponentUsage from "@/components/docs/component-usage";
import { ComponentsSidebar } from "@/components/docs/components-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import {
  componentsRegistry,
  getComponentMetaById,
} from "@/lib/components-registry";
import { getComponentCode } from "@/lib/get-component-code";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";

const ComponentInstallation = dynamic(
  () =>
    import("@/components/docs/component-installation").then(
      (mod) => mod.ComponentInstallation
    ),
  {
    loading: () => <Spinner />,
    ssr: true,
  }
);

export function generateStaticParams() {
  return componentsRegistry.map((component) => ({
    id: component.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id?: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const id = (resolved.id ?? "").trim();
  const meta = id ? getComponentMetaById(id) : undefined;

  if (!meta) {
    return generatePageMetadata({
      title: "Component not found - HextaUI",
      description: `No component with id "${id}".`,
      url: `/components/${id}`,
    });
  }

  return generatePageMetadata({
    title: `${meta.title} - HextaUI`,
    description: meta.description,
    url: `/components/${meta.id}`,
    image: `https://www.hextaui.com/og?component=${meta.id}`,
    keywords: [
      meta.title,
      meta.id,
      "shadcn/ui",
      "react component",
      "ui component",
    ],
  });
}

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
      <div className="mx-auto flex w-[95%] flex-col gap-4">
        <h1 className="font-semibold text-3xl tracking-tight">
          Component not found
        </h1>
        <p className="text-muted-foreground">
          No component found with id “{id}”.
        </p>
        <div>
          <Button asChild>
            <Link href="/components">
              <ArrowLeft /> Back to Components
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const Demo = meta.Demo;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 py-12">
      <div className="flex justify-evenly gap-12">
        <ComponentsSidebar currentId={meta.id} />
        <div className="flex w-full max-w-4xl flex-col gap-12">
          <header className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-1 flex-col gap-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/components">Components</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{meta.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <h1 className="wrap-break-word font-semibold text-3xl tracking-tight">
                {meta.title}
              </h1>
              {meta.description && (
                <p className="text-muted-foreground">{meta.description}</p>
              )}
              {(meta.api_ref || meta.docs_ref) && (
                <div className="flex flex-wrap items-center gap-3">
                  {meta.docs_ref && (
                    <Button asChild size="sm" variant="secondary">
                      <Link
                        href={meta.docs_ref}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Docs <ExternalLink className="size-3" />
                      </Link>
                    </Button>
                  )}
                  {meta.api_ref && (
                    <Button asChild size="sm" variant="secondary">
                      <Link
                        href={meta.api_ref}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        API Reference <ExternalLink className="size-3" />
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center gap-2 md:mt-0">
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
              componentCode={getComponentCode(meta.id)}
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
      </div>
    </div>
  );
}

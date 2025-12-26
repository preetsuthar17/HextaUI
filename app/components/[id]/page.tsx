import { ArrowLeft, ArrowRightIcon, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import CarbonAds from "@/components/carbon";
import { AskAIButton } from "@/components/docs/ask-ai-button";
import ComponentHeaderActions from "@/components/docs/component-header-actions";
import { ComponentPrevNext } from "@/components/docs/component-prev-next";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentSection } from "@/components/docs/component-section";
import ComponentUsage from "@/components/docs/component-usage";
import { ComponentsSidebar } from "@/components/docs/components-sidebar";
import { OpenInV0Button } from "@/components/docs/open-in-v0-button";
import {
  componentsRegistry,
  getComponentMetaById,
} from "@/lib/components-registry";
import { getComponentCode } from "@/lib/get-component-code";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/new-york/ui/breadcrumb";
import { Button } from "@/registry/new-york/ui/button";
import { Separator } from "@/registry/new-york/ui/separator";
import { Spinner } from "@/registry/new-york/ui/spinner";

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
    <div className="mx-auto flex max-w-[95%] flex-col gap-8 py-12">
      <div className="flex w-full gap-8">
        <aside className="hidden w-1/5 min-w-[180px] max-w-[240px] flex-col md:flex">
          <ComponentsSidebar currentId={meta.id} />
        </aside>
        <div className="z-22 mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 bg-background">
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
            <div className="flex justify-end">
              <OpenInV0Button
                url={`https://www.hextaui.com/r/${meta.id}.json`}
              />
            </div>
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
        <aside className="hidden w-1/5 min-w-[180px] max-w-[240px] flex-col items-end gap-4 md:flex">
          <div className="flex flex-col gap-2 border border-dashed p-4 sm:p-6">
            <h2 className="flex flex-wrap items-center gap-2 font-semibold text-xl leading-tight tracking-tighter">
              <span className="block shrink-0">
                <Image
                  alt="ikiform logo"
                  className="shrink-0 dark:invert"
                  height={32}
                  src="https://ikiform.com/favicon.ico"
                  width={32}
                />
              </span>
              Build Forms, Collect Responses & Analyze.
            </h2>
            <p className="text-muted-foreground text-sm">
              The open-source forms platform for effortless data collection and
              analysis.
            </p>
            <div>
              <Button asChild variant={"outline"}>
                <a
                  data-s-event="Blocks/Components link: ikiform.com"
                  data-s-event-props="location=blocks/components;label=ikiform.com"
                  href="https://ikiform.com?utm_source=hextaui&utm_medium=referral&utm_campaign=component-docs&ref=hextaui.com"
                  rel="noopener noreferrer"
                  role="button"
                  style={{ textDecoration: "none" }}
                  tabIndex={0}
                  target="_blank"
                  type="button"
                >
                  Start collecting responses
                  <ArrowRightIcon aria-hidden="true" className="ml-1 size-4" />
                </a>
              </Button>
            </div>
          </div>
          <CarbonAds />
        </aside>
      </div>
    </div>
  );
}

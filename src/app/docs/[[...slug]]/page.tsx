import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";

import { customMetaDataGenerator } from "@/lib/customMetaDataGenerator";
import AskChatGPTButton from "@/components/other/AskChatGPTButton";
import CarbonAds from "@/components/other/carbon";
import CopyMarkdownButton from "@/components/other/CopyMarkdownButton";
import { LLMCopyButton, ViewOptions } from "@/components/ai/page-actions";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        style: "clerk",
      }}
      breadcrumb={{
        includeRoot: true,
        includeSeparator: true,
      }}
      footer={{
        enabled: true,
      }}
      editOnGithub={{
        owner: "preetsuthar17",
        repo: "hextaui",
        sha: "master",
        path: `content/docs/${page.file.path}`,
      }}
      lastUpdate={
        page.data.lastModified ? new Date(page.data.lastModified) : undefined
      }
      article={{
        className: "max-sm:pb-16",
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
      <div className="flex gap-2">
        <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
        <ViewOptions
          markdownUrl={`${page.url}.mdx`}
          githubUrl={`https://github.com/preetsuthar17/hextaui/blob/dev/apps/docs/content/docs/${page.path}`}
        />
      </div>
      <CarbonAds format="cover" />
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return customMetaDataGenerator({
    title: page.data.title,
    description: page.data.description,
    canonicalUrl: `https://hextaui.com/docs/${page.slugs.join("/")}`,
  });
}

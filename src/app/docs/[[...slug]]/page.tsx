import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";

import { Metadata } from "next";
import { customMetaDataGenerator } from "@/lib/customMetaDataGenerator";

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
        enabled: false,
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
      <DocsDescription>{page.data.description}</DocsDescription>
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

import type { Metadata } from "next"
import { notFound } from "next/navigation"

import Link from "@/components/site/link"
import { DocsBreadcrumbs } from "@/components/docs/docs-breadcrumbs"
import { DocsCommand } from "@/components/docs/docs-command"
import {
  DocsCode,
  DocsParagraph,
  DocsSection,
} from "@/components/docs/docs-content"
import { DocsExample } from "@/components/docs/docs-example"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsPropsTable } from "@/components/docs/docs-props-table"
import { DocsRelated } from "@/components/docs/docs-related"
import { JsonLd } from "@/components/site/json-ld"
import {
  docsComponents,
  docsEntries,
  getDocsComponent,
  getDocsExampleHref,
  type DocsTocItem,
} from "@/lib/docs"
import {
  getAllDocsExamples,
  getDocsExample,
  getExampleDescription,
  getExampleHeading,
  getExampleProps,
  getExampleText,
  getExampleTitle,
} from "@/lib/docs-examples"
import { getDocsExampleName } from "@/lib/docs-markdown"
import { getRelatedDocs } from "@/lib/docs-related"
import { readDocsSource } from "@/lib/docs-source"
import { ogImagePath, pageMetadata } from "@/lib/metadata"
import { absoluteUrl } from "@/lib/site"
import { docsArticleJsonLd } from "@/lib/structured-data"

export const dynamicParams = false

const linkClassName =
  "text-foreground underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground"

export async function generateStaticParams() {
  return (await getAllDocsExamples()).map((example) => ({
    file: example.slug,
    example: example.id,
  }))
}

async function load(
  params: PageProps<"/docs/[file]/examples/[example]">["params"]
) {
  const { file, example } = await params
  if (!docsEntries.some((entry) => entry.slug === file)) return null
  const found = await getDocsExample(file, example)
  return found ? { component: getDocsComponent(file), ...found } : null
}

export async function generateMetadata({
  params,
}: PageProps<"/docs/[file]/examples/[example]">): Promise<Metadata> {
  const found = await load(params)
  if (!found) return {}
  const { component, example } = found
  const href = getDocsExampleHref(example.file)

  return pageMetadata({
    title: getExampleTitle(component.name, example.title),
    description: getExampleDescription(component.name, example),
    path: href,
    markdown: `${href}.md`,
    image: ogImagePath("docs", component.slug),
    type: "article",
  })
}

export default async function Page({
  params,
}: PageProps<"/docs/[file]/examples/[example]">) {
  const found = await load(params)
  if (!found) notFound()
  const { component, example, api, siblings } = found
  const href = getDocsExampleHref(example.file)
  const componentHref = `/docs/${component.slug}`
  const heading = getExampleHeading(component.name, example.title)
  const registryName = getDocsExampleName(example.file)
  const source = await readDocsSource(`components/examples/${example.file}.tsx`)
  const parts = getExampleProps(api, source)
  const others = siblings.filter((item) => item.id !== example.id)
  const crumbs = [
    { name: "Docs", path: "/docs" },
    ...(docsComponents.some((item) => item.slug === component.slug)
      ? [{ name: "Components", path: "/components" }]
      : []),
    { name: component.name, path: componentHref },
    { name: example.title, path: href },
  ]
  const toc: DocsTocItem[] = [
    { id: "add-this-example", title: "Add this example" },
    ...(parts.length > 0
      ? [{ id: "props-in-this-example", title: "Props in this example" }]
      : []),
    ...(others.length > 0
      ? [
          {
            id: "more-examples",
            title: `More ${component.name} examples`,
          },
        ]
      : []),
  ]

  return (
    <DocsPage
      href={href}
      title={heading}
      description={
        example.description ??
        `The ${example.title} example of the ${component.name} component.`
      }
      markdownHref={`${href}.md`}
      registryHref={`/r/${registryName}.json`}
      navItems={siblings.map((item) => ({
        title: item.title,
        href: getDocsExampleHref(item.file),
      }))}
      eyebrow={<DocsBreadcrumbs crumbs={crumbs} className="mb-2" />}
      toc={toc}
    >
      <JsonLd
        data={docsArticleJsonLd({
          path: href,
          headline: heading,
          description: getExampleText(example) || heading,
          breadcrumbs: crumbs,
          image: ogImagePath("docs", component.slug),
          code: {
            name: `${component.name} ${example.title} example`,
            free: true,
            license: "https://opensource.org/licenses/MIT",
            sampleType: "code snippet",
            basedOn: componentHref,
          },
        })}
      />
      <DocsExample
        file={example.file}
        previewClassName={example.previewClassName}
      >
        {example.demo}
      </DocsExample>

      <DocsSection title="Add this example">
        <DocsParagraph>
          This adds the example as{" "}
          <DocsCode>{`components/examples/${example.file}.tsx`}</DocsCode>,
          together with the {component.name} component and the HextaUI theme
          tokens it needs.
        </DocsParagraph>
        <DocsCommand
          mode="dlx"
          packages={[
            "shadcn@latest",
            "add",
            absoluteUrl(`/r/${registryName}.json`),
          ]}
        />
        <DocsParagraph>
          To add only the component, follow the{" "}
          <Link
            href={`${componentHref}#installation`}
            className={linkClassName}
          >
            {component.name} installation
          </Link>
          .
        </DocsParagraph>
      </DocsSection>

      {parts.length > 0 ? (
        <DocsSection
          title="Props in this example"
          description={`The ${component.name} props this example sets, from the API reference.`}
        >
          {parts.map((part) => (
            <DocsSection key={part.name} title={part.name} level={3}>
              <DocsPropsTable props={part.props} />
            </DocsSection>
          ))}
          <DocsParagraph>
            Every prop is in the{" "}
            <Link
              href={`${componentHref}#api-reference`}
              className={linkClassName}
            >
              {component.name} API reference
            </Link>
            .
          </DocsParagraph>
        </DocsSection>
      ) : null}

      <DocsRelated
        id="more-examples"
        title={`More ${component.name} examples`}
        variant="names"
        links={others.map((item) => ({
          href: getDocsExampleHref(item.file),
          title: item.title,
          description: getExampleText(item),
        }))}
      >
        <DocsParagraph className="mt-0">
          See them all, with keyboard support and accessibility notes, on the{" "}
          <Link href={componentHref} className={linkClassName}>
            {component.name} page
          </Link>
          .
        </DocsParagraph>
      </DocsRelated>

      <DocsRelated
        title="Related components"
        links={getRelatedDocs(component.slug)}
      />
    </DocsPage>
  )
}

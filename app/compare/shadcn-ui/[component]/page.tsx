import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { DocsBreadcrumbs } from "@/components/docs/docs-breadcrumbs"
import { DocsCommand } from "@/components/docs/docs-command"
import {
  DocsCode,
  DocsList,
  DocsParagraph,
} from "@/components/docs/docs-content"
import { DocsExample } from "@/components/docs/docs-example"
import { LegalLink, LegalSection } from "@/components/legal/legal-page"
import { MoreComparisons } from "@/components/site/compare"
import { InfoPage } from "@/components/site/info-page"
import { JsonLd } from "@/components/site/json-ld"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { titleCase } from "@/lib/docs"
import { getDocsExamples, getDocsPageExamples } from "@/lib/docs-examples"
import { getRegistryItemUrl } from "@/lib/docs-registry"
import { t, translateNode } from "@/lib/i18n/rich"
import { ogImagePath, pageMetadata } from "@/lib/metadata"
import {
  getShadcnComparison,
  getShadcnComparisonHref,
  getShadcnComparisons,
  shadcnSnapshot,
} from "@/lib/shadcn-compare"
import { pageJsonLd } from "@/lib/structured-data"

export const dynamicParams = false

export function generateStaticParams() {
  return getShadcnComparisons().map((comparison) => ({
    component: comparison.slug,
  }))
}

function copy(name: string) {
  const title = titleCase(name)
  return {
    title: t("shadcn/ui {name} vs HextaUI {name}", { name: title }),
    heading: t("{name}: HextaUI and shadcn/ui", { name: title }),
    description: t(
      "How the HextaUI {name} differs from the shadcn/ui one: parts, variants and the props it adds, read from both sources, and how to switch.",
      { name: title }
    ),
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/compare/shadcn-ui/[component]">): Promise<Metadata> {
  const comparison = getShadcnComparison((await params).component)
  if (!comparison) return {}
  const { title, description } = copy(comparison.name)

  return pageMetadata({
    title,
    description,
    path: getShadcnComparisonHref(comparison.slug),
    image: ogImagePath("compare", comparison.slug),
  })
}

const rowClassName =
  "mt-4 flex flex-col gap-2 text-base/7 text-muted-foreground sm:flex-row sm:items-baseline sm:gap-3"

function Code({ children }: { children: string }) {
  return <DocsCode>{children}</DocsCode>
}

function CodeList({ items }: { items: string[] }) {
  if (items.length === 0) return <>–</>
  return (
    <span className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Code key={item}>{item}</Code>
      ))}
    </span>
  )
}

export default async function Page({
  params,
}: PageProps<"/compare/shadcn-ui/[component]">) {
  const comparison = getShadcnComparison((await params).component)
  if (!comparison) notFound()
  const { slug, name, hexta, shadcn } = comparison
  const path = getShadcnComparisonHref(slug)
  const { heading, description } = copy(name)
  const { api, demo } = await getDocsPageExamples(slug)
  const examples = await getDocsExamples(slug)
  const describe = (part: string, prop: string) =>
    api
      .find((entry) => entry.name === part)
      ?.props.find((item) => item.name === prop)?.description
  const variantRows = comparison.variants.filter(
    (row) => row.hexta.length > 0 || row.shadcn.length > 0
  )
  const others = getShadcnComparisons().filter((item) => item.slug !== slug)
  const crumbs = [
    { name: "Compare", path: "/compare" },
    { name: "HextaUI vs shadcn/ui", path: "/compare/shadcn-ui" },
    { name, path },
  ]

  return (
    <InfoPage
      title={heading}
      lead={t(
        "The HextaUI {name} keeps the shadcn/ui names and theme tokens and installs with the same CLI. This page lists what differs, read from the source of both. The shadcn/ui side is its {style} registry as of {date}.",
        {
          name,
          style: shadcnSnapshot.style,
          date: shadcnSnapshot.fetched,
        }
      )}
      eyebrow={<DocsBreadcrumbs crumbs={crumbs} className="mb-2" />}
    >
      <JsonLd
        data={pageJsonLd({
          path,
          name: heading,
          description,
          breadcrumbs: crumbs,
          image: ogImagePath("compare", slug),
        })}
      />

      <LegalSection title="At a glance">
        <div className="mt-6">
          <Table wrap aria-label={t("At a glance")}>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">
                  <span className="sr-only">{t("Measure")}</span>
                </TableHead>
                <TableHead>HextaUI</TableHead>
                <TableHead>shadcn/ui</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableHead scope="row">{t("Exported parts")}</TableHead>
                <TableCell>
                  <span className="tabular-nums">{hexta.parts.length}</span>
                </TableCell>
                <TableCell>
                  <span className="tabular-nums">{shadcn.parts.length}</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead scope="row">
                  {t("Props the wrapper handles")}
                </TableHead>
                <TableCell>
                  <span className="tabular-nums">
                    {Object.values(hexta.props).flat().length}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="tabular-nums">
                    {Object.values(shadcn.props).flat().length}
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead scope="row">{t("Lines of source")}</TableHead>
                <TableCell>
                  <span className="tabular-nums">{hexta.lines}</span>
                </TableCell>
                <TableCell>
                  <span className="tabular-nums">{shadcn.lines}</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead scope="row">{t("npm dependencies")}</TableHead>
                <TableCell>
                  <CodeList items={hexta.dependencies} />
                </TableCell>
                <TableCell>
                  <CodeList items={shadcn.dependencies} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead scope="row">{t("Built from")}</TableHead>
                <TableCell>
                  <CodeList items={hexta.registryDependencies} />
                </TableCell>
                <TableCell>
                  <CodeList items={shadcn.registryDependencies} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <DocsParagraph>
          More source is not better on its own. Most of the extra lines in
          HextaUI handle states, motion and edge cases that you would otherwise
          write yourself.
        </DocsParagraph>
      </LegalSection>

      {comparison.hextaParts.length > 0 || comparison.shadcnParts.length > 0 ? (
        <LegalSection title="Parts">
          {comparison.hextaParts.length > 0 ? (
            <p className={rowClassName}>
              <span>{t("Only in HextaUI")}</span>
              <CodeList items={comparison.hextaParts} />
            </p>
          ) : null}
          {comparison.shadcnParts.length > 0 ? (
            <p className={rowClassName}>
              <span>{t("Only in shadcn/ui")}</span>
              <CodeList items={comparison.shadcnParts} />
            </p>
          ) : null}
          {comparison.sharedParts.length > 0 ? (
            <p className={rowClassName}>
              <span>{t("In both")}</span>
              <CodeList items={comparison.sharedParts} />
            </p>
          ) : null}
        </LegalSection>
      ) : null}

      {comparison.addedProps.length > 0 ? (
        <LegalSection title="Props HextaUI adds">
          <DocsParagraph>
            Props the HextaUI wrapper handles itself that the shadcn/ui wrapper
            does not. Props passed straight through to Base UI or the underlying
            library are left out, because both versions accept them.
          </DocsParagraph>
          <div className="mt-6">
            <Table wrap aria-label={t("Props HextaUI adds")}>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-2/5">{t("Prop")}</TableHead>
                  <TableHead>{t("What it does")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparison.addedProps.map((prop) => {
                  const text = describe(prop.part, prop.name)
                  return (
                    <TableRow key={`${prop.part}.${prop.name}`}>
                      <TableHead scope="row">
                        <span className="flex flex-col items-start gap-1 font-normal">
                          <Code>{prop.name}</Code>
                          <span className="text-xs text-muted-foreground">
                            {prop.part}
                          </span>
                        </span>
                      </TableHead>
                      <TableCell>
                        <span className="text-muted-foreground">
                          {text ? (
                            translateNode(text)
                          ) : (
                            <LegalLink href={`/docs/${slug}#api-reference`}>
                              {t("See the API reference")}
                            </LegalLink>
                          )}
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </LegalSection>
      ) : null}

      {variantRows.length > 0 ? (
        <LegalSection title="Variants">
          <div className="mt-6">
            <Table wrap aria-label={t("Variants")}>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">{t("Prop")}</TableHead>
                  <TableHead>{t("In both")}</TableHead>
                  <TableHead>{t("Only HextaUI")}</TableHead>
                  <TableHead>{t("Only shadcn/ui")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {variantRows.map((row) => (
                  <TableRow key={`${row.part}.${row.group}`}>
                    <TableHead scope="row">
                      <span className="flex flex-col items-start gap-1 font-normal">
                        <Code>{row.group}</Code>
                        <span className="text-xs text-muted-foreground">
                          {row.part}
                        </span>
                      </span>
                    </TableHead>
                    <TableCell>
                      <CodeList items={row.shared} />
                    </TableCell>
                    <TableCell>
                      <CodeList items={row.hexta} />
                    </TableCell>
                    <TableCell>
                      <CodeList items={row.shadcn} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </LegalSection>
      ) : null}

      {demo ? (
        <LegalSection title="The HextaUI version">
          <DocsExample
            file={demo.file}
            previewClassName={demo.previewClassName}
          >
            {demo.node}
          </DocsExample>
          <DocsParagraph>
            Every state, the keyboard map and the API reference are on the{" "}
            <LegalLink href={`/docs/${slug}`}>component page</LegalLink>.
          </DocsParagraph>
          {examples.length > 0 ? (
            <p className="mt-4 text-base/7 text-pretty text-muted-foreground">
              {t("{count} of its examples also have a page of their own.", {
                count: examples.length,
              })}
            </p>
          ) : null}
        </LegalSection>
      ) : null}

      <LegalSection title="Switch one component">
        <DocsParagraph>
          Run the add command with <DocsCode>--overwrite</DocsCode> to replace
          the shadcn/ui file in <DocsCode>@/components/ui</DocsCode>, then
          review the diff in git before you keep it. Imports stay the same, and
          components you don’t replace keep working.
        </DocsParagraph>
        <DocsCommand
          className="mt-4"
          mode="dlx"
          packages={[
            "shadcn@latest",
            "add",
            getRegistryItemUrl(slug),
            "--overwrite",
          ]}
        />
        <DocsList>
          <li>
            Every prop in the table above is an addition, so call sites written
            for shadcn/ui don’t pass it yet.
          </li>
          <li>
            Check any part or variant listed only for shadcn/ui before you
            switch, and map it to the closest HextaUI one.
          </li>
        </DocsList>
      </LegalSection>

      <LegalSection title="Other components compared">
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((item) => (
            <li key={item.slug}>
              <LegalLink href={getShadcnComparisonHref(item.slug)}>
                {item.name}
              </LegalLink>
            </li>
          ))}
        </ul>
      </LegalSection>

      <MoreComparisons current="/compare/shadcn-ui" />
    </InfoPage>
  )
}

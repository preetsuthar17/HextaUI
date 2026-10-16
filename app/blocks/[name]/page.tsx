import type { Metadata } from "next"
import Link from "@/components/site/link"
import { notFound } from "next/navigation"

import { BlockCode } from "@/components/blocks/block-code"
import { BlockFrame } from "@/components/blocks/block-frame"
import { UnlessPro } from "@/components/blocks/unless-pro"
import { DocsCodeBlock } from "@/components/docs/docs-code-block"
import { DocsCommand } from "@/components/docs/docs-command"
import {
  DocsCode,
  DocsList,
  DocsParagraph,
  DocsSection,
} from "@/components/docs/docs-content"
import { DocsStep } from "@/components/docs/docs-install"
import { DocsPage } from "@/components/docs/docs-page"
import { DocsRelated } from "@/components/docs/docs-related"
import { JsonLd } from "@/components/site/json-ld"
import { TrackedLink } from "@/components/site/tracked-link"
import { Button } from "@/components/ui/button"
import {
  DocsAttributesTable,
  DocsKeyboardTable,
  DocsPropsTable,
} from "@/components/docs/docs-props-table"
import { getBlockComponents, getBlockLinks } from "@/lib/docs-related"
import { T, t } from "@/lib/i18n/rich"
import { pageMetadata } from "@/lib/metadata"
import { absoluteUrl } from "@/lib/site"
import { docsArticleJsonLd } from "@/lib/structured-data"
import { blocksNavItems, getProBlock, proBlockParams } from "@/lib/pro/catalog"
import { getNextBlocks } from "@/lib/pro/free-blocks"
import { proRegistryConfig } from "@/lib/pro/prompt"
import { getProBlockTitle } from "@/lib/pro/titles"

export const dynamicParams = false

const linkClassName = "text-foreground underline underline-offset-4"

export function generateStaticParams() {
  return proBlockParams()
}

export async function generateMetadata({
  params,
}: PageProps<"/blocks/[name]">): Promise<Metadata> {
  const block = getProBlock((await params).name)
  return block
    ? pageMetadata({
        title: getProBlockTitle(block),
        description: block.description,
        path: `/blocks/${block.name}`,
      })
    : {}
}

export default async function Page({ params }: PageProps<"/blocks/[name]">) {
  const block = getProBlock((await params).name)
  if (!block) notFound()
  const { overview, anatomy, api, keyboard, accessibility } = block.docs
  const nextBlocks = getBlockLinks(getNextBlocks(block.name))

  return (
    <DocsPage
      href={`/blocks/${block.name}`}
      title={block.title}
      description={block.description}
      navItems={blocksNavItems}
      actions={
        block.free ? null : (
          <UnlessPro>
            <Button
              size="sm"
              nativeButton={false}
              render={
                <TrackedLink
                  href="/pricing"
                  event="Pro link clicked"
                  eventProps={{
                    from: "block-header",
                    to: "/pricing",
                    block: block.name,
                  }}
                />
              }
            >
              {t("Get Pro")}
            </Button>
          </UnlessPro>
        )
      }
      className="max-w-4xl"
    >
      <JsonLd
        data={docsArticleJsonLd({
          path: `/blocks/${block.name}`,
          headline: block.title,
          description: block.description,
          breadcrumbs: [
            { name: "Blocks", path: "/blocks" },
            { name: block.title, path: `/blocks/${block.name}` },
          ],
          code: {
            name: `${block.title} block`,
            free: Boolean(block.free),
            license: absoluteUrl("/legal/license"),
          },
        })}
      />
      <div className="mt-8">
        <BlockFrame name={block.name} title={block.title} free={block.free} />
      </div>

      {overview?.length ? (
        <DocsSection title="Overview">
          {overview.map((paragraph) => (
            <DocsParagraph key={paragraph}>{paragraph}</DocsParagraph>
          ))}
        </DocsSection>
      ) : null}

      {block.free ? (
        <DocsSection title="Installation">
          <DocsParagraph>
            {block.title} is free. Install it without an account or a token, and
            use it under the{" "}
            <Link href="/legal/license" className={linkClassName}>
              Pro License
            </Link>{" "}
            in as many projects as you like.
          </DocsParagraph>
          <DocsCommand
            mode="dlx"
            packages={[
              "shadcn@latest",
              "add",
              `https://hextaui.com/r/pro/${block.name}.json`,
            ]}
          />
        </DocsSection>
      ) : (
        <DocsSection title="Installation">
          <ol className="flex flex-col">
            <UnlessPro
              fallback={
                <DocsStep step={1} title="You have HextaUI Pro">
                  <DocsParagraph>
                    Every block is unlocked on this account, including future
                    ones.
                  </DocsParagraph>
                </DocsStep>
              }
            >
              <DocsStep step={1} title="Get HextaUI Pro">
                <DocsParagraph>
                  One payment unlocks every block, including future ones.{" "}
                  <TrackedLink
                    href="/pricing"
                    event="Pro link clicked"
                    eventProps={{
                      from: "block-install",
                      to: "/pricing",
                      block: block.name,
                    }}
                    className={linkClassName}
                  >
                    See pricing
                  </TrackedLink>
                  .
                </DocsParagraph>
              </DocsStep>
            </UnlessPro>
            <DocsStep step={2} title="Add the Pro registry to components.json">
              <DocsCodeBlock
                code={proRegistryConfig}
                lang="json"
                title="components.json"
              />
            </DocsStep>
            <DocsStep step={3} title="Add your token">
              <DocsParagraph>
                Create a token on your{" "}
                <Link href="/account" className={linkClassName}>
                  account page
                </Link>{" "}
                and put it in <DocsCode>.env.local</DocsCode> as{" "}
                <DocsCode>HEXTAUI_PRO_TOKEN</DocsCode>.
              </DocsParagraph>
            </DocsStep>
            <DocsStep step={4} title="Add the block">
              <DocsCommand
                mode="dlx"
                packages={[
                  "shadcn@latest",
                  "add",
                  `@hextaui-pro/${block.name}`,
                ]}
              />
            </DocsStep>
          </ol>
        </DocsSection>
      )}

      {nextBlocks.length > 0 ? (
        <DocsRelated
          title="Build the rest of the chat"
          description={t(
            "{title} is free. These blocks build the rest of the chat around it, and come with HextaUI Pro.",
            { title: block.title }
          )}
          links={nextBlocks}
          event={{ name: "Pro link clicked", from: "next-step" }}
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <UnlessPro>
              <Button
                size="sm"
                nativeButton={false}
                render={
                  <TrackedLink
                    href="/pricing"
                    event="Pro link clicked"
                    eventProps={{ from: "next-step", to: "/pricing" }}
                  />
                }
              >
                {t("Get Pro")}
              </Button>
            </UnlessPro>
            <p className="text-sm text-muted-foreground">
              <T>
                Or browse{" "}
                <TrackedLink
                  href="/blocks"
                  event="Pro link clicked"
                  eventProps={{ from: "next-step", to: "/blocks" }}
                  className={linkClassName}
                >
                  every block
                </TrackedLink>
                .
              </T>
            </p>
          </div>
        </DocsRelated>
      ) : null}

      {block.usage.length > 0 ? (
        <DocsSection title="Usage">
          {block.usage.map((example) => (
            <DocsSection
              key={example.title}
              title={example.title}
              description={example.description}
              level={3}
            >
              <DocsCodeBlock code={example.code} />
            </DocsSection>
          ))}
        </DocsSection>
      ) : null}

      {anatomy?.length ? (
        <DocsSection
          title="Anatomy"
          description="The parts you compose, from the outside in."
        >
          <DocsAttributesTable label="Part" attributes={anatomy} />
        </DocsSection>
      ) : null}

      {api?.length ? (
        <DocsSection title="API reference">
          {api.map((entry) => (
            <DocsSection
              key={entry.component}
              title={entry.component}
              description={entry.description}
              level={3}
            >
              <DocsPropsTable props={entry.props} />
            </DocsSection>
          ))}
        </DocsSection>
      ) : null}

      {keyboard?.length ? (
        <DocsSection title="Keyboard">
          <DocsKeyboardTable keys={keyboard} />
        </DocsSection>
      ) : null}

      {accessibility?.length ? (
        <DocsSection title="Accessibility">
          <DocsList>
            {accessibility.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </DocsList>
        </DocsSection>
      ) : null}

      <DocsRelated
        title="Built with"
        description={t(
          "The free HextaUI components {title} is made from. Each one installs on its own.",
          { title: block.title }
        )}
        links={getBlockComponents(block.name)}
        variant="names"
      />

      <DocsSection
        title="Code"
        description={t(
          block.files.length === 1
            ? "{count} file, added to {path}."
            : "{count} files, added to {path}.",
          {
            count: block.files.length,
            path: `components/blocks/${block.name}`,
          }
        )}
      >
        <BlockCode name={block.name} free={block.free} />
      </DocsSection>
    </DocsPage>
  )
}

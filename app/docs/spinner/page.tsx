import Link from "@/components/site/link"

import { DocsCodeBlock } from "@/components/docs/docs-code-block"
import { DocsComponentPage } from "@/components/docs/docs-component-page"
import {
  DocsCode,
  DocsList,
  DocsParagraph,
  DocsSection,
} from "@/components/docs/docs-content"
import { DocsExample } from "@/components/docs/docs-example"
import { DocsInstall } from "@/components/docs/docs-install"
import {
  DocsAttributesTable,
  DocsPropsTable,
} from "@/components/docs/docs-props-table"
import { SpinnerButton } from "@/components/examples/spinner/button"
import { SpinnerDelayed } from "@/components/examples/spinner/delayed"
import { SpinnerDemo } from "@/components/examples/spinner/demo"
import { SpinnerInline } from "@/components/examples/spinner/inline"
import { SpinnerSizes } from "@/components/examples/spinner/sizes"
import { getDocsComponentMetadata } from "@/lib/docs"

export const metadata = getDocsComponentMetadata("spinner")

const importCode = `import { Spinner } from "@/components/ui/spinner"`

const usageCode = `<Spinner />
<Spinner variant="ring" size="lg" />
<Spinner loading={isFetching} />`

export default function Page() {
  return (
    <DocsComponentPage slug="spinner">
      <DocsExample file="spinner/demo">
        <SpinnerDemo />
      </DocsExample>

      <DocsInstall
        dependencies={["class-variance-authority", "cn"]}
        files={["components/ui/spinner.tsx"]}
      />

      <DocsSection title="Usage">
        <DocsCodeBlock code={importCode} />
        <DocsCodeBlock code={usageCode} />
        <DocsParagraph>
          The default is the eight-spoke indicator from Apple platforms.{" "}
          <DocsCode>{'variant="ring"'}</DocsCode> spins while its arc grows and
          shrinks, so it reads as working rather than stuck. Both are drawn in
          the current text color.
        </DocsParagraph>
      </DocsSection>

      <DocsSection title="Examples">
        <DocsExample
          file="spinner/delayed"
          title="Without flicker"
          description={
            <>
              Pass <DocsCode>loading</DocsCode> and the spinner waits{" "}
              <DocsCode>delay</DocsCode> (150ms) before showing, so fast loads
              never flash it, then stays at least{" "}
              <DocsCode>minDuration</DocsCode> (400ms) once it&apos;s visible.
            </>
          }
        >
          <SpinnerDelayed />
        </DocsExample>
        <DocsExample
          file="spinner/sizes"
          title="Sizes"
          description={
            <>
              <DocsCode>sm</DocsCode>, <DocsCode>default</DocsCode>,{" "}
              <DocsCode>lg</DocsCode> and <DocsCode>xl</DocsCode> for both
              variants.
            </>
          }
        >
          <SpinnerSizes />
        </DocsExample>
        <DocsExample
          file="spinner/inline"
          title="Inline"
          description={
            <>
              Next to text, mark the spinner <DocsCode>aria-hidden</DocsCode> so
              the words do the talking. On its own, it announces its{" "}
              <DocsCode>label</DocsCode>.
            </>
          }
        >
          <SpinnerInline />
        </DocsExample>
        <DocsExample
          file="spinner/button"
          title="In buttons"
          description="Button and Command use this spinner for their loading states, sized to the button's icons."
        >
          <SpinnerButton />
        </DocsExample>
      </DocsSection>

      <DocsSection title="Accessibility">
        <DocsList>
          <li>
            On its own, the spinner is a <DocsCode>status</DocsCode> named by{" "}
            <DocsCode>label</DocsCode> (&ldquo;Loading&rdquo;).
          </li>
          <li>
            With <DocsCode>aria-hidden</DocsCode>, it drops its role, for use
            beside visible text or inside a busy button.
          </li>
          <li>
            With reduced motion, it gently pulses instead of spinning, so it
            still shows that something is happening.
          </li>
        </DocsList>
      </DocsSection>

      <DocsSection title="API reference">
        <DocsSection title="Spinner" level={3}>
          <DocsPropsTable
            props={[
              {
                name: "variant",
                type: '"ticks" | "ring"',
                default: '"ticks"',
              },
              {
                name: "size",
                type: '"sm" | "default" | "lg" | "xl" | null',
                default: '"default"',
                description: "null leaves sizing to the parent.",
              },
              { name: "label", type: "string", default: '"Loading"' },
              {
                name: "loading",
                type: "boolean",
                description:
                  "Turns on delayed showing. Leave it out to always show.",
              },
              { name: "delay", type: "number", default: "150" },
              { name: "minDuration", type: "number", default: "400" },
              {
                name: "animated",
                type: "boolean",
                default: "true",
                description: "Pause the animation without hiding it.",
              },
            ]}
          />
          <DocsAttributesTable
            attributes={[
              {
                name: 'data-slot="spinner"',
                description: "The SVG, with data-variant.",
              },
            ]}
          />
        </DocsSection>
        <DocsSection title="useDelayedLoading" level={3}>
          <DocsCodeBlock
            code={`const visible = useDelayedLoading(isFetching, { delay: 150, minDuration: 400 })`}
          />
          <DocsParagraph>
            The same timing as a hook, for skeletons, overlays or anything else
            that shouldn&apos;t flash. See the{" "}
            <Link
              href="/docs/use-delayed-loading"
              className="underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground"
            >
              useDelayedLoading guide
            </Link>
            .
          </DocsParagraph>
        </DocsSection>
      </DocsSection>
    </DocsComponentPage>
  )
}

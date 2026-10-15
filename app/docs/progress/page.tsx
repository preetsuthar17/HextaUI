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
import { ProgressCircleDemo } from "@/components/examples/progress/circle"
import { ProgressCircleIndeterminate } from "@/components/examples/progress/circle-indeterminate"
import { ProgressDemo } from "@/components/examples/progress/demo"
import { ProgressFiles } from "@/components/examples/progress/files"
import { ProgressFormat } from "@/components/examples/progress/format"
import { ProgressIndeterminate } from "@/components/examples/progress/indeterminate"
import { ProgressNumberFlow } from "@/components/examples/progress/number-flow"
import { ProgressRtl } from "@/components/examples/progress/rtl"
import { ProgressSegments } from "@/components/examples/progress/segments"
import { ProgressSizes } from "@/components/examples/progress/sizes"
import { ProgressUnlabeled } from "@/components/examples/progress/unlabeled"
import { ProgressVariants } from "@/components/examples/progress/variants"
import { getDocsComponentMetadata } from "@/lib/docs"

export const metadata = getDocsComponentMetadata("progress")

const importCode = `import {
  Progress,
  ProgressCircle,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"`

const usageCode = `<Progress value={40}>
  <ProgressLabel>Uploading</ProgressLabel>
  <ProgressValue />
</Progress>

<ProgressCircle value={40} aria-label="Uploading" />`

const renderType = "ReactElement | (props, state) => ReactElement"

const stateAttributes = [
  {
    name: "data-progressing",
    description: "Present while the value is below max.",
  },
  {
    name: "data-complete",
    description: "Present when the value reaches max.",
  },
  {
    name: "data-indeterminate",
    description: "Present when the value is null or not a finite number.",
  },
]

const compositionCode = `Progress
├── ProgressLabel
└── ProgressValue

ProgressCircle
└── ProgressValue`

export default function Page() {
  return (
    <DocsComponentPage slug="progress">
      <DocsExample file="progress/demo">
        <ProgressDemo />
      </DocsExample>

      <DocsInstall
        dependencies={["@base-ui/react", "class-variance-authority", "cn"]}
        files={["components/ui/progress.tsx"]}
      />

      <DocsSection title="Usage">
        <DocsCodeBlock code={importCode} />
        <DocsCodeBlock code={usageCode} />
        <DocsParagraph>
          <DocsCode>{"<Progress />"}</DocsCode> draws its own track and
          indicator after its children, so a label and value sit on one line
          above the bar. Each update eases the fill from where it is, so rapid
          updates read as one smooth motion instead of steps.
        </DocsParagraph>
      </DocsSection>

      <DocsSection title="Composition">
        <DocsCodeBlock code={compositionCode} lang="text" />
      </DocsSection>

      <DocsSection title="Examples">
        <DocsExample
          file="progress/sizes"
          title="Sizes"
          description={
            <>
              <DocsCode>xs</DocsCode>, <DocsCode>sm</DocsCode>,{" "}
              <DocsCode>default</DocsCode> and <DocsCode>lg</DocsCode> change
              the bar&apos;s thickness. <DocsCode>xs</DocsCode> is the hairline
              Attachment draws along its bottom edge.
            </>
          }
        >
          <ProgressSizes />
        </DocsExample>
        <DocsExample
          file="progress/variants"
          title="Status"
          description={
            <>
              <DocsCode>variant</DocsCode> colors only the fill or ring, so the
              track, label and value stay neutral.
            </>
          }
        >
          <ProgressVariants />
        </DocsExample>
        <DocsExample
          file="progress/segments"
          title="Segments"
          description={
            <>
              Pass <DocsCode>segments</DocsCode> to split the fill into parts,
              such as passed, failed and skipped tests. Each part eases on its
              own and pushes the parts after it, and their labels are read out
              with the value.
            </>
          }
        >
          <ProgressSegments />
        </DocsExample>
        <DocsExample
          file="progress/indeterminate"
          title="Indeterminate"
          description={
            <>
              Pass <DocsCode>{"value={null}"}</DocsCode> while the total is
              unknown. A segment slides across the track, and once a number
              arrives the fill grows from the start.
            </>
          }
        >
          <ProgressIndeterminate />
        </DocsExample>
        <DocsExample
          file="progress/circle"
          title="Circle"
          description={
            <>
              <DocsCode>{"<ProgressCircle />"}</DocsCode> draws the same value
              as a ring, starting at the top. Children sit in the middle, which
              fits <DocsCode>{"<ProgressValue />"}</DocsCode> at{" "}
              <DocsCode>lg</DocsCode> and <DocsCode>xl</DocsCode>.
            </>
          }
        >
          <ProgressCircleDemo />
        </DocsExample>
        <DocsExample
          file="progress/circle-indeterminate"
          title="Indeterminate circle"
          description="An arc spins around the ring until a value arrives."
        >
          <ProgressCircleIndeterminate />
        </DocsExample>
        <DocsExample
          file="progress/format"
          title="Custom range and format"
          description={
            <>
              Set <DocsCode>min</DocsCode> and <DocsCode>max</DocsCode> for any
              range, <DocsCode>format</DocsCode> for the number, and a function
              child on <DocsCode>{"<ProgressValue />"}</DocsCode> for the text.
              Give screen readers the same words with{" "}
              <DocsCode>getAriaValueText</DocsCode>.
            </>
          }
        >
          <ProgressFormat />
        </DocsExample>
        <DocsExample
          file="progress/number-flow"
          title="Animated value"
          description={
            <>
              Render <DocsCode>{"<NumberFlow />"}</DocsCode> inside{" "}
              <DocsCode>{"<ProgressValue />"}</DocsCode> so only the digits that
              change spin, in step with the fill.
            </>
          }
        >
          <ProgressNumberFlow />
        </DocsExample>
        <DocsExample
          file="progress/files"
          title="Long labels"
          description="Long names wrap onto their own lines and the value stays on the end. Rings work as compact status beside each row."
        >
          <ProgressFiles />
        </DocsExample>
        <DocsExample
          file="progress/unlabeled"
          title="Without a visible label"
          description={
            <>
              Name the bar with <DocsCode>aria-label</DocsCode> when the context
              already says what is loading.
            </>
          }
        >
          <ProgressUnlabeled />
        </DocsExample>
        <DocsExample
          file="progress/rtl"
          title="Right to left"
          description={
            <>
              The fill and the indeterminate slide start from the right. Pass{" "}
              <DocsCode>locale</DocsCode> to format the value in the
              reader&apos;s digits.
            </>
          }
        >
          <ProgressRtl />
        </DocsExample>
      </DocsSection>

      <DocsSection title="Accessibility">
        <DocsList>
          <li>
            The root is a <DocsCode>progressbar</DocsCode> with{" "}
            <DocsCode>aria-valuenow</DocsCode>,{" "}
            <DocsCode>aria-valuemin</DocsCode>,{" "}
            <DocsCode>aria-valuemax</DocsCode> and a formatted{" "}
            <DocsCode>aria-valuetext</DocsCode>. While indeterminate it has no
            current value.
          </li>
          <li>
            <DocsCode>{"<ProgressLabel />"}</DocsCode> names the bar. Without
            one, pass <DocsCode>aria-label</DocsCode>.
          </li>
          <li>
            <DocsCode>{"<ProgressValue />"}</DocsCode> is hidden from screen
            readers, since the progressbar already announces the value.
          </li>
          <li>
            With reduced motion, the fill jumps to each new value, and the
            indeterminate bar and ring pulse in place instead of moving.
          </li>
          <li>
            Values are formatted in <DocsCode>en-US</DocsCode> unless you pass{" "}
            <DocsCode>locale</DocsCode>, so the server and browser render the
            same text.
          </li>
        </DocsList>
      </DocsSection>

      <DocsSection title="API reference">
        <DocsParagraph>
          Built on the Base UI progress. Every part accepts the props of the
          primitive it wraps.
        </DocsParagraph>
        <DocsSection title="Progress" level={3}>
          <DocsPropsTable
            props={[
              {
                name: "value",
                type: "number | null",
                description: "null makes the bar indeterminate.",
              },
              { name: "min", type: "number", default: "0" },
              { name: "max", type: "number", default: "100" },
              {
                name: "size",
                type: '"xs" | "sm" | "default" | "lg"',
                default: '"default"',
              },
              {
                name: "variant",
                type: '"default" | "success" | "warning" | "destructive"',
                default: '"default"',
              },
              {
                name: "segments",
                type: "{ value: number; variant?: ProgressVariant; label?: string }[]",
                description:
                  "Splits the fill into parts. Their sum becomes the value.",
              },
              {
                name: "format",
                type: "Intl.NumberFormatOptions",
                description:
                  "Formats the value. Without it, the value shows as a percentage.",
              },
              {
                name: "locale",
                type: "Intl.LocalesArgument",
                default: '"en-US"',
              },
              {
                name: "getAriaValueText",
                type: "(formattedValue: string, value: number | null) => string",
              },
              {
                name: "className",
                type: "string | (state) => string",
              },
              { name: "render", type: renderType, default: "<div>" },
            ]}
          />
          <DocsAttributesTable
            attributes={[
              { name: 'data-slot="progress"', description: "The root." },
              {
                name: "data-size",
                description: "The size: xs, sm, default or lg.",
              },
              { name: "data-variant", description: "The status variant." },
              ...stateAttributes,
              {
                name: 'data-slot="progress-segment"',
                description:
                  "One part of a segmented fill, with its own data-variant. data-gap marks a part that follows a filled one.",
              },
            ]}
          />
        </DocsSection>
        <DocsSection title="ProgressLabel" level={3}>
          <DocsParagraph>
            Names the progressbar. Renders a <DocsCode>{"<span>"}</DocsCode> and
            takes the same state attributes as the root.
          </DocsParagraph>
          <DocsPropsTable
            props={[{ name: "render", type: renderType, default: "<span>" }]}
          />
          <DocsAttributesTable
            attributes={[
              { name: 'data-slot="progress-label"', description: "The label." },
            ]}
          />
        </DocsSection>
        <DocsSection title="ProgressValue" level={3}>
          <DocsPropsTable
            props={[
              {
                name: "children",
                type: "(formattedValue: string | null, value: number | null) => ReactNode",
                description:
                  "Custom text. Without it, the formatted value shows, or nothing while indeterminate.",
              },
              { name: "render", type: renderType, default: "<span>" },
            ]}
          />
          <DocsAttributesTable
            attributes={[
              { name: 'data-slot="progress-value"', description: "The value." },
            ]}
          />
        </DocsSection>
        <DocsSection title="ProgressTrack" level={3}>
          <DocsParagraph>
            Rendered by <DocsCode>{"<Progress />"}</DocsCode> and sized by its{" "}
            <DocsCode>size</DocsCode>. Exported for custom compositions.
          </DocsParagraph>
          <DocsAttributesTable
            attributes={[
              { name: 'data-slot="progress-track"', description: "The track." },
              {
                name: "--progress-dir",
                description:
                  "1, or -1 in right-to-left, so the indeterminate slide follows the reading direction.",
              },
            ]}
          />
        </DocsSection>
        <DocsSection title="ProgressIndicator" level={3}>
          <DocsParagraph>
            The fill. Its width is set inline from the value and eases between
            updates.
          </DocsParagraph>
          <DocsAttributesTable
            attributes={[
              {
                name: 'data-slot="progress-indicator"',
                description: "The fill.",
              },
            ]}
          />
        </DocsSection>
        <DocsSection title="ProgressCircle" level={3}>
          <DocsPropsTable
            props={[
              {
                name: "value",
                type: "number | null",
                description: "null spins an arc.",
              },
              { name: "min", type: "number", default: "0" },
              { name: "max", type: "number", default: "100" },
              {
                name: "size",
                type: '"sm" | "default" | "lg" | "xl"',
                default: '"default"',
              },
              {
                name: "variant",
                type: '"default" | "success" | "warning" | "destructive"',
                default: '"default"',
              },
              {
                name: "locale",
                type: "Intl.LocalesArgument",
                default: '"en-US"',
              },
              {
                name: "children",
                type: "ReactNode",
                description: "Shown in the middle of the ring.",
              },
              { name: "render", type: renderType, default: "<div>" },
            ]}
          />
          <DocsAttributesTable
            attributes={[
              { name: 'data-slot="progress-circle"', description: "The root." },
              {
                name: "data-size",
                description: "The size: sm, default, lg or xl.",
              },
              { name: "data-variant", description: "The status variant." },
              ...stateAttributes,
              {
                name: "--progress-circle-size",
                description: "The ring's width and height.",
              },
              {
                name: "--progress-stroke",
                description: "The ring's stroke width.",
              },
            ]}
          />
        </DocsSection>
      </DocsSection>
    </DocsComponentPage>
  )
}

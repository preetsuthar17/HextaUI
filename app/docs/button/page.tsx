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
  DocsKeyboardTable,
  DocsPropsTable,
} from "@/components/docs/docs-props-table"
import { ButtonControlledLoading } from "@/components/examples/button/controlled-loading"
import { ButtonControlledStatus } from "@/components/examples/button/controlled-status"
import { ButtonCustomLabels } from "@/components/examples/button/custom-labels"
import { ButtonDemo } from "@/components/examples/button/demo"
import { ButtonDisabled } from "@/components/examples/button/disabled"
import { ButtonErrorDetails } from "@/components/examples/button/error-details"
import { ButtonForm } from "@/components/examples/button/form"
import { ButtonIconFeedback } from "@/components/examples/button/icon-feedback"
import { ButtonLink } from "@/components/examples/button/link"
import { ButtonRtl } from "@/components/examples/button/rtl"
import { ButtonPill } from "@/components/examples/button/pill"
import { ButtonSizes } from "@/components/examples/button/sizes"
import { ButtonSmoothWidth } from "@/components/examples/button/smooth-width"
import { ButtonVariants } from "@/components/examples/button/variants"
import { ButtonVariantsFeedback } from "@/components/examples/button/variants-feedback"
import { ButtonWithIcon } from "@/components/examples/button/with-icon"
import { getDocsComponentMetadata } from "@/lib/docs"

export const metadata = getDocsComponentMetadata("button")

const importCode = `import { Button } from "@/components/ui/button"`

const usageCode = `<Button feedback onClick={() => saveSettings()}>
  Save changes
</Button>`

export default function Page() {
  return (
    <DocsComponentPage slug="button">
      <DocsExample file="button/demo">
        <ButtonDemo />
      </DocsExample>

      <DocsInstall
        dependencies={[
          "@base-ui/react",
          "@tabler/icons-react",
          "class-variance-authority",
          "cn",
        ]}
        files={["components/ui/button.tsx"]}
      />

      <DocsSection title="Usage">
        <DocsCodeBlock code={importCode} />
        <DocsCodeBlock code={usageCode} />
        <DocsParagraph>
          With <DocsCode>feedback</DocsCode>, return a promise from{" "}
          <DocsCode>onClick</DocsCode> and the button shows loading, then
          success or error, then resets on its own.
        </DocsParagraph>
      </DocsSection>

      <DocsSection title="Examples">
        <DocsExample
          file="button/variants"
          title="Variants"
          description={
            <>
              Seven variants. <DocsCode>destructive</DocsCode> is a soft tint so a
              dangerous action reads clearly without shouting, and{" "}
              <DocsCode>ghost-destructive</DocsCode> is the quiet version for
              repeated row actions like Sign out or Remove.
            </>
          }
        >
          <ButtonVariants />
        </DocsExample>
        <DocsExample
          file="button/sizes"
          title="Sizes"
          description={
            <>
              Text sizes <DocsCode>xs</DocsCode> to <DocsCode>lg</DocsCode>, and
              square <DocsCode>icon-*</DocsCode> sizes. Small icon buttons get a
              larger invisible touch area on touch screens.
            </>
          }
        >
          <ButtonSizes />
        </DocsExample>
        <DocsExample
          file="button/pill"
          title="Pill"
          description={
            <>
              <DocsCode>{'shape="pill"'}</DocsCode> rounds the ends fully, and
              icon sizes become circles. It suits buttons that sit inside
              rounded surfaces, like a chat composer.
            </>
          }
        >
          <ButtonPill />
        </DocsExample>
        <DocsExample
          file="button/with-icon"
          title="With icon"
          description={
            <>
              Mark an icon with{" "}
              <DocsCode>{'data-icon="inline-start"'}</DocsCode> or{" "}
              <DocsCode>{'"inline-end"'}</DocsCode> and the padding on that side
              tightens to balance it.
            </>
          }
        >
          <ButtonWithIcon />
        </DocsExample>
        <DocsExample
          file="button/disabled"
          title="Disabled"
          description={
            <>
              <DocsCode>focusableWhenDisabled</DocsCode> keeps a disabled button
              in the tab order, so a tooltip or explanation can still be reached
              by keyboard.
            </>
          }
        >
          <ButtonDisabled />
        </DocsExample>
        <DocsExample
          file="button/custom-labels"
          title="Custom labels"
          description={
            <>
              <DocsCode>loadingLabel</DocsCode>,{" "}
              <DocsCode>successLabel</DocsCode> and{" "}
              <DocsCode>errorLabel</DocsCode> replace the text for each state.
              Each label flips in while the old one flips out.
            </>
          }
        >
          <ButtonCustomLabels />
        </DocsExample>
        <DocsExample
          file="button/smooth-width"
          title="Smooth width"
          description="The button eases to the width of each label instead of reserving space for the longest one, so nothing around it jumps."
        >
          <ButtonSmoothWidth />
        </DocsExample>
        <DocsExample
          file="button/error-details"
          title="Error details"
          description={
            <>
              Pass a function to <DocsCode>errorLabel</DocsCode> to show the
              rejection reason. While the pointer or keyboard focus stays on the
              button, the error stays on screen.
            </>
          }
        >
          <ButtonErrorDetails />
        </DocsExample>
        <DocsExample
          file="button/form"
          title="Forms"
          description={
            <>
              For submit buttons, call <DocsCode>track()</DocsCode> from{" "}
              <DocsCode>useButtonFeedback</DocsCode> in{" "}
              <DocsCode>onSubmit</DocsCode> and spread{" "}
              <DocsCode>buttonProps</DocsCode> on the button. Remove the @ to
              see the error.
            </>
          }
        >
          <ButtonForm />
        </DocsExample>
        <DocsExample
          file="button/icon-feedback"
          title="Icon buttons"
          description="Icon sizes swap only the icon for each state and keep their square shape. The aria-label stays the accessible name."
        >
          <ButtonIconFeedback />
        </DocsExample>
        <DocsExample
          file="button/variants-feedback"
          title="Feedback on every variant"
          description={
            <>
              Filled variants turn green or red when done.{" "}
              <DocsCode>ghost</DocsCode> and <DocsCode>link</DocsCode> only
              change their text color.
            </>
          }
        >
          <ButtonVariantsFeedback />
        </DocsExample>
        <DocsExample
          file="button/controlled-loading"
          title="Controlled loading"
          description={
            <>
              Set <DocsCode>loading</DocsCode> yourself when the work is tracked
              elsewhere. The button stays focusable and announces that it is
              busy.
            </>
          }
        >
          <ButtonControlledLoading />
        </DocsExample>
        <DocsExample
          file="button/controlled-status"
          title="Controlled status"
          description={
            <>
              Drive <DocsCode>status</DocsCode> directly, for example from a
              form library’s submit state.
            </>
          }
        >
          <ButtonControlledStatus />
        </DocsExample>
        <DocsExample
          file="button/link"
          title="As a link"
          description={
            <>
              Pass an anchor to <DocsCode>render</DocsCode> and set{" "}
              <DocsCode>{"nativeButton={false}"}</DocsCode> so the button keeps
              link semantics.
            </>
          }
        >
          <ButtonLink />
        </DocsExample>
        <DocsExample
          file="button/rtl"
          title="Right to left"
          description="Icons and state labels follow the reading direction."
        >
          <ButtonRtl />
        </DocsExample>
      </DocsSection>

      <DocsSection title="Keyboard">
        <DocsKeyboardTable
          keys={[
            {
              keys: ["Enter", "Space"],
              description:
                "Activates the button. Ignored while a feedback request is in flight.",
            },
            {
              keys: ["Tab"],
              description:
                "Moves focus. A loading button stays focusable, and focusing an error keeps it on screen until you move away.",
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Accessibility">
        <DocsList>
          <li>
            Every state change is announced through a polite live region:
            loading, then the success or error label.
          </li>
          <li>
            While loading, the button sets <DocsCode>aria-busy</DocsCode> and
            stays focusable, so focus is never lost mid-request.
          </li>
          <li>
            The spinner appears only after 150ms and then stays for at least
            400ms, so fast requests never flash and slow ones never flicker.
          </li>
          <li>
            With reduced motion, state labels fade instead of flipping and the
            error shake is skipped.
          </li>
        </DocsList>
      </DocsSection>

      <DocsSection title="API reference">
        <DocsParagraph>
          Built on the Base UI button. It renders a{" "}
          <DocsCode>{"<button>"}</DocsCode> and accepts all of its attributes.
        </DocsParagraph>
        <DocsSection title="Button" level={3}>
          <DocsPropsTable
            props={[
              {
                name: "variant",
                type: '"default" | "outline" | "secondary" | "ghost" | "ghost-destructive" | "destructive" | "link"',
                default: '"default"',
              },
              {
                name: "size",
                type: '"xs" | "sm" | "default" | "lg" | "icon-xs" | "icon-sm" | "icon" | "icon-lg" | "icon-xl"',
                default: '"default"',
              },
              {
                name: "shape",
                type: '"default" | "pill"',
                default: '"default"',
              },
              {
                name: "feedback",
                type: "boolean",
                default: "false",
                description:
                  "Track the promise returned from onClick and show its status.",
              },
              {
                name: "onClick",
                type: "(event) => unknown",
                description: "Return a promise to drive feedback.",
              },
              {
                name: "loading",
                type: "boolean",
                description: "Controlled loading state.",
              },
              {
                name: "status",
                type: '"idle" | "loading" | "success" | "error"',
                description: "Controlled status. Takes priority over loading.",
              },
              {
                name: "onStatusChange",
                type: "(status: ButtonStatus) => void",
              },
              {
                name: "onError",
                type: "(error: unknown) => void",
                description: "Called with the rejection reason.",
              },
              {
                name: "resetAfter",
                type: "number | { success?: number; error?: number }",
                default: "{ success: 2000, error: 4000 }",
                description: "Milliseconds before returning to idle.",
              },
              {
                name: "loadingLabel",
                type: "ReactNode",
                description: "Shown next to the spinner. Hidden on icon sizes.",
              },
              { name: "successLabel", type: "ReactNode", default: '"Done"' },
              {
                name: "errorLabel",
                type: "ReactNode | (error: unknown) => ReactNode",
                default: '"Failed"',
              },
              { name: "disabled", type: "boolean", default: "false" },
              {
                name: "focusableWhenDisabled",
                type: "boolean",
                default: "false",
                description: "Always true while loading.",
              },
              {
                name: "nativeButton",
                type: "boolean",
                default: "true",
                description: "Set to false when render is not a <button>.",
              },
              {
                name: "render",
                type: "ReactElement | (props, state) => ReactElement",
                default: "<button>",
              },
            ]}
          />
          <DocsAttributesTable
            attributes={[
              {
                name: 'data-slot="button"',
                description: "Target buttons in CSS.",
              },
              {
                name: "data-status",
                description:
                  "idle, loading, success or error. Present once feedback, loading or status is used.",
              },
              {
                name: "data-disabled",
                description: "Present when the button is disabled.",
              },
              {
                name: "aria-busy",
                description: "Present while loading.",
              },
            ]}
          />
        </DocsSection>
        <DocsSection title="useButtonFeedback" level={3}>
          <DocsParagraph>
            Runs the same feedback flow from anywhere, such as a form’s{" "}
            <DocsCode>onSubmit</DocsCode>. Accepts{" "}
            <DocsCode>resetAfter</DocsCode>, <DocsCode>onStatusChange</DocsCode>{" "}
            and <DocsCode>onError</DocsCode>. See the{" "}
            <Link
              href="/docs/use-button-feedback"
              className="underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground"
            >
              useButtonFeedback guide
            </Link>{" "}
            for the full timing.
          </DocsParagraph>
          <DocsAttributesTable
            label="Returns"
            attributes={[
              {
                name: "track(action)",
                description:
                  "Pass a promise or a function returning one. Calls while a request is in flight are ignored.",
              },
              {
                name: "buttonProps",
                description:
                  "Spread on <Button> to show the status and pause the reset on hover and focus.",
              },
              { name: "status", description: "The current ButtonStatus." },
              { name: "error", description: "The last rejection reason." },
              {
                name: "reset()",
                description: "Cancels the request and returns to idle.",
              },
              {
                name: "isPending()",
                description: "Whether a request is in flight.",
              },
            ]}
          />
        </DocsSection>
      </DocsSection>
    </DocsComponentPage>
  )
}

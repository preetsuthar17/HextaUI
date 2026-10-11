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
import { ButtonForm } from "@/components/examples/button/form"
import { UseButtonFeedbackAutosave } from "@/components/examples/use-button-feedback/autosave"
import { UseButtonFeedbackFast } from "@/components/examples/use-button-feedback/fast"
import { getDocsComponentMetadata } from "@/lib/docs"

export const metadata = getDocsComponentMetadata("use-button-feedback")

const importCode = `import { useButtonFeedback } from "@/hooks/use-button-feedback"`

const usageCode = `const { buttonProps, track } = useButtonFeedback()

<form onSubmit={(event) => {
  event.preventDefault()
  track(() => saveProfile(new FormData(event.currentTarget)))
}}>
  …
  <Button type="submit" {...buttonProps}>Save</Button>
</form>`

const statusCode = `const { status, error, track, reset } = useButtonFeedback({
  resetAfter: { success: 1500, error: 6000 },
  onError: (error) => reportError(error),
})`

export default function Page() {
  return (
    <DocsComponentPage slug="use-button-feedback">
      <DocsExample file="use-button-feedback/fast">
        <UseButtonFeedbackFast />
      </DocsExample>

      <DocsInstall dependencies={[]} files={["hooks/use-button-feedback.ts"]} />

      <DocsSection title="Usage">
        <DocsCodeBlock code={importCode} />
        <DocsCodeBlock code={usageCode} />
        <DocsParagraph>
          <DocsCode>{"<Button feedback>"}</DocsCode> runs this flow for you when
          its <DocsCode>onClick</DocsCode> returns a promise. Use the hook when
          the work starts somewhere else, like a form&apos;s{" "}
          <DocsCode>onSubmit</DocsCode>, a keyboard shortcut or a blur. It also
          works when the status belongs on something that isn&apos;t a button.
        </DocsParagraph>
      </DocsSection>

      <DocsSection title="How it works">
        <DocsParagraph>
          <DocsCode>track()</DocsCode> takes a promise, or a function that
          returns one, and moves <DocsCode>status</DocsCode> through{" "}
          <DocsCode>idle</DocsCode>, <DocsCode>loading</DocsCode>, then{" "}
          <DocsCode>success</DocsCode> or <DocsCode>error</DocsCode>, and back
          to <DocsCode>idle</DocsCode>. The timing is what makes it feel calm.
        </DocsParagraph>
        <DocsAttributesTable
          label="Step"
          attributes={[
            {
              name: "0–150ms",
              description:
                "Status stays idle. A request that settles in this window goes straight to success or error, without a spinner.",
            },
            {
              name: "loading",
              description:
                "Shown from 150ms. Once shown it lasts at least 400ms, so it never flashes.",
            },
            {
              name: "success",
              description:
                "Held for 2 seconds by default, then returns to idle.",
            },
            {
              name: "error",
              description:
                "Held for 4 seconds by default. While the pointer is over the button, or it has keyboard focus, the reset waits until they leave, plus 600ms.",
            },
          ]}
        />
        <DocsList>
          <li>
            Calls to <DocsCode>track()</DocsCode> while a request is in flight
            are ignored, so a double click or a held Enter key never sends the
            request twice.
          </li>
          <li>
            A function passed to <DocsCode>track()</DocsCode> that throws
            synchronously is treated like a rejected promise.
          </li>
          <li>
            <DocsCode>reset()</DocsCode> returns to idle at once. Whatever the
            abandoned request does later is ignored, and so is anything that
            settles after the component unmounts.
          </li>
          <li>
            The error hold only counts a real mouse hover and keyboard focus.
            Touch has no hover, and a click&apos;s focus isn&apos;t{" "}
            <DocsCode>:focus-visible</DocsCode>, so neither one pins the error.
          </li>
        </DocsList>
      </DocsSection>

      <DocsSection title="Examples">
        <DocsExample
          file="button/form"
          title="Forms"
          description={
            <>
              Call <DocsCode>track()</DocsCode> from{" "}
              <DocsCode>onSubmit</DocsCode> and spread{" "}
              <DocsCode>buttonProps</DocsCode> on the submit button. Remove the
              @ to see the error.
            </>
          }
        >
          <ButtonForm />
        </DocsExample>
        <DocsExample
          file="use-button-feedback/autosave"
          title="Status without a button"
          description={
            <>
              Read <DocsCode>status</DocsCode> to drive any UI. This note saves
              when it loses focus and shows the result beside it, in a{" "}
              <DocsCode>role=&quot;status&quot;</DocsCode> region that screen
              readers announce.
            </>
          }
        >
          <UseButtonFeedbackAutosave />
        </DocsExample>
        <DocsSection title="Timing and errors" level={3}>
          <DocsCodeBlock code={statusCode} />
          <DocsParagraph>
            <DocsCode>resetAfter</DocsCode> takes one number for both outcomes,
            or an object to set each one. <DocsCode>error</DocsCode> holds the
            last rejection reason, so you can show it in the label, as{" "}
            <Link
              href="/docs/button#error-details"
              className="underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground"
            >
              Button&apos;s error details
            </Link>{" "}
            example does.
          </DocsParagraph>
        </DocsSection>
      </DocsSection>

      <DocsSection title="Good to know">
        <DocsList>
          <li>
            Give each button its own hook. Two buttons sharing one{" "}
            <DocsCode>buttonProps</DocsCode> both show the same status.
          </li>
          <li>
            <DocsCode>onStatusChange</DocsCode> and <DocsCode>onError</DocsCode>{" "}
            always call the latest function you passed, so inline functions are
            fine.
          </li>
          <li>
            Use <DocsCode>isPending()</DocsCode> to guard work outside{" "}
            <DocsCode>track()</DocsCode>. It reads a ref, so it&apos;s accurate
            even before the next render.
          </li>
        </DocsList>
      </DocsSection>

      <DocsSection title="API reference">
        <DocsSection title="useButtonFeedback(options?)" id="options" level={3}>
          <DocsPropsTable
            props={[
              {
                name: "resetAfter",
                type: "number | { success?: number; error?: number }",
                default: "{ success: 2000, error: 4000 }",
                description:
                  "How long success and error stay before returning to idle.",
              },
              {
                name: "onStatusChange",
                type: "(status: ButtonStatus) => void",
                description: "Called on every status change.",
              },
              {
                name: "onError",
                type: "(error: unknown) => void",
                description: "Called with the rejection reason.",
              },
            ]}
          />
        </DocsSection>
        <DocsSection title="Returns" level={3}>
          <DocsAttributesTable
            label="Property"
            attributes={[
              {
                name: "track(action)",
                description:
                  "Pass a promise or a function returning one. Ignored while a request is in flight.",
              },
              {
                name: "buttonProps",
                description:
                  "status plus pointer and focus handlers. Spread on <Button>, or on anything that composes those handlers.",
              },
              {
                name: "status",
                description: '"idle" | "loading" | "success" | "error"',
              },
              { name: "error", description: "The last rejection reason." },
              {
                name: "reset()",
                description:
                  "Returns to idle now and ignores the request in flight.",
              },
              {
                name: "isPending()",
                description: "Whether a request is in flight.",
              },
            ]}
          />
        </DocsSection>
        <DocsSection title="Used by" level={3}>
          <DocsParagraph>
            <DocsCode>Button</DocsCode> through its{" "}
            <DocsCode>feedback</DocsCode> prop.
          </DocsParagraph>
        </DocsSection>
      </DocsSection>
    </DocsComponentPage>
  )
}

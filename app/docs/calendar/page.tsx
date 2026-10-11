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
import { CalendarBounded } from "@/components/examples/calendar/bounded"
import { CalendarControlled } from "@/components/examples/calendar/controlled"
import { CalendarDemo } from "@/components/examples/calendar/demo"
import { CalendarDropdowns } from "@/components/examples/calendar/dropdowns"
import { CalendarFixedToday } from "@/components/examples/calendar/fixed-today"
import { CalendarMultiple } from "@/components/examples/calendar/multiple"
import { CalendarRange } from "@/components/examples/calendar/range"
import { CalendarRangeLimits } from "@/components/examples/calendar/range-limits"
import { CalendarRtl } from "@/components/examples/calendar/rtl"
import { CalendarSheet } from "@/components/examples/calendar/sheet"
import { CalendarWeekNumbers } from "@/components/examples/calendar/week-numbers"
import { getDocsComponentMetadata } from "@/lib/docs"

export const metadata = getDocsComponentMetadata("calendar")

const importCode = `import { Calendar } from "@/components/ui/calendar"`

const usageCode = `const [date, setDate] = React.useState<Date>()

<Calendar mode="single" selected={date} onSelect={setDate} />`

export default function Page() {
  return (
    <DocsComponentPage slug="calendar">
      <DocsExample file="calendar/demo">
        <CalendarDemo />
      </DocsExample>

      <DocsInstall
        dependencies={[
          "react-day-picker",
          "@base-ui/react",
          "@tabler/icons-react",
          "class-variance-authority",
          "cn",
        ]}
        files={[
          "components/ui/calendar.tsx",
          "components/ui/button.tsx",
          "lib/motion.ts",
        ]}
      />

      <DocsSection title="Usage">
        <DocsCodeBlock code={importCode} />
        <DocsCodeBlock code={usageCode} />
        <DocsParagraph>
          Calendar wraps react-day-picker’s{" "}
          <DocsCode>{"<DayPicker />"}</DocsCode>, so every DayPicker prop works
          as documented on daypicker.dev. HextaUI adds styling, month
          transitions, a range preview and a hydration-safe today.
        </DocsParagraph>
      </DocsSection>

      <DocsSection title="Examples">
        <DocsExample
          file="calendar/range"
          title="Range"
          description={
            <>
              With <DocsCode>{'mode="range"'}</DocsCode>, after the first click
              hovering or focusing a day previews the range the next click will
              select. <DocsCode>numberOfMonths</DocsCode> shows months side by
              side, stacked on narrow screens.
            </>
          }
        >
          <CalendarRange />
        </DocsExample>
        <DocsExample
          file="calendar/range-limits"
          title="Range limits"
          description={
            <>
              <DocsCode>min</DocsCode> and <DocsCode>max</DocsCode> limit the
              range length in days. With <DocsCode>excludeDisabled</DocsCode>, a
              range that would include a disabled day starts over instead.
            </>
          }
        >
          <CalendarRangeLimits />
        </DocsExample>
        <DocsExample
          file="calendar/multiple"
          title="Multiple"
          description={
            <>
              <DocsCode>{'mode="multiple"'}</DocsCode> toggles individual days.{" "}
              <DocsCode>max</DocsCode> caps how many can be selected.
            </>
          }
        >
          <CalendarMultiple />
        </DocsExample>
        <DocsExample
          file="calendar/dropdowns"
          title="Month and year dropdowns"
          description={
            <>
              <DocsCode>{'captionLayout="dropdown"'}</DocsCode> replaces the
              caption with native selects, so phones get their own picker. Set{" "}
              <DocsCode>startMonth</DocsCode> and <DocsCode>endMonth</DocsCode>{" "}
              to bound the years.
            </>
          }
        >
          <CalendarDropdowns />
        </DocsExample>
        <DocsExample
          file="calendar/bounded"
          title="Bounded"
          description={
            <>
              Navigation stops at <DocsCode>startMonth</DocsCode> and{" "}
              <DocsCode>endMonth</DocsCode>, and <DocsCode>disabled</DocsCode>{" "}
              blocks days outside the window. <DocsCode>useToday()</DocsCode>{" "}
              gives a today that is safe to use during server rendering.
            </>
          }
        >
          <CalendarBounded />
        </DocsExample>
        <DocsExample
          file="calendar/controlled"
          title="Controlled month"
          description={
            <>
              Pass <DocsCode>month</DocsCode> and{" "}
              <DocsCode>onMonthChange</DocsCode> to drive the visible month.
              Jumps slide in the direction of travel and the height eases
              between 5 and 6 week rows.
            </>
          }
        >
          <CalendarControlled />
        </DocsExample>
        <DocsExample
          file="calendar/week-numbers"
          title="Week numbers"
          description={
            <>
              <DocsCode>showWeekNumber</DocsCode> adds a week column.{" "}
              <DocsCode>ISOWeek</DocsCode> uses ISO numbering, starting on
              Monday. <DocsCode>{"showOutsideDays={false}"}</DocsCode> hides
              days of other months.
            </>
          }
        >
          <CalendarWeekNumbers />
        </DocsExample>
        <DocsExample
          file="calendar/fixed-today"
          title="Fixed today"
          description={
            <>
              Pass <DocsCode>today</DocsCode> to pin the highlighted day, for
              tests or another time zone.{" "}
              <DocsCode>{"animate={false}"}</DocsCode> turns off month
              transitions.
            </>
          }
        >
          <CalendarFixedToday />
        </DocsExample>
        <DocsExample
          file="calendar/sheet"
          title="Inside a sheet"
          description="Inside a sheet, popover or dialog the calendar drops its own background and blends with the surface."
        >
          <CalendarSheet />
        </DocsExample>
        <DocsExample
          file="calendar/rtl"
          title="Right to left"
          description={
            <>
              Pass a <DocsCode>locale</DocsCode> from{" "}
              <DocsCode>react-day-picker/locale</DocsCode> and{" "}
              <DocsCode>{'dir="rtl"'}</DocsCode>. Arrows, navigation and the
              slide direction all mirror. Inside a{" "}
              <DocsCode>{'dir="rtl"'}</DocsCode> DirectionProvider, the
              direction is picked up automatically.
            </>
          }
        >
          <CalendarRtl />
        </DocsExample>
      </DocsSection>

      <DocsSection title="Keyboard">
        <DocsParagraph>
          Focus a day, then use these keys. Moving past the visible month
          changes the month.
        </DocsParagraph>
        <DocsKeyboardTable
          keys={[
            {
              keys: ["←", "→"],
              description:
                "Previous or next day. Reversed in right-to-left layouts.",
            },
            {
              keys: ["↑", "↓"],
              description: "Same day of the previous or next week.",
            },
            {
              keys: ["Shift", "←", "→"],
              description: "Previous or next month.",
            },
            {
              keys: ["Shift", "↑", "↓"],
              description: "Previous or next year.",
            },
            {
              keys: ["Page Up", "Page Down"],
              description: "Previous or next month.",
            },
            {
              keys: ["Shift", "Page Up", "Page Down"],
              description: "Previous or next year.",
            },
            { keys: ["Home"], description: "First day of the week." },
            { keys: ["End"], description: "Last day of the week." },
            {
              keys: ["Enter", "Space"],
              description: "Selects the focused day.",
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Accessibility">
        <DocsList>
          <li>
            The month is a grid. Each day is a button with a full date label,
            and selected days set <DocsCode>aria-selected</DocsCode>.
          </li>
          <li>
            Month changes made with the keyboard skip the slide and only fade,
            so focus never moves under a moving grid.
          </li>
          <li>
            With reduced motion, month changes fade and the height change is
            instant.
          </li>
          <li>On touch screens the day cells grow to 44px.</li>
        </DocsList>
      </DocsSection>

      <DocsSection title="API reference">
        <DocsParagraph>
          Accepts every <DocsCode>{"<DayPicker />"}</DocsCode> prop. The
          defaults below differ from DayPicker’s or are added by HextaUI.
        </DocsParagraph>
        <DocsSection title="Calendar" level={3}>
          <DocsPropsTable
            props={[
              {
                name: "mode",
                type: '"single" | "multiple" | "range"',
                description: "Without a mode, days are not selectable.",
              },
              {
                name: "selected",
                type: "Date | Date[] | DateRange",
                description: "Matches the mode.",
              },
              {
                name: "onSelect",
                type: "(selected, triggerDate, modifiers, event) => void",
              },
              {
                name: "required",
                type: "boolean",
                description: "Prevents deselecting the last selection.",
              },
              {
                name: "min",
                type: "number",
                description:
                  "Minimum days in a range, or selected in multiple mode.",
              },
              {
                name: "max",
                type: "number",
                description:
                  "Maximum days in a range, or selected in multiple mode.",
              },
              {
                name: "excludeDisabled",
                type: "boolean",
                description: "Range mode.",
              },
              { name: "disabled", type: "Matcher | Matcher[]" },
              { name: "month", type: "Date", description: "Controlled month." },
              { name: "defaultMonth", type: "Date" },
              { name: "onMonthChange", type: "(month: Date) => void" },
              { name: "startMonth", type: "Date" },
              { name: "endMonth", type: "Date" },
              { name: "numberOfMonths", type: "number", default: "1" },
              {
                name: "captionLayout",
                type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"',
                default: '"label"',
              },
              {
                name: "navLayout",
                type: '"around" | "after"',
                default: '"around"',
                description:
                  "HextaUI default. Arrows sit on either side of the caption.",
              },
              {
                name: "showOutsideDays",
                type: "boolean",
                default: "true",
                description: "HextaUI default.",
              },
              {
                name: "animate",
                type: "boolean",
                default: "true",
                description:
                  "Month slide and height transitions. HextaUI default.",
              },
              {
                name: "buttonVariant",
                type: "Button variant",
                default: '"ghost"',
                description: "Variant of the previous and next buttons.",
              },
              { name: "showWeekNumber", type: "boolean", default: "false" },
              { name: "ISOWeek", type: "boolean", default: "false" },
              { name: "weekStartsOn", type: "0 | 1 | 2 | 3 | 4 | 5 | 6" },
              { name: "fixedWeeks", type: "boolean", default: "false" },
              {
                name: "today",
                type: "Date",
                description:
                  "Defaults to the client’s today, kept in sync across midnight and hydration.",
              },
              { name: "timeZone", type: "string" },
              { name: "locale", type: "Partial<DayPickerLocale>" },
              { name: "dir", type: '"ltr" | "rtl"' },
              { name: "footer", type: "ReactNode" },
            ]}
          />
          <DocsAttributesTable
            attributes={[
              {
                name: 'data-slot="calendar"',
                description: "Target the calendar root in CSS.",
              },
              {
                name: "--cell-size",
                description: "Day cell size. 36px, or 44px on touch screens.",
              },
              {
                name: "--cell-radius",
                description: "Corner radius of day cells and buttons.",
              },
              {
                name: 'data-slot="calendar-day"',
                description:
                  "Day cells. Carry data-selected, data-disabled, data-outside, data-today, data-hidden and data-focused.",
              },
              {
                name: "data-preview",
                description:
                  "On day cells: start, middle or end of the hovered range preview.",
              },
              {
                name: "data-range-middle",
                description: "On day cells inside a selected range.",
              },
            ]}
          />
        </DocsSection>
        <DocsSection title="CalendarDayButton" level={3}>
          <DocsParagraph>
            The button inside each day. Pass your own to{" "}
            <DocsCode>{"components={{ DayButton }}"}</DocsCode> and reuse this
            one to keep the styling.
          </DocsParagraph>
          <DocsAttributesTable
            attributes={[
              {
                name: 'data-slot="calendar-day-button"',
                description: "Target day buttons in CSS.",
              },
              {
                name: "data-day",
                description: "The ISO date, like 2026-10-03.",
              },
              {
                name: "data-today",
                description: "Present on today, outside days excluded.",
              },
              {
                name: "data-selected-single",
                description: "Selected outside a range.",
              },
              {
                name: "data-range-start",
                description: "First day of the range.",
              },
              {
                name: "data-range-middle",
                description: "A day inside the range.",
              },
              { name: "data-range-end", description: "Last day of the range." },
            ]}
          />
        </DocsSection>
        <DocsSection title="useToday" level={3}>
          <DocsParagraph>
            Returns today as a <DocsCode>Date</DocsCode> on the client and{" "}
            <DocsCode>undefined</DocsCode> during server rendering, so bounds
            built from it never cause a hydration mismatch. It updates at
            midnight. See the{" "}
            <Link
              href="/docs/use-today"
              className="underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground"
            >
              useToday guide
            </Link>
            .
          </DocsParagraph>
        </DocsSection>
      </DocsSection>
    </DocsComponentPage>
  )
}

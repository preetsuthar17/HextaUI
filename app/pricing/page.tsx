import type { Metadata } from "next"
import Link from "@/components/site/link"
import { IconCheck, IconMinus } from "@tabler/icons-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  EarlyBirdBadge,
  FreePlanLink,
  PlanButton,
  PlanPrice,
} from "@/components/site/pricing-plan"
import { JsonLd } from "@/components/site/json-ld"
import { docsComponents, docsHooks, docsUtilities } from "@/lib/docs"
import { pageMetadata } from "@/lib/metadata"
import {
  getPricingBlocks,
  getProProductJsonLd,
  pricingCurrency,
  pricingQuestions,
  proSummary,
} from "@/lib/pricing-info"
import { proPlans, refundDays, type ProPlanId } from "@/lib/pro/pricing"
import { faqPageJsonLd, pageJsonLd } from "@/lib/structured-data"

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description: `HextaUI components are free and MIT licensed. HextaUI Pro blocks for AI products are one payment: Solo from $${proPlans.solo.earlyPrice}, a team of ${proPlans.team.seats} from $${proPlans.team.earlyPrice}, unlimited seats from $${proPlans.unlimited.earlyPrice}.`,
  path: "/pricing",
  markdown: "/pricing.md",
})

const linkClassName =
  "rounded-sm text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors duration-150 outline-none hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-focus-ring motion-reduce:transition-none"

const libraryCount =
  docsComponents.length + docsHooks.length + docsUtilities.length
const blocks = getPricingBlocks()
const freeBlocks = blocks.filter((block) => block.free)

const plans: {
  id: "free" | ProPlanId
  name: string
  description: string
  features: string[]
}[] = [
  {
    id: "free",
    name: "Free",
    description: "The open-source library, for anyone and any project.",
    features: [
      `${libraryCount} components, hooks and utilities under MIT`,
      ...freeBlocks.map((block) => `The ${block.title} Pro block`),
      "Install with the shadcn CLI, no account",
      "Markdown docs, llms.txt and the MCP server",
    ],
  },
  {
    id: "solo",
    name: proPlans.solo.name,
    description: proPlans.solo.summary,
    features: [
      "Everything in Free",
      `All ${blocks.length} Pro blocks, plus every future category`,
      "An AI SDK example in every block",
      "Private registry and API tokens",
      `${refundDays}-day refund, no questions asked`,
    ],
  },
  {
    id: "team",
    name: proPlans.team.name,
    description: `For product teams and agencies shipping together.`,
    features: [
      "Everything in Solo",
      `Up to ${proPlans.team.seats} developers on one invoice`,
      "Add and remove teammates by email",
      "One shared token allowed in CI",
      `${refundDays}-day refund, no questions asked`,
    ],
  },
  {
    id: "unlimited",
    name: proPlans.unlimited.name,
    description: "For companies that don't want to count seats.",
    features: [
      "Everything in Team",
      "No seat limit, for one company",
      "Add and remove teammates by email",
      "One shared token allowed in CI",
      `${refundDays}-day refund, no questions asked`,
    ],
  },
]

type Cell = boolean | string

const comparison: { label: string; values: [Cell, Cell, Cell, Cell] }[] = [
  {
    label: "Components, hooks and utilities",
    values: [
      `All ${libraryCount}`,
      `All ${libraryCount}`,
      `All ${libraryCount}`,
      `All ${libraryCount}`,
    ],
  },
  {
    label: "Pro blocks",
    values: [
      freeBlocks.length > 0
        ? freeBlocks.map((block) => block.title).join(", ")
        : false,
      `All ${blocks.length}`,
      `All ${blocks.length}`,
      `All ${blocks.length}`,
    ],
  },
  { label: "Future block categories", values: [false, true, true, true] },
  {
    label: "Developers",
    values: ["Anyone", "1", `Up to ${proPlans.team.seats}`, "Unlimited"],
  },
  { label: "Shared token in CI", values: [false, false, true, true] },
  {
    label: "Commercial use and client work",
    values: [true, true, true, true],
  },
  {
    label: "Billing",
    values: ["None", "One payment", "One payment", "One payment"],
  },
  {
    label: "Refund",
    values: [
      false,
      `${refundDays} days`,
      `${refundDays} days`,
      `${refundDays} days`,
    ],
  },
]

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <>
        <IconCheck aria-hidden="true" className="size-4" />
        <span className="sr-only">Included</span>
      </>
    )
  }
  if (value === false) {
    return (
      <>
        <IconMinus
          aria-hidden="true"
          className="size-4 text-muted-foreground/60"
        />
        <span className="sr-only">Not included</span>
      </>
    )
  }
  return value
}

function PlanCard({ plan }: { plan: (typeof plans)[number] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>{plan.name}</CardTitle>
          {plan.id === "free" ? null : <EarlyBirdBadge />}
        </div>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-col gap-6">
          {plan.id === "free" ? (
            <div className="flex flex-col gap-1">
              <p className="flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-tight">
                  $0
                </span>
                <span className="text-sm text-muted-foreground">forever</span>
              </p>
              <p className="text-xs text-muted-foreground">MIT License</p>
            </div>
          ) : (
            <PlanPrice plan={plan.id} />
          )}
          <ul className="flex flex-col gap-2.5">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <IconCheck
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        {plan.id === "free" ? <FreePlanLink /> : <PlanButton plan={plan.id} />}
      </CardFooter>
    </Card>
  )
}

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 id={id} className="text-xl font-semibold tracking-tight">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-pretty text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-20 px-4 pt-16 pb-24 sm:pt-24">
      <JsonLd
        data={pageJsonLd({
          path: "/pricing",
          name: String(metadata.title),
          description: String(metadata.description),
          breadcrumbs: [{ name: "Pricing", path: "/pricing" }],
          type: "WebPage",
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            getProProductJsonLd(),
            faqPageJsonLd("/pricing", pricingQuestions),
          ],
        }}
      />
      <header className="flex max-w-2xl flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          The hard states, handled.
        </h1>
        <p className="text-base/7 text-pretty text-muted-foreground">
          {proSummary} The component library underneath stays free and open
          source.
        </p>
      </header>

      <section aria-label="Plans" className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
        <p className="text-xs text-pretty text-muted-foreground">
          Prices in {pricingCurrency}, before any sales tax. Payments are
          handled by Dodo Payments. Pro is covered by the{" "}
          <Link href="/legal/license" className={linkClassName}>
            Pro License
          </Link>{" "}
          and the{" "}
          <Link href="/legal/refunds" className={linkClassName}>
            Refund Policy
          </Link>
          .
        </p>
      </section>

      <Section
        id="pricing-compare"
        title="Compare plans"
        description="Every plan uses the same components and the same shadcn CLI."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-2/5">
                <span className="sr-only">Feature</span>
              </TableHead>
              {plans.map((plan) => (
                <TableHead key={plan.id}>{plan.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparison.map((row) => (
              <TableRow key={row.label}>
                <TableHead scope="row">{row.label}</TableHead>
                {row.values.map((value, index) => (
                  <TableCell key={plans[index].id}>
                    <CellValue value={value} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      <Section
        id="pricing-blocks"
        title="What’s in Pro"
        description="Every block has a live preview you can open before you buy."
      >
        <ul className="grid gap-x-10 border-t sm:grid-cols-2">
          {blocks.map((block) => (
            <li key={block.url} className="border-b">
              <Link
                href={new URL(block.url).pathname}
                className="flex items-center justify-between gap-4 rounded-sm py-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-focus-ring [@media(hover:hover)]:hover:text-muted-foreground"
              >
                <span className="font-medium">{block.title}</span>
                {block.free ? (
                  <span className="text-xs text-muted-foreground">Free</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="pricing-faq" title="Questions">
        <div className="max-w-3xl border-t">
          <Accordion>
            {pricingQuestions.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </main>
  )
}

import { docsComponents, docsHooks, docsUtilities } from "@/lib/docs"
import { frontmatter } from "@/lib/frontmatter"
import { proBlocks } from "@/lib/pro/catalog"
import {
  earlyBirdLastDay,
  earlyBirdLastDayIso,
  isEarlyBird,
  proPlanIds,
  proPlans,
  refundDays,
  type ProPlanId,
} from "@/lib/pro/pricing"
import { absoluteUrl, siteName } from "@/lib/site"

const pricingUpdated = "2026-10-08"
const pricingCurrency = "USD"
const earlyBird = isEarlyBird()

const freeBlockTitles = proBlocks
  .filter((block) => block.free)
  .map((block) => block.title)

const freePlan = {
  name: `${siteName} components`,
  price: 0,
  summary:
    "Every component, hook and utility, free under the MIT License for personal and commercial work.",
  includes: [
    "All components, hooks and utilities with their full source",
    ...(freeBlockTitles.length > 0
      ? [
          `The ${freeBlockTitles.join(" and ")} Pro block${freeBlockTitles.length === 1 ? "" : "s"}, free to install with no account`,
        ]
      : []),
    "Install with the shadcn CLI, no account needed",
    "Docs, Markdown docs, llms.txt and the MCP server",
  ],
}

const proSummary = `Practical blocks built for AI products, with the hard states handled: chat that streams, stops and retries, tool calls that ask first, and the account, settings and dashboard screens around them as they ship. One payment, no subscription.`

const proIncludes = [
  "Every Pro block, plus every future category, installed with the shadcn CLI from a private registry",
  "A working Vercel AI SDK example, keyboard support and screen-reader labels in every block",
  "Unlimited personal and commercial projects, including client work and products you sell",
  "API tokens for the CLI and scripts",
  `${refundDays}-day refund, no questions asked`,
]

function planInfo(id: ProPlanId) {
  const plan = proPlans[id]
  return {
    id,
    name: `${siteName} Pro ${plan.name}`,
    shortName: plan.name,
    price: earlyBird ? plan.earlyPrice : plan.price,
    earlyPrice: plan.earlyPrice,
    regularPrice: plan.price,
    seats: plan.seats,
    summary: plan.summary,
  }
}

const proPlanInfo = proPlanIds.map(planInfo)

function priceLabel(plan: ReturnType<typeof planInfo>) {
  return earlyBird
    ? `$${plan.earlyPrice} once until ${earlyBirdLastDay}, then $${plan.regularPrice}`
    : `$${plan.regularPrice} once`
}

const pricingQuestions = [
  {
    question: "Is there a subscription?",
    answer:
      "No. Pro is a single payment, and every block released later is included.",
  },
  {
    question: "When does the early-bird price end?",
    answer: `On ${earlyBirdLastDay}. After that, Solo is $${proPlans.solo.price} and Team is $${proPlans.team.price}. There are no other sales or discount codes.`,
  },
  {
    question: "Solo, Team or Unlimited?",
    answer: `Solo covers one developer. Team covers up to ${proPlans.team.seats} developers on one invoice: the buyer adds teammates by email on their account page, and the team may keep one shared token in CI. Unlimited is Team with no seat limit, for every developer at one company. Clients and colleagues who only use the finished product don't need a seat.`,
  },
  {
    question: "Can I try it before I pay?",
    answer: `Every block has a live preview${freeBlockTitles.length > 0 ? `, and ${freeBlockTitles.join(" and ")} is free to install in your own project` : ""}.`,
  },
  {
    question: "I bought Solo. Can I move to Team or Unlimited?",
    answer:
      "Yes, and Team can move to Unlimited. Email from your account's address and you only pay the difference.",
  },
  {
    question: "Can Pro blocks go in an open-source project?",
    answer:
      "Yes, in an open-source end product, as long as it isn't a UI library, kit or template collection.",
  },
  {
    question: "What happens after a refund?",
    answer:
      "Pro access, team seats, API tokens for Pro blocks and the Pro License end.",
  },
]

function getPricingBlocks() {
  return proBlocks.map((block) => ({
    title: block.title,
    description: block.description,
    free: Boolean(block.free),
    url: absoluteUrl(`/blocks/${block.name}`),
  }))
}

function getPricingMarkdown() {
  const bullets = (items: string[]) =>
    items.map((item) => `- ${item}`).join("\n")
  const [solo, team, unlimited] = proPlanInfo
  return `${[
    frontmatter({
      title: `${siteName} pricing`,
      description: `${siteName} components are free under the MIT License. ${siteName} Pro is a one-time payment: Solo ${priceLabel(solo)}, Team ${priceLabel(team)}, Unlimited ${priceLabel(unlimited)}.`,
      canonical: absoluteUrl("/pricing"),
      "last-updated": pricingUpdated,
    }),
    `# ${siteName} pricing`,
    `Prices are in ${pricingCurrency}. Payments are handled by Dodo Payments.`,
    `## ${freePlan.name}: free`,
    freePlan.summary,
    bullets(freePlan.includes),
    ...proPlanInfo.flatMap((plan) => [
      `## ${plan.name}: ${priceLabel(plan)}`,
      plan.summary,
    ]),
    `## What every Pro plan includes`,
    proSummary,
    bullets(proIncludes),
    "### Blocks included",
    bullets(
      getPricingBlocks().map(
        (block) =>
          `[${block.title}](${block.url})${block.free ? " (free)" : ""}: ${block.description}`
      )
    ),
    "## Compare plans",
    [
      `| | ${freePlan.name} | ${solo.name} | ${team.name} | ${unlimited.name} |`,
      "| --- | --- | --- | --- | --- |",
      `| Price (${pricingCurrency}) | $0 | ${priceLabel(solo)} | ${priceLabel(team)} | ${priceLabel(unlimited)} |`,
      "| Billing | None | One-time payment | One-time payment | One-time payment |",
      `| Developers | Anyone | 1 | Up to ${team.seats} | Unlimited, one company |`,
      "| License | MIT | Pro License | Pro License | Pro License |",
      `| Components, hooks and utilities | All ${docsComponents.length + docsHooks.length + docsUtilities.length} | All | All | All |`,
      `| Pro blocks | ${freeBlockTitles.length > 0 ? freeBlockTitles.join(", ") : "None"} | All ${proBlocks.length}, plus future ones | All ${proBlocks.length}, plus future ones | All ${proBlocks.length}, plus future ones |`,
      "| Shared token in CI | Not needed | No | Yes, one | Yes, one |",
      "| Commercial use and client work | Yes | Yes | Yes | Yes |",
      `| Refund | Not applicable | ${refundDays} days, no questions asked | ${refundDays} days, no questions asked | ${refundDays} days, no questions asked |`,
    ].join("\n"),
    "## Common questions",
    bullets(pricingQuestions.map((item) => `${item.question} ${item.answer}`)),
    "## How to buy",
    `Sign in with GitHub or Google at ${absoluteUrl("/account")} and choose Solo, Team or Unlimited. Checkout needs a person in a browser; agents cannot buy on a user's behalf through the API.`,
    "## Terms",
    bullets([
      `[Pro License](${absoluteUrl("/legal/license")})`,
      `[Refund Policy](${absoluteUrl("/legal/refunds")})`,
      `[Terms of Service](${absoluteUrl("/legal/terms")})`,
    ]),
  ].join("\n\n")}\n`
}

function getProProductJsonLd() {
  return {
    "@type": "Product",
    "@id": absoluteUrl("/pricing#pro"),
    name: `${siteName} Pro`,
    description: proSummary,
    brand: { "@id": absoluteUrl("/#organization") },
    url: absoluteUrl("/pricing"),
    image: absoluteUrl("/hextaui-logo.png"),
    category: "Software > UI component library",
    offers: proPlanInfo.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: plan.price,
      priceCurrency: pricingCurrency,
      ...(earlyBird ? { priceValidUntil: earlyBirdLastDayIso } : {}),
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/pricing"),
      seller: { "@id": absoluteUrl("/#organization") },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: refundDays,
        merchantReturnLink: absoluteUrl("/legal/refunds"),
      },
    })),
  }
}

export {
  earlyBird,
  freePlan,
  getPricingBlocks,
  getProProductJsonLd,
  getPricingMarkdown,
  priceLabel,
  pricingCurrency,
  pricingQuestions,
  pricingUpdated,
  proIncludes,
  proPlanInfo,
  proSummary,
}

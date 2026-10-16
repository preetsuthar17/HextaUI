import { renderEmail, type EmailContent } from "@/lib/email/layout"
import { sendEmail, type MailerEnv } from "@/lib/email/send"
import { proPlans, refundDays, type ProPlanId } from "@/lib/pro/pricing"
import { siteContactEmail, siteName, siteUrl } from "@/lib/site"

type Person = { name: string; email: string }

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there"
}

function welcomeContent(user: Person): EmailContent {
  return {
    title: `Welcome to ${siteName}`,
    paragraphs: [
      `Hi ${firstName(user.name)}, thanks for signing up.`,
      `${siteName} is a free, open-source component library for shadcn/ui, plus Pro blocks for AI products: chat, streaming, tool calls and every other hard state, already handled.`,
      "Prompt Input is free, so you can install a Pro block in your own project and see how it holds up before you buy.",
    ],
    links: [
      { label: "Browse components", href: `${siteUrl}/docs` },
      { label: "Browse blocks", href: `${siteUrl}/blocks` },
      { label: "Try Prompt Input", href: `${siteUrl}/blocks/prompt-input` },
    ],
    footer: [
      `You’re getting this because you just created a ${siteName} account. Release emails can be turned off any time in `,
      { label: "your account", href: `${siteUrl}/account` },
      ".",
    ],
  }
}

function purchaseContent(user: Person, plan: ProPlanId): EmailContent {
  const { name, seats } = proPlans[plan]
  return {
    title: `You have ${siteName} Pro ${name}`,
    paragraphs: [
      `Thanks, ${firstName(user.name)}. Every Pro block is now unlocked on your account, including every block added later.`,
      "To install with the shadcn CLI, create a token in your account and add the @hextaui-pro registry to components.json. Your account page has the exact snippet to copy.",
      ...(plan === "solo"
        ? []
        : [
            seats === null
              ? `Your Unlimited plan has no seat limit. Add teammates by email from your account, and they get Pro as soon as they sign in with that email.`
              : `Your Team plan has ${seats} seats, including yours. Add teammates by email from your account, and they get Pro as soon as they sign in with that email.`,
          ]),
      `Not what you expected? It’s refundable within ${refundDays} days, no questions asked. Email ${siteContactEmail}.`,
    ],
    links: [
      { label: "Create a token", href: `${siteUrl}/account` },
      { label: "Browse blocks", href: `${siteUrl}/blocks` },
    ],
    footer: [
      `You’re getting this because you bought ${siteName} Pro with ${user.email}. Your receipt comes separately from Dodo Payments.`,
    ],
  }
}

function teamInviteContent(owner: Person, email: string): EmailContent {
  return {
    title: `${owner.name} added you to ${siteName} Pro`,
    paragraphs: [
      `${owner.name} (${owner.email}) gave you a seat on their ${siteName} Pro plan.`,
      `Sign in to ${siteName} with GitHub or Google using ${email}, and every Pro block unlocks. A different email won’t match the seat.`,
    ],
    links: [
      { label: "Sign in", href: `${siteUrl}/account` },
      { label: "Browse blocks", href: `${siteUrl}/blocks` },
    ],
    footer: [
      `You’re getting this because ${owner.name} added ${email} to their team. If you don’t know them, you can ignore this email.`,
    ],
  }
}

async function deliver(
  env: MailerEnv,
  kind: string,
  to: string,
  subject: string,
  content: EmailContent
) {
  const result = await sendEmail(env, {
    to,
    subject,
    ...renderEmail(content),
  }).catch((error: unknown) => ({ ok: false as const, error: String(error) }))
  if (!result.ok) {
    console.error(`Could not send ${kind} email`, { error: result.error })
  }
}

function sendWelcomeEmail(env: MailerEnv, user: Person) {
  return deliver(
    env,
    "welcome",
    user.email,
    `Welcome to ${siteName}`,
    welcomeContent(user)
  )
}

function sendPurchaseEmail(env: MailerEnv, user: Person, plan: ProPlanId) {
  return deliver(
    env,
    "purchase",
    user.email,
    `Your ${siteName} Pro ${proPlans[plan].name} is ready`,
    purchaseContent(user, plan)
  )
}

function sendTeamInviteEmail(env: MailerEnv, owner: Person, email: string) {
  return deliver(
    env,
    "team invite",
    email,
    `${owner.name} added you to ${siteName} Pro`,
    teamInviteContent(owner, email)
  )
}

export {
  purchaseContent,
  sendPurchaseEmail,
  sendTeamInviteEmail,
  sendWelcomeEmail,
  teamInviteContent,
  welcomeContent,
}

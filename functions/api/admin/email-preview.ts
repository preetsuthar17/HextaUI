import { changelog } from "@/lib/changelog"
import {
  purchaseContent,
  teamInviteContent,
  welcomeContent,
} from "@/lib/email/account"
import { emailAdminError, isEmailAdmin } from "@/lib/email/admin"
import { renderEmail, type EmailContent } from "@/lib/email/layout"
import { releaseHtml } from "@/lib/email/release"
import type { EmailEnv } from "@/lib/email/send"
import { unsubscribeLinks } from "@/lib/email/unsubscribe"
import { apiError } from "@/lib/api-error"

type Context = {
  request: Request
  env: EmailEnv
}

const sampleUser = { name: "Ada Lovelace", email: "ada@example.com" }
const sampleOwner = { name: "Grace Hopper", email: "grace@example.com" }

const templates: Record<string, () => EmailContent> = {
  welcome: () => welcomeContent(sampleUser),
  "purchase-solo": () => purchaseContent(sampleUser, "solo"),
  "purchase-team": () => purchaseContent(sampleUser, "team"),
  "purchase-unlimited": () => purchaseContent(sampleUser, "unlimited"),
  "team-invite": () => teamInviteContent(sampleOwner, sampleUser.email),
}

const templateNames = ["release", ...Object.keys(templates)]

function html(body: string) {
  return new Response(body, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  })
}

export async function onRequestGet({ request, env }: Context) {
  if (!(await isEmailAdmin(request, env.EMAIL_ADMIN_TOKEN))) {
    return emailAdminError()
  }
  const params = new URL(request.url).searchParams
  const template = params.get("template") ?? "release"

  if (template === "release") {
    const date = params.get("date")
    const entry = date
      ? changelog.find((item) => item.date === date)
      : changelog[0]
    if (entry) {
      const links = await unsubscribeLinks(env.BETTER_AUTH_SECRET, "preview")
      return html(releaseHtml(entry, links))
    }
  } else if (templates[template]) {
    return html(renderEmail(templates[template]()).html)
  }

  return apiError("not_found", {
    error: "No such email",
    detail: `There is no email template called ${template}, or no changelog entry for that date.`,
    resolution: `Use template=${templateNames.join(", ")}, and for release a date of ${changelog.map((item) => item.date).join(", ")}.`,
  })
}

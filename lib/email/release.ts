import { changelogGroups, type ChangelogEntry } from "@/lib/changelog"
import { renderEmail, type EmailContent } from "@/lib/email/layout"
import { siteName, siteUrl } from "@/lib/site"

type ReleaseLinks = { page: string; oneClick: string }

const dateFormat = new Intl.DateTimeFormat("en", {
  dateStyle: "long",
  timeZone: "UTC",
})

type ReleaseAudience = "account" | "subscriber"

function releaseFooter(
  links: ReleaseLinks,
  audience: ReleaseAudience
): EmailContent["footer"] {
  if (audience === "subscriber") {
    return [
      `You’re getting this because you asked for ${siteName} updates. `,
      { label: "Unsubscribe", href: links.page },
      ".",
    ]
  }
  return [
    `You’re getting this because you have a ${siteName} account. `,
    { label: "Unsubscribe", href: links.page },
    " or change it any time in ",
    { label: "your account", href: `${siteUrl}/account` },
    ".",
  ]
}

function releaseContent(
  entry: ChangelogEntry,
  links: ReleaseLinks,
  audience: ReleaseAudience = "account"
): EmailContent {
  return {
    title: entry.title,
    eyebrow: dateFormat.format(new Date(entry.date)),
    paragraphs: entry.body,
    lists: changelogGroups.flatMap(({ key, heading }) => {
      const items = entry[key]
      return items?.length ? [{ heading, items }] : []
    }),
    links: [
      { label: "See what’s new", href: `${siteUrl}/changelog#${entry.date}` },
      { label: "Browse blocks", href: `${siteUrl}/blocks` },
    ],
    footer: releaseFooter(links, audience),
  }
}

function releaseHtml(entry: ChangelogEntry, links: ReleaseLinks) {
  return renderEmail(releaseContent(entry, links)).html
}

function releaseEmail(
  entry: ChangelogEntry,
  to: string,
  links: ReleaseLinks,
  audience: ReleaseAudience = "account"
) {
  return {
    to,
    subject: `${entry.title} — ${siteName}`,
    ...renderEmail(releaseContent(entry, links, audience)),
    headers: {
      "List-Unsubscribe": `<${links.oneClick}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  }
}

export { releaseEmail, releaseHtml, type ReleaseAudience, type ReleaseLinks }

import type { Metadata } from "next"

import { JsonLd } from "@/components/site/json-ld"

import {
  changelog,
  changelogGroups,
  type ChangelogEntry,
} from "@/lib/changelog"
import { pageMetadata } from "@/lib/metadata"
import { pageJsonLd } from "@/lib/structured-data"

export const metadata: Metadata = pageMetadata({
  title: "Changelog",
  description:
    "Every HextaUI and HextaUI Pro release, newest first: new components and blocks, improvements and what was removed.",
  path: "/changelog",
})

const dateFormat = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeZone: "UTC",
})

function Entry({ entry }: { entry: ChangelogEntry }) {
  return (
    <article
      id={entry.date}
      className="grid scroll-mt-20 gap-x-10 gap-y-3 border-t py-12 first:border-t-0 first:pt-0 md:grid-cols-[12rem_1fr]"
    >
      <div>
        <time
          dateTime={entry.date}
          className="block text-sm text-muted-foreground tabular-nums md:sticky md:top-20"
        >
          {dateFormat.format(new Date(entry.date))}
        </time>
      </div>
      <div className="flex max-w-2xl flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-balance">
          {entry.title}
        </h2>
        {entry.body.map((paragraph) => (
          <p key={paragraph} className="text-base/7 text-pretty">
            {paragraph}
          </p>
        ))}
        {changelogGroups.map(({ key, heading }) => {
          const items = entry[key]
          if (!items?.length) return null
          return (
            <section key={key} className="flex flex-col gap-2 pt-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                {heading}
              </h3>
              <ul className="flex list-disc flex-col gap-1.5 ps-5 text-base/7 text-pretty marker:text-muted-foreground">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </article>
  )
}

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pt-16 pb-24 sm:pt-24">
      <JsonLd
        data={pageJsonLd({
          path: "/changelog",
          name: String(metadata.title),
          description: String(metadata.description),
          breadcrumbs: [{ name: "Changelog", path: "/changelog" }],
          type: "WebPage",
        })}
      />
      <header className="grid gap-x-10 pb-16 md:grid-cols-[12rem_1fr]">
        <div className="flex max-w-2xl flex-col gap-3 md:col-start-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Changelog
          </h1>
          <p className="text-base/7 text-pretty text-muted-foreground">
            What shipped in HextaUI and HextaUI Pro.
          </p>
        </div>
      </header>
      <div className="flex flex-col">
        {changelog.map((entry) => (
          <Entry key={entry.title} entry={entry} />
        ))}
      </div>
    </main>
  )
}

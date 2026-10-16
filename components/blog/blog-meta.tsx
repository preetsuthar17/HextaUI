import { getRequestLocale } from "@/lib/i18n/request"
import { t } from "@/lib/i18n/rich"

const authorLinkClassName =
  "rounded-sm text-foreground transition-colors duration-150 outline-none hover:underline hover:underline-offset-4 focus-visible:ring-3 focus-visible:ring-focus-ring motion-reduce:transition-none"

function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat(getRequestLocale().locale, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(date))
}

function BlogMeta({
  published,
  minutes,
  author,
  className,
}: {
  published: string
  minutes: number
  author?: { name: string; url: string }
  className?: string
}) {
  return (
    <p className={className ?? "text-sm text-muted-foreground"}>
      {author ? (
        <>
          <a
            href={author.url}
            target="_blank"
            rel="noreferrer"
            className={authorLinkClassName}
          >
            {author.name}
          </a>
          {" · "}
        </>
      ) : null}
      <time dateTime={published}>{formatBlogDate(published)}</time>
      {" · "}
      {t("{minutes} min read", { minutes })}
    </p>
  )
}

function BlogTags({ tags }: { tags: string[] }) {
  return (
    <ul aria-label={t("Tags")} className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="inline-flex rounded-md border px-2.5 py-1 text-sm text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}

export { BlogMeta, BlogTags, formatBlogDate }

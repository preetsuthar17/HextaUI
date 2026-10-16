import Link from "@/components/site/link"

import { BlogMeta, BlogTags } from "@/components/blog/blog-meta"
import { InfoPage } from "@/components/site/info-page"
import { JsonLd } from "@/components/site/json-ld"
import {
  blogDescription,
  blogLead,
  blogPosts,
  blogTitle,
  getBlogHref,
} from "@/lib/blog"
import { getBlogArticle } from "@/lib/blog-content"
import { t } from "@/lib/i18n/rich"
import { blogJsonLd } from "@/lib/structured-data"

const titleLinkClassName =
  "rounded-sm outline-none hover:underline hover:underline-offset-4 focus-visible:ring-3 focus-visible:ring-focus-ring"

async function BlogIndex() {
  const articles = await Promise.all(
    blogPosts.map((post) => getBlogArticle(post.slug))
  )

  return (
    <InfoPage title={blogTitle} lead={blogLead}>
      <JsonLd
        data={blogJsonLd(
          blogDescription,
          blogPosts.map((post) => ({
            path: getBlogHref(post.slug),
            headline: post.title,
            published: post.published,
          }))
        )}
      />
      <ul className="mt-12 flex flex-col">
        {articles.map(({ post, minutes }) => (
          <li
            key={post.slug}
            className="flex flex-col gap-3 border-t py-8 first:border-t-0 first:pt-0"
          >
            <BlogMeta published={post.published} minutes={minutes} />
            <h2 className="text-xl font-semibold tracking-tight text-balance">
              <Link
                href={getBlogHref(post.slug)}
                className={titleLinkClassName}
              >
                {t(post.title)}
              </Link>
            </h2>
            <p className="text-base/7 text-pretty text-muted-foreground">
              {t(post.description)}
            </p>
            <BlogTags tags={post.tags} />
          </li>
        ))}
      </ul>
    </InfoPage>
  )
}

export { BlogIndex }

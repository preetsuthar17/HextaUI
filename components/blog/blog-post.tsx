import Link from "@/components/site/link"

import { BlogBody } from "@/components/blog/blog-body"
import { BlogMeta, BlogTags } from "@/components/blog/blog-meta"
import { DocsPageActions } from "@/components/docs/docs-page-actions"
import { DocsRelated } from "@/components/docs/docs-related"
import { JsonLd } from "@/components/site/json-ld"
import {
  blogAuthor,
  getBlogHref,
  getBlogImageHref,
  getBlogMarkdownHref,
  getRelatedBlogPosts,
} from "@/lib/blog"
import { getBlogArticle } from "@/lib/blog-content"
import { t } from "@/lib/i18n/rich"
import { blogPostingJsonLd } from "@/lib/structured-data"

const backLinkClassName =
  "rounded-sm text-sm text-muted-foreground transition-colors duration-150 outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-focus-ring motion-reduce:transition-none"

async function BlogPost({ slug }: { slug: string }) {
  const { post, blocks, words, minutes } = await getBlogArticle(slug)
  const path = getBlogHref(slug)
  const related = getRelatedBlogPosts(slug).map((other) => ({
    href: getBlogHref(other.slug),
    title: other.title,
    description: other.description,
  }))

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pt-16 pb-24">
      <JsonLd
        data={blogPostingJsonLd({
          path,
          headline: post.title,
          description: post.description,
          published: post.published,
          tags: post.tags,
          words,
          minutes,
          image: getBlogImageHref(slug),
          author: blogAuthor,
        })}
      />
      <article>
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <Link href="/blog" className={backLinkClassName}>
              ← {t("Blog")}
            </Link>
            <DocsPageActions markdownHref={getBlogMarkdownHref(slug)} />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-balance">
            {t(post.title)}
          </h1>
          <p className="text-base/7 text-pretty text-muted-foreground">
            {t(post.description)}
          </p>
          <BlogMeta
            published={post.published}
            minutes={minutes}
            author={blogAuthor}
          />
          <BlogTags tags={post.tags} />
        </header>
        <div className="flex flex-col">
          <BlogBody blocks={blocks} />
        </div>
      </article>
      <DocsRelated title="Related posts" links={related} />
    </main>
  )
}

export { BlogPost }

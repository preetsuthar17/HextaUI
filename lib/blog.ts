import type { Metadata } from "next"

import { pageMetadata } from "@/lib/metadata"
import { absoluteUrl, siteAuthor, siteName } from "@/lib/site"

type BlogPost = {
  slug: string
  title: string
  seoTitle: string
  description: string
  tags: string[]
  published: string
}

const blogTitle = "Blog"
const blogDescription =
  "Articles from the maker of HextaUI on shadcn/ui, Base UI, the hard UI states, AI chat interfaces and registries that AI coding agents can use."
const blogLead =
  "Notes from building HextaUI: shadcn/ui and Base UI, the states most interfaces skip, AI chat screens and making a registry work for coding agents."
const blogAuthor = {
  name: siteAuthor,
  url: "https://twitter.com/preetsuthar17",
}
const wordsPerMinute = 220

const blogPosts: BlogPost[] = [
  {
    slug: "shadcn-base-ui-vs-radix",
    title:
      "shadcn/ui switched to Base UI. Here is what actually changes in your code",
    seoTitle: "Base UI vs Radix: what changes in shadcn/ui code",
    description:
      "shadcn/ui now defaults to Base UI instead of Radix. Every API change you will hit, the -b radix escape hatch and a migration order that does not hurt.",
    tags: ["React", "shadcn/ui", "Base UI", "Radix"],
    published: "2026-10-16",
  },
  {
    slug: "shadcn-ui-states",
    title:
      "The states shadcn/ui leaves to you: loading, success, error, empty and reduced motion",
    seoTitle: "The UI states shadcn/ui leaves to you",
    description:
      "shadcn/ui gives you a clean button, not a loading button. The hard UI states every shadcn project hand-rolls, with the timings that make them feel right.",
    tags: ["React", "shadcn/ui", "UX", "Accessibility"],
    published: "2026-10-16",
  },
  {
    slug: "ai-chat-ui-shadcn-ai-sdk",
    title:
      "How to build an AI chat UI with shadcn/ui and the Vercel AI SDK that survives real users",
    seoTitle: "Build an AI chat UI with shadcn/ui and the AI SDK",
    description:
      "A streaming AI chat is easy to demo and hard to ship. The states a shadcn/ui and AI SDK chat has to handle, from stop and retry to tool approvals and CJK input.",
    tags: ["AI", "React", "shadcn/ui", "Next.js"],
    published: "2026-10-16",
  },
  {
    slug: "ai-elements-deprecated-alternatives",
    title:
      "Vercel's AI Elements is being deprecated. Here are the alternatives for shadcn/ui AI chat UI",
    seoTitle: "AI Elements is deprecated: shadcn/ui alternatives",
    description:
      "Vercel's AI Elements is deprecated at the end of November 2026. What replaces it, what to do with code you copied, and five shadcn/ui AI chat options compared.",
    tags: ["AI", "shadcn/ui", "React", "Next.js"],
    published: "2026-10-16",
  },
  {
    slug: "agent-ready-shadcn-registry",
    title:
      "How to build a shadcn/ui registry that Claude Code and Cursor can actually use",
    seoTitle: "A shadcn/ui registry Claude Code and Cursor can use",
    description:
      "A shadcn registry is half the job in 2026. Namespaces, Markdown docs at .md URLs, llms.txt, an MCP server and private registries, so AI agents install it right.",
    tags: ["shadcn/ui", "AI", "React", "Developer tools"],
    published: "2026-10-16",
  },
]

const blogSlugs = blogPosts.map((post) => post.slug)

function getBlogPost(slug: string) {
  const post = blogPosts.find((item) => item.slug === slug)
  if (!post) throw new Error(`blog: no post named ${slug}`)
  return post
}

function isBlogSlug(slug: string) {
  return blogSlugs.includes(slug)
}

function getBlogHref(slug: string) {
  return `/blog/${slug}`
}

function getBlogMarkdownHref(slug: string) {
  return `/blog/${slug}.md`
}

function getBlogImageHref(slug: string) {
  return `/blog/${slug}/opengraph-image`
}

function getRelatedBlogPosts(slug: string, max = 3) {
  const post = getBlogPost(slug)
  return blogPosts
    .filter((other) => other.slug !== slug)
    .map((other, index) => ({
      post: other,
      shared: other.tags.filter((tag) => post.tags.includes(tag)).length,
      index,
    }))
    .sort((a, b) => b.shared - a.shared || a.index - b.index)
    .slice(0, max)
    .map((item) => item.post)
}

function getReadingMinutes(words: number) {
  return Math.max(1, Math.round(words / wordsPerMinute))
}

function blogPostMetadata(slug: string): Metadata {
  const post = getBlogPost(slug)
  const path = getBlogHref(slug)
  const metadata = pageMetadata({
    title: post.seoTitle,
    description: post.description,
    path,
    markdown: getBlogMarkdownHref(slug),
  })
  const image = {
    url: getBlogImageHref(slug),
    width: 1200,
    height: 630,
    alt: `${post.title} — ${siteName}`,
  }

  return {
    ...metadata,
    keywords: post.tags,
    authors: [blogAuthor],
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.published,
      authors: [blogAuthor.url],
      tags: post.tags,
      images: [image],
    },
    twitter: { ...metadata.twitter, images: [image] },
  }
}

const blogIndexMetadata: Metadata = {
  ...pageMetadata({
    title: blogTitle,
    description: blogDescription,
    path: "/blog",
    markdown: "/blog.md",
  }),
}

function blogImageAlt(slug: string) {
  return `${getBlogPost(slug).title} — ${siteName}`
}

function blogPostUrl(slug: string) {
  return absoluteUrl(getBlogHref(slug))
}

export {
  blogAuthor,
  blogDescription,
  blogImageAlt,
  blogIndexMetadata,
  blogLead,
  blogPostMetadata,
  blogPosts,
  blogPostUrl,
  blogSlugs,
  blogTitle,
  getBlogHref,
  getBlogImageHref,
  getBlogMarkdownHref,
  getBlogPost,
  getReadingMinutes,
  getRelatedBlogPosts,
  isBlogSlug,
  type BlogPost,
}

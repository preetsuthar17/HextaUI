import { readFile } from "node:fs/promises"
import path from "node:path"

import {
  blogAuthor,
  blogDescription,
  blogPosts,
  blogTitle,
  getBlogHref,
  getBlogMarkdownHref,
  getBlogPost,
  getReadingMinutes,
  type BlogPost,
} from "@/lib/blog"
import {
  blogPlainText,
  countWords,
  parseBlogMarkdown,
  type BlogBlock,
} from "@/lib/blog-markdown"
import { frontmatter } from "@/lib/frontmatter"
import { absoluteUrl, siteName } from "@/lib/site"

type BlogArticle = {
  post: BlogPost
  blocks: BlogBlock[]
  words: number
  minutes: number
  markdown: string
}

const contentDir = path.join(process.cwd(), "content/blog")

function blogContentFile(slug: string) {
  return `content/blog/${slug}.md`
}

async function getBlogArticle(slug: string): Promise<BlogArticle> {
  const post = getBlogPost(slug)
  const markdown = (
    await readFile(path.join(contentDir, `${slug}.md`), "utf8")
  ).trim()
  const blocks = parseBlogMarkdown(markdown)
  const words = countWords(blogPlainText(blocks))
  return { post, blocks, words, minutes: getReadingMinutes(words), markdown }
}

function postLine(post: BlogPost) {
  return `- [${post.title}](${absoluteUrl(getBlogMarkdownHref(post.slug))}): ${post.description}`
}

async function getBlogPostMarkdown(slug: string) {
  const { post, markdown, minutes } = await getBlogArticle(slug)
  return `${[
    frontmatter({
      title: post.title,
      description: post.description,
      author: blogAuthor.name,
      date: post.published,
      tags: post.tags.join(", "),
      url: absoluteUrl(getBlogHref(slug)),
    }),
    `# ${post.title}`,
    `> ${post.description}`,
    `By ${blogAuthor.name} · ${post.published} · ${minutes} min read\nBlog: ${absoluteUrl(getBlogHref(slug))}\nMarkdown: ${absoluteUrl(getBlogMarkdownHref(slug))}`,
    markdown,
  ].join("\n\n")}\n`
}

function getBlogIndexMarkdown() {
  return `${[
    `# ${siteName} ${blogTitle}`,
    `> ${blogDescription}`,
    `Blog: ${absoluteUrl("/blog")}\nMarkdown: ${absoluteUrl("/blog.md")}`,
    blogPosts.map(postLine).join("\n"),
  ].join("\n\n")}\n`
}

function getBlogLlms() {
  return `${[
    `# ${siteName} ${blogTitle}`,
    `> ${blogDescription} Each article is available as Markdown at its \`.md\` URL.`,
    `- Written by ${blogAuthor.name}, the maker of ${siteName}.\n- Append \`.md\` to any article URL for its Markdown, for example ${absoluteUrl(getBlogMarkdownHref(blogPosts[0].slug))}.`,
    "## Articles",
    blogPosts.map(postLine).join("\n"),
    "## Optional",
    `- [Site index](${absoluteUrl("/llms.txt")}): what ${siteName} is, when to use it, and every developer resource.\n- [Docs index](${absoluteUrl("/docs/llms.txt")}): every docs page as Markdown.`,
  ].join("\n\n")}\n`
}

export {
  blogContentFile,
  getBlogArticle,
  getBlogIndexMarkdown,
  getBlogLlms,
  getBlogPostMarkdown,
  type BlogArticle,
}

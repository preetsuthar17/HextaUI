import { localizeHref } from "@/lib/i18n/config"
import { getRequestLocale } from "@/lib/i18n/request"
import { t } from "@/lib/i18n/rich"
import {
  absoluteUrl,
  siteAuthor,
  siteName,
  siteRepository,
  siteUrl,
} from "@/lib/site"

type Crumb = { name: string; path: string }

type FaqItem = { question: string; answer: string }

type DocsArticle = {
  path: string
  headline: string
  description: string
  breadcrumbs: Crumb[]
  image?: string
  code: {
    name: string
    free: boolean
    license: string
    sampleType?: string
    basedOn?: string
  }
}

type WebPageType = "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage"

type PageGraph = {
  path: string
  name: string
  description: string
  breadcrumbs: Crumb[]
  type?: WebPageType
  image?: string
  items?: Crumb[]
  extra?: object[]
}

const websiteRef = { "@id": `${siteUrl}/#website` }
const organizationRef = { "@id": `${siteUrl}/#organization` }

function localUrl(path: string) {
  return absoluteUrl(localizeHref(path, getRequestLocale().locale))
}

function breadcrumbList(path: string, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${localUrl(path)}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: t(crumb.name),
      item: localUrl(crumb.path),
    })),
  }
}

function imageObject(image: string | undefined) {
  return image
    ? {
        image: {
          "@type": "ImageObject",
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
        },
      }
    : {}
}

function docsArticleJsonLd({
  path,
  headline,
  description,
  breadcrumbs,
  image,
  code,
}: DocsArticle) {
  const url = localUrl(path)

  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbList(path, breadcrumbs),
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        headline: t(headline),
        description: t(description),
        url,
        mainEntityOfPage: url,
        inLanguage: getRequestLocale().locale,
        isPartOf: websiteRef,
        publisher: organizationRef,
        author: { "@type": "Person", name: siteAuthor },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        ...imageObject(image),
        about: {
          "@type": "SoftwareSourceCode",
          name: `${siteName} ${code.name}`,
          programmingLanguage: "TypeScript",
          runtimePlatform: "React",
          codeRepository: siteRepository,
          license: code.license,
          isAccessibleForFree: code.free,
          ...(code.sampleType ? { codeSampleType: code.sampleType } : {}),
          ...(code.basedOn ? { isBasedOn: localUrl(code.basedOn) } : {}),
        },
      },
    ],
  }
}

type BlogArticleData = {
  path: string
  headline: string
  description: string
  published: string
  tags: string[]
  words: number
  minutes: number
  image: string
  author: { name: string; url: string }
}

const blogCrumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
]

function blogRef() {
  return { "@id": `${absoluteUrl("/blog")}#blog` }
}

function blogPostingJsonLd({
  path,
  headline,
  description,
  published,
  tags,
  words,
  minutes,
  image,
  author,
}: BlogArticleData) {
  const url = localUrl(path)

  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbList(path, [...blogCrumbs, { name: headline, path }]),
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: t(headline),
        description: t(description),
        url,
        mainEntityOfPage: url,
        image: absoluteUrl(image),
        datePublished: published,
        dateModified: published,
        inLanguage: getRequestLocale().locale,
        isPartOf: blogRef(),
        publisher: organizationRef,
        author: { "@type": "Person", name: author.name, url: author.url },
        keywords: tags,
        wordCount: words,
        timeRequired: `PT${minutes}M`,
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
    ],
  }
}

function blogJsonLd(
  description: string,
  posts: { path: string; headline: string; published: string }[]
) {
  const url = localUrl("/blog")

  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbList("/blog", blogCrumbs),
      {
        "@type": "Blog",
        "@id": `${absoluteUrl("/blog")}#blog`,
        name: `${siteName} Blog`,
        description: t(description),
        url,
        inLanguage: getRequestLocale().locale,
        isPartOf: websiteRef,
        publisher: organizationRef,
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          "@id": `${localUrl(post.path)}#article`,
          headline: t(post.headline),
          url: localUrl(post.path),
          datePublished: post.published,
        })),
      },
    ],
  }
}

function faqPageJsonLd(path: string, items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    "@id": `${localUrl(path)}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }
}

function itemList(path: string, name: string, items: Crumb[]) {
  return {
    "@type": "ItemList",
    "@id": `${localUrl(path)}#items`,
    name: t(name),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: t(item.name),
      url: localUrl(item.path),
    })),
  }
}

function pageJsonLd({
  path,
  name,
  description,
  breadcrumbs,
  type = "WebPage",
  image,
  items,
  extra = [],
}: PageGraph) {
  const url = localUrl(path)

  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbList(path, breadcrumbs),
      {
        "@type": type,
        "@id": `${url}#webpage`,
        name: t(name),
        description: t(description),
        url,
        inLanguage: getRequestLocale().locale,
        isPartOf: websiteRef,
        publisher: organizationRef,
        breadcrumb: { "@id": `${url}#breadcrumb` },
        ...imageObject(image),
        ...(items ? { mainEntity: { "@id": `${url}#items` } } : {}),
      },
      ...(items ? [itemList(path, name, items)] : []),
      ...extra,
    ],
  }
}

export {
  blogJsonLd,
  blogPostingJsonLd,
  breadcrumbList,
  docsArticleJsonLd,
  faqPageJsonLd,
  itemList,
  pageJsonLd,
  type Crumb,
}

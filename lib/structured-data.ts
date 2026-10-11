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
  code: {
    name: string
    free: boolean
    license: string
  }
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

function docsArticleJsonLd({
  path,
  headline,
  description,
  breadcrumbs,
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
        about: {
          "@type": "SoftwareSourceCode",
          name: `${siteName} ${code.name}`,
          programmingLanguage: "TypeScript",
          runtimePlatform: "React",
          codeRepository: siteRepository,
          license: code.license,
          isAccessibleForFree: code.free,
        },
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

export { breadcrumbList, docsArticleJsonLd, faqPageJsonLd, type Crumb }

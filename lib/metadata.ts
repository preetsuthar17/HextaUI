import type { Metadata } from "next";

type MetadataOptions = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  keywords?: string[];
};

const baseMetadata = {
  applicationName: "HextaUI",
  authors: [{ name: "Preet Suthar", url: "https://preetsuthar.me" }],
  creator: "Preet Suthar",
  publisher: "Preet Suthar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.hextaui.com"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
  category: "Web Development Tools",
  classification: "Software Development Tools",
} satisfies Partial<Metadata>;

const DEFAULT_OG_IMAGE =
  "https://5xfmztgsig.ufs.sh/f/ZzCwT4wrsqrVozjaUvdGPLJUvqyRh8sbeO1wTpAICiMtWFr9";

export function generateMetadata({
  title,
  description,
  url = "/",
  image = "",
  keywords = [],
}: MetadataOptions = {}): Metadata {
  const defaultTitle = "Extended Components & Blocks for shadcn/ui.";
  const defaultDescription =
    "Ready-to-use foundation components/blocks built on top of shadcn/ui.";

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalUrl =
    url === "/" ? "https://www.hextaui.com" : `https://www.hextaui.com${url}`;

  const titleConfig = title
    ? { absolute: title }
    : {
        default: defaultTitle,
        template: "HextaUI: %s",
      };

  const ogImageUrl =
    image ||
    (url.startsWith("/components/")
      ? `https://www.hextaui.com/og?component=${url.split("/").pop()}`
      : DEFAULT_OG_IMAGE);

  return {
    ...baseMetadata,
    title: titleConfig,
    description: finalDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: finalUrl,
      siteName: "HextaUI",
      title: finalTitle,
      description: finalDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: finalTitle,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@HextaUI",
      creator: "@HextaUI",
      title: finalTitle,
      description: finalDescription,
      images: [ogImageUrl],
    },
    keywords: keywords.length > 0 ? keywords : undefined,
  };
}

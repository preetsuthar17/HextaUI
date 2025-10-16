import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { customMetaDataGenerator } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = customMetaDataGenerator({
  title: "HextaUI: Complete shadcn blocks for rapid UI development.",
  description:
    "Pre-built application blocks built with shadcn. Copy & paste entire sections and customize to your needs.",
  canonicalUrl: "https://hextaui.com",
  ogType: "website",
  twitterCard: "summary_large_image",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
          name="viewport"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          className="skip-to-content sr-only"
          href="#main-content"
          tabIndex={1}
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

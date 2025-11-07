import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "sonner";
import { ComponentSearch } from "@/components/component-search";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = generatePageMetadata();

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-foreground focus:shadow"
          href="#content"
        >
          Skip to content
        </a>
        <ComponentSearch />
        <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
          <SiteHeader />
          <main className="mx-auto w-full px-4 py-6" id="content">
            {children}
          </main>
          <SiteFooter />
        </div>
        <Toaster />
        <Script
          defer
          src="https://assets.onedollarstats.com/stonks.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

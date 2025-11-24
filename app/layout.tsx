import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Onest,
  Playfair_Display,
  Rubik,
  TASA_Orbiter,
} from "next/font/google";
import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { ComponentSearch } from "@/components/docs/component-search";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeInitializer } from "@/components/theme-initializer";
import { ThemeProvider } from "@/components/theme-provider";
import { generateThemeScript } from "@/lib/generate-theme-script";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const tasaOrbiter = TASA_Orbiter({
  variable: "--font-tasa-orbiter",
  subsets: ["latin"],
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "Noto Sans",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
  ],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = generatePageMetadata();

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }],
};

const fontVariables = [
  geist.variable,
  inter.variable,
  playfairDisplay.variable,
  geistMono.variable,
  rubik.variable,
  onest.variable,
  tasaOrbiter.variable,
].join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          crossOrigin="anonymous"
          href="https://cdnjs.buymeacoffee.com"
          rel="preconnect"
        />
        <link href="https://assets.onedollarstats.com" rel="dns-prefetch" />
        <link
          href="/rss.xml"
          rel="alternate"
          title="HextaUI Component Registry"
          type="application/rss+xml"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: generateThemeScript(),
          }}
          suppressHydrationWarning
        />
        {process.env.NODE_ENV === "development" && (
          <Script
            crossOrigin="anonymous"
            data-enabled="true"
            src="//unpkg.com/react-grab/dist/index.global.js"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className={`${fontVariables} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem={false}
        >
          <NuqsAdapter>
            <ThemeInitializer />
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
          </NuqsAdapter>
        </ThemeProvider>
        <Script
          src="https://assets.onedollarstats.com/stonks.js"
          strategy="lazyOnload"
        />
        {process.env.NODE_ENV === "development" && (
          <Script
            data-debug="hextaui.com"
            defer
            src="https://assets.onedollarstats.com/stonks.js"
          />
        )}
        {process.env.NODE_ENV === "development" && (
          <Script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
            strategy="lazyOnload"
          />
        )}
        <script
          data-cfasync="false"
          data-color="#FF813F"
          data-description="Support me on Buy me a coffee!"
          data-id="preetsuthar17"
          data-message="You can support HextaUI here!"
          data-name="BMC-Widget"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
          defer
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        />
      </body>
      <GoogleAnalytics gaId="G-ETYD3SB2M7" />
    </html>
  );
}

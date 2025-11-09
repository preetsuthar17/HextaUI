import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "sonner";
import { ComponentSearch } from "@/components/component-search";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
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
        </ThemeProvider>
        <Script
          defer
          src="https://assets.onedollarstats.com/stonks.js"
          strategy="afterInteractive"
        />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
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
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        />
      </body>
    </html>
  );
}

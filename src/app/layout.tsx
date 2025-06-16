import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { DM_Sans, Geist, Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import { Toaster } from "@/components/ui/toast";
import { Banner } from "fumadocs-ui/components/banner";
import Script from "next/script";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["400", "500", "600", "700"],
});

const dm_sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["100", "200", "300", "400", "500", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["500", "700"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.className} ${jetbrains_mono.variable} ${dm_sans.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          defer
          data-website-id="6849a988cb9728c2dd6b6de9"
          data-domain="hextaui.com"
          src="https://datafa.st/js/script.js"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Banner variant="rainbow">
          <Link href="https://pro.hextaui.com/blocks" target="_blank">
            Build websites 10x faster with <u>HextaUI Blocks</u> 🎉
          </Link>{" "}
        </Banner>
        <RootProvider>{children}</RootProvider>
        <Toaster />
        <GoogleAnalytics gaId="G-MYXZQWL3V4" />
      </body>
    </html>
  );
}

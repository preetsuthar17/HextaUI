import "./global.css";
import "./banner-optimizations.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Geist, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import OptimizedBanner from "@/components/OptimizedBanner";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["400", "500", "600", "700"],
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
      className={`${geist.className} ${jetbrains_mono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        {/* <OptimizedBanner variant="rainbow">
          <Link href="/docs/everything-by-hextaui/blocks">
            Build websites 10x faster with <u>HextaUI Blocks</u> 🎉
          </Link>{" "}
        </OptimizedBanner> */}
        <RootProvider>{children}</RootProvider>
        <PerformanceMonitor />
        <GoogleAnalytics gaId="G-MYXZQWL3V4" />
        <script
          data-goatcounter="https://hextui.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        ></script>
      </body>
    </html>
  );
}

import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Banner } from "fumadocs-ui/components/banner";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
      className={`${inter.className} ${jetbrains_mono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        {" "}
        <Banner variant="rainbow">
          <Link href="/docs/everything-by-hextaui/blocks">
            Build websites 10x faster with <u>HextaUI Blocks</u> 🎉
          </Link>{" "}
        </Banner>
        <RootProvider
          theme={{
            enabled: false,
          }}
        >
          {children}
        </RootProvider>
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

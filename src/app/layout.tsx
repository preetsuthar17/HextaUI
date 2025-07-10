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
      className={`${geist.variable} ${jetbrains_mono.variable} ${dm_sans.variable} ${inter.className}`}
      suppressHydrationWarning
    >
      <head>
        <script
          defer
          src="https://assets.onedollarstats.com/stonks.js"
        ></script>
        <script
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="preetsuthar17"
          data-message="Psst, here! If you like my work, consider buying me a coffee. ☕"
          data-description="Support me on Buy me a coffee!"
          data-color="#FF813F"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
        ></script>
      </head>
      <body className="flex flex-col min-h-screen">
        <Banner variant="rainbow">
          <Link
            href="https://pro.hextaui.com/blocks"
            className="font-medium"
            target="_blank"
          >
            Build websites 10x faster with HextaUI Blocks —{" "}
            <span className="underline">Learn more</span>
          </Link>{" "}
        </Banner>
        <RootProvider>{children}</RootProvider>
        <Toaster />
        <GoogleAnalytics gaId="G-MYXZQWL3V4" />
      </body>
    </html>
  );
}

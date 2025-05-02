import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { DM_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { Banner } from "fumadocs-ui/components/banner";
import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";

const dm_sans = DM_Sans({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={dm_sans.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        {" "}
        <Banner variant="rainbow">
          <Link href="https://github.com/sponsors/preetsuthar17">
            Sponsor HextaUI &lt;3
          </Link>{" "}
        </Banner>
        <RootProvider>{children}</RootProvider>
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

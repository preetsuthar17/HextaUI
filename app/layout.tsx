import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { DM_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { Banner } from "fumadocs-ui/components/banner";
import { GoogleAnalytics } from "@next/third-parties/google";

const dm_sans = DM_Sans({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={dm_sans.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        {" "}
        <Banner variant="rainbow">
          We are working on new components &lt;3
        </Banner>
        <RootProvider>{children}</RootProvider>
        <GoogleAnalytics gaId="G-MYXZQWL3V4" />
      </body>
    </html>
  );
}

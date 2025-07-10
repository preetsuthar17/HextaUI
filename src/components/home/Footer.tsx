import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col border-t gap-12  h-fit px-10 pt-28  ">
        <div className="flex justify-between items-start text-left gap-8 flex-wrap">
          <div className="flex flex-col items-start justify-center gap-4">
            <p className="font-medium">Everything by HextaUI</p>
            <ul className="flex flex-col items-start justify-center gap-3 text-sm">
              <li>
                <Link
                  className="opacity-80 hover:opacity-100"
                  href="/docs/ui/foundation/components"
                >
                  HextaUI Components
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  className="opacity-80 hover:opacity-100"
                  href="https://pro.hextaui.com/"
                >
                  HextaUI Blocks
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
            <p className="font-medium">Components</p>
            <ul className="flex flex-col items-start justify-center gap-3 text-sm">
              <li>
                <Link
                  className="opacity-80 hover:opacity-100"
                  href="/docs/ui/getting-started/introduction"
                >
                  Introduction
                </Link>
              </li>
              <li>
                <Link
                  className="opacity-80 hover:opacity-100"
                  href="/docs/ui/getting-started/installation"
                >
                  Installation
                </Link>
              </li>
              <li>
                <Link
                  className="opacity-80 hover:opacity-100"
                  href="/docs/ui/getting-started/rtl-setup"
                >
                  RTL Setup
                </Link>
              </li>
              <li>
                <Link
                  className="opacity-80 hover:opacity-100"
                  href="/docs/ui/getting-started/roadmap "
                >
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  className="opacity-80 hover:opacity-100"
                  href="/docs/ui/getting-started/changelog"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
            <p className="font-medium">Pro Features</p>
            <ul className="flex flex-col items-start justify-center gap-3 text-sm">
              <li>
                <Link
                  className="opacity-80 hover:opacity-100"
                  href="https://pro.hextaui.com/#"
                >
                  HextaUI Blocks
                </Link>
              </li>
              <li>
                <Link
                  className="opacity-80 hover:opacity-100"
                  href="https://pro.hextaui.com/#pricing"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="opacity-80 hover:opacity-100"
                  href="https://pro.hextaui.com/#faq"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
            <p className="font-medium">Other</p>
            <ul className="flex flex-col items-start justify-center gap-3 text-sm">
              <li>
                <Link
                  className="opacity-80 hover:opacity-100"
                  href="https://discord.gg/hG4dkbMcZf"
                  target="_blank"
                >
                  Discord Server
                </Link>
              </li>
              <li>
                <Link
                  className="opacity-80 hover:opacity-100"
                  href="https://github.com/preetsuthar17/HextaUI"
                  target="_blank"
                >
                  Github
                </Link>
              </li>
              <li>
                <Link
                  className="opacity-80 hover:opacity-100"
                  href="https://discord.gg/hG4dkbMcZf"
                  target="_blank"
                >
                  Contact us
                </Link>
              </li>
              <li>
                <Link
                  className="opacity-80 hover:opacity-100"
                  href="/llms.txt"
                  target="_blank"
                >
                  llms.txt
                </Link>
              </li>
              <li>
                <Link
                  className="opacity-80 hover:opacity-100"
                  href="/llms-full.txt"
                  target="_blank"
                >
                  llms-full.txt
                </Link>
              </li>
              <li>
                <Link
                  className="opacity-80 hover:opacity-100"
                  href="https://ikiform.com"
                  target="_blank"
                >
                  Ikiform
                </Link>
              </li>
            </ul>
          </div>{" "}
          <div className="flex flex-col items-start justify-center gap-4">
            <p className="font-medium">Legal</p>
            <ul className="flex flex-col items-start justify-center gap-3 text-sm">
              <li>
                <Link
                  className="opacity-80 hover:opacity-100"
                  href="https://pro.hextaui.com/privacy"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="opacity-80 hover:opacity-100"
                  href="https://pro.hextaui.com/terms"
                  target="_blank"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-end justify-end relative">
          <Image
            src="/text-logo.svg"
            width={0}
            height={0}
            sizes="100vw"
            alt="HextaUI"
            className="pointer-events-none w-full h-auto relative z-10"
            style={{
              filter: "brightness(30%)",
              maskImage:
                "linear-gradient(to top, transparent 0%, hsl(var(--hu-foreground)) 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, transparent 0%, hsl(var(--hu-foreground)) 100%)",
            }}
          />
        </div>
      </footer>
    </>
  );
};

export default Footer;

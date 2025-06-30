import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from "fumadocs-ui/layouts/home/navbar";
import { Zap, Palette, Kanban, Book, ComponentIcon } from "lucide-react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        {
          type: "menu",
          on: "menu",
          text: "Documentation",
          items: [
            {
              text: "Getting Started",
              url: "/docs/ui/getting-started/introduction",
              icon: <Book />,
            },
            {
              text: "Components",
              url: "/docs/ui/everything-by-hextaui/base-components",
              icon: <ComponentIcon />,
            },
          ],
        },
        {
          type: "custom",
          on: "nav",
          children: (
            <NavbarMenu>
              <NavbarMenuTrigger>
                <Link href="/docs/ui/getting-started/introduction">
                  Documentation
                </Link>
              </NavbarMenuTrigger>
              <NavbarMenuContent className="text-[15px]">
                <NavbarMenuLink
                  href="/docs/ui/getting-started/introduction"
                  className="md:row-span-2"
                >
                  <div className="-mx-3 -mt-3">
                    <Image
                      src="/Banner.png"
                      width={500}
                      height={200}
                      layout="responsive"
                      alt="Perview"
                      className="rounded-t-lg object-cover"
                      style={{
                        maskImage:
                          "linear-gradient(to bottom,white 60%,transparent)",
                      }}
                    />
                  </div>
                  <p className="font-medium">Getting Started</p>
                  <p className="text-muted-foreground text-sm">
                    Introduction and installation guide for HextaUI.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink
                  href="/docs/ui/getting-started/installation"
                  className="lg:col-start-2"
                >
                  <Zap className="bg-primary text-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Installation</p>
                  <p className="text-muted-foreground text-sm">
                    How to install and set up HextaUI in your project.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink
                  href="docs/ui/everything-by-hextaui/base-components"
                  className="lg:col-start-2"
                >
                  <ComponentIcon className="bg-primary text-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Components</p>
                  <p className="text-muted-foreground text-sm">
                    A complete set of base components projects. Copy, adapt, and
                    personalize them.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink
                  href="/docs/ui/foundation/theming"
                  className="lg:col-start-3 lg:row-start-1"
                >
                  <Palette className="bg-primary text-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Theming</p>
                  <p className="text-muted-foreground text-sm">
                    How to customize the look and feel of HextaUI components
                    using themes.
                  </p>
                </NavbarMenuLink>

                <NavbarMenuLink
                  href="/docs/ui/getting-started/roadmap"
                  className="lg:col-start-3 lg:row-start-2"
                >
                  <Kanban className="bg-primary text-primary-foreground p-1 mb-2 rounded-md" />
                  <p className="font-medium">Roadmap</p>
                  <p className="text-muted-foreground text-sm">
                    Explore the future plans and features for HextaUI.
                  </p>
                </NavbarMenuLink>
              </NavbarMenuContent>
            </NavbarMenu>
          ),
        },
        {
          text: "Blocks",
          url: "https://pro.hextaui.com/blocks",
          secondary: false,
        },
        {
          text: "Themes",
          url: "https://pro.hextaui.com/themes",
          secondary: false,
        },
        {
          type: "custom",
          children: (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="secondary" className="rounded-full" asChild>
                    <Link
                      href="https://shadcnblocks.com/?ref=hextaui"
                      className="font-medium"
                    >
                      <Image
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/images/logo/shadcnblocks-logo.svg"
                        alt="shadcnblocks.com"
                        width={17}
                        height={17}
                      />
                      shadcnblocks.com
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>600+ ready made shadcn blocks</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
          secondary: true,
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}

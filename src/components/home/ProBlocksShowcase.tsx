import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Sparkles,
  Lock,
  Zap,
  Crown,
  Star,
  Clock,
} from "lucide-react";

import { DashboardBlock } from "../blocks/Dashboard";
import { TimeSelectionBlock } from "../blocks/TimeSelection";
import {
  BasicTimeSelectionExample,
  DisabledQuickSelectExample,
} from "../blocks/TimeSelection/TimeSelectionExamples";
import { TeamInviteBlock } from "../blocks/TeamInvite";

const ProBlocksShowcase = () => {
  const proBlocks = [
    {
      category: "Authentication",
      title: "Login & Signup",
      description:
        "Complete auth flows with social login, password reset, and validation.",
      preview: (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 p-4 rounded-lg h-36 flex items-center justify-center">
          <div className="space-y-2 w-full max-w-xs">
            <div className="h-2 bg-blue-200 dark:bg-blue-800 rounded w-1/3"></div>
            <div className="h-8 bg-white dark:bg-gray-800 rounded border"></div>
            <div className="h-8 bg-white dark:bg-gray-800 rounded border"></div>
            <div className="h-6 bg-blue-500 rounded w-full"></div>
          </div>
        </div>
      ),
    },
    {
      category: "Dashboard",
      title: "Analytics Dashboard",
      description:
        "Modern dashboard with charts, metrics, and real-time data visualization.",
      preview: (
        <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/20 dark:to-pink-950/20 p-4 rounded-lg h-36 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="h-12 bg-white dark:bg-gray-800 rounded border flex items-end p-1">
              <div className="bg-purple-500 h-8 w-2 rounded mr-1"></div>
              <div className="bg-purple-300 h-6 w-2 rounded mr-1"></div>
              <div className="bg-purple-500 h-10 w-2 rounded"></div>
            </div>
            <div className="h-12 bg-white dark:bg-gray-800 rounded border p-2">
              <div className="h-1 bg-purple-200 dark:bg-purple-800 rounded w-full mb-1"></div>
              <div className="h-1 bg-purple-200 dark:bg-purple-800 rounded w-2/3"></div>
            </div>
            <div className="col-span-2 h-4 bg-white dark:bg-gray-800 rounded border"></div>
          </div>
        </div>
      ),
    },
    {
      category: "E-commerce",
      title: "Product Cards",
      description:
        "Beautiful product showcases with cart, wishlist, and quick view features.",
      preview: (
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-950/20 p-4 rounded-lg h-36 flex items-center justify-center">
          <div className="space-y-2 w-full">
            <div className="h-16 bg-white dark:bg-gray-800 rounded border"></div>
            <div className="flex justify-between items-center">
              <div className="h-2 bg-green-200 dark:bg-green-800 rounded w-1/2"></div>
              <div className="h-4 bg-green-500 rounded w-8"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      category: "Landing Page",
      title: "Hero Sections",
      description:
        "Conversion-optimized hero sections with CTAs and social proof.",
      preview: (
        <div className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950/20 dark:to-red-950/20 p-4 rounded-lg h-36 flex items-center justify-center">
          <div className="space-y-2 w-full text-center">
            <div className="h-2 bg-orange-200 dark:bg-orange-800 rounded w-3/4 mx-auto"></div>
            <div className="h-1 bg-orange-200 dark:bg-orange-800 rounded w-1/2 mx-auto"></div>
            <div className="flex gap-1 justify-center mt-2">
              <div className="h-4 bg-orange-500 rounded w-12"></div>
              <div className="h-4 bg-white dark:bg-gray-800 border rounded w-12"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      category: "Forms",
      title: "Contact Forms",
      description:
        "Multi-step forms with validation, file uploads, and success states.",
      preview: (
        <div className="bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-950/20 dark:to-cyan-950/20 p-4 rounded-lg h-36 flex items-center justify-center">
          <div className="space-y-1 w-full">
            <div className="h-6 bg-white dark:bg-gray-800 rounded border"></div>
            <div className="h-6 bg-white dark:bg-gray-800 rounded border"></div>
            <div className="h-12 bg-white dark:bg-gray-800 rounded border"></div>
            <div className="h-4 bg-teal-500 rounded w-1/3"></div>
          </div>
        </div>
      ),
    },
    {
      category: "Navigation",
      title: "Sidebars & Menus",
      description:
        "Responsive navigation with collapsible menus and user profiles.",
      preview: (
        <div className="bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-950/20 dark:to-purple-950/20 p-4 rounded-lg h-36 flex items-center justify-center">
          <div className="flex gap-2 w-full h-full">
            <div className="w-8 bg-white dark:bg-gray-800 rounded border space-y-1 p-1">
              <div className="h-2 bg-violet-200 dark:bg-violet-800 rounded"></div>
              <div className="h-1 bg-violet-200 dark:bg-violet-800 rounded"></div>
              <div className="h-1 bg-violet-200 dark:bg-violet-800 rounded"></div>
            </div>
            <div className="flex-1 bg-white dark:bg-gray-800 rounded border"></div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-16 py-28 px-8 text-center w-full border-t">
        <div className="flex items-center justify-center gap-6 flex-col">
          <Badge variant="secondary">
            <Crown className="w-3 h-3" />
            Pro Blocks
          </Badge>
          <h2 className="text-4xl font-medium">
            Ready-made blocks for faster development
          </h2>
          <p className="max-w-2xl mx-auto max-sm:text-sm text-muted-foreground">
            Professional blocks and templates to build modern web applications
            in minutes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
          {proBlocks.map((block, index) => (
            <Card
              key={index}
              className="relative overflow-hidden group transition-all duration-200"
            >
              <div className="absolute top-3 right-3 z-10 flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  <Lock className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              </div>

              <div className="p-6 space-y-4">
                <div className="text-left space-y-2">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                    {block.category}
                  </div>
                  <h3 className="font-medium text-lg">{block.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {block.description}
                  </p>
                </div>

                <div className="relative">
                  {block.preview}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="mx-auto w-full flex flex-col gap-6 relative not-prose text-left">
          <div className="columns-1 md:columns-2 gap-6 space-y-6 overflow-hidden relative">
            <div className="break-inside-avoid mb-6 not-prose text-left p-0">
              <TimeSelectionBlock />
            </div>

            <div className="break-inside-avoid mb-6 not-prose text-left p-0">
              <BasicTimeSelectionExample />
            </div>

            <div className="break-inside-avoid mb-6 not-prose text-left p-0">
              <DisabledQuickSelectExample />
            </div>

            <div className="break-inside-avoid mb-6 not-prose text-left p-0">
              <TeamInviteBlock />
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background dark:from-background to-transparent pointer-events-none"></div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button className="grow" asChild>
              <a
                href="https://pro.hextaui.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                View Pro Blocks
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button className="grow" asChild variant="outline">
              <a
                href="https://pro.hextaui.com/#pricing"
                target="_blank"
                rel="noopener noreferrer"
              >
                See Pricing
              </a>
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Skip the design phase and ship your product faster with
          production-ready blocks.
        </p>
      </section>
    </>
  );
};

export default ProBlocksShowcase;

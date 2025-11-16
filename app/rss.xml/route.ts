import { generateRegistryRssFeed } from "@wandry/analytics-sdk";
import type { NextRequest } from "next/server";

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const baseUrl = new URL(request.url).origin;

  const rssXml = await generateRegistryRssFeed({
    baseUrl,
    rss: {
      title: "HextaUI Component Registry",
      description:
        "Latest components and blocks from HextaUI - Extended components & blocks built on top of shadcn/ui",
      link: "https://www.hextaui.com",
      endpoint: "/rss.xml",
      pubDateStrategy: "githubLastEdit",
    },
    registry: {
      path: "registry.json",
    },
    github: {
      owner: "preetsuthar17",
      repo: "hextaui",
      token: process.env.GITHUB_TOKEN,
      sha: "master",
    },
  });

  if (!rssXml) {
    return new Response("RSS feed not available", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

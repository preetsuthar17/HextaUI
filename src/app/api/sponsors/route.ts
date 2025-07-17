import { NextResponse } from "next/server";

export async function GET() {
  const GITHUB_TOKEN = process.env.GITHUB_AUTH;
  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: "Missing GitHub token" },
      { status: 500 },
    );
  }

  const query = `
    query SponsorQuery {
      user(login: "preetsuthar17") {
        sponsors(first: 100) {
          edges {
            node {
              ... on User {
                id
                name
                url
                avatarUrl
              }
              ... on Organization {
                id
                name
                url
                avatarUrl
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch sponsors" },
      { status: 500 },
    );
  }

  const data = await response.json();
  const sponsors =
    data?.data?.user?.sponsors?.edges?.map((edge: any) => ({
      name: edge.node.name ?? "",
      url: edge.node.url ?? "",
      logo: edge.node.avatarUrl ?? "",
      alt: edge.node.name ?? "Sponsor",
    })) ?? [];

  return NextResponse.json({ sponsors });
}

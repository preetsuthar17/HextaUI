"use client";

import { ScrollArea } from "../scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ScrollAreaBasic() {
  return (
    <div className="w-full max-w-sm">
      <ScrollArea className="h-72 w-full rounded-md border border-border p-4">
        <div className="space-y-4">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="text-sm text-foreground p-2 rounded bg-accent"
            >
              Item {i + 1}: This is a scrollable item with some content
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export function ScrollAreaVertical() {
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`,
  );

  return (
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
          <CardDescription>
            A list of tags in vertical scroll area
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-72 px-4 pb-4">
            <div className="space-y-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="text-sm text-foreground p-3 rounded-md bg-accent hover:bg-accent/80 transition-colors"
                >
                  {tag}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export function ScrollAreaHorizontal() {
  const artworks = [
    { artist: "Vincent van Gogh", art: "The Starry Night" },
    { artist: "Leonardo da Vinci", art: "Mona Lisa" },
    { artist: "Pablo Picasso", art: "Guernica" },
    { artist: "Salvador Dalí", art: "The Persistence of Memory" },
    { artist: "Claude Monet", art: "Water Lilies" },
    { artist: "Edvard Munch", art: "The Scream" },
    { artist: "Johannes Vermeer", art: "Girl with a Pearl Earring" },
    { artist: "Michelangelo", art: "The Creation of Adam" },
    { artist: "Jackson Pollock", art: "No. 1, 1950" },
    { artist: "Grant Wood", art: "American Gothic" },
  ];

  return (
    <div className="w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Artwork Collection</CardTitle>
          <CardDescription>
            A horizontal scrolling gallery of famous artworks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea
            orientation="horizontal"
            className="w-full whitespace-nowrap rounded-md border border-border"
          >
            <div className="flex w-max space-x-4 p-4">
              {artworks.map((artwork) => (
                <figure key={artwork.art} className="shrink-0">
                  <div className="overflow-hidden rounded-md">
                    <div className="h-[150px] w-[200px] bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center">
                      <span className="text-xs text-muted-foreground text-center p-2">
                        {artwork.art}
                      </span>
                    </div>
                  </div>
                  <figcaption className="pt-2 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {artwork.artist}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export function ScrollAreaBoth() {
  return (
    <div className="w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Data Table</CardTitle>
          <CardDescription>
            A table with both vertical and horizontal scrolling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea
            orientation="both"
            className="h-72 w-full rounded-md border border-border"
          >
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 font-medium text-foreground min-w-[150px]">
                      Name
                    </th>
                    <th className="text-left p-2 font-medium text-foreground min-w-[150px]">
                      Email
                    </th>
                    <th className="text-left p-2 font-medium text-foreground min-w-[150px]">
                      Role
                    </th>
                    <th className="text-left p-2 font-medium text-foreground min-w-[150px]">
                      Department
                    </th>
                    <th className="text-left p-2 font-medium text-foreground min-w-[150px]">
                      Status
                    </th>
                    <th className="text-left p-2 font-medium text-foreground min-w-[150px]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 100 }).map((_, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="p-2 text-sm text-foreground">
                        User {i + 1}
                      </td>
                      <td className="p-2 text-sm text-muted-foreground">
                        user{i + 1}@example.com
                      </td>
                      <td className="p-2 text-sm text-foreground">
                        {i % 3 === 0
                          ? "Admin"
                          : i % 2 === 0
                            ? "Editor"
                            : "Viewer"}
                      </td>
                      <td className="p-2 text-sm text-foreground">
                        {i % 4 === 0
                          ? "Engineering"
                          : i % 3 === 0
                            ? "Design"
                            : i % 2 === 0
                              ? "Marketing"
                              : "Sales"}
                      </td>
                      <td className="p-2">
                        <Badge
                          variant={i % 2 === 0 ? "default" : "secondary"}
                          size="sm"
                        >
                          {i % 2 === 0 ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="p-2 text-sm">
                        <button className="text-primary hover:underline">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export function ScrollAreaTypes() {
  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Always Visible</CardTitle>
            <CardDescription className="text-xs">
              Scrollbar is always visible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea
              type="always"
              className="h-48 w-full rounded-md border border-border p-4"
            >
              <div className="space-y-2">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="text-sm text-foreground p-2 rounded bg-accent"
                  >
                    Always visible item {i + 1}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Auto Hide</CardTitle>
            <CardDescription className="text-xs">
              Scrollbar appears only when needed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea
              type="auto"
              className="h-48 w-full rounded-md border border-border p-4"
            >
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="text-sm text-foreground p-2 rounded bg-accent"
                  >
                    Auto hide item {i + 1}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">On Scroll</CardTitle>
            <CardDescription className="text-xs">
              Scrollbar appears when scrolling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea
              type="scroll"
              className="h-48 w-full rounded-md border border-border p-4"
            >
              <div className="space-y-2">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="text-sm text-foreground p-2 rounded bg-accent"
                  >
                    On scroll item {i + 1}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">On Hover</CardTitle>
            <CardDescription className="text-xs">
              Scrollbar appears on hover (default)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea
              type="hover"
              className="h-48 w-full rounded-md border border-border p-4"
            >
              <div className="space-y-2">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="text-sm text-foreground p-2 rounded bg-accent"
                  >
                    On hover item {i + 1}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function ScrollAreaAlways() {
  return (
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Always Visible</CardTitle>
          <CardDescription className="text-xs">
            Scrollbar is always visible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea
            type="always"
            className="h-48 w-full rounded-md border border-border p-4"
          >
            <div className="space-y-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="text-sm text-foreground p-2 rounded bg-accent"
                >
                  Always visible item {i + 1}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export function ScrollAreaAuto() {
  return (
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Auto Hide</CardTitle>
          <CardDescription className="text-xs">
            Scrollbar appears only when needed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea
            type="auto"
            className="h-48 w-full rounded-md border border-border p-4"
          >
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="text-sm text-foreground p-2 rounded bg-accent"
                >
                  Auto hide item {i + 1} (No scrollbar needed)
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export function ScrollAreaScroll() {
  return (
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">On Scroll</CardTitle>
          <CardDescription className="text-xs">
            Scrollbar appears when scrolling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea
            type="scroll"
            className="h-48 w-full rounded-md border border-border p-4"
          >
            <div className="space-y-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="text-sm text-foreground p-2 rounded bg-accent"
                >
                  On scroll item {i + 1}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export function ScrollAreaHover() {
  return (
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">On Hover (Default)</CardTitle>
          <CardDescription className="text-xs">
            Scrollbar appears on hover
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea
            type="hover"
            className="h-48 w-full rounded-md border border-border p-4"
          >
            <div className="space-y-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="text-sm text-foreground p-2 rounded bg-accent"
                >
                  On hover item {i + 1}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

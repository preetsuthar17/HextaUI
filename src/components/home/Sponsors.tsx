"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const sponsors = [
  {
    name: "Shadcn blocks",
    url: "https://shadcnblocks.com",
    logo: "https://shadcnblocks.com/favicon.ico",
    alt: "Shadcn blocks Logo",
  },
];

const Sponsors = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-16 py-28 px-8 text-center w-full border-t">
      <div className="flex items-center justify-center gap-6 flex-col">
        <Badge variant="secondary" className="px-4 py-2">
          Sponsors
        </Badge>
        <h2 className="text-4xl font-medium">Our Sponsors</h2>
        <p className="max-w-2xl mx-auto max-sm:text-sm text-muted-foreground">
          Thanks to our amazing sponsors for supporting HextaUI.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl w-full items-center justify-center">
        {sponsors.map((sponsor, idx) => (
          <a
            key={idx}
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 border border-border rounded-ele transition-all duration-200 group hover:bg-accent flex flex-col items-center justify-center"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.alt}
              className="h-12 w-auto object-contain mb-2"
              style={{ maxWidth: 120 }}
            />
            <span className="font-medium text-lg text-foreground">
              {sponsor.name}
            </span>
          </a>
        ))}
      </div>
      <p className="text-sm text-muted-foreground mx-auto flex gap-1 flex-wrap items-center justify-center">
        If you want to support HextaUI,
        <a
          href="https://github.com/sponsors/preetsuthar17"
          className="underline hover:no-underline"
          onClick={() => {
            if (typeof window !== "undefined" && window?.datafast) {
              window.datafast("shadcnblocks_clicked_sponsor_from_sponsors");
            }
          }}
        >
          Sponsor us on Github
        </a>
        or
        <a
          href="mailto:hi@preetsuthar.me"
          className="underline hover:no-underline"
        >
          Send a mail
        </a>
      </p>
    </section>
  );
};

export default Sponsors;

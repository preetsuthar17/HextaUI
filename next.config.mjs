import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: false,
  images: {
    domains: ["i.imgur.com"],
  },
};

export default withMDX(config);

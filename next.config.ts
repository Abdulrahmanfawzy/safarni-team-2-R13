import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "swiperjs.com",
        port: "",
        pathname: "/demos/images/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "safarni-round-13.huma-volve.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "thumb.wikimedia.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**",
      },
    ],
  },

  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  serverExternalPackages: ["@react-pdf/renderer"],
  turbopack: {
    resolveAlias: {
      "media-engine": "./node_modules/media-engine/dist/index.js",
    },
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;


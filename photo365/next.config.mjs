import withPlaiceholder from "@plaiceholder/next";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",  // Build as standalone

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Matches any domain (use cautiously)
      },
    ],
    unoptimized: true, // Bypass Next.js optimization
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      tslib: path.resolve(process.cwd(), "node_modules/tslib"),
    };
    return config;
  },
};

export default withPlaiceholder(nextConfig);

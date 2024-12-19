import withPlaiceholder from "@plaiceholder/next";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  images: {
    domains: [
      "images.ctfassets.net",
      "downloads.ctfassets.net",
      "images.pexels.com",
    ],
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

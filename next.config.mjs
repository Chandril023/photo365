import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  output: 'standalone',

  images: {
    domains: ['images.ctfassets.net','downloads.ctfassets.net','images.pexels.com']
    
  },
}

export default withPlaiceholder(nextConfig);
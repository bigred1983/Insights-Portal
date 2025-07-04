/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ New: enables static export for Pagefind
  images: {
    domains: ['images.ctfassets.net'], // ✅ Allows Contentful images
  },
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  },
  reactStrictMode: true,
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.ctfassets.net"], // ✅ Allows Contentful images
    formats: ["image/avif", "image/webp"], // ✅ Enables modern formats for faster loading
  },
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  },
  output: "standalone", // ✅ Ensures proper Netlify build behavior
  reactStrictMode: true, // ✅ Helps catch potential errors
};

export default nextConfig;

  
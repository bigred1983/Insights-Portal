/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.ctfassets.net'], // ✅ Ensures Contentful images load correctly
  },
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  },
  reactStrictMode: true,
  trailingSlash: false, // ❌ Disable this if it was previously enabled
  output: "export", // ✅ Forces Next.js to pre-build static pages
};

export default nextConfig;
  
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add your actual domain to the list of allowed domains for images
  images: {
    domains: ['localhost', 'lowperry.com'],
    unoptimized: true,
  },
  // Make sure environment variables are properly exposed
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://lowperry.com',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

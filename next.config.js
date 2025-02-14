/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "https://fhutkachtosudtzqjzau.supabase.co"],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false }
    return config
  },
  target: "serverless",
}

module.exports = nextConfig



/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;

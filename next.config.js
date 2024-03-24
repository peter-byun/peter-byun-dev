/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    nextScriptWorkers: true,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    STRAPI_URL: process.env.STRAPI_URL || 'https://radial-programs.onrender.com',
  },
  turbopack: {
    root: __dirname,
  },
}

module.exports = nextConfig
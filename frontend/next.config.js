/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    STRAPI_URL: process.env.STRAPI_URL || 'http://localhost:1337',
  },
  turbopack: {
    root: __dirname,
  },
}

module.exports = nextConfig
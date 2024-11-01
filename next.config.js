/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.midjourney.com', 'i.imgur.com', 'www.iconpacks.net'],
  },
}

module.exports = nextConfig

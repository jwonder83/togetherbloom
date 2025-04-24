/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: '/community-growth-app',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'robohash.org',
        pathname: '**',
      },
    ],
    domains: ['i.pravatar.cc', 'robohash.org', 'images.unsplash.com'],
    unoptimized: true,
  }
}

module.exports = nextConfig 
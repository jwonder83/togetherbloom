/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'robohash.org',
        pathname: '**',
      },
    ],
    domains: ['i.pravatar.cc', 'robohash.org', 'images.unsplash.com'],
  }
}

module.exports = nextConfig 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: '.next',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'robohash.org',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '**',
      },
    ],
    unoptimized: true
  },
  // 명시적으로 정적 생성에서 제외할 경로를 지정
  // 이렇게 하면 generateStaticParams()가 없는 동적 라우트도 허용됨
  experimental: {
    disableStaticExport: true,
  }
}

module.exports = nextConfig 
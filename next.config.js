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
    unoptimized: true // GitHub Pages에서 이미지 최적화 관련 문제 해결
  },
  // GitHub Pages 배포를 위한 설정
  output: 'export',
  // 'out' 디렉토리는 기본값이므로 명시적으로 지정하지 않아도 됩니다
  // distDir: 'out',
  basePath: process.env.NODE_ENV === 'production' ? '/togethebloom' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/togethebloom/' : '',
  trailingSlash: true
}

module.exports = nextConfig 
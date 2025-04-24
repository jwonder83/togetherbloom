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
    ],
    unoptimized: true // GitHub Pages에서 이미지 최적화 관련 문제 해결
  },
  // 개발 모드에서는 정적 내보내기 비활성화
  output: undefined,
  // GitHub Pages 배포를 위한 설정 - 프로덕션에서만 적용
  ...(process.env.NODE_ENV === 'production' ? {
    basePath: '/togethebloom',
    assetPrefix: '/togethebloom/',
    trailingSlash: true,
  } : {})
}

module.exports = nextConfig 
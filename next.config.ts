import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    // 기존 규칙을 변경하지 않도록 파일 처리 규칙의 복사본 생성
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))

    // 기존 SVG 규칙을 제외시킴
    config.module.rules.push({
      ...fileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: { not: [/svgr/] }, // svgr 쿼리가 없는 파일만 적용
    })

    // SVGR 규칙 추가
    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /svgr/, // svgr 쿼리가 있는 파일만 적용
      use: ['@svgr/webpack'],
    })

    return config
  },
  reactStrictMode: true,
  images: {
    domains: [
      'shopping-phinf.pstatic.net',
      'encrypted-tbn0.gstatic.com',
      'encrypted-tbn0.gstatic.net',
    ],
  },
}

export default nextConfig

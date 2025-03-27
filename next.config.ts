import type { NextConfig } from 'next'
import type { Configuration, RuleSetRule } from 'webpack'

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config: Configuration) => {
    const rules = config.module?.rules as RuleSetRule[] | undefined // module이 있을 경우에만 rules를 가져옴

    if (!rules) return config // rules가 없으면 그대로 반환

    // 기존 규칙을 변경하지 않도록 파일 처리 규칙의 복사본 생성
    const fileLoaderRule = rules.find(
      (rule): rule is RuleSetRule =>
        typeof rule === 'object' && rule.test instanceof RegExp && rule.test.test('.svg'),
    )

    // 기존 SVG 규칙을 제외시킴
    rules.push({
      ...fileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: { not: [/svgr/] }, // svgr 쿼리가 없는 파일만 적용
    })

    // SVGR 규칙 추가
    rules.push({
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
      'thumbnail9.coupangcdn.com',
      'i.pinimg.com',
    ],
  },
}

export default nextConfig

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  reactStrictMode: true,
  images: {
    domains: ['shopping-phinf.pstatic.net', 'encrypted-tbn0.gstatic.com'],
  },
}

export default nextConfig

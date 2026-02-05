import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // パフォーマンス最適化
  compress: true,
  poweredByHeader: false,
  // 実験的機能
  experimental: {
    // CSS最適化
    optimizeCss: true,
  },
};

export default nextConfig;

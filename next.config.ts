import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // パフォーマンス最適化
  compress: true,
  poweredByHeader: false,
  /*
   * セキュリティヘッダー:
   * output: 'export' では next.config.ts の headers は適用されないため、
   * CloudFront のレスポンスヘッダーポリシーで以下を設定してください:
   *   - X-Content-Type-Options: nosniff
   *   - X-Frame-Options: DENY
   *   - X-XSS-Protection: 1; mode=block
   *   - Referrer-Policy: strict-origin-when-cross-origin
   *   - Permissions-Policy: camera=(), microphone=(), geolocation=()
   */
  // 実験的機能
  experimental: {
    // CSS最適化
    optimizeCss: true,
  },
};

export default withAnalyzer(nextConfig);

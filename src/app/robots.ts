import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

// 静的書き出し（output: 'export'）に必要な設定
export const dynamic = 'force-static';

/**
 * robots.txt を自動生成
 * ビルド時に /robots.txt として出力される
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { siteConfig } from '@/config/site';

// 静的書き出し（output: 'export'）に必要な設定
export const dynamic = 'force-static';

/**
 * sitemap.xml を自動生成
 * ビルド時に /sitemap.xml として出力される
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // 最新のプロジェクト更新日を取得（プロジェクト一覧ページの lastModified に使用）
  const latestProjectDate = projects.reduce((latest, p) => {
    const date = p.updatedAt || p.createdAt;
    return date && date > latest ? date : latest;
  }, '2024-01-01');

  // 静的ページ
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(latestProjectDate),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(latestProjectDate),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // プロジェクト詳細ページ（動的に生成）
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages];
}

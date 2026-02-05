import type { Metadata } from 'next';
import { ProjectsPageClient } from '@/components/projects/ProjectsPageClient';
import { siteConfig, absoluteUrl } from '@/config/site';

/**
 * 制作物一覧ページのMetadata
 * layout.tsx のテンプレート「%s | サイト名」が適用される
 */
export const metadata: Metadata = {
  title: '制作物ギャラリー',
  description:
    '個人開発や業務を通じて取り組んできたプロジェクトを、技術的な観点から整理して掲載。Next.js、C#/.NET、TypeScript などの制作物一覧。',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: '制作物ギャラリー',
    description:
      '個人開発や業務を通じて取り組んできたプロジェクトを、技術的な観点から整理して掲載。',
    url: absoluteUrl('/projects'),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: '制作物ギャラリー',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '制作物ギャラリー',
    description:
      '個人開発や業務を通じて取り組んできたプロジェクトを、技術的な観点から整理して掲載。',
    images: [absoluteUrl(siteConfig.ogImage)],
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}

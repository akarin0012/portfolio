import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { siteConfig, absoluteUrl } from '@/config/site';
import { projects } from '@/data/projects';

// Framer Motionを含むコンポーネントを遅延読み込み
const ProjectsPageClient = dynamic(
  () => import('@/components/projects/ProjectsPageClient').then((mod) => mod.ProjectsPageClient),
  {
    loading: () => (
      <div className="min-h-screen bg-zinc-900 text-zinc-50">
        <main className="container mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
          {/* ヘッダー スケルトン */}
          <div className="mb-8 space-y-3 md:mb-10">
            <div className="h-4 w-16 animate-pulse rounded bg-zinc-800" />
            <div className="h-9 w-48 animate-pulse rounded bg-zinc-800" />
            <div className="h-5 w-96 max-w-full animate-pulse rounded bg-zinc-800" />
          </div>
          {/* フィルター スケルトン */}
          <div className="mb-6 h-24 animate-pulse rounded-xl border border-zinc-800/80 bg-zinc-900/70" />
          {/* グリッド スケルトン */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-lg border border-zinc-800 bg-zinc-800/50" />
            ))}
          </div>
        </main>
      </div>
    ),
  },
);

/**
 * 制作物一覧ページの JSON-LD 構造化データ
 * CollectionPage + ItemList でプロジェクト一覧を構造化
 */
function ProjectsJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '制作物ギャラリー',
    description:
      '個人開発や業務を通じて取り組んできたプロジェクトを、技術的な観点から整理して掲載。',
    url: absoluteUrl('/projects'),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.title,
        description: project.summary,
        url: absoluteUrl(`/projects/${project.id}`),
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

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
  return (
    <>
      <ProjectsJsonLd />
      <ProjectsPageClient />
    </>
  );
}

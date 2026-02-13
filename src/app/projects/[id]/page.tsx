import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects, type Project } from '@/data/projects';
import { ProjectDetailContent } from '@/components/projects/ProjectDetailContent';
import { Breadcrumb } from '@/components/Breadcrumb';
import { siteConfig, absoluteUrl } from '@/config/site';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * 動的にMetadataを生成
 * プロジェクトのタイトルと概要を元に、各詳細ページのOGPを設定
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return {
      title: 'プロジェクトが見つかりません',
    };
  }

  const title = project.title;
  const description = project.summary;
  const url = absoluteUrl(`/projects/${project.id}`);

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${project.id}`,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'article',
      publishedTime: project.createdAt,
      modifiedTime: project.updatedAt,
      authors: [siteConfig.author.name],
      // OGP画像は opengraph-image.tsx から自動生成される
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      // Twitter画像は opengraph-image.tsx から自動生成される
    },
  };
}

/**
 * プロジェクト詳細ページの JSON-LD 構造化データ
 * CreativeWork スキーマでプロジェクト情報を構造化
 */
function ProjectJsonLd({ project }: { project: Project }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.id}`),
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    ...(project.createdAt && { dateCreated: project.createdAt }),
    ...(project.updatedAt && { dateModified: project.updatedAt }),
    ...(project.repoUrl && { codeRepository: project.repoUrl }),
    ...(project.demoUrl && { sameAs: project.demoUrl }),
    programmingLanguage: project.primaryLanguage,
    keywords: project.tags.join(', '),
    genre: project.category,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectJsonLd project={project} />
      <div className="min-h-screen bg-surface text-foreground">
        <main className="container mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
          <Breadcrumb
            items={[
              { label: '制作物ギャラリー', href: '/projects' },
              { label: project.title },
            ]}
          />
          <ProjectDetailContent project={project} />
        </main>
      </div>
    </>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

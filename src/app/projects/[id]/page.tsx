import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
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

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-50">
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
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

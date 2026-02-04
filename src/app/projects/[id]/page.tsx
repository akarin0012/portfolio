import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { ProjectDetailHeader } from '@/components/projects/ProjectDetailHeader';
import { ProjectContentSection } from '@/components/projects/ProjectContentSection';
import { ProjectMermaidDiagram } from '@/components/projects/ProjectMermaidDiagram';
import { ProjectLiveDemo } from '@/components/projects/ProjectLiveDemo';
import { ProjectDetailContent } from '@/components/projects/ProjectDetailContent';

type Props = {
  params: {
    id: string;
  };
};

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-50">
      <main className="container mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
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


import type { Project } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

type Props = {
  projects: Project[];
};

export function ProjectGrid({ projects }: Props) {
  if (projects.length === 0) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-dashed border-divider/80 bg-surface-inset/60 p-8 text-center text-sm text-muted"
      >
        条件に合致する制作物がありません。フィルター条件を変更してみてください。
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

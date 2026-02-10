import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '@/data/projects';
import { ProjectTechBadges } from './ProjectTechBadges';

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  const href = `/projects/${project.id}`;

  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-divider-subtle/80 bg-surface/70 shadow-sm ring-1 ring-divider-subtle/40 backdrop-blur"
    >
      {project.thumbnailUrl && (
        <div className="relative h-40 w-full overflow-hidden bg-surface/80">
          <Image
            src={project.thumbnailUrl}
            alt={`${project.title}のサムネイル画像`}
            width={400}
            height={160}
            loading="lazy"
            className="h-full w-full object-cover opacity-80 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
          />
          {project.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-xs font-semibold text-emerald-950">
              Featured
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-heading">
              <Link href={href} className="inline-flex items-center gap-1" aria-label={`${project.title}の詳細を見る`}>
                <span className="transition-colors group-hover:text-accent">
                  {project.title}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </Link>
            </h3>
            <p className="mt-1 line-clamp-2 text-xs text-caption">
              {project.summary}
            </p>
          </div>
        </div>

        <ProjectTechBadges
          primaryLanguage={project.primaryLanguage}
          techStack={project.techStack}
        />

        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-alt/80 px-2 py-0.5 text-xs text-caption"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="rounded-full bg-surface-alt/80 px-2 py-0.5 text-xs text-muted">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title}のGitHubリポジトリを開く（新しいタブ）`}
              className="inline-flex items-center gap-1 text-xs text-caption transition-colors hover:text-heading"
            >
              <Github className="h-3.5 w-3.5" />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

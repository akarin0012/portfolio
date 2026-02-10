'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/data/projects';
import { ProjectTechBadges } from './ProjectTechBadges';

type Props = {
  project: Project;
};

export function ProjectDetailHeader({ project }: Props) {
  return (
    <header className="mb-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between gap-4"
      >
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">
            Project
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-sm text-caption md:text-base">
            {project.summary}
          </p>
        </div>

        <Link
          href="/projects"
          className="hidden items-center gap-2 rounded-full border border-divider/80 bg-surface/70 px-3 py-1.5 text-xs text-body transition-colors hover:border-muted hover:text-foreground md:inline-flex"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          一覧に戻る
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-4 rounded-xl border border-divider-subtle/80 bg-surface/60 p-4 ring-1 ring-divider-subtle/40 backdrop-blur md:flex-row md:items-center md:justify-between"
      >
        <div className="space-y-2">
          <ProjectTechBadges
            primaryLanguage={project.primaryLanguage}
            techStack={project.techStack}
          />
          <div className="flex flex-wrap gap-1.5 text-xs text-muted">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-alt/80 px-2 py-0.5 text-xs text-caption"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title}のGitHubリポジトリを開く（新しいタブ）`}
              className="inline-flex items-center gap-1.5 rounded-full border border-divider bg-surface-alt px-3 py-1.5 text-xs font-medium text-heading shadow-sm transition hover:bg-surface-deep"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title}のLive Demoを開く（新しいタブ）`}
              className="inline-flex items-center gap-1.5 rounded-full border border-divider/80 bg-surface/70 px-3 py-1.5 text-xs font-medium text-subheading transition hover:border-accent/60 hover:text-accent"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </motion.div>
    </header>
  );
}

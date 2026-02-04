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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400/80">
            Project
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-sm text-zinc-400 md:text-base">
            {project.summary}
          </p>
        </div>

        <Link
          href="/projects"
          className="hidden items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-50 md:inline-flex"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          一覧に戻る
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-4 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-4 ring-1 ring-zinc-800/40 backdrop-blur md:flex-row md:items-center md:justify-between"
      >
        <div className="space-y-2">
          <ProjectTechBadges
            primaryLanguage={project.primaryLanguage}
            techStack={project.techStack}
          />
          <div className="flex flex-wrap gap-1.5 text-[11px] text-zinc-500">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-800/80 px-2 py-0.5 text-[10px] text-zinc-400"
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
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-900 transition hover:bg-zinc-200"
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
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700/80 bg-zinc-900/70 px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:border-blue-500/60 hover:text-blue-100"
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


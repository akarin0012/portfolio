'use client';

import { motion, MotionConfig } from 'framer-motion';
import type { Project } from '@/data/projects';
import { ProjectDetailHeader } from './ProjectDetailHeader';
import { ProjectContentSection } from './ProjectContentSection';
import { ProjectMermaidDiagram } from './ProjectMermaidDiagram';
import { ProjectLiveDemo } from './ProjectLiveDemo';
import { ProjectShareButtons } from './ProjectShareButtons';

type Props = {
  project: Project;
};

export function ProjectDetailContent({ project }: Props) {
  return (
    <MotionConfig reducedMotion="user">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      <ProjectDetailHeader project={project} />

      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
        <div className="space-y-4">
          <ProjectContentSection title="概要">
            <p>{project.description}</p>
          </ProjectContentSection>

          {project.challenges && (
            <ProjectContentSection title="苦労した点・工夫した点">
              <p>{project.challenges}</p>
            </ProjectContentSection>
          )}

          {project.learnings && (
            <ProjectContentSection title="得られた学び・振り返り">
              <p>{project.learnings}</p>
            </ProjectContentSection>
          )}
        </div>

        <div className="space-y-4">
          <ProjectLiveDemo
            type={project.liveDemoType}
            demoUrl={project.demoUrl}
          />
          <ProjectMermaidDiagram diagram={project.mermaidDiagram} />
        </div>
      </div>
      {/* シェアボタン */}
      <div className="flex justify-end pt-2">
        <ProjectShareButtons
          projectTitle={project.title}
          projectId={project.id}
        />
      </div>
    </motion.div>
    </MotionConfig>
  );
}

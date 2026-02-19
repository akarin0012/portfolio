import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { workExperiences } from '@/data/experience';

type Props = {
  fadeInUp: Variants;
  staggerParentSlow: Variants;
  viewportOptions: { once: boolean; margin: string };
};

/** プロジェクト経験セクション */
export function ExperienceSection({ fadeInUp, staggerParentSlow, viewportOptions }: Props) {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="mb-12 md:mb-20">
      <motion.h2
        id="projects-heading"
        className="mb-6 text-3xl font-bold text-heading md:mb-8 md:text-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={fadeInUp}
      >
        主なプロジェクト経験
      </motion.h2>
      <motion.div
        className="space-y-6"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={staggerParentSlow}
      >
        {workExperiences.map((exp) => (
          <motion.div
            key={exp.projectName}
            className="rounded-lg border border-divider bg-surface-alt p-6"
            variants={fadeInUp}
          >
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
                {exp.projectName}
              </span>
              <span className="text-sm text-caption">{exp.period}</span>
              <span className="text-sm text-caption">{exp.roleInfo}</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-subheading">
              {exp.title}
            </h3>
            <p className="mb-4 text-body">{exp.description}</p>
            <div className="flex flex-wrap gap-2">
              {exp.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-surface-deep px-2 py-1 text-xs text-body"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={fadeInUp}
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-hover active:scale-95"
        >
          制作物ギャラリーを見る
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  );
}

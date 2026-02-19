import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { skillCategories, certifications } from '@/data/skills';

type Props = {
  fadeInUp: Variants;
  staggerParent: Variants;
  viewportOptions: { once: boolean; margin: string };
};

/** スキルセクション（スキルカテゴリ + 資格） */
export function SkillsSection({ fadeInUp, staggerParent, viewportOptions }: Props) {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="mb-12 md:mb-20">
      <motion.h2
        id="skills-heading"
        className="mb-6 text-3xl font-bold text-heading md:mb-8 md:text-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={fadeInUp}
      >
        スキル
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={staggerParent}
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.title}
            className="rounded-lg border border-divider bg-surface-alt p-6"
            variants={fadeInUp}
          >
            <h3 className="mb-4 flex items-center text-xl font-semibold text-subheading">
              <span
                className={cn('mr-3 h-3 w-3 rounded-full', category.dotColor)}
              />
              {category.title}
            </h3>
            <ul className="space-y-3">
              {category.skills.map((skill) => (
                <li key={skill.name} className="text-body">
                  <div className="flex items-center">
                    <span
                      className={cn('mr-3 h-2 w-2 rounded-full', category.dotColor)}
                    />
                    <span className="font-medium">{skill.name}</span>
                    <span className="ml-auto text-sm text-muted">
                      {skill.duration}
                    </span>
                  </div>
                  {skill.progress !== undefined && (
                    <div className="ml-5 mt-1.5 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-deep">
                        <div
                          className={cn('h-full rounded-full transition-all duration-500', category.dotColor)}
                          style={{ width: `${skill.progress}%` }}
                        />
                      </div>
                      <span className="text-xs tabular-nums text-muted">
                        {skill.progress}%
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* 資格 */}
      <motion.div
        className="mt-6 rounded-lg border border-divider bg-surface-alt p-6"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={fadeInUp}
      >
        <h3 className="mb-4 text-xl font-semibold text-subheading">資格</h3>
        <ul className="space-y-2">
          {certifications.map((cert) => (
            <li key={cert.name} className="flex items-center text-body">
              <span className="mr-3 h-2 w-2 rounded-full bg-muted" />
              {cert.name}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={fadeInUp}
      >
        <p className="mb-4 text-sm text-caption">
          これらのスキルを活かした制作物をご覧ください
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-divider bg-surface px-6 py-2.5 text-sm font-medium text-heading transition-all duration-300 hover:bg-surface-alt active:scale-95"
        >
          制作物ギャラリーを見る
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  );
}

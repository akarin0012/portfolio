import { motion, type Variants } from 'framer-motion';
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
                className={`mr-3 h-3 w-3 rounded-full ${category.dotColor}`}
              />
              {category.title}
            </h3>
            <ul className="space-y-3">
              {category.skills.map((skill) => (
                <li key={skill.name} className="text-body">
                  <div className="flex items-center">
                    <span
                      className={`mr-3 h-2 w-2 rounded-full ${category.dotColor}`}
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
                          className={`h-full rounded-full ${category.dotColor} transition-all duration-500`}
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
    </section>
  );
}

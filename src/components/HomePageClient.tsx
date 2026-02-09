'use client';

import { useCallback } from 'react';
import { motion, Variants, MotionConfig } from 'framer-motion';
import { skillCategories, certifications } from '@/data/skills';
import { workExperiences } from '@/data/experience';
import { siteConfig } from '@/config/site';

// 共通アニメーション設定
const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const viewportOptions = {
  once: true,
  margin: '-100px' as const,
};

const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerParentSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

/**
 * Below-fold セクション（スキル・プロジェクト・お問い合わせ）
 * ヒーローセクションはServer Componentとして page.tsx で即座にレンダリング
 */
export function HomePageClient() {
  const handleEmailClick = useCallback(() => {
    // メールアドレスをHTML上に直接公開しないためのbot対策
    const u = 'owatakbc';
    const d = 'gmail.com';
    window.location.href = `mailto:${u}@${d}`;
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {/* スキルセクション */}
      <section id="skills" className="mb-12 md:mb-20">
        <motion.h2
          className="mb-6 text-3xl font-bold text-zinc-100 md:mb-8 md:text-4xl"
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
              className="rounded-lg border border-zinc-700 bg-zinc-800 p-6"
              variants={fadeInUp}
            >
              <h3 className="mb-4 flex items-center text-xl font-semibold text-zinc-200">
                <span
                  className={`mr-3 h-3 w-3 rounded-full ${category.dotColor}`}
                />
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center text-zinc-300"
                  >
                    <span
                      className={`mr-3 h-2 w-2 rounded-full ${category.dotColor}`}
                    />
                    <span className="font-medium">{skill.name}</span>
                    <span className="ml-auto text-sm text-zinc-500">
                      {skill.duration}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* 資格 */}
        <motion.div
          className="mt-6 rounded-lg border border-zinc-700 bg-zinc-800 p-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInUp}
        >
          <h3 className="mb-4 text-xl font-semibold text-zinc-200">資格</h3>
          <ul className="space-y-2">
            {certifications.map((cert) => (
              <li key={cert.name} className="flex items-center text-zinc-300">
                <span className="mr-3 h-2 w-2 rounded-full bg-zinc-500" />
                {cert.name}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* プロジェクト経験セクション */}
      <section id="projects" className="mb-12 md:mb-20">
        <motion.h2
          className="mb-6 text-3xl font-bold text-zinc-100 md:mb-8 md:text-4xl"
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
              className="rounded-lg border border-zinc-700 bg-zinc-800 p-6 transition-colors hover:border-blue-500/50"
              variants={fadeInUp}
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-400">
                  {exp.projectName}
                </span>
                <span className="text-sm text-zinc-400">{exp.period}</span>
                <span className="text-sm text-zinc-400">{exp.roleInfo}</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-zinc-200">
                {exp.title}
              </h3>
              <p className="mb-4 text-zinc-300">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* お問い合わせセクション */}
      <section id="contact" className="mb-12 md:mb-20">
        <motion.h2
          className="mb-6 text-3xl font-bold text-zinc-100 md:mb-8 md:text-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInUp}
        >
          お問い合わせ
        </motion.h2>
        <motion.div
          className="rounded-lg border border-zinc-700 bg-zinc-800 p-6 text-center md:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
        >
          <p className="mb-8 text-base text-zinc-300 md:text-lg">
            ご興味をお持ちいただけましたら、お気軽にお問い合わせください。
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            {/* GitHubボタン（黒ベース） */}
            <motion.a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-zinc-900 px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 active:scale-95"
              whileHover={{
                scale: 1.02,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </span>
            </motion.a>
            {/* メールボタン（白ベース・bot対策のためonClickで構成） */}
            <motion.button
              type="button"
              onClick={handleEmailClick}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-medium text-zinc-900 transition-all duration-300 active:scale-95"
              whileHover={{
                scale: 1.02,
                boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                お問い合わせ
              </span>
            </motion.button>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}

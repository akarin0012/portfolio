'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  projects,
  type ProjectCategory,
  type ProgrammingLanguage,
} from '@/data/projects';
import { ProjectFilterBar } from '@/components/projects/ProjectFilterBar';
import { ProjectGrid } from '@/components/projects/ProjectGrid';

/**
 * 制作物ギャラリーページのクライアントコンポーネント
 * フィルター機能などのインタラクティブな部分を担当
 */
export function ProjectsPageClient() {
  const [category, setCategory] = useState<ProjectCategory | 'all'>('all');
  const [language, setLanguage] = useState<ProgrammingLanguage | 'all'>('all');

  const availableCategories = useMemo(
    () =>
      Array.from(new Set(projects.map((p) => p.category))).sort() as ProjectCategory[],
    [],
  );

  const availableLanguages = useMemo(
    () =>
      Array.from(
        new Set(projects.map((p) => p.primaryLanguage)),
      ).sort() as ProgrammingLanguage[],
    [],
  );

  const filtered = useMemo(
    () =>
      projects
        .slice()
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
        .filter((p) => (category === 'all' ? true : p.category === category))
        .filter((p) => (language === 'all' ? true : p.primaryLanguage === language)),
    [category, language],
  );

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-50">
      <main className="container mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <header className="mb-8 space-y-3 md:mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400/80">
              Showcase
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-50 md:text-4xl">
              制作物ギャラリー
            </h1>
            <p className="max-w-2xl text-sm text-zinc-400 md:text-base">
              個人開発や業務を通じて取り組んできたプロジェクトを、技術的な観点から整理して掲載しています。
              新しい制作物を追加する際は、`src/data/projects.ts` にデータを追加するだけで自動的にカードと詳細ページが生成されます。
            </p>
          </header>

          <ProjectFilterBar
            categories={availableCategories}
            languages={availableLanguages}
            activeCategory={category}
            activeLanguage={language}
            onCategoryChange={setCategory}
            onLanguageChange={setLanguage}
          />

          <ProjectGrid projects={filtered} />
        </motion.section>
      </main>
    </div>
  );
}

'use client';

import { useCallback, useMemo, useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { Search, X } from 'lucide-react';
import {
  projects,
  type ProjectCategory,
  type ProgrammingLanguage,
} from '@/data/projects';
import { ProjectFilterBar } from '@/components/projects/ProjectFilterBar';
import { ProjectGrid } from '@/components/projects/ProjectGrid';

/**
 * 制作物ギャラリーページのクライアントコンポーネント
 * フィルター・検索機能などのインタラクティブな部分を担当
 */
export function ProjectsPageClient() {
  const [category, setCategory] = useState<ProjectCategory | 'all'>('all');
  const [language, setLanguage] = useState<ProgrammingLanguage | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return projects
      .slice()
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
      .filter((p) => (category === 'all' ? true : p.category === category))
      .filter((p) => (language === 'all' ? true : p.primaryLanguage === language))
      .filter((p) => {
        if (!query) return true;
        return (
          p.title.toLowerCase().includes(query) ||
          p.summary.toLowerCase().includes(query) ||
          p.techStack.some((t) => t.toLowerCase().includes(query)) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
        );
      });
  }, [category, language, searchQuery]);

  const handleClearAll = useCallback(() => {
    setCategory('all');
    setLanguage('all');
    setSearchQuery('');
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-surface text-foreground">
      <main id="main-content" className="container mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <header className="mb-8 space-y-3 md:mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">
              Showcase
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              制作物ギャラリー
            </h1>
            <p className="max-w-2xl text-sm text-caption md:text-base">
              個人開発や業務を通じて取り組んできたプロジェクトを、技術的な観点から整理して掲載しています。
            </p>
          </header>

          {/* 検索バー */}
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="タイトル、技術スタック、タグで検索..."
                className="w-full rounded-lg border border-divider-subtle/80 bg-surface/70 py-2.5 pl-10 pr-10 text-sm text-heading placeholder-muted ring-1 ring-divider-subtle/40 backdrop-blur transition-colors focus:border-accent/60 focus:outline-none focus:ring-accent/30"
                aria-label="プロジェクト検索"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-heading"
                  aria-label="検索をクリア"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <ProjectFilterBar
            categories={availableCategories}
            languages={availableLanguages}
            activeCategory={category}
            activeLanguage={language}
            searchQuery={searchQuery}
            onCategoryChange={setCategory}
            onLanguageChange={setLanguage}
            onClearAll={handleClearAll}
          />

          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {filtered.length}件のプロジェクトが見つかりました
          </div>
          <ProjectGrid projects={filtered} />
        </motion.section>
      </main>
    </div>
    </MotionConfig>
  );
}

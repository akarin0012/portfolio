import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { ProjectCategory, ProgrammingLanguage } from '@/data/projects';

/** カテゴリラベルの定義（三項演算子ネスト回避） */
const categoryLabels: Record<string, string> = {
  all: 'すべて',
  'web-app': 'Web App',
  library: 'Library',
  game: 'Game',
  utility: 'Utility',
  tool: 'Tool',
};

type Props = {
  categories: ProjectCategory[];
  languages: ProgrammingLanguage[];
  activeCategory: ProjectCategory | 'all';
  activeLanguage: ProgrammingLanguage | 'all';
  onCategoryChange: (value: ProjectCategory | 'all') => void;
  onLanguageChange: (value: ProgrammingLanguage | 'all') => void;
  onClearAll: () => void;
};

export function ProjectFilterBar({
  categories,
  languages,
  activeCategory,
  activeLanguage,
  onCategoryChange,
  onLanguageChange,
  onClearAll,
}: Props) {
  const hasActiveFilter = activeCategory !== 'all' || activeLanguage !== 'all';

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl border border-divider-subtle/80 bg-surface/70 p-4 shadow-sm ring-1 ring-divider-subtle/40 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          フィルター
        </p>
        <p className="text-sm text-caption">
          種別と主要言語で制作物を絞り込めます。
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 md:justify-end">
        <FilterPillGroup<ProjectCategory | 'all'>
          label="カテゴリ"
          options={['all', ...categories]}
          active={activeCategory}
          onChange={onCategoryChange}
          renderLabel={(value) => categoryLabels[value] ?? 'Other'}
        />

        <FilterPillGroup<ProgrammingLanguage | 'all'>
          label="言語"
          options={['all', ...languages]}
          active={activeLanguage}
          onChange={onLanguageChange}
          renderLabel={(value) => (value === 'all' ? 'すべて' : value)}
        />

        {/* すべてクリアボタン */}
        {hasActiveFilter && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClearAll}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-danger/40 bg-danger/10 px-3 py-1.5 text-xs font-medium text-danger transition-colors hover:border-danger/60 hover:bg-danger/20"
            aria-label="すべてのフィルターをクリア"
          >
            <X className="h-3 w-3" aria-hidden="true" />
            すべてクリア
          </motion.button>
        )}
      </div>
    </div>
  );
}

type FilterPillGroupProps<T extends string> = {
  label: string;
  options: T[];
  active: T;
  onChange: (value: T) => void;
  renderLabel: (value: T) => string;
};

function FilterPillGroup<T extends string>({
  label,
  options,
  active,
  onChange,
  renderLabel,
}: FilterPillGroupProps<T>) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-muted">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((value) => {
          const isActive = value === active;
          return (
            <motion.button
              key={value}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(value)}
              aria-label={`${label}: ${renderLabel(value)}`}
              aria-pressed={isActive}
              className={[
                'min-h-9 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                isActive
                  ? 'border-accent/80 bg-accent/10 text-accent'
                  : 'border-divider bg-surface/60 text-caption hover:border-muted hover:text-heading',
              ].join(' ')}
            >
              {renderLabel(value)}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

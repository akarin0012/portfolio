import { motion } from 'framer-motion';
import type { ProjectCategory, ProgrammingLanguage } from '@/data/projects';

type Props = {
  categories: ProjectCategory[];
  languages: ProgrammingLanguage[];
  activeCategory: ProjectCategory | 'all';
  activeLanguage: ProgrammingLanguage | 'all';
  onCategoryChange: (value: ProjectCategory | 'all') => void;
  onLanguageChange: (value: ProgrammingLanguage | 'all') => void;
};

export function ProjectFilterBar({
  categories,
  languages,
  activeCategory,
  activeLanguage,
  onCategoryChange,
  onLanguageChange,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl border border-zinc-800/80 bg-zinc-900/70 p-4 shadow-sm ring-1 ring-zinc-800/40 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          フィルター
        </p>
        <p className="text-sm text-zinc-400">
          種別と主要言語で制作物を絞り込めます。
        </p>
      </div>

      <div className="flex flex-wrap gap-3 md:justify-end">
        <FilterPillGroup<ProjectCategory | 'all'>
          label="カテゴリ"
          options={['all', ...categories]}
          active={activeCategory}
          onChange={onCategoryChange}
          renderLabel={(value) =>
            value === 'all'
              ? 'すべて'
              : value === 'web-app'
                ? 'Web App'
                : value === 'library'
                  ? 'Library'
                  : value === 'game'
                    ? 'Game'
                    : value === 'utility'
                      ? 'Utility'
                      : value === 'tool'
                        ? 'Tool'
                        : 'Other'
          }
        />

        <FilterPillGroup<ProgrammingLanguage | 'all'>
          label="言語"
          options={['all', ...languages]}
          active={activeLanguage}
          onChange={onLanguageChange}
          renderLabel={(value) => (value === 'all' ? 'すべて' : value)}
        />
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
      <span className="text-xs text-zinc-500">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((value) => {
          const isActive = value === active;
          return (
            <motion.button
              key={value}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(value)}
              className={[
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                isActive
                  ? 'border-blue-500/80 bg-blue-500/10 text-blue-200'
                  : 'border-zinc-700 bg-zinc-900/60 text-zinc-400 hover:border-zinc-500 hover:text-zinc-100',
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


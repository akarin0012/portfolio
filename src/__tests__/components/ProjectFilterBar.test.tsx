import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectFilterBar } from '@/components/projects/ProjectFilterBar';
import type { ProjectCategory, ProgrammingLanguage } from '@/data/projects';

// framer-motion のモック（motion 固有 props を除外して DOM 警告を防止）
vi.mock('framer-motion', () => ({
  motion: {
    button: ({
      children,
      whileHover: _wh,
      whileTap: _wt,
      whileFocus: _wf,
      whileInView: _wi,
      initial: _i,
      animate: _a,
      exit: _e,
      transition: _tr,
      variants: _v,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => <button {...props}>{children}</button>,
  },
}));

const defaultProps = {
  categories: ['web-app', 'tool'] as ProjectCategory[],
  languages: ['TypeScript', 'JavaScript'] as ProgrammingLanguage[],
  activeCategory: 'all' as ProjectCategory | 'all',
  activeLanguage: 'all' as ProgrammingLanguage | 'all',
  searchQuery: '',
  onCategoryChange: vi.fn(),
  onLanguageChange: vi.fn(),
  onClearAll: vi.fn(),
};

describe('ProjectFilterBar', () => {
  it('カテゴリと言語のフィルターボタンが表示される', () => {
    render(<ProjectFilterBar {...defaultProps} />);

    // 「すべて」はカテゴリと言語の両方に存在するため getAllByText を使用
    expect(screen.getAllByText('すべて')).toHaveLength(2);
    expect(screen.getByText('Web App')).toBeInTheDocument();
    expect(screen.getByText('Tool')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('フィルターが初期状態では「すべてクリア」ボタンが表示されない', () => {
    render(<ProjectFilterBar {...defaultProps} />);

    expect(screen.queryByLabelText('すべてのフィルターをクリア')).not.toBeInTheDocument();
  });

  it('フィルターがアクティブな時に「すべてクリア」ボタンが表示される', () => {
    render(
      <ProjectFilterBar
        {...defaultProps}
        activeCategory="web-app"
      />,
    );

    expect(screen.getByLabelText('すべてのフィルターをクリア')).toBeInTheDocument();
  });

  it('検索クエリがある時にも「すべてクリア」ボタンが表示される', () => {
    render(
      <ProjectFilterBar
        {...defaultProps}
        searchQuery="Next.js"
      />,
    );

    expect(screen.getByLabelText('すべてのフィルターをクリア')).toBeInTheDocument();
  });

  it('「すべてクリア」ボタンクリックで onClearAll が呼ばれる', () => {
    const onClearAll = vi.fn();
    render(
      <ProjectFilterBar
        {...defaultProps}
        activeCategory="web-app"
        onClearAll={onClearAll}
      />,
    );

    fireEvent.click(screen.getByLabelText('すべてのフィルターをクリア'));
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it('カテゴリボタンクリックで onCategoryChange が呼ばれる', () => {
    const onCategoryChange = vi.fn();
    render(
      <ProjectFilterBar
        {...defaultProps}
        onCategoryChange={onCategoryChange}
      />,
    );

    fireEvent.click(screen.getByText('Web App'));
    expect(onCategoryChange).toHaveBeenCalledWith('web-app');
  });
});

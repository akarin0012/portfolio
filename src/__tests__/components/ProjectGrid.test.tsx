import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import type { Project } from '@/data/projects';

// framer-motion のモック
vi.mock('framer-motion', () => ({
  motion: {
    article: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => <article {...props}>{children}</article>,
  },
}));

// next/image のモック
vi.mock('next/image', () => ({
  default: (props: { alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={props.alt} />
  ),
}));

// next/link のモック
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockProject: Project = {
  id: 'test-project',
  title: 'テストプロジェクト',
  summary: 'テスト用のプロジェクトです',
  description: '詳細な説明',
  category: 'web-app',
  primaryLanguage: 'TypeScript',
  techStack: ['Next.js', 'React'],
  tags: ['Next.js', 'Frontend'],
};

describe('ProjectGrid', () => {
  it('プロジェクトが0件の場合に空状態メッセージを表示', () => {
    render(<ProjectGrid projects={[]} />);

    expect(
      screen.getByText(
        '条件に合致する制作物がありません。フィルター条件を変更してみてください。',
      ),
    ).toBeInTheDocument();
  });

  it('プロジェクトが1件以上の場合にカードを表示', () => {
    render(<ProjectGrid projects={[mockProject]} />);

    expect(screen.getByText('テストプロジェクト')).toBeInTheDocument();
    expect(screen.getByText('テスト用のプロジェクトです')).toBeInTheDocument();
  });

  it('複数プロジェクトが表示される', () => {
    const projects: Project[] = [
      mockProject,
      {
        ...mockProject,
        id: 'test-project-2',
        title: '2つ目のプロジェクト',
        summary: '2つ目の説明',
      },
    ];

    render(<ProjectGrid projects={projects} />);

    expect(screen.getByText('テストプロジェクト')).toBeInTheDocument();
    expect(screen.getByText('2つ目のプロジェクト')).toBeInTheDocument();
  });

  it('空状態メッセージにアクセシビリティ属性がある', () => {
    render(<ProjectGrid projects={[]} />);

    const emptyState = screen.getByRole('status');
    expect(emptyState).toHaveAttribute('aria-live', 'polite');
  });
});

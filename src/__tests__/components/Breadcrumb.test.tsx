import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Breadcrumb } from '@/components/Breadcrumb';

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

describe('Breadcrumb', () => {
  it('ホームリンクが表示される', () => {
    render(<Breadcrumb items={[{ label: 'テストページ' }]} />);
    const homeLink = screen.getByLabelText('ホーム');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('最後のアイテムがリンクではなくテキストで表示される', () => {
    render(
      <Breadcrumb
        items={[
          { label: '制作物ギャラリー', href: '/projects' },
          { label: 'テストプロジェクト' },
        ]}
      />,
    );

    // リンク付きアイテム
    const galleryLink = screen.getByText('制作物ギャラリー');
    expect(galleryLink.tagName).toBe('A');
    expect(galleryLink).toHaveAttribute('href', '/projects');

    // 最後のアイテム（テキスト）
    const currentPage = screen.getByText('テストプロジェクト');
    expect(currentPage.tagName).toBe('SPAN');
    expect(currentPage).toHaveAttribute('aria-current', 'page');
  });

  it('aria-label が設定されている', () => {
    render(<Breadcrumb items={[{ label: 'テスト' }]} />);
    const nav = screen.getByLabelText('パンくずリスト');
    expect(nav).toBeInTheDocument();
  });

  it('単一アイテムでも正しく表示される', () => {
    render(<Breadcrumb items={[{ label: '単一ページ' }]} />);
    expect(screen.getByText('単一ページ')).toBeInTheDocument();
  });
});

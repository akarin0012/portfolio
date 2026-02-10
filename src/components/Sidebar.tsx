'use client';

import { useState, useRef, useCallback } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Code,
  FolderKanban,
  Mail,
  LayoutGrid,
  Menu,
  X,
  FileText,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isExternal?: boolean;
};

const navItems: NavItem[] = [
  { href: '/#profile', label: 'プロフィール', icon: User },
  { href: '/#skills', label: 'スキル', icon: Code },
  { href: '/#projects', label: 'プロジェクト', icon: FolderKanban },
  { href: '/#contact', label: 'お問い合わせ', icon: Mail },
  { href: '/projects', label: '制作物プラットフォーム', icon: LayoutGrid },
];

/**
 * ヘッダーの高さをCSS変数から動的に取得する
 */
function getHeaderHeight(): number {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue('--header-height');
  return parseInt(value, 10) || 73;
}

/** ネストした三項演算子を避けるためのヘルパー */
function getThemeToggleTitle(isExpanded: boolean, isDark: boolean): string | undefined {
  if (isExpanded) return undefined;
  return isDark ? 'ライトモード' : 'ダークモード';
}

export function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const pathname = usePathname();
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  /** モバイルメニューを閉じてフォーカスをトリガーボタンに戻す */
  const closeMobileMenu = useCallback(() => {
    setIsMobileOpen(false);
    mobileMenuButtonRef.current?.focus();
  }, []);

  // モバイルメニューを閉じる（ページ遷移時）
  // React推奨パターン: レンダー中にprops変化を検知してstateをリセット
  // @see https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileOpen(false);
  }

  // アクティブ状態の判定（SSR と CSR で結果がズレないよう、DOM には依存しない）
  const isActive = (href: string) => {
    if (href === '/projects') {
      return pathname?.startsWith('/projects');
    }
    if (href.startsWith('/#')) {
      // ページ内リンクはトップページ表示時のみ「ざっくり有効」とみなす
      return pathname === '/';
    }
    return pathname === href;
  };

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerHeight = getHeaderHeight();
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
    closeMobileMenu();
  };

  /** デスクトップサイドバー: フォーカスが外に出たら閉じる */
  const handleDesktopBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDesktopExpanded(false);
    }
  };

  return (
    <>
      {/* モバイル: ハンバーガーボタン */}
      <button
        ref={mobileMenuButtonRef}
        type="button"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed left-4 top-4 z-50 flex items-center justify-center rounded-lg border border-divider-subtle bg-surface/95 p-2 text-caption shadow-lg backdrop-blur-sm transition-colors hover:border-divider hover:text-heading md:hidden"
        aria-label={isMobileOpen ? 'メニューを閉じる' : 'メニューを開く'}
        aria-expanded={isMobileOpen}
      >
        {isMobileOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* モバイル: オーバーレイ */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={closeMobileMenu}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 z-50 h-full w-[min(280px,calc(100vw-3rem))] border-r border-divider-subtle bg-surface/95 backdrop-blur-sm md:hidden"
            >
              <div className="flex h-full flex-col">
                <div className="border-b border-divider-subtle p-6">
                  <h2 className="text-xl font-bold text-heading">
                    ポートフォリオ
                  </h2>
                </div>
                <nav aria-label="メインナビゲーション" className="flex-1 space-y-1 overflow-y-auto p-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    const isHashLink = item.href.startsWith('/#');
                    const shouldSmoothScroll = isHashLink && pathname === '/';

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={
                          shouldSmoothScroll
                            ? (e) =>
                                handleSmoothScroll(
                                  e,
                                  item.href.replace('/#', ''),
                                )
                            : undefined
                        }
                        aria-current={active ? 'page' : undefined}
                        className={clsx(
                          'flex min-h-11 items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors',
                          active
                            ? 'bg-surface-alt text-heading'
                            : 'text-caption hover:bg-surface-alt/50 hover:text-heading',
                        )}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
                <div className="border-t border-divider-subtle p-4">
                  <a
                    href="/skill_sheet.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-3 text-sm text-caption transition-colors hover:bg-surface-alt/50 hover:text-subheading"
                  >
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    <span>技術経歴書（PDF）</span>
                  </a>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-caption transition-colors hover:bg-surface-alt/50 hover:text-subheading"
                    aria-label={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
                  >
                    {isDark ? (
                      <Sun className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <Moon className="h-4 w-4 flex-shrink-0" />
                    )}
                    <span>{isDark ? 'ライトモード' : 'ダークモード'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* デスクトップ: サイドバー */}
      <aside
        className="fixed left-0 top-0 z-40 hidden h-screen overflow-hidden border-r border-divider-subtle bg-surface/95 backdrop-blur-sm transition-all duration-300 md:block"
        onMouseEnter={() => setIsDesktopExpanded(true)}
        onMouseLeave={() => setIsDesktopExpanded(false)}
        onFocus={() => setIsDesktopExpanded(true)}
        onBlur={handleDesktopBlur}
        style={{
          width: isDesktopExpanded ? '240px' : 'var(--sidebar-collapsed-width)',
        }}
      >
        <div className="flex h-full flex-col">
          <div className="overflow-hidden border-b border-divider-subtle p-4">
            <h2
              className={clsx(
                'overflow-hidden whitespace-nowrap font-bold text-heading transition-all duration-300',
                isDesktopExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0',
              )}
            >
              ポートフォリオ
            </h2>
          </div>
          <nav aria-label="メインナビゲーション" className="flex-1 space-y-1 overflow-y-auto p-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              const isHashLink = item.href.startsWith('/#');
              const shouldSmoothScroll = isHashLink && pathname === '/';

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={
                    shouldSmoothScroll
                      ? (e) =>
                          handleSmoothScroll(e, item.href.replace('/#', ''))
                      : undefined
                  }
                  aria-current={active ? 'page' : undefined}
                  className={clsx(
                    'flex min-h-11 items-center gap-3 overflow-hidden rounded-lg px-3 py-3 text-sm transition-colors',
                    active
                      ? 'bg-surface-alt text-heading'
                      : 'text-caption hover:bg-surface-alt/50 hover:text-heading',
                  )}
                  title={!isDesktopExpanded ? item.label : undefined}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span
                    className={clsx(
                      'overflow-hidden whitespace-nowrap transition-all duration-300',
                      isDesktopExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0',
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-divider-subtle p-3">
            <a
              href="/skill_sheet.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-3 overflow-hidden rounded-lg px-3 py-3 text-sm text-caption transition-colors hover:bg-surface-alt/50 hover:text-subheading"
              title={!isDesktopExpanded ? '技術経歴書（PDF）' : undefined}
            >
              <FileText className="h-4 w-4 flex-shrink-0" />
              <span
                className={clsx(
                  'overflow-hidden whitespace-nowrap transition-all duration-300',
                  isDesktopExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0',
                )}
              >
                技術経歴書（PDF）
              </span>
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex min-h-11 w-full items-center gap-3 overflow-hidden rounded-lg px-3 py-3 text-sm text-caption transition-colors hover:bg-surface-alt/50 hover:text-subheading"
              title={getThemeToggleTitle(isDesktopExpanded, isDark)}
              aria-label={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
            >
              {isDark ? (
                <Sun className="h-4 w-4 flex-shrink-0" />
              ) : (
                <Moon className="h-4 w-4 flex-shrink-0" />
              )}
              <span
                className={clsx(
                  'overflow-hidden whitespace-nowrap transition-all duration-300',
                  isDesktopExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0',
                )}
              >
                {isDark ? 'ライトモード' : 'ダークモード'}
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

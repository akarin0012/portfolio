'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
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
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { SidebarFooter } from '@/components/sidebar/SidebarFooter';
import { CollapsibleLabel } from '@/components/sidebar/CollapsibleLabel';

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
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

/** アクティブ状態の判定（SSR と CSR で結果がズレないよう、DOM には依存しない） */
function checkIsActive(href: string, pathname: string | null): boolean {
  if (href === '/projects') {
    return !!pathname?.startsWith('/projects');
  }
  if (href.startsWith('/#')) {
    return pathname === '/';
  }
  return pathname === href;
}

// ──────────────────────────────────────────
// ナビゲーションリンク（共通）
// ──────────────────────────────────────────

type NavLinkListProps = {
  pathname: string | null;
  isDesktop?: boolean;
  isDesktopExpanded?: boolean;
  onSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
};

function NavLinkList({ pathname, isDesktop, isDesktopExpanded, onSmoothScroll }: NavLinkListProps) {
  return (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = checkIsActive(item.href, pathname);
        const isHashLink = item.href.startsWith('/#');
        const shouldSmoothScroll = isHashLink && pathname === '/';

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={
              shouldSmoothScroll
                ? (e) => onSmoothScroll(e, item.href.replace('/#', ''))
                : undefined
            }
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex min-h-11 items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors',
              isDesktop && 'overflow-hidden',
              active
                ? 'bg-surface-alt text-heading'
                : 'text-caption hover:bg-surface-alt/50 hover:text-heading',
            )}
            title={isDesktop && !isDesktopExpanded ? item.label : undefined}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            <CollapsibleLabel isDesktop={isDesktop} isExpanded={isDesktopExpanded}>
              {item.label}
            </CollapsibleLabel>
          </Link>
        );
      })}
    </>
  );
}

// ──────────────────────────────────────────
// Sidebar 本体
// ──────────────────────────────────────────

export function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const pathname = usePathname();
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  // フォーカストラップ（WCAG 2.1 準拠）
  useFocusTrap(mobileMenuRef, isMobileOpen);

  const closeMobileMenu = useCallback(() => {
    setIsMobileOpen(false);
    mobileMenuButtonRef.current?.focus();
  }, []);

  // ページ遷移時にモバイルメニューを閉じる
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileOpen(false);
  }

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerHeight = getHeaderHeight();
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
      closeMobileMenu();
    },
    [closeMobileMenu],
  );

  /** デスクトップサイドバー: フォーカスが外に出たら閉じる */
  const handleDesktopBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDesktopExpanded(false);
    }
  };

  /** Escape キーでモバイルメニューを閉じる */
  const handleMobileKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    },
    [closeMobileMenu],
  );

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
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* モバイル: オーバーレイ + メニュー */}
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
              ref={mobileMenuRef}
              role="dialog"
              aria-modal="true"
              aria-label="ナビゲーションメニュー"
              onKeyDown={handleMobileKeyDown}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 z-50 h-full w-[min(280px,calc(100vw-3rem))] border-r border-divider-subtle bg-surface/95 backdrop-blur-sm md:hidden"
            >
              <div className="flex h-full flex-col">
                <div className="border-b border-divider-subtle p-6">
                  <h2 className="text-xl font-bold text-heading">ポートフォリオ</h2>
                </div>
                <nav aria-label="メインナビゲーション" className="flex-1 space-y-1 overflow-y-auto p-4">
                  <NavLinkList pathname={pathname} onSmoothScroll={handleSmoothScroll} />
                </nav>
                <div className="border-t border-divider-subtle p-4">
                  <SidebarFooter isDark={isDark} toggleTheme={toggleTheme} />
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
              className={cn(
                'overflow-hidden whitespace-nowrap font-bold text-heading transition-all duration-300',
                isDesktopExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0',
              )}
            >
              ポートフォリオ
            </h2>
          </div>
          <nav aria-label="メインナビゲーション" className="flex-1 space-y-1 overflow-y-auto p-3">
            <NavLinkList
              pathname={pathname}
              isDesktop
              isDesktopExpanded={isDesktopExpanded}
              onSmoothScroll={handleSmoothScroll}
            />
          </nav>
          <div className="border-t border-divider-subtle p-3">
            <SidebarFooter
              isDark={isDark}
              toggleTheme={toggleTheme}
              isDesktop
              isDesktopExpanded={isDesktopExpanded}
            />
          </div>
        </div>
      </aside>
    </>
  );
}

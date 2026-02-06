'use client';

import { useState, useEffect } from 'react';
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
} from 'lucide-react';

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

export function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const pathname = usePathname();

  // モバイルメニューを閉じる（ページ遷移時）
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

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
      const headerHeight = 100;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* モバイル: ハンバーガーボタン */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed left-4 top-20 z-50 flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/95 p-2 text-zinc-400 backdrop-blur-sm transition-colors hover:border-zinc-700 hover:text-zinc-100 md:hidden"
        aria-label="メニューを開く"
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
              className="fixed inset-0 z-40 bg-zinc-900/80 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 z-50 h-full w-[280px] border-r border-zinc-800 bg-zinc-900/95 backdrop-blur-sm md:hidden"
            >
              <div className="flex h-full flex-col">
                <div className="border-b border-zinc-800 p-6">
                  <h2 className="text-xl font-bold text-zinc-100">
                    ポートフォリオ
                  </h2>
                </div>
                <nav className="flex-1 space-y-1 overflow-y-auto p-4">
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
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                          active
                            ? 'bg-zinc-800 text-zinc-100'
                            : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100'
                        }`}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
                <div className="border-t border-zinc-800 p-4">
                  <a
                    href="/skill_sheet.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800/50 hover:text-zinc-300"
                  >
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    <span>技術経歴書（PDF）</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* デスクトップ: サイドバー */}
      <aside
        className="fixed left-0 top-0 z-40 hidden h-screen border-r border-zinc-800 bg-zinc-900/95 backdrop-blur-sm transition-all duration-300 md:block"
        onMouseEnter={() => setIsDesktopExpanded(true)}
        onMouseLeave={() => setIsDesktopExpanded(false)}
        style={{
          width: isDesktopExpanded ? '240px' : '72px',
        }}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-zinc-800 p-4">
            <h2
              className={`overflow-hidden whitespace-nowrap font-bold text-zinc-100 transition-opacity ${
                isDesktopExpanded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              ポートフォリオ
            </h2>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
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
                  className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? 'bg-zinc-800 text-zinc-100'
                      : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100'
                  }`}
                  title={!isDesktopExpanded ? item.label : undefined}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span
                    className={`overflow-hidden whitespace-nowrap transition-opacity ${
                      isDesktopExpanded ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {item.label}
                  </span>
                  {!isDesktopExpanded && (
                    <span className="pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap rounded-lg bg-zinc-800 px-2 py-1 text-xs text-zinc-100 opacity-0 transition-opacity group-hover:opacity-100 lg:block">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-zinc-800 p-3">
            <a
              href="/skill_sheet.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800/50 hover:text-zinc-300"
              title={!isDesktopExpanded ? '技術経歴書（PDF）' : undefined}
            >
              <FileText className="h-4 w-4 flex-shrink-0" />
              <span
                className={`overflow-hidden whitespace-nowrap transition-opacity ${
                  isDesktopExpanded ? 'opacity-100' : 'opacity-0'
                }`}
              >
                技術経歴書（PDF）
              </span>
              {!isDesktopExpanded && (
                <span className="pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap rounded-lg bg-zinc-800 px-2 py-1 text-xs text-zinc-100 opacity-0 transition-opacity group-hover:opacity-100 lg:block">
                  技術経歴書（PDF）
                </span>
              )}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

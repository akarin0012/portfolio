'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useTheme } from './ThemeProvider';

/**
 * ページトップに戻るフローティングボタン
 * スクロール位置が400pxを超えるとフェードインする
 */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        isDark
          ? 'border border-zinc-700 bg-zinc-800/90 text-zinc-400 hover:border-zinc-500 hover:text-zinc-100'
          : 'border border-zinc-300 bg-white/90 text-zinc-500 hover:border-zinc-400 hover:text-zinc-900'
      } ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      aria-label="ページトップに戻る"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}

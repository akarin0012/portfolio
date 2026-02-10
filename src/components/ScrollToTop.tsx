'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * ページトップに戻るフローティングボタン
 * スクロール位置が400pxを超えるとフェードインする
 */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    const opts: AddEventListenerOptions = { passive: true };
    window.addEventListener('scroll', handleScroll, opts);
    return () => window.removeEventListener('scroll', handleScroll, opts);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-divider bg-white/90 text-body shadow-lg backdrop-blur-sm transition-all duration-300 hover:text-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:bg-surface-alt/90 dark:text-caption ${
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

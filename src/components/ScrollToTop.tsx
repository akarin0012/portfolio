'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

/** ボタンを表示するスクロール閾値（px） */
const SCROLL_THRESHOLD = 400;

/**
 * ページトップに戻るフローティングボタン
 * スクロール位置が閾値を超えるとフェードインし、
 * フッターが画面内に見えている時は非表示にする
 */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const updateVisibility = useCallback(() => {
    const scrolledEnough = window.scrollY > SCROLL_THRESHOLD;

    // フッターが画面内に見えているかチェック
    const footer = document.querySelector('footer[role="contentinfo"]');
    let footerInView = false;
    if (footer) {
      const rect = footer.getBoundingClientRect();
      // フッターの上端がビューポート内に入ったらボタンと重なる
      footerInView = rect.top < window.innerHeight;
    }

    setIsVisible(scrolledEnough && !footerInView);
  }, []);

  useEffect(() => {
    const opts: AddEventListenerOptions = { passive: true };
    // 初回チェック: requestAnimationFrame でレイアウト確定後に実行
    const rafId = requestAnimationFrame(() => updateVisibility());
    window.addEventListener('scroll', updateVisibility, opts);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateVisibility, opts);
    };
  }, [updateVisibility]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-divider bg-surface/90 text-caption shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-surface-alt hover:text-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0',
      )}
      aria-label="ページトップに戻る"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

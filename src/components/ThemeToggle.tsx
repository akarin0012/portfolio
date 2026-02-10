'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="fixed bottom-6 right-20 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-divider bg-white/90 text-body shadow-lg backdrop-blur-sm transition-all duration-300 hover:text-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:bg-surface-alt/90 dark:text-caption"
      aria-label={
        isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'
      }
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}

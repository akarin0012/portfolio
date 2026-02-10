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
      className="fixed bottom-6 right-[4.25rem] z-50 flex h-11 w-11 items-center justify-center rounded-full border border-divider bg-surface/90 text-caption shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-surface-alt hover:text-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      aria-label={
        isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'
      }
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}

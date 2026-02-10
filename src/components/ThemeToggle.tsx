'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="fixed bottom-6 right-18 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800/90 text-zinc-400 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-zinc-500 hover:text-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/90 light:border-zinc-300 light:bg-white/90 light:text-zinc-600 light:hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      aria-label={
        theme === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え'
      }
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}

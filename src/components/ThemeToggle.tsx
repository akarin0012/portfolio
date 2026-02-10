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
      className={`fixed bottom-6 right-18 z-50 flex h-10 w-10 items-center justify-center rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        isDark
          ? 'border border-zinc-700 bg-zinc-800/90 text-zinc-400 hover:border-zinc-500 hover:text-zinc-100'
          : 'border border-zinc-300 bg-white/90 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900'
      }`}
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

'use client';

import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useRef,
  useSyncExternalStore,
} from 'react';

type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

/** テーマの外部ストア（localStorage + DOM classList） */
let currentTheme: Theme = 'dark';
const listeners = new Set<() => void>();

function subscribeTheme(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getThemeSnapshot(): Theme {
  return currentTheme;
}

function getThemeServerSnapshot(): Theme {
  return 'dark';
}

function setThemeValue(next: Theme) {
  currentTheme = next;
  if (typeof window !== 'undefined') {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(next);
    localStorage.setItem('theme', next);
  }
  listeners.forEach((fn) => fn());
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );

  const initialized = useRef(false);

  // 初回マウント時に localStorage からテーマを復元
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const stored = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    let resolved: Theme;
    if (stored === 'dark' || stored === 'light') {
      resolved = stored;
    } else {
      resolved = prefersDark ? 'dark' : 'light';
    }

    setThemeValue(resolved);
  }, []);

  // テーマ変更時に DOM と localStorage を同期
  useEffect(() => {
    if (!initialized.current) return;
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = currentTheme === 'dark' ? 'light' : 'dark';
    setThemeValue(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

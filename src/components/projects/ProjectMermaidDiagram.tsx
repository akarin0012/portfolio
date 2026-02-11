'use client';

import { useEffect, useRef, useState } from 'react';
import { Code2 } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

type Props = {
  diagram?: string;
};

/**
 * Mermaid が生成した SVG 文字列からスクリプト要素とイベントハンドラを除去する
 * innerHTML への直接挿入時の XSS リスクを低減するためのサニタイズ処理
 */
function sanitizeSvg(svgString: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');

  // <script> 要素をすべて削除
  doc.querySelectorAll('script').forEach((el) => el.remove());

  // on* イベントハンドラ属性をすべて削除
  const allElements = doc.querySelectorAll('*');
  for (const el of allElements) {
    for (const attr of Array.from(el.attributes)) {
      if (attr.name.startsWith('on')) {
        el.removeAttribute(attr.name);
      }
    }
    // javascript: スキームの href/xlink:href を除去
    for (const hrefAttr of ['href', 'xlink:href']) {
      const value = el.getAttribute(hrefAttr);
      if (value && value.trim().toLowerCase().startsWith('javascript:')) {
        el.removeAttribute(hrefAttr);
      }
    }
  }

  return doc.documentElement.outerHTML;
}

/** ダーク/ライト別の Mermaid テーマ変数 */
const mermaidThemes = {
  dark: {
    theme: 'dark' as const,
    themeVariables: {
      darkMode: true,
      background: '#09090b',
      primaryColor: '#3b82f6',
      primaryTextColor: '#f4f4f5',
      primaryBorderColor: '#3f3f46',
      lineColor: '#52525b',
      secondaryColor: '#27272a',
      tertiaryColor: '#18181b',
    },
  },
  light: {
    theme: 'default' as const,
    themeVariables: {
      darkMode: false,
      background: '#ffffff',
      primaryColor: '#dbeafe',
      primaryTextColor: '#18181b',
      primaryBorderColor: '#d4d4d8',
      lineColor: '#a1a1aa',
      secondaryColor: '#f4f4f5',
      tertiaryColor: '#e4e4e7',
    },
  },
} as const;

export function ProjectMermaidDiagram({ diagram }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [rendered, setRendered] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        const themeConfig = mermaidThemes[theme];

        mermaid.initialize({
          startOnLoad: false,
          theme: themeConfig.theme,
          themeVariables: themeConfig.themeVariables,
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: 13,
        });

        const id = `mermaid-${Date.now()}`;
        const { svg } = await mermaid.render(id, diagram ?? '');

        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = sanitizeSvg(svg);
          setRendered(true);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    // テーマ切り替え時にも再レンダリング
    setRendered(false);
    setError(false);
    render();
    return () => {
      cancelled = true;
    };
  }, [diagram, theme]);

  if (!diagram) return null;

  const isDark = theme === 'dark';

  return (
    <section className="space-y-3 rounded-xl border border-divider-subtle/80 bg-surface-inset/50 p-5">
      <div className="flex items-center gap-2">
        <Code2 className="h-4 w-4 text-success" />
        <h2 className="text-sm font-semibold text-heading md:text-base">
          技術構成図（Mermaid）
        </h2>
      </div>

      {error ? (
        <>
          <p className="text-xs text-muted">
            ダイアグラムのレンダリングに失敗しました。Mermaid 記法をテキストとして表示しています。
          </p>
          <pre className="keep-dark overflow-x-auto rounded-lg bg-surface-inset/90 p-4 text-xs leading-relaxed text-emerald-200">
            <code>{diagram}</code>
          </pre>
        </>
      ) : (
        <div
          ref={containerRef}
          className={`overflow-x-auto rounded-lg p-4 [&_svg]:mx-auto [&_svg]:max-w-full ${
            isDark ? 'keep-dark bg-surface-inset/90' : 'border border-divider-subtle bg-surface-alt'
          }`}
        >
          {/* mermaid レンダリング中のスケルトン（レンダリング完了後は非表示） */}
          {!rendered && (
            <div className="flex h-32 items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-divider border-t-success" />
            </div>
          )}
        </div>
      )}
    </section>
  );
}

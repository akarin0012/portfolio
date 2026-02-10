import { MonitorSmartphone, Code2, ExternalLink } from 'lucide-react';
import type { LiveDemoType } from '@/data/projects';

type Props = {
  type?: LiveDemoType;
  demoUrl?: string;
};

export function ProjectLiveDemo({ type, demoUrl }: Props) {
  if (!type) return null;

  const showIframe = type === 'iframe' && demoUrl;
  const showExternal = type === 'external-link' && demoUrl;

  return (
    <section className="space-y-3 rounded-xl border border-divider-subtle/80 bg-surface-inset/50 p-5">
      <div className="flex items-center gap-2">
        <MonitorSmartphone className="h-4 w-4 text-accent" />
        <h2 className="text-sm font-semibold text-heading md:text-base">
          Live Demo / プレビュー
        </h2>
      </div>

      {showIframe && (
        <div className="overflow-hidden rounded-lg border border-divider-subtle bg-surface">
          <iframe
            src={demoUrl}
            className="h-[420px] w-full border-0"
            loading="lazy"
            title="Live demo"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>
      )}

      {showExternal && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-divider/80 bg-surface/70 px-3 py-1.5 text-xs font-medium text-subheading transition hover:border-accent/60 hover:text-accent"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span>別タブでデモを開く</span>
        </a>
      )}

      {type === 'code-snippet' && (
        <div className="flex items-start gap-3 rounded-lg border border-divider-subtle bg-surface/80 p-4 text-xs text-body">
          <Code2 className="mt-0.5 h-4 w-4 text-amber-300" />
          <p>
            このプロジェクトは業務システムなどの都合で直接デモを公開できないため、コードレベルでの解説や設計図を中心に紹介しています。
            必要に応じて GitHub 上のサンプル実装やコードスニペットを追加してください。
          </p>
        </div>
      )}
    </section>
  );
}

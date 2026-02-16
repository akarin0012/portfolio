import { MonitorSmartphone, Code2, ExternalLink, Lock } from 'lucide-react';
import type { LiveDemoType } from '@/data/projects';

type Props = {
  type?: LiveDemoType;
  demoUrl?: string;
  /** code-snippet 表示時のリポジトリURL（GitHub リンク表示に使用） */
  repoUrl?: string;
};

export function ProjectLiveDemo({ type, demoUrl, repoUrl }: Props) {
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
            className="aspect-video w-full border-0"
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
        <div className="space-y-3 rounded-lg border border-divider-subtle bg-surface/80 p-4">
          <div className="flex items-start gap-3 text-xs text-body">
            <Lock className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted" />
            <p>
              このプロジェクトは業務システムのため直接デモを公開できません。
              設計図やコードレベルの解説を中心に紹介しています。
            </p>
          </div>
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-divider/80 bg-surface/70 px-3 py-1.5 text-xs font-medium text-subheading transition hover:border-accent/60 hover:text-accent"
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>GitHub でコードを見る</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      )}
    </section>
  );
}

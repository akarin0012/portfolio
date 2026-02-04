import { Code2 } from 'lucide-react';

type Props = {
  diagram?: string;
};

export function ProjectMermaidDiagram({ diagram }: Props) {
  if (!diagram) return null;

  return (
    <section className="space-y-3 rounded-xl border border-zinc-800/80 bg-zinc-950/50 p-5">
      <div className="flex items-center gap-2">
        <Code2 className="h-4 w-4 text-emerald-400" />
        <h2 className="text-sm font-semibold text-zinc-100 md:text-base">
          技術構成図（Mermaid）
        </h2>
      </div>
      <p className="text-xs text-zinc-500">
        現在は Mermaid 記法をテキストとして表示しています。必要に応じて Mermaid.js のレンダリング処理に差し替え可能です。
      </p>
      <pre className="overflow-x-auto rounded-lg bg-zinc-950/90 p-4 text-xs leading-relaxed text-emerald-200">
        <code>{diagram}</code>
      </pre>
    </section>
  );
}


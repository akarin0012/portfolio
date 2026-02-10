import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface text-foreground">
      <main className="px-6 text-center">
        {/* 404 数字 */}
        <p className="text-8xl font-bold tracking-tighter text-divider md:text-9xl" aria-label="404エラー">
          404
        </p>

        {/* メッセージ */}
        <h1 className="mt-4 text-2xl font-bold text-heading md:text-3xl">
          ページが見つかりません
        </h1>
        <p className="mt-3 text-base text-caption md:text-lg">
          お探しのページは移動または削除された可能性があります。
        </p>

        {/* ナビゲーション */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-8 py-3 text-sm font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-100"
          >
            トップページへ戻る
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-full border border-divider px-8 py-3 text-sm font-medium text-body transition-colors hover:border-muted hover:text-heading"
          >
            制作物を見る
          </Link>
        </div>
      </main>
    </div>
  );
}

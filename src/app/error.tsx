'use client';

import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900 text-zinc-50">
      <main className="px-6 text-center">
        {/* エラーアイコン */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500/30 bg-red-500/10">
          <svg
            className="h-8 w-8 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* メッセージ */}
        <h1 className="text-2xl font-bold text-zinc-100 md:text-3xl">
          エラーが発生しました
        </h1>
        <p className="mt-3 text-base text-zinc-400 md:text-lg">
          予期しないエラーが発生しました。しばらく経ってから再度お試しください。
        </p>

        {/* エラー詳細（開発時のみ有用） */}
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-zinc-600">
            Error ID: {error.digest}
          </p>
        )}

        {/* アクション */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
          >
            もう一度試す
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-8 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
          >
            トップページへ戻る
          </a>
        </div>
      </main>
    </div>
  );
}

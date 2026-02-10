'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Unhandled error:', error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface text-foreground">
      <main className="px-6 text-center">
        {/* エラーアイコン */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-danger/30 bg-danger/10">
          <svg
            className="h-8 w-8 text-danger"
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
        <h1 className="text-2xl font-bold text-heading md:text-3xl">
          エラーが発生しました
        </h1>
        <p className="mt-3 text-base text-caption md:text-lg">
          予期しないエラーが発生しました。しばらく経ってから再度お試しください。
        </p>

        {/* エラー詳細（開発時のみ有用） */}
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-muted">
            Error ID: {error.digest}
          </p>
        )}

        {/* アクション */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-hover"
          >
            もう一度試す
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-divider px-8 py-3 text-sm font-medium text-body transition-colors hover:border-muted hover:text-heading"
          >
            トップページへ戻る
          </Link>
        </div>
      </main>
    </div>
  );
}

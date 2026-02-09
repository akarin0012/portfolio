export default function ProjectDetailLoading() {
  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="container mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
        {/* 戻るリンクスケルトン */}
        <div className="mb-6 h-5 w-32 animate-pulse rounded bg-zinc-800" />

        {/* プロジェクトヘッダースケルトン */}
        <div className="mb-8 md:mb-10">
          <div className="h-9 w-3/4 animate-pulse rounded bg-zinc-800 md:h-11" />
          <div className="mt-3 h-5 w-full animate-pulse rounded bg-zinc-800" />
          <div className="mt-2 h-5 w-2/3 animate-pulse rounded bg-zinc-800" />
          {/* タグスケルトン */}
          <div className="mt-4 flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-7 w-20 animate-pulse rounded-full bg-zinc-800"
              />
            ))}
          </div>
        </div>

        {/* コンテンツセクションスケルトン */}
        <div className="space-y-8">
          {/* 説明セクション */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 p-6">
            <div className="mb-4 h-6 w-32 animate-pulse rounded bg-zinc-700" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-zinc-700/50" />
              <div className="h-4 w-full animate-pulse rounded bg-zinc-700/50" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-700/50" />
            </div>
          </div>

          {/* デモセクション */}
          <div className="h-64 animate-pulse rounded-lg border border-zinc-800 bg-zinc-800/50 md:h-96" />

          {/* ダイアグラムセクション */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 p-6">
            <div className="mb-4 h-6 w-40 animate-pulse rounded bg-zinc-700" />
            <div className="h-48 animate-pulse rounded bg-zinc-700/30" />
          </div>
        </div>
      </div>
    </div>
  );
}

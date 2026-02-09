export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-900">
      {/* ヘッダースケルトン */}
      <div className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-6 md:px-6">
          <div className="h-8 w-40 animate-pulse rounded bg-zinc-800" />
        </div>
      </div>

      {/* メインコンテンツスケルトン */}
      <div className="container mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        {/* ヒーローセクション */}
        <div className="mb-12 md:mb-20">
          <div className="mb-8 flex flex-col items-center gap-4 md:mb-12">
            <div className="h-10 w-64 animate-pulse rounded bg-zinc-800 md:h-12" />
            <div className="h-6 w-48 animate-pulse rounded bg-zinc-800" />
            <div className="h-5 w-36 animate-pulse rounded bg-zinc-800" />
          </div>
          <div className="h-56 animate-pulse rounded-lg border border-zinc-800 bg-zinc-800/50 md:h-48" />
        </div>

        {/* スキルセクション */}
        <div className="mb-12 md:mb-20">
          <div className="mb-6 h-9 w-24 animate-pulse rounded bg-zinc-800 md:mb-8" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-52 animate-pulse rounded-lg border border-zinc-800 bg-zinc-800/50"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

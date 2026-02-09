export default function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="container mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        {/* ページタイトルスケルトン */}
        <div className="mb-8 md:mb-10">
          <div className="h-10 w-56 animate-pulse rounded bg-zinc-800" />
          <div className="mt-3 h-5 w-80 animate-pulse rounded bg-zinc-800" />
        </div>

        {/* フィルターバースケルトン */}
        <div className="mb-8 flex flex-wrap gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-20 animate-pulse rounded-full bg-zinc-800"
            />
          ))}
        </div>

        {/* プロジェクトカードグリッドスケルトン */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-lg border border-zinc-800 bg-zinc-800/50"
            >
              {/* サムネイルエリア */}
              <div className="h-40 rounded-t-lg bg-zinc-800" />
              {/* テキストエリア */}
              <div className="space-y-3 p-5">
                <div className="h-5 w-3/4 rounded bg-zinc-700" />
                <div className="h-4 w-full rounded bg-zinc-700/50" />
                <div className="h-4 w-2/3 rounded bg-zinc-700/50" />
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-14 rounded bg-zinc-700/50" />
                  <div className="h-6 w-14 rounded bg-zinc-700/50" />
                  <div className="h-6 w-14 rounded bg-zinc-700/50" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

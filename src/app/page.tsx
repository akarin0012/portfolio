export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-50">
      {/* ヘッダー */}
      <header className="border-b border-zinc-800">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold">ポートフォリオ</h1>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-6 py-12">
        {/* 自己紹介セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-zinc-100">自己紹介</h2>
          <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700">
            <p className="text-lg leading-relaxed text-zinc-300 mb-4">
              3年目のWebエンジニアとして、バックエンドからフロントエンドまで幅広く開発に携わっています。
            </p>
            <p className="text-lg leading-relaxed text-zinc-300">
              ユーザーに価値を提供するシステム開発を心がけ、常に最新技術の習得と実践的なスキルアップに取り組んでいます。
            </p>
          </div>
        </section>

        {/* スキルセクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-zinc-100">スキル</h2>
          <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-zinc-200">バックエンド</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-zinc-300">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    C#
                  </li>
                  <li className="flex items-center text-zinc-300">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    VB.NET
                  </li>
                  <li className="flex items-center text-zinc-300">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    ASP.NET
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-zinc-200">フロントエンド・インフラ</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-zinc-300">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    TypeScript
                  </li>
                  <li className="flex items-center text-zinc-300">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Next.js
                  </li>
                  <li className="flex items-center text-zinc-300">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    AWS
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 経歴セクション */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-zinc-100">経歴</h2>
          <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700">
            <div className="space-y-6">
              <div className="border-l-2 border-blue-500 pl-6">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                    現在
                  </span>
                  <span className="ml-4 text-zinc-400">3年目</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-zinc-200">Webエンジニア</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Webアプリケーションの開発・保守に従事。バックエンドAPIの設計・実装からフロントエンド開発まで幅広く担当。
                  最新のフレームワークやクラウドサービスを活用した効率的な開発を実践しています。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="border-t border-zinc-800 mt-16">
        <div className="container mx-auto px-6 py-6">
          <p className="text-center text-zinc-400 text-sm">
            © 2024 Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

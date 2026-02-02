export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-50">
      {/* ヘッダー */}
      <header className="border-b border-zinc-800 sticky top-0 bg-zinc-900/95 backdrop-blur-sm z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">ポートフォリオ</h1>
            <nav className="hidden md:flex gap-6">
              <a href="#profile" className="text-zinc-400 hover:text-zinc-100 transition-colors">プロフィール</a>
              <a href="#skills" className="text-zinc-400 hover:text-zinc-100 transition-colors">スキル</a>
              <a href="#projects" className="text-zinc-400 hover:text-zinc-100 transition-colors">プロジェクト</a>
              <a href="#contact" className="text-zinc-400 hover:text-zinc-100 transition-colors">お問い合わせ</a>
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-6 py-12 max-w-6xl">
        {/* ヒーローセクション */}
        <section id="profile" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 text-zinc-100">茅嶋 伸一郎</h2>
            <p className="text-xl text-zinc-400 mb-2">システムエンジニア（3年目）</p>
            <p className="text-lg text-zinc-500">26歳 | 東京都練馬区</p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700">
            <h3 className="text-2xl font-semibold mb-4 text-zinc-100">自己紹介</h3>
            <p className="text-lg leading-relaxed text-zinc-300 mb-4">
              3年目のシステムエンジニアとして、レガシー技術からモダンな技術スタックまで幅広く開発に携わっています。
              主にWebアプリケーションの設計から保守運用まで、一貫した開発経験を積んでいます。
            </p>
            <p className="text-lg leading-relaxed text-zinc-300 mb-4">
              レガシー技術（VBScript、C#、VB.NET）を用いた既存システムの開発・保守経験があり、
              オンプレミス環境での本番デプロイや運用も実務経験があります。
            </p>
            <p className="text-lg leading-relaxed text-zinc-300">
              今後は、これまでのレガシー技術での実務経験を活かし、GoやTypeScript等のモダンな技術スタックへの
              リプレイス・移行案件に参画し、技術的な知見を拡げていきたいと考えています。
            </p>
          </div>
        </section>

        {/* スキルセクション */}
        <section id="skills" className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-zinc-100">スキル</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* バックエンド */}
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <h3 className="text-xl font-semibold mb-4 text-zinc-200 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                バックエンド
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="font-medium">C#</span>
                  <span className="ml-auto text-sm text-zinc-500">3年</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="font-medium">VB.NET</span>
                  <span className="ml-auto text-sm text-zinc-500">3年</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="font-medium">ASP.NET</span>
                  <span className="ml-auto text-sm text-zinc-500">2年4ヶ月</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="font-medium">ASP.NET Core MVC</span>
                  <span className="ml-auto text-sm text-zinc-500">5ヶ月</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="font-medium">VBScript</span>
                  <span className="ml-auto text-sm text-zinc-500">2年4ヶ月</span>
                </li>
              </ul>
            </div>

            {/* フロントエンド */}
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <h3 className="text-xl font-semibold mb-4 text-zinc-200 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                フロントエンド
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="font-medium">HTML/CSS</span>
                  <span className="ml-auto text-sm text-zinc-500">3年</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="font-medium">JavaScript</span>
                  <span className="ml-auto text-sm text-zinc-500">3年</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="font-medium">jQuery</span>
                  <span className="ml-auto text-sm text-zinc-500">2年4ヶ月</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="font-medium">TypeScript</span>
                  <span className="ml-auto text-sm text-zinc-500">学習中</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span className="font-medium">Next.js</span>
                  <span className="ml-auto text-sm text-zinc-500">学習中</span>
                </li>
              </ul>
            </div>

            {/* データベース */}
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <h3 className="text-xl font-semibold mb-4 text-zinc-200 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                データベース
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span className="font-medium">SQL Server</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span className="font-medium">Oracle</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span className="font-medium">MySQL</span>
                </li>
              </ul>
            </div>

            {/* その他 */}
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <h3 className="text-xl font-semibold mb-4 text-zinc-200 flex items-center">
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
                その他
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <span className="font-medium">Unity（ローコード）</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <span className="font-medium">kintone</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <span className="font-medium">Python</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <span className="font-medium">AWS</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <span className="font-medium">Git/GitHub</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  <span className="font-medium">GitHub Actions</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 資格 */}
          <div className="mt-6 bg-zinc-800 rounded-lg p-6 border border-zinc-700">
            <h3 className="text-xl font-semibold mb-4 text-zinc-200">資格</h3>
            <ul className="space-y-2">
              <li className="text-zinc-300">• HTML5プロフェッショナル認定 レベル1</li>
              <li className="text-zinc-300">• 普通自動車免許</li>
            </ul>
          </div>
        </section>

        {/* プロジェクト経験セクション */}
        <section id="projects" className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-zinc-100">主なプロジェクト経験</h2>
          <div className="space-y-6">
            {/* プロジェクト1 */}
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 hover:border-blue-500/50 transition-colors">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-sm font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                  建設業向け帳票管理システム
                </span>
                <span className="text-sm text-zinc-400">2023年7月 - 2025年10月（2年4ヶ月）</span>
                <span className="text-sm text-zinc-400">SE | チーム規模: 21名</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-200">Webアプリケーション開発・保守</h3>
              <p className="text-zinc-300 mb-4">
                データ参照・出力機能の追加、Dropbox対応化機能の追加、DB移行に伴うデータ連携用パッチファイルの開発・改修、
                システムマニュアルの作成・更新、本番環境へのデプロイ・運用を担当。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">ASP.NET</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">VB.NET</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">VBScript</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">HTML/CSS</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">JavaScript</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">jQuery</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">Oracle</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">SQL Server</span>
              </div>
            </div>

            {/* プロジェクト2 */}
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 hover:border-blue-500/50 transition-colors">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-sm font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                  建設業向け資機材管理システム
                </span>
                <span className="text-sm text-zinc-400">2024年4月 - 2024年11月（8ヶ月）</span>
                <span className="text-sm text-zinc-400">SE | チーム規模: 9名</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-200">Unity × kintone連携開発</h3>
              <p className="text-zinc-300 mb-4">
                開発環境構築、画面モック作成、DB設計（ER図作成）、Unityとkintoneを連携したデータ送受信処理の実装、
                本番環境でのユーザ・現場情報管理を担当。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">Unity</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">kintone</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">JavaScript</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">Oracle</span>
              </div>
            </div>

            {/* プロジェクト3 */}
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 hover:border-blue-500/50 transition-colors">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-sm font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                  営業管理システム
                </span>
                <span className="text-sm text-zinc-400">2023年9月 - 2024年1月（5ヶ月）</span>
                <span className="text-sm text-zinc-400">PG | チーム規模: 7名</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-200">ASP.NET Core MVC フルスタック開発</h3>
              <p className="text-zinc-300 mb-4">
                フロントエンド・バックエンドのフルスタック開発、ユーザ管理画面・スケジュール画面・案件画面の実装、
                共有ライブラリの開発・テスト（Excel出力、JSON読み込み、PDF変換）、単体テスト・総合テストの実施を担当。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">ASP.NET Core MVC</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">C#</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">HTML/CSS</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">JavaScript</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">jQuery</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">SQL Server</span>
              </div>
            </div>

            {/* プロジェクト4 */}
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 hover:border-blue-500/50 transition-colors">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-sm font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                  通信業プロビジョニングシステム保守
                </span>
                <span className="text-sm text-zinc-400">2024年12月 - 2025年3月（4ヶ月）</span>
                <span className="text-sm text-zinc-400">オペレータ | チーム規模: 13名</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-200">システム保守・運用</h3>
              <p className="text-zinc-300 mb-4">
                新規サービス追加・既存サービス変更対応、RPA操作・エビデンス作成プログラム開発、
                脆弱性調査・対策資料作成、定期メンテナンス対応（Windowsアップデート、障害確認）を担当。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">JavaScript</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">Python</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">Windows</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">Linux</span>
              </div>
            </div>

            {/* プロジェクト5 */}
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 hover:border-blue-500/50 transition-colors">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-sm font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                  社内用資材工程管理アプリ
                </span>
                <span className="text-sm text-zinc-400">2025年11月 - 2026年2月（4ヶ月・予定）</span>
                <span className="text-sm text-zinc-400">SE | チーム規模: 3名</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-200">Windowsフォームアプリ開発</h3>
              <p className="text-zinc-300 mb-4">
                設計書の新規作成・更新（要件定義書、基本設計書、詳細設計書）、
                Windowsフォームを用いたUI開発（マルチコンボボックス等）、既存コードのリファクタリングを担当。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">VB.NET</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">Windows Forms</span>
                <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">Oracle</span>
              </div>
            </div>
          </div>
        </section>

        {/* お問い合わせセクション */}
        <section id="contact" className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-zinc-100">お問い合わせ</h2>
          <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700 text-center">
            <p className="text-lg text-zinc-300 mb-6">
              ご興味をお持ちいただけましたら、お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="https://github.com/akarin0012"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 px-6 py-3 rounded-lg transition-colors"
              >
                GitHub
              </a>
              <a
                href="/skill_sheet.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                技術経歴書（PDF）
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="border-t border-zinc-800 mt-16">
        <div className="container mx-auto px-6 py-6">
          <p className="text-center text-zinc-400 text-sm">
            © 2024 茅崎 伸一郎. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

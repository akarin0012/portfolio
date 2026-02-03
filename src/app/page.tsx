'use client';

import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerHeight = 100; // ヘッダーの高さ（px）
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
    closeMenu();
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">ポートフォリオ</h1>
            {/* デスクトップメニュー */}
            <nav className="hidden gap-6 md:flex">
              <a
                href="#profile"
                onClick={(e) => handleSmoothScroll(e, 'profile')}
                className="text-zinc-400 transition-colors hover:text-zinc-100"
              >
                プロフィール
              </a>
              <a
                href="#skills"
                onClick={(e) => handleSmoothScroll(e, 'skills')}
                className="text-zinc-400 transition-colors hover:text-zinc-100"
              >
                スキル
              </a>
              <a
                href="#projects"
                onClick={(e) => handleSmoothScroll(e, 'projects')}
                className="text-zinc-400 transition-colors hover:text-zinc-100"
              >
                プロジェクト
              </a>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, 'contact')}
                className="text-zinc-400 transition-colors hover:text-zinc-100"
              >
                お問い合わせ
              </a>
            </nav>
            {/* ハンバーガーボタン（モバイル） */}
            <button
              type="button"
              onClick={toggleMenu}
              className="flex flex-col gap-1.5 md:hidden"
              aria-label="メニューを開く"
              aria-expanded={isMenuOpen}
            >
              <span
                className={`h-0.5 w-6 bg-zinc-400 transition-all ${
                  isMenuOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`h-0.5 w-6 bg-zinc-400 transition-all ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-0.5 w-6 bg-zinc-400 transition-all ${
                  isMenuOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </button>
          </div>
          {/* モバイルメニュー */}
          <nav
            className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
              isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex flex-col gap-4 py-4">
              <a
                href="#profile"
                onClick={(e) => handleSmoothScroll(e, 'profile')}
                className="text-zinc-400 transition-colors hover:text-zinc-100"
              >
                プロフィール
              </a>
              <a
                href="#skills"
                onClick={(e) => handleSmoothScroll(e, 'skills')}
                className="text-zinc-400 transition-colors hover:text-zinc-100"
              >
                スキル
              </a>
              <a
                href="#projects"
                onClick={(e) => handleSmoothScroll(e, 'projects')}
                className="text-zinc-400 transition-colors hover:text-zinc-100"
              >
                プロジェクト
              </a>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, 'contact')}
                className="text-zinc-400 transition-colors hover:text-zinc-100"
              >
                お問い合わせ
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        {/* ヒーローセクション */}
        <section id="profile" className="mb-12 md:mb-20">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-100 md:text-5xl">
              茅嶋 伸一郎
            </h2>
            <p className="mb-2 text-lg text-zinc-400 md:text-xl">
              システムエンジニア（3年目）
            </p>
            <p className="text-base text-zinc-500 md:text-lg">
              26歳 | 東京都練馬区
            </p>
          </div>
          <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-6 md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-zinc-100 md:text-2xl">
              自己紹介
            </h3>
            <p className="mb-4 text-base leading-relaxed text-zinc-300 md:text-lg">
              3年目のシステムエンジニアとして、レガシー技術からモダンな技術スタックまで幅広く開発に携わっています。
              主にWebアプリケーションの設計から保守運用まで、一貫した開発経験を積んでいます。
            </p>
            <p className="mb-4 text-base leading-relaxed text-zinc-300 md:text-lg">
              レガシー技術（VBScript、C#、VB.NET）を用いた既存システムの開発・保守経験があり、
              オンプレミス環境での本番デプロイや運用も実務経験があります。
            </p>
            <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
              今後は、これまでのレガシー技術での実務経験を活かし、GoやTypeScript等のモダンな技術スタックへの
              リプレイス・移行案件に参画し、技術的な知見を拡げていきたいと考えています。
            </p>
          </div>
        </section>

        {/* スキルセクション */}
        <section id="skills" className="mb-12 md:mb-20">
          <h2 className="mb-6 text-3xl font-bold text-zinc-100 md:mb-8 md:text-4xl">
            スキル
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* バックエンド */}
            <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-6">
              <h3 className="mb-4 flex items-center text-xl font-semibold text-zinc-200">
                <span className="mr-3 h-3 w-3 rounded-full bg-blue-500"></span>
                バックエンド
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
                  <span className="font-medium">C#</span>
                  <span className="ml-auto text-sm text-zinc-500">3年</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
                  <span className="font-medium">VB.NET</span>
                  <span className="ml-auto text-sm text-zinc-500">3年</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
                  <span className="font-medium">ASP.NET</span>
                  <span className="ml-auto text-sm text-zinc-500">
                    2年4ヶ月
                  </span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
                  <span className="font-medium">ASP.NET Core MVC</span>
                  <span className="ml-auto text-sm text-zinc-500">5ヶ月</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
                  <span className="font-medium">VBScript</span>
                  <span className="ml-auto text-sm text-zinc-500">
                    2年4ヶ月
                  </span>
                </li>
              </ul>
            </div>

            {/* フロントエンド */}
            <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-6">
              <h3 className="mb-4 flex items-center text-xl font-semibold text-zinc-200">
                <span className="mr-3 h-3 w-3 rounded-full bg-green-500"></span>
                フロントエンド
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
                  <span className="font-medium">HTML/CSS</span>
                  <span className="ml-auto text-sm text-zinc-500">3年</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
                  <span className="font-medium">JavaScript</span>
                  <span className="ml-auto text-sm text-zinc-500">3年</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
                  <span className="font-medium">jQuery</span>
                  <span className="ml-auto text-sm text-zinc-500">
                    2年4ヶ月
                  </span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
                  <span className="font-medium">TypeScript</span>
                  <span className="ml-auto text-sm text-zinc-500">学習中</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-green-500"></span>
                  <span className="font-medium">Next.js</span>
                  <span className="ml-auto text-sm text-zinc-500">学習中</span>
                </li>
              </ul>
            </div>

            {/* データベース */}
            <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-6">
              <h3 className="mb-4 flex items-center text-xl font-semibold text-zinc-200">
                <span className="mr-3 h-3 w-3 rounded-full bg-purple-500"></span>
                データベース
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                  <span className="font-medium">SQL Server</span>
                  <span className="ml-auto text-sm text-zinc-500">8ヶ月</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                  <span className="font-medium">Oracle</span>
                  <span className="ml-auto text-sm text-zinc-500">
                    2年8ヶ月
                  </span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                  <span className="font-medium">MySQL</span>
                  <span className="ml-auto text-sm text-zinc-500">
                    研修経験
                  </span>
                </li>
              </ul>
            </div>

            {/* その他 */}
            <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-6">
              <h3 className="mb-4 flex items-center text-xl font-semibold text-zinc-200">
                <span className="mr-3 h-3 w-3 rounded-full bg-orange-500"></span>
                その他
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-orange-500"></span>
                  <span className="font-medium">Unity（ローコード）</span>
                  <span className="ml-auto text-sm text-zinc-500">8ヶ月</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-orange-500"></span>
                  <span className="font-medium">kintone</span>
                  <span className="ml-auto text-sm text-zinc-500">8ヶ月</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-orange-500"></span>
                  <span className="font-medium">Python</span>
                  <span className="ml-auto text-sm text-zinc-500">4ヶ月</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-orange-500"></span>
                  <span className="font-medium">AWS</span>
                  <span className="ml-auto text-sm text-zinc-500">学習中</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-orange-500"></span>
                  <span className="font-medium">Git/GitHub</span>
                  <span className="ml-auto text-sm text-zinc-500">3年</span>
                </li>
                <li className="flex items-center text-zinc-300">
                  <span className="mr-3 h-2 w-2 rounded-full bg-orange-500"></span>
                  <span className="font-medium">GitHub Actions</span>
                  <span className="ml-auto text-sm text-zinc-500">学習中</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 資格 */}
          <div className="mt-6 rounded-lg border border-zinc-700 bg-zinc-800 p-6">
            <h3 className="mb-4 text-xl font-semibold text-zinc-200">資格</h3>
            <ul className="space-y-2">
              <li className="text-zinc-300">
                • HTML5プロフェッショナル認定 レベル1
              </li>
              <li className="text-zinc-300">• 普通自動車免許</li>
            </ul>
          </div>
        </section>

        {/* プロジェクト経験セクション */}
        <section id="projects" className="mb-12 md:mb-20">
          <h2 className="mb-6 text-3xl font-bold text-zinc-100 md:mb-8 md:text-4xl">
            主なプロジェクト経験
          </h2>
          <div className="space-y-6">
            {/* プロジェクト1 */}
            <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-6 transition-colors hover:border-blue-500/50">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-400">
                  建設業向け帳票管理システム
                </span>
                <span className="text-sm text-zinc-400">
                  2023年7月 - 2025年10月（2年4ヶ月）
                </span>
                <span className="text-sm text-zinc-400">
                  SE | チーム規模: 21名
                </span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-zinc-200">
                Webアプリケーション開発・保守
              </h3>
              <p className="mb-4 text-zinc-300">
                データ参照・出力機能の追加、Dropbox対応化機能の追加、DB移行に伴うデータ連携用パッチファイルの開発・改修、
                システムマニュアルの作成・更新、本番環境へのデプロイ・運用を担当。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  ASP.NET
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  VB.NET
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  VBScript
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  HTML/CSS
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  JavaScript
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  jQuery
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  Oracle
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  SQL Server
                </span>
              </div>
            </div>

            {/* プロジェクト2 */}
            <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-6 transition-colors hover:border-blue-500/50">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-400">
                  建設業向け資機材管理システム
                </span>
                <span className="text-sm text-zinc-400">
                  2024年4月 - 2024年11月（8ヶ月）
                </span>
                <span className="text-sm text-zinc-400">
                  SE | チーム規模: 9名
                </span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-zinc-200">
                Unity × kintone連携開発
              </h3>
              <p className="mb-4 text-zinc-300">
                開発環境構築、画面モック作成、DB設計（ER図作成）、Unityとkintoneを連携したデータ送受信処理の実装、
                本番環境でのユーザ・現場情報管理を担当。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  Unity
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  kintone
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  JavaScript
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  Oracle
                </span>
              </div>
            </div>

            {/* プロジェクト3 */}
            <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-6 transition-colors hover:border-blue-500/50">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-400">
                  営業管理システム
                </span>
                <span className="text-sm text-zinc-400">
                  2023年9月 - 2024年1月（5ヶ月）
                </span>
                <span className="text-sm text-zinc-400">
                  PG | チーム規模: 7名
                </span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-zinc-200">
                ASP.NET Core MVC フルスタック開発
              </h3>
              <p className="mb-4 text-zinc-300">
                フロントエンド・バックエンドのフルスタック開発、ユーザ管理画面・スケジュール画面・案件画面の実装、
                共有ライブラリの開発・テスト（Excel出力、JSON読み込み、PDF変換）、単体テスト・総合テストの実施を担当。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  ASP.NET Core MVC
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  C#
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  HTML/CSS
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  JavaScript
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  jQuery
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  SQL Server
                </span>
              </div>
            </div>

            {/* プロジェクト4 */}
            <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-6 transition-colors hover:border-blue-500/50">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-400">
                  通信業プロビジョニングシステム保守
                </span>
                <span className="text-sm text-zinc-400">
                  2024年12月 - 2025年3月（4ヶ月）
                </span>
                <span className="text-sm text-zinc-400">
                  オペレータ | チーム規模: 13名
                </span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-zinc-200">
                システム保守・運用
              </h3>
              <p className="mb-4 text-zinc-300">
                新規サービス追加・既存サービス変更対応、RPA操作・エビデンス作成プログラム開発、
                脆弱性調査・対策資料作成、定期メンテナンス対応（Windowsアップデート、障害確認）を担当。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  JavaScript
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  Python
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  Windows
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  Linux
                </span>
              </div>
            </div>

            {/* プロジェクト5 */}
            <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-6 transition-colors hover:border-blue-500/50">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-400">
                  社内用資材工程管理アプリ
                </span>
                <span className="text-sm text-zinc-400">
                  2025年11月 - 2026年2月（4ヶ月・予定）
                </span>
                <span className="text-sm text-zinc-400">
                  SE | チーム規模: 3名
                </span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-zinc-200">
                Windowsフォームアプリ開発
              </h3>
              <p className="mb-4 text-zinc-300">
                設計書の新規作成・更新（要件定義書、基本設計書、詳細設計書）、
                Windowsフォームを用いたUI開発（マルチコンボボックス等）、既存コードのリファクタリングを担当。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  VB.NET
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  Windows Forms
                </span>
                <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
                  Oracle
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* お問い合わせセクション */}
        <section id="contact" className="mb-12 md:mb-20">
          <h2 className="mb-6 text-3xl font-bold text-zinc-100 md:mb-8 md:text-4xl">
            お問い合わせ
          </h2>
          <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-6 text-center md:p-8">
            <p className="mb-6 text-base text-zinc-300 md:text-lg">
              ご興味をお持ちいただけましたら、お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col justify-center gap-4 md:flex-row">
              <a
                href="https://github.com/akarin0012"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-zinc-700 px-6 py-3 text-zinc-100 transition-colors hover:bg-zinc-600"
              >
                GitHub
              </a>
              <a
                href="/skill_sheet.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
              >
                技術経歴書（PDF）
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="mt-16 border-t border-zinc-800">
        <div className="container mx-auto px-6 py-6">
          <p className="text-center text-sm text-zinc-400">
            © 2024 茅崎 伸一郎. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

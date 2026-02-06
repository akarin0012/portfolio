'use client';

import { motion, Variants } from 'framer-motion';

// 共通アニメーション設定
const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const viewportOptions = {
  once: true,
  margin: '-100px' as const,
};

export function HomePageClient() {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 md:px-6">
          <h1 className="text-2xl font-bold">ポートフォリオ</h1>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        {/* ヒーローセクション */}
        <section id="profile" className="mb-12 md:mb-20">
          <motion.div
            className="mb-8 text-center md:mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h2 className="mb-4 text-3xl font-bold text-zinc-100 md:text-5xl">
              茅嶋 伸一郎
            </h2>
            <p className="mb-2 text-lg text-zinc-400 md:text-xl">
              システムエンジニア（3年目）
            </p>
            <p className="text-base text-zinc-500 md:text-lg">
              26歳 | 東京都練馬区
            </p>
          </motion.div>
          <motion.div
            className="rounded-lg border border-zinc-700 bg-zinc-800 p-6 md:p-8"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
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
          </motion.div>
        </section>

        {/* スキルセクション */}
        <section id="skills" className="mb-12 md:mb-20">
          <motion.h2
            className="mb-6 text-3xl font-bold text-zinc-100 md:mb-8 md:text-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeInUp}
          >
            スキル
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {/* バックエンド */}
            <motion.div
              className="rounded-lg border border-zinc-700 bg-zinc-800 p-6"
              variants={fadeInUp}
            >
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
            </motion.div>

            {/* フロントエンド */}
            <motion.div
              className="rounded-lg border border-zinc-700 bg-zinc-800 p-6"
              variants={fadeInUp}
            >
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
            </motion.div>

            {/* データベース */}
            <motion.div
              className="rounded-lg border border-zinc-700 bg-zinc-800 p-6"
              variants={fadeInUp}
            >
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
            </motion.div>

            {/* その他 */}
            <motion.div
              className="rounded-lg border border-zinc-700 bg-zinc-800 p-6"
              variants={fadeInUp}
            >
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
            </motion.div>
          </motion.div>

          {/* 資格 */}
          <motion.div
            className="mt-6 rounded-lg border border-zinc-700 bg-zinc-800 p-6"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeInUp}
          >
            <h3 className="mb-4 text-xl font-semibold text-zinc-200">資格</h3>
            <ul className="space-y-2">
              <li className="text-zinc-300">
                • HTML5プロフェッショナル認定 レベル1
              </li>
              <li className="text-zinc-300">• 普通自動車免許</li>
            </ul>
          </motion.div>
        </section>

        {/* プロジェクト経験セクション */}
        <section id="projects" className="mb-12 md:mb-20">
          <motion.h2
            className="mb-6 text-3xl font-bold text-zinc-100 md:mb-8 md:text-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeInUp}
          >
            主なプロジェクト経験
          </motion.h2>
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {/* プロジェクト1 */}
            <motion.div
              className="rounded-lg border border-zinc-700 bg-zinc-800 p-6 transition-colors hover:border-blue-500/50"
              variants={fadeInUp}
            >
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
            </motion.div>

            {/* プロジェクト2 */}
            <motion.div
              className="rounded-lg border border-zinc-700 bg-zinc-800 p-6 transition-colors hover:border-blue-500/50"
              variants={fadeInUp}
            >
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
            </motion.div>

            {/* プロジェクト3 */}
            <motion.div
              className="rounded-lg border border-zinc-700 bg-zinc-800 p-6 transition-colors hover:border-blue-500/50"
              variants={fadeInUp}
            >
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
            </motion.div>

            {/* プロジェクト4 */}
            <motion.div
              className="rounded-lg border border-zinc-700 bg-zinc-800 p-6 transition-colors hover:border-blue-500/50"
              variants={fadeInUp}
            >
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
            </motion.div>

            {/* プロジェクト5 */}
            <motion.div
              className="rounded-lg border border-zinc-700 bg-zinc-800 p-6 transition-colors hover:border-blue-500/50"
              variants={fadeInUp}
            >
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
            </motion.div>
          </motion.div>
        </section>

        {/* お問い合わせセクション */}
        <section id="contact" className="mb-12 md:mb-20">
          <motion.h2
            className="mb-6 text-3xl font-bold text-zinc-100 md:mb-8 md:text-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeInUp}
          >
            お問い合わせ
          </motion.h2>
          <motion.div
            className="rounded-lg border border-zinc-700 bg-zinc-800 p-6 text-center md:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            <p className="mb-8 text-base text-zinc-300 md:text-lg">
              ご興味をお持ちいただけましたら、お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              {/* GitHubボタン（黒ベース） */}
              <motion.a
                href="https://github.com/akarin0012"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-zinc-900 px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 active:scale-95"
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  GitHub
                </span>
              </motion.a>
              {/* メールボタン（白ベース） */}
              <motion.a
                href="mailto:owatakbc@gmail.com"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-medium text-zinc-900 transition-all duration-300 active:scale-95"
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.3)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  お問い合わせ
                </span>
              </motion.a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* フッター */}
      <footer className="mt-16 border-t border-zinc-800">
        <div className="container mx-auto px-6 py-6">
          <p className="text-center text-sm text-zinc-400">
            © 2024 茅嶋 伸一郎. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

# 💼 エンジニアポートフォリオ

> **茅嶋 伸一郎** | システムエンジニア（2023年4月〜）  
> レガシー技術からモダンな技術スタックまで、幅広い開発経験を持つフルスタックエンジニア

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zod](https://img.shields.io/badge/Zod-4-3E67B1?style=flat-square&logo=zod&logoColor=white)](https://zod.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev/)
[![AWS](https://img.shields.io/badge/AWS-Cloud-orange?style=flat-square&logo=amazon-aws)](https://aws.amazon.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white)](https://github.com/features/actions)

---

## 📋 目次

- [ポートフォリオサイト](#-ポートフォリオサイト)
- [技術経歴書](#-技術経歴書)
- [スキルセット](#-スキルセット)
- [主なプロジェクト経験](#-主なプロジェクト経験)
- [このポートフォリオについて](#-このポートフォリオについて)
- [アーキテクチャ・技術的特徴](#-アーキテクチャ技術的特徴)
- [デプロイ・CI/CD](#-デプロイcicd)
- [ローカル開発](#-ローカル開発)
- [npm スクリプト一覧](#-npm-スクリプト一覧)

---

## 🌐 ポートフォリオサイト

**👉 [ポートフォリオサイトを閲覧する](https://akarin0012.com)**  
（AWS S3 + CloudFront でホスティング）

Next.js 16 + TypeScript + Tailwind CSS で構築し、GitHub Actions で AWS S3 に自動デプロイしています。

---

## 📄 技術経歴書

**👉 [技術経歴書（PDF）をダウンロード](/skill_sheet.pdf)**

詳細な技術経歴、プロジェクト経験、使用技術については上記PDFをご覧ください。

---

## 🛠️ スキルセット

### バックエンド開発

| 技術                 | 経験年数 | 主な用途                                            |
| -------------------- | -------- | --------------------------------------------------- |
| **C#**               | 3年      | Webアプリケーション、Windowsフォーム、バッチ処理    |
| **VB.NET**           | 3年      | レガシーシステムの保守・改修、Windowsフォームアプリ |
| **ASP.NET**          | 2年4ヶ月 | 建設業向け帳票管理システムの開発・保守              |
| **ASP.NET Core MVC** | 5ヶ月    | 営業管理システムのフルスタック開発                  |
| **VBScript**         | 2年4ヶ月 | レガシーシステムの保守、DB移行パッチ開発            |

### フロントエンド開発

| 技術           | 経験年数 | 主な用途                                   |
| -------------- | -------- | ------------------------------------------ |
| **HTML/CSS**   | 3年      | WebアプリケーションのUI実装                |
| **JavaScript** | 3年      | フロントエンド処理、kintone連携、Excel出力 |
| **jQuery**     | 2年4ヶ月 | DOM操作、Ajax通信                          |
| **TypeScript** | 学習中   | モダンなWebアプリケーション開発            |
| **Next.js**    | 学習中   | ポートフォリオサイト構築                   |

### データベース

| 技術           | 経験         | 主な用途                             |
| -------------- | ------------ | ------------------------------------ |
| **SQL Server** | 実務経験あり | 建設業向けシステムのデータベース     |
| **Oracle**     | 実務経験あり | 帳票管理システム、資材工程管理アプリ |
| **MySQL**      | 研修経験     | 学習・演習課題                       |

### その他の技術・ツール

- **Unity（ローコード）**: 資機材管理システム、鍵管理システムの開発
- **kintone**: 建設業向けシステムとの連携開発
- **Python**: プロビジョニングシステムの保守、エビデンス取得プログラム開発
- **Git/GitHub**: バージョン管理、CI/CDパイプライン構築
- **AWS**: S3、CloudFrontを使用した静的サイトホスティング
- **GitHub Actions**: CI/CD自動化パイプライン構築

### 資格

- **HTML5プロフェッショナル認定 レベル1**
- 普通自動車免許

---

## 💼 主なプロジェクト経験

### 1. 建設業向け帳票管理システム（2年4ヶ月）

**期間**: 2023年7月 - 2025年10月  
**役割**: SE  
**チーム規模**: 21名  
**技術スタック**: ASP.NET, VB.NET, VBScript, HTML/CSS, JavaScript, jQuery, Oracle, SQL Server

- データ参照・出力機能の追加開発
- Dropbox対応化機能の追加（ファイルアップロード・ダウンロード処理）
- DB移行に伴うデータ連携用パッチファイルの開発・改修
- システムマニュアルの作成・更新
- 本番環境へのデプロイ・運用

### 2. 建設業向け資機材管理システム（8ヶ月）

**期間**: 2024年4月 - 2024年11月  
**役割**: SE  
**チーム規模**: 9名  
**技術スタック**: Unity, kintone, JavaScript, Oracle

- 開発環境構築、アプリ・kintone設定
- 画面モック作成、DB設計（ER図作成）
- Unityとkintoneを連携したデータ送受信処理の実装
- 本番環境でのユーザ・現場情報管理

### 3. 営業管理システム（5ヶ月）

**期間**: 2023年9月 - 2024年1月  
**役割**: PG  
**チーム規模**: 7名  
**技術スタック**: ASP.NET Core MVC, C#, HTML/CSS, JavaScript, jQuery, SQL Server

- フロントエンド・バックエンドのフルスタック開発
- ユーザ管理画面、スケジュール画面、案件画面の実装
- 共有ライブラリの開発・テスト（Excel出力、JSON読み込み、PDF変換）
- 単体テスト・総合テストの実施

### 4. 通信業プロビジョニングシステム保守（4ヶ月）

**期間**: 2024年12月 - 2025年3月  
**役割**: オペレータ  
**チーム規模**: 13名  
**技術スタック**: JavaScript, Python, Windows, Linux

- 新規サービス追加・既存サービス変更対応
- RPA操作、エビデンス作成プログラム開発
- 脆弱性調査・対策資料作成
- 定期メンテナンス対応（Windowsアップデート、障害確認）

### 5. 社内用資材工程管理アプリ（4ヶ月）

**期間**: 2025年11月 - 2026年2月（予定）  
**役割**: SE  
**チーム規模**: 3名  
**技術スタック**: VB.NET, Windows Forms, Oracle

- 設計書の新規作成・更新（要件定義書、基本設計書、詳細設計書）
- Windowsフォームを用いたUI開発（マルチコンボボックス等）
- 既存コードのリファクタリング

---

## 🚀 このポートフォリオについて

このポートフォリオサイトは、私の技術スキルと経験を紹介するために作成しました。

### ✨ 特徴

- **モダンな技術スタック**: Next.js 16 + TypeScript + Tailwind CSS 4
- **型安全性**: TypeScript strict モード + Zod によるランタイムバリデーション
- **静的サイト生成**: AWS S3 へのデプロイに対応した静的エクスポート
- **CI/CD自動化**: GitHub Actions による自動デプロイ + Lighthouse CI
- **テスト**: Vitest（ユニット / コンポーネント）+ Playwright（E2E）
- **SEO**: JSON-LD 構造化データ、サイトマップ、OGP 画像自動生成
- **アクセシビリティ**: WCAG 準拠のフォーカス管理、aria 属性、jsx-a11y リント
- **セキュリティ**: XSS 対策（SVG サニタイズ）、フォームバリデーション、レートリミット
- **レスポンシブデザイン**: モバイルファーストの設計、全デバイス対応
- **ダークモード**: システム設定連動のテーマ切替
- **コード品質**: ESLint + Prettier + 複雑度チェック + バンドル分析

---

## 🏗️ アーキテクチャ・技術的特徴

### 技術スタック

| カテゴリ | 技術 |
| --- | --- |
| フレームワーク | Next.js 16.1 (App Router) |
| 言語 | TypeScript 5 (strict mode) |
| スタイリング | Tailwind CSS 4 |
| アニメーション | Framer Motion 12 |
| バリデーション | Zod 4 |
| アイコン | Lucide React |
| 図表 | Mermaid |
| ユニットテスト | Vitest 4 + Testing Library |
| E2E テスト | Playwright |
| リント | ESLint 9 + jsx-a11y |
| フォーマッタ | Prettier |
| バンドル分析 | @next/bundle-analyzer |
| デプロイ | AWS S3 + CloudFront + GitHub Actions |

### プロジェクト構成

```
portfolio/
├── .github/
│   └── workflows/
│       ├── deploy.yml              # AWS S3 への自動デプロイ
│       └── lighthouse.yml          # Lighthouse CI
├── e2e/
│   └── home.spec.ts                # E2E テスト（Playwright）
├── src/
│   ├── app/
│   │   ├── layout.tsx              # ルートレイアウト
│   │   ├── page.tsx                # ホームページ
│   │   ├── error.tsx               # エラーページ
│   │   ├── not-found.tsx           # 404 ページ
│   │   ├── sitemap.ts              # サイトマップ自動生成
│   │   ├── robots.ts               # robots.txt 自動生成
│   │   ├── opengraph-image.tsx     # OGP 画像自動生成
│   │   └── projects/               # 制作物ギャラリー
│   │       ├── page.tsx            #   一覧ページ
│   │       └── [id]/page.tsx       #   詳細ページ（JSON-LD 付き）
│   ├── components/
│   │   ├── home/                   # ホームページ用セクション
│   │   │   ├── SkillsSection.tsx   #   スキルセクション
│   │   │   ├── ExperienceSection.tsx #  プロジェクト経験セクション
│   │   │   ├── ContactSection.tsx  #   お問い合わせセクション
│   │   │   ├── ContactFormFields.tsx # フォームフィールド
│   │   │   └── ContactStatusAlerts.tsx # ステータスアラート
│   │   ├── sidebar/                # サイドバー用サブコンポーネント
│   │   │   ├── SidebarFooter.tsx   #   テーマ切替 + PDF リンク
│   │   │   └── CollapsibleLabel.tsx #  折りたたみラベル
│   │   ├── icons/                  # 共通アイコン
│   │   │   └── GitHubIcon.tsx
│   │   ├── projects/               # 制作物関連コンポーネント
│   │   ├── ErrorBoundary.tsx       # エラーバウンダリ
│   │   ├── HomePageClient.tsx      # ホームページ Client Component
│   │   ├── Sidebar.tsx             # サイドバーナビゲーション
│   │   ├── ScrollToTop.tsx         # トップに戻るボタン
│   │   └── ThemeProvider.tsx       # テーマコンテキスト
│   ├── hooks/
│   │   ├── useFocusTrap.ts         # フォーカストラップ（WCAG 準拠）
│   │   └── useRateLimit.ts         # クライアントサイドレートリミット
│   ├── lib/
│   │   ├── utils.ts                # cn() ユーティリティ（clsx + tailwind-merge）
│   │   └── validations.ts          # Zod バリデーションスキーマ
│   ├── config/
│   │   └── site.ts                 # サイト設定（SEO・OGP 等）
│   └── data/                       # プロジェクト・スキル・経歴データ
├── public/
│   ├── skill_sheet.pdf             # 技術経歴書 PDF
│   ├── demos/                      # Live Demo 用静的ファイル
│   └── thumbnails/                 # プロジェクトサムネイル
├── next.config.ts                  # Next.js 設定（静的エクスポート + バンドル分析）
├── playwright.config.ts            # Playwright E2E テスト設定
├── vitest.config.ts                # Vitest ユニットテスト設定
├── eslint.config.mjs               # ESLint 設定（jsx-a11y 含む）
├── .gitattributes                  # 改行コード統一（LF）
├── tsconfig.json                   # TypeScript 設定
└── package.json                    # 依存関係管理
```

---

## 🚢 デプロイ・CI/CD

このプロジェクトは **GitHub Actions** を使用して **AWS S3** に自動デプロイされます。

### デプロイフロー

1. `main` ブランチへのプッシュで自動トリガー
2. Node.js 環境のセットアップ
3. 依存関係のインストール（`npm ci`）
4. Next.js のビルド実行（静的ファイルを `out/` に生成）
5. AWS 認証情報の設定
6. 生成された静的ファイルを S3 バケットに同期（`aws s3 sync`）
7. CloudFront のキャッシュを無効化（オプション）

### CI パイプライン

- **型チェック**: `tsc --noEmit`
- **リント**: ESLint（jsx-a11y アクセシビリティルール含む）
- **ユニットテスト**: Vitest（68 テスト）
- **E2E テスト**: Playwright
- **Lighthouse CI**: パフォーマンス・アクセシビリティ計測

### GitHub Secrets（デプロイ用）

| シークレット名 | 説明 |
| --- | --- |
| `AWS_ACCESS_KEY_ID` | AWS アクセスキー ID |
| `AWS_SECRET_ACCESS_KEY` | AWS シークレットアクセスキー |
| `AWS_S3_BUCKET` | S3 バケット名 |
| `AWS_REGION` | AWS リージョン（デフォルト: `ap-northeast-1`） |

---

## 🏃 ローカル開発

### 環境変数

プロジェクトルートに `.env.local` を作成し、以下の環境変数を設定してください。

| 変数名 | 必須 | 説明 |
| --- | --- | --- |
| `NEXT_PUBLIC_FORMSPREE_ID` | 任意 | Formspree のフォーム ID（英数字）。未設定時は mailto: リンクにフォールバック |
| `NEXT_PUBLIC_GA_ID` | 任意 | Google Analytics の Measurement ID（例: `G-XXXXXXXXXX`） |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | 任意 | Google Search Console の所有権確認コード |

```bash
# .env.local の例
NEXT_PUBLIC_FORMSPREE_ID=xyzabcde
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### セットアップ

```bash
# リポジトリのクローン
git clone https://github.com/akarin0012/portfolio.git
cd portfolio

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認できます。

### ビルド

```bash
# 本番用ビルド（静的ファイルを out/ に生成）
npm run build

# ビルド結果の確認
npm run start
```

---

## 📜 npm スクリプト一覧

| コマンド | 説明 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | 本番用ビルド（静的エクスポート） |
| `npm run start` | ビルド結果のプレビュー |
| `npm run lint` | ESLint によるコード検査 |
| `npm run lint:fix` | ESLint の自動修正 |
| `npm run type-check` | TypeScript の型チェック |
| `npm run format` | Prettier によるコードフォーマット |
| `npm run format:check` | フォーマットのチェック（CI 用） |
| `npm run test` | Vitest ユニットテスト実行 |
| `npm run test:watch` | Vitest ウォッチモード |
| `npm run test:coverage` | カバレッジレポート付きテスト |
| `npm run test:e2e` | Playwright E2E テスト実行 |
| `npm run test:e2e:ui` | Playwright UI モードで E2E テスト |
| `npm run analyze` | バンドルサイズ分析 |

---

## 💡 今後の目標

レガシー技術（VBScript、C#、VB.NET）での実務経験を活かし、**Go**や**TypeScript**等のモダンな技術スタックへのリプレイス・移行案件に参画し、技術的な知見を拡げていきたいと考えています。

---

## 📞 お問い合わせ

ご興味をお持ちいただけましたら、お気軽にお問い合わせください。

- **GitHub**: [@akarin0012](https://github.com/akarin0012)
- **ポートフォリオ**: [ポートフォリオサイト](https://akarin0012.com)
- **技術経歴書**: [PDFダウンロード](/skill_sheet.pdf)

---

**Built with Next.js, TypeScript & Tailwind CSS**  
**Deployed automatically to AWS S3 via GitHub Actions**

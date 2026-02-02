# 💼 エンジニアポートフォリオ

> 3年目のWebエンジニアとして、バックエンドからフロントエンドまで幅広く開発に携わっています。

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![AWS](https://img.shields.io/badge/AWS-Cloud-orange?style=flat-square&logo=amazon-aws)](https://aws.amazon.com/)

## 🚀 このポートフォリオについて

このポートフォリオサイトは、私の技術スキルと経験を紹介するために作成しました。モダンなWeb技術を活用し、シンプルで信頼感のあるデザインを心がけています。

### ✨ 特徴

- **モダンな技術スタック**: Next.js 16 + TypeScript + Tailwind CSS
- **静的サイト生成**: AWS S3へのデプロイに対応した静的エクスポート
- **CI/CD自動化**: GitHub Actionsによる自動デプロイパイプライン
- **レスポンシブデザイン**: あらゆるデバイスで快適に閲覧可能
- **ダークモード**: 目に優しいダークテーマを採用

## 🛠️ 技術スタック

### バックエンド
- **C#** - エンタープライズアプリケーション開発
- **VB.NET** - レガシーシステムの保守・改修
- **ASP.NET** - Webアプリケーション開発

### フロントエンド
- **TypeScript** - 型安全な開発
- **Next.js** - Reactベースのフルスタックフレームワーク
- **Tailwind CSS** - ユーティリティファーストのCSSフレームワーク

### インフラ・DevOps
- **AWS** - クラウドインフラストラクチャ
- **GitHub Actions** - CI/CDパイプライン
- **S3** - 静的サイトホスティング

## 📋 プロジェクト構成

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # AWS S3への自動デプロイ
├── src/
│   └── app/
│       ├── layout.tsx          # ルートレイアウト
│       ├── page.tsx             # メインページ
│       └── globals.css          # グローバルスタイル
├── next.config.ts               # Next.js設定（静的エクスポート）
└── package.json
```

## 🏃 ローカル開発

### セットアップ

```bash
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
```

## 🚢 デプロイ

このプロジェクトはGitHub Actionsを使用してAWS S3に自動デプロイされます。

### デプロイフロー

1. `main`ブランチへのプッシュで自動トリガー
2. Next.jsのビルドを実行
3. 生成された静的ファイルをS3バケットに同期
4. CloudFrontのキャッシュを無効化（オプション）

### 必要な環境変数

GitHubリポジトリのシークレットに以下を設定してください：

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_S3_BUCKET_NAME`
- `AWS_CLOUDFRONT_DISTRIBUTION_ID` (オプション)

## 💡 スキルハイライト

- **フルスタック開発**: バックエンドAPIからフロントエンドUIまで一貫して開発可能
- **モダンな開発手法**: TypeScript、コンポーネント設計、CI/CDパイプラインの構築
- **クラウド活用**: AWSを活用したスケーラブルなインフラ設計
- **コード品質**: 型安全性、ESLint、ベストプラクティスの実践

## 📈 経歴

3年目のWebエンジニアとして、以下のような経験を積んでいます：

- Webアプリケーションの設計・開発・保守
- バックエンドAPIの設計・実装
- フロントエンド開発（React/Next.js）
- クラウドインフラの構築・運用
- チーム開発でのコードレビュー・技術共有

## 📞 お問い合わせ

ご興味をお持ちいただけましたら、お気軽にお問い合わせください。

---

**Built with ❤️ using Next.js & TypeScript**

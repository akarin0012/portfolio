# ADR-006: ファビコン・OGP画像の静的アセット追加

## ステータス

採用済み

## コンテキスト

プロダクションリリース前の監査で、`layout.tsx`・`manifest.json`・`browserconfig.xml` から参照されている静的画像アセットが実際には存在しないことが判明した。

### 問題 1: `public/icon.png` が存在しない

`layout.tsx` の `metadata.icons` で 4 つの参照、`manifest.json` で 2 つの参照、`browserconfig.xml` で 1 つの参照があるが、ファイル自体が存在しない。

```tsx
// layout.tsx — 参照はあるがファイルがない
icons: {
  icon: [
    { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    { url: '/icon.png', sizes: '16x16', type: 'image/png' },
  ],
  apple: [
    { url: '/icon.png', sizes: '180x180', type: 'image/png' },
  ],
  shortcut: '/icon.png',
},
```

**影響:**
- ブラウザのタブにファビコンが表示されない
- PWA インストール時にアイコンが表示されない
- ブックマークにアイコンが付かない

### 問題 2: `public/og-image.png` が存在しない

`siteConfig.ogImage` が `/og-image.png` を参照しているが、ファイルが存在しない。動的 OGP 画像（`opengraph-image.tsx`）は各ページに存在するが、静的フォールバックが欠如していた。

```ts
// config/site.ts — 参照はあるがファイルがない
ogImage: '/og-image.png',
```

**影響:**
- 動的 OGP 生成に対応していないプラットフォームで画像が表示されない
- SNS シェア時の視覚的インパクトが低下

## 決定

### 1. `public/icon.png` の作成

サイトブランド「Akarin」の頭文字「A」をモチーフにした 512x512px のアイコンを作成。

- **カラースキーム**: ダークテーマ準拠（背景 #18181b、文字 #f4f4f5、アクセント #60a5fa）
- **デザイン**: ジオメトリックな「A」ロゴ、ブルーのアクセントライン付き
- **フォーマット**: PNG（全ブラウザ・デバイスとの互換性を優先）
- **サイズ**: 512x512px で作成し、ブラウザが必要なサイズにスケールダウン

### 2. `public/og-image.png` の作成

1200x630px の Open Graph 画像を作成。

- **レイアウト**: 左に名前・肩書・技術スタック、右に抽象的なコードパターン
- **内容**: 「茅嶋 伸一郎」「システムエンジニア / Software Engineer」「C# / .NET / Next.js / TypeScript / React」
- **カラー**: ダークテーマ準拠
- **サイズ**: 1200x630px（OGP 推奨サイズ）

## 理由

- **単一ファイルでの運用**: 複数サイズの個別ファイル（favicon-16.png, favicon-32.png, apple-touch-icon.png 等）を管理する代わりに、512x512px の単一ファイルをブラウザにスケーリングさせる方式を採用。アセット管理の複雑さを最小化しつつ、全デバイスで表示可能にする
- **PNG フォーマット**: ICO や SVG ではなく PNG を選択した理由は、`manifest.json` と `browserconfig.xml` が PNG を要求しており、Apple デバイスも PNG を推奨しているため
- **ダークテーマベース**: サイトのデフォルトテーマがダークモードであり、ブランドの一貫性を維持するためダークベースのデザインを採用
- **静的 OGP + 動的 OGP の二重構成**: 各ページには `opengraph-image.tsx` による動的生成があるが、静的フォールバックとして `og-image.png` を配置。OGP キャッシュやクローラーの挙動に依存しない確実な表示を保証する

## トレードオフ・注意点

- **アイコンの品質**: 512px から 16px への縮小時に、デザインの細部（ブルーのアクセントライン等）が視認しにくくなる。将来的にサイズ別の最適化アイコンを用意することで改善可能
- **ファイルサイズ**: icon.png（約 272KB）は最適化の余地がある。WebP 版の追加や、TinyPNG 等による圧縮を今後検討
- **OGP 画像の更新**: プロフィール情報（技術スタック、肩書等）が変更された場合、手動で OGP 画像を再生成する必要がある

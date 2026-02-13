# ADR-002: JSON-LD 構造化データの URL 上書きバグ修正とテストモック改善

## ステータス

採用済み

## コンテキスト

ポートフォリオの品質調査で以下の 2 つの問題が検出された。

### 問題 1: JSON-LD の `url` が `demoUrl` で上書きされる（SEO バグ）

プロジェクト詳細ページの JSON-LD（`CreativeWork` スキーマ）で、正規 URL の設定後に
`demoUrl` が存在する場合のスプレッドで `url` プロパティが上書きされていた。

```tsx
// 修正前: demoUrl があると url が上書きされる
const jsonLd = {
  '@type': 'CreativeWork',
  url: absoluteUrl(`/projects/${project.id}`),  // ← 正規URL
  // ... 中略 ...
  ...(project.demoUrl && { url: project.demoUrl }), // ← 上書き！
};
```

JavaScript のオブジェクトスプレッドは後勝ちのため、`demoUrl` を持つプロジェクト
（5 件中 4 件）で JSON-LD の `url` がデモサイトの URL になっていた。

**影響:**

- Google の検索結果で、ポートフォリオの詳細ページではなくデモサイトが正規 URL として扱われる
- 構造化データテスト（リッチリザルトテスト）で意図しない URL が表示される
- 企業がポートフォリオを評価する際、SEO の基本ミスとして目に留まるリスク

### 問題 2: Framer Motion テストモックの props リーク

`ProjectGrid.test.tsx` と `ProjectFilterBar.test.tsx` の Framer Motion モックが、
`whileHover`・`whileTap` 等の motion 固有 props をフィルタリングせず
ネイティブ DOM 要素にそのまま渡していた。

```tsx
// 修正前: motion props がそのまま DOM に渡される
vi.mock('framer-motion', () => ({
  motion: {
    article: ({ children, ...props }) =>
      <article {...props}>{children}</article>,  // ← whileHover 等が DOM へ
  },
}));
```

**影響:**

- テスト実行時に `React does not recognize the 'whileHover' prop on a DOM element` 等の警告が stderr に出力される
- 警告ノイズが実際のエラーを見落とす原因になる
- CI の出力ログが汚れる

## 決定

### JSON-LD: `url` → `sameAs` への変更

デモ URL は `sameAs` プロパティに格納する。`sameAs` は schema.org で
「そのエンティティと同一であることを示す URL」として定義されており、
外部デモサイトの参照に適切である。

```tsx
// 修正後: url は正規URL、デモURLは sameAs に格納
const jsonLd = {
  '@type': 'CreativeWork',
  url: absoluteUrl(`/projects/${project.id}`),
  // ... 中略 ...
  ...(project.demoUrl && { sameAs: project.demoUrl }),
};
```

### テストモック: motion 固有 props の除外

Framer Motion 固有の props（`whileHover`、`whileTap`、`initial`、`animate`、
`exit`、`transition`、`variants` 等）をデストラクチャリングで除外してから
ネイティブ DOM 要素にスプレッドする。

```tsx
// 修正後: motion 固有 props を除外して DOM 警告を防止
vi.mock('framer-motion', () => ({
  motion: {
    article: ({
      children,
      whileHover: _wh,
      whileTap: _wt,
      initial: _i,
      animate: _a,
      exit: _e,
      transition: _tr,
      variants: _v,
      ...props
    }) => <article {...props}>{children}</article>,
  },
}));
```

## 理由

### JSON-LD 修正

- `url` はそのコンテンツの正規 URL であるべきで、外部デモリンクではない（schema.org 仕様）
- `sameAs` は「同一のものを示す別の URL」を表すプロパティで、デモサイトとの関連付けに適切
- 最小限の変更（1 プロパティ名の変更）で SEO バグが解消される

### テストモック修正

- React が認識しない props を DOM に渡さないのは React の基本的なベストプラクティス
- テスト出力のノイズが除去され、本当に重要な警告を見落とさなくなる
- 各テストファイルで明示的に除外するため、将来追加するテストでも同じパターンを踏襲しやすい

## トレードオフ・注意点

- `sameAs` は厳密には「同一のエンティティを指す URL」であり、デモサイトが元プロジェクトと完全に同一かは解釈による。ただし Google は `sameAs` を柔軟に解釈しており、関連 URL の提供として問題ない
- テストモックで除外する props は Framer Motion の更新で増える可能性がある。新しい motion props が追加された場合はモックの更新が必要
- 将来的にテストファイルが増えた場合、共通モックファクトリへの集約を検討すべき

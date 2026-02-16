# ADR-005: .cursorrules.md 準拠のためのリファクタリング

## ステータス

採用済み

## コンテキスト

プロジェクトのコーディング規約 `.cursorrules.md` に対してコードベース全体の準拠状況を監査した結果、以下の 3 点で規約違反が確認された。

### 問題 1: Tailwind CSS のマジックナンバー使用

`ProjectLiveDemo.tsx` の iframe に `h-[420px]` という任意のピクセル値が使用されていた。

```tsx
// 修正前: テーマ定義にない任意のピクセル値
<iframe className="h-[420px] w-full border-0" />
```

`.cursorrules.md` では「マジックナンバー（`top-[123px]` など）を避け、可能な限りテーマ定義に沿った実装をする」と規定されている。

### 問題 2: テンプレートリテラルによる className 結合

複数のコンポーネントで、条件分岐を含む className の結合にテンプレートリテラル（`` `${...}` ``）が使用されていた。

```tsx
// 修正前: テンプレートリテラルによる結合
className={`${getInputClass(!!fieldErrors.message)} resize-none`}
className={`mr-3 h-3 w-3 rounded-full ${category.dotColor}`}
className={`overflow-x-auto ... ${isDark ? '...' : '...'}`}
className={`${geistSans.variable} ${geistMono.variable} antialiased ...`}
```

`.cursorrules.md` では「複雑な条件分岐クラスは `clsx` または `tailwind-merge` を使用する」と規定されており、プロジェクトには既に `cn()` ユーティリティ（`clsx` + `tailwind-merge`）が存在するにもかかわらず、一部のファイルで使用されていなかった。

**該当ファイル:**
- `src/components/home/ContactFormFields.tsx`（1 箇所）
- `src/components/home/SkillsSection.tsx`（3 箇所）
- `src/components/projects/ProjectMermaidDiagram.tsx`（1 箇所）
- `src/app/layout.tsx`（1 箇所）

### 問題 3: `as string` 型アサーションによる型安全性の低下

`ContactSection.tsx` で `FormData.get()` の戻り値を `as string` でアサーションしており、`null` の可能性を無視していた。

```tsx
// 修正前: FormData.get() は FormDataEntryValue | null を返すが null を無視
const rawData = {
  name: formData.get('name') as string,
  email: formData.get('email') as string,
  message: formData.get('message') as string,
};
```

`.cursorrules.md` では「`any` 型の使用を禁止し、型安全を徹底する」と規定されている。`as string` は `any` ではないが、型アサーションによって `null` チェックをバイパスしており、型安全の精神に反していた。

## 決定

### 1. マジックナンバーの除去

`h-[420px]` を `aspect-video`（16:9 アスペクト比）に置き換えた。

```tsx
// 修正後: Tailwind の標準ユーティリティを使用
<iframe className="aspect-video w-full border-0" />
```

### 2. テンプレートリテラルから `cn()` への統一

全 4 ファイル・計 6 箇所のテンプレートリテラルを `cn()` に置き換えた。

```tsx
// 修正後: cn() による結合
className={cn(getInputClass(!!fieldErrors.message), 'resize-none')}
className={cn('mr-3 h-3 w-3 rounded-full', category.dotColor)}
className={cn(
  'overflow-x-auto rounded-lg p-4 [&_svg]:mx-auto [&_svg]:max-w-full',
  isDark ? 'keep-dark bg-surface-inset/90' : 'border border-divider-subtle bg-surface-alt',
)}
className={cn(geistSans.variable, geistMono.variable, 'antialiased min-h-screen ...')}
```

### 3. 型アサーションの安全な代替への置き換え

`as string` を `String(... ?? '')` に置き換え、`null` の場合は空文字列にフォールバックするようにした。空文字列は後続の Zod バリデーション（`min(1, '...')` ）で適切にエラーとして処理される。

```tsx
// 修正後: null-safe な変換
const rawData = {
  name: String(formData.get('name') ?? ''),
  email: String(formData.get('email') ?? ''),
  message: String(formData.get('message') ?? ''),
};
```

## 理由

- **`aspect-video`**: iframe のデモ表示は動画やWebアプリのプレビューが主であり、16:9 のアスペクト比が最も自然。コンテナの幅に応じてレスポンシブに高さが変化するため、マジックナンバーよりも柔軟性が高い
- **`cn()` への統一**: プロジェクト内に既に `cn()` ユーティリティが存在し、`Sidebar.tsx` や `ProjectFilterBar.tsx` では正しく使用されていた。一部のファイルで使用されていなかったのは単なる統一漏れであり、`cn()` に統一することで Tailwind クラスの競合解決も自動的に行われるようになる
- **`String(... ?? '')`**: `as string` による型アサーションは TypeScript のコンパイラチェックをバイパスする。`?? ''` によるフォールバックは、`null` を明示的に処理しつつ Zod バリデーション層に判定を委ねる設計であり、関心の分離が保たれる

## トレードオフ・注意点

- **`aspect-video` への変更**: 固定高さ（420px）から比率ベースに変わるため、非常に幅の狭い画面では iframe の表示領域が小さくなる可能性がある。ただし、現状のレスポンシブ設計（モバイルでも十分な幅を確保）では問題にならないと判断
- **`cn()` の呼び出しコスト**: テンプレートリテラルと比較して `clsx` + `twMerge` の関数呼び出しが追加されるが、パフォーマンスへの影響は無視できるレベル。可読性と保守性の向上が上回る
- **`String()` のエッジケース**: `FormData.get()` が `File` オブジェクトを返す可能性がある（`type="file"` の場合）。本フォームではテキスト入力のみのため `String()` で安全だが、ファイルアップロードを追加する場合は別途対応が必要

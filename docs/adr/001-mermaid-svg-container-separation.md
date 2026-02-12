# ADR-001: Mermaid SVG 出力先の React DOM からの分離

## ステータス

採用済み

## コンテキスト

プロジェクト詳細ページでは、Mermaid.js を使って技術構成図を SVG として描画している。
Mermaid はレンダリング結果を `innerHTML` で DOM に直接挿入する仕組みのため、React の仮想 DOM 管理とは本質的に相性が悪い。

従来の実装では、ローディングスピナー（React が管理する子要素）と Mermaid の SVG 出力先が**同一の div 要素**を共有していた。

```tsx
// 修正前: containerRef が外側の div に付いている
<div ref={containerRef} className="...">
  {!rendered && (
    <div className="flex h-32 items-center justify-center">
      <div className="h-6 w-6 animate-spin ..." />
    </div>
  )}
</div>
```

この構造では、以下のシナリオで `removeChild` エラーが発生していた。

1. Mermaid の `render()` が非同期で実行される
2. レンダリング完了時に `containerRef.current.innerHTML = svg` で DOM を上書き
3. React が次のレンダリングサイクルでスピナーの `removeChild` を試みる
4. しかしスピナーの DOM ノードはすでに `innerHTML` の上書きで消失済み
5. **`NotFoundError: Failed to execute 'removeChild' on 'Node'`** が発生

結果として、制作物ページで Mermaid ダイアグラムが正常に表示されない不具合が起きていた。

## 決定

Mermaid の SVG 出力専用の `<div ref={containerRef} />` を新設し、React が管理する子要素（ローディングスピナー）とは**別の DOM ノード**に分離する。

```tsx
// 修正後: containerRef は専用の内側 div に分離
<div className="...">
  {!rendered && (
    <div className="flex h-32 items-center justify-center">
      <div className="h-6 w-6 animate-spin ..." />
    </div>
  )}
  {/*
   * Mermaid の SVG 出力先（innerHTML で直接操作するため、
   * React 管理の子要素とは別の div に分離して removeChild エラーを防止）
   */}
  <div ref={containerRef} />
</div>
```

## 理由

- **React と命令的 DOM 操作の共存パターン**として、React 公式ドキュメントでも「React が管理しない DOM ノード」を ref で確保し、その中で命令的操作を行うことが推奨されている
- `containerRef` を専用 div に移すだけの最小限の変更で、既存のスタイリングやローディング表示のロジックに影響を与えずに修正できる
- Mermaid の `innerHTML` 書き込みが React の reconciliation と干渉しなくなるため、テーマ切替時の再レンダリングでも安定動作する

## トレードオフ・注意点

- DOM 構造に空の `<div>` が 1 つ増えるが、レイアウトへの影響は無視できるレベル
- 今後 Mermaid 以外にも命令的に DOM を操作するライブラリを導入する場合、同様のパターン（専用 ref コンテナの分離）を適用する必要がある
- Mermaid 自体が将来的に React コンポーネントとしての描画をサポートすれば、`innerHTML` 操作自体が不要になる可能性がある

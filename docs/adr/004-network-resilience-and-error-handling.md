# ADR-004: ネットワーク耐性の強化とエラーハンドリング改善

## ステータス

採用済み

## コンテキスト

ポートフォリオサイトの運用・保守性に関して、以下の課題が存在していた。

### 問題 1: `.env.example` テンプレートの欠如

プロジェクトには 4 つの環境変数（`NEXT_PUBLIC_FORMSPREE_ID`, `NEXT_PUBLIC_GA_ID`,
`NEXT_PUBLIC_GOOGLE_VERIFICATION`, `NEXT_PUBLIC_SITE_URL`）が使用されているが、
`.env.example` テンプレートファイルが存在しなかった。

- 新規開発者がどの環境変数が必要か把握できない
- 環境変数の設定漏れによるランタイムエラーのリスク
- CI/CD パイプラインのセットアップ時に手探りが必要

### 問題 2: フォーム送信の fetch にタイムアウトがない

`ContactSection` の Formspree API コールに `AbortController` によるタイムアウトが
設定されておらず、以下の問題があった。

```tsx
// 修正前: タイムアウトなし — リクエストが永遠にハングする可能性
const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
  method: 'POST',
  body: new FormData(form),
  headers: { Accept: 'application/json' },
});
```

- ネットワーク障害時にリクエストが無期限にハングし、ユーザーが「送信中...」のまま待たされる
- ブラウザのメモリリーク・コネクション枯渇のリスク
- ユーザーが送信ボタンを連打してしまう二次的な問題

### 問題 3: catch ブロックでエラー情報が破棄されている

`ContactSection` の catch ブロックが空で、エラーの原因（ネットワーク障害、タイムアウト、
CORS エラーなど）が一切ログに出力されていなかった。

```tsx
// 修正前: エラー情報が完全に破棄される
} catch {
  setFormStatus('error');
}
```

- 本番環境での障害調査が困難
- タイムアウトとネットワークエラーの区別がつかない

### 問題 4: クリップボードコピー失敗時のフィードバックがない

`ProjectShareButtons` のクリップボード操作において、Clipboard API と
`document.execCommand` フォールバックの両方が失敗した場合、ユーザーへのフィードバックが
一切なく、サイレントに失敗していた。

```tsx
// 修正前: コピー不可の場合は何もしない
} catch {
  // コピー不可の場合は何もしない
}
```

## 決定

### 1. `.env.example` テンプレートの追加

プロジェクトルートに `.env.example` を作成し、すべての環境変数をドキュメント付きで記載。

```bash
# Formspree フォーム ID（お問い合わせフォーム用）
NEXT_PUBLIC_FORMSPREE_ID=
# Google Analytics Measurement ID
NEXT_PUBLIC_GA_ID=
# Google Search Console 検証コード
NEXT_PUBLIC_GOOGLE_VERIFICATION=
# サイトURL（デフォルト: https://akarin0012.com）
NEXT_PUBLIC_SITE_URL=https://akarin0012.com
```

### 2. AbortController による 30 秒タイムアウトの追加

`ContactSection` の fetch リクエストに `AbortController` を導入し、
30 秒でリクエストを自動中断するようにした。

```tsx
// 修正後: 30秒のタイムアウト付き
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 30_000);
try {
  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    body: new FormData(form),
    headers: { Accept: 'application/json' },
    signal: controller.signal,
  });
  // ...
} catch (err) {
  if (err instanceof DOMException && err.name === 'AbortError') {
    console.error('フォーム送信がタイムアウトしました (30秒)');
  } else {
    console.error('フォーム送信エラー:', err);
  }
  setFormStatus('error');
} finally {
  clearTimeout(timeoutId);
}
```

### 3. エラーハンドリングの改善

catch ブロックでエラーオブジェクトを受け取り、タイムアウトとその他のエラーを
区別してログ出力するようにした。`finally` ブロックでタイマーのクリーンアップも確実に行う。

### 4. クリップボードコピー失敗時のユーザーフィードバック追加

`ProjectShareButtons` のフォールバックコピーが失敗した場合に、
「コピーできませんでした」というメッセージを 3 秒間表示するようにした。
`role="alert"` 属性により、スクリーンリーダーでもエラーが通知される。

```tsx
// 修正後: 失敗時にフィードバックを表示
} catch {
  console.error('クリップボードへのコピーに失敗しました');
  setCopyFailed(true);
  setTimeout(() => setCopyFailed(false), 3000);
}

// UI フィードバック
{copyFailed && (
  <span role="alert" className="text-xs text-red-500">
    コピーできませんでした
  </span>
)}
```

## 理由

- **30 秒タイムアウト**: Formspree の平均レスポンスタイムは数秒以内であり、
  30 秒を超える場合はネットワーク障害と見なして中断するのが合理的。
  ユーザーが無限に待たされることを防ぎ、エラー表示から再試行できるようにする
- **AbortController**: `XMLHttpRequest.timeout` ではなく `AbortController` を
  採用した理由は、Fetch API のネイティブなキャンセル機構であり、
  React の useEffect クリーンアップとも親和性が高いため
- **finally でのクリーンアップ**: 成功・失敗に関わらず `clearTimeout` を呼ぶことで、
  タイマーリークを防止する
- **console.error**: エラーバウンダリは既に実装済みだが、ネットワークエラーは
  キャッチされた上で `'error'` 状態にフォールバックするため、
  デバッグ用に `console.error` でエラー詳細を出力する
- **`.env.example`**: 12-Factor App の原則に基づき、環境変数の仕様をコードと共に
  バージョン管理する。`.env.local` は `.gitignore` 済みなのでシークレットは安全
- **クリップボードフィードバック**: サイレントな失敗はユーザビリティの原則に反する。
  `role="alert"` による通知はアクセシビリティにも配慮した実装

## トレードオフ・注意点

- **タイムアウト値 30 秒はハードコード**: 現時点で設定ファイルへの外出しは不要と判断。
  将来的に API エンドポイントが増えた場合は共通の timeout ユーティリティへの抽出を検討
- **console.error は本番環境でも出力される**: 構造化ログ基盤（Sentry 等）を導入する際は、
  console.error をログサービスへのレポートに置き換えることを検討
- **クリップボードフォールバック自体が非推奨 API**: `document.execCommand('copy')` は
  Web 標準から非推奨となっている。Clipboard API の対応ブラウザカバレッジが十分になった
  時点でフォールバックコードの削除を検討

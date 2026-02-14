# ADR-003: レートリミットのカウントダウン自動更新と自動復帰

## ステータス

採用済み

## コンテキスト

お問い合わせフォームにはクライアントサイドのレートリミット機能（1分間に3回まで）があり、
制限超過時に「X秒後に再度お試しください」というメッセージを表示する。
しかし、以下の3つの問題があった。

### 問題 1: カウントダウンが静的で更新されない

`ContactSection` で `getRetryAfterSeconds()` をレンダー時に一度だけ評価し、
その値を `ContactStatusAlerts` に渡していた。

```tsx
// 修正前: レンダー時に一度だけ評価される静的な値
<ContactStatusAlerts
  formStatus={formStatus}
  retryAfterSeconds={getRetryAfterSeconds()}
/>
```

結果として「47秒後に再度お試しください」のような表示が、
ユーザーがページをリロードするまで固定されたまま変わらなかった。

### 問題 2: `getRetryAfterSeconds` がタイムスタンプをフィルタリングしない

`checkRateLimit()` はウィンドウ期間外のタイムスタンプを除外してから判定するのに対し、
`getRetryAfterSeconds()` は `timestamps` 配列をそのまま使っていた。

```ts
// 修正前: 期限切れのタイムスタンプが残ったまま計算
const getRetryAfterSeconds = useCallback((): number => {
  if (timestamps.current.length < maxRequests) { // フィルタリングなし
    return 0;
  }
  const oldest = timestamps.current[0]; // 期限切れの可能性あり
  // ...
}, [maxRequests, windowMs]);
```

### 問題 3: `rate-limited` 状態から自動復帰しない

`formStatus` を `'rate-limited'` に設定した後、それを `'idle'` に戻すトリガーがなかった。
ユーザーはページをリロードしない限り、フォームがずっと送信不可のまま残された。

## 決定

### 1. `useRateLimit` フックにリアルタイムカウントダウンを内蔵

`checkRateLimit()` が `false` を返した時点でフック内部で `retryCountdown` state を
自動開始し、1秒ごとに `setTimeout` チェーンでデクリメントする。

```ts
// checkRateLimit が制限超過を検知したら自動でカウントダウン開始
if (timestamps.current.length >= maxRequests) {
  const oldest = timestamps.current[0];
  if (oldest !== undefined) {
    const remaining = windowMs - (now - oldest);
    setRetryCountdown(Math.max(1, Math.ceil(remaining / 1000)));
  }
  return false;
}

// setTimeout チェーンによるカウントダウン
useEffect(() => {
  if (retryCountdown <= 0) return;
  const timer = setTimeout(() => {
    setRetryCountdown((prev) => prev - 1);
  }, 1_000);
  return () => clearTimeout(timer);
}, [retryCountdown]);
```

### 2. `ContactSection` から `'rate-limited'` 状態を削除

`formStatus` の型から `'rate-limited'` を除去し、レートリミット状態を
`retryCountdown > 0` から派生させる。これにより:

- `formStatus` への `setState('rate-limited')` が不要になる
- カウントダウンが 0 になると自動的にフォームが再有効化される
- `ContactSection` の cyclomatic complexity が 10 → 8 に戻る

```tsx
// 修正後: レートリミット状態はフックから派生
const { checkRateLimit, retryCountdown } = useRateLimit({ ... });
const isBusy = formStatus === 'sending' || retryCountdown > 0;
```

### 3. `ContactStatusAlerts` の優先順位変更

レートリミット表示をエラー表示より優先するよう判定順序を変更。
`formStatus === 'rate-limited'` の代わりに `retryAfterSeconds > 0` で判定する。

### 4. `getRetryAfterSeconds` のタイムスタンプフィルタリング追加

`checkRateLimit` と同様に、ウィンドウ期間外のタイムスタンプを除外してから
残り秒数を計算するよう修正。

## 理由

- **setTimeout チェーン**: `setInterval` と異なり、各ステップで `useEffect` の
  クリーンアップが効くため、コンポーネントのアンマウント時にタイマーがリークしない。
  また `retryCountdown` が依存配列に入るため、React の lifecycle と同期する
- **状態の派生**: `'rate-limited'` を `formStatus` から削除し `retryCountdown > 0` で
  派生させることで、カウントダウン終了時の自動復帰に別途 `setState` や `useEffect` が
  不要になる。React Compiler の `set-state-in-effect` ルールにも抵触しない
- **フックへのロジック集約**: カウントダウンのタイマー管理をフック内に閉じ込めることで、
  利用側コンポーネントの複雑度を増やさずにリアクティブな UI を実現

## トレードオフ・注意点

- `setTimeout` チェーンは `setInterval` に比べ、各ティックで微小な遅延（useEffect 再実行コスト）が
  発生するが、1秒単位のカウントダウンでは知覚できないレベル
- `retryCountdown` はクライアントサイドの状態のため、タブが非アクティブ時に
  ブラウザがタイマーをスロットルする可能性がある。ただしレートリミット自体が
  UX 向上目的の機能であり、厳密な精度は不要
- `useRateLimit` の API に `retryCountdown` が追加されたため、
  既存のテストで `vi.advanceTimersByTime` を `act()` で包む必要が生じた

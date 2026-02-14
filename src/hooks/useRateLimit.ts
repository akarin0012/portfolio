import { useCallback, useEffect, useRef, useState } from 'react';

interface UseRateLimitOptions {
  /** 許可する最大リクエスト数 */
  maxRequests: number;
  /** ウィンドウ期間（ミリ秒） */
  windowMs: number;
}

interface UseRateLimitReturn {
  /** レートリミットをチェックし、許可されていれば true を返す（制限超過時はカウントダウンを自動開始） */
  checkRateLimit: () => boolean;
  /** 次のリクエストが可能になるまでの残り秒数（制限中でなければ 0） */
  getRetryAfterSeconds: () => number;
  /** リアルタイムに更新されるカウントダウン（秒）。0 = 制限なし */
  retryCountdown: number;
}

/**
 * クライアントサイドのレートリミットフック
 * フォーム送信のスパム防止に使用する
 *
 * 制約: クライアントサイドのみの実装のため、ブラウザのリロードや
 * 開発者ツールからバイパス可能。UX 向上とカジュアルなスパム防止が目的であり、
 * 悪意のある攻撃の完全な防止にはサーバーサイドのレートリミットが必要。
 *
 * @example
 * const { checkRateLimit, retryCountdown } = useRateLimit({
 *   maxRequests: 3,
 *   windowMs: 60_000, // 1分間に3回まで
 * });
 *
 * // checkRateLimit() が false を返すと retryCountdown が自動的にカウントダウン開始
 * // retryCountdown が 0 になるとフォームが自動的に再有効化される
 */
export function useRateLimit({
  maxRequests,
  windowMs,
}: UseRateLimitOptions): UseRateLimitReturn {
  const timestamps = useRef<number[]>([]);
  const [retryCountdown, setRetryCountdown] = useState(0);

  const checkRateLimit = useCallback((): boolean => {
    const now = Date.now();
    // ウィンドウ期間外のタイムスタンプを除去
    timestamps.current = timestamps.current.filter(
      (ts) => now - ts < windowMs,
    );

    if (timestamps.current.length >= maxRequests) {
      // 制限超過: カウントダウンを自動開始
      const oldest = timestamps.current[0];
      if (oldest !== undefined) {
        const remaining = windowMs - (now - oldest);
        setRetryCountdown(Math.max(1, Math.ceil(remaining / 1000)));
      }
      return false;
    }

    timestamps.current.push(now);
    return true;
  }, [maxRequests, windowMs]);

  const getRetryAfterSeconds = useCallback((): number => {
    const now = Date.now();
    // checkRateLimit と同様にウィンドウ期間外のタイムスタンプを除外して判定
    const valid = timestamps.current.filter((ts) => now - ts < windowMs);
    if (valid.length < maxRequests) {
      return 0;
    }
    const oldest = valid[0];
    if (oldest === undefined) {
      return 0;
    }
    const remaining = windowMs - (now - oldest);
    return Math.max(0, Math.ceil(remaining / 1000));
  }, [maxRequests, windowMs]);

  // 1秒ごとにカウントダウン（setTimeout チェーンで各ステップを管理）
  // setTimeout コールバック内の setState は非同期のため react-hooks/set-state-in-effect に抵触しない
  useEffect(() => {
    if (retryCountdown <= 0) return;
    const timer = setTimeout(() => {
      setRetryCountdown((prev) => prev - 1);
    }, 1_000);
    return () => clearTimeout(timer);
  }, [retryCountdown]);

  return { checkRateLimit, getRetryAfterSeconds, retryCountdown };
}

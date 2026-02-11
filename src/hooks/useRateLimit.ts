import { useCallback, useRef } from 'react';

interface UseRateLimitOptions {
  /** 許可する最大リクエスト数 */
  maxRequests: number;
  /** ウィンドウ期間（ミリ秒） */
  windowMs: number;
}

interface UseRateLimitReturn {
  /** レートリミットをチェックし、許可されていれば true を返す */
  checkRateLimit: () => boolean;
  /** 次のリクエストが可能になるまでの残り秒数（制限中でなければ 0） */
  getRetryAfterSeconds: () => number;
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
 * const { checkRateLimit, getRetryAfterSeconds } = useRateLimit({
 *   maxRequests: 3,
 *   windowMs: 60_000, // 1分間に3回まで
 * });
 */
export function useRateLimit({
  maxRequests,
  windowMs,
}: UseRateLimitOptions): UseRateLimitReturn {
  const timestamps = useRef<number[]>([]);

  const checkRateLimit = useCallback((): boolean => {
    const now = Date.now();
    // ウィンドウ期間外のタイムスタンプを除去
    timestamps.current = timestamps.current.filter(
      (ts) => now - ts < windowMs,
    );

    if (timestamps.current.length >= maxRequests) {
      return false;
    }

    timestamps.current.push(now);
    return true;
  }, [maxRequests, windowMs]);

  const getRetryAfterSeconds = useCallback((): number => {
    if (timestamps.current.length < maxRequests) {
      return 0;
    }
    const oldest = timestamps.current[0];
    if (oldest === undefined) {
      return 0;
    }
    const remaining = windowMs - (Date.now() - oldest);
    return Math.max(0, Math.ceil(remaining / 1000));
  }, [maxRequests, windowMs]);

  return { checkRateLimit, getRetryAfterSeconds };
}

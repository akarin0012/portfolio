import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRateLimit } from '@/hooks/useRateLimit';

describe('useRateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('制限内のリクエストを許可する', () => {
    const { result } = renderHook(() =>
      useRateLimit({ maxRequests: 3, windowMs: 60_000 }),
    );

    let allowed: boolean;
    act(() => { allowed = result.current.checkRateLimit(); });
    expect(allowed!).toBe(true);

    act(() => { allowed = result.current.checkRateLimit(); });
    expect(allowed!).toBe(true);

    act(() => { allowed = result.current.checkRateLimit(); });
    expect(allowed!).toBe(true);
  });

  test('制限を超えたリクエストを拒否する', () => {
    const { result } = renderHook(() =>
      useRateLimit({ maxRequests: 2, windowMs: 60_000 }),
    );

    act(() => { result.current.checkRateLimit(); });
    act(() => { result.current.checkRateLimit(); });

    let allowed: boolean;
    act(() => { allowed = result.current.checkRateLimit(); });
    expect(allowed!).toBe(false);
  });

  test('ウィンドウ期間後にリクエストが再度許可される', () => {
    const { result } = renderHook(() =>
      useRateLimit({ maxRequests: 1, windowMs: 10_000 }),
    );

    act(() => { result.current.checkRateLimit(); });

    let allowed: boolean;
    act(() => { allowed = result.current.checkRateLimit(); });
    expect(allowed!).toBe(false);

    // 10秒経過
    vi.advanceTimersByTime(10_000);

    act(() => { allowed = result.current.checkRateLimit(); });
    expect(allowed!).toBe(true);
  });

  test('制限中は残り秒数を返す', () => {
    const { result } = renderHook(() =>
      useRateLimit({ maxRequests: 1, windowMs: 30_000 }),
    );

    act(() => { result.current.checkRateLimit(); });

    // 10秒経過
    vi.advanceTimersByTime(10_000);

    let seconds: number;
    act(() => { seconds = result.current.getRetryAfterSeconds(); });
    expect(seconds!).toBeGreaterThan(0);
    expect(seconds!).toBeLessThanOrEqual(20);
  });

  test('制限中でなければ残り秒数は0', () => {
    const { result } = renderHook(() =>
      useRateLimit({ maxRequests: 3, windowMs: 60_000 }),
    );

    let seconds: number;
    act(() => { seconds = result.current.getRetryAfterSeconds(); });
    expect(seconds!).toBe(0);
  });
});

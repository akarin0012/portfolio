import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * clsx + tailwind-merge を統合したクラス名ユーティリティ
 * Tailwind CSS クラスの競合を自動的に解決する
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

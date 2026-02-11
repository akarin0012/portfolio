'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  /** フォールバック UI をカスタムする場合に指定 */
  fallback?: ReactNode;
  /** 子コンポーネント */
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * クライアントコンポーネント用のエラーバウンダリ
 * 子コンポーネントで発生した予期しないエラーをキャッチし、
 * ページ全体のクラッシュを防止するフォールバック UI を表示する
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // 開発環境のみコンソール出力（本番では外部エラートラッキングに送信を推奨）
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          className="flex flex-col items-center gap-4 rounded-lg border border-danger/30 bg-danger/5 p-8 text-center"
        >
          <AlertCircle className="h-10 w-10 text-danger" aria-hidden="true" />
          <div>
            <p className="text-lg font-medium text-heading">
              コンテンツの読み込みに失敗しました
            </p>
            <p className="mt-1 text-sm text-caption">
              しばらく経ってから再度お試しください。
            </p>
          </div>
          <button
            type="button"
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 rounded-full border border-divider bg-surface px-6 py-2.5 text-sm font-medium text-heading transition-colors hover:bg-surface-alt"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            再読み込み
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

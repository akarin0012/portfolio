import { AlertCircle } from 'lucide-react';

type Props = {
  formStatus: 'idle' | 'sending' | 'success' | 'error' | 'rate-limited';
  retryAfterSeconds: number;
};

/** フォーム送信後のステータスアラート */
export function ContactStatusAlerts({ formStatus, retryAfterSeconds }: Props) {
  if (formStatus === 'error') {
    return (
      <div role="alert" aria-live="assertive" className="flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/10 px-4 py-2.5 text-sm text-danger">
        <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
        送信に失敗しました。しばらく経ってから再度お試しください。
      </div>
    );
  }

  if (formStatus === 'rate-limited') {
    return (
      <div role="alert" aria-live="assertive" className="flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/10 px-4 py-2.5 text-sm text-warning">
        <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
        送信回数の上限に達しました。{retryAfterSeconds}秒後に再度お試しください。
      </div>
    );
  }

  return null;
}

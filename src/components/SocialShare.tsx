'use client';

import { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Check, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

const XIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LineIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
  </svg>
);

const btnClass =
  'inline-flex items-center gap-2 rounded-full border border-divider/80 bg-surface/70 px-4 py-2 text-xs font-medium text-caption transition-colors hover:border-muted hover:text-heading';

/** フッター向けSNSシェアボタン（現在のページURLを共有） */
export function SocialShare() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const url = `${siteConfig.url}${pathname}`;
  const text = `${siteConfig.author.name}のポートフォリオ`;

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        /* noop */
      }
      document.body.removeChild(textArea);
    }
  }, [url]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
      <span className="text-xs text-muted">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X（Twitter）でシェアする"
        className={btnClass}
      >
        <XIcon />
        <span>ポスト</span>
      </a>
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LINEでシェアする"
        className={btnClass}
      >
        <LineIcon />
        <span>LINE</span>
      </a>
      <button
        type="button"
        onClick={handleCopyLink}
        aria-label="リンクをコピー"
        className={cn(btnClass, copied && 'border-success/60 text-success')}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            <span>コピー済み</span>
          </>
        ) : (
          <>
            <LinkIcon className="h-4 w-4" />
            <span>リンクをコピー</span>
          </>
        )}
      </button>
    </div>
  );
}

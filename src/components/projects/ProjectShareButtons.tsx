'use client';

import { useState } from 'react';
import { Share2, Check, Link as LinkIcon } from 'lucide-react';
import { siteConfig } from '@/config/site';

type Props = {
  projectTitle: string;
  projectId: string;
};

export function ProjectShareButtons({ projectTitle, projectId }: Props) {
  const [copied, setCopied] = useState(false);
  const url = `${siteConfig.url}/projects/${projectId}`;
  const text = `${projectTitle} | ${siteConfig.author.name}のポートフォリオ`;

  const [copyFailed, setCopyFailed] = useState(false);

  const handleCopyLink = async () => {
    setCopyFailed(false);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API 非対応環境のフォールバック
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
        console.error('クリップボードへのコピーに失敗しました');
        setCopyFailed(true);
        setTimeout(() => setCopyFailed(false), 3000);
      }
      document.body.removeChild(textArea);
    }
  };

  const shareLinks = [
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      icon: (
        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'LINE',
      href: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
      icon: (
        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <Share2 className="h-3.5 w-3.5 text-muted" />
      <span className="text-xs text-muted">シェア:</span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.name}でシェアする`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-divider/80 bg-surface/70 text-caption transition-colors hover:border-muted hover:text-heading"
        >
          {link.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopyLink}
        aria-label="リンクをコピー"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-divider/80 bg-surface/70 text-caption transition-colors hover:border-muted hover:text-heading"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-success" />
        ) : (
          <LinkIcon className="h-3.5 w-3.5" />
        )}
      </button>
      {copyFailed && (
        <span role="alert" className="text-xs text-red-500">
          コピーできませんでした
        </span>
      )}
    </div>
  );
}

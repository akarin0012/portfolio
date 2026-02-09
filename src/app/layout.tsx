import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { siteConfig, absoluteUrl } from '@/config/site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // フォント読み込み中もテキストを表示
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

/**
 * 共通のMetadata設定
 * 各ページで generateMetadata を使って上書き可能
 */
export const metadata: Metadata = {
  // タイトルテンプレート: 各ページのタイトルが %s に入る
  title: {
    default: `${siteConfig.name} | ${siteConfig.author.name} - ${siteConfig.author.jobTitle}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,

  // 検索エンジン向け設定
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
    languages: {
      'ja-JP': '/',
    },
  },

  // アプリケーション情報
  applicationName: siteConfig.name,
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',

  // カテゴリー・分類
  category: siteConfig.category,
  classification: 'Portfolio, Technology, Software Engineering',

  // 追加のメタ情報
  other: {
    // 著者関連
    'author': siteConfig.author.name,
    'designer': siteConfig.author.name,
    'owner': siteConfig.author.name,
    'copyright': `© ${new Date().getFullYear()} ${siteConfig.author.name}`,

    // 地理・言語情報
    'geo.region': 'JP-13', // 東京都
    'geo.placename': 'Tokyo',
    'language': siteConfig.language,
    'content-language': 'ja',

    // サイト情報
    'revisit-after': '7 days',
    'rating': 'general',
    'distribution': 'global',
    'coverage': 'Worldwide',

    // 技術スタック（検索用）
    'subject': `${siteConfig.author.jobTitle} Portfolio - C#, .NET, TypeScript, Next.js`,

    // モバイル最適化
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': siteConfig.name,

    // Microsoft
    'msapplication-TileColor': '#18181b',
    'msapplication-config': '/browserconfig.xml',
  },

  // Open Graph（Facebook, LINE, Discord など）
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.author.name} | ${siteConfig.author.jobTitle}のポートフォリオ`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    countryName: 'Japan',
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: `${siteConfig.author.name} - ${siteConfig.author.jobTitle}`,
        type: 'image/png',
      },
    ],
  },

  // Twitter(X) Card
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.author.name} | ${siteConfig.author.jobTitle}`,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage)],
    creator: siteConfig.links.twitter || undefined,
    site: siteConfig.links.twitter || undefined,
  },

  // その他のメタ情報
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // 認証・検証用（必要に応じてIDを設定）
  verification: {
    // google: 'Google Search Console の認証コード',
    // yandex: 'Yandex Webmaster の認証コード',
    // bing: 'Bing Webmaster の認証コード',
  },

  // アイコン設定
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/icon.png',
  },

  // マニフェスト
  manifest: '/manifest.json',

  // Archives（過去のコンテンツがある場合）
  archives: [`${siteConfig.url}/projects`],
};

/**
 * Viewport設定（Next.js 14以降は別途exportが必要）
 */
export const viewport: Viewport = {
  themeColor: '#18181b', // zinc-900
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {/*
        注: Google Fonts への preconnect/dns-prefetch は削除済み
        next/font/google がフォントをビルド時にダウンロード・インライン化するため不要
        （Lighthouse: 未使用 preconnect ヒントとして検出されていた）
      */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-zinc-900 text-zinc-50`}
      >
        <Sidebar />
        <div className="md:pl-[72px]">
          {children}
        </div>
      </body>
    </html>
  );
}

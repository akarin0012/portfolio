import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { siteConfig, absoluteUrl } from '@/config/site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

/**
 * 共通のMetadata設定
 * 各ページで generateMetadata を使って上書き可能
 */
export const metadata: Metadata = {
  // タイトルテンプレート: 各ページのタイトルが %s に入る
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  // 検索エンジン向け設定
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  // Open Graph（Facebook, LINE, Discord など）
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  // Twitter(X) Card
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage)],
    creator: siteConfig.links.twitter || undefined,
  },
  // その他のメタ情報
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // アイコン設定
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
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

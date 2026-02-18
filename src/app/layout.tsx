import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SocialShare } from '@/components/SocialShare';
import { cn } from '@/lib/utils';
import { siteConfig, getSiteDescription, getCopyrightYears } from '@/config/site';

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
  description: getSiteDescription(),
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
    'copyright': `© ${getCopyrightYears()} ${siteConfig.author.name}`,

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
  // OGP画像は opengraph-image.tsx から自動生成される
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.author.name} | ${siteConfig.author.jobTitle}のポートフォリオ`,
    description: getSiteDescription(),
    siteName: siteConfig.name,
    countryName: 'Japan',
  },

  // Twitter(X) Card
  // OGP画像は opengraph-image.tsx から自動生成される
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.author.name} | ${siteConfig.author.jobTitle}`,
    description: getSiteDescription(),
    ...(siteConfig.links.twitter
      ? { creator: siteConfig.links.twitter, site: siteConfig.links.twitter }
      : {}),
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

  // 認証・検証用（環境変数で設定）
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
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

/** Google Analytics Measurement ID（環境変数 NEXT_PUBLIC_GA_ID で設定） */
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark" suppressHydrationWarning>
      {/* テーマ初期化スクリプト: FOUCを防ぐためにbody描画前にクラスを設定 */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light')}else{document.documentElement.classList.remove('light');document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={cn(geistSans.variable, geistMono.variable, 'antialiased min-h-screen bg-surface text-foreground transition-colors duration-300')}
      >
        <ThemeProvider>
          <a href="#main-content" className="skip-nav">
            メインコンテンツへスキップ
          </a>
          <Sidebar />
          <div className="flex min-h-screen flex-col md:pl-[var(--sidebar-collapsed-width)]">
            <div className="flex-1">
              {children}
            </div>
            <footer className="border-t border-divider-subtle" role="contentinfo">
              <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col items-center gap-6">
                  <SocialShare />
                  <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-between">
                    <p className="text-sm text-caption">
                      © {getCopyrightYears()} {siteConfig.author.name}
                    </p>
                    <nav aria-label="フッターナビゲーション" className="flex items-center gap-4">
                      <a
                        href={siteConfig.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-caption transition-colors hover:text-heading"
                      >
                        GitHub
                      </a>
                      <span className="text-divider-subtle" aria-hidden="true">|</span>
                      <a
                        href="/skill_sheet.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-caption transition-colors hover:text-heading"
                      >
                        技術経歴書
                      </a>
                      <span className="text-divider-subtle" aria-hidden="true">|</span>
                      <Link
                        href="/#contact"
                        className="text-sm text-caption transition-colors hover:text-heading"
                      >
                        お問い合わせ
                      </Link>
                    </nav>
                  </div>
                </div>
              </div>
            </footer>
          </div>
          <ScrollToTop />
        {/* Google Analytics（NEXT_PUBLIC_GA_ID が設定されている場合のみ有効） */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
        </ThemeProvider>
      </body>
    </html>
  );
}

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MapPin, Code, Mail, LayoutGrid } from 'lucide-react';
import {
  siteConfig,
  absoluteUrl,
  getCareerYear,
  getSiteDescription,
  SITE_ESTABLISHED_YEAR,
} from '@/config/site';
import { getAllSkillNames, certifications } from '@/data/skills';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Below-fold セクション（スキル・プロジェクト・お問い合わせ）を遅延読み込み
// ヒーローセクションはServer Componentとして即座にレンダリング
const HomePageClient = dynamic(
  () => import('@/components/HomePageClient').then((mod) => mod.HomePageClient),
  {
    loading: () => (
      <div className="space-y-12 md:space-y-20">
        {/* スキルセクション スケルトン */}
        <div>
          <div className="mb-6 h-9 w-24 animate-pulse rounded bg-surface-alt md:mb-8" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-52 animate-pulse rounded-lg border border-divider-subtle bg-surface-alt/50" />
            ))}
          </div>
        </div>
        {/* プロジェクト経験セクション スケルトン */}
        <div>
          <div className="mb-6 h-9 w-56 animate-pulse rounded bg-surface-alt md:mb-8" />
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-lg border border-divider-subtle bg-surface-alt/50" />
            ))}
          </div>
        </div>
      </div>
    ),
  },
);

/**
 * JSON-LD 構造化データ（@graph形式で統合）
 * 5つの構造化データを1つの@graphにまとめることで、クロール効率を向上
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */
function JsonLd() {
  const allSkills = getAllSkillNames();

  const graphJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // WebSite
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        name: siteConfig.name,
        description: getSiteDescription(),
        url: siteConfig.url,
        author: { '@id': `${siteConfig.url}/#person` },
        inLanguage: siteConfig.language,
        copyrightYear: new Date().getFullYear(),
        copyrightHolder: { '@id': `${siteConfig.url}/#person` },
      },
      // Person
      {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
        name: siteConfig.author.name,
        alternateName: siteConfig.author.nameEn,
        jobTitle: siteConfig.author.jobTitle,
        url: siteConfig.url,
        image: absoluteUrl(siteConfig.ogImage),
        sameAs: [siteConfig.links.github, siteConfig.links.twitter].filter(
          Boolean,
        ),
        knowsAbout: allSkills,
        knowsLanguage: [
          { '@type': 'Language', name: 'Japanese', alternateName: 'ja' },
        ],
        hasCredential: certifications.map((cert) => ({
          '@type': 'EducationalOccupationalCredential',
          name: cert.name,
          credentialCategory: 'certification',
        })),
        hasOccupation: {
          '@type': 'Occupation',
          name: siteConfig.author.jobTitle,
          occupationLocation: {
            '@type': 'City',
            name: siteConfig.author.location,
          },
          skills: allSkills.join(', '),
          responsibilities: [
            'Webアプリケーション開発',
            'システム設計',
            'データベース設計',
            '保守運用',
          ],
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: siteConfig.author.location,
          addressCountry: 'JP',
        },
      },
      // ProfilePage
      {
        '@type': 'ProfilePage',
        '@id': `${siteConfig.url}/#profilepage`,
        mainEntity: { '@id': `${siteConfig.url}/#person` },
        dateCreated: `${SITE_ESTABLISHED_YEAR}-01-01`,
        dateModified: new Date().toISOString().split('T')[0],
        about: { '@id': `${siteConfig.url}/#person` },
      },
      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'ホーム',
            item: siteConfig.url,
          },
        ],
      },
      // ItemList（スキル一覧）
      {
        '@type': 'ItemList',
        name: '技術スキル',
        description: `${siteConfig.author.name}の保有する技術スキル一覧`,
        numberOfItems: allSkills.length,
        itemListElement: allSkills.map((skill, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: skill,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graphJsonLd) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <div className="min-h-screen bg-surface text-foreground">
        {/* ヘッダー（Server Component: 即座にレンダリング） */}
        <header
          data-header
          className="sticky top-0 z-30 border-b border-divider-subtle bg-surface/95 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 py-3 pl-14 md:px-6 md:pl-6 md:py-4">
            <Link href="/" className="text-lg font-bold text-heading transition-colors hover:text-accent md:text-xl">
              {siteConfig.author.name}
            </Link>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main id="main-content" className="container mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
          {/* ヒーローセクション（Server Component + CSSアニメーション: LCP最適化） */}
          <section id="profile" aria-labelledby="profile-heading" className="mb-12 md:mb-20">
            <div className="animate-fade-in-up mb-8 text-center md:mb-12">
              <h1 id="profile-heading" className="mb-4 text-3xl font-bold text-heading md:text-5xl">
                茅嶋 伸一郎
              </h1>
              <p className="mb-2 text-lg text-caption md:text-xl">
                システムエンジニア（{getCareerYear()}年目）
              </p>
              <p className="mb-6 inline-flex items-center gap-1 text-base text-caption md:text-lg">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                東京都在住
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/projects"
                  aria-label="制作物ギャラリーを見る"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-hover active:scale-95"
                >
                  <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                  制作物を見る
                </Link>
                <a
                  href="#skills"
                  aria-label="スキルセクションへ移動する"
                  className="inline-flex items-center gap-2 rounded-full border border-divider bg-surface px-6 py-2.5 text-sm font-medium text-heading transition-all duration-300 hover:bg-surface-alt active:scale-95"
                >
                  <Code className="h-4 w-4" aria-hidden="true" />
                  スキルを見る
                </a>
                <a
                  href="#contact"
                  aria-label="お問い合わせセクションへ移動する"
                  className="inline-flex items-center gap-2 rounded-full border border-divider bg-surface px-6 py-2.5 text-sm font-medium text-heading transition-all duration-300 hover:bg-surface-alt active:scale-95"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  お問い合わせ
                </a>
              </div>
            </div>
            <div className="animate-fade-in-up animation-delay-100 rounded-lg border border-divider bg-surface-alt p-6 md:p-8">
              <h2 className="mb-4 text-xl font-semibold text-heading md:text-2xl">
                自己紹介
              </h2>
              <p className="mb-4 text-base leading-relaxed text-body md:text-lg">
                {getCareerYear()}年目のシステムエンジニアとして、レガシー技術からモダンな技術スタックまで幅広く開発に携わっています。
                主にWebアプリケーションの設計から保守運用まで、一貫した開発経験を積んでいます。
              </p>
              <p className="mb-4 text-base leading-relaxed text-body md:text-lg">
                レガシー技術（VBScript、C#、VB.NET）を用いた既存システムの開発・保守経験があり、
                オンプレミス環境での本番デプロイや運用も実務経験があります。
              </p>
              <p className="text-base leading-relaxed text-body md:text-lg">
                今後は、これまでのレガシー技術での実務経験を活かし、GoやTypeScript等のモダンな技術スタックへの
                リプレイス・移行案件に参画し、技術的な知見を拡げていきたいと考えています。
              </p>
            </div>
          </section>

          <hr className="my-12 border-divider-subtle md:my-20" aria-hidden="true" />

          {/* Below-fold セクション（Client Component: framer-motion アニメーション） */}
          <ErrorBoundary>
            <HomePageClient />
          </ErrorBoundary>
        </main>

      </div>
    </>
  );
}

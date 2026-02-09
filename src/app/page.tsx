import dynamic from 'next/dynamic';
import {
  siteConfig,
  absoluteUrl,
  getCareerYear,
  getCopyrightYears,
  getSiteDescription,
} from '@/config/site';
import { getAllSkillNames, certifications } from '@/data/skills';

// Below-fold セクション（スキル・プロジェクト・お問い合わせ）を遅延読み込み
// ヒーローセクションはServer Componentとして即座にレンダリング
const HomePageClient = dynamic(
  () => import('@/components/HomePageClient').then((mod) => mod.HomePageClient),
);

/**
 * JSON-LD 構造化データ
 * Google検索のリッチリザルトに対応
 */
function JsonLd() {
  // skills.ts の単一データソースからスキル名を取得
  const allSkills = getAllSkillNames();

  // WebSite 構造化データ
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    description: getSiteDescription(),
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      jobTitle: siteConfig.author.jobTitle,
      url: siteConfig.author.url,
    },
    inLanguage: siteConfig.language,
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
  };

  // Person 構造化データ（ポートフォリオサイト向け）
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: siteConfig.author.name,
    alternateName: siteConfig.author.nameEn,
    jobTitle: siteConfig.author.jobTitle,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.twitter,
    ].filter(Boolean),
    knowsAbout: allSkills,
    knowsLanguage: [
      {
        '@type': 'Language',
        name: 'Japanese',
        alternateName: 'ja',
      },
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
  };

  // ProfilePage 構造化データ
  const profilePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteConfig.url}/#profilepage`,
    mainEntity: {
      '@id': `${siteConfig.url}/#person`,
    },
    dateCreated: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    about: {
      '@id': `${siteConfig.url}/#person`,
    },
  };

  // BreadcrumbList 構造化データ（トップページ用）
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: siteConfig.url,
      },
    ],
  };

  // ItemList 構造化データ（スキル一覧）
  const skillsListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '技術スキル',
    description: `${siteConfig.author.name}の保有する技術スキル一覧`,
    numberOfItems: allSkills.length,
    itemListElement: allSkills.map((skill, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: skill,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(skillsListJsonLd) }}
      />
    </>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <div className="min-h-screen bg-zinc-900 text-zinc-50">
        {/* ヘッダー（Server Component: 即座にレンダリング） */}
        <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6 md:px-6">
            <h1 className="text-2xl font-bold">ポートフォリオ</h1>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main id="main-content" className="container mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
          {/* ヒーローセクション（Server Component + CSSアニメーション: LCP最適化） */}
          <section id="profile" className="mb-12 md:mb-20">
            <div className="animate-fade-in-up mb-8 text-center md:mb-12">
              <h2 className="mb-4 text-3xl font-bold text-zinc-100 md:text-5xl">
                茅嶋 伸一郎
              </h2>
              <p className="mb-2 text-lg text-zinc-400 md:text-xl">
                システムエンジニア（{getCareerYear()}年目）
              </p>
              <p className="text-base text-zinc-400 md:text-lg">
                東京都在住
              </p>
            </div>
            <div className="animate-fade-in-up animation-delay-100 rounded-lg border border-zinc-700 bg-zinc-800 p-6 md:p-8">
              <h3 className="mb-4 text-xl font-semibold text-zinc-100 md:text-2xl">
                自己紹介
              </h3>
              <p className="mb-4 text-base leading-relaxed text-zinc-300 md:text-lg">
                {getCareerYear()}年目のシステムエンジニアとして、レガシー技術からモダンな技術スタックまで幅広く開発に携わっています。
                主にWebアプリケーションの設計から保守運用まで、一貫した開発経験を積んでいます。
              </p>
              <p className="mb-4 text-base leading-relaxed text-zinc-300 md:text-lg">
                レガシー技術（VBScript、C#、VB.NET）を用いた既存システムの開発・保守経験があり、
                オンプレミス環境での本番デプロイや運用も実務経験があります。
              </p>
              <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
                今後は、これまでのレガシー技術での実務経験を活かし、GoやTypeScript等のモダンな技術スタックへの
                リプレイス・移行案件に参画し、技術的な知見を拡げていきたいと考えています。
              </p>
            </div>
          </section>

          {/* Below-fold セクション（Client Component: framer-motion アニメーション） */}
          <HomePageClient />
        </main>

        {/* フッター（Server Component） */}
        <footer className="mt-16 border-t border-zinc-800">
          <div className="container mx-auto px-6 py-6">
            <p className="text-center text-sm text-zinc-400">
              © {getCopyrightYears()} 茅嶋 伸一郎. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

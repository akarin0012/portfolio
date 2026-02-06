import dynamic from 'next/dynamic';
import { siteConfig, absoluteUrl } from '@/config/site';

// Framer Motionを含むコンポーネントを遅延読み込み
// これにより初期ロードのJSバンドルサイズを削減
const HomePageClient = dynamic(
  () => import('@/components/HomePageClient').then((mod) => mod.HomePageClient),
  {
    loading: () => (
      <div className="min-h-screen bg-zinc-900 animate-pulse" />
    ),
  }
);

/**
 * JSON-LD 構造化データ
 * Google検索のリッチリザルトに対応
 */
function JsonLd() {
  // 全スキルを結合
  const allSkills = [
    ...siteConfig.skills.backend,
    ...siteConfig.skills.frontend,
    ...siteConfig.skills.database,
    ...siteConfig.skills.other,
  ];

  // WebSite 構造化データ
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    description: siteConfig.description,
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
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'HTML5プロフェッショナル認定 レベル1',
        credentialCategory: 'certification',
      },
    ],
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
      <HomePageClient />
    </>
  );
}

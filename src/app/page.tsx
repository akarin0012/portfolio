import { HomePageClient } from '@/components/HomePageClient';
import { siteConfig, absoluteUrl } from '@/config/site';

/**
 * JSON-LD 構造化データ
 * Google検索のリッチリザルトに対応
 */
function JsonLd() {
  // WebSite 構造化データ
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      jobTitle: siteConfig.author.jobTitle,
      url: siteConfig.author.url,
    },
    inLanguage: 'ja-JP',
  };

  // Person 構造化データ（ポートフォリオサイト向け）
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.jobTitle,
    url: siteConfig.url,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.twitter,
    ].filter(Boolean),
    knowsAbout: [
      'C#',
      '.NET',
      'ASP.NET',
      'TypeScript',
      'Next.js',
      'React',
      'Web Development',
      'Software Engineering',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'フリーランス / 個人事業', // 実際の所属に変更可能
    },
  };

  // ProfilePage 構造化データ
  const profilePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: siteConfig.author.name,
      jobTitle: siteConfig.author.jobTitle,
      description: siteConfig.description,
      url: siteConfig.url,
      image: absoluteUrl(siteConfig.ogImage),
      sameAs: [
        siteConfig.links.github,
        siteConfig.links.twitter,
      ].filter(Boolean),
    },
    dateCreated: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
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
